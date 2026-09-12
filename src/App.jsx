import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import FeatureLayout from './pages/FeatureLayout';
import BillsPage from './pages/BillsPage';
import BillDetailPage from './pages/BillDetailPage';
import BillTextPage from './pages/BillTextPage';
import ProposeBillPage from './pages/ProposeBillPage';

import Cursor from './components/chrome/Cursor';
import Guides from './components/chrome/Guides';

export default function App() {
  return (
    <>
      <Guides />
      <Cursor />
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/bill/:id/text" element={<BillTextPage />} />
      <Route element={<FeatureLayout />}>
        <Route path="/bills" element={<BillsPage />} />
        <Route path="/bills/new" element={<ProposeBillPage />} />
        <Route path="/bill/:id" element={<BillDetailPage />} />
      </Route>
      <Route path="*" element={<Home />} />
      </Routes>
    </>
  );
}
