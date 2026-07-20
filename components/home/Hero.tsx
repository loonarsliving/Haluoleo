'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import useMagnetic from '../useMagnetic';
import HeroAtmosphere from './HeroAtmosphere';
import styles from './Hero.module.css';

export default function Hero() {
  const bgTextRef = useRef<HTMLDivElement>(null);
  const mainBtnRef = useMagnetic<HTMLAnchorElement>();
  const ghostBtnRef = useMagnetic<HTMLAnchorElement>();

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      if (bgTextRef.current) {
        bgTextRef.current.style.transform = `translate(-50%,-52%) translateY(${y * 0.05}px)`;
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section id="hero" className={styles.hero}>
      <div className={styles.heroVideoLayer}>
        <video className={styles.heroVideo} autoPlay muted loop playsInline poster="/hero-poster.jpeg">
          <source src="/hero-timelapse.webm" type="video/webm" />
          <source src="/hero-timelapse.mp4" type="video/mp4" />
        </video>
      </div>

      <div className={styles.heroTagline}>Building the Future of Living.</div>

      <div ref={bgTextRef} className={styles.heroBgText}>
        <span className={styles.htLine}>Dari Tanah</span>
        <span className={`${styles.htLine} ${styles.htLine2}`}>Menjadi Karya</span>
      </div>

      <div className={styles.heroVignette} />
      <HeroAtmosphere />

      <div className={styles.heroContent}>
        <div className={styles.heroLeft}>
          <div className={styles.heroLabel}>PT. Maha Karya Haluoleo &nbsp;&middot;&nbsp; Est. 2012</div>
          <p className={styles.heroSub}>
            Developer properti terpercaya sejak 2012 — dari villa eksklusif Yogyakarta, hunian premium Makassar,
            hingga rumah subsidi Bogor.
          </p>
        </div>
        <div className={styles.heroRight}>
          <Link ref={mainBtnRef} href="/loonars-living" className={styles.heroBtnMain}>
            <span>Lihat Project ↗</span>
          </Link>
          <a
            ref={ghostBtnRef}
            href="https://wa.me/6282228885223"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.heroBtnGhost}
          >
            💬 Konsultasi Gratis
          </a>
        </div>
      </div>

      <div className={styles.heroScroll}>
        <div className={styles.scrollTrack} />
        <span className={styles.scrollTxt}>Scroll</span>
      </div>
    </section>
  );
}
