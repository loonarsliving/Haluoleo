import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import Reveal from '@/components/Reveal';
import Particles from '@/components/detail/Particles';
import OrderForm from '@/components/beauty/OrderForm';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Loonars Beauty HydraGlow — Skincare Premium Indonesia',
  description: 'Loonars Beauty HydraGlow Advanced Brightening Lotion — 4 Types Hyaluron, Niacinamide & Squalane. Rp 89.000.',
  alternates: { canonical: 'https://haluoleo.id/beauty' },
  openGraph: {
    title: 'Loonars Beauty HydraGlow — Advanced Brightening Lotion',
    images: ['https://haluoleo.id/img%20hydraglow1.jpeg'],
  },
};

const INGREDIENTS = [
  { icon: '💧', name: '4 Types Hyaluron', role: 'Deep Hydration Complex', desc: 'Hidrasi berlapis dari permukaan hingga lapisan dalam kulit. Mengunci kelembapan 24 jam.' },
  { icon: '✨', name: 'Niacinamide', role: 'Brightening Agent', desc: 'Mencerahkan merata, menyamarkan noda hitam, memperkuat skin barrier.' },
  { icon: '🌿', name: 'Squalane', role: 'Emollient Moisturizer', desc: 'Emolien ringan dari tanaman — melembapkan tanpa rasa berat atau berminyak.' },
  { icon: '🦋', name: 'Non-Comedogenic', role: 'Safe Formula', desc: 'Aman untuk kulit wajah dan tubuh. Tidak menyumbat pori, cocok semua jenis kulit.' },
];

const STEPS = [
  { num: '01', title: 'Bersihkan Kulit', desc: 'Setelah mandi atau mencuci wajah, keringkan kulit hingga lembap (tidak terlalu kering).' },
  { num: '02', title: 'Aplikasikan', desc: 'Tuang secukupnya ke telapak tangan. Ratakan ke seluruh tubuh atau area yang diinginkan.' },
  { num: '03', title: 'Pijat & Resap', desc: 'Pijat memutar hingga meresap sempurna. Gunakan pagi & malam untuk hasil optimal.' },
];

export default function BeautyPage() {
  return (
    <>
      <Nav />

      <section className={styles.bHero}>
        <div className={styles.bHeroVideo}>
          <video autoPlay muted loop playsInline poster="/beauty-hero-poster.jpeg">
            <source src="/beauty-hero.webm" type="video/webm" />
            <source src="/beauty-hero.mp4" type="video/mp4" />
          </video>
        </div>
        <div className={`${styles.bBlob} ${styles.bb1}`} />
        <div className={`${styles.bBlob} ${styles.bb2}`} />
        <div className={`${styles.bBlob} ${styles.bb3}`} />
        <div className={styles.bGrid} />
        <Particles />
        <div className={styles.bHeroInner}>
          <div>
            <Link href="/" className={styles.bBack}>← Beranda</Link>
            <div className={styles.bEyebrow}>Loonars Beauty</div>
            <h1 className={styles.bTitle}>
              <span className={styles.wl}><span>Hydra</span></span>
              <span className={styles.wl}><span className={styles.em}>Glow</span></span>
            </h1>
            <p className={styles.bSub}>Advanced Brightening Lotion</p>
          </div>
          <div className={styles.bRight}>
            <div className={styles.bTags}>
              <span className={styles.bTag}>💧 4 Types Hyaluron</span>
              <span className={styles.bTag}>✨ Niacinamide</span>
              <span className={styles.bTag}>🌿 Squalane</span>
              <span className={styles.bTag}>🛡️ Non-Comedogenic</span>
            </div>
            <div className={styles.bPriceOld}>IDR 119.000</div>
            <div className={styles.bPriceNew}>IDR 89.000</div>
            <span className={styles.bPriceSave}>Hemat 25%</span>
            <div className={styles.bBtns}>
              <a href="#checkout" className={styles.btnRose}><span>🛒 Pesan COD — Rp 89.000</span></a>
              <a href="https://tokopedia.com/loonars" target="_blank" rel="noopener noreferrer" className={styles.btnShopOut}>Tokopedia</a>
              <a href="https://shopee.co.id/loonarsskin" target="_blank" rel="noopener noreferrer" className={styles.btnShopOut}>Shopee</a>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.ingSec}>
        <div className={styles.ingInner}>
          <div className={styles.sLabel}>Kandungan Aktif</div>
          <Reveal as="h2" delay={1} className={styles.sTitle}>Formula<br /><em>Premium</em></Reveal>
          <div className={styles.ingGrid}>
            {INGREDIENTS.map((ing, i) => (
              <Reveal key={ing.name} as="div" delay={(i + 1) as 1 | 2 | 3 | 4} className={styles.ingC}>
                <div className={styles.ingIcon}>{ing.icon}</div>
                <div className={styles.ingName}>{ing.name}</div>
                <div className={styles.ingRole}>{ing.role}</div>
                <div className={styles.ingDesc}>{ing.desc}</div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.apSec}>
        <div className={styles.apInner}>
          <Reveal direction="left">
            <div className={styles.apDualWrap}>
              <div className={styles.apPhotoMain}>
                <Image src="/hydraglow1.jpeg" alt="HydraGlow" fill sizes="(max-width: 900px) 70vw, 35vw" style={{ objectFit: 'cover' }} />
              </div>
              <div className={styles.apPhotoAccent}>
                <Image src="/hydraglow2.jpeg" alt="HydraGlow Detail" fill sizes="(max-width: 900px) 58vw, 28vw" style={{ objectFit: 'cover' }} />
              </div>
              <div className={styles.apPhotoBadge}>🏆 BPOM Terdaftar</div>
            </div>
          </Reveal>
          <Reveal direction="right">
            <div className={styles.sLabel}>Tentang Produk</div>
            <h2 className={styles.sTitle}>Bukan Sekadar<br /><em>Bodycare</em></h2>
            <div className={styles.apQ}>&ldquo;Kulitmu layak yang terbaik.&rdquo;</div>
            <ul className={styles.apList}>
              <li>Tekstur ringan, cepat meresap tanpa rasa lengket</li>
              <li>Wangi lembut, tidak overwhelm</li>
              <li>Aman untuk ibu hamil &amp; menyusui (konsultasikan dulu)</li>
              <li>BPOM terdaftar</li>
              <li>Cruelty-free</li>
            </ul>
            <a href="https://instagram.com/loonarsbeauty.official" target="_blank" rel="noopener noreferrer" className={styles.btnRose} style={{ marginTop: '2rem', display: 'inline-flex' }}>
              <span>📷 @loonarsbeauty.official</span>
            </a>
          </Reveal>
        </div>
      </section>

      <section className={styles.htSec}>
        <div className={styles.htInner}>
          <div className={styles.sLabel}>Cara Pakai</div>
          <Reveal as="h2" delay={1} className={styles.htTitle}>Ritual<br /><em>Harian</em></Reveal>
          <div className={styles.htSteps}>
            {STEPS.map((s) => (
              <Reveal key={s.num} as="div" className={styles.htStep}>
                <div className={styles.htNum}>{s.num}</div>
                <div>
                  <div className={styles.htStepTitle}>{s.title}</div>
                  <div className={styles.htDesc}>{s.desc}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.prodShowcase} id="produk">
        <div className={styles.psInner}>
          <Reveal direction="up" className={styles.psVisual}>
            <div className={styles.psBottle}>
              <div className={styles.psbGlow} />
              <div className={styles.psbIcon}>🦋</div>
              <div className={styles.psbName}>HydraGlow</div>
              <div className={styles.psbSub}>Advanced Brightening Lotion</div>
              <div className={styles.psbTags}>
                <span>💧 4 Types Hyaluron</span>
                <span>✨ Niacinamide</span>
                <span>🌿 Squalane</span>
              </div>
              <div className={styles.psbPriceWrap}>
                <span className={styles.psbOld}>IDR 119.000</span>
                <span className={styles.psbNew}>IDR 89.000</span>
              </div>
            </div>
          </Reveal>
          <Reveal direction="right" className={styles.psInfo}>
            <div className={styles.sLabel}>Produk Unggulan</div>
            <h2 className={styles.sTitle}>HydraGlow<br /><em>Advanced Brightening</em></h2>
            <p>
              Formula canggih dengan 4 jenis Hyaluronic Acid untuk hidrasi berlapis. Diformulasikan untuk
              perempuan kota yang aktif — ringan, cepat meresap, dan bekerja sepanjang hari.
            </p>
            <div className={styles.psBadges}>
              <div className={styles.psBadge}><span>🛡️</span><span>BPOM Terdaftar</span></div>
              <div className={styles.psBadge}><span>🌿</span><span>Cruelty-Free &amp; Non-Comedogenic</span></div>
              <div className={styles.psBadge}><span>✅</span><span>Aman untuk semua jenis kulit</span></div>
            </div>
            <a href="#checkout" className={styles.btnRose} style={{ marginTop: '2rem', display: 'inline-flex' }}>
              <span>🛒 Pesan COD Sekarang ↓</span>
            </a>
          </Reveal>
        </div>
      </section>

      <section className={styles.codSec} id="checkout">
        <div className={styles.codInner}>
          <div className={styles.codHdr}>
            <div className={styles.codHdrLabel}>🛺 Bayar di Tempat (COD)</div>
            <h2 className={styles.sTitle}>Pesan<br /><em>Sekarang</em></h2>
            <span className={styles.codBadge}>Isi form → produk dikirim → bayar saat terima</span>
          </div>
          <OrderForm />
        </div>
      </section>

      <div className={styles.shopsRow}>
        <a href="https://tokopedia.com/loonars" target="_blank" rel="noopener noreferrer" className={styles.shLink}>🛒 Tokopedia Official Store</a>
        <a href="https://shopee.co.id/loonarsskin" target="_blank" rel="noopener noreferrer" className={styles.shLink}>🛍 Shopee Official Store</a>
        <a href="https://instagram.com/loonarsbeauty.official" target="_blank" rel="noopener noreferrer" className={styles.shLink}>📷 @loonarsbeauty.official</a>
      </div>

      <Footer />
      <WhatsAppButton />
    </>
  );
}
