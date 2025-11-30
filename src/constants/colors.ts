// src/constants/colors.ts

export const COLORS = {
  // Tingkat Risiko (Digunakan di Peta & Status Badge)
  RISK_LOW: '#22c55e',      // Hijau (Aman/Rendah)
  RISK_MEDIUM: '#eab308',   // Kuning (Waspada)
  RISK_HIGH: '#f97316',     // Oranye (Siaga)
  RISK_CRITICAL: '#dc2626', // Merah (Awas/Bahaya)
  
  // Marker Peta
  EPICENTER_DEFAULT: '#3b82f6', // Biru
  EPICENTER_ACTIVE: '#ef4444',  // Merah (Gempa Baru)
  
  // Status UI
  STATUS_SUCCESS: '#10b981',
  STATUS_WARNING: '#f59e0b',
  STATUS_DANGER: '#ef4444',
  STATUS_INFO: '#3b82f6',
  
  // Grafik (Chart)
  CHART_PRIMARY: '#3b82f6',
  CHART_SECONDARY: '#8b5cf6',
  CHART_ACCENT: '#ec4899',
  
  // Warna Latar Belakang & Border
  BACKGROUND_PRIMARY: '#ffffff',
  BACKGROUND_SECONDARY: '#f8fafc',
  BORDER_PRIMARY: '#e2e8f0',
} as const;

export default COLORS;