import React from 'react';

const MapLegend: React.FC = () => {
  const items = [
    { label: 'Zona Aman (Rendah)', color: 'bg-green-500' },
    { label: 'Waspada (Sedang)', color: 'bg-yellow-500' },
    { label: 'Siaga (Tinggi)', color: 'bg-orange-500' },
    { label: 'Awas (Bahaya)', color: 'bg-red-600' },
  ];

  return (
    <div className="absolute bottom-6 left-4 bg-white/90 backdrop-blur p-3 rounded-lg shadow-lg border border-slate-200 z-10 text-xs font-medium">
      <h4 className="mb-2 font-bold text-slate-700">Legenda Risiko</h4>
      <div className="space-y-1.5">
        {items.map((item, idx) => (
          <div key={idx} className="flex items-center gap-2">
            <span className={`w-3 h-3 rounded-full ${item.color} shadow-sm`}></span>
            <span className="text-slate-600">{item.label}</span>
          </div>
        ))}
        <div className="flex items-center gap-2 mt-2 pt-2 border-t border-slate-200">
          <span className="w-3 h-3 rounded-full bg-blue-500 border-2 border-white shadow-sm ring-1 ring-blue-200"></span>
          <span className="text-slate-600">Episentrum Gempa</span>
        </div>
      </div>
    </div>
  );
};

export default MapLegend;