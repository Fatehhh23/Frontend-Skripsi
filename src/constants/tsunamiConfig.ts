// constants/tsunamiConfig.ts
// Konfigurasi konstanta sesuai penelitian di Selat Sunda

export const SUNDA_STRAIT_BOUNDS = {
  center: {
    latitude: -6.1,
    longitude: 105.4
  },
  zoom: {
    default: 9,
    detail: 11,
    overview: 7
  }
};

// Ambang batas risiko tsunami berdasarkan penelitian
export const TSUNAMI_RISK_THRESHOLDS = {
  magnitude: {
    low: 5.5,
    medium: 6.5,
    high: 7.0,
    critical: 7.5
  },
  depth: {
    shallow: 30,  // < 30km = dangkal
    medium: 70,   // 30-70km = sedang
    deep: 100     // > 100km = dalam
  },
  waveHeight: {
    safe: 0.5,      // < 0.5m = aman
    warning: 1.0,   // 0.5-1m = waspada
    alert: 2.0,     // 1-2m = siaga
    danger: 3.0     // > 3m = bahaya
  }
};

// Zona risiko Selat Sunda (berdasarkan penelitian)
export const RISK_ZONES = [
  {
    id: 'zone_1',
    name: 'Pesisir Banten (Pantai Anyer - Carita)',
    coordinates: [
      [105.8, -6.0],
      [105.9, -6.0],
      [105.9, -6.2],
      [105.8, -6.2]
    ],
    baseRisk: 'high'
  },
  {
    id: 'zone_2',
    name: 'Pesisir Lampung Selatan',
    coordinates: [
      [105.3, -5.7],
      [105.5, -5.7],
      [105.5, -5.9],
      [105.3, -5.9]
    ],
    baseRisk: 'high'
  },
  {
    id: 'zone_3',
    name: 'Krakatau dan sekitarnya',
    coordinates: [
      [105.4, -6.1],
      [105.5, -6.1],
      [105.5, -6.2],
      [105.4, -6.2]
    ],
    baseRisk: 'critical'
  }
];

// Parameter model CNN (sesuai skripsi)
export const MODEL_CONFIG = {
  endpoint: '/api/v1/simulate',
  realTimeEndpoint: '/api/v1/realtime',
  timeout: 30000, // 30 detik
  retryAttempts: 3
};

// Interval pembaruan data real-time
export const UPDATE_INTERVALS = {
  realTime: 60000,      // 1 menit
  earthquakeAPI: 300000 // 5 menit
};

// Status peringatan
export const WARNING_LEVELS = {
  NORMAL: {
    label: 'Normal',
    color: '#10b981',
    bgColor: '#d1fae5',
    description: 'Tidak ada ancaman tsunami'
  },
  WASPADA: {
    label: 'Waspada',
    color: '#f59e0b',
    bgColor: '#fef3c7',
    description: 'Potensi tsunami rendah, tetap waspada'
  },
  SIAGA: {
    label: 'Siaga',
    color: '#f97316',
    bgColor: '#ffedd5',
    description: 'Potensi tsunami sedang, siapkan evakuasi'
  },
  AWAS: {
    label: 'Awas',
    color: '#dc2626',
    bgColor: '#fee2e2',
    description: 'Bahaya tsunami tinggi, evakuasi segera!'
  }
};

// Sumber data eksternal
export const EXTERNAL_APIS = {
  BMKG: 'https://data.bmkg.go.id/DataMKG/TEWS/',
  USGS: 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson'
};