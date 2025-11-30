// src/utils/riskCalculator.ts

import { RiskLevel } from '../types/simulation';
import { TSUNAMI_RISK_THRESHOLDS } from '../constants/tsunamiConfig';

interface RiskAnalysis {
  level: RiskLevel;
  score: number; // 0.0 - 1.0
  description: string;
}

/**
 * Menghitung tingkat risiko tsunami berdasarkan Magnitudo dan Kedalaman
 */
export const calculateRiskLevel = (magnitude: number, depth: number): RiskAnalysis => {
  const { magnitude: magThreshold, depth: depthThreshold } = TSUNAMI_RISK_THRESHOLDS;

  // 1. Cek Kedalaman (Gempa dalam jarang memicu tsunami besar)
  if (depth > depthThreshold.deep) {
    return { 
      level: 'Rendah', 
      score: 0.1, 
      description: 'Gempa dalam, potensi tsunami sangat kecil.' 
    };
  }

  // 2. Logika Utama (Matrix Magnitudo vs Kedalaman)
  if (magnitude >= magThreshold.critical) {
    if (depth <= depthThreshold.shallow) {
      return { 
        level: 'Bahaya', 
        score: 0.95, 
        description: 'Gempa besar & dangkal! Potensi tsunami destruktif.' 
      };
    }
    return { 
      level: 'Tinggi', 
      score: 0.75, 
      description: 'Gempa besar namun kedalaman menengah.' 
    };
  }

  if (magnitude >= magThreshold.high) {
    if (depth <= depthThreshold.shallow) {
      return { 
        level: 'Tinggi', 
        score: 0.70, 
        description: 'Potensi tsunami lokal signifikan.' 
      };
    }
    return { 
      level: 'Sedang', 
      score: 0.50, 
      description: 'Waspada potensi perubahan muka air laut.' 
    };
  }

  if (magnitude >= magThreshold.medium && depth <= depthThreshold.shallow) {
    return { 
      level: 'Sedang', 
      score: 0.45, 
      description: 'Potensi tsunami kecil atau gelombang pasang.' 
    };
  }

  // Default
  return { 
    level: 'Rendah', 
    score: 0.2, 
    description: 'Gempa terasa, namun potensi tsunami minim.' 
  };
};