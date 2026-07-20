'use client';

import Link from 'next/link';
import Particles from './Particles';
import styles from './DetailHero.module.css';

export type TitleLine = { text: string; italic?: boolean };

export default function DetailHero({
  videoWebm,
  videoMp4,
  poster,
  eyebrow,
  titleLines,
  chips,
  backHref = '/',
  backLabel = 'Kembali ke Beranda',
}: {
  videoWebm: string;
  videoMp4: string;
  poster: string;
  eyebrow: string;
  titleLines: TitleLine[];
  chips: string[];
  backHref?: string;
  backLabel?: string;
}) {
  return (
    <section className={styles.dHero}>
      <div className={styles.dHeroVideo}>
        <video autoPlay muted loop playsInline poster={poster}>
          <source src={videoWebm} type="video/webm" />
          <source src={videoMp4} type="video/mp4" />
        </video>
      </div>
      <div className={styles.dHeroVg1} />
      <div className={styles.dHeroVg2} />
      <Particles />
      <div className={styles.dHeroContent}>
        <Link href={backHref} className={styles.dHeroBack}>← {backLabel}</Link>
        <div className={styles.dEyebrow}>{eyebrow}</div>
        <h1 className={styles.dTitle}>
          {titleLines.map((line, i) => (
            <span key={i} className={styles.wl}>
              <span className={line.italic ? styles.em : undefined} style={{ animationDelay: `${0.5 + i * 0.18}s` }}>
                {line.text}
              </span>
            </span>
          ))}
        </h1>
        <div className={styles.dChips}>
          {chips.map((chip) => (
            <span key={chip} className={styles.dChip}>{chip}</span>
          ))}
        </div>
      </div>
    </section>
  );
}
