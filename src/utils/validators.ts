// src/utils/validators.ts

import { SimulationParams } from '../types/simulation';
import { SUNDA_STRAIT_BOUNDS } from '../constants/tsunamiConfig';

export interface ValidationResult {
  valid: boolean;
  errors: string[];
}

/**
 * Memvalidasi seluruh parameter input simulasi
 */
export const validateSimulationParams = (params: SimulationParams): ValidationResult => {
  const errors: string[] = [];
  const { latitude, longitude } = SUNDA_STRAIT_BOUNDS.bounds;

  // 1. Validasi Magnitudo
  if (!params.magnitude || params.magnitude < 4.0 || params.magnitude > 10.0) {
    errors.push('Magnitudo harus diisi antara 4.0 hingga 10.0 SR.');
  }

  // 2. Validasi Kedalaman
  if (params.depth === undefined || params.depth < 0 || params.depth > 700) {
    errors.push('Kedalaman harus diisi antara 0 hingga 700 km.');
  }

  // 3. Validasi Batas Wilayah (Geofencing)
  // Memastikan koordinat berada dalam area studi Selat Sunda untuk akurasi model
  const isLatValid = params.latitude <= latitude.north && params.latitude >= latitude.south;
  const isLonValid = params.longitude >= longitude.west && params.longitude <= longitude.east;

  if (!isLatValid || !isLonValid) {
    errors.push(
      `Lokasi di luar area studi Selat Sunda. 
      (Lat: ${latitude.south} s.d ${latitude.north}, 
      Lon: ${longitude.west} s.d ${longitude.east})`
    );
  }

  return {
    valid: errors.length === 0,
    errors,
  };
};