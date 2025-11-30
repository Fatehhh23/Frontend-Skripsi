// src/main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// --- IMPORT STYLES (URUTAN SANGAT PENTING) ---

// 1. Tailwind Base & Components (Dibuat di langkah sebelumnya)
import './styles/tailwind.css';

// 2. Global Animations & Overrides
import './styles/globals.css';

// 3. ArcGIS Maps SDK Styles (Wajib untuk Peta)
import '@arcgis/core/assets/esri/themes/light/main.css';

// 4. Custom ArcGIS Overrides (Agar peta terlihat modern/rounded)
import './styles/arcgis-custom.css';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Gagal menemukan elemen root. Pastikan index.html memiliki <div id="root"></div>');
}

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);