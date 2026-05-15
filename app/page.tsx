'use client';

import { useState, useEffect, useRef } from 'react';
import {
  ArrowDown,
  Phone,
  Mail,
  ArrowUp,
  Search,
  X,
} from 'lucide-react';

const TRANSLATIONS = {
  en: {
    subtitle: 'HIGH-END VIDEO EDITING / MOTION DESIGN',
    titleLine1: 'ZULBROL / EDITING EMOTION',
    titleLine2: 'INTO MOTION.',
    btnProjects: 'View Projects',
    selectedWork: 'Selected Work',
    searchPlaceholder: 'Which Service Do You Desire?',
    connect: 'CONNECT',
    brief: "Let's shape your next visual piece.",
    footer: 'AVAILABLE WORLDWIDE',
  },
  pt: {
    subtitle: 'EDIÇÃO DE VÍDEO HIGH-END / MOTION DESIGN',
    titleLine1: 'ZULBROL / EDITING EMOTION',
    titleLine2: 'INTO MOTION.',
    btnProjects: 'Ver Projetos',
    selectedWork: 'Trabalhos Selecionados',
    searchPlaceholder: 'Qual Serviço Você Deseja?',
    connect: 'CONTATO',
    brief: 'Vamos dar forma à sua próxima obra visual.',
    footer: 'DISPONÍVEL MUNDIALMENTE',
  },
};

const PROJECTS = [
  {
    id: 1,
    title: 'MONOLITH',
    category: 'DIRECTION / MOTION',
    year: '2026',
    thumb: '/thumbs/project1.jpg',
    video: '/videos/project1.mp4',
    tags: ['motion', 'direction', 'edição', 'video'],
  },
  {
    id: 2,
    title: 'SILK FLOW',
    category: 'FLUID CGI / VFX',
    year: '2026',
    thumb: '/thumbs/project2.jpg',
    video: '/videos/project2.mp4',
    tags: ['vfx', 'cgi', 'fluid', 'simulação'],
  },
  {
    id: 3,
    title: 'ECHOES',
    category: 'CINEMATIC EDITING',
    year: '2025',
    thumb: '/thumbs/project3.jpg',
    video: '/videos/project3.mp4',
    tags: ['editing', 'cinematic', 'edição', 'pós'],
  },
  {
    id: 4,
    title: 'DARK MATTER',
    category: 'POST-PRODUCTION',
    year: '2025',
    thumb: '/thumbs/project4.jpg',
    video: '/videos/project4.mp4',
    tags: ['post', 'vfx', 'production', 'pós-produção'],
  },
];

export default function Home() {
  const [lang, setLang] = useState<'en' | 'pt'>('pt');
  const [searchQuery, setSearchQuery] = useState('');
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  const customCursorRef = useRef<HTMLDivElement>(null);

  const t = TRANSLATIONS[lang];

  const filteredProjects = PROJECTS.filter((project) => {
    const query = searchQuery.toLowerCase();

    return (
      project.title.toLowerCase().includes(query) ||
      project.category.toLowerCase().includes(query) ||
      project.tags.some((tag) => tag.includes(query))
    );
  });

  // CURSOR FLUIDO PREMIUM
  useEffect(() => {
    const cursor = customCursorRef.current;

    if (!cursor) return;

    let currentX = -100;
    let currentY = -100;

    let targetX = -100;
    let targetY = -100;

    const speed = 0.14;

    const animate = () => {
      currentX += (targetX - currentX) * speed;
      currentY += (targetY - currentY) * speed;

      cursor.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;

      requestAnimationFrame(animate);
    };

    const moveCursor = (e: MouseEvent) => {
      targetX = e.clientX - 7;
      targetY = e.clientY - 7;
    };

    const handleMouseEnter = () => {
      cursor.classList.add('cursor-hover-active');
    };

    const handleMouseLeave = () => {
      cursor.classList.remove('cursor-hover-active');
    };

    window.addEventListener('mousemove', moveCursor);

    const interactives = document.querySelectorAll(
      'a, button, input, .project-card'
    );

    interactives.forEach((el) => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    });

    animate();

    return () => {
      window.removeEventListener('mousemove', moveCursor);

      interactives.forEach((el) => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, [filteredProjects]);

  // SCROLL REVEAL
  useEffect(() => {
    const reveals = document.querySelectorAll('.reveal-item');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('reveal-visible');
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -5% 0px',
      }
    );

    reveals.forEach((el) => observer.observe(el));

    return () => {
      reveals.forEach((el) => observer.unobserve(el));
    };
  }, [filteredProjects]);

  return (
    <main
      style={{
        minHeight: '100vh',
        width: '100%',
        position: 'relative',
        backgroundColor: '#000000',
        color: '#ffffff',
        display: 'flex',
        flexDirection: 'column',
        overflowX: 'hidden',
      }}
    >
      {/* ESTILOS GLOBAIS */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
          
          @import url('https://fonts.googleapis.com/css2?family=League+Spartan:wght@300;400;500&family=Libre+Baskerville:wght@400;700&display=swap');

          html {
            scroll-behavior: smooth;
          }

          body {
            background: #000;
          }

          @media (min-width: 768px) {
            html,
            body,
            a,
            button,
            input,
            [role="button"] {
              cursor: none !important;
            }
          }

          .smooth-media {
            transition:
              opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1),
              transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
          }

          .search-input:focus {
            outline: none;
            border-color: rgba(255,255,255,0.25);
            background-color: rgba(15,15,15,0.9);
            box-shadow: 0 0 40px rgba(255,255,255,0.03);
          }

          .contact-row:hover {
            opacity: 0.65;
          }

          .cursor-hover-active {
            width: 42px !important;
            height: 42px !important;
            border: 1px solid rgba(255,255,255,0.9);
            background: transparent !important;
          }

          .reveal-item {
            opacity: 0;
            transform: translateY(50px) scale(0.97);
            filter: blur(8px);

            transition:
              opacity 1s cubic-bezier(0.16, 1, 0.3, 1),
              transform 1s cubic-bezier(0.16, 1, 0.3, 1),
              filter 1s cubic-bezier(0.16, 1, 0.3, 1);

            will-change: opacity, transform, filter;
          }

          .reveal-visible {
            opacity: 1;
            transform: translateY(0px) scale(1);
            filter: blur(0px);
          }

        `,
        }}
      />

      {/* CURSOR */}
      <div
        ref={customCursorRef}
        id="luxury-pointer"
        className="hidden md:block"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '14px',
          height: '14px',
          borderRadius: '999px',
          backgroundColor: '#ffffff',
          pointerEvents: 'none',
          zIndex: 999999,
          willChange: 'transform',
          transform: 'translate3d(-100px,-100px,0)',
          transition:
            'width 0.25s cubic-bezier(0.16,1,0.3,1), height 0.25s cubic-bezier(0.16,1,0.3,1), border 0.25s cubic-bezier(0.16,1,0.3,1), background-color 0.25s cubic-bezier(0.16,1,0.3,1)',
          boxShadow: '0 0 24px rgba(255,255,255,0.45)',
        }}
      />

      {/* BACKGROUND VIDEO */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          overflow: 'hidden',
          zIndex: 0,
          backgroundColor: '#000000',
          pointerEvents: 'none',
        }}
      >
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: 0.28,
            pointerEvents: 'none',
          }}
        >
          <source src="/videos/bg-fluid.mp4" type="video/mp4" />
        </video>

        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'radial-gradient(circle at center, rgba(0,0,0,0.12) 0%, rgba(0,0,0,0.92) 100%)',
          }}
        />
      </div>

      {/* HEADER */}
      <header
        className="reveal-item"
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '24px 48px',
          background: 'transparent',
          zIndex: 50,
          position: 'fixed',
          top: 0,
          left: 0,
          backdropFilter: 'blur(8px)',
        }}
      >
        <a
          href="#"
          style={{
            fontFamily: "'League Spartan', sans-serif",
            textDecoration: 'none',
            color: '#ffffff',
            fontSize: '20px',
            fontWeight: 300,
            textTransform: 'uppercase',
            letterSpacing: '2px',
          }}
        >
          ZULBROL
        </a>

        <nav
          style={{
            display: 'flex',
            gap: '32px',
            letterSpacing: '3px',
            textTransform: 'uppercase',
            fontSize: '10px',
            fontFamily: "'League Spartan', sans-serif",
          }}
        >
          <a
            href="#projects"
            style={{
              textDecoration: 'none',
              color: '#a3a3a3',
            }}
          >
            PROJECTS
          </a>

          <a
            href="#contact"
            style={{
              textDecoration: 'none',
              color: '#a3a3a3',
            }}
          >
            CONTACT
          </a>
        </nav>

        <div
          style={{
            display: 'flex',
            gap: '12px',
            fontSize: '11px',
            fontFamily: "'League Spartan', sans-serif",
            letterSpacing: '1px',
          }}
        >
          <button
            onClick={() => setLang('pt')}
            style={{
              background: 'none',
              border: 'none',
              color: lang === 'pt' ? '#ffffff' : '#404040',
            }}
          >
            PT
          </button>

          <span style={{ color: '#262626' }}>/</span>

          <button
            onClick={() => setLang('en')}
            style={{
              background: 'none',
              border: 'none',
              color: lang === 'en' ? '#ffffff' : '#404040',
            }}
          >
            EN
          </button>
        </div>
      </header>

      {/* HERO */}
      <section
        style={{
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          position: 'relative',
          zIndex: 10,
          padding: '0 16px',
        }}
      >
        <div
          style={{
            maxWidth: '1140px',
            margin: '8% auto 0 auto',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <div className="reveal-item" style={{ marginBottom: '20px' }}>
            <span
              style={{
                fontFamily: "'League Spartan', sans-serif",
                fontSize: '13px',
                letterSpacing: '6px',
                color: '#a3a3a3',
                display: 'block',
                fontWeight: 300,
              }}
            >
              {t.subtitle}
            </span>
          </div>

          <div className="reveal-item" style={{ marginBottom: '48px' }}>
            <h1
              style={{
                fontFamily: "'League Spartan', sans-serif",
                fontSize: 'clamp(3rem, 7.5vw, 7.5rem)',
                fontWeight: 300,
                lineHeight: 1.1,
                textTransform: 'uppercase',
                letterSpacing: '-3px',
              }}
            >
              {t.titleLine1}

              <br />

              <span
                style={{
                  fontFamily: "'Libre Baskerville', serif",
                  fontWeight: 400,
                  color: '#666666',
                  display: 'block',
                  marginTop: '14px',
                  textTransform: 'lowercase',
                }}
              >
                {t.titleLine2}
              </span>
            </h1>
          </div>

          <div className="reveal-item">
            <a
              href="#projects"
              style={{
                fontFamily: "'League Spartan', sans-serif",
                fontSize: '12px',
                letterSpacing: '3px',
                textDecoration: 'none',
                color: '#ffffff',
                borderBottom: '1px solid rgba(255,255,255,0.2)',
                paddingBottom: '8px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                textTransform: 'uppercase',
              }}
            >
              {t.btnProjects}

              <ArrowDown
                className="w-3.5 h-3.5"
                style={{ strokeWidth: 1.5 }}
              />
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}