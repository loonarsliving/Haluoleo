import Link from 'next/link';
import type { ReactNode } from 'react';
import Reveal from '../Reveal';
import shared from './shared.module.css';

export default function CtaBanner({
  title,
  desc,
  whatsappHref,
  whatsappLabel = '💬 WhatsApp Sekarang',
}: {
  title: ReactNode;
  desc: string;
  whatsappHref: string;
  whatsappLabel?: string;
}) {
  return (
    <div className={shared.cta}>
      <Reveal as="h2" className={shared.ctaTitle}>{title}</Reveal>
      <Reveal as="p" delay={1} className={shared.ctaDesc}>{desc}</Reveal>
      <Reveal as="div" delay={2} className={shared.ctaBtns}>
        <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className={shared.btnP}>
          <span>{whatsappLabel}</span>
        </a>
        <Link href="/kontak.html" className={shared.btnO}>Form Pertanyaan →</Link>
      </Reveal>
    </div>
  );
}
