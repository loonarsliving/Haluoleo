'use client';

import useMagnetic from './useMagnetic';
import styles from './WhatsAppButton.module.css';

export default function WhatsAppButton() {
  const ref = useMagnetic<HTMLAnchorElement>();
  return (
    <a
      ref={ref}
      href="https://wa.me/6282228885223"
      target="_blank"
      rel="noopener noreferrer"
      className={styles.wa}
      aria-label="Chat WhatsApp"
    >
      💬
    </a>
  );
}
