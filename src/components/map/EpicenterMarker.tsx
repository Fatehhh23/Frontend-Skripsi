import React, { useEffect } from 'react';
import MapView from '@arcgis/core/views/MapView';
import Graphic from '@arcgis/core/Graphic';
import Point from '@arcgis/core/geometry/Point';
import SimpleMarkerSymbol from '@arcgis/core/symbols/SimpleMarkerSymbol';
import { Coordinate } from '@/types/map';
import { RiskLevel } from '@/types/simulation';
import { COLORS } from '@/constants/colors';

interface EpicenterMarkerProps {
  view: MapView;
  coordinate: Coordinate;
  riskLevel?: RiskLevel;
}

const EpicenterMarker: React.FC<EpicenterMarkerProps> = ({ view, coordinate, riskLevel }) => {
  
  useEffect(() => {
    if (!view || !coordinate) return;

    // Tentukan warna berdasarkan risiko (menggunakan Helper Hex to RGB nanti idealnya, disini manual dulu)
    // Format ArcGIS Color: [R, G, B, Opacity]
    let color = [59, 130, 246, 1]; // Default Biru

    if (riskLevel === 'Bahaya') color = [220, 38, 38, 1]; // Merah
    else if (riskLevel === 'Tinggi') color = [249, 115, 22, 1]; // Oranye
    else if (riskLevel === 'Sedang') color = [234, 179, 8, 1]; // Kuning
    else if (riskLevel === 'Rendah') color = [34, 197, 94, 1]; // Hijau

    const point = new Point({
      longitude: coordinate.longitude,
      latitude: coordinate.latitude
    });

    const markerSymbol = new SimpleMarkerSymbol({
      color: color,
      outline: { color: [255, 255, 255], width: 2 },
      size: 14,
      style: "circle"
    });

    // Efek "Pulse" sederhana dengan marker kedua yang lebih besar dan transparan
    const pulseSymbol = new SimpleMarkerSymbol({
      color: [color[0], color[1], color[2], 0.3],
      outline: { color: [0,0,0,0], width: 0 },
      size: 24,
      style: "circle"
    });

    const graphicMain = new Graphic({ geometry: point, symbol: markerSymbol });
    const graphicPulse = new Graphic({ geometry: point, symbol: pulseSymbol });

    view.graphics.addMany([graphicPulse, graphicMain]);

    // Zoom ke lokasi
    view.goTo({ target: point, zoom: 10 }, { duration: 800 });

    return () => {
      view.graphics.removeMany([graphicPulse, graphicMain]);
    };
  }, [view, coordinate, riskLevel]);

  return null; // Komponen ini tidak merender DOM, hanya memanipulasi View ArcGIS
};

export default EpicenterMarker;