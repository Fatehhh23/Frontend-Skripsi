import React from 'react';
import { Link } from 'react-router-dom';
import { Activity, Map, BarChart3, ArrowRight, Zap, Globe } from 'lucide-react';
import SEO from '@/components/common/SEO';
import logoAvatar from '@/public/assets/logo-avatar.png'; // Pastikan path ini benar

const Home: React.FC = () => {
  return (
    <>
      <SEO 
        title="Beranda" 
        description="AVATAR - Sistem Analisis Visual Akurat Tsunami & Analisis Risiko berbasis AI dan WebGIS." 
      />

      <div className="bg-white min-h-screen font-sans selection:bg-blue-100 selection:text-blue-900 overflow-hidden">
        
        {/* Hero Section */}
        <section className="relative pt-20 pb-12 lg:pt-32 lg:pb-24">
          
          {/* Background Blobs (Decoration) */}
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-[600px] h-[600px] bg-blue-50 rounded-full blur-3xl opacity-50 pointer-events-none animate-pulse-slow"></div>
          <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-[400px] h-[400px] bg-cyan-50 rounded-full blur-3xl opacity-50 pointer-events-none"></div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="lg:grid lg:grid-cols-12 lg:gap-16 items-center">
              
              {/* Left Column: Text Content */}
              <div className="lg:col-span-7 text-center lg:text-left mb-12 lg:mb-0 animate-fade-in">
                <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-semibold tracking-wide uppercase mb-6 border border-blue-100">
                  <span className="w-2 h-2 bg-blue-600 rounded-full mr-2 animate-pulse"></span>
                  WebGIS Tsunami Early Warning
                </div>
                
                <h1 className="text-5xl lg:text-7xl font-bold tracking-tight text-slate-900 mb-6 leading-[1.1]">
                  AVATAR
                </h1>
                <h2 className="text-2xl lg:text-3xl font-medium text-slate-700 mb-6 leading-snug">
                  Analisis Visual Akurat Tsunami & Analisis Risiko
                </h2>
                
                <p className="text-lg text-slate-500 mb-8 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                  Platform berbasis web yang mengintegrasikan kecerdasan buatan (AI) dan teknologi geospasial untuk simulasi serta pemantauan risiko tsunami secara real-time di wilayah Selat Sunda.
                </p>

                <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
                  <Link 
                    to="/dashboard" 
                    className="group inline-flex items-center justify-center px-8 py-4 text-base font-semibold rounded-full text-white bg-slate-900 hover:bg-blue-600 transition-all duration-300 shadow-lg hover:shadow-blue-500/30 transform hover:-translate-y-1"
                  >
                    Mulai Simulasi
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <Link 
                    to="/about" 
                    className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold rounded-full text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 hover:border-slate-300 transition-all duration-300"
                  >
                    Pelajari Selengkapnya
                  </Link>
                </div>
              </div>

              {/* Right Column: Visual Composition */}
              <div className="lg:col-span-5 relative flex justify-center animate-fade-in" style={{ animationDelay: '0.2s' }}>
                <div className="relative w-full max-w-md aspect-square flex flex-col items-center justify-center">
                  
                  {/* Glowing Background behind Logo */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-blue-100 to-cyan-100 rounded-full blur-[80px] opacity-60"></div>
                  
                  {/* Logo Container */}
                  <div className="relative z-10 w-64 h-64 sm:w-80 sm:h-80 transition-transform hover:scale-105 duration-500">
                    <img 
                      src={logoAvatar} 
                      alt="AVATAR Logo" 
                      className="w-full h-full object-contain drop-shadow-2xl"
                    />
                  </div>

                  {/* Caption */}
                  <div className="mt-8 text-center relative z-10">
                    <h3 className="text-2xl font-bold text-slate-900">AVATAR WebGIS</h3>
                    <p className="text-slate-500 text-sm mt-1">Mitigasi Bencana Berbasis Data</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Features Grid */}
            <div className="mt-24 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
              <FeatureCard 
                icon={<Zap className="h-6 w-6" />}
                color="text-blue-600"
                title="Simulasi Manual"
                desc="Jalankan skenario tsunami berdasarkan parameter gempa kustom Anda."
              />
              <FeatureCard 
                icon={<Globe className="h-6 w-6" />}
                color="text-red-500"
                title="Analisis Real-Time"
                desc="Pemantauan otomatis data gempa terkini dari BMKG & USGS."
              />
              <FeatureCard 
                icon={<Map className="h-6 w-6" />}
                color="text-green-500"
                title="Peta Interaktif"
                desc="Visualisasi zona risiko dan area terdampak dalam format WebGIS."
              />
              <FeatureCard 
                icon={<BarChart3 className="h-6 w-6" />}
                color="text-purple-500"
                title="Statistik Cerdas"
                desc="Grafik tren gelombang dan estimasi waktu tiba (ETA) yang akurat."
              />
            </div>
          </div>
        </section>

        {/* Quote Section */}
        <section className="py-20 bg-slate-50/80 border-t border-slate-100">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <div className="inline-flex space-x-1 mb-8 opacity-30">
              <div className="h-1.5 w-1.5 bg-slate-900 rounded-full"></div>
              <div className="h-1.5 w-16 bg-slate-900 rounded-full"></div>
              <div className="h-1.5 w-1.5 bg-slate-900 rounded-full"></div>
            </div>
            
            <h2 className="text-2xl md:text-3xl font-serif italic text-slate-700 leading-relaxed mb-8">
              "Teknologi bukan sekadar alat, melainkan jembatan untuk menyelamatkan nyawa melalui peringatan dini yang lebih cepat dan akurat."
            </h2>
            
            <div className="flex items-center justify-center space-x-4">
              <div className="h-px w-12 bg-slate-300"></div>
              <p className="text-sm font-bold text-slate-900 uppercase tracking-widest">Misi Kami</p>
              <div className="h-px w-12 bg-slate-300"></div>
            </div>
          </div>
        </section>

      </div>
    </>
  );
};

// Sub-komponen untuk Kartu Fitur agar kode lebih rapi
const FeatureCard: React.FC<{ icon: React.ReactNode; color: string; title: string; desc: string }> = ({ icon, color, title, desc }) => (
  <div className="p-6 bg-slate-50 rounded-2xl border border-transparent hover:bg-white hover:border-slate-100 hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300 group cursor-default">
    <div className={`w-12 h-12 bg-white rounded-xl flex items-center justify-center mb-4 shadow-sm group-hover:scale-110 transition-transform ${color}`}>
      {icon}
    </div>
    <h3 className="font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">{title}</h3>
    <p className="text-sm text-slate-500 leading-relaxed">
      {desc}
    </p>
  </div>
);

export default Home;