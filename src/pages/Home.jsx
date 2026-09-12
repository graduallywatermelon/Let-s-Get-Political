import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../components/header/Header';
import Hero from '../components/hero/Hero';
import SeparatorQuote from '../components/quote/SeparatorQuote';
import ChamberSection from '../components/chamber/ChamberSection';
import ChamberCanvas from '../components/chamber/ChamberCanvas';
import DraftBench from '../components/draft/DraftBench';
import ArenaSection from '../components/arena/ArenaSection';
import OrderPaper from '../components/orderpaper/OrderPaper';
import LedgerSection from '../components/ledger/LedgerSection';
import RoadmapSection from '../components/roadmap/RoadmapSection';
import FinalCTA from '../components/final/FinalCTA';
import GavelCanvas from '../components/final/GavelCanvas';
import Footer from '../components/footer/Footer';
import { useReveal } from '../hooks/useReveal';

export default function Home() {
  const location = useLocation();
  useReveal();
  useEffect(() => {
    const h = location.state && location.state.hash;
    if (!h) return;
    const t = setTimeout(() => document.querySelector(h)?.scrollIntoView({ behavior: 'smooth' }), 80);
    return () => clearTimeout(t);
  }, [location.state]);
  return (
    <>
      <ChamberCanvas />
      <GavelCanvas />
      <Header />
      <main id="top">
        <Hero />
        <SeparatorQuote />
        <ChamberSection />
        <DraftBench />
        <ArenaSection />
        <OrderPaper />
        <LedgerSection />
        <RoadmapSection />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
