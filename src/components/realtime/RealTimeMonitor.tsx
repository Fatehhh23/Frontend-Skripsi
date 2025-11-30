import React from 'react';
import StatusIndicator from './StatusIndicator';
import EarthquakeCard from './EarthquakeCard';
import AlertPanel from './AlertPanel';
import { useRealTimeData } from '@/hooks/useRealTimeData';
import LoadingSpinner from '../common/LoadingSpinner';

const RealTimeMonitor: React.FC = () => {
  const { data, isActive, lastUpdated, loading, error, refreshData } = useRealTimeData();

  if (loading && !data) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <LoadingSpinner text="Menghubungkan ke jaringan sensor..." />
      </div>
    );
  }

  if (error && !data) {
    return (
      <div className="p-6 text-center text-red-600 bg-red-50 rounded-xl border border-red-200">
        <p className="font-bold">Gagal memuat data monitoring.</p>
        <p className="text-sm mt-2">{error}</p>
        <button onClick={refreshData} className="mt-4 px-4 py-2 bg-red-100 hover:bg-red-200 rounded-lg text-sm font-semibold transition-colors">
          Coba Lagi
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* 1. Status Bar Sistem */}
      <StatusIndicator 
        isOnline={isActive} 
        lastUpdated={lastUpdated} 
        onRefresh={refreshData}
        isLoading={loading}
      />

      {/* 2. Panel Peringatan (Alert) */}
      <AlertPanel 
        riskLevel={data?.result.riskLevel} 
        eta={data?.result.eta} 
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 3. Kartu Data Gempa */}
        <div className="h-full">
          <EarthquakeCard data={data} />
        </div>

        {/* 4. Area Statistik Tambahan (Placeholder/Info) */}
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-6 text-white shadow-lg flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-lg mb-2">Informasi Sistem</h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              Sistem memproses data gempa secara otomatis menggunakan model AI untuk prediksi potensi tsunami di wilayah Selat Sunda.
            </p>
          </div>
          
          <div className="mt-6 pt-6 border-t border-slate-700">
            <div className="flex justify-between items-end">
              <div>
                <p className="text-xs text-slate-400">Sumber Data</p>
                <p className="font-semibold text-blue-400">BMKG & Sensor Lokal</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-slate-400">Mode Operasi</p>
                <p className="font-semibold text-green-400">Otomatis (AI)</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RealTimeMonitor;