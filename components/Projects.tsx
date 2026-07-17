'use client';

import { useRef, useState } from 'react';
import { ArrowDown, Search, X } from 'lucide-react';
import { motion } from 'framer-motion';
import Reveal from './Reveal';

export interface Project {
  id: number;
  title: string;
  category: string;
  year: string;
  type: 'video' | 'image';
  src: string;
  thumb: string;
  aspectRatio: string;
}

const REAL_PROJECTS: Project[] = [
  // 1. VIDEOS GEEK SHORTS (9/16)
  { id: 1, title: 'Gojo Short', category: 'GEEK EDIT', year: '2026', type: 'video', src: '/videos/geek1.webm', thumb: '/thumbs/geek1.jpg', aspectRatio: '9/16' },
  { id: 2, title: 'Megume Short', category: 'GEEK EDIT', year: '2026', type: 'video', src: '/videos/geek2.webm', thumb: '/thumbs/geek2.jpg', aspectRatio: '9/16' },
  
  // 2. ANIME EDIT SHORT & MINECRAFT SHORT (9/16)
  { id: 3, title: 'Thorfin Edit', category: 'ANIME EDIT', year: '2026', type: 'video', src: '/videos/anime_short.webm', thumb: '/thumbs/anime_short.jpg', aspectRatio: '9/16' },
  
  // 3. MINECRAFT HORIZONTAL & VÍDEO DINÂMICO HORIZONTAL (16/10)
  { id: 6, title: 'tiktok com 100k de views', category: 'VÍDEO DINÂMICO', year: '2026', type: 'video', src: '/videos/dinamico.webm', thumb: '/thumbs/dinamico.jpg', aspectRatio: '9/16' },

  // 4. SEUS 6 WALLPAPERS SELECIONADOS (9/16)
  { id: 7, title: 'BMW Art', category: 'WALLPAPER', year: '2025', type: 'image', src: '/images/wp1.jpg', thumb: '/thumbs/wp1.jpg', aspectRatio: '9/16' },
  { id: 8, title: 'Billie Eilish Art', category: 'WALLPAPER', year: '2026', type: 'image', src: '/images/wp2.jpg', thumb: '/thumbs/wp2.jpg', aspectRatio: '9/16' },
  { id: 9, title: 'Chihiro Art', category: 'WALLPAPER', year: '2026', type: 'image', src: '/images/wp3.jpg', thumb: '/thumbs/wp3.jpg', aspectRatio: '9/16' },
  { id: 10, title: 'Gojo Art', category: 'WALLPAPER', year: '2026', type: 'image', src: '/images/wp4.jpg', thumb: '/thumbs/wp4.jpg', aspectRatio: '9/16' },
  { id: 11, title: 'Rock Girl Art', category: 'WALLPAPER', year: '2026', type: 'image', src: '/images/wp5.jpg', thumb: '/thumbs/wp5.jpg', aspectRatio: '9/16' },
  { id: 12, title: 'Akali Art', category: 'WALLPAPER', year: '2026', type: 'image', src: '/images/wp6.jpg', thumb: '/thumbs/wp6.jpg', aspectRatio: '9/16' },
  { id: 13, title: 'Convite de Aniversário', category: 'PANFLEITO', year: '2026', type: 'image', src: '/images/ca.jpg', thumb: '/thumbs/ca.jpg', aspectRatio: '9/16' },
  { id: 14, title: 'Panfleto de Cuidador de Pets', category: 'PANFLEITO', year: '2026', type: 'image', src: '/images/pc.jpg', thumb: '/thumbs/pc.jpg', aspectRatio: '9/16' },

  // 5. SEUS 2 BANNERS PANORÂMICOS (16/5)
  { id: 15, title: 'Arte para Banner do Youtube', category: 'BANNER', year: '2026', type: 'image', src: '/images/banner1.jpg', thumb: '/thumbs/banner1.jpg', aspectRatio: '16/5' },
  { id: 16, title: 'Itachi Arte 4k', category: 'BANNER', year: '2026', type: 'image', src: '/images/banner2.jpg', thumb: '/thumbs/banner2.jpg', aspectRatio: '16/9' },
  { id: 17, title: 'thumb para o EscuriDog', category: 'THUMBNAIL', year: '2026', type: 'image', src: '/images/tb1.jpg', thumb: '/thumbs/tb1.jpg', aspectRatio: '16/9' },
  { id: 18, title: 'thumb para o EscuriDog', category: 'THUMBNAIL', year: '2026', type: 'image', src: '/images/tb2.jpg', thumb: '/thumbs/tb2.jpg', aspectRatio: '16/9' },
  { id: 19, title: 'thumb para o Viagem Sem Grana', category: 'THUMBNAIL', year: '2026', type: 'image', src: '/images/tb3.jpg', thumb: '/thumbs/tb3.jpg', aspectRatio: '16/9' },

  // 6. SUAS 2 FOTOS DE PERFIL QUADRADAS (1/1)
  { id: 20, title: 'Foto de Perfil Para o Youtube', category: 'PROFILE PICTURE', year: '2026', type: 'image', src: '/images/pfp1.jpg', thumb: '/thumbs/pfp1.jpg', aspectRatio: '1/1' },
  { id: 21, title: 'Foto de Perfil para o Instagram', category: 'PROFILE PICTURE', year: '2026', type: 'image', src: '/images/pfp2.jpg', thumb: '/thumbs/pfp2.jpg', aspectRatio: '1/1' },
  { id: 22, title: 'Foto de Perfil para o Twitter', category: 'PROFILE PICTURE', year: '2026', type: 'image', src: '/images/pfp3.jpg', thumb: '/thumbs/pfp3.jpg', aspectRatio: '1/1' },
  { id: 23, title: 'Foto de Estatua Historica', category: 'FOTO', year: '2026', type: 'image', src: '/images/photo1.jpg', thumb: '/thumbs/photo1.jpg', aspectRatio: '9/16' }
];

interface ProjectsProps {
  t: { selectedWork: string; searchPlaceholder: string; };
  onProjectSelect: (project: Project) => void;
  playSound: (type: 'click' | 'whoosh') => void;
}

interface Star {
  top: string;
  left: string;
  size: string;
  duration: number;
}

const STARS: Star[] = Array.from({ length: 180 }, (_, index) => ({
  top: `${((index * 37) % 100) + 0.15}%`,
  left: `${((index * 61) % 100) + 0.1}%`,
  size: `${(index % 6) * 0.28 + 0.45}px`,
  duration: (index % 9) * 0.55 + 2.1,
}));

export default function Projects({ t, onProjectSelect, playSound }: ProjectsProps) {
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const glowFrameRef = useRef<number | null>(null);

  // SOLUÇÃO DA HIDRATAÇÃO: Monta no Cliente e remove o Hydration Error do console
  const filteredProjects = REAL_PROJECTS.filter((project) =>
    project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    project.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const leftColumnProjects = filteredProjects.filter((_, idx) => idx % 2 === 0);
  const rightColumnProjects = filteredProjects.filter((_, idx) => idx % 2 !== 0);

  const handleMouseMoveCard = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    if (glowFrameRef.current !== null) cancelAnimationFrame(glowFrameRef.current);
    glowFrameRef.current = requestAnimationFrame(() => {
      card.style.setProperty('--mx', `${x * 0.3}px`);
      card.style.setProperty('--my', `${y * 0.3}px`);
    });
  };

  const renderCard = (project: Project, index: number) => (
    <Reveal key={project.id} delay={index * 0.05}>
      <div
        className="premium-project-card"
        onMouseMove={handleMouseMoveCard}
        onClick={() => { onProjectSelect(project); playSound('click'); }}
        onMouseEnter={() => { setHoveredProject(project.id); playSound('whoosh'); }}
        onMouseLeave={() => setHoveredProject(null)}
        style={{ position: 'relative', width: '85%', maxWidth: '520px', maxHeight: '68vh', aspectRatio: project.aspectRatio, overflow: 'visible', borderRadius: '32px', background: 'rgba(5,5,5,0.4)', transition: 'transform .8s cubic-bezier(.16,1,.3,1), border .5s ease, box-shadow .5s ease', cursor: 'pointer', marginBottom: '64px', border: '1px solid rgba(255,255,255,0.03)', marginInline: 'auto', contentVisibility: 'auto', containIntrinsicSize: '520px 720px' }}
      >
        <div
          className="grid-glow-layer"
          style={{
            width: '190%',
            height: '190%',
            top: '-45%',
            left: '-45%',
            zIndex: 0,
            background:
              'radial-gradient(circle at center, rgba(255,255,255,0.48) 0%, rgba(255,255,255,0.16) 28%, transparent 62%), radial-gradient(circle at center, rgba(125,205,255,0.22) 0%, transparent 48%)',
          }}
        />

        <div className="grid-video-media" style={{ width: '100%', height: '100%', position: 'absolute', inset: 0 }}>
          <img 
            src={project.thumb} 
            alt={project.title}
            style={{ 
              width: '100%', 
              height: '100%', 
              objectFit: 'cover', 
              opacity: hoveredProject === project.id ? 0.75 : 0.45, 
              transform: hoveredProject === project.id ? 'scale(1.03)' : 'scale(1)',
              transition: 'opacity 0.4s ease, transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)' 
            }} 
          />
        </div>

        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.85), transparent 50%)', zIndex: 6 }} />

        {/* TEXTO TOP */}
        <div style={{ position: 'relative', zIndex: 20, display: 'flex', justifyContent: 'space-between', padding: '28px' }}>
          <span style={{ fontFamily: "'League Spartan', sans-serif", fontSize: '12px', letterSpacing: '3px', color: 'rgba(255,255,255,0.7)', fontWeight: 500 }}>{project.year}</span>
          <ArrowDown className="w-4 h-4" style={{ transform: 'rotate(-135deg)', color: 'rgba(255,255,255,0.7)', strokeWidth: 2 }} />
        </div>

        {/* TEXTO BOTTOM */}
        <div style={{ position: 'absolute', left: '32px', bottom: '32px', zIndex: 20 }}>
          <span style={{ display: 'block', marginBottom: '8px', fontFamily: "'League Spartan', sans-serif", fontSize: '11px', letterSpacing: '3px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)' }}>
            {project.category}
          </span>
          <h3 style={{ fontFamily: "'League Spartan', sans-serif", fontSize: 'clamp(1.4rem,2vw,2.4rem)', fontWeight: 400, letterSpacing: '-1px', color: '#ffffff', textTransform: 'uppercase' }}>
            {project.title}
          </h3>
        </div>
      </div>
    </Reveal>
  );

  return (
    <section id="projects" style={{ position: 'relative', width: '100%', padding: '140px clamp(24px,4vw,64px) 120px', zIndex: 20, backgroundColor: '#000000', borderRadius: '40px 40px 0 0', boxShadow: '0 -40px 80px rgba(0,0,0,0.9)', overflow: 'hidden' }}>
      
      {/* CÉU ESTRELADO CORRIGIDO */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
        {STARS.map((star, idx) => (
          <div
            key={idx}
            className="star-particle"
            style={{ 
              position: 'absolute', 
              top: star.top, 
              left: star.left, 
              width: star.size, 
              height: star.size, 
              backgroundColor: '#ffffff', 
              borderRadius: '50%',
              animationDuration: `${star.duration}s`,
              animationDelay: `${idx * -0.13}s`,
            }}
          />
        ))}
      </div>

      {/* CONTEÚDO DA GRID E BUSCA INTEGRADOS */}
      <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
        
        
        {/* BARRA DE BUSCA COM ÍCONES SINTATICAMENTE CORRETOS */}
        <motion.div
          className="project-search"
          initial={{ opacity: 0, y: 54, scale: 0.92, width: '220px' }}
          whileInView={{ opacity: 1, y: 0, scale: 1, width: 'min(760px, 100%)' }}
          viewport={{ once: false, amount: 0.8 }}
          transition={{ duration: 0.95, ease: [0.16, 1, 0.3, 1] }}
          style={{ position: 'relative', marginBottom: '96px', height: '72px', maxWidth: '760px' }}
        >
          <input 
            type="text" 
            placeholder={t?.searchPlaceholder} 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ width: '100%', height: '100%', padding: '0 64px 0 68px', borderRadius: '999px', background: 'rgba(255,255,255,0.055)', border: '1px solid rgba(255,255,255,0.12)', color: '#ffffff', fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '17px', outline: 'none', boxShadow: '0 24px 80px rgba(255,255,255,0.06), inset 0 1px 0 rgba(255,255,255,0.08)' }}
          />
          <Search style={{ position: 'absolute', left: '28px', top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.38)', width: '22px', height: '22px' }} />
          {searchQuery && (
  <X
    onClick={() => setSearchQuery('')}
    style={{
      position: 'absolute',
      right: '28px',
      top: '50%',
      transform: 'translateY(-50%)',
      color: 'rgba(255,255,255,0.5)',
      width: '18px',
      height: '18px',
      cursor: 'pointer',
    }}
  />
)}
</motion.div>

{/* BLOCO 2: GRID COM AS DUAS COLUNAS */}
<div
  className="project-grid"
  style={{
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
    gap: '32px',
    width: '100%',
    maxWidth: '1400px',
    marginInline: 'auto',
  }}
>
  {/* Coluna Esquerda */}
  <div
    className="project-column"
    style={{
      display: 'flex',
      flexDirection: 'column',
    }}
  >
    {leftColumnProjects.map((project, index) =>
      renderCard(project, index)
    )}
  </div>

  {/* Coluna Direita */}
  <div
    className="project-column project-column-offset"
    style={{
      display: 'flex',
      flexDirection: 'column',
      marginTop: '32px',
    }}
  >
    {rightColumnProjects.map((project, index) =>
      renderCard(project, index)
    )}
  </div>
</div>

</div>
</section>
);
}
