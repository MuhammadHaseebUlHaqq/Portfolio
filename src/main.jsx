import { StrictMode, Suspense, lazy } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

// Two pages, no router: /blog and /blog/<slug> render the blog, anything else the portfolio.
// Lazy so the blog does not download the three.js avatar bundle.
const App = lazy(() => import('./App.jsx'))
const Blog = lazy(() => import('./blog/Blog.jsx'))

const blogMatch = window.location.pathname.match(/^\/blog(?:\/([^/]+))?\/?$/)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Suspense fallback={null}>
      {blogMatch ? <Blog slug={blogMatch[1]} /> : <App />}
    </Suspense>
  </StrictMode>,
)
