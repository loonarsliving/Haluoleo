'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './Loader.module.css';

const LETTERS = 'Haluoleo'.split('');

export default function Loader() {
  const [pct, setPct] = useState(0);
  const [lineGo, setLineGo] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [out, setOut] = useState(false);
  const started = useRef(false);

  useEffect(() => {
    if (started.current) return;
    started.current = true;

    const lineTimer = setTimeout(() => setLineGo(true), 100);
    let n = 0;
    const iv = setInterval(() => {
      n = Math.min(n + Math.floor(Math.random() * 5) + 2, 100);
      setPct(n);
      if (n >= 100) {
        clearInterval(iv);
        setTimeout(() => {
          setOut(true);
          setTimeout(() => setHidden(true), 1000);
        }, 300);
      }
    }, 28);

    return () => { clearTimeout(lineTimer); clearInterval(iv); };
  }, []);

  if (hidden) return null;

  return (
    <div className={`${styles.ldr} ${out ? styles.out : ''}`}>
      <div className={styles.ldrChars}>
        {LETTERS.map((ch, i) => (
          <span key={i} className={styles.ldrC} style={{ animationDelay: `${i * 0.06}s` }}>{ch}</span>
        ))}
      </div>
      <div className={`${styles.ldrLine} ${lineGo ? styles.go : ''}`} />
      <div className={styles.ldrPct}>{pct}%</div>
    </div>
  );
}
