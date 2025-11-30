// src/utils/geoUtils.ts

/**
 * Mengonversi derajat ke radian
 */
const toRad = (value: number) => (value * Math.PI) / 180;

/**
 * Menghitung jarak antara dua titik koordinat menggunakan Rumus Haversine
 * @returns Jarak dalam kilometer (km)
 */
export const calculateDistanceKm = (
  lat1: number, 
  lon1: number, 
  lat2: number, 
  lon2: number
): number => {
  const R = 6371; // Radius bumi dalam km
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Number((R * c).toFixed(2));
};

/**
 * Menghitung estimasi waktu tiba (ETA) gelombang tsunami secara kasar
 * Asumsi kecepatan rata-rata tsunami di laut dalam/dangkal (penyederhanaan)
 * @param distanceKm Jarak episentrum ke pantai
 * @param depthKm Kedalaman laut rata-rata (default 0.5km untuk selat)
 * @returns Waktu dalam menit
 */
export const calculateEstimatedEta = (distanceKm: number, depthKm: number = 0.5): number => {
  const g = 9.81; // Gravitasi m/s^2
  const depthM = depthKm * 1000;
  
  // Kecepatan gelombang (v = sqrt(g * depth)) dalam m/s
  const speedMs = Math.sqrt(g * depthM);
  
  // Konversi kecepatan ke km/menit
  const speedKmMin = (speedMs * 60) / 1000;
  
  // Waktu = Jarak / Kecepatan
  return Math.round(distanceKm / speedKmMin);
};