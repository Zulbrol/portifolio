'use client';

import { Mail, Phone } from 'lucide-react';
import { useRef, useEffect } from 'react';
import Reveal from './Reveal';

interface ContactProps {
  t: { connect: string; footer: string; };
  playSound: (type: 'click' | 'whoosh') => void;
}

export default function Contact({ t, playSound }: ContactProps) {
  const videoRef3 = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef3.current) {
      videoRef3.current.play().catch((e) => console.log(e));
    }
  }, []);

  return (
    <section id="contact" style={{ position: 'relative', padding: '64px', zIndex: 20, height: '100vh', width: '100%', overflow: 'hidden', display: 'grid', placeItems: 'center', backgroundColor: '#000000', borderRadius: '40px 40px 0 0', boxShadow: '0 -40px 80px rgba(255,255,255,0.15)' }}>
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '140px', background: 'linear-gradient(to bottom, #000000, transparent)', zIndex: 2 }} />

      <video ref={videoRef3} autoPlay muted loop playsInline preload="metadata" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 1, zIndex: 1, filter: 'invert(1)', pointerEvents: 'none' }}>
        <source src="/videos/bg-fluid.webm" type="video/webm" />
      </video>

      <div className="contact-card" style={{ background: '#000000', width: '100%', maxWidth: '850px', borderRadius: '32px', padding: '48px 54px', boxShadow: '0 40px 90px rgba(0,0,0,0.4)', display: 'flex', flexDirection: 'column', gap: '32px', position: 'relative', zIndex: 10, margin: 'auto' }}>
        
        <Reveal>
          <div>
            <h2 style={{ fontFamily: "'League Spartan', sans-serif", fontSize: '36px', textTransform: 'lowercase', color: '#ffffff', textAlign: 'center', fontWeight: 300, letterSpacing: '-1px' }}>
              {t.connect}
            </h2>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="contact-links" style={{ display: 'flex', justifyContent: 'center', gap: '48px', flexWrap: 'wrap', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            <a 
              href="https://wa.me" 
              target="_blank" 
              rel="noopener noreferrer" 
              onClick={() => playSound('click')}
              onMouseEnter={() => playSound('whoosh')}
              style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontSize: '16px' }}
            >
              <Phone className="w-5 h-5" style={{ color: 'rgba(255,255,255,0.5)' }} />
              <span>+55 (21) 99426-4039</span>
            </a>

            <a 
              href="mailto:corteslucas432@gmail.com" 
              onClick={() => playSound('click')}
              onMouseEnter={() => playSound('whoosh')}
              style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontSize: '16px' }}
            >
              <Mail className="w-5 h-5" style={{ color: 'rgba(255,255,255,0.5)' }} />
              <span>corteslucas432@gmail.com</span>
            </a>
          </div>
        </Reveal>

        {/* REDES SOCIAIS OFICIAIS ATUALIZADAS COM SUAS CONTAS CORRETAS */}
        <Reveal delay={0.2}>
          <div className="social-links" style={{ display: 'flex', justifyContent: 'center', gap: '24px', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '28px' }}>
            {[
              { href: "https://www.youtube.com/@zulbrol", title: "YouTube", src: "/icons/youtube.png" },
              { href: "https://www.instagram.com/zulbrol_oficial/", title: "Instagram", src: "/icons/instagram.png" },
              { href: "https://open.spotify.com/intl-pt/artist/5XtilXBHYFCAxMHUC1TYfe?si=Fh84DCpRSIOFqRX385r4-A", title: "Spotify", src: "/icons/spotify.png" },
              { href: "https://www.tiktok.com/@zulbrol.editor?is_from_webapp=1&sender_device=pc", title: "TikTok", src: "/icons/tiktok.png" }
            ].map((social, i) => (
              <a 
                key={i}
                href={social.href} 
                target="_blank" 
                rel="noopener noreferrer" 
                onClick={() => playSound('click')} 
                title={social.title} 
                onMouseEnter={() => playSound('whoosh')}
                style={{ width: '50px', height: '50px', borderRadius: '50%', background: '#111', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(255,255,255,0.08)' }}
              >
                <img src={social.src} alt={social.title} style={{ width: '22px', height: '22px', objectFit: 'contain' }} />
              </a>
            ))}
          </div>
        </Reveal>
      </div>

      <div style={{ width: 'calc(100% - 128px)', maxWidth: '1400px', position: 'absolute', bottom: '40px', left: '50%', transform: 'translateX(-50%)', padding: '0', zIndex: 10 }}>
        <footer style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', fontFamily: "'Plus Jakarta Sans', sans-serif", color: '#444', fontWeight: 500 }}>
          <span>{t.footer}</span>
          <span>© {new Date().getFullYear()} ZULBROL</span>
        </footer>
      </div>
    </section>
  );
}
