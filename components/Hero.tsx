'use client';

import { ArrowDown } from 'lucide-react';

interface HeroProps {
  t: {
    subtitle: string;
    btnProjects: string;
  };
}

export default function Hero({ t }: HeroProps) {
  return (
    <section
      style={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        position: 'relative',
        zIndex: 5,
      }}
    >
      <div style={{ maxWidth: '1200px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        
        {/* LOGO DO SITE EM INVERSÃO ACELERADA POR HARDWARE */}
        <h1
          className="reveal-item blend-mode-title"
          style={{
            fontFamily: "'Syne', sans-serif",
            fontSize: 'clamp(4rem, 13vw, 13rem)',
            fontWeight: 800,
            lineHeight: 0.85,
            textTransform: 'uppercase',
            letterSpacing: '-6px',
            order: 1
          }}
        >
          ZULBROL
        </h1>

        {/* SUBTÍTULO COM FONTE PLUS JAKARTA SANS RE-ATIVADA E INVERSÃO ATIVA */}
        <span 
          className="reveal-item blend-mode-title"
          style={{ 
            fontFamily: "'Plus Jakarta Sans', sans-serif", 
            fontSize: '20px', 
            letterSpacing: '-0.5px', 
            fontWeight: 400,
            textTransform: 'lowercase',
            marginTop: '20px',
            display: 'block',
            order: 2
          }}
        >
          {t.subtitle}
        </span>

        {/* BOTÃO DIRECIONADOR */}
        <div className="reveal-item blend-mode-title" style={{ order: 3, marginTop: '54px' }}>
          <a
            href="#projects"
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: '14px',
              textDecoration: 'none',
              color: '#ffffff',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              textTransform: 'lowercase',
              opacity: 0.8
            }}
          >
            {t.btnProjects}
            <ArrowDown className="w-4 h-4" style={{ strokeWidth: 2 }} />
          </a>
        </div>
      </div>
    </section>
  );
}
