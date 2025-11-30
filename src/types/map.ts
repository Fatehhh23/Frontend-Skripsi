// src/types/map.ts

// Koordinat dasar
export interface Coordinate {
  latitude: number;
  longitude: number;
}

// Konfigurasi tampilan awal peta
export interface MapViewState {
  center: [number, number]; // [Longitude, Latitude] - Format ArcGIS
  zoom: number;
}

// Batas wilayah (Bounding Box)
export interface MapBounds {
  north: number;
  south: number;
  east: number;
  west: number;
}

// Struktur data untuk Zona Risiko (Polygon statis)
export interface RiskZoneLayer {
  id: string;
  name: string;
  description?: string;
  baseRisk: 'low' | 'medium' | 'high' | 'critical';
  coordinates: number[][]; // Array of [lon, lat] arrays
}

// Props untuk marker episentrum gempa
export interface EpicenterMarker {
  coordinate: Coordinate;
  magnitude: number;
  depth: number;
  isActive: boolean; // True jika ini gempa yang sedang dipilih
}