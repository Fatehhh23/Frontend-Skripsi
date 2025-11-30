// src/App.tsx
import React, { useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import { AuthProvider, useAuth } from './context/AuthContext';

// Komponen utilitas untuk scroll ke atas saat pindah halaman
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// Komponen Pelindung Route (Hanya user login yang bisa akses)
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};

const App: React.FC = () => {
  return (
    // Menggunakan HashRouter agar aman saat di-deploy (misal ke GitHub Pages)
    <HashRouter>
      <AuthProvider>
        <ScrollToTop />
        <div className="flex flex-col min-h-screen bg-slate-50 font-sans text-slate-900">
          <Navbar />
          
          {/* Main Content dengan padding-top untuk kompensasi Navbar Fixed */}
          <main className="flex-grow pt-16">
            <Routes>
              {/* Rute Publik */}
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              {/* Rute Privat (Dashboard) */}
              <Route 
                path="/dashboard" 
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                } 
              />

              {/* Fallback untuk halaman 404 */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
          
          <Footer />
        </div>
      </AuthProvider>
    </HashRouter>
  );
};

export default App;