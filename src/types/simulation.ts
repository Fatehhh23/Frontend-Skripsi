// src/types/simulation.ts

// Level risiko tsunami (sesuai dengan konstanta warna)
export type RiskLevel = 'Rendah' | 'Sedang' | 'Tinggi' | 'Bahaya';

// Parameter input dari user atau data gempa
export interface SimulationParams {
  magnitude: number; // Skala Richter
  depth: number;     // Kilometer
  latitude: number;  // Derajat desimal
  longitude: number; // Derajat desimal
}

// Struktur titik data untuk grafik tren gelombang
export interface WaveTrendPoint {
  time: string;   // Label waktu (misal: "T+10")
  height: number; // Tinggi air dalam meter
}

// Hasil lengkap simulasi dari Model AI/Backend
export interface SimulationResult {
  riskLevel: RiskLevel;
  eta: number;            // Estimasi waktu tiba (menit)
  maxWaveHeight: number;  // Tinggi gelombang maksimum (meter)
  impactArea: number;     // Luas area terdampak (km²)
  waveTrend: WaveTrendPoint[]; // Array data untuk grafik
  confidenceScore?: number; // Tingkat kepercayaan model (0.0 - 1.0)
  affectedRegions?: string[]; // Nama daerah yang terdampak (opsional)
}

// Struktur history simulasi (jika disimpan)
export interface SimulationHistory {
  id: string;
  timestamp: string;
  params: SimulationParams;
  result: SimulationResult;
}