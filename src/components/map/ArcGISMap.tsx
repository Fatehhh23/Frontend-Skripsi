import React, { useEffect, useRef } from 'react';
import Map from '@arcgis/core/Map';
import MapView from '@arcgis/core/views/MapView';
import { MAP_CONFIG } from '@/constants/mapConfig';
import RiskZoneLayer from './RiskZoneLayer';
import EpicenterMarker from './EpicenterMarker';
import { Coordinate } from '@/types/map';
import { RiskLevel } from '@/types/simulation';

interface ArcGISMapProps {
  epicenter?: Coordinate;
  riskLevel?: RiskLevel;
}

const ArcGISMap: React.FC<ArcGISMapProps> = ({ epicenter, riskLevel }) => {
  const mapDiv = useRef<HTMLDivElement>(null);
  const viewRef = useRef<MapView | null>(null);

  // Inisialisasi Peta
  useEffect(() => {
    if (mapDiv.current) {
      const map = new Map({
        basemap: MAP_CONFIG.basemap,
      });

      const view = new MapView({
        container: mapDiv.current,
        map: map,
        center: MAP_CONFIG.initialView.center,
        zoom: MAP_CONFIG.initialView.zoom,
        constraints: MAP_CONFIG.viewSettings.constraints,
        ui: {
          components: ["zoom", "compass", "attribution"] // Minimal UI
        }
      });

      viewRef.current = view;

      return () => {
        if (view) {
          view.destroy();
        }
      };
    }
  }, []);

  return (
    <div className="relative w-full h-full rounded-xl overflow-hidden shadow-inner border border-slate-200">
      <div ref={mapDiv} className="w-full h-full" />
      
      {/* Render Child Components jika View sudah siap */}
      {viewRef.current && (
        <>
          <RiskZoneLayer view={viewRef.current} />
          {epicenter && (
            <EpicenterMarker 
              view={viewRef.current} 
              coordinate={epicenter} 
              riskLevel={riskLevel} 
            />
          )}
        </>
      )}
    </div>
  );
};

export default ArcGISMap;