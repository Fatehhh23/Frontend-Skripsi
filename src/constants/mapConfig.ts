// src/constants/mapConfig.ts
// Konfigurasi peta ArcGIS

export const MAP_CONFIG = {
  basemap: 'topo-vector',
  
  initialView: {
    center: [105.4, -6.1], // [longitude, latitude] Selat Sunda
    zoom: 9,
  },
  
  viewSettings: {
    constraints: {
      minZoom: 7,
      maxZoom: 16,
    },
    highlightOptions: {
      color: [0, 255, 255, 0.5],
      haloOpacity: 0.9,
      fillOpacity: 0.3,
    },
  },
  
  markerSymbols: {
    epicenter: {
      type: 'simple-marker',
      size: 12,
      outline: {
        color: [255, 255, 255],
        width: 2,
      },
    },
  },
  
  riskZoneColors: {
    low: [34, 197, 94, 0.3],      // green
    medium: [234, 179, 8, 0.3],   // yellow
    high: [249, 115, 22, 0.3],    // orange
    critical: [220, 38, 38, 0.3], // red
  },
} as const;

export default MAP_CONFIG;