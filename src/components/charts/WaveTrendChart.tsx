// components/charts/WaveTrendChart.tsx
// Komponen chart untuk visualisasi tren gelombang tsunami

import React from 'react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend 
} from 'recharts';
import { Activity } from 'lucide-react';

interface WaveTrendChartProps {
  data: Array<{ time: string; height: number }>;
  riskLevel?: 'Rendah' | 'Sedang' | 'Tinggi' | 'Bahaya';
  title?: string;
}

const WaveTrendChart: React.FC<WaveTrendChartProps> = ({ 
  data, 
  riskLevel = 'Rendah',
  title = 'Grafik Tren Tinggi Gelombang Tsunami' 
}) => {
  // Tentukan warna berdasarkan risk level
  const getChartColors = () => {
    switch (riskLevel) {
      case 'Bahaya':
        return {
          stroke: '#dc2626',
          fill: '#fca5a5',
          gradient1: '#dc2626',
          gradient2: '#fecaca'
        };
      case 'Tinggi':
        return {
          stroke: '#f97316',
          fill: '#fed7aa',
          gradient1: '#f97316',
          gradient2: '#ffedd5'
        };
      case 'Sedang':
        return {
          stroke: '#eab308',
          fill: '#fde68a',
          gradient1: '#eab308',
          gradient2: '#fef3c7'
        };
      default:
        return {
          stroke: '#22c55e',
          fill: '#bbf7d0',
          gradient1: '#22c55e',
          gradient2: '#dcfce7'
        };
    }
  };

  const colors = getChartColors();

  // Custom tooltip
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white px-4 py-3 rounded-lg shadow-lg border border-slate-200">
          <p className="text-sm font-medium text-slate-700">{payload[0].payload.time}</p>
          <p className="text-lg font-bold text-slate-900">
            {payload[0].value.toFixed(2)} meter
          </p>
        </div>
      );
    }
    return null;
  };

  // Jika tidak ada data
  if (!data || data.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <h3 className="text-lg font-semibold text-slate-800 mb-4">{title}</h3>
        <div className="h-64 flex flex-col items-center justify-center text-slate-400 border-2 border-dashed border-slate-200 rounded-lg">
          <Activity className="h-10 w-10 mb-2" />
          <p className="text-sm">Data grafik akan muncul setelah simulasi dijalankan</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-slate-800">{title}</h3>
          <p className="text-sm text-slate-500 mt-1">
            Prediksi tinggi gelombang dari waktu ke waktu (T+0 = saat gempa terjadi)
          </p>
        </div>
        <div className={`px-3 py-1 rounded-full text-xs font-semibold ${
          riskLevel === 'Bahaya' ? 'bg-red-100 text-red-700' :
          riskLevel === 'Tinggi' ? 'bg-orange-100 text-orange-700' :
          riskLevel === 'Sedang' ? 'bg-yellow-100 text-yellow-700' :
          'bg-green-100 text-green-700'
        }`}>
          {riskLevel}
        </div>
      </div>

      <div className="h-80 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart 
            data={data}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorHeight" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={colors.gradient1} stopOpacity={0.3}/>
                <stop offset="95%" stopColor={colors.gradient2} stopOpacity={0.1}/>
              </linearGradient>
            </defs>
            
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            
            <XAxis 
              dataKey="time" 
              stroke="#64748b" 
              fontSize={12}
              tick={{ fill: '#64748b' }}
            />
            
            <YAxis 
              stroke="#64748b" 
              fontSize={12}
              tick={{ fill: '#64748b' }}
              label={{ 
                value: 'Tinggi Gelombang (m)', 
                angle: -90, 
                position: 'insideLeft',
                style: { fill: '#64748b', fontSize: 12 }
              }}
            />
            
            <Tooltip content={<CustomTooltip />} />
            
            <Legend 
              verticalAlign="top"
              height={36}
              formatter={() => 'Tinggi Gelombang'}
            />
            
            <Area
              type="monotone"
              dataKey="height"
              stroke={colors.stroke}
              strokeWidth={2}
              fill="url(#colorHeight)"
              animationDuration={1000}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Info tambahan */}
      <div className="mt-4 pt-4 border-t border-slate-100">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div>
            <p className="text-slate-500">Tinggi Maks</p>
            <p className="font-bold text-slate-900">
              {Math.max(...data.map(d => d.height)).toFixed(2)} m
            </p>
          </div>
          <div>
            <p className="text-slate-500">Tinggi Min</p>
            <p className="font-bold text-slate-900">
              {Math.min(...data.map(d => d.height)).toFixed(2)} m
            </p>
          </div>
          <div>
            <p className="text-slate-500">Rata-rata</p>
            <p className="font-bold text-slate-900">
              {(data.reduce((sum, d) => sum + d.height, 0) / data.length).toFixed(2)} m
            </p>
          </div>
          <div>
            <p className="text-slate-500">Durasi Data</p>
            <p className="font-bold text-slate-900">
              {data[data.length - 1]?.time || 'N/A'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WaveTrendChart;