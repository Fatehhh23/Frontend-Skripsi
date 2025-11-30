// src/types/index.ts

// Export tipe spesifik dari file lain
export * from './simulation';
export * from './map';
export * from './api';

// --- Tipe Umum / Shared ---

// Definisi User (Untuk AuthContext)
export interface User {
  id?: string;
  email: string;
  name: string;
  role?: 'admin' | 'user';
  avatar?: string;
}

// Tipe untuk error validasi form
export interface ValidationError {
  field: string;
  message: string;
}

// Tipe untuk opsi Dropdown/Select
export interface SelectOption {
  label: string;
  value: string | number;
}

// Status loading aplikasi
export type LoadingState = 'idle' | 'loading' | 'success' | 'error';