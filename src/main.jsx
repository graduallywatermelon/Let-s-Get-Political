import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './styles/tokens.css';
import './styles/base.css';
import './styles/cursor.css';
import './styles/header.css';
import './styles/hero.css';
import './styles/quote.css';
import './styles/chamber.css';
import './styles/arena.css';
import './styles/roadmap.css';
import './styles/final.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
);
