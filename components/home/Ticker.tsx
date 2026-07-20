import styles from './Ticker.module.css';

const ITEMS = [
  'Loonars Living',
  'Al Fath Introvert House',
  'Griya Cariu Indah',
  'Private Villa Yogyakarta',
  'KPR Subsidi Bogor',
  'Hunian Premium Makassar',
];
const DOUBLED = [...ITEMS, ...ITEMS];

export default function Ticker() {
  return (
    <div className={styles.ticker}>
      <div className={styles.tickerT}>
        {DOUBLED.map((item, i) => (
          <span key={i} className={styles.tickerI}>{item}</span>
        ))}
      </div>
    </div>
  );
}
