import React, { useState } from 'react';
import { Play, RefreshCw, Trash2 } from 'lucide-react';
import { useSimulation } from '@/hooks/useSimulation';
import { SimulationParams } from '@/types/simulation';
import ParameterInputs from './ParameterInputs';
import CoordinatePicker from './CoordinatePicker';
import ValidationErrors from './ValidationErrors';
import ResultsPanel from './ResultsPanel';
import LoadingSpinner from '@/components/common/LoadingSpinner';

const ManualSimulationForm: React.FC = () => {
  const { 
    loading, 
    result, 
    error, 
    runManualSimulation, 
    resetSimulation 
  } = useSimulation();

  // State lokal untuk form input
  const [params, setParams] = useState<SimulationParams>({
    magnitude: 0,
    depth: 0,
    latitude: 0,
    longitude: 0
  });

  const handleParamChange = (name: string, value: number) => {
    setParams(prev => ({ ...prev, [name]: value }));
  };

  const handleCoordinateChange = (lat: number, lon: number) => {
    setParams(prev => ({ ...prev, latitude: lat, longitude: lon }));
  };

  const handleSubmit = () => {
    runManualSimulation(params);
  };

  const handleReset = () => {
    setParams({ magnitude: 0, depth: 0, latitude: 0, longitude: 0 });
    resetSimulation();
  };

  // Jika Loading, tampilkan spinner layar penuh
  if (loading) {
    return <LoadingSpinner fullScreen text="Menjalankan Model Simulasi..." />;
  }

  // Jika Hasil ada, tampilkan Panel Hasil
  if (result) {
    return (
      <div className="animate-fade-in">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-slate-800">Hasil Simulasi</h2>
          <button 
            onClick={resetSimulation}
            className="flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors font-medium"
          >
            <RefreshCw className="w-4 h-4" />
            Simulasi Baru
          </button>
        </div>
        
        <ResultsPanel 
          result={result} 
          epicenter={{ latitude: params.latitude, longitude: params.longitude }} 
        />
      </div>
    );
  }

  // Tampilan Default: Form Input
  return (
    <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-sm border border-slate-200 p-8 animate-fade-in">
      <div className="mb-8 text-center">
        <h2 className="text-2xl font-bold text-slate-800">Simulasi Manual Tsunami</h2>
        <p className="text-slate-500 mt-2">
          Masukkan parameter gempa bumi untuk memprediksi potensi tsunami di Selat Sunda.
        </p>
      </div>

      {error && <ValidationErrors errors={[error]} />}

      <div className="space-y-8">
        {/* Bagian 1: Parameter Fisik */}
        <section>
          <h3 className="text-lg font-semibold text-slate-800 mb-4 border-b border-slate-100 pb-2">
            1. Parameter Fisik Gempa
          </h3>
          <ParameterInputs params={params} onChange={handleParamChange} />
        </section>

        {/* Bagian 2: Lokasi */}
        <section>
          <h3 className="text-lg font-semibold text-slate-800 mb-4 border-b border-slate-100 pb-2">
            2. Lokasi Episentrum
          </h3>
          <CoordinatePicker params={params} onCoordinateChange={handleCoordinateChange} />
        </section>

        {/* Bagian 3: Tombol Aksi */}
        <div className="flex gap-4 pt-4 border-t border-slate-100">
          <button
            onClick={handleReset}
            className="flex-1 py-3 px-4 bg-white border border-slate-300 text-slate-700 font-semibold rounded-xl hover:bg-slate-50 transition-colors flex items-center justify-center gap-2"
          >
            <Trash2 className="w-5 h-5" />
            Reset
          </button>
          <button
            onClick={handleSubmit}
            className="flex-[2] py-3 px-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 shadow-lg shadow-blue-500/30 transition-all hover:-translate-y-0.5 flex items-center justify-center gap-2"
          >
            <Play className="w-5 h-5 fill-current" />
            Jalankan Simulasi
          </button>
        </div>
      </div>
    </div>
  );
};

export default ManualSimulationForm;