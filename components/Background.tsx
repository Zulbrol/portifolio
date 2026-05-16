'use client';

import { useEffect, useState, useRef } from 'react';

export default function Background() {
  const [mounted, setMounted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Garante que o componente só renderize após a página carregar no navegador
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && videoRef.current) {
      videoRef.current.play().catch((err) => {
        console.log("Auto-play do vídeo de fundo foi bloqueado ou falhou:", err);
      });
    }
  }, [mounted]);

  // Se ainda estiver carregando no servidor, mostra apenas a tela preta de transição
  if (!mounted) {
    return <div style={{ position: 'fixed', inset: 0, backgroundColor: '#000000', zIndex: -1 }} />;
  }

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        zIndex: -1, // Garante que fique atrás de todo o conteúdo do site
        backgroundColor: '#000000',
        pointerEvents: 'none',
      }}
    >
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          opacity: 0.28, // Controla a opacidade do vídeo para não atrapalhar a leitura do texto
          pointerEvents: 'none',
        }}
      >
        <source src="/videos/bg-fluid.mp4" type="video/mp4" />
      </video>
      
      {/* Película de degradê para misturar o vídeo com o fundo escuro */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.8) 100%)',
          pointerEvents: 'none',
        }}
      />
    </div>
  );
}
