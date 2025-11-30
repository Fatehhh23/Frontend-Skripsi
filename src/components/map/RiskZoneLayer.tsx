import React, { useEffect } from 'react';
import MapView from '@arcgis/core/views/MapView';
import GraphicsLayer from '@arcgis/core/layers/GraphicsLayer';
import Graphic from '@arcgis/core/Graphic';
import Polygon from '@arcgis/core/geometry/Polygon';
import SimpleFillSymbol from '@arcgis/core/symbols/SimpleFillSymbol';
import { RISK_ZONES } from '@/constants/tsunamiConfig';
import { MAP_CONFIG } from '@/constants/mapConfig';

interface RiskZoneLayerProps {
  view: MapView;
}

const RiskZoneLayer: React.FC<RiskZoneLayerProps> = ({ view }) => {
  useEffect(() => {
    if (!view) return;

    // Buat layer khusus untuk zona risiko agar terpisah dari marker gempa
    const riskLayer = new GraphicsLayer({
      title: "Zona Risiko Tsunami"
    });

    view.map.add(riskLayer);

    // Loop data zona dari config dan gambar polygon
    RISK_ZONES.forEach((zone) => {
      const polygon = new Polygon({
        rings: [zone.coordinates] // Array of coordinate pairs [lon, lat]
      });

      // Tentukan warna berdasarkan baseRisk zona tersebut
      const fillColor = 
        zone.baseRisk === 'critical' ? MAP_CONFIG.riskZoneColors.critical :
        zone.baseRisk === 'high' ? MAP_CONFIG.riskZoneColors.high :
        zone.baseRisk === 'medium' ? MAP_CONFIG.riskZoneColors.medium :
        MAP_CONFIG.riskZoneColors.low;

      const fillSymbol = new SimpleFillSymbol({
        color: fillColor,
        outline: {
          color: [255, 255, 255, 0.8],
          width: 1
        }
      });

      const graphic = new Graphic({
        geometry: polygon,
        symbol: fillSymbol,
        attributes: {
          Name: zone.name,
          Risk: zone.baseRisk,
          Description: zone.description
        },
        popupTemplate: {
          title: "{Name}",
          content: `
            <b>Tingkat Risiko:</b> {Risk}<br>
            <b>Keterangan:</b> {Description}
          `
        }
      });

      riskLayer.add(graphic);
    });

    return () => {
      view.map.remove(riskLayer);
    };
  }, [view]);

  return null;
};

export default RiskZoneLayer;