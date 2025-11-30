import React from 'react';
import { Link } from 'react-router-dom';

const Register: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-lg border border-slate-100 text-center">
        <h2 className="text-2xl font-bold text-slate-900 mb-4">Daftar Akun Baru</h2>
        <p className="text-slate-600 mb-6">Fitur pendaftaran belum tersedia di versi demo ini.</p>
        <Link to="/login" className="text-blue-600 font-semibold hover:underline">Kembali ke Login</Link>
      </div>
    </div>
  );
};

export default Register;