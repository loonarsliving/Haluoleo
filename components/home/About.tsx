import Image from 'next/image';
import Reveal from '../Reveal';
import styles from './About.module.css';
import shared from './shared.module.css';

export default function About() {
  return (
    <section className={styles.about} id="about">
      <div className={styles.aboutInner}>
        <Reveal direction="left" className={styles.aboutImgStack}>
          <Image className={styles.aiMain} src="/alfath2.jpeg" alt="Project Haluoleo" width={600} height={460} />
          <Image className={styles.aiAccent} src="/hero1.jpeg" alt="Loonars" width={440} height={300} />
          <div className={styles.aiBadge}>
            <div className={styles.aiY}>2012</div>
            <div className={styles.aiT}>Tahun Berdiri</div>
          </div>
        </Reveal>
        <Reveal direction="right">
          <div className={shared.sLbl}>Tentang Kami</div>
          <Reveal as="h2" delay={1} className={shared.sTitle}>
            Membangun<br />Kepercayaan<br /><em>Sejak 2012</em>
          </Reveal>
          <Reveal as="p" delay={2} className={shared.sP}>
            PT. Maha Karya Haluoleo berdiri 21 November 2012, berawal dari Kendari, Sulawesi Tenggara. Kini hadir di
            enam kota — menghadirkan properti premium hingga hunian subsidi dengan standar dan komitmen yang sama.
          </Reveal>
          <Reveal as="p" delay={3} className={shared.sP}>
            Setiap proyek dibangun dengan pendekatan strategis dan terukur di bawah kepemimpinan langsung Founder
            Avianto Perdana Pagala.
          </Reveal>
        </Reveal>
      </div>
    </section>
  );
}
