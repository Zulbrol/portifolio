'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

import './globals.css'; 

import Hero from '@/components/Hero';
import Projects from '@/components/Projects';
import type { Project } from '@/components/Projects';
import Contact from '@/components/Contact';

type AudioWindow = Window & typeof globalThis & {
  webkitAudioContext?: typeof AudioContext;
};

const TRANSLATIONS = {
  en: {
    subtitle: 'editing emotion into motion',
    btnProjects: 'view projects',
    selectedWork: 'selected work',
    searchPlaceholder: 'what do you desire?',
    connect: 'let’s create something cinematic.',
    footer: 'AVAILABLE WORLDWIDE',
  },
  pt: {
    subtitle: 'editando sua emoção em movimento',
    btnProjects: 'ver projetos',
    selectedWork: 'trabalhos selecionados',
    searchPlaceholder: 'qual serviço você deseja?',
    connect: 'vamos criar algo cinematográfico.',
    footer: 'DISPONÍVEL MUNDIALMENTE',
  },
};

export default function Home() {
  const [lang, setLang] = useState<'en' | 'pt'>('pt');
  const [activeModalProject, setActiveModalProject] = useState<Project | null>(null);

  const videoRef1 = useRef<HTMLVideoElement>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const t = TRANSLATIONS[lang];

  const playSound = useCallback((type: 'click' | 'whoosh') => {
    if (typeof window === 'undefined') return;
    try {
      const AudioContextClass = window.AudioContext || (window as AudioWindow).webkitAudioContext;
      if (!AudioContextClass) return;

      const ctx = audioCtxRef.current ?? new AudioContextClass();
      audioCtxRef.current = ctx;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

      if (type === 'click') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(900, ctx.currentTime);
        gain.gain.setValueAtTime(0.03, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);
        osc.start();
        osc.stop(ctx.currentTime + 0.05);
      } else if (type === 'whoosh') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(80, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(380, ctx.currentTime + 0.25);
        gain.gain.setValueAtTime(0.04, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25);
        osc.start();
        osc.stop(ctx.currentTime + 0.25);
      }
    } catch (e) {
      console.log(e);
    }
  }, []);

  useEffect(() => {
    videoRef1.current?.play().catch(() => undefined);
  }, []);

  return (
    <div style={{ minHeight: '100vh', width: '100%', position: 'relative', display: 'flex', flexDirection: 'column', backgroundColor: '#000000' }}>
      
      {/* VÍDEO DO BLOCO 1 */}
      <video ref={videoRef1} autoPlay muted loop playsInline preload="metadata" style={{ position: 'absolute', top: 0, left: 0, width: '100vw', height: '100vh', objectFit: 'cover', opacity: 0.9, zIndex: 1, pointerEvents: 'none' }}>
        <source src="/videos/bg-fluid.webm" type="video/webm" />
      </video>

      {/* HEADER ORIGINAL */}
      <header style={{ width: 'calc(100% - 96px)', maxWidth: '1400px', display: 'grid', gridTemplateColumns: '200px 1fr 200px', alignItems: 'center', padding: '32px 0', background: 'transparent', zIndex: 100, position: 'fixed', top: 0, left: '48px', right: '48px', margin: '0 auto', mixBlendMode: 'difference' }}>
        <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
          <a href="#" onClick={() => playSound('click')} style={{ fontFamily: "'Syne', sans-serif", textDecoration: 'none', color: '#ffffff', fontSize: '20px', fontWeight: 700, letterSpacing: '-1px' }}>ZULBROL</a>
        </div>
        
        <nav style={{ display: 'flex', gap: '24px', fontSize: '15px', fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 400, justifyContent: 'center' }}>
          <a href="#projects" onClick={() => playSound('click')} style={{ textDecoration: 'none', color: '#ffffff' }}>{lang === 'pt' ? 'projetos.' : 'projects.'}</a>
          <span style={{ opacity: 0.3 }}>X</span>
          <a href="#contact" onClick={() => playSound('click')} style={{ textDecoration: 'none', color: '#ffffff' }}>{lang === 'pt' ? 'contato' : 'contact'}</a>
        </nav>

        <div style={{ width: '200px', display: 'flex', gap: '16px', fontSize: '15px', fontFamily: "'Plus Jakarta Sans', sans-serif", justifyContent: 'flex-end', paddingRight: '12px' }}>
          <button onClick={() => { setLang('pt'); playSound('click'); }} style={{ background: 'none', border: 'none', color: lang === 'pt' ? '#ffffff' : '#555', fontWeight: lang === 'pt' ? 600 : 400, padding: '4px' }}>pt</button>
          <span style={{ opacity: 0.2, alignSelf: 'center' }}>/</span>
          <button onClick={() => { setLang('en'); playSound('click'); }} style={{ background: 'none', border: 'none', color: lang === 'en' ? '#ffffff' : '#555', fontWeight: lang === 'en' ? 600 : 400, padding: '4px' }}>en</button>
        </div>
      </header>

      {/* BLOCO 1 */}
      <div style={{ position: 'relative', height: '100vh', width: '100%', zIndex: 10 }}>
        <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '180px', background: 'linear-gradient(to bottom, transparent, #000000)', zIndex: 11 }} />
        <Hero t={t} playSound={playSound} />
      </div>

      {/* BLOCO 2 */}
      <Projects t={t} onProjectSelect={setActiveModalProject} playSound={playSound} />
      
      {/* BLOCO 3 */}
      <Contact t={t} playSound={playSound} />

      {/* MODO CINEMA INTELIGENTE (RESOLVIDO BUG DE BUFFER INFINITO) */}
      <AnimatePresence>
        {activeModalProject && (
          <motion.div 
            className="cinema-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.86)', zIndex: 99999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px' }}
            onClick={() => { setActiveModalProject(null); playSound('click'); }}
          >
            <button className="cinema-close" onClick={() => { setActiveModalProject(null); playSound('click'); }} style={{ position: 'absolute', top: '40px', right: '40px', background: 'none', border: 'none', color: '#fff', zIndex: 100000, cursor: 'pointer' }}><X style={{ width: '32px', height: '32px' }} /></button>
            <motion.div 
              className="cinema-panel"
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              transition={{ type: "spring", duration: 0.4 }}
              style={{ width: '100%', maxWidth: activeModalProject.aspectRatio === '9/16' ? '400px' : activeModalProject.aspectRatio === '1/1' ? '600px' : '1100px', aspectRatio: activeModalProject.aspectRatio, borderRadius: '24px', overflow: 'hidden', boxShadow: '0 30px 70px rgba(0,0,0,0.9)', background: '#000' }} 
              onClick={(e) => e.stopPropagation()}
            >
              {activeModalProject.type === 'video' ? (
                <video 
                  autoPlay controls playsInline
                  onEnded={() => { setActiveModalProject(null); playSound('whoosh'); }} // Só fecha automático se for vídeo
                  style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                  src={activeModalProject.src}
                />
              ) : (
                <img 
                  src={activeModalProject.src} 
                  alt={activeModalProject.title}
                  style={{ width: '100%', height: '100%', objectFit: 'contain' }} // Exibe imagem estática sem fechar sozinha
                />
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
