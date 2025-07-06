import './WhyGsap.css'

const WhyGsap = () => {
  return (
    <section className="why-section" id="about">
      <div className="why-heading">
        <span className="brace">&#123;</span>
        <span className="title-text">About Me</span>
        <span className="brace">&#125;</span>
      </div>

      <p className="why-copy">
        I'm Muhammad Haseeb, a software engineer who loves turning ideas into scalable, high-performance web applications.<br />
        Focused on delivering clean code, delightful user experiences, and continuous improvement.
      </p>

      {/* Experience & Education */}
      <div className="exp-edu-container">
        {/* Experience */}
        <div className="experience-section">
          <div className="why-heading sub-heading">
            <span className="brace">&#123;</span>
            <span className="title-text">My Experience</span>
            <span className="brace">&#125;</span>
          </div>
          <ul className="timeline-list">
            <li className="timeline-item">
              <span className="timeline-duration">Jun&nbsp;2025&nbsp;—&nbsp;Present</span>
              <div className="timeline-content">
                <span className="timeline-title">Alfabolt</span>
                <span className="timeline-subtitle">Front-End Intern</span>
              </div>
            </li>
          </ul>
        </div>

        {/* Education */}
        <div className="education-section">
          <div className="why-heading sub-heading">
            <span className="brace">&#123;</span>
            <span className="title-text">Education</span>
            <span className="brace">&#125;</span>
          </div>
          <ul className="timeline-list">
            {/* University */}
            <li className="timeline-item">
              <span className="timeline-duration">2023&nbsp;—&nbsp;Present</span>
              <div className="timeline-content">
                <span className="timeline-title">National University Of Science And Technology</span>
                <span className="timeline-subtitle">Bachelor in Computer Science (CGPA: 3.82)</span>
              </div>
            </li>
            {/* College */}
            <li className="timeline-item">
              <span className="timeline-duration">2021&nbsp;—&nbsp;2023</span>
              <div className="timeline-content">
                <span className="timeline-title">Punjab Group of Colleges</span>
                <span className="timeline-subtitle">FSC Pre-Engineering (1023/1100)</span>
              </div>
            </li>
            {/* School */}
            <li className="timeline-item">
              <span className="timeline-duration">2019&nbsp;—&nbsp;2021</span>
              <div className="timeline-content">
                <span className="timeline-title">Army Public School</span>
                <span className="timeline-subtitle">Matric Computer Science (1075/1100)</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </section>
  )
}

export default WhyGsap 