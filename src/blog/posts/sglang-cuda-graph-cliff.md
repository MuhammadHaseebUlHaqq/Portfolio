On one rented RTX 4090, a small model served by SGLang took **30.57 ms per output token** with the default settings and **5.31 ms** after I changed one flag. Same card, same session, same load. That is a 5.76x gap, and the whole measurement cost me less than $2.

This post is about where that gap comes from, what fixing it actually costs, and two things I got wrong on the way.

## A few terms first

SGLang is an open-source engine for serving LLMs. A few words show up a lot below:

- **TPOT** (time per output token) is how long a user waits for each new token once generation has started. Lower is better.
- A **CUDA graph** is a recording of all the GPU work for one decode step. The engine records it once and then replays it with a single call, so the CPU does not have to launch hundreds of small kernels one by one.
- **Eager mode** is the fallback: no recording, every kernel launched separately from Python. It works, but it is much slower for small, fast steps.
- The **KV pool** is the block of GPU memory the engine sets aside to hold the attention cache for all running requests.

A CUDA graph is recorded for a fixed batch size. So the engine records graphs for a list of batch sizes at startup, and if the number of running requests goes above the largest one, decode drops back to eager mode.

## How SGLang picks that limit

I read the source to find out where the largest captured batch size comes from. SGLang looks at one number: how much memory the GPU has. Cards under 20 GB get 8, cards under 35 GB get 48, H100-class cards get 256, and so on.

Model size never enters the decision. A 0.5B model and a much larger model on the same card get the same coverage, even though the small model leaves far more of the KV pool free and can run a much bigger batch.

There is one more clamp. The capture list is also cut to the size of the request pool, so the real limit is the smaller of the two. That detail matters: someone on the upstream issue saw their list stop at 14 and blamed the memory rule, when it was the request pool that cut it. You have to read both numbers from the server log or the result is ambiguous. On my box the memory rule gave 48 and the request pool was 4096, so 48 was the real limit.

The 4090's limit had been raised from 24 to 48 only four days before my run, by PR #37898. Every model used to justify that change was 4B or larger. So my question was simple: does a 0.5B model still fall off the edge at 48?

## The setup

- One RTX 4090 (24 GB), rented, CUDA 13.0
- SGLang `main` at `141febf3`, which includes the raised limit
- `Qwen/Qwen2.5-0.5B-Instruct`, one GPU, no tuning flags except the one under test
- Default (48) against `--cuda-graph-max-bs-decode 128`
- Request rates from 16 to 72 per second, 1000 prompts per run, 1024 input tokens, 256 output tokens, two repeats per point

I ran both configurations on the same physical machine in the same session. An earlier experiment of mine found two "identical" RTX 3060s running the same work 1.22x apart, so a before-and-after split across two rentals would have told me nothing.

## Results

Median TPOT, mean of two repeats:

| requests/s | default (48) | wide (128) | ratio | default tok/s | wide tok/s |
| --- | --- | --- | --- | --- | --- |
| 16 | 2.64 ms | 2.63 ms | 1.00 | 4142 | 4141 |
| 32 | **30.57 ms** | **5.31 ms** | **5.76** | 6979 | 7887 |
| 48 | 40.99 ms | 37.81 ms | 1.08 | 9001 | 9088 |
| 64 | 56.21 ms | 53.93 ms | 1.04 | 9495 | 9668 |
| 72 | 58.70 ms | 59.41 ms | 0.99 | 9675 | 9750 |

The p99 at 32 requests per second moves with the median (36.76 ms against 7.32 ms), so the whole distribution shifts, not just the tail.

The cliff reproduces. Raising the constant from 24 to 48 helped bigger models, but a 0.5B model still falls off the edge, because the rule still ignores model size.

## What I got wrong, part one: where the gap lives

I expected the gap to open once the load pushed the running batch past 48, and then stay open at every higher rate. It did not. It opened at 32 and closed again by 48.

The throughput columns explain it. This card tops out near 9.7k output tokens per second. From 48 requests per second upward, both configurations are stuck at that ceiling, so the time per token is mostly time spent waiting in the queue. Both queue equally, so both look the same. Graph coverage cannot show up once the load is more than either setup can serve.

At 32 requests per second, the default is both slower per token and lower in throughput (6979 against 7887 tok/s). It fell off the edge, decode slowed down, more requests piled up in the running batch, and it stayed there. That is the stuck state the original issue describes.

So the cliff shows up **below** saturation. I first read that as a weaker result. It is the opposite. A gap that only appears under overload is a curiosity. A gap that appears at the load you would actually run a server at is a bug.

## What I got wrong, part two: "it's free"

My first pass compared total GPU memory after the server was ready: 19392.8 MiB against 19390.8 MiB. I concluded widening cost nothing. The wider config even used 2 MiB less, which should have warned me.

That number can only ever be about zero. SGLang sets aside a reserve that grows with the largest captured batch size, and whatever it reserves comes out of the KV pool. So the total stays flat by design. I was comparing the one number the mechanism keeps constant.

The numbers that actually move, all from the same server logs:

- KV pool capacity dropped by **14,110 tokens** (1,330,288 to 1,316,178), about **1.1%** of the pool
- CUDA graph memory went up by **143.4 MiB**
- Startup went from 2.19 s to 2.69 s, about **half a second** longer

At 12,288 bytes per token, those 14,110 tokens are 165.4 MiB of pool. SGLang's own formula predicts 160 MB. My two measurements land on either side of it, so the engine's cost model is accurate on this card.

That is a better case for widening than "it's free", which is false. The honest cost is about 1% of the KV pool and half a second of startup, in exchange for a 5.76x latency improvement at a realistic load.

## A null result I should not overclaim

The original issue also says the slowdown is bistable: at a fixed rate, short runs stay fast and long runs stay slow. I tested this at 62 requests per second with 500, 1000 and 2000 prompts, three runs each. TPOT got steadily worse with run length (about 32, 54, then 82 ms) and stayed tight within each length. One state getting worse, not two states.

But I picked 62 before I had the sweep results, thinking it was "just above 48". On this card 62 is far past saturation, so all I measured was a queue growing under overload. A fair test would hold the rate near 32. So I reported it as a null result that does not disprove the original claim, because it tested the wrong point.

## What happened upstream

I posted the results on [issue #33483](https://github.com/sgl-project/sglang/issues/33483), then a follow-up the same day correcting both mistakes above in public.

I did not open a pull request. The fix that would make this visible to operators, a startup warning, already existed as PR #33900, written by the person who filed the issue and unreviewed for a month. A second copy would have been wasted work. At the time SGLang had 4,318 open pull requests, 2,446 of them older than a month. An unreviewed PR there is normal, not personal.

## What an outside measurement is for

I started this thinking the goal was a merged PR. I ended up thinking the measurement is the contribution. It is public, it is reproducible, it takes a maintainer about a minute to check, and it gives them a second card and a second model to reason about. Whether it turns into code is not up to me.

The total cost was about three hours on a rented 4090, under $1.50. The harness, the raw CSV and the server logs are all in the [repo](https://github.com/MuhammadHaseebUlHaqq/llm-inference-optimization), so anyone can check my numbers, including the ones I got wrong the first time.
