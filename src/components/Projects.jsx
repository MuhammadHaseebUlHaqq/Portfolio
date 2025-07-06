import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Projects.css';
import rideTogetherImg from '../assets/images/ridetogether.png'
import ballInfoImg from '../assets/images/ballinfo.png'
import havocImg from '../assets/images/havoc.png'
import footAnalysisImg from '../assets/images/footanalysis.png'
import botverseImg from '../assets/images/botverse.png'
import smartdocsImg from '../assets/images/smartdocs.png'
import linkIcon from '../assets/images/link.png'

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: 'proj1',
    title: 'RideTogether – NUST Carpooling Platform',
    desc: 'A student-focused carpooling platform built for NUST, RideTogether streamlines campus transportation by connecting drivers and passengers heading in the same direction. With real-time ride discovery, interactive maps, and secure user accounts, it promotes cost-saving, sustainability, and student networking. Leveraging location-based filtering, advanced search capabilities, and a clean, responsive UI, the platform stores data in MongoDB, ensures real-time interactions, and maintains account security with JWT and Bcrypt. Deployed on Vercel (frontend) and Railway (backend), RideTogether is optimized for performance across all devices.',
    link: 'https://ridetogether.vercel.app/',
    img: rideTogetherImg,
    tags: ['Design', 'Development'],
  },
  {
    id: 'proj3',
    title: 'HavocBoxing – Mobile Training App',
    desc: 'A mobile boxing training app built in Java for Android, HavocBoxing empowers users with guided workouts, customizable timers, and performance tracking. Unlike generic fitness apps, it offers boxing-specific routines, interval timing, and detailed session logging to help users sharpen technique and monitor progress. Developed with the Android SDK, Firebase, and Gradle, it delivers a lightweight, intuitive interface optimized for smooth performance on all Android devices.',
    link: 'https://github.com/MuhammadHaseebUlHaqq/HavocBoxing',
    img: havocImg,
    tags: ['Mobile'],
  },
  {
    id: 'proj5',
    title: 'Botverse – Universal AI Chatbot Platform',
    desc: 'Botverse is an embeddable, AI-powered chatbot that answers user queries based exclusively on uploaded documents (PDF, DOCX, TXT) or a provided URL. It prevents hallucinations by restricting responses to the supplied content, uses RAG with vector search and LLMs, and can be integrated into any website via an iframe or JS script. Built with a Python backend (FastAPI), vector store, and hosted via Docker, it\'s secure, performant, and easy to deploy.',
    link: 'https://github.com/MuhammadHaseebUlHaqq/BotVerse',
    img: botverseImg,
    tags: ['AI', 'RAG', 'LLMs'],
  },
  {
    id: 'proj6',
    title: 'SmartDocs – AI-Powered Document Chat Assistant',
    desc: 'SmartDocs lets users upload PDFs or DOCX files and chat with an AI that answers strictly from that document\'s content. A Django backend extracts text, creates embeddings with sentence-transformers, and stores vectors in PostgreSQL. A cosine-retriever fetches top passages and feeds them to Google Gemini or a local FLAN-T5 model, while a Next.js 13 frontend streams responses in a chat UI with JWT/Google auth and live status updates via WebSockets.',
    link: 'https://github.com/MuhammadHaseebUlHaqq/SmartDocs',
    img: smartdocsImg,
    tags: ['RAG', 'LLMs'],
  },
  {
    id: 'proj2',
    title: 'Ball Info – LaLiga Stats & Insights Platform',
    desc: 'A web-based football analytics platform focused on LaLiga, Ball Info delivers dynamic player and team insights through powerful filtering, aggregation pipelines, and interactive visuals. Users can explore squads by team, position, or nationality, check match fixtures and standings, and stay updated with the latest league news. Built with Node.js, Express.js, MongoDB, and a component-based React frontend, it features secure admin tools for creating, editing, and deleting records, making it both scalable and intuitive.',
    link: 'https://github.com/MuhammadHaseebUlHaqq/ballinfo',
    img: ballInfoImg,
    tags: ['Design', 'Development'],
  },
  {
    id: 'proj4',
    title: 'PitchVision – Football Analysis with Computer Vision',
    desc: 'PitchVision applies YOLO object detection and custom pose-estimation models to both training and match footage, extracting key metrics such as player speed, positioning heatmaps, and tactical formations. Coaches and analysts gain actionable insights through interactive dashboards that visualize player movement and team dynamics. Built with Python, OpenCV, TensorFlow, and FastAPI, and featuring secure uploads and real-time processing, PitchVision revolutionizes how football performance is analyzed.',
    link: 'https://github.com/ZaynIkhlaq/Football-Analysis',
    img: footAnalysisImg,
    tags: ['Computer Vision'],
  },
];

function Projects() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // initial stagger reveal (replaced by per-card scroll triggers)
      const revealCards = gsap.utils.toArray('.project-card');
      revealCards.forEach((card) => {
        gsap.from(card, {
          opacity: 0,
          x: 60,
          duration: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play none none reverse', // play on enter, reverse on leave
          },
        });

        // image zoom-out during reveal, tied to the same card trigger
        const img = card.querySelector('.project-img-wrapper img');
        if (img) {
          gsap.from(img, {
            scale: 1.2,
            duration: 0.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          });
        }
      });

      // Parallax tilt on mouse move
      const cards = gsap.utils.toArray('.project-card');
      cards.forEach((card) => {
        let bounds;

        card.addEventListener('mouseenter', () => {
          bounds = card.getBoundingClientRect();
        });

        card.addEventListener('mousemove', (e) => {
          if (!bounds) bounds = card.getBoundingClientRect();
          const relX = e.clientX - bounds.left - bounds.width / 2;
          const relY = e.clientY - bounds.top - bounds.height / 2;
          const rotateX = (+relY / bounds.height) * 6; // max 8deg
          const rotateY = (-relX / bounds.width) * 6;
          gsap.to(card, { rotateX, rotateY, duration: 0.4, ease: 'power2.out' });
        });

        card.addEventListener('mouseleave', () => {
          gsap.to(card, { rotateX: 0, rotateY: 0, duration: 0.6, ease: 'power3.out' });
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="projects-section" id="projects" ref={sectionRef}>
      <div className="why-heading">
        <span className="brace">&#123;</span>
        <span className="title-text">Projects</span>
        <span className="brace">&#125;</span>
      </div>

      <div className="projects-grid">
        {projects.map((proj) => (
          <div key={proj.id} className="project-card">
            <div className="project-img-wrapper">
              <img src={proj.img} alt={proj.title} />
            </div>

            <div className="project-overlay">
              <div className="overlay-top">
                <h3 className="project-title">{proj.title}</h3>
                <a
                  href={proj.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="open-btn"
                  aria-label={`Open ${proj.title}`}
                >
                  <img src={linkIcon} alt="Link icon" width="16" height="16" />
                </a>
              </div>
              <div className="overlay-tags">
                {proj.tags.map((tag) => (
                  <span key={tag} className="tag-chip">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Projects; 