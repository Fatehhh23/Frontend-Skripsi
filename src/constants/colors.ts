// src/constants/colors.ts
// Palet warna aplikasi

export const COLORS = {
  // Risk levels
  RISK_LOW: '#22c55e',
  RISK_MEDIUM: '#eab308',
  RISK_HIGH: '#f97316',
  RISK_CRITICAL: '#dc2626',
  
  // Map markers
  EPICENTER_DEFAULT: '#3b82f6',
  EPICENTER_ACTIVE: '#ef4444',
  
  // Status badges
  STATUS_SUCCESS: '#10b981',
  STATUS_WARNING: '#f59e0b',
  STATUS_DANGER: '#ef4444',
  STATUS_INFO: '#3b82f6',
  
  // Chart colors
  CHART_PRIMARY: '#3b82f6',
  CHART_SECONDARY: '#8b5cf6',
  CHART_ACCENT: '#ec4899',
  
  // UI Elements
  TEXT_PRIMARY: '#1e293b',
  TEXT_SECONDARY: '#64748b',
  TEXT_TERTIARY: '#94a3b8',
  
  BACKGROUND_PRIMARY: '#ffffff',
  BACKGROUND_SECONDARY: '#f8fafc',
  BACKGROUND_TERTIARY: '#f1f5f9',
  
  BORDER_PRIMARY: '#e2e8f0',
  BORDER_SECONDARY: '#cbd5e1',
} as const;

export default COLORS;