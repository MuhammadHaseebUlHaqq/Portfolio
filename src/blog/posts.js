// Post bodies live in ./posts/<slug>.md. Add a new post by dropping in the
// markdown file and adding its metadata here; order is newest first.
const bodies = import.meta.glob('./posts/*.md', { query: '?raw', import: 'default', eager: true })

const meta = [
  {
    slug: 'kv-cache-wall',
    title: 'I ran a 1.5B model until my GPU ran out of memory',
    date: '2026-10-06',
    summary:
      'Pushing the KV cache to the crash point on a 12GB RTX 3060. The card lasted four times longer than I predicted, and the reasons it still died early were more interesting than the crash.',
    tags: ['LLM Inference', 'KV Cache', 'vLLM'],
  },
  {
    slug: 'gpu-waiting-on-python',
    title: 'My GPU was idle 62% of the time',
    date: '2026-10-06',
    summary:
      'Profiling why vLLM decodes about 3x faster than HuggingFace on the same card. Almost none of the gap is faster math. It is the GPU no longer waiting on the CPU.',
    tags: ['Profiling', 'CUDA Graphs', 'Batching'],
  },
  {
    slug: 'sglang-cuda-graph-cliff',
    title: 'Reproducing a performance bug in SGLang for under $2',
    date: '2026-10-06',
    summary:
      'SGLang decides how many CUDA graphs to capture from GPU memory alone. On a rented RTX 4090 with a small model, that cost a 5.76x slowdown at a normal load.',
    tags: ['SGLang', 'Open Source', 'Benchmarking'],
  },
]

function readingTime(text) {
  const words = text.trim().split(/\s+/).length
  return Math.max(1, Math.round(words / 220))
}

export const posts = meta
  .filter((p) => bodies[`./posts/${p.slug}.md`])
  .map((p) => {
    const body = bodies[`./posts/${p.slug}.md`]
    return { ...p, body, minutes: readingTime(body) }
  })

export function findPost(slug) {
  return posts.find((p) => p.slug === slug)
}

export function formatDate(iso) {
  return new Date(`${iso}T00:00:00`).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}
