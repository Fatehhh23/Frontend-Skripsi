import React from 'react';
import { AlertTriangle, ShieldCheck, AlertOctagon } from 'lucide-react';

interface RiskGaugeProps {
  level: 'Rendah' | 'Sedang' | 'Tinggi' | 'Bahaya';
  score?: number; // 0 - 100
}

const RiskGauge: React.FC<RiskGaugeProps> = ({ level, score = 0 }) => {
  // Tentukan warna dan ikon berdasarkan level
  const getRiskConfig = () => {
    switch (level) {
      case 'Bahaya':
        return { color: 'text-red-600', bg: 'bg-red-50', bar: 'bg-red-600', icon: AlertOctagon };
      case 'Tinggi':
        return { color: 'text-orange-500', bg: 'bg-orange-50', bar: 'bg-orange-500', icon: AlertTriangle };
      case 'Sedang':
        return { color: 'text-yellow-500', bg: 'bg-yellow-50', bar: 'bg-yellow-500', icon: AlertTriangle };
      default:
        return { color: 'text-green-600', bg: 'bg-green-50', bar: 'bg-green-600', icon: ShieldCheck };
    }
  };

  const config = getRiskConfig();
  const Icon = config.icon;

  // Persentase untuk bar (fallback manual jika score tidak ada)
  const percentage = score || (
    level === 'Bahaya' ? 90 : 
    level === 'Tinggi' ? 70 : 
    level === 'Sedang' ? 45 : 15
  );

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center justify-center text-center h-full">
      <div className={`p-4 rounded-full ${config.bg} mb-4 animate-pulse-soft`}>
        <Icon className={`w-8 h-8 ${config.color}`} />
      </div>
      
      <h3 className="text-slate-500 text-sm font-medium uppercase tracking-wider mb-1">Status Risiko</h3>
      <p className={`text-2xl font-bold ${config.color} mb-6`}>{level}</p>

      {/* Bar Meter Sederhana */}
      <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
        <div 
          className={`h-full ${config.bar} transition-all duration-1000 ease-out`} 
          style={{ width: `${percentage}%` }}
        />
      </div>
      <div className="w-full flex justify-between mt-2 text-xs text-slate-400 font-medium">
        <span>Aman</span>
        <span>Bahaya</span>
      </div>
    </div>
  );
};

export default RiskGauge;