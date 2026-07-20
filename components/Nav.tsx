'use client';

import { useState } from 'react';
import Link from 'next/link';
import styles from './Nav.module.css';

const MENU_LINKS = [
  { href: '/', label: 'Beranda' },
  { href: '/loonars-living', label: 'Loonars Living' },
  { href: '/al-fath-makassar.html', label: 'Al Fath Makassar' },
  { href: '/griya-cariu-indah', label: 'Griya Cariu' },
  { href: '/direktur.html', label: 'Direktur' },
  { href: '/beauty.html', label: 'Loonars Beauty', rose: true },
  { href: '/kontak.html', label: 'Kontak' },
];

export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className={`${styles.smol} ${open ? styles.open : ''}`} onClick={() => setOpen(false)} />
      <div className={`${styles.smenu} ${open ? styles.open : ''}`}>
        {MENU_LINKS.map((l) => (
          <Link key={l.href} href={l.href} className={`${styles.smA} ${l.rose ? styles.rose : ''}`} onClick={() => setOpen(false)}>
            {l.label}
          </Link>
        ))}
      </div>

      <nav className={styles.nav}>
        <Link href="/" className={styles.navLogo}>
          <div className={styles.navDot} />Maha Karya Haluoleo
        </Link>
        <div className={styles.navR}>
          <ul className={styles.navLinks}>
            <li><Link href="/#projects">Properti</Link></li>
            <li><Link href="/direktur.html">Direktur</Link></li>
            <li><Link href="/beauty.html">Beauty</Link></li>
          </ul>
          <a href="https://wa.me/6282228885223" target="_blank" rel="noopener noreferrer" className={styles.navCta}>
            💬 Konsultasi
          </a>
          <div
            className={`${styles.hbg} ${open ? styles.open : ''}`}
            onClick={() => setOpen((v) => !v)}
            role="button"
            aria-label="Toggle menu"
          >
            <span /><span /><span />
          </div>
        </div>
      </nav>
    </>
  );
}
