import React from 'react';
import { Wifi, WifiOff, RefreshCw } from 'lucide-react';

interface StatusIndicatorProps {
  isOnline: boolean;
  lastUpdated: string | null;
  onRefresh?: () => void;
  isLoading?: boolean;
}

const StatusIndicator: React.FC<StatusIndicatorProps> = ({ 
  isOnline, 
  lastUpdated, 
  onRefresh,
  isLoading 
}) => {
  return (
    <div className="flex items-center justify-between bg-white p-3 rounded-xl border border-slate-200 shadow-sm">
      <div className="flex items-center gap-3">
        <div className={`p-2 rounded-full ${isOnline ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
          {isOnline ? <Wifi className="w-4 h-4" /> : <WifiOff className="w-4 h-4" />}
        </div>
        <div>
          <p className="text-xs font-bold text-slate-700 uppercase tracking-wider">
            Sistem Monitor
          </p>
          <p className={`text-sm font-semibold ${isOnline ? 'text-green-600' : 'text-red-600'}`}>
            {isOnline ? 'Terhubung (Online)' : 'Terputus (Offline)'}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3 text-right">
        <div className="hidden sm:block">
          <p className="text-xs text-slate-400">Pembaruan Terakhir</p>
          <p className="text-xs font-mono text-slate-600">
            {lastUpdated || '-'}
          </p>
        </div>
        {onRefresh && (
          <button 
            onClick={onRefresh}
            disabled={isLoading}
            className="p-2 hover:bg-slate-100 rounded-lg transition-colors text-slate-500 disabled:opacity-50"
            title="Muat Ulang Data"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
          </button>
        )}
      </div>
    </div>
  );
};

export default StatusIndicator;