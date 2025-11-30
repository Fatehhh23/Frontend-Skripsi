// src/hooks/useSimulation.ts
import { useState } from 'react';
import { SimulationParams, SimulationResult } from '../types';
import { simulationService } from '../services/simulationService';
import { validateSimulationParams } from '../utils/validators';

export const useSimulation = () => {
  // State untuk menyimpan hasil simulasi, status loading, dan error
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<SimulationResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  /**
   * Fungsi utama untuk menjalankan simulasi manual
   * @param params Parameter input dari pengguna (Magnitudo, Kedalaman, Koordinat)
   */
  const runManualSimulation = async (params: SimulationParams) => {
    // 1. Validasi Input di sisi Client
    const validation = validateSimulationParams(params);
    
    if (!validation.valid) {
      // Tampilkan pesan error pertama jika validasi gagal
      setError(validation.errors[0]);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // 2. Panggil Service untuk request ke Backend (atau Mock Data)
      const data = await simulationService.runSimulation(params);
      setResult(data);
    } catch (err) {
      console.error("Simulation failed:", err);
      setError('Gagal menjalankan simulasi. Periksa koneksi atau coba lagi nanti.');
    } finally {
      setLoading(false);
    }
  };

  /**
   * Reset state simulasi ke kondisi awal
   */
  const resetSimulation = () => {
    setResult(null);
    setError(null);
    setLoading(false);
  };

  return {
    loading,
    result,
    error,
    runManualSimulation,
    resetSimulation
  };
};