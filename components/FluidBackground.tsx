'use client';

import { motion } from 'framer-motion';

export default function FluidBackground() {
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      overflow: 'hidden',
      zIndex: -50,
      backgroundColor: '#000000', // A base preta que o navegador aceita
      pointerEvents: 'none'
    }}>
      
      {/* Onda Abstrata Fluida Superior (Gerada por Texto Puro de Código) */}
      <motion.div 
        animate={{
          scale: [1, 1.4, 0.95, 1],
          x: [0, 90, -70, 0],
          y: [0, -80, 100, 0],
          borderRadius: ["40% 60% 60% 40% / 40% 40% 60% 60%", "60% 40% 40% 60% / 60% 60% 40% 40%", "40% 60% 60% 40% / 40% 40% 60% 60%"]
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: 'absolute',
          top: '-15%',
          left: '10%',
          width: '650px',
          height: '650px',
          background: 'linear-gradient(135deg, rgba(50,50,50,0.55) 0%, rgba(15,15,15,0.2) 60%, rgba(0,0,0,0) 100%)',
          filter: 'blur(45px)',
          mixBlendMode: 'screen'
        }}
      />

      {/* Onda Abstrata Fluida Inferior (Gerada por Texto Puro de Código) */}
      <motion.div 
        animate={{
          scale: [1.15, 0.9, 1.2, 1.15],
          x: [0, -100, 80, 0],
          y: [0, 90, -60, 0],
          borderRadius: ["50% 40% 60% 50% / 40% 60% 45% 55%", "40% 60% 40% 60% / 55% 45% 60% 40%", "50% 40% 60% 50% / 40% 60% 45% 55%"]
        }}
        transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: 'absolute',
          bottom: '-15%',
          right: '5%',
          width: '750px',
          height: '750px',
          background: 'linear-gradient(315deg, rgba(35,35,35,0.6) 0%, rgba(10,10,10,0.2) 50%, rgba(0,0,0,0) 100%)',
          filter: 'blur(65px)',
          mixBlendMode: 'screen'
        }}
      />

      {/* Camada de Vinheta Cinematográfica de Luxo */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(circle at center, rgba(0,0,0,0) 0%, rgba(0,0,0,0.95) 100%)',
        pointerEvents: 'none'
      }} />
    </div>
  );
}
