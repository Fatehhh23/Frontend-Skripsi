import React, { useEffect, useRef, useState } from 'react';
import Map from '@arcgis/core/Map';
import MapView from '@arcgis/core/views/MapView';
import Graphic from '@arcgis/core/Graphic';
import Point from '@arcgis/core/geometry/Point';
import SimpleMarkerSymbol from '@arcgis/core/symbols/SimpleMarkerSymbol';
import { MAP_CONFIG } from '@/constants/mapConfig';
import { Coordinate } from '@/types/map';

interface InteractiveMapProps {
  onCoordinateSelect: (lat: number, lon: number) => void;
  selectedCoordinate?: Coordinate;
}

const InteractiveMap: React.FC<InteractiveMapProps> = ({ 
  onCoordinateSelect, 
  selectedCoordinate 
}) => {
  const mapDiv = useRef<HTMLDivElement>(null);
  const viewRef = useRef<MapView | null>(null);
  const [viewReady, setViewReady] = useState(false);

  // Inisialisasi Peta
  useEffect(() => {
    if (mapDiv.current && !viewRef.current) {
      const map = new Map({
        basemap: 'topo-vector',
      });

      const view = new MapView({
        container: mapDiv.current,
        map: map,
        center: MAP_CONFIG.initialView.center,
        zoom: MAP_CONFIG.initialView.zoom,
      });

      // Event Listener Klik
      view.on("click", (event) => {
        // Ambil koordinat dan bulatkan 4 desimal
        const lat = parseFloat(event.mapPoint.latitude.toFixed(4));
        const lon = parseFloat(event.mapPoint.longitude.toFixed(4));
        onCoordinateSelect(lat, lon);
      });

      view.when(() => {
        setViewReady(true);
      });

      viewRef.current = view;

      return () => {
        if (view) {
          view.destroy();
          viewRef.current = null;
        }
      };
    }
  }, [onCoordinateSelect]);

  // Update Marker saat selectedCoordinate berubah (baik dari klik peta atau input form)
  useEffect(() => {
    const view = viewRef.current;
    if (view && viewReady && selectedCoordinate && selectedCoordinate.latitude !== 0) {
      view.graphics.removeAll();

      const point = new Point({
        longitude: selectedCoordinate.longitude,
        latitude: selectedCoordinate.latitude
      });

      const markerSymbol = new SimpleMarkerSymbol({
        color: [59, 130, 246], // Biru (#3b82f6)
        outline: { color: [255, 255, 255], width: 2 },
        size: 12
      });

      const graphic = new Graphic({
        geometry: point,
        symbol: markerSymbol
      });

      view.graphics.add(graphic);

      // Opsional: Animasi pan ke lokasi baru
      view.goTo({ target: point }, { duration: 500, easing: 'ease-out' });
    }
  }, [selectedCoordinate, viewReady]);

  return (
    <div className="w-full h-full bg-slate-100 cursor-crosshair">
      <div ref={mapDiv} className="w-full h-full outline-none" />
    </div>
  );
};

export default InteractiveMap;