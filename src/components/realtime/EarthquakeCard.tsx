import React from 'react';
import { Activity, MapPin, Layers, Clock } from 'lucide-react';
import { SimulationParams } from '@/types/simulation';

interface EarthquakeCardProps {
  data: {
    params: SimulationParams;
    location: string;
    timestamp: string;
  } | null;
}

const EarthquakeCard: React.FC<EarthquakeCardProps> = ({ data }) => {
  if (!data) {
    return (
      <div className="bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl p-8 text-center h-full flex flex-col items-center justify-center">
        <Activity className="w-10 h-10 text-slate-300 mb-2" />
        <p className="text-slate-400 font-medium">Menunggu data gempa...</p>
      </div>
    );
  }

  // Menentukan warna berdasarkan besaran magnitudo
  const getMagColor = (mag: number) => {
    if (mag >= 7.0) return 'text-red-600 bg-red-50 border-red-100';
    if (mag >= 5.0) return 'text-orange-600 bg-orange-50 border-orange-100';
    return 'text-blue-600 bg-blue-50 border-blue-100';
  };

  const magStyle = getMagColor(data.params.magnitude);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden relative group hover:shadow-md transition-shadow">
      {/* Header */}
      <div className="px-6 py-4 border-b border-slate-50 flex justify-between items-center bg-slate-50/50">
        <h3 className="font-bold text-slate-800 flex items-center gap-2">
          <Activity className="w-4 h-4 text-blue-500" />
          Gempa Terkini
        </h3>
        <span className="text-xs font-mono text-slate-500 bg-white px-2 py-1 rounded border border-slate-100">
          Live Data
        </span>
      </div>

      <div className="p-6">
        <div className="flex flex-col items-center text-center mb-6">
          <span className="text-xs text-slate-400 uppercase tracking-widest font-semibold mb-2">Magnitudo</span>
          <div className={`w-24 h-24 rounded-full flex items-center justify-center border-4 ${magStyle} mb-2 relative`}>
            <span className="text-3xl font-black">{data.params.magnitude.toFixed(1)}</span>
            <div className="absolute inset-0 rounded-full border-4 border-current opacity-20 animate-ping"></div>
          </div>
          <span className="text-xs text-slate-400">Skala Richter (SR)</span>
        </div>

        <div className="space-y-4">
          <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
            <MapPin className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
            <div>
              <p className="text-xs text-slate-400 mb-0.5">Lokasi Episentrum</p>
              <p className="text-sm font-semibold text-slate-800 leading-snug">{data.location}</p>
              <p className="text-xs text-slate-500 font-mono mt-1">
                {data.params.latitude.toFixed(4)}, {data.params.longitude.toFixed(4)}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
              <Layers className="w-5 h-5 text-blue-500 shrink-0" />
              <div>
                <p className="text-xs text-slate-400">Kedalaman</p>
                <p className="text-sm font-bold text-slate-800">{data.params.depth} km</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
              <Clock className="w-5 h-5 text-green-500 shrink-0" />
              <div>
                <p className="text-xs text-slate-400">Waktu</p>
                <p className="text-sm font-bold text-slate-800">
                  {new Date(data.timestamp).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })} WIB
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EarthquakeCard;