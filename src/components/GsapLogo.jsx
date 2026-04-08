import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import rhLogo from '../assets/images/rh_logo_new.png'

const GsapLogo = ({ className }) => {
  const logoRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        logoRef.current,
        { opacity: 0, scale: 0.6, rotate: -15 },
        {
          opacity: 1,
          scale: 1,
          rotate: 0,
          duration: 1.2,
          ease: 'back.out(1.7)',
          delay: 0.3,
        }
      )
    })
    return () => ctx.revert()
  }, [])

  return (
    <img
      ref={logoRef}
      src={rhLogo}
      alt="RH Logo"
      className={className}
      style={{ opacity: 0 }}
    />
  )
}

export default GsapLogo 