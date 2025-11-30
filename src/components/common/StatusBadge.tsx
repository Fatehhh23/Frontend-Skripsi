import React from 'react';
import { RiskLevel } from '@/types/simulation';

interface StatusBadgeProps {
  status: RiskLevel | 'Normal' | 'Online' | 'Offline';
  size?: 'sm' | 'md';
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status, size = 'md' }) => {
  const getStyle = (status: string) => {
    switch (status) {
      case 'Bahaya':
      case 'Offline':
        return 'bg-red-100 text-red-700 border-red-200';
      case 'Tinggi':
        return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'Sedang':
      case 'Waspada':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'Rendah':
      case 'Normal':
      case 'Online':
        return 'bg-green-100 text-green-700 border-green-200';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  const sizeClass = size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-3 py-1 text-sm';

  return (
    <span className={`inline-flex items-center justify-center font-semibold rounded-full border ${getStyle(status)} ${sizeClass}`}>
      <span className={`w-2 h-2 rounded-full mr-2 ${status === 'Online' || status === 'Bahaya' ? 'animate-pulse bg-current' : 'bg-current'}`}></span>
      {status}
    </span>
  );
};

export default StatusBadge;