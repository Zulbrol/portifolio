'use client';

import {
  useEffect,
  useRef,
  ReactNode,
} from 'react';

interface RevealProps {
  children: ReactNode;
  delay?: number;
}

export default function Reveal({
  children,
  delay = 0,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;

    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          element.style.opacity = '1';

          element.style.transform =
            'translate3d(0px,0px,0px)';

          element.style.filter =
            'blur(0px)';
        }
      },
      {
        threshold: 0.12,
      }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{
        opacity: 0,

        transform:
          'translate3d(0px,80px,0px)',

        filter: 'blur(10px)',

        transition: `
          opacity 1.1s cubic-bezier(.16,1,.3,1) ${delay}s,
          transform 1.1s cubic-bezier(.16,1,.3,1) ${delay}s,
          filter 1.1s cubic-bezier(.16,1,.3,1) ${delay}s
        `,

        willChange:
          'transform, opacity, filter',
      }}
    >
      {children}
    </div>
  );
}