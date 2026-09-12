import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';

import Cursor from './components/chrome/Cursor';
import Guides from './components/chrome/Guides';

export default function App() {
  return (
    <>
      <Guides />
      <Cursor />
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="*" element={<Home />} />
      </Routes>
    </>
  );
}
