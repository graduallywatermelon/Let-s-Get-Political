import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import FeatureLayout from './pages/FeatureLayout';
import BillsPage from './pages/BillsPage';

import Cursor from './components/chrome/Cursor';
import Guides from './components/chrome/Guides';

export default function App() {
  return (
    <>
      <Guides />
      <Cursor />
      <Routes>
      <Route path="/" element={<Home />} />
      <Route element={<FeatureLayout />}>
        <Route path="/bills" element={<BillsPage />} />
      </Route>
      <Route path="*" element={<Home />} />
      </Routes>
    </>
  );
}
