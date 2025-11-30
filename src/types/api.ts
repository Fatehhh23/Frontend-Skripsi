// src/types/api.ts
// Types untuk API responses

export interface APIResponse<T = any> {
  success: boolean;
  data?: T;
  error?: APIError;
  message?: string;
}

export interface APIError {
  code: string;
  message: string;
  details?: Record<string, any>;
}

export interface SimulationAPIRequest {
  magnitude: number;
  depth: number;
  latitude: number;
  longitude: number;
}

export interface SimulationAPIResponse {
  risk_score: number;
  eta_minutes: number;
  max_wave_height: number;
  impact_area_km2: number;
  wave_trend: Array<{
    time_offset: string;
    wave_height: number;
  }>;
  confidence_score?: number;
}

export interface RealTimeAPIResponse {
  timestamp: string;
  location: string;
  params: {
    magnitude: number;
    depth: number;
    latitude: number;
    longitude: number;
  };
  result: SimulationAPIResponse;
  source: string;
}

export interface EarthquakeAPIResponse {
  features: Array<{
    id: string;
    properties: {
      mag: number;
      place: string;
      time: number;
      updated: number;
      tz: number | null;
      url: string;
      detail: string;
      felt: number | null;
      cdi: number | null;
      mmi: number | null;
      alert: string | null;
      status: string;
      tsunami: number;
      sig: number;
      net: string;
      code: string;
      ids: string;
      sources: string;
      types: string;
      nst: number | null;
      dmin: number | null;
      rms: number;
      gap: number | null;
      magType: string;
      type: string;
      title: string;
    };
    geometry: {
      type: 'Point';
      coordinates: [number, number, number]; // [lon, lat, depth]
    };
  }>;
}