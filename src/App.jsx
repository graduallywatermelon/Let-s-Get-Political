import Cursor from './components/chrome/Cursor';
import Guides from './components/chrome/Guides';
import Header from './components/header/Header';
import Hero from './components/hero/Hero';
import SeparatorQuote from './components/quote/SeparatorQuote';
import ChamberSection from './components/chamber/ChamberSection';
import OrderPaper from './components/orderpaper/OrderPaper';
import { useReveal } from './hooks/useReveal';

export default function App() {
  useReveal();
  return (
    <>
      <Guides />
      <Cursor />
      <Header />
      <main id="top">
        <Hero />
        <SeparatorQuote />
        <ChamberSection />
        <OrderPaper />
      </main>
    </>
  );
}
