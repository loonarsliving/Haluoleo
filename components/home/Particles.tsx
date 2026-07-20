'use client';

import { useEffect, useRef } from 'react';
import styles from './Hero.module.css';

const COLORS = ['#7a9e6e', '#c9a84c', 'rgba(255,255,255,.25)'];

export default function Particles() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const c = ref.current;
    if (!c) return;
    for (let i = 0; i < 22; i++) {
      const p = document.createElement('div');
      p.className = styles.particle;
      const sz = Math.random() * 2 + 0.5;
      const dur = Math.random() * 16 + 8;
      const del = Math.random() * 22;
      const l = Math.random() * 100;
      p.style.cssText = `width:${sz}px;height:${sz}px;background:${COLORS[Math.floor(Math.random() * COLORS.length)]};left:${l}%;animation-duration:${dur}s;animation-delay:-${del}s;`;
      c.appendChild(p);
    }
  }, []);

  return <div ref={ref} className={styles.particles} />;
}
