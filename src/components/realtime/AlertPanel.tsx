import React from 'react';
import { AlertTriangle, Megaphone, CheckCircle2 } from 'lucide-react';
import { RiskLevel } from '@/types/simulation';

interface AlertPanelProps {
  riskLevel?: RiskLevel;
  eta?: number; // Estimasi waktu tiba dalam menit
}

const AlertPanel: React.FC<AlertPanelProps> = ({ riskLevel = 'Rendah', eta = 0 }) => {
  
  // Konfigurasi tampilan berdasarkan level risiko
  const getConfig = () => {
    switch (riskLevel) {
      case 'Bahaya':
        return {
          bg: 'bg-red-600',
          border: 'border-red-700',
          icon: AlertTriangle,
          title: 'PERINGATAN DINI TSUNAMI',
          message: 'Potensi tsunami terdeteksi! Segera jauhi pantai dan cari tempat tinggi.',
          animate: true
        };
      case 'Tinggi':
      case 'Siaga':
        return {
          bg: 'bg-orange-500',
          border: 'border-orange-600',
          icon: Megaphone,
          title: 'WASPADA TSUNAMI',
          message: 'Harap waspada terhadap perubahan muka air laut dan ikuti arahan petugas.',
          animate: true
        };
      case 'Sedang':
        return {
          bg: 'bg-yellow-500',
          border: 'border-yellow-600',
          icon: AlertTriangle,
          title: 'INFORMASI GEMPA',
          message: 'Gempa dirasakan cukup kuat. Waspada gempa susulan.',
          animate: false
        };
      default:
        return {
          bg: 'bg-green-600',
          border: 'border-green-700',
          icon: CheckCircle2,
          title: 'KONDISI NORMAL',
          message: 'Tidak ada ancaman tsunami saat ini.',
          animate: false
        };
    }
  };

  const config = getConfig();
  const Icon = config.icon;

  return (
    <div className={`${config.bg} rounded-2xl shadow-lg border-2 ${config.border} p-6 text-white relative overflow-hidden transition-all duration-500`}>
      {/* Background Pattern */}
      <div className="absolute top-0 right-0 -mr-8 -mt-8 opacity-20">
        <Icon className="w-40 h-40" />
      </div>

      <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center gap-4">
        <div className={`p-3 bg-white/20 backdrop-blur-sm rounded-full ${config.animate ? 'animate-bounce' : ''}`}>
          <Icon className="w-8 h-8 text-white" />
        </div>
        
        <div className="flex-1">
          <h2 className="text-xl font-black tracking-wide uppercase mb-1">
            {config.title}
          </h2>
          <p className="text-white/90 text-sm leading-relaxed font-medium">
            {config.message}
          </p>
        </div>

        {/* Jika ada ETA dan Bahaya, tampilkan timer mundur visual */}
        {(riskLevel === 'Bahaya' || riskLevel === 'Tinggi') && eta > 0 && (
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 border border-white/20 text-center min-w-[100px]">
            <p className="text-xs uppercase text-white/70 mb-1">Estimasi Tiba</p>
            <p className="text-2xl font-bold font-mono">{eta}<span className="text-sm ml-1">mnt</span></p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AlertPanel;