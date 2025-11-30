// src/hooks/useRealTimeData.ts
import { useState, useEffect, useCallback } from 'react';
import { UPDATE_INTERVALS } from '../constants/tsunamiConfig';
import { simulationService } from '../services/simulationService';

// Tipe data untuk state monitoring real-time
interface RealTimeState {
  isActive: boolean;
  lastUpdated: string | null;
  data: any | null; // Tipe spesifik bisa disesuaikan dengan response API BMKG
}

export const useRealTimeData = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [realTimeState, setRealTimeState] = useState<RealTimeState>({
    isActive: true,
    lastUpdated: null,
    data: null
  });

  /**
   * Fungsi untuk mengambil data terbaru dari sumber (API/Service)
   */
  const fetchLiveData = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Mengambil data dari service (yang nantinya connect ke BMKG/Backend)
      const data = await simulationService.getRealTimeData();
      
      const now = new Date();
      setRealTimeState(prev => ({
        ...prev,
        lastUpdated: now.toLocaleTimeString('id-ID'),
        data: data
      }));
    } catch (err) {
      console.error("Real-time fetch error:", err);
      setError("Gagal mengambil data real-time.");
    } finally {
      setLoading(false);
    }
  }, []);

  // Setup interval polling saat komponen dimount
  useEffect(() => {
    // Fetch pertama kali segera
    fetchLiveData();

    // Setup interval polling sesuai konfigurasi (misal: tiap 60 detik)
    const intervalId = setInterval(fetchLiveData, UPDATE_INTERVALS.realTime);

    // Cleanup interval saat komponen unmount
    return () => clearInterval(intervalId);
  }, [fetchLiveData]);

  // Fungsi manual refresh
  const refreshData = () => {
    fetchLiveData();
  };

  return {
    ...realTimeState,
    loading,
    error,
    refreshData
  };
};