'use client';

import { Fragment, useEffect, useRef, useState } from 'react';
import styles from './Stats.module.css';

const STATS = [
  { target: 10, suffix: '+', label: 'Project Selesai' },
  { target: 12, suffix: '+', label: 'Tahun Berkarya' },
  { target: 700, suffix: '+', label: 'Unit Terjual' },
  { target: 6, suffix: '', label: 'Kota Aktif' },
];

function Counter({ target, suffix }: { target: number; suffix: string }) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const done = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !done.current) {
            done.current = true;
            let c = 0;
            const step = target / 50;
            const iv = setInterval(() => {
              c = Math.min(c + step, target);
              setValue(Math.round(c));
              if (c >= target) clearInterval(iv);
            }, 30);
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.7 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [target]);

  return (
    <div ref={ref} className={styles.statNum}>
      {value}<em>{suffix}</em>
    </div>
  );
}

export default function Stats() {
  return (
    <div className={styles.stats}>
      {STATS.map((s, i) => (
        <Fragment key={s.label}>
          <div className={styles.statItem}>
            <Counter target={s.target} suffix={s.suffix} />
            <div className={styles.statLbl}>{s.label}</div>
          </div>
          {i < STATS.length - 1 && <div className={styles.statSep} />}
        </Fragment>
      ))}
    </div>
  );
}
