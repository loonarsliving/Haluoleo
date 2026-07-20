import Reveal from '../Reveal';
import styles from './Portfolio.module.css';
import shared from './shared.module.css';

const TRACK_RECORD = [
  { loc: 'Makassar', name: 'The Al Fath', units: '31 Unit' },
  { loc: 'Makassar', name: 'The Al Fath 2', units: '18 Unit' },
  { loc: 'Makassar', name: 'The Al Fath 3', units: '45 Unit' },
  { loc: 'Makassar', name: 'Dewi Bunga Land', units: '280 Unit' },
  { loc: 'Maros', name: 'Al Fath Land', units: '93 Unit' },
  { loc: 'Gowa', name: 'Savana Residence', units: '101 Unit' },
  { loc: 'Gowa', name: 'Al Fath Bollangi', units: '10 Villa + 129 Kavling' },
  { loc: 'Kendari', name: 'Al Fath Spring', units: 'Kendari' },
  { loc: 'Majene', name: 'Al Fath Hills', units: 'Majene' },
  { loc: 'Makassar', name: 'Al Fath Flipper', units: '8 Unit' },
  { loc: 'Yogyakarta', name: 'Loonars Living 1', units: 'Mulungan' },
  { loc: 'Yogyakarta', name: 'Loonars Living 2', units: 'JCM' },
];

export default function Portfolio() {
  return (
    <section className={styles.portfolio} id="portfolio">
      <Reveal direction="up" className={styles.pfHeader}>
        <div className={shared.sLbl}>Track Record</div>
        <h2 className={shared.sTitle}>Project yang Telah<br /><em>Kami Selesaikan</em></h2>
      </Reveal>
      <div className={styles.pfGrid}>
        {TRACK_RECORD.map((p, i) => (
          <Reveal key={p.name} as="div" delay={((i % 4) + 1) as 1 | 2 | 3 | 4} direction="up" className={styles.pfItem}>
            <div className={styles.pfLoc}>{p.loc}</div>
            <div className={styles.pfName}>{p.name}</div>
            <div className={styles.pfUnits}>{p.units}</div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
