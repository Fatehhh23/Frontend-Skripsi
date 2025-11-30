import React from 'react';
import { Activity, Layers } from 'lucide-react';
import { SimulationParams } from '@/types/simulation';

interface ParameterInputsProps {
  params: SimulationParams;
  onChange: (name: string, value: number) => void;
  disabled?: boolean;
}

const ParameterInputs: React.FC<ParameterInputsProps> = ({ params, onChange, disabled }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
      {/* Input Magnitudo */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-slate-700">
          Magnitudo (M)
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Activity className="h-5 w-5 text-slate-400" />
          </div>
          <input
            type="number"
            step="0.1"
            min="4.0"
            max="10.0"
            value={params.magnitude || ''}
            onChange={(e) => onChange('magnitude', parseFloat(e.target.value))}
            className="block w-full pl-10 pr-12 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all disabled:bg-slate-100 disabled:text-slate-500"
            placeholder="Contoh: 7.5"
            disabled={disabled}
          />
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <span className="text-slate-500 text-sm font-medium">SR</span>
          </div>
        </div>
        <p className="text-xs text-slate-500">Rentang valid: 4.0 - 10.0 SR</p>
      </div>

      {/* Input Kedalaman */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-slate-700">
          Kedalaman (d)
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Layers className="h-5 w-5 text-slate-400" />
          </div>
          <input
            type="number"
            step="1"
            min="0"
            max="700"
            value={params.depth || ''}
            onChange={(e) => onChange('depth', parseFloat(e.target.value))}
            className="block w-full pl-10 pr-12 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all disabled:bg-slate-100 disabled:text-slate-500"
            placeholder="Contoh: 20"
            disabled={disabled}
          />
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <span className="text-slate-500 text-sm font-medium">km</span>
          </div>
        </div>
        <p className="text-xs text-slate-500">Rentang valid: 0 - 700 km</p>
      </div>
    </div>
  );
};

export default ParameterInputs;