// src/types/api.ts

// Wrapper generic untuk response API standar
export interface APIResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: {
    code: string;
    details?: string;
  };
}

// Struktur data gempa dari API Eksternal (GeoJSON Standard - USGS/BMKG)
export interface EarthquakeFeature {
  type: 'Feature';
  properties: {
    mag: number;
    place: string;
    time: number; // Timestamp
    url: string;
    status: string;
    title: string;
  };
  geometry: {
    type: 'Point';
    coordinates: [number, number, number]; // [Longitude, Latitude, Depth]
  };
  id: string;
}

// Response kumpulan data gempa
export interface EarthquakeAPIResponse {
  type: 'FeatureCollection';
  features: EarthquakeFeature[];
}