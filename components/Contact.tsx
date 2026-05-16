'use client';

import {
  ArrowDown,
  Mail,
  Phone,
  Globe,
} from 'lucide-react';

import Reveal from './Reveal';

export default function Contact() {
  return (
    <section
      id="contact"
      style={{
        position: 'relative',

        width: '100%',

        padding:
          '160px clamp(24px,4vw,64px) 120px',

        zIndex: 20,
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '1400px',

          margin: '0 auto',
        }}
      >
        {/* TITLE */}
        <Reveal>
          <div
            style={{
              marginBottom: '70px',
            }}
          >
            <span
              style={{
                fontFamily:
                  "'League Spartan', sans-serif",

                fontSize: '12px',

                letterSpacing: '6px',

                textTransform: 'uppercase',

                color:
                  'rgba(255,255,255,0.58)',

                display: 'block',

                marginBottom: '16px',
              }}
            >
              CONTACT
            </span>

            <h2
              style={{
                fontFamily:
                  "'League Spartan', sans-serif",

                fontSize:
                  'clamp(3rem,6vw,6rem)',

                fontWeight: 300,

                lineHeight: 0.95,

                letterSpacing: '-5px',

                color: '#ffffff',
              }}
            >
              Let’s create
              <br />
              something cinematic.
            </h2>
          </div>
        </Reveal>

        {/* LINKS */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',

            gap: '18px',
          }}
        >
          {/* EMAIL */}
          <Reveal delay={0.1}>
            <a
              href="mailto:corteslucas432@gmail.com"
              className="project-card"
              style={{
                width: '100%',

                display: 'flex',
                justifyContent:
                  'space-between',
                alignItems: 'center',

                padding: '30px 34px',

                borderRadius: '26px',

                textDecoration: 'none',

                background:
                  'rgba(0,0,0,0.18)',

                border:
                  '1px solid rgba(255,255,255,0.06)',

                backdropFilter:
                  'blur(12px)',

                transition:
                  `
                  transform .6s cubic-bezier(.16,1,.3,1),
                  border .35s ease,
                  box-shadow .35s ease
                `,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform =
                  'translateY(-6px)';

                e.currentTarget.style.border =
                  '1px solid rgba(255,255,255,0.18)';

                e.currentTarget.style.boxShadow =
                  '0 20px 60px rgba(255,255,255,0.08)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform =
                  'translateY(0px)';

                e.currentTarget.style.border =
                  '1px solid rgba(255,255,255,0.06)';

                e.currentTarget.style.boxShadow =
                  'none';
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',

                  gap: '18px',
                }}
              >
                <Mail
                  className="w-5 h-5"
                  style={{
                    color:
                      'rgba(255,255,255,0.6)',
                  }}
                />

                <span
                  style={{
                    fontFamily:
                      "'League Spartan', sans-serif",

                    fontSize:
                      'clamp(1.2rem,2vw,2rem)',

                    fontWeight: 300,

                    letterSpacing: '-1px',

                    color: '#ffffff',
                  }}
                >
                  corteslucas432@gmail.com
                </span>
              </div>

              <ArrowDown
                className="w-5 h-5"
                style={{
                  transform:
                    'rotate(-135deg)',

                  color:
                    'rgba(255,255,255,0.7)',
                }}
              />
            </a>
          </Reveal>

          {/* WHATSAPP */}
          <Reveal delay={0.18}>
            <a
              href="https://wa.me/5521994264039"
              target="_blank"
              rel="noopener noreferrer"
              className="project-card"
              style={{
                width: '100%',

                display: 'flex',
                justifyContent:
                  'space-between',
                alignItems: 'center',

                padding: '30px 34px',

                borderRadius: '26px',

                textDecoration: 'none',

                background:
                  'rgba(0,0,0,0.18)',

                border:
                  '1px solid rgba(255,255,255,0.06)',

                backdropFilter:
                  'blur(12px)',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',

                  gap: '18px',
                }}
              >
                <Phone
                  className="w-5 h-5"
                  style={{
                    color:
                      'rgba(255,255,255,0.6)',
                  }}
                />

                <span
                  style={{
                    fontFamily:
                      "'League Spartan', sans-serif",

                    fontSize:
                      'clamp(1.2rem,2vw,2rem)',

                    fontWeight: 300,

                    letterSpacing: '-1px',

                    color: '#ffffff',
                  }}
                >
                  +55 (21) 99426-4039
                </span>
              </div>

              <ArrowDown
                className="w-5 h-5"
                style={{
                  transform:
                    'rotate(-135deg)',

                  color:
                    'rgba(255,255,255,0.7)',
                }}
              />
            </a>
          </Reveal>

          {/* INSTAGRAM */}
          <Reveal delay={0.26}>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="project-card"
              style={{
                width: '100%',

                display: 'flex',
                justifyContent:
                  'space-between',
                alignItems: 'center',

                padding: '30px 34px',

                borderRadius: '26px',

                textDecoration: 'none',

                background:
                  'rgba(0,0,0,0.18)',

                border:
                  '1px solid rgba(255,255,255,0.06)',

                backdropFilter:
                  'blur(12px)',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',

                  gap: '18px',
                }}
              >
                <Globe
  className="w-5 h-5"
  style={{
    color:
      'rgba(255,255,255,0.6)',
  }}
/>

                <span
                  style={{
                    fontFamily:
                      "'League Spartan', sans-serif",

                    fontSize:
                      'clamp(1.2rem,2vw,2rem)',

                    fontWeight: 300,

                    letterSpacing: '-1px',

                    color: '#ffffff',
                  }}
                >
                  @zulbrol
                </span>
              </div>

              <ArrowDown
                className="w-5 h-5"
                style={{
                  transform:
                    'rotate(-135deg)',

                  color:
                    'rgba(255,255,255,0.7)',
                }}
              />
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}