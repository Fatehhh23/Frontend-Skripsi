// src/constants/tsunamiConfig.ts

// Batas Geografis Wilayah Studi (Selat Sunda)
export const SUNDA_STRAIT_BOUNDS = {
  center: {
    latitude: -6.1,
    longitude: 105.4
  },
  // Batas kotak (Bounding Box) untuk validasi input koordinat
  bounds: {
    north: -5.0, // Lampung Utara (sekitar)
    south: -7.5, // Ujung Kulon / Laut Jawa
    west: 104.0, // Arah Samudra Hindia
    east: 106.5  // Arah Jakarta
  }
};

// Ambang Batas Risiko Tsunami (Scientific Thresholds)
// Digunakan untuk menentukan logika warna dan peringatan
export const TSUNAMI_RISK_THRESHOLDS = {
  magnitude: {
    low: 5.5,      // < 5.5: Kecil kemungkinan tsunami
    medium: 6.5,   // 6.5: Potensi tsunami lokal
    high: 7.0,     // 7.0: Potensi tsunami merusak
    critical: 7.5  // > 7.5: Potensi tsunami besar (Megathrust)
  },
  depth: {
    shallow: 30,  // < 30km: Gempa Dangkal (Sangat Berbahaya)
    medium: 70,   // 30-70km: Gempa Menengah
    deep: 100     // > 100km: Gempa Dalam (Risiko tsunami kecil)
  },
  waveHeight: {
    safe: 0.5,      // < 0.5m: Aman/Waspada kecil
    warning: 1.0,   // 0.5 - 1.0m: Waspada (Jauhi pantai)
    alert: 3.0,     // 1.0 - 3.0m: Siaga (Evakuasi)
    danger: 3.0     // > 3.0m: Awas (Evakuasi Menyeluruh)
  }
};

// Zona Risiko Utama di Selat Sunda (Data Statis untuk Visualisasi Awal)
// Koordinat ini membentuk poligon area pantai yang rentan
export const RISK_ZONES = [
  {
    id: 'zone_anyer_carita',
    name: 'Pesisir Banten (Anyer - Carita)',
    description: 'Kawasan wisata padat penduduk dengan topografi landai.',
    baseRisk: 'high',
    coordinates: [
      [105.8, -6.0],
      [105.9, -6.0],
      [105.9, -6.2],
      [105.8, -6.2]
    ],
  },
  {
    id: 'zone_lampung_selatan',
    name: 'Pesisir Lampung Selatan (Kalianda)',
    description: 'Wilayah pesisir yang berhadapan langsung dengan Anak Krakatau.',
    baseRisk: 'high',
    coordinates: [
      [105.5, -5.6],
      [105.7, -5.6],
      [105.7, -5.9],
      [105.5, -5.9]
    ],
  },
  {
    id: 'zone_krakatau',
    name: 'Kompleks G. Anak Krakatau',
    description: 'Pusat aktivitas vulkanik, zona bahaya utama longsoran bawah laut.',
    baseRisk: 'critical',
    coordinates: [
      [105.35, -6.05],
      [105.48, -6.05],
      [105.48, -6.18],
      [105.35, -6.18]
    ],
  }
];

// Konfigurasi Teknis Model AI & Polling
export const MODEL_CONFIG = {
  endpoint: '/api/v1/simulate',
  realTimeEndpoint: '/api/v1/realtime',
  timeout: 30000, // Timeout request 30 detik
  retryAttempts: 3 // Coba ulang 3x jika gagal
};

// Interval Update Otomatis (dalam milidetik)
export const UPDATE_INTERVALS = {
  realTime: 60000,      // Cek status tiap 1 menit
  earthquakeAPI: 300000 // Tarik data gempa eksternal tiap 5 menit
};