'use client';

import { useState, useEffect, useRef } from 'react';
import { Search, X } from 'lucide-react';
import Hero from '@/components/Hero';

const TRANSLATIONS = {
  en: {
    subtitle: 'editing emotion into motion',
    btnProjects: 'view projects',
    selectedWork: 'selected work',
    searchPlaceholder: 'what do you desire?',
    connect: 'entre em contato',
    footer: 'AVAILABLE WORLDWIDE',
  },
  pt: {
    subtitle: 'editando sua emoção em movimento',
    btnProjects: 'ver projetos',
    selectedWork: 'trabalhos selecionados',
    searchPlaceholder: 'qual serviço você deseja?',
    connect: 'entre em contato',
    footer: 'DISPONÍVEL MUNDIALMENTE',
  },
};

const PROJECTS = [
  { id: 1, title: 'MONOLITH', category: 'DIRECTION / MOTION', year: '2026', thumb: '/thumbs/project1.jpg', video: '/videos/project1.webm' },
  { id: 2, title: 'SILK FLOW', category: 'FLUID CGI / VFX', year: '2026', thumb: '/thumbs/project2.jpg', video: '/videos/project2.webm' },
  { id: 3, title: 'ECHOES', category: 'CINEMATIC EDITING', year: '2025', thumb: '/thumbs/project3.jpg', video: '/videos/project3.webm' },
  { id: 4, title: 'DARK MATTER', category: 'POST-PRODUCTION', year: '2025', thumb: '/thumbs/project4.jpg', video: '/videos/project4.webm' },
];

export default function Home() {
  const [lang, setLang] = useState<'en' | 'pt'>('pt');
  const [searchQuery, setSearchQuery] = useState('');
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const [scrolledPastHero, setScrolledPastHero] = useState(false);
  const videoRef1 = useRef<HTMLVideoElement>(null);
  const videoRef3 = useRef<HTMLVideoElement>(null);

  const t = TRANSLATIONS[lang];

  const filteredProjects = PROJECTS.filter((project) => {
    return project.title.toLowerCase().includes(searchQuery.toLowerCase()) || project.category.toLowerCase().includes(searchQuery.toLowerCase());
  });

  useEffect(() => {
    if (videoRef1.current) videoRef1.current.play().catch((e) => console.log(e));
    if (videoRef3.current) videoRef3.current.play().catch((e) => console.log(e));
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolledPastHero(window.scrollY > window.innerHeight * 0.3);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const reveals = document.querySelectorAll('.reveal-item');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('reveal-visible');
          } else {
            entry.target.classList.remove('reveal-visible');
          }
        });
      },
      { threshold: 0.01, rootMargin: '-2% 0px -2% 0px' }
    );
    reveals.forEach((el) => observer.observe(el));
    return () => reveals.forEach((el) => observer.unobserve(el));
  }, [filteredProjects, lang]);

  const handleMouseMoveCard = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    card.style.setProperty('--mx', `${x * 0.25}px`);
    card.style.setProperty('--my', `${y * 0.25}px`);
  };

  return (
    <div style={{ minHeight: '100vh', width: '100%', position: 'relative', display: 'flex', flexDirection: 'column', backgroundColor: '#000000' }}>
      
      {/* VÍDEO DO BLOCO 1 */}
      <video ref={videoRef1} autoPlay muted loop playsInline preload="auto" style={{ position: 'absolute', top: 0, left: 0, width: '100vw', height: '100vh', objectFit: 'cover', opacity: 0.9, zIndex: 1, pointerEvents: 'none' }}>
        <source src="/videos/bg-fluid.webm" type="video/webm" />
      </video>

      {/* HEADER CALIBRADO - PRESO DENTRO DOS LIMITES SEGUROS DE LARGURA DA TELA */}
      <header style={{ width: 'calc(100% - 96px)', maxWidth: '1400px', display: 'grid', gridTemplateColumns: '200px 1fr 200px', alignItems: 'center', padding: '32px 0', background: 'transparent', zIndex: 100, position: 'fixed', top: 0, left: '48px', right: '48px', margin: '0 auto', mixBlendMode: 'difference' }}>
        {/* Coluna 1: Logo */}
        <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
          <a href="#" style={{ fontFamily: "'Syne', sans-serif", textDecoration: 'none', color: '#ffffff', fontSize: '20px', fontWeight: 700, letterSpacing: '-1px' }}>ZULBROL</a>
        </div>
        
        {/* Coluna 2: Menu perfeitamente centralizado */}
        <nav style={{ display: 'flex', gap: '24px', fontSize: '15px', fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 400, justifyContent: 'center' }}>
          <a href="#projects" style={{ textDecoration: 'none', color: '#ffffff' }}>{lang === 'pt' ? 'projetos.' : 'projects.'}</a>
          <span style={{ opacity: 0.3 }}>X</span>
          <a href="#contact" style={{ textDecoration: 'none', color: '#ffffff' }}>{lang === 'pt' ? 'contato' : 'contact'}</a>
        </nav>

        {/* Coluna 3: Idiomas trazidos para a esquerda e protegidos */}
        <div style={{ display: 'flex', gap: '16px', fontSize: '15px', fontFamily: "'Plus Jakarta Sans', sans-serif", justifyContent: 'flex-end', paddingRight: '12px' }}>
          <button onClick={() => setLang('pt')} style={{ background: 'none', border: 'none', color: lang === 'pt' ? '#ffffff' : '#555', fontWeight: lang === 'pt' ? 600 : 400, padding: '4px' }}>pt</button>
          <span style={{ opacity: 0.2, alignSelf: 'center' }}>/</span>
          <button onClick={() => setLang('en')} style={{ background: 'none', border: 'none', color: lang === 'en' ? '#ffffff' : '#555', fontWeight: lang === 'en' ? 600 : 400, padding: '4px' }}>en</button>
        </div>
      </header>

      {/* BLOCO 1: HERO */}
      <div style={{ position: 'relative', height: '100vh', width: '100%', zIndex: 10 }}>
        <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '180px', background: 'linear-gradient(to bottom, transparent, #000000)', zIndex: 11 }} />
        <Hero t={t} />
      </div>

      {/* BLOCO 2: SEÇÃO DE PROJETOS */}
      <section 
        id="projects" 
        style={{ 
          padding: '120px 64px', 
          position: 'relative', 
          zIndex: 20, 
          width: '100%',
          background: '#000000', 
          borderRadius: '40px 40px 0 0',
          boxShadow: '0 -40px 80px rgba(0,0,0,0.9)'
        }}
      >
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          
          {/* BARRA DE BUSCA ANIMAÇÃO SPOTIFY */}
          <div className="reveal-item spotify-search-container" style={{ marginBottom: '100px', width: scrolledPastHero ? '100%' : '64px', height: '64px', opacity: scrolledPastHero ? 1 : 0, margin: '0 auto 100px auto' }}>
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center', width: '100%', height: '100%' }}>
              <Search className="absolute text-neutral-400" style={{ strokeWidth: 2, left: scrolledPastHero ? '24px' : '20px', width: '24px', height: '24px' }} />
              <input type="text" placeholder={scrolledPastHero ? t.searchPlaceholder : ''} disabled={!scrolledPastHero} value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} style={{ width: '100%', height: '100%', padding: '0 64px', background: '#0a0a0a', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '50px', color: '#ffffff', fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '16px' }} />
            </div>
          </div>

          <div className="reveal-item" style={{ marginBottom: '64px' }}>
            <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: '18px', textTransform: 'uppercase', color: '#ffffff', letterSpacing: '1px' }}>{t.selectedWork}</h2>
          </div>

          {/* GRID COM VIDEOS GRANDES E BRILHO NO HOVER */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(46%, 1fr))', gap: '80px 48px' }}>
            {filteredProjects.map((project) => (
              <div key={project.id} className="premium-project-card reveal-item" onMouseMove={handleMouseMoveCard} style={{ display: 'flex', flexDirection: 'column', gap: '20px', position: 'relative' }}>
                
                <div className="grid-glow-layer" />

                <div className="grid-video-media" onMouseEnter={() => setHoveredProject(project.id)} onMouseLeave={() => setHoveredProject(null)} style={{ width: '100%', aspectRatio: '16/9', backgroundColor: '#050505' }}>
                  {hoveredProject === project.id ? (
                    <video autoPlay muted loop playsInline className="smooth-media" style={{ width: '100%', height: '100%', objectFit: 'cover' }}><source src={project.video} type="video/webm" /></video>
                  ) : (
                    <div className="smooth-media" style={{ width: '100%', height: '100%', backgroundImage: `url(${project.thumb})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
                  )}
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontFamily: "'Plus Jakarta Sans', sans-serif", padding: '0 4px', position: 'relative', zIndex: 2 }}>
                  <h3 style={{ fontSize: '22px', fontWeight: 500, letterSpacing: '-0.5px' }}>{project.title}</h3>
                  <p style={{ fontSize: '13px', color: '#666' }}>{project.category}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BLOCO 3: ÁREA DE CONTATO - CORRIGIDO: FORCE DISPLAY GRID PARA CENTRALIZAÇÃO REAL NO MEIO */}
      <section 
        id="contact" 
        style={{ 
          position: 'relative', 
          padding: '64px', 
          zIndex: 20, 
          height: '100vh', 
          width: '100%', 
          overflow: 'hidden',
          display: 'grid', 
          placeItems: 'center', /* Centraliza o card matematicamente no centro x e y */
          backgroundColor: '#ffffff', 
          borderRadius: '40px 40px 0 0',
          boxShadow: '0 -40px 80px rgba(255,255,255,0.15)'
        }}
      >
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '140px', background: 'linear-gradient(to bottom, #000000, transparent)', zIndex: 2 }} />

        {/* VÍDEO ESPELHADO INVERTIDO */}
        <video ref={videoRef3} autoPlay muted loop playsInline preload="auto" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.9, zIndex: 1, filter: 'invert(1)', pointerEvents: 'none' }}>
          <source src="/videos/bg-fluid.webm" type="video/webm" />
        </video>

        {/* CARD PRETO DE CONTATO - PERFEITAMENTE CORRIGIDO */}
        <div className="reveal-item" style={{ background: '#000000', width: '100%', maxWidth: '850px', borderRadius: '32px', padding: '64px', boxShadow: '0 40px 90px rgba(0,0,0,0.4)', display: 'flex', flexDirection: 'column', gap: '40px', position: 'relative', zIndex: 10, margin: 'auto' }}>
          <div>
            <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: '36px', textTransform: 'lowercase', color: '#ffffff', textAlign: 'center', fontWeight: 700, letterSpacing: '-1px' }}>
              {t.connect}
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px', fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '20px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <span style={{ fontSize: '12px', color: '#555', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 600 }}>WHATSAPP:</span>
              <a href="tel:+5511999999999" style={{ color: '#ffffff', textDecoration: 'none', fontWeight: 400 }}>+55 (11) 99999-9999</a>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <span style={{ fontSize: '12px', color: '#555', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 600 }}>GMAIL:</span>
              <a href="mailto:contato@zulbrol.com" style={{ color: '#ffffff', textDecoration: 'none', fontWeight: 400 }}>contato@zulbrol.com</a>
            </div>
          </div>
        </div>

        <div style={{ width: 'calc(100% - 128px)', maxWidth: '1400px', position: 'absolute', bottom: '40px', left: '50%', transform: 'translateX(-50%)', padding: '0', zIndex: 10 }}>
          <footer style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', fontFamily: "'Plus Jakarta Sans', sans-serif", color: '#444', fontWeight: 500 }}>
            <span>{t.footer}</span>
            <span>© {new Date().getFullYear()} ZULBROL</span>
          </footer>
        </div>
      </section>
    </div>
  );
}
