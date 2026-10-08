import { StrictMode, Suspense, lazy } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Two pages, no router: /blog and /blog/<slug> render the blog, anything else the portfolio.
// App stays eager: its GSAP and three.js setup expects to mount on first render.
const Blog = lazy(() => import('./blog/Blog.jsx'))

const blogMatch = window.location.pathname.match(/^\/blog(?:\/([^/]+))?\/?$/)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {blogMatch ? (
      <Suspense fallback={null}>
        <Blog slug={blogMatch[1]} />
      </Suspense>
    ) : (
      <App />
    )}
  </StrictMode>,
)
