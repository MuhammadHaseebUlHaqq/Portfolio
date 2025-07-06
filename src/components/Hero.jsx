import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { TextPlugin } from 'gsap/TextPlugin'
import './Hero.css'
import wormImg from '../assets/images/worm.png'
import fanImg from '../assets/images/fan.png'

gsap.registerPlugin(ScrollTrigger, TextPlugin)

const Hero = () => {
  const heroRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

      // lines animation
      tl.from('.hero-line', {
        yPercent: 110,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
      })

      // CTA fade in
      tl.from('.hero-cta', { opacity: 0, y: 20, duration: 0.6 }, '-=0.4')

      // pinwheel perpetual rotate
      gsap.to('.pinwheel', { rotate: 90, repeat: -1, ease: 'none', duration: 1.4 })

      // worm float
      gsap.to('.worm', {
        y: -40,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        duration: 8,
      })

      // text flip animation for "i" to "!"
      const iFlipTimeline = gsap.timeline({ repeat: -1, repeatDelay: 2 })
      iFlipTimeline
        .to('#flip-i', {
          rotationX: 90,
          duration: 0.4,
          ease: 'power2.inOut',
        })
        .set('#flip-i', { text: '!' })
        .to('#flip-i', {
          rotationX: 0,
          duration: 0.4,
          ease: 'power2.inOut',
        })
        .to('#flip-i', {
          rotationX: -90,
          duration: 0.4,
          ease: 'power2.inOut',
          delay: 2,
        })
        .set('#flip-i', { text: 'i' })
        .to('#flip-i', {
          rotationX: 0,
          duration: 0.4,
          ease: 'power2.inOut',
        })

      // ----- Get GSAP button hover animation -----
      const btn = document.querySelector('#gsap-btn')
      if (btn) {
        const tlHover = gsap.timeline({ paused: true })

        tlHover.to(btn.querySelector('.word-get'), {
          x: -25,
          duration: 0.25,
          ease: 'power2.out',
        })
        tlHover.to(
          btn.querySelector('.word-gsap'),
          {
            x: 25,
            duration: 0.25,
            ease: 'power2.out',
          },
          0,
        )
        tlHover.add(() => launchConfetti(btn), 0)

        // On click scroll to contact section
        btn.addEventListener('click', () => {
          document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
        })

        btn.addEventListener('mouseenter', () => tlHover.restart())
        btn.addEventListener('mouseleave', () => tlHover.reverse())
      }

      function launchConfetti(container) {
        const colors = ['#00ff81', '#14ffec', '#f5f013', '#ff5fc3']
        for (let i = 0; i < 35; i++) {
          const piece = document.createElement('div')
          piece.className = 'confetti-piece'
          piece.style.backgroundColor =
            colors[Math.floor(Math.random() * colors.length)]
          container.appendChild(piece)
          const angle = Math.random() * Math.PI * 2
          const distance = 300 + Math.random() * 120
          gsap.fromTo(
            piece,
            { x: 0, y: 0, opacity: 1, scale: 1 },
            {
              x: Math.cos(angle) * distance,
              y: Math.sin(angle) * distance,
              opacity: 0,
              scale: 0,
              rotate: Math.random() * 720,
              duration: 1.2 + Math.random() * 0.8,
              ease: 'power2.out',
              onComplete: () => piece.remove(),
            },
          )
        }
      }

      // pin curly braces callout while scrolling hero out
      ScrollTrigger.create({
        trigger: heroRef.current,
        start: 'top top',
        end: 'bottom top',
        // pinning callout removed to avoid overlap
        // pin: '.callout',
        // pinSpacing: false,
      })
    }, heroRef)

    return () => ctx.revert()
  }, [])

  return (
    <section className="hero" id="home" ref={heroRef}>
      <div className="hero-inner">
        <h1 className="hero-line line-1">Code</h1>
        <h1 className="hero-line line-2">anyth<span id="flip-i">i</span>ng</h1>

        {/* Decorations */}
        <img src={fanImg} className="pinwheel" alt="" />

        <img src={wormImg} className="worm" alt="" />

        <div className="callout">
          <span className="brace">&#123;</span> Crafting robust software solutions with passion and professionalism <span className="brace">&#125;</span>
        </div>

        <button className="hero-cta get-gsap-btn" id="gsap-btn">
          <span className="btn-word word-get">Hire</span>
          <span className="btn-word word-gsap">Me</span>
        </button>
      </div>
    </section>
  )
}

export default Hero 