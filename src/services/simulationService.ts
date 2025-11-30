// services/simulationService.ts
// Service untuk komunikasi dengan backend model CNN

import { SimulationParams, SimulationResult } from '../types';
import { MODEL_CONFIG } from '../constants/tsunamiConfig';

class SimulationService {
  private baseURL: string;

  constructor() {
    // Ganti dengan URL backend FastAPI Anda
    this.baseURL = import.meta.env.VITE_API_URL || 'http://localhost:8000';
  }

  /**
   * Menjalankan simulasi tsunami manual
   * Mengirim parameter gempa ke model CNN untuk prediksi
   */
  async runSimulation(params: SimulationParams): Promise<SimulationResult> {
    try {
      const response = await fetch(`${this.baseURL}${MODEL_CONFIG.endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          magnitude: params.magnitude,
          depth: params.depth,
          latitude: params.latitude,
          longitude: params.longitude
        }),
        signal: AbortSignal.timeout(MODEL_CONFIG.timeout)
      });

      if (!response.ok) {
        throw new Error(`Simulation failed: ${response.statusText}`);
      }

      const data = await response.json();
      
      // Transformasi hasil dari backend ke format frontend
      return this.transformBackendResult(data);
    } catch (error) {
      console.error('Simulation error:', error);
      
      // Fallback ke mock data jika backend belum tersedia
      return this.generateMockResult(params);
    }
  }

  /**
   * Mengambil data gempa real-time dan hasil prediksi otomatis
   */
  async getRealTimeData(): Promise<any> {
    try {
      const response = await fetch(`${this.baseURL}${MODEL_CONFIG.realTimeEndpoint}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (!response.ok) {
        throw new Error(`Real-time fetch failed: ${response.statusText}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Real-time data error:', error);
      
      // Fallback ke mock data
      return this.generateMockRealTimeData();
    }
  }

  /**
   * Transformasi hasil dari format backend ke frontend
   */
  private transformBackendResult(backendData: any): SimulationResult {
    // Sesuaikan dengan format response backend Anda
    return {
      riskLevel: this.mapRiskLevel(backendData.risk_score),
      eta: backendData.eta_minutes || 0,
      maxWaveHeight: backendData.max_wave_height || 0,
      impactArea: backendData.impact_area_km2 || 0,
      waveTrend: backendData.wave_trend?.map((point: any) => ({
        time: point.time_offset,
        height: point.wave_height
      })) || []
    };
  }

  /**
   * Mapping skor risiko ke level peringatan
   */
  private mapRiskLevel(score: number): 'Rendah' | 'Sedang' | 'Tinggi' | 'Bahaya' {
    if (score >= 0.8) return 'Bahaya';
    if (score >= 0.6) return 'Tinggi';
    if (score >= 0.4) return 'Sedang';
    return 'Rendah';
  }

  /**
   * Generate mock data untuk development (hapus saat production)
   */
  private generateMockResult(params: SimulationParams): SimulationResult {
    const severity = params.magnitude > 7.0 && params.depth < 30 ? 'high' : 
                    params.magnitude > 6.5 ? 'medium' : 'low';
    
    return {
      riskLevel: severity === 'high' ? 'Bahaya' : severity === 'medium' ? 'Sedang' : 'Rendah',
      eta: severity === 'high' ? Math.floor(Math.random() * 20) + 10 : Math.floor(Math.random() * 40) + 20,
      maxWaveHeight: severity === 'high' ? (Math.random() * 5 + 3) : (Math.random() * 2 + 0.5),
      impactArea: severity === 'high' ? Math.floor(Math.random() * 100) + 100 : Math.floor(Math.random() * 50) + 20,
      waveTrend: Array.from({ length: 12 }, (_, i) => ({
        time: `T+${i * 5}m`,
        height: severity === 'high' 
          ? Math.sin(i * 0.5) * 3 + Math.random() * 1.5 + 2
          : Math.sin(i * 0.5) * 0.8 + Math.random() * 0.3 + 0.2
      }))
    };
  }

  /**
   * Generate mock real-time data
   */
  private generateMockRealTimeData() {
    const now = new Date();
    return {
      timestamp: now.toISOString(),
      location: "Selat Sunda (48km SW dari Sumur, Banten)",
      params: {
        magnitude: 5.4,
        depth: 15,
        latitude: -6.52,
        longitude: 105.18
      },
      result: {
        riskLevel: 'Rendah',
        eta: 0,
        maxWaveHeight: 0.6,
        impactArea: 12,
        waveTrend: Array.from({ length: 8 }, (_, i) => ({
          time: `T+${i * 5}m`,
          height: Math.sin(i) * 0.5 + 0.3
        }))
      }
    };
  }

  /**
   * Validasi parameter input
   */
  validateParams(params: SimulationParams): { valid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (params.magnitude < 4.0 || params.magnitude > 10.0) {
      errors.push('Magnitudo harus antara 4.0 - 10.0');
    }

    if (params.depth < 0 || params.depth > 700) {
      errors.push('Kedalaman harus antara 0 - 700 km');
    }

    if (params.latitude < -7.0 || params.latitude > -5.0) {
      errors.push('Lintang harus dalam area Selat Sunda (-7.0 hingga -5.0)');
    }

    if (params.longitude < 104.5 || params.longitude > 106.5) {
      errors.push('Bujur harus dalam area Selat Sunda (104.5 hingga 106.5)');
    }

    return {
      valid: errors.length === 0,
      errors
    };
  }
}

export const simulationService = new SimulationService();