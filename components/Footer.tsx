import Link from 'next/link';
import styles from './Footer.module.css';

const FOOTER_LINKS = [
  { href: '/loonars-living.html', label: 'Loonars Living' },
  { href: '/al-fath-makassar.html', label: 'Al Fath' },
  { href: '/griya-cariu-indah.html', label: 'Griya Cariu' },
  { href: '/direktur.html', label: 'Direktur' },
  { href: '/beauty.html', label: 'Beauty' },
  { href: '/kontak.html', label: 'Kontak' },
];

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.ftBrand}>PT. Maha Karya Haluoleo</div>
      <div className={styles.ftCopy}>© 2026 haluoleo.id</div>
      <div className={styles.ftNav}>
        {FOOTER_LINKS.map((l) => (
          <Link key={l.href} href={l.href}>{l.label}</Link>
        ))}
      </div>
    </footer>
  );
}
