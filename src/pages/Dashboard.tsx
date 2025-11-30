import React, { useState } from 'react';
import RealTimeMonitor from '@/components/realtime/RealTimeMonitor';
import ManualSimulationForm from '@/components/simulation/ManualSimulationForm';
import { Activity, Play } from 'lucide-react';
import SEO from '@/components/common/SEO';

const Dashboard: React.FC = () => {
  // State untuk mengatur tab aktif (Real-time vs Simulasi Manual)
  const [activeTab, setActiveTab] = useState<'realtime' | 'simulation'>('realtime');

  return (
    <>
      {/* Komponen SEO untuk mengatur judul halaman */}
      <SEO 
        title="Dashboard Mitigasi" 
        description="Pantau risiko tsunami secara real-time atau jalankan simulasi manual." 
      />

      <div className="min-h-screen bg-slate-50 pb-12">
        {/* Header Dashboard & Navigasi Tab */}
        <div className="bg-white border-b border-slate-200 px-6 py-4 sticky top-16 z-30 shadow-sm transition-all">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
            
            {/* Judul Halaman */}
            <h1 className="text-xl font-bold text-slate-800 tracking-tight">
              Dashboard Mitigasi
            </h1>
            
            {/* Switcher Tab Navigasi */}
            <div className="flex p-1 bg-slate-100 rounded-xl shadow-inner">
              <button
                onClick={() => setActiveTab('realtime')}
                className={`px-6 py-2 rounded-lg text-sm font-semibold transition-all duration-300 flex items-center gap-2 ${
                  activeTab === 'realtime' 
                    ? 'bg-white text-blue-600 shadow-sm ring-1 ring-black/5' 
                    : 'text-slate-500 hover:text-slate-700 hover:bg-slate-200/50'
                }`}
              >
                <Activity className="w-4 h-4" />
                Monitoring Real-Time
              </button>
              
              <button
                onClick={() => setActiveTab('simulation')}
                className={`px-6 py-2 rounded-lg text-sm font-semibold transition-all duration-300 flex items-center gap-2 ${
                  activeTab === 'simulation' 
                    ? 'bg-white text-blue-600 shadow-sm ring-1 ring-black/5' 
                    : 'text-slate-500 hover:text-slate-700 hover:bg-slate-200/50'
                }`}
              >
                <Play className="w-4 h-4" />
                Simulasi Manual
              </button>
            </div>
          </div>
        </div>

        {/* Konten Utama */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
          <div className="animate-fade-in">
            {activeTab === 'realtime' ? (
              // Menampilkan komponen Monitoring Real-Time
              <RealTimeMonitor />
            ) : (
              // Menampilkan komponen Simulasi Manual
              <ManualSimulationForm />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;