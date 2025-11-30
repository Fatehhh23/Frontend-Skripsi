import React from 'react';
import { SimulationResult } from '@/types/simulation';
import WaveTrendChart from '@/components/charts/WaveTrendChart';
import RiskGauge from '@/components/charts/RiskGauge';
import StatisticsCards from '@/components/charts/StatisticsCards';
import TimelineChart from '@/components/charts/TimelineChart';
import ArcGISMap from '@/components/map/ArcGISMap';
import { Coordinate } from '@/types/map';

interface ResultsPanelProps {
  result: SimulationResult;
  epicenter: Coordinate;
}

const ResultsPanel: React.FC<ResultsPanelProps> = ({ result, epicenter }) => {
  return (
    <div className="space-y-6 animate-fade-in pb-10">
      
      {/* 1. Header Ringkasan Statistik */}
      <StatisticsCards data={result} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 2. Peta Visualisasi Hasil (Kiri - Lebar) */}
        <div className="lg:col-span-2 h-[500px] rounded-2xl overflow-hidden shadow-lg border border-slate-200 bg-white">
          <div className="absolute z-10 top-4 left-4 bg-white/90 backdrop-blur px-4 py-2 rounded-lg shadow-sm border border-slate-100">
            <h3 className="font-bold text-slate-800 text-sm">Peta Genangan & Risiko</h3>
          </div>
          <ArcGISMap 
            epicenter={epicenter}
            riskLevel={result.riskLevel}
          />
        </div>

        {/* 3. Panel Kanan (Gauge & Timeline) */}
        <div className="lg:col-span-1 flex flex-col gap-6">
          <div className="flex-1 min-h-[240px]">
            <RiskGauge level={result.riskLevel} />
          </div>
          <div className="flex-1 min-h-[240px]">
            <TimelineChart />
          </div>
        </div>
      </div>

      {/* 4. Grafik Tren Gelombang (Bawah - Lebar Penuh) */}
      <div className="mt-6">
        <WaveTrendChart data={result.waveTrend} />
      </div>
    </div>
  );
};

export default ResultsPanel;