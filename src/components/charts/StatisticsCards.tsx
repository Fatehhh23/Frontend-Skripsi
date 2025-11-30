import React from 'react';
import { Waves, Clock, Map, TrendingUp } from 'lucide-react';

interface SimulationResult {
  eta: number;
  maxWaveHeight: number;
  impactArea: number;
  confidenceScore?: number;
}

interface StatisticsCardsProps {
  data: SimulationResult | null;
}

const StatisticsCards: React.FC<StatisticsCardsProps> = ({ data }) => {
  if (!data) return null;

  const stats = [
    {
      label: 'Tinggi Maksimum',
      value: `${data.maxWaveHeight.toFixed(2)} m`,
      icon: Waves,
      color: 'text-blue-600',
      bg: 'bg-blue-50',
    },
    {
      label: 'Estimasi Tiba (ETA)',
      value: `${Math.round(data.eta)} menit`,
      icon: Clock,
      color: 'text-orange-600',
      bg: 'bg-orange-50',
    },
    {
      label: 'Luas Dampak',
      value: `${data.impactArea.toFixed(1)} km²`,
      icon: Map,
      color: 'text-purple-600',
      bg: 'bg-purple-50',
    },
    {
      label: 'Akurasi Model',
      value: `${((data.confidenceScore || 0.9) * 100).toFixed(0)}%`,
      icon: TrendingUp,
      color: 'text-green-600',
      bg: 'bg-green-50',
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <div key={index} className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3 mb-2">
            <div className={`p-2 rounded-lg ${stat.bg}`}>
              <stat.icon className={`w-4 h-4 ${stat.color}`} />
            </div>
            <span className="text-xs text-slate-500 font-medium">{stat.label}</span>
          </div>
          <p className="text-xl font-bold text-slate-800 ml-1">{stat.value}</p>
        </div>
      ))}
    </div>
  );
};

export default StatisticsCards;