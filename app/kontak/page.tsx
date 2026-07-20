import type { Metadata } from 'next';
import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import Reveal from '@/components/Reveal';
import DetailHero from '@/components/detail/DetailHero';
import ContactForm from '@/components/kontak/ContactForm';
import shared from '@/components/detail/shared.module.css';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Kontak — PT. Maha Karya Haluoleo',
  description: 'Hubungi PT. Maha Karya Haluoleo. Konsultasi properti gratis — Loonars Living, Al Fath Makassar, Griya Cariu Bogor.',
  openGraph: {
    title: 'Kontak — PT. Maha Karya Haluoleo',
    description: 'Hubungi PT. Maha Karya Haluoleo. Konsultasi properti gratis — Loonars Living, Al Fath Makassar, Griya Cariu Bogor.',
    images: ['https://haluoleo.id/img%20drone.jpeg'],
  },
};

const PROJECT_LINKS = [
  { href: '/loonars-living', badge: 'Loonars Living 📍 Yogyakarta', name: 'Loonars Private Living' },
  { href: '/al-fath-makassar.html', badge: 'Al Fath 📍 Makassar', name: 'Al Fath Introvert House' },
  { href: '/griya-cariu-indah', badge: 'Griya Cariu 📍 Bogor', name: 'Griya Cariu Indah 3' },
];

export default function KontakPage() {
  return (
    <>
      <Nav />

      <DetailHero
        media={{ type: 'image', src: '/img drone.jpeg' }}
        eyebrow="Hubungi Kami"
        titleLines={[{ text: 'Wujudkan' }, { text: 'Impianmu', italic: true }]}
        chips={['💬 WhatsApp Langsung', '✉ Email Resmi', '⏰ Respon 1×24 Jam']}
      />

      <section className={shared.sec} style={{ background: 'var(--dark)' }}>
        <div className={styles.grid}>
          <Reveal direction="left">
            <div className={shared.sLabel}>Cara Menghubungi</div>
            <h2 className={shared.sTitle}>Kami Siap<br /><em>Membantu</em></h2>
            <div className={styles.infoList}>
              <a href="https://wa.me/6282228885223" target="_blank" rel="noopener noreferrer" className={styles.info}>
                <div className={styles.icon}>💬</div>
                <div>
                  <div className={styles.lbl}>WhatsApp Langsung</div>
                  <div className={styles.val}>082228885223</div>
                  <div className={styles.sub}>Respon cepat · Tersedia segera</div>
                </div>
              </a>
              <div className={styles.info}>
                <div className={styles.icon}>✉</div>
                <div><div className={styles.lbl}>Email</div><div className={styles.val}>mahakarya@haluoleo.id</div></div>
              </div>
              <div className={styles.info}>
                <div className={styles.icon}>📍</div>
                <div>
                  <div className={styles.lbl}>Kantor Pusat</div>
                  <div className={styles.val}>Jl. Pettarani Lr. 2, Makassar</div>
                  <div className={styles.sub}>Sulawesi Selatan</div>
                </div>
              </div>
              <div className={styles.info}>
                <div className={styles.icon}>⏰</div>
                <div><div className={styles.lbl}>Jam Operasional</div><div className={styles.val}>Senin–Sabtu · 08.00–17.00 WITA</div></div>
              </div>
              <div className={styles.info}>
                <div className={styles.icon}>🌐</div>
                <div><div className={styles.lbl}>Website</div><div className={styles.val}>haluoleo.id</div></div>
              </div>
            </div>
          </Reveal>
          <Reveal direction="right" className={styles.formBox}>
            <ContactForm />
          </Reveal>
        </div>
      </section>

      <section className={shared.sec} style={{ background: 'var(--dark2)' }}>
        <div className={shared.secInner}>
          <div className={shared.sLabel}>Proyek Kami</div>
          <Reveal as="h2" delay={1} className={shared.sTitle}>Temukan<br /><em>Hunian Tepat</em></Reveal>
          <div className={styles.pmGrid}>
            {PROJECT_LINKS.map((p, i) => (
              <Reveal key={p.href} as="div" delay={(i + 1) as 1 | 2 | 3}>
                <Link href={p.href} className={styles.pm}>
                  <div className={styles.pmBadge}>{p.badge}</div>
                  <div className={styles.pmName}>{p.name}</div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </>
  );
}
