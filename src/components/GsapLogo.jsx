import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'

// This component draws the GSAP logo paths in sequence using a simple
// stroke-dashoffset trick so we don't need the paid DrawSVGPlugin.
const GsapLogo = ({ className }) => {
  const logoRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate the text element (draw effect then fill)
      const textEl = logoRef.current.querySelector('text')
      if (textEl) {
        const length = textEl.getComputedTextLength()

        gsap.set(textEl, {
          stroke: '#FFFBE6',
          fill: 'none',
          strokeWidth: 2,
          strokeDasharray: length,
          strokeDashoffset: length,
        })

        gsap.to(textEl, {
          strokeDashoffset: 0,
          duration: 1.6,
          ease: 'power2.out',
          onComplete: () => {
            gsap.to(textEl, { fill: '#FFFBE6', duration: 0.5 })
          },
        })
      }
    }, logoRef)

    return () => ctx.revert()
  }, [])

  return (
    <svg
      ref={logoRef}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 200 100"
      className={className}
      aria-label="RH Logo"
    >
      {/* Background rectangle omitted because navbar already has dark background */}
      <g transform="skewX(-10)">
        <text
          x="20"
          y="80"
          font-family="Arial, sans-serif"
          font-weight="bold"
          font-size="110"
          fill="#FFFBE6"
        >
          RH
        </text>
      </g>
    </svg>
  )
}

export default GsapLogo 