'use client';

import { useState, useEffect, useRef } from 'react';
import { ArrowDown, Phone, Mail, ArrowUp, Search, X } from 'lucide-react';

const TRANSLATIONS = {
  en: {
    subtitle: "HIGH-END VIDEO EDITING / MOTION DESIGN",
    titleLine1: "ZULBROL / EDITING EMOTION",
    titleLine2: "INTO MOTION.",
    btnProjects: "View Projects",
    selectedWork: "Selected Work",
    searchPlaceholder: "Which Service Do You Desire?",
    connect: "CONNECT",
    brief: "Let's shape your next visual piece.",
    footer: "AVAILABLE WORLDWIDE"
  },
  pt: {
    subtitle: "EDIÇÃO DE VÍDEO HIGH-END / MOTION DESIGN",
    titleLine1: "ZULBROL / EDITING EMOTION",
    titleLine2: "INTO MOTION.",
    btnProjects: "Ver Projetos",
    selectedWork: "Trabalhos Selecionados",
    searchPlaceholder: "Qual Serviço Você Deseja?",
    connect: "CONTATO",
    brief: "Vamos dar forma à sua próxima obra visual.",
    footer: "DISPONÍVEL MUNDIALMENTE"
  }
};

const PROJECTS = [
  { id: 1, title: 'MONOLITH', category: 'DIRECTION / MOTION', year: '2026', thumb: 'https://unsplash.com', video: 'https://mixkit.co', tags: ['motion', 'direction', 'edição', 'video'] },
  { id: 2, title: 'SILK FLOW', category: 'FLUID CGI / VFX', year: '2026', thumb: 'https://unsplash.com', video: 'https://mixkit.co', tags: ['vfx', 'cgi', 'fluid', 'simulação'] },
  { id: 3, title: 'ECHOES', category: 'CINEMATIC EDITING', year: '2025', thumb: 'https://unsplash.com', video: 'https://mixkit.co', tags: ['editing', 'cinematic', 'edição', 'pós'] },
  { id: 4, title: 'DARK MATTER', category: 'POST-PRODUCTION', year: '2025', thumb: 'https://unsplash.com', video: 'https://mixkit.co', tags: ['post', 'vfx', 'production', 'pós-produção'] },
];

export default function Home() {
  const [lang, setLang] = useState<'en' | 'pt'>('pt');
  const [searchQuery, setSearchQuery] = useState('');
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  
  const customCursorRef = useRef<HTMLDivElement>(null);
  const t = TRANSLATIONS[lang];

  const filteredProjects = PROJECTS.filter(project => {
    const query = searchQuery.toLowerCase();
    return (
      project.title.toLowerCase().includes(query) ||
      project.category.toLowerCase().includes(query) ||
      project.tags.some(tag => tag.includes(query))
    );
  });

  // --- ENGINE DO CURSOR NATIVO DETECTADO POR GPU (VISÍVEL E ZERO LAG) ---
  useEffect(() => {
    const cursor = customCursorRef.current;
    if (!cursor) return;

    let mouseX = -100;
    let mouseY = -100;

    const updateCursorPosition = () => {
      if (cursor) {
        cursor.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
      }
      requestAnimationFrame(updateCursorPosition);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const handleMouseEnter = () => cursor?.classList.add('cursor-hover-active');
    const handleMouseLeave = () => cursor?.classList.remove('cursor-hover-active');

    window.addEventListener('mousemove', handleMouseMove);
    requestAnimationFrame(updateCursorPosition);

    const interactives = document.querySelectorAll('a, button, input, .project-card');
    interactives.forEach(el => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      interactives.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, [filteredProjects]);

  // --- ENGINE DE SCROLL REVEAL CORRIGIDA (PALAVRA MÁGICA EM CONTEXTO REAL) ---
  useEffect(() => {
    const reveals = document.querySelectorAll('.reveal-item');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal-visible');
        } else {
          entry.target.classList.remove('reveal-visible');
        }
      });
    }, { 
      threshold: 0.1, 
      rootMargin: '0px 0px -5% 0px' // Corrigido de magin para rootMargin de forma estrita
    });

    reveals.forEach(el => observer.observe(el));
    return () => reveals.forEach(el => observer.unobserve(el));
  }, [filteredProjects]);

  return (
    <main style={{
      minHeight: '100vh',
      width: '100%',
      position: 'relative',
      backgroundColor: '#000000',
      color: '#ffffff',
      display: 'flex',
      flexDirection: 'column',
      overflowX: 'hidden',
    }}>
      
      {/* --- REGRAS ESTILÍSTICAS GLOBAIS --- */}
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://googleapis.com');
        
        html {
          scroll-behavior: smooth !important;
        }

        @media (min-width: 768px) {
          html, body, a, button, input, [role="button"] {
            cursor: none !important;
          }
        }

        .font-title {
          font-family: 'League Spartan', sans-serif !important;
        }
        .font-subtitle {
          font-family: 'Libre Baskerville', serif !important;
        }
        .smooth-media {
          transition: opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1) !important;
        }
        .contact-row:hover {
          opacity: 0.6;
        }
        .search-input:focus {
          outline: none !important;
          border-color: rgba(255,255,255,0.3) !important;
          background-color: rgba(15,15,15,0.9) !important;
          box-shadow: 0 0 40px rgba(255,255,255,0.03);
        }

        /* Classe de Hover para o Pointer */
        .cursor-hover-active {
          width: 44px !important;
          height: 44px !important;
          background-color: transparent !important;
          border: 1.5px solid #ffffff !important;
        }

        /* Classes do Mecanismo de Scroll Reveal */
        .reveal-item {
          opacity: 0;
          transform: translateY(50px) scale(0.97);
          filter: blur(6px);
          transition: opacity 1s cubic-bezier(0.16, 1, 0.3, 1), 
                      transform 1s cubic-bezier(0.16, 1, 0.3, 1), 
                      filter 1s cubic-bezier(0.16, 1, 0.3, 1);
          will-change: opacity, transform, filter;
        }
        .reveal-visible {
          opacity: 1;
          transform: translateY(0px) scale(1);
          filter: blur(0px);
        }
      `}} />

      {/* --- O POINTER DEFINITIVO EM TELA CHEIA (VISÍVEL) --- */}
      <div
        ref={customCursorRef}
        id="luxury-pointer"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '12px',
          height: '12px',
          borderRadius: '50%',
          backgroundColor: '#ffffff',
          mixBlendMode: 'difference',
          pointerEvents: 'none',
          zIndex: 9999,
          willChange: 'transform',
          transform: 'translate3d(-50%, -50%, 0)', // Fixa a bolinha cravada exatamente no bico do clique
          transition: 'width 0.3s cubic-bezier(0.16, 1, 0.3, 1), height 0.3s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.3s, border 0.3s',
        }}
        className="hidden md:block"
      />
      
      {/* --- BACKGROUND VÍDEO --- */}
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', overflow: 'hidden', zIndex: 0, backgroundColor: '#000000', pointerEvents: 'none' }}>
        <video autoPlay loop muted playsInline style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.25, pointerEvents: 'none' }}>
          <source src="https://catbox.moe" type="video/mp4" />
        </video>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at center, rgba(0,0,0,0) 0%, rgba(0,0,0,0.95) 100%)', pointerEvents: 'none' }} />
      </div>

      {/* --- HEADER FIXO --- */}
      <header className="reveal-item" style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '24px 48px', background: 'transparent', zIndex: 40, position: 'fixed', top: 0, left: 0 }}>
        <a href="#" style={{ fontFamily: "'League Spartan', sans-serif", textDecoration: 'none', color: '#ffffff', fontSize: '20px', fontWeight: 300, textTransform: 'uppercase', letterSpacing: '2px' }}>
          ZULBROL <span style={{ fontSize: '10px', verticalAlign: 'super', color: '#737373' }}>®</span>
        </a>
        <nav style={{ display: 'flex', gap: '32px', letterSpacing: '3px', textTransform: 'uppercase', fontSize: '10px', fontFamily: "'League Spartan', sans-serif" }}>
          <a href="#projects" style={{ textDecoration: 'none', color: '#a3a3a3' }}>PROJECTS</a>
          <a href="#contact" style={{ textDecoration: 'none', color: '#a3a3a3' }}>CONTACT</a>
        </nav>
        
        <div style={{ display: 'flex', gap: '12px', fontSize: '11px', fontFamily: "'League Spartan', sans-serif", letterSpacing: '1px' }}>
          <button onClick={() => setLang('pt')} style={{ background: 'none', border: 'none', color: lang === 'pt' ? '#ffffff' : '#404040', padding: 0 }}>PT</button>
          <span style={{ color: '#262626' }}>/</span>
          <button onClick={() => setLang('en')} style={{ background: 'none', border: 'none', color: lang === 'en' ? '#ffffff' : '#404040', padding: 0 }}>EN</button>
        </div>
      </header>

      {/* --- HERO SECTION --- */}
      <section style={{ height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', position: 'relative', zIndex: 10, padding: '0 16px' }}>
        <div style={{ maxWidth: '1140px', margin: '8% auto 0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          
          <div className="reveal-item" style={{ marginBottom: '20px' }}>
            <span style={{ fontFamily: "'League Spartan', sans-serif", fontSize: '13px', letterSpacing: '6px', color: '#a3a3a3', display: 'block', fontWeight: 300 }}>
              {t.subtitle}
            </span>
          </div>

          <div className="reveal-item" style={{ marginBottom: '48px' }}>
            <h1 style={{ fontFamily: "'League Spartan', sans-serif", fontSize: 'clamp(3rem, 7.5vw, 7.5rem)', fontWeight: 300, lineHeight: 1.15, textTransform: 'uppercase', letterSpacing: '-2px' }}>
              {t.titleLine1} <br />
              <span style={{ fontFamily: "'Libre Baskerville', serif", fontWeight: 400, color: '#666666', display: 'block', marginTop: '14px', textTransform: 'lowercase' }}>
                {t.titleLine2}
              </span>
            </h1>
          </div>

          <div className="reveal-item">
            <a href="#projects" style={{ fontFamily: "'League Spartan', sans-serif", fontSize: '12px', letterSpacing: '3px', textDecoration: 'none', color: '#ffffff', borderBottom: '1px solid rgba(255,255,255,0.2)', paddingBottom: '8px', display: 'inline-flex', alignItems: 'center', gap: '10px', textTransform: 'uppercase' }}>
              {t.btnProjects}
              <ArrowDown className="w-3.5 h-3.5" style={{ strokeWidth: 1.5 }} />
            </a>
          </div>
        </div>
      </section>

      {/* --- PROJECTS SECTION --- */}
      <section id="projects" style={{ padding: '120px 48px', backgroundColor: 'transparent', zIndex: 10, position: 'relative' }}>
        
        <div className="reveal-item" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '48px' }}>
          <h2 style={{ fontFamily: "'League Spartan', sans-serif", fontSize: '42px', fontWeight: 300, textTransform: 'uppercase', letterSpacing: '-1px', textAlign: 'center' }}>{t.selectedWork}</h2>
        </div>

        {/* Barra de Busca Centralizada */}
        <div className="reveal-item" style={{ display: 'flex', justifyContent: 'center', width: '100%', marginBottom: '80px' }}>
          <div style={{ position: 'relative', width: '100%', maxWidth: '540px' }}>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.searchPlaceholder}
              style={{
                width: '100%',
                fontFamily: "'League Spartan', sans-serif",
                backgroundColor: 'rgba(20,20,20,0.4)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '50px',
                padding: '18px 28px 18px 56px',
                color: '#ffffff',
                fontSize: '14px',
                letterSpacing: '1px',
                transition: 'all 0.4s ease',
              }}
              className="search-input"
            />
            <Search className="w-4 h-4 text-neutral-400" style={{ position: 'absolute', left: '24px', top: '50%', transform: 'translateY(-50%)', strokeWidth: 1.5 }} />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                style={{ background: 'none', border: 'none', position: 'absolute', right: '24px', top: '50%', transform: 'translateY(-50%)', padding: 0 }}
              >
                <X className="w-4 h-4 text-neutral-400" />
              </button>
            )}
          </div>
        </div>

        {/* Grid de Projetos */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(45%, 1fr))', gap: '64px 48px' }}>
          {filteredProjects.map((project) => (
            <div 
              key={project.id}
              className="reveal-item project-card"
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
              style={{ 
                backgroundColor: '#000000', 
                borderRadius: '24px',
                border: hoveredProject === project.id ? '1px solid rgba(255,255,255,0.22)' : '1px solid rgba(255,255,255,0.04)', 
                aspectRatio: '16/10', 
                position: 'relative', 
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                padding: '40px 36px',
                boxShadow: hoveredProject === project.id 
                  ? '0 40px 80px -15px rgba(255,255,255,0.22), 0 0 70px 6px rgba(255,255,255,0.09)' 
                  : '0 20px 40px -20px rgba(0,0,0,0.7)',
                transition: 'border 0.5s ease, box-shadow 0.5s ease, transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)'
              }}
              onMouseMove={(e) => e.currentTarget.style.transform = 'translateY(-6px)'}
              onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0px)'}
            >
              <video
                src={project.video}
                autoPlay
                loop
                muted
                playsInline
                className="smooth-media"
                style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 0, opacity: hoveredProject === project.id ? 0.45 : 0, transform: hoveredProject === project.id ? 'scale(1.03)' : 'scale(1)', borderRadius: '24px' }}
              />

              <img
                src={project.thumb}
                alt={project.title}
                className="smooth-media"
                style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 0, opacity: hoveredProject === project.id ? 0 : 0.18, filter: 'grayscale(100%)', borderRadius: '24px' }}
              />

              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#737373', letterSpacing: '2px', zIndex: 10, fontFamily: "'League Spartan', sans-serif" }}>
                <span>{project.year}</span>
                <ArrowDown className="w-4 h-4 opacity-40 transform -rotate-135" />
              </div>
              
              <div style={{ zIndex: 10 }}>
                <span style={{ fontSize: '11px', letterSpacing: '2px', color: '#a3a3a3', display: 'block', marginBottom: '4px', fontFamily: "'League Spartan', sans-serif" }}>{project.category}</span>
                <h3 style={{ fontSize: '26px', fontWeight: 300, letterSpacing: '1px', fontFamily: "'League Spartan', sans-serif" }}>{project.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* --- SEÇÃO DE CONTATO --- */}
      <section id="contact" style={{ padding: '140px 48px 100px 48px', backgroundColor: 'transparent', zIndex: 10, position: 'relative', borderTop: '1px solid rgba(255,255,255,0.03)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '40px' }}>
          
          <div className="reveal-item">
            <span style={{ fontFamily: "'League Spartan', sans-serif", fontSize: '11px', letterSpacing: '4px', color: '#737373', display: 'block', marginBottom: '8px' }}>// {t.connect}</span>
            <h2 style={{ fontFamily: "'League Spartan', sans-serif", fontSize: 'clamp(2rem, 4vw, 4rem)', fontWeight: 300, textTransform: 'uppercase', letterSpacing: '-1px', lineHeight: 1.1 }}>
              {t.brief}
            </h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '20px', fontFamily: "'League Spartan', sans-serif" }}>
            <a href="mailto:corteslucas432@gmail.com" className="contact-row reveal-item" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '24px 0', borderBottom: '1px solid rgba(255,255,255,0.08)', textDecoration: 'none', color: '#ffffff', transition: 'opacity 0.3s' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <Mail className="w-5 h-5 text-neutral-500" />
                <span style={{ fontSize: 'clamp(1rem, 2vw, 1.8rem)', fontWeight: 300, letterSpacing: '1px' }}>corteslucas432@gmail.com</span>
              </div>
              <ArrowDown className="w-5 h-5 text-neutral-600 transform -rotate-135" />
            </a>
            
            <a href="https://wa.me" target="_blank" rel="noopener noreferrer" className="contact-row reveal-item" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '24px 0', borderBottom: '1px solid rgba(255,255,255,0.08)', textDecoration: 'none', color: '#ffffff', transition: 'opacity 0.3s' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <Phone className="w-5 h-5 text-neutral-500" />
                <span style={{ fontSize: 'clamp(1rem, 2vw, 1.8rem)', fontWeight: 300, letterSpacing: '1px' }}>+55 (21) 99426-4039</span>
              </div>
              <ArrowDown className="w-5 h-5 text-neutral-600 transform -rotate-135" />
            </a>
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="reveal-item" style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '32px 48px', fontSize: '10px', letterSpacing: '3px', color: '#737373', background: 'transparent', zIndex: 40, textTransform: 'uppercase', borderTop: '1px solid rgba(255,255,255,0.02)', fontFamily: "'League Spartan', sans-serif" }}>
        <span>©2026 ZULBROL</span>
        <div style={{ width: '128px', height: '1px', backgroundColor: '#171717' }} />
        <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} style={{ background: 'none', border: 'none', color: '#737373', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '10px', letterSpacing: '3px', textTransform: 'uppercase', fontFamily: "'League Spartan', sans-serif" }}>
          BACK TO TOP <ArrowUp className="w-3 h-3" />
        </button>
      </footer>
    </main>
  );
}
