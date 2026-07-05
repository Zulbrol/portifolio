'use client';

import { ArrowDown } from 'lucide-react';
import { motion } from 'framer-motion';

interface HeroProps {
  t: {
    subtitle: string;
    btnProjects: string;
  };
  playSound?: (type: 'click' | 'whoosh') => void;
}

export default function Hero({ t, playSound }: HeroProps) {
  // Mantém a lógica de segurança caso as traduções demorem a carregar no Next.js
  const letters = t?.subtitle ? Array.from(t.subtitle) : [];

  const containerVariants = {
    hidden: { opacity: 1 },
    visible: { opacity: 1, transition: { staggerChildren: 0.04, delayChildren: 0.5 } },
  };

  const letterVariants = {
    hidden: { opacity: 0, display: 'none' },
    visible: { opacity: 1, display: 'inline' },
  };

  return (
    <section style={{ height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', position: 'relative', zIndex: 5, justifyContent: 'center' }}>
      <div style={{ maxWidth: '1200px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        
        {/* CONTAINER DO TÍTULO COM DESIGN ORIGINAL E CORREÇÃO DO BLEND-MODE */}
        <div style={{ overflow: 'hidden', padding: '15px 0', position: 'relative' }}>
          <motion.h1
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
            style={{ 
              fontFamily: "'League Spartan', sans-serif", 
              fontSize: 'clamp(4rem, 13vw, 13rem)', 
              fontWeight: 800, 
              lineHeight: 0.85, 
              textTransform: 'uppercase', 
              letterSpacing: '-6px', 
              position: 'relative',
              color: '#ffffff',
              /* O segredo: o efeito é aplicado no texto inteiro estático, idêntico aos botões do menu */
              mixBlendMode: 'difference', 
              WebkitFontSmoothing: 'antialiased',
              MozOsxFontSmoothing: 'grayscale',
            }}
          >
            ZULBROL
          </motion.h1>
        </div>

        {/* SUBTÍTULO: TYPING EFFECT COM SUPORTE A ESPAÇOS */}
        <motion.span 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '20px', letterSpacing: '-0.5px', fontWeight: 400, textTransform: 'lowercase', marginTop: '20px', display: 'block', opacity: 0.9, minHeight: '30px', color: '#ffffff' }}
        >
          {letters.map((char, index) => (
            <motion.span key={index} variants={letterVariants}>
              {/* Se for um espaço vazio do texto original, renderiza a entidade HTML correta para não juntar as palavras */}
              {char === ' ' ? '\u00A0' : char}
            </motion.span>
          ))}
          <span style={{ fontWeight: 500, marginLeft: '2px', color: '#ffffff' }}>_</span>
        </motion.span>

        {/* BOTÃO DIRECIONADOR */}
        <motion.div initial={{ y: 30, opacity: 0 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.0, ease: 'easeOut', delay: 1.4 }} style={{ marginTop: '54px' }}>
          <motion.a
            href="#projects"
            onClick={() => playSound && playSound('click')}
            onMouseEnter={() => playSound && playSound('whoosh')}
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '14px', textDecoration: 'none', color: '#ffffff', display: 'inline-flex', alignItems: 'center', gap: '8px', textTransform: 'lowercase', opacity: 0.8 }}
          >
            {t?.btnProjects}
            <ArrowDown className="w-4 h-4" style={{ strokeWidth: 2 }} />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
