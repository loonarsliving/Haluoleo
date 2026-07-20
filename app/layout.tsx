import type { Metadata } from 'next';
import { Cormorant_Garamond, DM_Sans } from 'next/font/google';
import './globals.css';
import Loader from '@/components/Loader';
import CustomCursor from '@/components/CustomCursor';
import ScrollProgressBar from '@/components/ScrollProgressBar';

const serif = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '600'],
  style: ['normal', 'italic'],
  variable: '--font-serif',
});

const sans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://haluoleo.id'),
  title: 'PT. Maha Karya Haluoleo — Developer Properti Terpercaya Indonesia',
  description:
    'Developer properti terpercaya sejak 2012. Villa eksklusif Yogyakarta, rumah subsidi Bogor, hunian premium Makassar.',
  alternates: { canonical: 'https://haluoleo.id' },
  openGraph: {
    title: 'PT. Maha Karya Haluoleo — Hadir di Mana Impian Dibangun',
    images: ['https://haluoleo.id/hero1.jpeg'],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" className={`${serif.variable} ${sans.variable}`}>
      <body style={{ fontFamily: 'var(--font-sans), sans-serif' }}>
        <Loader />
        <CustomCursor />
        <ScrollProgressBar />
        {children}
      </body>
    </html>
  );
}
