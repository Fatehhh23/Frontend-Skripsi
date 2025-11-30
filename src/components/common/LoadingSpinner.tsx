import React from 'react';
import { Loader2 } from 'lucide-react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  fullScreen?: boolean;
  text?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = 'md', 
  fullScreen = false, 
  text 
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16',
  };

  const containerClasses = fullScreen 
    ? "fixed inset-0 bg-white/80 backdrop-blur-sm z-50 flex flex-col items-center justify-center"
    : "flex flex-col items-center justify-center p-4";

  return (
    <div className={containerClasses}>
      <div className="relative">
        <Loader2 className={`animate-spin text-blue-600 ${sizeClasses[size]}`} />
        
        {/* Efek Glow Opsional */}
        <div className={`absolute inset-0 bg-blue-400 blur-xl opacity-20 animate-pulse ${sizeClasses[size]}`}></div>
      </div>
      
      {text && (
        <p className="mt-4 text-slate-600 font-medium text-sm animate-pulse">
          {text}
        </p>
      )}
    </div>
  );
};

export default LoadingSpinner;