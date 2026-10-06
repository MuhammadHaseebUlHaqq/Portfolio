My graphics card ran out of memory at 123,565 tokens. Before the run I had guessed it would die somewhere near 30,000. I was off by a factor of four, and figuring out why taught me more about LLM inference than the reading I had done before it.

This is the first phase of a project where I measure how a language model behaves on real hardware instead of trusting the formulas.

## The setup

I picked a small model, Qwen2.5-1.5B, in fp16 (16-bit floating point, so each number takes 2 bytes). The weights take about 2.9 GB. I ran it on a single NVIDIA RTX 3060 with 12 GB of memory, rented on Vast.ai for about $0.045 an hour.

The small card was on purpose. I wanted to hit the memory wall at a realistic context length, because hitting that wall was the experiment.

I ran the model two ways:

- **HuggingFace transformers**, the standard library most people start with. It is slow but easy to read, so it works as the control.
- **vLLM**, a serving engine built to run models fast in production.

Same prompt (512 tokens), same 256 new tokens, one request at a time. The only thing that changed was the engine. I wrote one shared measuring script for both, and it measures the two phases of generation separately. Prefill is when the model reads the whole prompt in one go. Decode is when it produces the answer, one token at a time.

## First result: vLLM is about 3x faster, but only at decode

| | HuggingFace | vLLM |
| --- | --- | --- |
| Prefill (512-token prompt) | ~137 ms | ~124 ms |
| Decode speed | ~28 tok/s (18 to 28 across six runs) | ~80 tok/s |
| Share of the card's memory bandwidth used in decode | 16 to 24% | ~68% |

Prefill barely changed. Both engines send the prompt's big matrix multiplications to the same NVIDIA library (cuBLAS), and there is not much to gain there.

Decode is where the gap is. During decode the model has to read all of its weights from memory to produce every single token, so the speed limit is memory bandwidth, not math. HuggingFace used about a fifth of the card's bandwidth, and the GPU spent the rest of the time idle, waiting on Python. vLLM gets that to about 68%. Where that idle time goes is [its own post](/blog/gpu-waiting-on-python).

One honest note: my HuggingFace numbers moved around. The first two runs gave 18.0 and 23.2 tok/s, and the four after that all landed between 28.0 and 28.3. A rented machine is not a fixed thing, and I learned to record the spread instead of picking the nicest number.

## The main experiment: run until it crashes

The KV cache is the model's short-term memory. For every token it has seen, it stores a "key" and a "value" vector at every layer, so it does not have to recompute them. That cache grows with every new token, and eventually it fills the GPU.

You can work out the size per token from the model's shape. For this model it is:

2 (key and value) x 28 layers x 2 KV heads x 128 numbers per head x 2 bytes = **28 KB per token**

So the plan was simple. Start with a 32-token prompt, keep generating one token at a time, record memory every 1,000 tokens, and stop when the card dies. I ran this on HuggingFace and not vLLM, because vLLM reserves its whole memory pool at startup. It would show a flat line and never crash this way. HuggingFace grows memory as it goes, so the crash is a real event.

The full run took about six hours.

![Measured VRAM vs context length on an RTX 3060](/blog/oom_curve.png)

The card reached **123,565 tokens**, then threw `CUDA out of memory`.

## Why the memory grew twice as fast as the formula

The measured line climbed at about **60 KB per token**, more than double the 28 KB I had predicted. My first thought was that the formula was wrong. It wasn't.

The cause is one line of code. Each time HuggingFace adds a token, it builds the new cache with `torch.cat`, which joins the old cache and the new token into a fresh block of memory. It cannot grow the old block in place. So for a moment, both the old cache and the new copy exist at the same time. The real peak is weights plus *two* caches, not one.

The numbers line up. At 120,000 tokens, "weights + 2 x cache" predicts 9,507 MB. The card actually held 10,226 MB, and the extra is attention working memory. The 28 KB formula was right. HuggingFace was just paying for every token twice.

## Why it crashed with free memory left

The second surprise was at the crash itself. When it died, 10,437 MB was in use, but PyTorch had reserved 11,764 MB from the card. So about 1.3 GB was technically free.

The problem is that the next copy of the cache needed one big unbroken block, and the free memory was split into small gaps between older blocks. This is called fragmentation. Think of a parking lot with plenty of empty spaces in total, but no single stretch long enough to park a bus. The card did not run out of memory. It ran out of memory *in one piece*.

## What I got wrong

My guess before the run was about 30k tokens. The real answer was 123k. I am keeping that wrong guess in the writeup on purpose, because the gap between them has two clear causes I can now measure: the double copy roughly halves the headroom, and fragmentation takes the last part.

The same `torch.cat` also explains something else I saw. Decode speed fell from about 30 tok/s at the start to about 3 tok/s near the end. Decode is limited by how many bytes move per step, and rewriting the whole cache every step means that at 120k tokens each step copies around 6 GB just for the cache. So one line of code causes both the memory wall and the slowdown.

## A side lesson: 4-bit is a memory trick, not a speed trick

If memory is the wall, the obvious move is to shrink the weights. I loaded the same model in 4-bit (NF4, through the bitsandbytes library) and ran the exact same loop.

The weights dropped from 2,945 MB to 1,099 MB, freeing about 1.8 GB. But decode got *slower*, from about 28.1 to 12.4 tok/s. I had expected the opposite, since smaller weights should mean fewer bytes to read.

It turns out bitsandbytes does not do the math in 4-bit. It converts the weights back to fp16 every layer, every step, and then runs the normal multiplication. That conversion is pure extra work, and at one request at a time there is nothing to hide it behind. So at this batch size, 4-bit buys you room for longer context, not speed. At the measured 60 KB per token, that 1.8 GB is roughly 30k more tokens before the same wall.

## What I'd do next

Both problems I found, the double copy and the fragmentation, have the same fix: stop storing the cache as one big block that has to be copied every time it grows. That is what PagedAttention does in vLLM. It splits the cache into small fixed-size blocks, like pages in an operating system, and new tokens just go into the next free block. No copy, no need for one huge empty stretch of memory.

On the same card, vLLM's paged pool holds 237,376 tokens of cache in 6.34 GiB, almost twice the context HuggingFace reached before it crashed. The next phase of this project is to measure that directly, and to look at batching, where serving many requests at once changes the picture again.

All the scripts, raw CSV logs, and plots are in the repo: [github.com/MuhammadHaseebUlHaqq/llm-inference-optimization](https://github.com/MuhammadHaseebUlHaqq/llm-inference-optimization)
