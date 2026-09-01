import Cursor from './components/chrome/Cursor';
import Guides from './components/chrome/Guides';
import Header from './components/header/Header';
import Hero from './components/hero/Hero';
import OrderPaper from './components/orderpaper/OrderPaper';

export default function App() {
  return (
    <>
      <Guides />
      <Cursor />
      <Header />
      <main id="top">
        <Hero />
        <OrderPaper />
      </main>
    </>
  );
}
