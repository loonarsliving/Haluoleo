import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import Reveal from '@/components/Reveal';
import Particles from '@/components/detail/Particles';
import CtaBanner from '@/components/detail/CtaBanner';
import shared from '@/components/detail/shared.module.css';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Avianto Perdana Pagala — Founder & Direktur | PT. Maha Karya Haluoleo',
  description: 'Avianto Perdana Pagala — Founder dan Direktur Utama PT. Maha Karya Haluoleo sejak 2012. Mantan Ketua Umum Kadin Kota Kendari.',
  openGraph: {
    title: 'Avianto Perdana Pagala — Founder & Direktur | PT. Maha Karya Haluoleo',
    description: 'Avianto Perdana Pagala — Founder dan Direktur Utama PT. Maha Karya Haluoleo sejak 2012. Mantan Ketua Umum Kadin Kota Kendari.',
    images: ['https://haluoleo.id/img%20founder.jpeg'],
  },
};

const TIMELINE = [
  {
    year: '2012',
    title: 'Mendirikan PT. Maha Karya Haluoleo',
    desc: 'Berbasis di Makassar dan Kendari, Sulawesi Tenggara. Fokus awal pada pengembangan perumahan syariah di Sulawesi — memulai dari proyek pertama The Al Fath.',
  },
  {
    year: '—',
    title: 'Ketua Umum Kadin Kota Kendari',
    desc: 'Menjabat sebagai Ketua Umum Kamar Dagang dan Industri (Kadin) Kota Kendari — menjadi mitra strategis Pemerintah Kota dalam program pemberdayaan pengusaha dan stabilisasi ekonomi daerah.',
    badge: 'Tokoh Bisnis Kendari',
  },
  {
    year: '2020',
    title: 'Ekspansi Lintas Sulawesi',
    desc: 'Grand Launching Sinergy Land di Makassar — membawa PT. Maha Karya Haluoleo ke Maros, Gowa, Majene, dan Kendari dengan total 11 proyek aktif di seluruh Sulawesi.',
  },
  {
    year: '2023',
    title: 'Mundur dari Kadin — Fokus Ekspansi Nasional',
    desc: 'Juli 2023: mengundurkan diri dari jabatan Ketua Umum Kadin untuk memimpin penuh ekspansi PT. Maha Karya Haluoleo ke pulau Jawa (Yogyakarta dan Bogor).',
  },
  {
    year: '2025',
    title: 'Meluncurkan Brand Loonars',
    desc: 'Loonars Private Living (Yogyakarta) — villa eksklusif pertama di Jawa. Bersamaan dengan peluncuran Loonars Beauty (HydraGlow). Ekspansi ke Bogor dengan Griya Cariu Indah 3 dan Cendana Private Living di Makassar.',
    badge: 'Multi-brand · Multi-kota',
  },
];

const PORTFOLIO = [
  { href: '/loonars-living', img: '/loonars.jpeg', loc: 'Private Villa 📍 Yogyakarta', name: 'Loonars Private Living', sub: 'Villa Eksklusif · 2 Unit' },
  { href: '/cendana-makassar.html', img: '/cendana-hero.jpeg', loc: '18 Unit 📍 Makassar', name: 'Cendana Private Living', sub: 'Hunian Premium' },
  { href: '/griya-cariu-indah', img: '/cariu1.jpeg', loc: 'KPR Subsidi 📍 Cariu, Bogor', name: 'Griya Cariu Indah 3', sub: '154 Unit Subsidi' },
];

const KOMITMEN = [
  { icon: '🤝', title: 'Transparansi & Profesionalitas', desc: 'Dokumentasi lengkap, proses terstruktur, tidak ada biaya tersembunyi' },
  { icon: '📈', title: 'Fokus Sustainability', desc: 'Strategi jangka panjang yang mengutamakan nilai aset dan kepuasan penghuni' },
  { icon: '🏆', title: 'Track Record 12+ Tahun', desc: '10+ proyek selesai, ratusan keluarga terlayani sejak 2012' },
];

export default function DirekturPage() {
  return (
    <>
      <Nav />

      <section className={styles.dirHero}>
        <div className={styles.dirBg} />
        <div className={styles.dirVg} />
        <div className={styles.dirVg2} />
        <Particles />
        <div className={styles.dirHeroInner}>
          <div>
            <Link href="/" className={styles.dirBack}>← Kembali ke Beranda</Link>
            <div className={styles.dirEyebrow}>Founder &amp; CEO · PT. Maha Karya Haluoleo</div>
            <h1 className={styles.dirName}>Avianto<br />Perdana Pagala</h1>
            <span className={styles.dirChip}>PT. Maha Karya Haluoleo · Est. 2012 · haluoleo.id</span>
          </div>
          <div className={styles.dirBio}>
            Pengusaha properti asal Kendari, Sulawesi Tenggara, yang membangun PT. Maha Karya Haluoleo dari nol
            sejak 2012. Dengan visi menghadirkan properti berkualitas dari Sulawesi hingga Jawa — dari hunian
            subsidi untuk keluarga muda hingga villa eksklusif bernilai investasi tinggi.
          </div>
        </div>
      </section>

      <section className={shared.sec} style={{ background: 'var(--dark)' }}>
        <div className={shared.secInner}>
          <div className={shared.sLabel}>Riwayat</div>
          <Reveal as="h2" delay={1} className={shared.sTitle}>Perjalanan<br /><em>12 Tahun Berkarya</em></Reveal>
          <div className={styles.tl}>
            {TIMELINE.map((t) => (
              <Reveal key={t.title} as="div" className={styles.tlItem}>
                <div className={styles.tlDot} />
                <div className={styles.tlYear}>{t.year}</div>
                <div className={styles.tlTitle}>{t.title}</div>
                <div className={styles.tlDesc}>{t.desc}</div>
                {t.badge && <span className={styles.tlBadge}>{t.badge}</span>}
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <div className={styles.phil}>
        <Reveal as="div" className={styles.philQuote}>
          &ldquo;Properti bukan hanya soal bangunan —<br />ini soal <em>kepercayaan</em> yang dibangun<br />satu keluarga di satu waktu.&rdquo;
        </Reveal>
        <Reveal as="div" delay={1} className={styles.philAuthor}>— Avianto Perdana Pagala</Reveal>
      </div>

      <section className={shared.sec} style={{ background: 'var(--dark)' }}>
        <div className={shared.secInner}>
          <div className={shared.sLabel}>Portofolio Direktur</div>
          <Reveal as="h2" delay={1} className={shared.sTitle}>Proyek di Bawah<br /><em>Kepemimpinan Langsung</em></Reveal>
          <div className={styles.dirPfGrid}>
            {PORTFOLIO.map((p, i) => (
              <Reveal key={p.href} as="div" delay={(i + 1) as 1 | 2 | 3}>
                <Link className={styles.dpCard} href={p.href}>
                  <div className={styles.dpImg}>
                    <Image src={p.img} alt={p.name} fill sizes="(max-width: 900px) 100vw, 33vw" style={{ objectFit: 'cover' }} />
                  </div>
                  <div className={styles.dpBody}>
                    <div className={styles.dpLoc}>{p.loc}</div>
                    <div className={styles.dpName}>{p.name}<br /><span className={styles.dpSub}>{p.sub}</span></div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className={shared.sec} style={{ background: 'var(--dark2)' }}>
        <div className={shared.secInner}>
          <div className={shared.sLabel}>Komitmen</div>
          <Reveal as="h2" delay={1} className={shared.sTitle}>Loonars Dibangun<br /><em>untuk Bertahan</em></Reveal>
          <div className={styles.komGrid}>
            {KOMITMEN.map((k, i) => (
              <Reveal key={k.title} as="div" delay={(i + 1) as 1 | 2 | 3} className={styles.kom}>
                <div className={styles.komIcon}>{k.icon}</div>
                <div className={styles.komTitle}>{k.title}</div>
                <div className={styles.komDesc}>{k.desc}</div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner
        title={<>Mulai Investasi<br /><em>Bersama Kami</em></>}
        desc="Konsultasi langsung dengan tim kami. Gratis, tanpa tekanan."
        whatsappHref="https://wa.me/6282228885223?text=Halo%2C+saya+ingin+konsultasi+properti+Haluoleo"
      />

      <Footer />
      <WhatsAppButton />
    </>
  );
}
