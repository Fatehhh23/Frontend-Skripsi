// src/types/simulation.ts
// Types untuk simulasi tsunami

export interface SimulationParams {
  magnitude: number;
  depth: number;
  latitude: number;
  longitude: number;
}

export interface SimulationResult {
  riskLevel: RiskLevel;
  eta: number; // Estimated Time of Arrival (minutes)
  maxWaveHeight: number; // meters
  impactArea: number; // km²
  waveTrend: WaveTrendPoint[];
  confidenceScore?: number;
  affectedRegions?: string[];
}

export type RiskLevel = 'Rendah' | 'Sedang' | 'Tinggi' | 'Bahaya';

export interface WaveTrendPoint {
  time: string;
  height: number;
  location?: string;
}

export interface ValidationResult {
  valid: boolean;
  errors: string[];
}

export interface SimulationHistory {
  id: string;
  timestamp: string;
  params: SimulationParams;
  result: SimulationResult;
  userId?: string;
}

export interface RealTimeData {
  timestamp: string;
  location: string;
  params: SimulationParams;
  result: SimulationResult;
  source: 'BMKG' | 'USGS' | 'Manual';
}

export interface EarthquakeData {
  id: string;
  magnitude: number;
  depth: number;
  latitude: number;
  longitude: number;
  time: string;
  location: string;
  source: string;
  isTsunamigenic?: boolean;
}