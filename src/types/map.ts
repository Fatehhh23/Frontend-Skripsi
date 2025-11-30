// src/types/map.ts
// Types untuk komponen peta

export interface Coordinate {
  latitude: number;
  longitude: number;
}

export interface MapBounds {
  north: number;
  south: number;
  east: number;
  west: number;
}

export interface RiskZone {
  id: string;
  name: string;
  coordinates: Coordinate[];
  baseRisk: 'low' | 'medium' | 'high' | 'critical';
  population?: number;
  description?: string;
}

export interface EpicenterMarkerProps {
  coordinate: Coordinate;
  magnitude: number;
  depth: number;
  riskLevel?: string;
}

export interface MapLayerConfig {
  id: string;
  visible: boolean;
  opacity: number;
  zIndex: number;
}

export interface MapViewState {
  center: Coordinate;
  zoom: number;
  rotation?: number;
  pitch?: number;
}

export interface GeoJSONFeature {
  type: 'Feature';
  geometry: {
    type: 'Point' | 'LineString' | 'Polygon';
    coordinates: number[] | number[][] | number[][][];
  };
  properties: Record<string, any>;
}