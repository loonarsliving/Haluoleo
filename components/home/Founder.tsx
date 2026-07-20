import Image from 'next/image';
import Link from 'next/link';
import Reveal from '../Reveal';
import styles from './Founder.module.css';
import shared from './shared.module.css';

export default function Founder() {
  return (
    <section className={styles.founder} id="founder">
      <div className={styles.founderInner}>
        <Reveal direction="left" className={styles.fImg}>
          <Image
            src="/founder.jpeg"
            alt="Avianto Perdana Pagala"
            fill
            sizes="(max-width: 900px) 100vw, 45vw"
            style={{ objectFit: 'cover', filter: 'brightness(.72) saturate(1.1)' }}
          />
          <div className={styles.fBadge}>
            <div className={styles.fbR}>Founder &amp; CEO</div>
            <div className={styles.fbN}>Avianto Perdana Pagala</div>
          </div>
        </Reveal>
        <Reveal direction="right">
          <div className={shared.sLbl}>Founder &amp; Direktur Utama</div>
          <Reveal as="h2" delay={1} className={shared.sTitle}>
            Avianto<br /><em>Perdana Pagala</em>
          </Reveal>
          <Reveal as="div" delay={2} className={styles.fQuote}>
            &ldquo;Properti bukan hanya soal bangunan — ini soal kepercayaan yang dibangun satu keluarga di satu waktu.&rdquo;
          </Reveal>
          <Reveal as="p" delay={3} className={shared.sP}>
            Pengusaha properti asal Kendari yang membangun PT. Maha Karya Haluoleo sejak 2012. Pernah menjabat Ketua
            Umum Kadin Kota Kendari sebelum fokus penuh memimpin ekspansi nasional.
          </Reveal>
          <Reveal as="div" delay={4}>
            <Link href="/direktur" className={shared.btnSage}><span>Lihat Profil Lengkap →</span></Link>
          </Reveal>
        </Reveal>
      </div>
    </section>
  );
}
