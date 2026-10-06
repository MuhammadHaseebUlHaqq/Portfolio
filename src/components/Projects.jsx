import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Projects.css';
import bideezImg from '../assets/images/bideez.png';
import bideezAvif480 from '../assets/images/bideez-480.avif';
import bideezAvif960 from '../assets/images/bideez-960.avif';
import bideezWebp480 from '../assets/images/bideez-480.webp';
import bideezWebp960 from '../assets/images/bideez-960.webp';
import careerPrepImg from '../assets/images/careerprep.png';
import careerPrepAvif480 from '../assets/images/careerprep-480.avif';
import careerPrepAvif960 from '../assets/images/careerprep-960.avif';
import careerPrepWebp480 from '../assets/images/careerprep-480.webp';
import careerPrepWebp960 from '../assets/images/careerprep-960.webp';
import rideTogetherImg from '../assets/images/ridetogether.png';
import rideTogetherAvif480 from '../assets/images/ridetogether-480.avif';
import rideTogetherAvif960 from '../assets/images/ridetogether-960.avif';
import rideTogetherWebp480 from '../assets/images/ridetogether-480.webp';
import rideTogetherWebp960 from '../assets/images/ridetogether-960.webp';
import ballInfoImg from '../assets/images/ballinfo.png';
import ballInfoAvif480 from '../assets/images/ballinfo-480.avif';
import ballInfoAvif960 from '../assets/images/ballinfo-960.avif';
import ballInfoWebp480 from '../assets/images/ballinfo-480.webp';
import ballInfoWebp960 from '../assets/images/ballinfo-960.webp';
import havocImg from '../assets/images/havoc.png';
import havocAvif480 from '../assets/images/havoc-480.avif';
import havocAvif960 from '../assets/images/havoc-960.avif';
import havocWebp480 from '../assets/images/havoc-480.webp';
import havocWebp960 from '../assets/images/havoc-960.webp';
import footAnalysisImg from '../assets/images/footanalysis.png';
import footAnalysisAvif480 from '../assets/images/footanalysis-480.avif';
import footAnalysisAvif960 from '../assets/images/footanalysis-960.avif';
import footAnalysisWebp480 from '../assets/images/footanalysis-480.webp';
import footAnalysisWebp960 from '../assets/images/footanalysis-960.webp';
import botverseImg from '../assets/images/botverse.png';
import botverseAvif480 from '../assets/images/botverse-480.avif';
import botverseAvif960 from '../assets/images/botverse-960.avif';
import botverseWebp480 from '../assets/images/botverse-480.webp';
import botverseWebp960 from '../assets/images/botverse-960.webp';
import smartdocsImg from '../assets/images/smartdocs.png';
import smartdocsAvif480 from '../assets/images/smartdocs-480.avif';
import smartdocsAvif960 from '../assets/images/smartdocs-960.avif';
import smartdocsWebp480 from '../assets/images/smartdocs-480.webp';
import smartdocsWebp960 from '../assets/images/smartdocs-960.webp';
import llmInferenceImg from '../assets/images/llminference.png';
import llmInferenceAvif480 from '../assets/images/llminference-480.avif';
import llmInferenceAvif960 from '../assets/images/llminference-960.avif';
import llmInferenceWebp480 from '../assets/images/llminference-480.webp';
import llmInferenceWebp960 from '../assets/images/llminference-960.webp';
import distSgdImg from '../assets/images/distsgd.png';
import distSgdAvif480 from '../assets/images/distsgd-480.avif';
import distSgdAvif960 from '../assets/images/distsgd-960.avif';
import distSgdWebp480 from '../assets/images/distsgd-480.webp';
import distSgdWebp960 from '../assets/images/distsgd-960.webp';
import emotionImg from '../assets/images/emotion.png';
import emotionAvif480 from '../assets/images/emotion-480.avif';
import emotionAvif960 from '../assets/images/emotion-960.avif';
import emotionWebp480 from '../assets/images/emotion-480.webp';
import emotionWebp960 from '../assets/images/emotion-960.webp';
import forestCoverImg from '../assets/images/forestcover.png';
import forestCoverAvif480 from '../assets/images/forestcover-480.avif';
import forestCoverAvif960 from '../assets/images/forestcover-960.avif';
import forestCoverWebp480 from '../assets/images/forestcover-480.webp';
import forestCoverWebp960 from '../assets/images/forestcover-960.webp';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: 'proj9',
    title: 'LLM Inference Optimization – Measured on Real GPUs',
    desc: 'Research on why LLM serving engines are fast. HuggingFace vs vLLM on one RTX 3060: KV cache pushed to OOM at 123k tokens, profiler traces showing 90% of the decode gap is GPU idle time, and batching sweeps across two cards. Also reproduced an SGLang CUDA-graph bug (5.76x slowdown) on a rented 4090. Write-ups on the blog.',
    demo: '/blog',
    code: 'https://github.com/MuhammadHaseebUlHaqq/llm-inference-optimization',
    img: llmInferenceImg,
    imgAvifSrcSet: `${llmInferenceAvif480} 480w, ${llmInferenceAvif960} 960w`,
    imgWebpSrcSet: `${llmInferenceWebp480} 480w, ${llmInferenceWebp960} 960w`,
    tags: ['Research', 'LLM Inference', 'vLLM', 'SGLang'],
  },
  {
    id: 'proj7',
    title: 'Bideez – Multi-Agent RFP Bidding Pipeline',
    desc: 'Multi-agent pipeline that scores an RFP’s win probability, flags the gaps a buyer will raise, then writes the proposal. A voice agent roleplays a skeptical buyer for rehearsal. 1st place, CUST Hackathon 2026.',
    demo: 'https://bideez-frontend.vercel.app/',
    code: '',
    img: bideezImg,
    imgAvifSrcSet: `${bideezAvif480} 480w, ${bideezAvif960} 960w`,
    imgWebpSrcSet: `${bideezWebp480} 480w, ${bideezWebp960} 960w`,
    tags: ['AI Agents', 'LLMs', 'Voice AI'],
  },
  {
    id: 'proj8',
    title: 'CareerPrep – AI Career Preparation Platform',
    desc: 'Upload a resume and a Groq-served LLM extracts your skills, matches you to roles, and scores ATS compatibility, with voice-based mock interviews for practice. FastAPI and Supabase. 1st place, Soventure Web Dev Hackathon.',
    demo: 'https://careerpreppp.vercel.app/',
    code: '',
    img: careerPrepImg,
    imgAvifSrcSet: `${careerPrepAvif480} 480w, ${careerPrepAvif960} 960w`,
    imgWebpSrcSet: `${careerPrepWebp480} 480w, ${careerPrepWebp960} 960w`,
    tags: ['AI', 'FastAPI', 'LLMs'],
  },
  {
    id: 'proj10',
    title: 'Distributed SGD – Sync vs Async vs Hybrid Training',
    desc: 'Parameter-server training of ResNet-18 on CIFAR-10 with synchronous, asynchronous, and a hybrid mode that switches policy mid-training based on worker timing, gradient variation, and loss trend. Measured with injected stragglers over three seeds: async kept ~45 images/s while sync dropped to 13.6 under a persistent straggler.',
    demo: '',
    code: 'https://github.com/MuhammadHaseebUlHaqq/distributed_sgd_pdc',
    img: distSgdImg,
    imgAvifSrcSet: `${distSgdAvif480} 480w, ${distSgdAvif960} 960w`,
    imgWebpSrcSet: `${distSgdWebp480} 480w, ${distSgdWebp960} 960w`,
    tags: ['Distributed Systems', 'PyTorch', 'Docker'],
  },
  {
    id: 'proj11',
    title: 'Facial Emotion Recognition – CNN on FER-2013',
    desc: 'Classifies faces into seven emotions. Compared an MLP baseline, CNN variants, three optimizers, and MobileNetV2 transfer learning; the best CNN with built-in augmentation reached 58.3% test accuracy with 456k parameters (removing augmentation dropped it to 43.8%). Flask demo with face detection.',
    demo: '',
    code: 'https://github.com/MuhammadHaseebUlHaqq/facial_emotion_recognition',
    img: emotionImg,
    imgAvifSrcSet: `${emotionAvif480} 480w, ${emotionAvif960} 960w`,
    imgWebpSrcSet: `${emotionWebp480} 480w, ${emotionWebp960} 960w`,
    tags: ['Deep Learning', 'Computer Vision', 'TensorFlow'],
  },
  {
    id: 'proj12',
    title: 'Forest Cover Type Prediction – ML Model Comparison',
    desc: 'Predicts one of seven forest cover types from cartographic data (15,120 samples, 56 features). Tuned seven classifiers with 5-fold GridSearchCV; XGBoost and AdaBoost led validation at 88.2%, Random Forest generalized best at 86.8% test accuracy. Streamlit app for live predictions.',
    demo: 'https://forestcoverpredictionml-proj.streamlit.app/',
    code: 'https://github.com/MuhammadHaseebUlHaqq/Forest_Cover_Prediction_ML',
    img: forestCoverImg,
    imgAvifSrcSet: `${forestCoverAvif480} 480w, ${forestCoverAvif960} 960w`,
    imgWebpSrcSet: `${forestCoverWebp480} 480w, ${forestCoverWebp960} 960w`,
    tags: ['Machine Learning', 'XGBoost', 'Streamlit'],
  },
  {
    id: 'proj1',
    title: 'RideTogether – NUST Carpooling Platform',
    desc: 'Web app for NUST that matches drivers and passengers with maps and live ride discovery. MongoDB, JWT auth, and a responsive UI. Deployed on Vercel and Railway.',
    demo: 'https://ridetogether.vercel.app/',
    code: '',
    img: rideTogetherImg,
    imgAvifSrcSet: `${rideTogetherAvif480} 480w, ${rideTogetherAvif960} 960w`,
    imgWebpSrcSet: `${rideTogetherWebp480} 480w, ${rideTogetherWebp960} 960w`,
    tags: ['Design', 'Development'],
  },
  {
    id: 'proj3',
    title: 'HavocBoxing – Mobile Training App',
    desc: 'Android boxing trainer with workouts, interval timers, and session history. Built with Java, Firebase, and the Android SDK for a lightweight, focused training flow.',
    demo: '',
    code: 'https://github.com/MuhammadHaseebUlHaqq/HavocBoxing',
    img: havocImg,
    imgAvifSrcSet: `${havocAvif480} 480w, ${havocAvif960} 960w`,
    imgWebpSrcSet: `${havocWebp480} 480w, ${havocWebp960} 960w`,
    tags: ['Mobile'],
  },
  {
    id: 'proj5',
    title: 'Botverse – Universal AI Chatbot Platform',
    desc: 'Embeddable chatbot that answers only from your documents or a URL using RAG and vector search—no off-topic hallucinations. FastAPI backend, Docker-friendly, iframe or script integration.',
    demo: '',
    code: 'https://github.com/MuhammadHaseebUlHaqq/BotVerse',
    img: botverseImg,
    imgAvifSrcSet: `${botverseAvif480} 480w, ${botverseAvif960} 960w`,
    imgWebpSrcSet: `${botverseWebp480} 480w, ${botverseWebp960} 960w`,
    tags: ['AI', 'RAG', 'LLMs'],
  },
  {
    id: 'proj6',
    title: 'SmartDocs – AI-Powered Document Chat Assistant',
    desc: 'Upload a PDF or DOCX and chat with an AI grounded in that file. Django, embeddings in PostgreSQL, and a Next.js UI with Gemini or a local model. Auth and streaming responses.',
    demo: '',
    code: 'https://github.com/MuhammadHaseebUlHaqq/SmartDocs',
    img: smartdocsImg,
    imgAvifSrcSet: `${smartdocsAvif480} 480w, ${smartdocsAvif960} 960w`,
    imgWebpSrcSet: `${smartdocsWebp480} 480w, ${smartdocsWebp960} 960w`,
    tags: ['RAG', 'LLMs'],
  },
  {
    id: 'proj2',
    title: 'Ball Info – LaLiga Stats & Insights Platform',
    desc: 'LaLiga-focused analytics: squads, fixtures, standings, and news with filters and charts. React front end, Node and Express API, MongoDB, and secure admin CRUD.',
    demo: '',
    code: 'https://github.com/MuhammadHaseebUlHaqq/ballinfo',
    img: ballInfoImg,
    imgAvifSrcSet: `${ballInfoAvif480} 480w, ${ballInfoAvif960} 960w`,
    imgWebpSrcSet: `${ballInfoWebp480} 480w, ${ballInfoWebp960} 960w`,
    tags: ['Design', 'Development'],
  },
  {
    id: 'proj4',
    title: 'PitchVision – Football Analysis with Computer Vision',
    desc: 'Computer vision on football footage: detection, pose, speed, and heatmaps for coaches and analysts. Python, OpenCV, TensorFlow, and FastAPI with secure uploads.',
    demo: '',
    code: 'https://github.com/ZaynIkhlaq/Football-Analysis',
    img: footAnalysisImg,
    imgAvifSrcSet: `${footAnalysisAvif480} 480w, ${footAnalysisAvif960} 960w`,
    imgWebpSrcSet: `${footAnalysisWebp480} 480w, ${footAnalysisWebp960} 960w`,
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
        img.sizes = '(max-width: 600px) 92vw, (max-width: 860px) 46vw, 30vw';
        img.srcset = project.imgWebpSrcSet;
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
          A curated selection of what I&rsquo;ve built and researched, from LLM
          inference experiments to full-stack platforms and AI tools.
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
                    <picture>
                      <source
                        type="image/avif"
                        srcSet={proj.imgAvifSrcSet}
                        sizes="(max-width: 600px) 92vw, (max-width: 860px) 46vw, 30vw"
                      />
                      <source
                        type="image/webp"
                        srcSet={proj.imgWebpSrcSet}
                        sizes="(max-width: 600px) 92vw, (max-width: 860px) 46vw, 30vw"
                      />
                      <img
                        src={proj.img}
                        alt={proj.title}
                        loading={index < INITIAL_COUNT ? 'eager' : 'lazy'}
                        fetchPriority={index === 0 ? 'high' : 'auto'}
                        decoding="async"
                      />
                    </picture>
                  </div>
                  <div className="project--showcaseBtn">
                    <a
                      href={demoHref}
                      target={demoHref.startsWith('/') ? undefined : '_blank'}
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
