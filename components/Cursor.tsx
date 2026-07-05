'use client';

import { useEffect, useRef } from 'react';

export default function Cursor() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    let currentX = -100;
    let currentY = -100;
    let targetX = -100;
    let targetY = -100;
    let frameId: number | null = null;
    
    // Rastreamento físico balanceado para grudar no mouse com suavidade de motion design
    const speed = 0.35; 

    const animate = () => {
      currentX += (targetX - currentX) * speed;
      currentY += (targetY - currentY) * speed;
      cursor.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;

      if (Math.abs(targetX - currentX) > 0.1 || Math.abs(targetY - currentY) > 0.1) {
        frameId = requestAnimationFrame(animate);
      } else {
        currentX = targetX;
        currentY = targetY;
        frameId = null;
      }
    };

    const moveCursor = (e: MouseEvent) => {
      targetX = e.clientX - 5;
      targetY = e.clientY - 5;
      if (frameId === null) {
        frameId = requestAnimationFrame(animate);
      }
    };

    const isInteractive = (target: EventTarget | null) =>
      target instanceof Element && Boolean(target.closest('a, button, input, .premium-project-card'));

    const handleMouseOver = (e: MouseEvent) => {
      if (isInteractive(e.target)) cursor.classList.add('cursor-hover-active');
    };

    const handleMouseOut = (e: MouseEvent) => {
      if (isInteractive(e.target)) cursor.classList.remove('cursor-hover-active');
    };

    window.addEventListener('mousemove', moveCursor, { passive: true });
    window.addEventListener('mouseover', handleMouseOver, { passive: true });
    window.addEventListener('mouseout', handleMouseOut, { passive: true });

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mouseout', handleMouseOut);
      if (frameId !== null) cancelAnimationFrame(frameId);
    };
  }, []);

  return <div ref={cursorRef} className="luxury-invert-pointer" />;
}
