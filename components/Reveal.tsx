'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface RevealProps {
  children: ReactNode;
  delay?: number;
}

export default function Reveal({ children, delay = 0 }: RevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 96, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -64, scale: 0.98 }}
      viewport={{ once: false, amount: 0.16, margin: '12% 0px -8% 0px' }} 
      transition={{ 
        duration: 0.95, 
        ease: [0.16, 1, 0.3, 1], // Curva cinematográfica premium (Awwwards design style)
        delay: delay 
      }}
      style={{ contentVisibility: 'auto', containIntrinsicSize: '1px 640px', willChange: 'transform, opacity' }}
    >
      {children}
    </motion.div>
  );
}
