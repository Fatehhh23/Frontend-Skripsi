// src/services/simulationService.ts
import { api } from './api';
import { API_ENDPOINTS } from '../constants/apiEndpoints';
import { SimulationParams, SimulationResult } from '../types';

class SimulationService {
  /**
   * Mengirim parameter simulasi manual ke Backend AI
   * @param params Parameter input user (magnitudo, kedalaman, koordinat)
   */
  async runSimulation(params: SimulationParams): Promise<SimulationResult> {
    try {
      // Uncomment baris ini jika Backend sudah siap
      // const data = await api.post<SimulationResult>(API_ENDPOINTS.SIMULATE, params);
      // return data;

      // --- MOCK DATA (Untuk Development/Testing tanpa Backend) ---
      // Mensimulasikan delay jaringan
      await new Promise(resolve => setTimeout(resolve, 1500));

      console.log("[SimulationService] Running mock simulation with:", params);

      // Logika Mock sederhana: 
      // Jika Magnitudo > 7.0 dan Kedalaman < 50km -> BAHAYA
      const isCritical = params.magnitude >= 7.5 && params.depth <= 30;
      const isHigh = params.magnitude >= 7.0;
      const isMedium = params.magnitude >= 6.0;

      const mockResult: SimulationResult = {
        riskLevel: isCritical ? 'Bahaya' : isHigh ? 'Tinggi' : isMedium ? 'Sedang' : 'Rendah',
        eta: isCritical ? 15 : isHigh ? 25 : 45, // menit
        maxWaveHeight: isCritical ? 5.2 : isHigh ? 2.5 : 0.5, // meter
        impactArea: isCritical ? 150.5 : 20.0, // km²
        confidenceScore: 0.95,
        waveTrend: Array.from({ length: 10 }, (_, i) => ({
          time: `T+${i * 5}`,
          height: isCritical 
            ? Math.sin(i * 0.5) * 5 + Math.random() // Gelombang tinggi
            : Math.sin(i * 0.5) * 1 + Math.random() * 0.2 // Gelombang rendah
        }))
      };

      return mockResult;
      // --- END MOCK DATA ---

    } catch (error) {
      console.error("[SimulationService] Error:", error);
      throw error;
    }
  }

  /**
   * Mengambil data Real-Time terakhir dari sistem
   * (Digunakan untuk polling di Dashboard)
   */
  async getRealTimeData() {
    try {
      // return await api.get(API_ENDPOINTS.REALTIME);
      
      // Mock Real-time Data
      return {
        timestamp: new Date().toISOString(),
        status: "Normal",
        activeAlerts: 0
      };
    } catch (error) {
      console.error("[SimulationService] Realtime Fetch Error:", error);
      return null;
    }
  }
}

export const simulationService = new SimulationService();