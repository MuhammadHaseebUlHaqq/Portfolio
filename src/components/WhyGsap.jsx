import { Suspense } from 'react'
import Avatar3D from './Avatar3D'
import './WhyGsap.css'

const WhyGsap = () => {
  return (
    <section className="why-section" id="about">
      <div className="about-hero">
        <div className="about-hero-text">
          <div className="why-heading">
            <span className="brace">&#123;</span>
            <span className="title-text">About Me</span>
            <span className="brace">&#125;</span>
          </div>

          <p className="why-copy">
            I'm Muhammad Haseeb, a software engineer working across DevOps and applied AI — CI/CD pipelines, containers and Kubernetes on one side, LangChain, RAG and multi-agent systems on the other.
            <br />
            Two-time 1st place hackathon winner, most recently at CUST 2026 against 160+ teams. I care about shipping things that actually run in production.
          </p>
        </div>

        <div className="about-hero-avatar">
          <Suspense fallback={<div className="avatar-loading" />}>
            <Avatar3D />
          </Suspense>
        </div>
      </div>

      <div className="exp-edu-container">
        <div className="experience-section">
          <div className="why-heading sub-heading">
            <span className="brace">&#123;</span>
            <span className="title-text">My Experience</span>
            <span className="brace">&#125;</span>
          </div>
          <ul className="timeline-list">
            <li className="timeline-item">
              <span className="timeline-duration">Jun&nbsp;2026&nbsp;—&nbsp;Present</span>
              <div className="timeline-content">
                <span className="timeline-title">Systems Limited</span>
                <span className="timeline-subtitle">DevOps Engineer Intern</span>
              </div>
            </li>
            <li className="timeline-item">
              <span className="timeline-duration">Jul&nbsp;2025&nbsp;—&nbsp;Nov&nbsp;2025</span>
              <div className="timeline-content">
                <span className="timeline-title">Corzly</span>
                <span className="timeline-subtitle">Software Engineer (Remote, USA)</span>
              </div>
            </li>
            <li className="timeline-item">
              <span className="timeline-duration">Jun&nbsp;2025&nbsp;—&nbsp;Aug&nbsp;2025</span>
              <div className="timeline-content">
                <span className="timeline-title">Alfabolt</span>
                <span className="timeline-subtitle">Software Engineering Intern</span>
              </div>
            </li>
          </ul>
        </div>

        <div className="education-section">
          <div className="why-heading sub-heading">
            <span className="brace">&#123;</span>
            <span className="title-text">Education</span>
            <span className="brace">&#125;</span>
          </div>
          <ul className="timeline-list">
            <li className="timeline-item">
              <span className="timeline-duration">2023&nbsp;—&nbsp;Present</span>
              <div className="timeline-content">
                <span className="timeline-title">National University Of Science And Technology</span>
                <span className="timeline-subtitle">Bachelor in Computer Science (CGPA: 3.78)</span>
              </div>
            </li>
            <li className="timeline-item">
              <span className="timeline-duration">2021&nbsp;—&nbsp;2023</span>
              <div className="timeline-content">
                <span className="timeline-title">Punjab Group of Colleges</span>
                <span className="timeline-subtitle">FSC Pre-Engineering (Grade: A)</span>
              </div>
            </li>
            <li className="timeline-item">
              <span className="timeline-duration">2019&nbsp;—&nbsp;2021</span>
              <div className="timeline-content">
                <span className="timeline-title">Army Public School</span>
                <span className="timeline-subtitle">Matric Computer Science (Grade: A)</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </section>
  )
}

export default WhyGsap 