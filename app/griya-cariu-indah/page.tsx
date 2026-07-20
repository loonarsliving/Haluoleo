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
  title: 'Griya Cariu Indah 3 — Rumah Subsidi KPR Bogor | Maha Karya Haluoleo',
  description:
    'Griya Cariu Indah 3 — 154 unit rumah subsidi KPR di Cariu, Kab. Bogor. Harga Rp 185 juta, cicilan Rp 985 ribu/bulan.',
  openGraph: {
    title: 'Griya Cariu Indah 3 — Rumah Subsidi KPR Bogor | Maha Karya Haluoleo',
    description: 'Griya Cariu Indah 3 — 154 unit rumah subsidi KPR di Cariu, Kab. Bogor. Harga Rp 185 juta, cicilan Rp 985 ribu/bulan.',
    images: ['https://haluoleo.id/cariu1.jpeg'],
  },
};

const WA = 'https://wa.me/6282228885223';

export default function GriyaCariuIndahPage() {
  return (
    <>
      <Nav />

      <DetailHero
        media={{ type: 'image', src: '/cariu1.jpeg' }}
        eyebrow="KPR Subsidi · 154 Unit · Kab. Bogor"
        titleLines={[{ text: 'Griya Cariu' }, { text: 'Indah 3', italic: true }]}
        chips={['📍 Cariu, Kab. Bogor', '🏘️ Type 30/60', '💰 Booking Rp 500rb']}
      />

      <section className={shared.sec} style={{ background: 'var(--dark)' }}>
        <div className={shared.secInner}>
          <div className={shared.sLabel}>Simulasi Harga</div>
          <Reveal as="h2" delay={1} className={shared.sTitle}>Terjangkau,<br /><em>Tanpa Kompromi</em></Reveal>
          <div className={shared.simGrid}>
            <Reveal as="div" delay={1} className={shared.simBox}>
              <div className={shared.simTitle}>Biaya Awal — Mulai Huni</div>
              <div className={shared.simRow}><span className={shared.simL}>Booking Fee</span><span className={shared.simV}>Rp 500.000</span></div>
              <div className={shared.simRow}><span className={shared.simL}>Uang Muka (DP)</span><span className={shared.simV}>Rp 1.500.000</span></div>
              <div className={shared.simRow}><span className={shared.simL}>Total Awal</span><span className={`${shared.simV} ${shared.simVBig}`}>Rp 2.000.000</span></div>
              <div className={shared.simNote}>*Syarat KPR berlaku sesuai ketentuan bank</div>
            </Reveal>
            <Reveal as="div" delay={2} className={shared.simBox}>
              <div className={shared.simTitle}>Harga Unit</div>
              <div className={shared.simRow}><span className={shared.simL}>Harga Normal</span><span className={shared.simV}>Rp 185.000.000</span></div>
              <div className={shared.simRow}><span className={shared.simL}>Cicilan / bulan</span><span className={`${shared.simV} ${shared.simVBig}`}>Rp 985.000</span></div>
              <div className={shared.simRow}><span className={shared.simL}>Tenor</span><span className={shared.simV}>30 Tahun</span></div>
              <div className={shared.simNote}>*Skema KPR FLPP subsidi pemerintah</div>
            </Reveal>
          </div>
          <Reveal as="div" delay={3} className={shared.simBox} style={{ marginTop: '1px' }}>
            <div className={shared.simTitle}>Spesifikasi Unit — Type 30/60</div>
            <table className={shared.specTbl}>
              <tbody>
                <tr><td>Luas Bangunan</td><td>30 m²</td></tr>
                <tr><td>Luas Tanah</td><td>60 m² (5×12m)</td></tr>
                <tr><td>Kamar Tidur</td><td>2 KT</td></tr>
                <tr><td>Fasilitas</td><td>Ruang tamu · Dapur · KM · Carport · Free Canopy</td></tr>
              </tbody>
            </table>
          </Reveal>
        </div>
      </section>

      <section className={shared.sec} style={{ background: 'var(--dark2)' }}>
        <div className={shared.secInner}>
          <div className={shared.sLabel}>Galeri</div>
          <Reveal as="h2" delay={1} className={shared.sTitle}>Hunian Nyaman<br /><em>untuk Keluarga Muda</em></Reveal>
          <Gallery slug="griya-cariu-indah" />
        </div>
      </section>

      <section className={shared.sec} style={{ background: 'var(--dark)' }}>
        <div className={`${shared.secInner} ${shared.sec2c}`}>
          <Reveal direction="left">
            <div className={shared.sLabel}>Fasilitas &amp; Lokasi</div>
            <h2 className={shared.sTitle}>Pinggir Jalan Raya,<br /><em>Harga Terjangkau</em></h2>
            <p className={shared.secP}>
              Berlokasi di Tegal Panjang, Kec. Cariu — tepat di pinggir Jalan Raya Transyogi, akses mudah ke mana
              saja. Lingkungan asri, sejuk, bebas banjir.
            </p>
            <ul className={shared.unitFeats}>
              <li>2 kamar tidur, 1 kamar mandi, ruang tamu, dapur</li>
              <li>Carport dengan free canopy</li>
              <li>Lingkungan bebas banjir</li>
              <li>Udara segar khas pegunungan Bogor</li>
              <li>Pinggir Jalan Raya Transyogi</li>
              <li>Dibantu proses KPR sampai akad</li>
            </ul>
            <a
              href={`${WA}?text=${encodeURIComponent('Halo, saya tertarik Griya Cariu Indah 3. Mohon info unit tersedia.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className={shared.btnP}
              style={{ marginTop: '2rem' }}
            >
              <span>💬 Cek Unit Tersedia</span>
            </a>
          </Reveal>
          <Reveal direction="right">
            <div className={shared.simBox}>
              <div className={shared.simTitle}>Info Pembelian</div>
              <div className={shared.simRow}><span className={shared.simL}>Booking</span><span className={`${shared.simV} ${shared.simVBig}`}>Rp 500.000</span></div>
              <div className={shared.simRow}><span className={shared.simL}>DP</span><span className={shared.simV}>Rp 1.500.000</span></div>
              <div className={shared.simRow}><span className={shared.simL}>Cicilan</span><span className={shared.simV}>Rp 985.000 / bulan</span></div>
              <div className={shared.simRow}><span className={shared.simL}>Tenor</span><span className={shared.simV}>30 tahun</span></div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className={shared.sec} style={{ background: 'var(--dark3)' }}>
        <div className={shared.teamGrid}>
          <Reveal direction="left">
            <div className={shared.sLabel}>Tim Kami</div>
            <h2 className={shared.sTitle}>Kami Ada<br /><em>untuk Kamu</em></h2>
            <p className={shared.secP}>
              Tim Mahakarya Haluoleo siap mendampingi dari awal — konsultasi, proses KPR, hingga serah terima
              kunci. Profesional dan selalu responsif.
            </p>
            <div className={shared.teamBadges}>
              <span className={shared.tBadge}>🤝 Professional</span>
              <span className={shared.tBadge}>💡 Innovative</span>
              <span className={shared.tBadge}>🌿 Collaborative</span>
            </div>
            <a
              href={`${WA}?text=${encodeURIComponent('Halo, saya ingin konsultasi Griya Cariu Indah 3 Bogor')}`}
              target="_blank"
              rel="noopener noreferrer"
              className={shared.btnP}
              style={{ marginTop: '2rem' }}
            >
              <span>💬 Konsultasi Gratis</span>
            </a>
          </Reveal>
          <Reveal direction="right" as="div" className={shared.teamImg}>
            <Image src="/img team2.png" alt="Tim Griya Cariu" width={640} height={460} />
          </Reveal>
        </div>
      </section>

      <CtaBanner
        title={<>154 Unit Terbatas —<br /><em>Booking Cukup Rp 500rb</em></>}
        desc="Proses mudah, dibantu sampai akad. Tim kami siap mendampingi dari awal hingga kunci di tangan."
        whatsappHref={`${WA}?text=${encodeURIComponent('Halo, saya ingin booking Griya Cariu Indah 3. Bagaimana prosedurnya?')}`}
      />

      <Footer />
      <WhatsAppButton />
    </>
  );
}
