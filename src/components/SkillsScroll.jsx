import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './SkillsScroll.css'

gsap.registerPlugin(ScrollTrigger)

const skills = [
  {
    id: 'front-end',
    level: 'Expert',
    name: 'Front-End',
    desc1: 'React and Next.js – building pixel-perfect interfaces with performance in mind.',
    desc2: 'Focus on accessibility, animation, and component-driven architecture.',
  },
  {
    id: 'back-end',
    level: 'Advanced',
    name: 'Back-End',
    desc1: 'Express.js (Node) & FastAPI (Python) REST/GraphQL APIs, SQL & NoSQL databases.',
    desc2: 'Designing scalable architectures, authentication, and real-time data pipelines.',
  },
  {
    id: 'gen-ai',
    level: 'Researching',
    name: 'Generative AI',
    desc1: 'LLMs, RAG, LangGraph pipelines, vector search.',
    desc2: 'Building chatbots and creative tools with OpenAI and open-source models.',
  },
  {
    id: 'mobile',
    level: 'Proficient',
    name: 'Mobile App Dev',
    desc1: 'Native Android development using Java SDK.',
    desc2: 'Crafting intuitive, performant mobile experiences.',
  },
]

const SkillsScroll = () => {
  const wrapperRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const container = document.querySelector('.skills-container')
      const sections = gsap.utils.toArray('.skills-container section')
      const mask = document.querySelector('.skills-progress-mask')

      const scrollTween = gsap.to(sections, {
        xPercent: -100 * (sections.length - 1),
        ease: 'none',
        scrollTrigger: {
          trigger: container,
          pin: true,
          scrub: 1,
          end: `+=${sections.length * 1000}`,
        },
      })

      // progress bar fill animation
      gsap.to(mask, {
        width: '100%',
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: 'top left',
          scrub: 1,
        },
      })

      // per section staggered animations
      sections.forEach((section) => {
        const animEls = section.querySelectorAll('.anim')
        if (animEls.length === 0) return

        gsap.from(animEls, {
          y: -130,
          opacity: 0,
          duration: 2,
          ease: 'elastic',
          stagger: 0.1,
          scrollTrigger: {
            trigger: section,
            containerAnimation: scrollTween,
            start: 'left center',
          },
        })
      })
    }, wrapperRef)

    return () => ctx.revert()
  }, [])

  return (
    <div className="skills-wrapper" id="skills" ref={wrapperRef}>
      <div className="skills-heading why-heading">
        <span className="brace">&#123;</span>
        <span className="title-text">Skills</span>
        <span className="brace">&#125;</span>
      </div>

      <div className="skills-container">
        <svg viewBox="0 0 900 10" fill="none" xmlns="http://www.w3.org/2000/svg" className="skills-progress-bar">
          <path d="M9.9 6C9.44 8.28 7.42 10 5 10 2.24 10 0 7.76 0 5 0 2.24 2.24 0 5 0 7.42 0 9.44 1.72 9.9 4H445.1C445.56 1.72 447.58 0 450 0 452.42 0 454.44 1.72 454.9 4H890.1C890.56 1.72 892.58 0 895 0 897.76 0 900 2.24 900 5 900 7.76 897.76 10 895 10 892.58 10 890.56 8.28 890.1 6H454.9C454.44 8.28 452.42 10 450 10 447.58 10 445.56 8.28 445.1 6H9.9Z" fill="#D9D9D9" />
          <mask id="skillsMask" maskUnits="userSpaceOnUse" x="0" y="0" width="900" height="10">
            <path d="M9.9 6C9.44 8.28 7.42 10 5 10 2.24 10 0 7.76 0 5 0 2.24 2.24 0 5 0 7.42 0 9.44 1.72 9.9 4H445.1C445.56 1.72 447.58 0 450 0 452.42 0 454.44 1.72 454.9 4H890.1C890.56 1.72 892.58 0 895 0 897.76 0 900 2.24 900 5 900 7.76 897.76 10 895 10 892.58 10 890.56 8.28 890.1 6H454.9C454.44 8.28 452.42 10 450 10 447.58 10 445.56 8.28 445.1 6H9.9Z" fill="#D9D9D9" />
          </mask>
          <g mask="url(#skillsMask)">
            <rect className="skills-progress-mask" y="-49" height="99" fill="black" />
          </g>
        </svg>

        {skills.map((skill, idx) => (
          <section key={skill.id} className={`skill-section sec${idx + 1} pin`}>
            <span className="anim level">{skill.level}</span>
            <h1 className="anim name">{skill.name}</h1>

            <div className="col anim">
              <p>{skill.desc1}</p>
              <p>{skill.desc2}</p>
            </div>
          </section>
        ))}
      </div>
    </div>
  )
}

export default SkillsScroll 