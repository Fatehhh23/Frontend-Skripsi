// src/constants/mapConfig.ts

export const MAP_CONFIG = {
  // Jenis peta dasar (Basemap)
  // Opsi lain: 'satellite', 'hybrid', 'gray-vector', 'oceans'
  basemap: 'topo-vector',
  
  // Tampilan Awal (Fokus: Selat Sunda)
  initialView: {
    center: [105.4, -6.1], // [Longitude, Latitude]
    zoom: 9, // Level zoom ideal untuk melihat Selat Sunda
  },
  
  // Pembatasan Zoom (Agar user tidak zoom out terlalu jauh/dekat)
  viewSettings: {
    constraints: {
      minZoom: 7,  // Level Pulau Jawa & Sumatera
      maxZoom: 16, // Level Jalan Raya
    },
    // Konfigurasi Highlight saat memilih fitur
    highlightOptions: {
      color: [0, 255, 255, 0.5], // Cyan transparan
      haloOpacity: 0.9,
      fillOpacity: 0.3,
    },
  },
  
  // Simbol Marker Default
  markerSymbols: {
    epicenter: {
      type: 'simple-marker',
      size: 12,
      outline: {
        color: [255, 255, 255], // Putih
        width: 2,
      },
    },
  },
  
  // Warna Zona Risiko (Format RGBA untuk ArcGIS: [R, G, B, Opacity])
  riskZoneColors: {
    low: [34, 197, 94, 0.3],      // Green
    medium: [234, 179, 8, 0.3],   // Yellow
    high: [249, 115, 22, 0.3],    // Orange
    critical: [220, 38, 38, 0.3], // Red
  },
} as const;

export default MAP_CONFIG;