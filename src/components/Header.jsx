import { useState, useEffect } from 'react'
import './Header.css'
import GsapLogo from './GsapLogo'

const resumeUrl = 'https://drive.google.com/file/d/1QI09LDERwu-IjxVadoQ86W7omW4TJEsv/view?usp=drive_link'

function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  // Close menu when resizing to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) setMenuOpen(false)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const toggleMenu = () => setMenuOpen((prev) => !prev)

  return (
    <header className="header-container">
      {/* Announcement Bar */}
      <div className="announcement-bar">
        <span className="announcement-icon" role="img" aria-label="announcement">
          📣
        </span>
        <span className="announcement-text">
          Now open to new opportunities — let's build something amazing together!
        </span>
      </div>

      {/* Main Navigation */}
      <nav className={`navbar ${menuOpen ? 'open' : ''}`}>
        <div className="nav-left">
          <a href="#" className="logo-link" aria-label="GSAP Home">
            <GsapLogo className="logo-img" />
          </a>
        </div>

        {/* Hamburger toggle */}
        <button
          className={`mobile-menu-btn ${menuOpen ? 'active' : ''}`}
          aria-label="Toggle navigation"
          aria-expanded={menuOpen}
          onClick={toggleMenu}
        >
          <span className="bar" />
          <span className="bar" />
          <span className="bar" />
        </button>

        <ul className="nav-menu">
          {[
            { label: 'Home', href: '#home' },
            { label: 'About', href: '#about' },
            { label: 'Skills', href: '#skills' },
            { label: 'Projects', href: '#projects' },
          ].map((item) => (
            <li key={item.label} className="nav-item" onClick={() => setMenuOpen(false)}>
              <a href={item.href} className="nav-link">
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="nav-right">
          <a href={resumeUrl} className="login-link" target="_blank" rel="noopener noreferrer">
            Download Resume
          </a>
          <a href="#contact" className="get-gsap-btn" onClick={() => setMenuOpen(false)}>
            Hire Me
          </a>
        </div>
      </nav>
    </header>
  )
}

export default Header 