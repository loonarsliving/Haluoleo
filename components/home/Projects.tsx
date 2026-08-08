import Link from 'next/link';
import Reveal from '../Reveal';
import styles from './Projects.module.css';
import shared from './shared.module.css';

const PROJECTS = [
  {
    href: '/loonars-living',
    img: '/loonars.jpeg',
    num: '01',
    badge: { text: 'Private Villa', tone: 'villa' as const },
    loc: 'Yogyakarta',
    name: 'Loonars Private Living',
    desc: 'Private villa eksklusif konsep resort mewah dengan private pool di Yogyakarta.',
  },
  {
    href: '/cendana-makassar.html',
    img: '/cendana-hero.jpeg',
    num: '02',
    badge: { text: 'New · 18 Unit', tone: 'new' as const },
    loc: 'Borong Indah, Makassar',
    name: 'Cendana Private Living',
    desc: 'Cluster gerbang privat 18 unit dengan desain klasik-modern di Makassar.',
  },
  {
    href: '/griya-cariu-indah',
    img: '/cariu1.jpeg',
    num: '03',
    badge: { text: 'KPR Subsidi', tone: 'sub' as const },
    loc: 'Cariu, Kab. Bogor',
    name: 'Griya Cariu Indah 3',
    desc: 'Type 30/60. Cicilan mulai Rp 985rb/bulan. Booking cukup Rp 500rb.',
    price: 'Rp 185.000.000',
  },
];

const BADGE_CLASS = { villa: styles.dcbVilla, new: styles.dcbNew, sub: styles.dcbSub };

export default function Projects() {
  return (
    <section className={styles.projects} id="projects">
      <Reveal direction="up" className={styles.projHeader}>
        <div>
          <div className={shared.sLbl}>Project Aktif</div>
          <h2 className={styles.projTitleBig}>Tiga Kota,<br /><em>Satu Visi</em></h2>
        </div>
        <Reveal as="div" delay={2} direction="up" className={styles.ctaWrap}>
          <Link href="/kontak" className={shared.btnSage}><span>Konsultasi Gratis →</span></Link>
        </Reveal>
      </Reveal>
      <div className={styles.devGrid}>
        {PROJECTS.map((p, i) => (
          <Reveal key={p.href} as="div" delay={(i + 1) as 1 | 2 | 3} direction="up">
            <Link className={styles.devCard} href={p.href}>
              <div className={styles.dcBg} style={{ backgroundImage: `url('${p.img}')` }} />
              <div className={styles.dcGrad} />
              <div className={styles.dcNum}>{p.num}</div>
              <div className={`${styles.dcBadge} ${BADGE_CLASS[p.badge.tone]}`}>{p.badge.text}</div>
              <div className={styles.dcContent}>
                <div className={styles.dcLoc}>📍 {p.loc}</div>
                <div className={styles.dcName}>{p.name}</div>
                <div className={styles.dcDesc}>{p.desc}</div>
                {p.price && <div className={styles.dcPrice}>{p.price}</div>}
              </div>
              <div className={styles.dcArrow}>→</div>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
