import React from 'react';
import { Circle, CheckCircle2 } from 'lucide-react';

interface TimelineEvent {
  time: string;
  title: string;
  description: string;
  status: 'completed' | 'current' | 'pending';
}

const TimelineChart: React.FC = () => {
  // Data dummy untuk visualisasi timeline
  const events: TimelineEvent[] = [
    {
      time: '00:00',
      title: 'Gempa Terdeteksi',
      description: 'Sensor seismik mendeteksi aktivitas.',
      status: 'completed',
    },
    {
      time: '00:02',
      title: 'Analisis AI Selesai',
      description: 'Parameter gempa & prediksi tsunami diproses.',
      status: 'completed',
    },
    {
      time: '00:05',
      title: 'Peringatan Dini',
      description: 'Sinyal bahaya dikirim ke wilayah terdampak.',
      status: 'current',
    },
    {
      time: '+15:00',
      title: 'Estimasi Tsunami Tiba',
      description: 'Gelombang pertama mencapai bibir pantai.',
      status: 'pending',
    },
  ];

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 h-full">
      <h3 className="font-bold text-slate-800 mb-6">Linimasa Kejadian</h3>
      
      <div className="relative pl-4 border-l-2 border-slate-100 space-y-8">
        {events.map((event, idx) => (
          <div key={idx} className="relative">
            {/* Dot Indicator */}
            <div className={`absolute -left-[21px] top-1 rounded-full bg-white border-4 ${
              event.status === 'completed' ? 'border-green-500' :
              event.status === 'current' ? 'border-blue-500 animate-pulse' :
              'border-slate-300'
            } w-3 h-3`}></div>

            <div className="flex flex-col">
              <span className={`text-xs font-mono mb-1 ${
                event.status === 'pending' ? 'text-slate-400' : 'text-slate-500'
              }`}>
                T {event.time}
              </span>
              <h4 className={`font-semibold text-sm ${
                event.status === 'pending' ? 'text-slate-400' : 'text-slate-800'
              }`}>
                {event.title}
              </h4>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                {event.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TimelineChart;