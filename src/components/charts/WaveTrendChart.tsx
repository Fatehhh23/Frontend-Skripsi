import React from 'react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer 
} from 'recharts';

interface WaveTrendChartProps {
  data: Array<{ time: string; height: number }>;
}

const WaveTrendChart: React.FC<WaveTrendChartProps> = ({ data }) => {
  if (!data || data.length === 0) return null;

  return (
    <div className="h-64 w-full bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
      <h3 className="text-sm font-bold text-slate-700 mb-4">Tren Ketinggian Gelombang</h3>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorHeight" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="time" style={{ fontSize: '12px' }} />
          <YAxis style={{ fontSize: '12px' }} />
          <Tooltip 
            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
          />
          <Area 
            type="monotone" 
            dataKey="height" 
            stroke="#2563eb" 
            fillOpacity={1} 
            fill="url(#colorHeight)" 
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default WaveTrendChart;