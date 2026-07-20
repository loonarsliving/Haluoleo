'use client';

import { useEffect, useRef } from 'react';
import styles from './Particles.module.css';

const COLORS = ['#7a9e6e', '#c9a84c', '#c9948a', 'rgba(255,255,255,.25)'];

export default function Particles({ count = 20 }: { count?: number }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const c = ref.current;
    if (!c) return;
    for (let i = 0; i < count; i++) {
      const p = document.createElement('div');
      p.className = styles.particle;
      const sz = Math.random() * 2.5 + 0.5;
      const dur = Math.random() * 18 + 8;
      const del = Math.random() * 25;
      const l = Math.random() * 100;
      p.style.cssText = `width:${sz}px;height:${sz}px;background:${COLORS[Math.floor(Math.random() * COLORS.length)]};left:${l}%;animation-duration:${dur}s;animation-delay:-${del}s;`;
      c.appendChild(p);
    }
  }, [count]);

  return <div ref={ref} className={styles.particles} />;
}
