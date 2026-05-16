'use client';

import { useState } from 'react';
import { ArrowDown, Search, X } from 'lucide-react';
import Reveal from './Reveal';

const PROJECTS = [
  {
    id: 1,
    title: 'MONOLITH',
    category: 'DIRECTION / MOTION',
    year: '2026',
    video: '/videos/project1.mp4',
  },

  {
    id: 2,
    title: 'SILK FLOW',
    category: 'FLUID CGI / VFX',
    year: '2026',
    video: '/videos/project2.mp4',
  },

  {
    id: 3,
    title: 'ECHOES',
    category: 'CINEMATIC EDITING',
    year: '2025',
    video: '/videos/project3.mp4',
  },

  {
    id: 4,
    title: 'DARK MATTER',
    category: 'POST-PRODUCTION',
    year: '2025',
    video: '/videos/project4.mp4',
  },
];

export default function Projects() {
  const [hovered, setHovered] = useState<number | null>(
    null
  );

  const [search, setSearch] = useState('');

  const filteredProjects = PROJECTS.filter((project) =>
    project.title
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <section
      id="projects"
      style={{
        position: 'relative',

        width: '100%',

        padding:
          '140px clamp(24px,4vw,64px) 120px',

        zIndex: 20,
      }}
    >
      {/* TITLE */}
      <Reveal>
        <div
          style={{
            marginBottom: '70px',

            textAlign: 'center',
          }}
        >
          <span
            style={{
              fontFamily:
                "'League Spartan', sans-serif",

              fontSize: '12px',

              letterSpacing: '6px',

              textTransform: 'uppercase',

              color: 'rgba(255,255,255,0.58)',
            }}
          >
            SELECTED WORK
          </span>

          <h2
            style={{
              marginTop: '18px',

              fontFamily:
                "'League Spartan', sans-serif",

              fontSize:
                'clamp(3rem,6vw,5rem)',

              fontWeight: 300,

              letterSpacing: '-4px',

              color: '#ffffff',
            }}
          >
            Featured Projects
          </h2>
        </div>
      </Reveal>

      {/* SEARCH */}
      <Reveal delay={0.1}>
        <div
          style={{
            width: '100%',

            display: 'flex',
            justifyContent: 'center',

            marginBottom: '90px',
          }}
        >
          <div
            style={{
              position: 'relative',

              width: '100%',
              maxWidth: '620px',
            }}
          >
            <input
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              placeholder="Search project..."
              style={{
                width: '100%',

                height: '64px',

                padding:
                  '0 58px 0 58px',

                borderRadius: '999px',

                border:
                  '1px solid rgba(255,255,255,0.08)',

                background:
                  'rgba(0,0,0,0.22)',

                backdropFilter: 'blur(12px)',

                color: '#ffffff',

                outline: 'none',

                fontFamily:
                  "'League Spartan', sans-serif",

                fontSize: '14px',

                letterSpacing: '2px',
              }}
            />

            <Search
              className="w-4 h-4"
              style={{
                position: 'absolute',

                left: '24px',
                top: '50%',

                transform:
                  'translateY(-50%)',

                color: '#8a8a8a',
              }}
            />

            {search && (
              <button
                onClick={() => setSearch('')}
                style={{
                  position: 'absolute',

                  right: '24px',
                  top: '50%',

                  transform:
                    'translateY(-50%)',

                  background: 'none',
                  border: 'none',

                  color: '#8a8a8a',
                }}
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </Reveal>

      {/* GRID */}
      <div
        style={{
          display: 'grid',

          gridTemplateColumns:
'repeat(2, minmax(0, 1fr))',

          gap: '42px',
        }}
      >
        {filteredProjects.map(
          (project, index) => (
            <Reveal
              key={project.id}
              delay={index * 0.08}
            >
              <div
                className="project-card"
                onMouseEnter={() =>
                  setHovered(project.id)
                }
                onMouseLeave={() =>
                  setHovered(null)
                }
                style={{
                  position: 'relative',

                  aspectRatio: '16 / 10',

                  overflow: 'hidden',

                  borderRadius: '32px',

                  background:
                    'rgba(0,0,0,0.18)',

                  border:
                    hovered === project.id
                      ? '1px solid rgba(255,255,255,0.22)'
                      : '1px solid rgba(255,255,255,0.06)',

                  backdropFilter:
                    'blur(14px)',

                  transition:
                    `
                    transform .8s cubic-bezier(.16,1,.3,1),
                    border .5s ease,
                    box-shadow .5s ease
                  `,

                  transform:
                    hovered === project.id
                      ? 'translateY(-10px)'
                      : 'translateY(0px)',

                  boxShadow:
                    hovered === project.id
                      ? `
                        0 20px 80px rgba(255,255,255,0.12),
                        0 0 50px rgba(255,255,255,0.06)
                      `
                      : `
                        0 10px 40px rgba(0,0,0,0.42)
                      `,
                }}
              >
                {/* VIDEO */}
                <video
                  src={project.video}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="auto"
                  style={{
                    position: 'absolute',
                    inset: 0,

                    width: '100%',
                    height: '100%',

                    objectFit: 'cover',

                    opacity:
                      hovered === project.id
                        ? 0.42
                        : 0.18,

                    transition:
                      'opacity .7s ease, transform 1.4s cubic-bezier(.16,1,.3,1)',

                    transform:
                      hovered === project.id
                        ? 'scale(1.05)'
                        : 'scale(1)',
                  }}
                />

                {/* GRADIENT */}
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,

                    background:
                      `
                    linear-gradient(
                      to top,
                      rgba(0,0,0,0.75),
                      transparent 45%
                    )
                  `,
                  }}
                />

                {/* TOP */}
                <div
                  style={{
                    position: 'relative',

                    zIndex: 20,

                    display: 'flex',
                    justifyContent:
                      'space-between',

                    padding: '28px',
                  }}
                >
                  <span
                    style={{
                      fontFamily:
                        "'League Spartan', sans-serif",

                      fontSize: '12px',

                      letterSpacing: '3px',

                      color:
                        'rgba(255,255,255,0.7)',
                    }}
                  >
                    {project.year}
                  </span>

                  <ArrowDown
                    className="w-4 h-4"
                    style={{
                      transform:
                        'rotate(-135deg)',

                      color:
                        'rgba(255,255,255,0.7)',
                    }}
                  />
                </div>

                {/* BOTTOM */}
                <div
                  style={{
                    position: 'absolute',

                    left: '32px',
                    bottom: '32px',

                    zIndex: 20,
                  }}
                >
                  <span
                    style={{
                      display: 'block',

                      marginBottom: '8px',

                      fontFamily:
                        "'League Spartan', sans-serif",

                      fontSize: '11px',

                      letterSpacing: '3px',

                      textTransform:
                        'uppercase',

                      color:
                        'rgba(255,255,255,0.65)',
                    }}
                  >
                    {project.category}
                  </span>

                  <h3
                    style={{
                      fontFamily:
                        "'League Spartan', sans-serif",

                      fontSize:
                        'clamp(2rem,3vw,3rem)',

                      fontWeight: 300,

                      letterSpacing: '-2px',

                      color: '#ffffff',
                    }}
                  >
                    {project.title}
                  </h3>
                </div>
              </div>
            </Reveal>
          )
        )}
      </div>
    </section>
  );
}