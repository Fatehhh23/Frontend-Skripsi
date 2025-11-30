// src/hooks/useMapControls.ts
import { useRef, useCallback } from 'react';
import MapView from '@arcgis/core/views/MapView';
import { MAP_CONFIG } from '../constants/mapConfig';

export const useMapControls = () => {
  // Ref untuk menyimpan instance MapView
  const viewRef = useRef<MapView | null>(null);

  /**
   * Set instance view saat peta selesai dimuat
   */
  const setView = useCallback((view: MapView) => {
    viewRef.current = view;
  }, []);

  /**
   * Reset kamera peta ke posisi awal (Selat Sunda)
   */
  const resetView = useCallback(() => {
    if (viewRef.current) {
      viewRef.current.goTo({
        center: MAP_CONFIG.initialView.center,
        zoom: MAP_CONFIG.initialView.zoom
      }, {
        duration: 1000,
        easing: 'ease-in-out'
      });
    }
  }, []);

  /**
   * Zoom In manual
   */
  const zoomIn = useCallback(() => {
    if (viewRef.current) {
      const currentZoom = viewRef.current.zoom;
      if (currentZoom < MAP_CONFIG.viewSettings.constraints.maxZoom) {
        viewRef.current.goTo({ zoom: currentZoom + 1 });
      }
    }
  }, []);

  /**
   * Zoom Out manual
   */
  const zoomOut = useCallback(() => {
    if (viewRef.current) {
      const currentZoom = viewRef.current.zoom;
      if (currentZoom > MAP_CONFIG.viewSettings.constraints.minZoom) {
        viewRef.current.goTo({ zoom: currentZoom - 1 });
      }
    }
  }, []);

  return {
    viewRef,
    setView,
    resetView,
    zoomIn,
    zoomOut
  };
};