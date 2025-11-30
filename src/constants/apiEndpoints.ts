// src/constants/apiEndpoints.ts
// Definisi semua API endpoints

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export const API_ENDPOINTS = {
  // Simulation endpoints
  SIMULATE: `${API_BASE_URL}/api/v1/simulate`,
  SIMULATE_BATCH: `${API_BASE_URL}/api/v1/simulate/batch`,
  
  // Real-time monitoring
  REALTIME: `${API_BASE_URL}/api/v1/realtime`,
  REALTIME_STREAM: `${API_BASE_URL}/api/v1/realtime/stream`,
  
  // History
  HISTORY: `${API_BASE_URL}/api/v1/history`,
  HISTORY_BY_ID: (id: string) => `${API_BASE_URL}/api/v1/history/${id}`,
  
  // User management
  AUTH_LOGIN: `${API_BASE_URL}/api/v1/auth/login`,
  AUTH_REGISTER: `${API_BASE_URL}/api/v1/auth/register`,
  AUTH_LOGOUT: `${API_BASE_URL}/api/v1/auth/logout`,
  AUTH_REFRESH: `${API_BASE_URL}/api/v1/auth/refresh`,
  
  // External APIs
  BMKG_EARTHQUAKE: 'https://data.bmkg.go.id/DataMKG/TEWS/autogempa.json',
  USGS_EARTHQUAKE: 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson',
} as const;

export default API_ENDPOINTS;