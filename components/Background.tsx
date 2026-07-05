'use client';

export default function Background() {
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        zIndex: -1,
        backgroundColor: '#000000',
        pointerEvents: 'none',
      }}
    >
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          opacity: 0.28,
          pointerEvents: 'none',
        }}
      >
        <source src="/videos/bg-fluid.webm" type="video/webm" />
      </video>

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
