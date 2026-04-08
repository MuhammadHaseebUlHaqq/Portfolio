import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Projects.css';
import rideTogetherImg from '../assets/images/ridetogether.png';
import ballInfoImg from '../assets/images/ballinfo.png';
import havocImg from '../assets/images/havoc.png';
import footAnalysisImg from '../assets/images/footanalysis.png';
import botverseImg from '../assets/images/botverse.png';
import smartdocsImg from '../assets/images/smartdocs.png';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: 'proj1',
    title: 'RideTogether – NUST Carpooling Platform',
    desc: 'Web app for NUST that matches drivers and passengers with maps and live ride discovery. MongoDB, JWT auth, and a responsive UI. Deployed on Vercel and Railway.',
    demo: 'https://ridetogether.vercel.app/',
    code: '',
    img: rideTogetherImg,
    tags: ['Design', 'Development'],
  },
  {
    id: 'proj3',
    title: 'HavocBoxing – Mobile Training App',
    desc: 'Android boxing trainer with workouts, interval timers, and session history. Built with Java, Firebase, and the Android SDK for a lightweight, focused training flow.',
    demo: '',
    code: 'https://github.com/MuhammadHaseebUlHaqq/HavocBoxing',
    img: havocImg,
    tags: ['Mobile'],
  },
  {
    id: 'proj5',
    title: 'Botverse – Universal AI Chatbot Platform',
    desc: 'Embeddable chatbot that answers only from your documents or a URL using RAG and vector search—no off-topic hallucinations. FastAPI backend, Docker-friendly, iframe or script integration.',
    demo: '',
    code: 'https://github.com/MuhammadHaseebUlHaqq/BotVerse',
    img: botverseImg,
    tags: ['AI', 'RAG', 'LLMs'],
  },
  {
    id: 'proj6',
    title: 'SmartDocs – AI-Powered Document Chat Assistant',
    desc: 'Upload a PDF or DOCX and chat with an AI grounded in that file. Django, embeddings in PostgreSQL, and a Next.js UI with Gemini or a local model. Auth and streaming responses.',
    demo: '',
    code: 'https://github.com/MuhammadHaseebUlHaqq/SmartDocs',
    img: smartdocsImg,
    tags: ['RAG', 'LLMs'],
  },
  {
    id: 'proj2',
    title: 'Ball Info – LaLiga Stats & Insights Platform',
    desc: 'LaLiga-focused analytics: squads, fixtures, standings, and news with filters and charts. React front end, Node and Express API, MongoDB, and secure admin CRUD.',
    demo: '',
    code: 'https://github.com/MuhammadHaseebUlHaqq/ballinfo',
    img: ballInfoImg,
    tags: ['Design', 'Development'],
  },
  {
    id: 'proj4',
    title: 'PitchVision – Football Analysis with Computer Vision',
    desc: 'Computer vision on football footage: detection, pose, speed, and heatmaps for coaches and analysts. Python, OpenCV, TensorFlow, and FastAPI with secure uploads.',
    demo: '',
    code: 'https://github.com/ZaynIkhlaq/Football-Analysis',
    img: footAnalysisImg,
    tags: ['Computer Vision'],
  },
];

const INITIAL_COUNT = 3;

function IconPlay() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}

function IconCode() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  );
}

function IconArrowRight() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}

function IconArrowLeft() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <line x1="19" y1="12" x2="5" y2="12" />
      <polyline points="12 19 5 12 12 5" />
    </svg>
  );
}

function Projects() {
  const sectionRef = useRef(null);
  const [showAll, setShowAll] = useState(false);

  const visible = showAll ? projects : projects.slice(0, INITIAL_COUNT);

  // One-time scroll-triggered header animation
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.from('.projects-subtitle', {
        y: 30,
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.projects-header',
          start: 'top 82%',
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  // Staggered card entrance whenever the visible list changes
  useEffect(() => {
    const cards = sectionRef.current?.querySelectorAll('.singleProject');
    if (!cards || cards.length === 0) return;

    gsap.fromTo(
      cards,
      { y: 55, opacity: 0, scale: 0.96 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.7,
        stagger: 0.1,
        ease: 'power3.out',
        clearProps: 'transform,opacity,scale',
      }
    );
  }, [visible.length]);

  // Warm project image cache during idle time to reduce perceived latency.
  useEffect(() => {
    const preload = () => {
      projects.forEach((project) => {
        const img = new Image();
        img.decoding = 'async';
        img.src = project.img;
      });
    };

    if ('requestIdleCallback' in window) {
      const idleId = window.requestIdleCallback(preload, { timeout: 1200 });
      return () => window.cancelIdleCallback(idleId);
    }

    const timeoutId = window.setTimeout(preload, 200);
    return () => window.clearTimeout(timeoutId);
  }, []);

  return (
    <section className="projects-section" id="projects" ref={sectionRef}>
      <div className="projects-header">
        <h1 className="projects-main-title">
          <span className="brace">&#123;</span>
          <span className="title-text">Projects</span>
          <span className="brace">&#125;</span>
        </h1>
        <p className="projects-subtitle">
          A curated selection of projects I&rsquo;ve built &mdash; from full-stack
          platforms to AI-powered tools.
        </p>
      </div>

      <div className="projects--body">
        <div className="projects--bodyContainer">
          {visible.map((proj, index) => {
            const slug = proj.title.replace(/\s+/g, '-').toLowerCase();
            const demoHref = proj.demo || proj.code;
            const codeHref = proj.code || proj.demo;
            return (
              <div key={proj.id} className="singleProject">
                <div className="projectContent">
                  <h2 id={slug} className="project-card-heading">
                    {proj.title}
                  </h2>
                  <div className="project-image-frame">
                    <img
                      src={proj.img}
                      alt={proj.title}
                      loading={index < INITIAL_COUNT ? 'eager' : 'lazy'}
                      fetchPriority={index === 0 ? 'high' : 'auto'}
                      decoding="async"
                    />
                  </div>
                  <div className="project--showcaseBtn">
                    <a
                      href={demoHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-icon-btn"
                      aria-label={`${proj.title} live demo`}
                    >
                      <IconPlay />
                    </a>
                    <a
                      href={codeHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-icon-btn"
                      aria-label={`${proj.title} source code`}
                    >
                      <IconCode />
                    </a>
                  </div>
                </div>
                <p className="project--desc">{proj.desc}</p>
                <div className="project--lang">
                  {proj.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {projects.length > INITIAL_COUNT && (
          <div className="projects--toolbar">
            {showAll ? (
              <button
                type="button"
                className="projects-back-btn"
                onClick={() => {
                  setShowAll(false);
                  requestAnimationFrame(() => {
                    sectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  });
                }}
              >
                <span className="projects-back-icon" aria-hidden>
                  <IconArrowLeft />
                </span>
                Back to featured
              </button>
            ) : (
              <button
                type="button"
                className="projects-view-all-btn"
                onClick={() => setShowAll(true)}
              >
                View All
                <span className="projects-view-all-icon" aria-hidden>
                  <IconArrowRight />
                </span>
              </button>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

export default Projects;
