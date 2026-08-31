import Cursor from './components/chrome/Cursor';
import Guides from './components/chrome/Guides';
import Header from './components/header/Header';

export default function App() {
  return (
    <>
      <Guides />
      <Cursor />
      <Header />
      <main id="top">
      </main>
    </>
  );
}
