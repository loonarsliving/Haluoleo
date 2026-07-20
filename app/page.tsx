import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import Hero from '@/components/home/Hero';
import Ticker from '@/components/home/Ticker';
import Company from '@/components/home/Company';
import Projects from '@/components/home/Projects';
import Marquee from '@/components/home/Marquee';
import Portfolio from '@/components/home/Portfolio';
import Founder from '@/components/home/Founder';

export default function Home() {
  return (
    <>
      <Nav />
      <Hero />
      <Ticker />
      <Company />
      <Projects />
      <Marquee />
      <Portfolio />
      <Founder />
      <Footer />
      <WhatsAppButton />
    </>
  );
}
