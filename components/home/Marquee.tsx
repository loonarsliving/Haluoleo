import styles from './Marquee.module.css';

const LINE = ['"Bukan Sekadar Properti', '— Investasi untuk Generasi"'];
const REPEAT = 4;

export default function Marquee() {
  return (
    <div className={styles.marquee}>
      <div className={styles.mqInner}>
        {Array.from({ length: REPEAT }).map((_, i) => (
          <span key={i} style={{ display: 'contents' }}>
            <span className={styles.mqI}>{LINE[0]}</span>
            <span className={`${styles.mqI} ${styles.hi}`}>{LINE[1]}</span>
          </span>
        ))}
      </div>
    </div>
  );
}
