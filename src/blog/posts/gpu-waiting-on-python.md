I ran the same small language model on the same GPU two ways, once with plain HuggingFace `transformers` and once with vLLM, and vLLM produced tokens roughly three times faster. When I profiled both, the reason was not what I expected to find. For 62% of every token, the HuggingFace run had the GPU doing nothing at all. It was waiting for Python.

This post is about where that idle time comes from, how vLLM removes it, and what is left once it is gone.

## The setup

The model is Qwen2.5-1.5B in fp16, on one rented RTX 3060 with 12GB of memory. The prompt is 512 tokens and I measure decode, the phase where the model produces one new token at a time. Batch size is 1, so there is only one request.

A few words I will use a lot:

- A **kernel** is one small program that runs on the GPU, like "multiply these two matrices" or "normalize this vector". Generating one token means running hundreds of them.
- The **CPU launches** each kernel. The GPU cannot start work on its own, the CPU has to tell it what to run next.
- Decode is **memory-bound**: for every token the GPU has to read all 3 GB of model weights from memory, and that reading takes longer than the math. So the speed limit is memory bandwidth, not compute.

I captured traces with the PyTorch profiler and counted, for one decode step: how many kernels ran, how many times the CPU had to launch something, how long the GPU was actually busy, and how long the whole step took. The difference between the last two is idle time.

## What the trace showed

| run | kernels | CPU launches | GPU busy | step time | idle |
| --- | --- | --- | --- | --- | --- |
| HuggingFace | 1198 | 1198 | 15.31 ms | 40.65 ms | 62.3% |
| vLLM, no compile, no graphs | 356 | 356 | 13.02 ms | 25.22 ms | 48.4% |
| vLLM, compile only | 354 | 354 | 12.90 ms | 22.41 ms | 42.4% |
| vLLM, graphs only | 385 | 17 | 12.77 ms | 12.57 ms | ~0% |
| vLLM, both (the default) | 383 | 17 | 12.71 ms | 12.56 ms | ~0% |

Look at the HuggingFace row first. It runs 1198 kernels per token and the CPU launches every one of them separately. The GPU works for 15.31 ms of a 40.65 ms step. The other 25.34 ms it sits idle.

The cost of a single launch is small. It works out to about 21 microseconds of idle time per launch, and the average kernel only runs for about 13 microseconds. At batch 1 these kernels are tiny, so the GPU finishes each one before Python has prepared the next. The cost is not any one launch. It is paying that cost 1198 times for every token.

## Two separate fixes

I split vLLM into four configurations because the two things it does are easy to mix up.

**Fewer kernels.** With compilation and CUDA graphs both turned off, vLLM runs 356 kernels instead of 1198. That 3.4x drop comes from vLLM's own hand-written CUDA kernels, which do in one kernel what HuggingFace does in several (normalization, rotary embedding, the activation function, attention). This happens before any compiler is involved.

The surprising part is how little this changes the GPU's actual work. Busy time only falls from 15.31 to 13.02 ms. Fusion mostly saves launches, not memory traffic, because almost all the bytes moved per token are model weights, and every engine has to read all of them.

vLLM's cost per launch is actually higher than HuggingFace's, about 34 microseconds against 21, because each step also does scheduling and memory bookkeeping. It still wins because it pays that cost far fewer times.

**CUDA graphs.** A CUDA graph is a recording of a whole sequence of kernel launches. You record it once, and after that the CPU replays the entire sequence with a single call instead of launching each kernel by hand. With graphs on, CPU launches per step fall from 356 to 17, and idle time drops to zero.

![Device occupancy during one decode step, with and without CUDA graphs](/blog/decode_timeline.png)

The figure shows the first 1500 microseconds of one decode step. Without graphs, each row is a thin comb: a few microseconds of work, then a gap while the CPU catches up. With graphs, the same row is a solid bar.

Graphs do not change the work. The same kernels run in the same order. I wrote down a prediction before running it: if graphs only remove idle time, the step with graphs should take exactly as long as the busy time without them. The prediction was 13.02 and 12.90 ms. The measurements were 12.57 and 12.56 ms, within 3.5% and 2.6%.

## The two fixes overlap

I expected `torch.compile` and CUDA graphs to add up. They do not.

With graphs off, compiling saves 2.81 ms per step. With graphs on, it saves 0.01 ms. Compilation makes each CPU launch cheaper, but once graphs have taken the CPU out of the loop there is nothing left for it to speed up. Both fixes attack the same idle time, so the second one finds almost nothing to do.

This is the reason I ran all four configurations instead of just "HuggingFace vs vLLM default". With only those two, I could not have said which part of the speedup came from fusion and which from graphs.

Adding it up: of the 28.09 ms per token that separates the two engines, 25.34 ms (90%) is idle time removed and 2.60 ms (9%) is faster GPU work. The speedup is a scheduling win, not a math win.

## How much is left

To say how good 12.56 ms is, I needed a ceiling. The spec sheet says this card has 360 GB/s of memory bandwidth, but no real kernel reaches the spec number. So I measured it with a large streaming read and got 291.5 GB/s, which is what the card can actually deliver.

Against that measured ceiling, vLLM's decode step runs at 85% of achievable bandwidth. HuggingFace runs at 26%. At batch 1, vLLM has used up almost all of this optimization.

One lesson I did not plan for: I rented two RTX 3060s with the same name and the same amount of memory, and the same work ran 1.22x slower on one than the other. Every number above comes from one box. If I had mixed results from the two, I would have reported a 22% difference that had nothing to do with the software.

## Batching: the next lever

If the GPU is now close to its memory limit at batch 1, the only way to go faster is to get more out of each read of the weights. That is what batching does. If 64 requests decode together, one read of the 3 GB of weights produces 64 tokens instead of one.

![Decode throughput vs batch size on the RTX 3060 and RTX 3090](/blog/vllm_batch_throughput.png)

On the 3060, decode throughput goes from 89 tokens per second at batch 1 to 2696 at batch 64, about 30x. Then it nearly stops. At batch 256 it is 2967, while the time per token has gone from 24 ms to 86 ms.

A simple model explains the shape. Each decode step costs a fixed part plus a part per request:

`step_time = T_fixed + c1 x batch`

`T_fixed` (about 11 ms) is reading the weights, paid once no matter how many requests there are. `c1` (about 0.2 ms) is what each extra request adds, mostly reading its own cached context. When the fixed part dominates, adding requests is nearly free and throughput climbs. Once the per-request part dominates, each step takes time in proportion to the tokens in it, and throughput stops growing.

I ran the same sweep on an RTX 3090, which has 2.6x the bandwidth. Every number went up, to about 10,100 tokens per second at batch 256, but the bend stayed at about batch 64 on both cards. That point depends on the size of the model's weights compared to each request's cache, and the model is the same on both cards. So the best batch size here is a property of the model, not of the GPU.

## What I take from this

At batch 1, the gap between a simple implementation and a serving engine is mostly the GPU waiting on the CPU. vLLM closes almost all of it, and gets within 15% of what this card's memory can deliver. That means the next improvements cannot come from better scheduling, because there is almost no idle time left. They have to come from moving fewer bytes per token, by batching, by smaller weights, or by kernels that read less.

All the scripts, traces, and raw CSVs are in the repo: [llm-inference-optimization](https://github.com/MuhammadHaseebUlHaqq/llm-inference-optimization).
