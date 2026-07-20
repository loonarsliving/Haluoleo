import type { Metadata } from 'next';
import Image from 'next/image';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import Reveal from '@/components/Reveal';
import DetailHero from '@/components/detail/DetailHero';
import Gallery from '@/components/detail/Gallery';
import CtaBanner from '@/components/detail/CtaBanner';
import shared from '@/components/detail/shared.module.css';

export const metadata: Metadata = {
  title: 'Loonars Private Living — Villa Eksklusif Yogyakarta | Maha Karya Haluoleo',
  description:
    'Loonars Private Living — private villa eksklusif di Yogyakarta. Konsep resort mewah dengan private pool.',
  openGraph: {
    title: 'Loonars Private Living — Villa Eksklusif Yogyakarta | Maha Karya Haluoleo',
    description: 'Loonars Private Living — private villa eksklusif di Yogyakarta. Konsep resort mewah dengan private pool.',
    images: ['https://haluoleo.id/loonars.jpeg'],
  },
};

const WA = 'https://wa.me/6282228885223';

export default function LoonarsLivingPage() {
  return (
    <>
      <Nav />

      <DetailHero
        videoWebm="/loonars-hero.webm"
        videoMp4="/loonars-hero.mp4"
        poster="/loonars-hero-poster.jpeg"
        eyebrow="Private Villa · Yogyakarta"
        titleLines={[{ text: 'Loonars' }, { text: 'Private Living', italic: true }]}
        chips={['📍 Yogyakarta', '🏘️ Private Pool Villa', '✨ Premium Exclusive']}
      />

      <section className={shared.sec} style={{ background: 'var(--dark)' }}>
        <div className={shared.secInner}>
          <div className={shared.sLabel}>Galeri</div>
          <Reveal as="h2" delay={1} className={shared.sTitle}>Setiap Sudut<br /><em>Bercerita</em></Reveal>
          <Reveal as="p" delay={2} className={shared.secP}>
            Villa eksklusif yang dirancang untuk memberikan pengalaman menginap sepenuhnya privat — jauh dari
            keramaian, dekat dengan kedamaian.
          </Reveal>
          <Gallery slug="loonars-living" />
        </div>
      </section>

      <section className={shared.sec} style={{ background: 'var(--dark2)' }}>
        <div className={`${shared.secInner} ${shared.sec2c}`}>
          <Reveal direction="left">
            <div className={shared.sLabel}>Spesifikasi</div>
            <h2 className={shared.sTitle}>Dirancang<br /><em>untuk Privasi</em></h2>
            <div className={shared.secQ}>&ldquo;Where Nature Meets Luxury&rdquo;</div>
            <p className={shared.secP}>
              Loonars Private Living menghadirkan konsep villa resort dalam setting residensial — setiap unit
              berdiri sendiri dengan kolam privat, taman, dan desain interior premium.
            </p>
            <p className={shared.secP}>
              Cocok sebagai second home, investment property, atau staycation premium di Yogyakarta.
            </p>
            <a
              href={`${WA}?text=${encodeURIComponent('Halo, saya tertarik Loonars Private Living Yogyakarta')}`}
              target="_blank"
              rel="noopener noreferrer"
              className={shared.btnP}
              style={{ marginTop: '2rem' }}
            >
              <span>💬 Tanya Harga &amp; Ketersediaan</span>
            </a>
          </Reveal>
          <Reveal direction="right" className={shared.specs}>
            <div className={shared.spec}><div className={shared.specV}>2</div><div className={shared.specK}>Unit Tersedia</div></div>
            <div className={shared.spec}><div className={shared.specV}>Villa</div><div className={shared.specK}>Tipe Hunian</div></div>
            <div className={shared.spec}><div className={shared.specV}>Private<br />Pool</div><div className={shared.specK}>Fasilitas Utama</div></div>
            <div className={shared.spec}><div className={shared.specV}>Premium</div><div className={shared.specK}>Kelas Investasi</div></div>
          </Reveal>
        </div>
      </section>

      <section className={shared.sec} style={{ background: 'var(--dark3)' }}>
        <div className={shared.teamGrid}>
          <Reveal direction="left">
            <div className={shared.sLabel}>Tim Kami</div>
            <h2 className={shared.sTitle}>Profesional,<br /><em>Berpengalaman</em></h2>
            <p className={shared.secP}>
              Di balik setiap proyek Loonars Living berdiri tim yang berdedikasi — profesional muda yang
              kolaboratif, inovatif, dan berkomitmen dari konsultasi hingga serah terima kunci.
            </p>
            <div className={shared.teamBadges}>
              <span className={shared.tBadge}>🤝 Professional</span>
              <span className={shared.tBadge}>💡 Innovative</span>
              <span className={shared.tBadge}>🌿 Collaborative</span>
            </div>
            <a
              href={`${WA}?text=${encodeURIComponent('Halo, saya ingin konsultasi Loonars Living Yogyakarta')}`}
              target="_blank"
              rel="noopener noreferrer"
              className={shared.btnP}
              style={{ marginTop: '2rem' }}
            >
              <span>💬 Konsultasi dengan Tim</span>
            </a>
          </Reveal>
          <Reveal direction="right" as="div" className={shared.teamImg}>
            <Image src="/img team.png" alt="Tim Haluoleo" width={640} height={460} />
          </Reveal>
        </div>
      </section>

      <CtaBanner
        title={<>Wujudkan Villa<br /><em>Impian Anda</em></>}
        desc="Tim kami siap mendampingi mulai dari konsultasi hingga proses kepemilikan. Gratis, tanpa tekanan."
        whatsappHref={`${WA}?text=${encodeURIComponent('Halo, saya ingin info Loonars Living Yogyakarta')}`}
      />

      <Footer />
      <WhatsAppButton />
    </>
  );
}
