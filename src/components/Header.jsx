import './Header.css'
import GsapLogo from './GsapLogo'

const resumeUrl = 'https://drive.google.com/file/d/1QI09LDERwu-IjxVadoQ86W7omW4TJEsv/view?usp=drive_link'

function Header() {
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
      <nav className="navbar">
        <div className="nav-left">
          <a href="#" className="logo-link" aria-label="GSAP Home">
            <GsapLogo className="logo-img" />
          </a>
        </div>

        <ul className="nav-menu">
          {['Home', 'About', 'Projects', 'Skills', 'Blog'].map((item) => (
            <li key={item} className="nav-item">
              <a href="#" className="nav-link">
                {item}
              </a>
            </li>
          ))}
        </ul>

        <div className="nav-right">
          <a href={resumeUrl} className="login-link" target="_blank" rel="noopener noreferrer">
            Download Resume
          </a>
          <a href="#contact" className="get-gsap-btn">Hire Me</a>
        </div>
      </nav>
    </header>
  )
}

export default Header 