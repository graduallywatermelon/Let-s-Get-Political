import Cursor from './components/chrome/Cursor';
import Guides from './components/chrome/Guides';
import Header from './components/header/Header';
import Hero from './components/hero/Hero';
import SeparatorQuote from './components/quote/SeparatorQuote';
import ChamberSection from './components/chamber/ChamberSection';
import ChamberCanvas from './components/chamber/ChamberCanvas';
import DraftBench from './components/draft/DraftBench';
import ArenaSection from './components/arena/ArenaSection';
import OrderPaper from './components/orderpaper/OrderPaper';
import LedgerSection from './components/ledger/LedgerSection';
import RoadmapSection from './components/roadmap/RoadmapSection';
import FinalCTA from './components/final/FinalCTA';
import { useReveal } from './hooks/useReveal';

export default function App() {
  useReveal();
  return (
    <>
      <Guides />
      <Cursor />
      <ChamberCanvas />
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
    </>
  );
}
