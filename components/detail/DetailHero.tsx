'use client';

import Link from 'next/link';
import Particles from './Particles';
import styles from './DetailHero.module.css';

export type TitleLine = { text: string; italic?: boolean };
export type HeroMedia =
  | { type: 'video'; webm: string; mp4: string; poster: string }
  | { type: 'image'; src: string };

export default function DetailHero({
  media,
  eyebrow,
  titleLines,
  chips,
  backHref = '/',
  backLabel = 'Kembali ke Beranda',
}: {
  media: HeroMedia;
  eyebrow: string;
  titleLines: TitleLine[];
  chips: string[];
  backHref?: string;
  backLabel?: string;
}) {
  return (
    <section className={styles.dHero}>
      {media.type === 'video' ? (
        <div className={styles.dHeroVideo}>
          <video autoPlay muted loop playsInline poster={media.poster}>
            <source src={media.webm} type="video/webm" />
            <source src={media.mp4} type="video/mp4" />
          </video>
        </div>
      ) : (
        <div className={styles.dHeroBg} style={{ backgroundImage: `url('${media.src}')` }} />
      )}
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
