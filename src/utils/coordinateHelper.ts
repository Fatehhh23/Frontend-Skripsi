// src/utils/coordinateHelper.ts
// Helper functions untuk manipulasi koordinat

import { Coordinate } from '../types/map';

/**
 * Menghitung jarak antara dua titik koordinat (Haversine formula)
 * @returns jarak dalam kilometer
 */
export const calculateDistance = (coord1: Coordinate, coord2: Coordinate): number => {
  const R = 6371; // Radius bumi dalam km
  const dLat = toRadians(coord2.latitude - coord1.latitude);
  const dLon = toRadians(coord2.longitude - coord1.longitude);
  
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(coord1.latitude)) *
      Math.cos(toRadians(coord2.latitude)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

/**
 * Konversi derajat ke radian
 */
const toRadians = (degrees: number): number => {
  return (degrees * Math.PI) / 180;
};

/**
 * Format koordinat untuk display
 */
export const formatCoordinate = (lat: number, lon: number): string => {
  const latDir = lat >= 0 ? 'N' : 'S';
  const lonDir = lon >= 0 ? 'E' : 'W';
  return `${Math.abs(lat).toFixed(4)}° ${latDir}, ${Math.abs(lon).toFixed(4)}° ${lonDir}`;
};

/**
 * Parse string koordinat menjadi object
 */
export const parseCoordinate = (coordString: string): Coordinate | null => {
  try {
    const [latStr, lonStr] = coordString.split(',');
    const latitude = parseFloat(latStr.trim());
    const longitude = parseFloat(lonStr.trim());
    
    if (isNaN(latitude) || isNaN(longitude)) {
      return null;
    }
    
    return { latitude, longitude };
  } catch {
    return null;
  }
};

/**
 * Menghitung bearing (sudut arah) antara dua titik
 * @returns bearing dalam derajat (0-360)
 */
export const calculateBearing = (from: Coordinate, to: Coordinate): number => {
  const dLon = toRadians(to.longitude - from.longitude);
  const lat1 = toRadians(from.latitude);
  const lat2 = toRadians(to.latitude);
  
  const y = Math.sin(dLon) * Math.cos(lat2);
  const x =
    Math.cos(lat1) * Math.sin(lat2) -
    Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLon);
  
  let bearing = Math.atan2(y, x);
  bearing = (bearing * 180) / Math.PI;
  bearing = (bearing + 360) % 360;
  
  return bearing;
};

/**
 * Mendapatkan titik tengah antara dua koordinat
 */
export const getMidpoint = (coord1: Coordinate, coord2: Coordinate): Coordinate => {
  return {
    latitude: (coord1.latitude + coord2.latitude) / 2,
    longitude: (coord1.longitude + coord2.longitude) / 2,
  };
};

/**
 * Cek apakah koordinat berada dalam bounds
 */
export const isWithinBounds = (
  coord: Coordinate,
  bounds: { north: number; south: number; east: number; west: number }
): boolean => {
  return (
    coord.latitude <= bounds.north &&
    coord.latitude >= bounds.south &&
    coord.longitude <= bounds.east &&
    coord.longitude >= bounds.west
  );
};

/**
 * Generate random coordinate dalam area tertentu (untuk testing)
 */
export const generateRandomCoordinate = (
  center: Coordinate,
  radiusKm: number
): Coordinate => {
  const radiusInDegrees = radiusKm / 111; // 1 degree ≈ 111 km
  const u = Math.random();
  const v = Math.random();
  const w = radiusInDegrees * Math.sqrt(u);
  const t = 2 * Math.PI * v;
  const x = w * Math.cos(t);
  const y = w * Math.sin(t);
  
  return {
    latitude: center.latitude + y,
    longitude: center.longitude + x,
  };
};