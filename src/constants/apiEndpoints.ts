// src/constants/apiEndpoints.ts

// Menggunakan variable environment VITE_API_URL atau fallback ke localhost
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export const API_ENDPOINTS = {
  // --- Internal Backend (FastAPI) ---
  
  // Endpoint Simulasi
  SIMULATE: `${API_BASE_URL}/api/v1/simulate`,
  SIMULATE_BATCH: `${API_BASE_URL}/api/v1/simulate/batch`,
  
  // Endpoint Real-time Monitoring
  REALTIME: `${API_BASE_URL}/api/v1/realtime`,
  REALTIME_STREAM: `${API_BASE_URL}/api/v1/realtime/stream`, // WebSocket/SSE jika ada
  
  // Endpoint Riwayat Data
  HISTORY: `${API_BASE_URL}/api/v1/history`,
  
  // Endpoint Autentikasi User
  AUTH_LOGIN: `${API_BASE_URL}/api/v1/auth/login`,
  AUTH_REGISTER: `${API_BASE_URL}/api/v1/auth/register`,
  AUTH_LOGOUT: `${API_BASE_URL}/api/v1/auth/logout`,
  AUTH_REFRESH: `${API_BASE_URL}/api/v1/auth/refresh`,
  
  // --- External APIs (Sumber Data Gempa) ---
  
  // BMKG (Badan Meteorologi, Klimatologi, dan Geofisika)
  // Endpoint data gempa terkini (AutoGempa)
  BMKG_EARTHQUAKE: 'https://data.bmkg.go.id/DataMKG/TEWS/autogempa.json',
  
  // USGS (United States Geological Survey)
  // Feed gempa global harian
  USGS_EARTHQUAKE: 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson',
} as const;

export default API_ENDPOINTS;