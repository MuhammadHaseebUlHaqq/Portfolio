import { useRef, useState } from 'react'
import emailjs from '@emailjs/browser'
import './Contact.css'
import upworkLogo from '../assets/images/upwork.png'

const Contact = () => {
  const formRef = useRef(null)
  const [status, setStatus] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

    setLoading(true)
    emailjs.sendForm(serviceId, templateId, formRef.current, publicKey)
      .then((result) => {
        console.log(result.text)
        setStatus('success')
        e.target.reset()
        setTimeout(() => setStatus(null), 1000)
        setLoading(false)
      }, (error) => {
        console.log(error.text)
        setStatus('error')
        setTimeout(() => setStatus(null), 1000)
        setLoading(false)
      })
  }

  return (
    <section className="contact-section" id="contact">
      <div className="contact-inner">
        <div className="contact-info">
          <h2 className="contact-heading">For Business Enquiry</h2>
          <ul className="contact-list">
            <li>
              <span className="contact-icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="18" height="18" fill="currentColor">
                  <path d="M502.3 190.8 327.4 338.3c-15.8 13.7-39.5 13.7-55.3 0L9.7 190.8C3.9 185.9 0 179 0 171.6 0 150.6 17 134 37.9 134h436.2c21 0 38.1 16.6 38.1 37.6 0 7.4-3.9 14.3-9.9 19.2zM0 208.3v180.1c0 20.9 17 37.6 37.9 37.6h436.2c21 0 38.1-16.6 38.1-37.6V208.3L327.4 355.8c-31.5 27.2-78.3 27.2-109.8 0L0 208.3z" />
                </svg>
              </span>
              <a href="mailto:rajahaseebulhaq@gmail.com">rajahaseebulhaq@gmail.com</a>
            </li>
            <li>
              <span className="contact-icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2A19.86 19.86 0 0 1 3 5.18 2 2 0 0 1 5 3h3a2 2 0 0 1 2 1.72 12.66 12.66 0 0 0 .7 2.81 2 2 0 0 1-.45 2L9.03 11a16 16 0 0 0 6 6l1.47-1.22a2 2 0 0 1 2-.45 12.66 12.66 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
              </span>
              <a href="tel:+923341490899">+92 3341490899</a>
            </li>
          </ul>
          <div className="social-links">
            <a
              href="https://www.linkedin.com/in/muhammad-haseeb-ul-haq-182521291/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="social-btn"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="20"
                height="20"
                fill="currentColor"
              >
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.025-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.354V9h3.414v1.561h.049c.476-.9 1.637-1.852 3.368-1.852 3.598 0 4.27 2.368 4.27 5.452v6.291zM5.337 7.433a2.062 2.062 0 1 1 0-4.124 2.062 2.062 0 0 1 0 4.124zm1.779 13.019H3.558V9h3.558v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.226.792 24 1.771 24h20.451C23.2 24 24 23.226 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
              </svg>
            </a>
            <a
              href="https://github.com/MuhammadHaseebUlHaqq"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="social-btn"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="20"
                height="20"
                fill="currentColor"
              >
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.387.6.113.793-.26.793-.577 0-.285-.01-1.04-.016-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.757-1.333-1.757-1.089-.745.083-.73.083-.73 1.205.085 1.84 1.236 1.84 1.236 1.07 1.835 2.807 1.305 3.492.997.108-.775.418-1.305.763-1.605-2.665-.304-5.467-1.332-5.467-5.93 0-1.31.468-2.38 1.236-3.22-.124-.303-.536-1.523.117-3.176 0 0 1.008-.322 3.3 1.23a11.49 11.49 0 0 1 3.003-.404c1.02.005 2.045.138 3.003.404 2.29-1.552 3.295-1.23 3.295-1.23.655 1.653.243 2.873.12 3.176.77.84 1.235 1.91 1.235 3.22 0 4.61-2.807 5.624-5.479 5.921.43.37.814 1.096.814 2.21 0 1.596-.015 2.884-.015 3.276 0 .32.192.694.8.576C20.565 21.796 24 17.296 24 12 24 5.37 18.627 0 12 0z" />
              </svg>
            </a>
            <a
              href="https://www.upwork.com/freelancers/~01383f23af82b030e7"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Upwork"
              className="social-btn"
            >
              <img src={upworkLogo} alt="Upwork" className="social-img" />
            </a>
          </div>
        </div>

        <div className="contact-form-wrapper">
          <h2 className="contact-heading">Prefer forms?</h2>
          <div className="form-card">
            <form
              ref={formRef}
              className="contact-form"
              onSubmit={handleSubmit}
            >
              <label>
                Name
                <input type="text" name="user_name" required />
              </label>
              <label>
                Email
                <input type="email" name="user_email" required />
              </label>
              <label>
                Message
                <textarea name="message" rows="5" required />
              </label>
              <button type="submit" className="submit-btn" disabled={loading}>
                {loading ? <span className="spinner" /> : 'Submit'}
              </button>
            </form>
            {status === 'success' && (
              <div className="form-alert success">Message sent! I will get back to you soon.</div>
            )}
            {status === 'error' && (
              <div className="form-alert error">Oops – something went wrong. Please try again later.</div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact 