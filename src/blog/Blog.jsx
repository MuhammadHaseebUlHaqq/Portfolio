import { useEffect, useMemo } from 'react'
import { marked } from 'marked'
import Header from '../components/Header'
import { posts, findPost, formatDate } from './posts'
import './Blog.css'

const SITE_TITLE = 'Muhammad Haseeb ul Haq'

function BlogIndex() {
  useEffect(() => {
    document.title = `Blog | ${SITE_TITLE}`
  }, [])

  return (
    <main className="blog-page">
      <div className="blog-wrap">
        <h1 className="blog-title">
          <span className="brace">&#123;</span>
          <span>Blog</span>
          <span className="brace">&#125;</span>
        </h1>
        <p className="blog-intro">
          Notes from my research on LLM inference: what I measured, what I expected, and where the
          two disagreed. Every number comes from a run you can reproduce from the{' '}
          <a href="https://github.com/MuhammadHaseebUlHaqq/llm-inference-optimization" target="_blank" rel="noopener noreferrer">
            repo
          </a>
          .
        </p>

        <ul className="blog-list">
          {posts.map((post) => (
            <li key={post.slug}>
              <a href={`/blog/${post.slug}`} className="blog-card">
                <div className="blog-meta">
                  {formatDate(post.date)} &middot; {post.minutes} min read
                </div>
                <h2>{post.title}</h2>
                <p>{post.summary}</p>
                <div className="blog-tags">
                  {post.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </main>
  )
}

function BlogPost({ post }) {
  const html = useMemo(() => marked.parse(post.body), [post.body])

  useEffect(() => {
    document.title = `${post.title} | ${SITE_TITLE}`
    window.scrollTo(0, 0)
  }, [post.title])

  return (
    <main className="blog-page">
      <article className="blog-wrap">
        <a href="/blog" className="blog-back">&larr; All posts</a>
        <div className="blog-meta">
          {formatDate(post.date)} &middot; {post.minutes} min read
        </div>
        <h1 className="post-title">{post.title}</h1>
        <div className="blog-tags">
          {post.tags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
        <div className="post-body" dangerouslySetInnerHTML={{ __html: html }} />
        <a href="/blog" className="blog-back blog-back-bottom">&larr; All posts</a>
      </article>
    </main>
  )
}

function NotFound() {
  return (
    <main className="blog-page">
      <div className="blog-wrap">
        <h1 className="post-title">Post not found</h1>
        <a href="/blog" className="blog-back">&larr; All posts</a>
      </div>
    </main>
  )
}

function Blog({ slug }) {
  const post = slug ? findPost(slug) : null
  return (
    <>
      <Header />
      {!slug ? <BlogIndex /> : post ? <BlogPost post={post} /> : <NotFound />}
      <footer className="blog-footer">
        <a href="/">rajahaseebulhaq.live</a>
      </footer>
    </>
  )
}

export default Blog
