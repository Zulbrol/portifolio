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
    
    // Rastreamento físico balanceado para grudar no mouse com suavidade de motion design
    const speed = 0.45; 

    const animate = () => {
      currentX += (targetX - currentX) * speed;
      currentY += (targetY - currentY) * speed;
      cursor.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;
      requestAnimationFrame(animate);
    };

    const moveCursor = (e: MouseEvent) => {
      targetX = e.clientX - 5;
      targetY = e.clientY - 5;
    };

    const handleMouseEnter = () => cursor.classList.add('cursor-hover-active');
    const handleMouseLeave = () => cursor.classList.remove('cursor-hover-active');

    window.addEventListener('mousemove', moveCursor, { passive: true });

    const setupListeners = () => {
      const interactives = document.querySelectorAll('a, button, input, .premium-project-card');
      interactives.forEach((el) => {
        el.addEventListener('mouseenter', handleMouseEnter);
        el.addEventListener('mouseleave', handleMouseLeave);
      });
    };

    setupListeners();
    animate();

    const observer = new MutationObserver(setupListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      observer.disconnect();
    };
  }, []);

  return <div ref={cursorRef} className="luxury-invert-pointer" />;
}
