// src/utils/validators.ts
// Fungsi validasi untuk input

import { SimulationParams } from '../types';
import { TSUNAMI_RISK_THRESHOLDS, SUNDA_STRAIT_BOUNDS } from '../constants/tsunamiConfig';

export interface ValidationResult {
  valid: boolean;
  errors: string[];
}

export const validateSimulationParams = (params: SimulationParams): ValidationResult => {
  const errors: string[] = [];

  // Validasi magnitude
  if (params.magnitude < 4.0 || params.magnitude > 10.0) {
    errors.push('Magnitudo harus antara 4.0 - 10.0 Skala Richter');
  }

  // Validasi depth
  if (params.depth < 0 || params.depth > 700) {
    errors.push('Kedalaman harus antara 0 - 700 km');
  }

  // Validasi latitude (Selat Sunda)
  if (params.latitude < -7.0 || params.latitude > -5.0) {
    errors.push('Lintang harus dalam area Selat Sunda (-7.0° hingga -5.0°)');
  }

  // Validasi longitude (Selat Sunda)
  if (params.longitude < 104.5 || params.longitude > 106.5) {
    errors.push('Bujur harus dalam area Selat Sunda (104.5° hingga 106.5°)');
  }

  // Cek koordinat 0,0 (kemungkinan belum diisi)
  if (params.latitude === 0 && params.longitude === 0) {
    errors.push('Silakan pilih lokasi episentrum pada peta atau isi koordinat manual');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
};

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password: string): ValidationResult => {
  const errors: string[] = [];

  if (password.length < 8) {
    errors.push('Password minimal 8 karakter');
  }

  if (!/[A-Z]/.test(password)) {
    errors.push('Password harus mengandung huruf kapital');
  }

  if (!/[a-z]/.test(password)) {
    errors.push('Password harus mengandung huruf kecil');
  }

  if (!/[0-9]/.test(password)) {
    errors.push('Password harus mengandung angka');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
};

export const isCoordinateInSundaStrait = (lat: number, lon: number): boolean => {
  return (
    lat >= -7.0 &&
    lat <= -5.0 &&
    lon >= 104.5 &&
    lon <= 106.5
  );
};

export const isTsunamigenicEarthquake = (magnitude: number, depth: number): boolean => {
  // Gempa tsunamigenik: magnitude > 6.5 dan kedalaman < 100km
  return magnitude >= TSUNAMI_RISK_THRESHOLDS.magnitude.medium && 
         depth <= TSUNAMI_RISK_THRESHOLDS.depth.deep;
};