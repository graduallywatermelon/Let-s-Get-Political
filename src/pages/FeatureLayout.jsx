import '../styles/pages.css';
import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import FeatureBar from '../components/common/FeatureBar';
import Footer from '../components/footer/Footer';
import { useRouteReveal } from '../hooks/useRouteReveal';

export default function FeatureLayout() {
  const location = useLocation();
  useRouteReveal();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [location.pathname]);
  return (
    <>
      <div className="feature">
        <FeatureBar />
        <main id="top">
          <Outlet />
        </main>
      </div>
      <Footer />
    </>
  );
}
