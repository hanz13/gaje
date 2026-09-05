// Defensive guard to ensure window.fetch can be modified without throwing on getter-only Window properties
try {
  let _f = window.fetch;
  if (typeof _f === 'function') {
    try {
      Object.defineProperty(window, 'fetch', {
        get() { return _f; },
        set(fn) { _f = fn; },
        configurable: true,
        enumerable: true,
      });
    } catch {
      // ignore
    }
  }
} catch {
  // ignore
}

import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
