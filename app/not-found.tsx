import type { Metadata } from 'next';
import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import styles from './not-found.module.css';

export const metadata: Metadata = {
  title: 'Halaman Tidak Ditemukan — PT. Maha Karya Haluoleo',
  description: 'Halaman yang Anda cari tidak tersedia atau telah dipindahkan.',
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <>
      <Nav />
      <div className={styles.wrap}>
        <div className={styles.eyebrow}>Oops</div>
        <h1 className={styles.code}>4<em>0</em>4</h1>
        <h2 className={styles.title}>Halaman Tidak Ditemukan</h2>
        <p className={styles.desc}>
          Halaman yang Anda cari tidak tersedia, sudah dipindahkan, atau tidak pernah ada.
          Mari kembali ke beranda atau hubungi kami langsung.
        </p>
        <div className={styles.actions}>
          <Link href="/" className={`${styles.btn} ${styles.primary}`}>Kembali ke Beranda</Link>
          <Link href="/kontak" className={`${styles.btn} ${styles.secondary}`}>Hubungi Kami</Link>
        </div>
      </div>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
