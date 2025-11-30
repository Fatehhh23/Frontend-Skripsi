import React from 'react';
import { AlertCircle } from 'lucide-react';

interface ValidationErrorsProps {
  errors: string[];
}

const ValidationErrors: React.FC<ValidationErrorsProps> = ({ errors }) => {
  if (!errors || errors.length === 0) return null;

  return (
    <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 animate-fade-in">
      <div className="flex items-start gap-3">
        <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 shrink-0" />
        <div>
          <h4 className="text-sm font-bold text-red-800 mb-1">Input Tidak Valid</h4>
          <ul className="list-disc list-inside text-sm text-red-700 space-y-1">
            {errors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ValidationErrors;