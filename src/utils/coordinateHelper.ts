// src/utils/coordinateHelper.ts

import { Coordinate } from '../types/map';

/**
 * Memformat angka koordinat menjadi string yang rapi dengan arah mata angin
 * Contoh: -6.1234, 105.5678 -> "6.1234° LS, 105.5678° BT"
 */
export const formatCoordinate = (lat: number, lon: number): string => {
  const latDir = lat >= 0 ? 'LU' : 'LS'; // Lintang Utara / Selatan
  const lonDir = lon >= 0 ? 'BT' : 'BB'; // Bujur Timur / Barat
  
  return `${Math.abs(lat).toFixed(4)}° ${latDir}, ${Math.abs(lon).toFixed(4)}° ${lonDir}`;
};

/**
 * Memparse string input user menjadi object Coordinate
 * Menerima format: "-6.123, 105.123"
 */
export const parseInputCoordinate = (input: string): Coordinate | null => {
  try {
    const parts = input.split(',').map(s => s.trim());
    if (parts.length !== 2) return null;

    const lat = parseFloat(parts[0]);
    const lon = parseFloat(parts[1]);

    if (isNaN(lat) || isNaN(lon)) return null;

    return { latitude: lat, longitude: lon };
  } catch {
    return null;
  }
};