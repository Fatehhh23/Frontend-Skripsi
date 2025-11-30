// hooks/useSimulation.ts
// Custom hook untuk manajemen state simulasi

import { useState, useCallback } from 'react';
import { SimulationParams, SimulationResult } from '../types';
import { simulationService } from '../services/simulationService';

interface UseSimulationReturn {
  params: SimulationParams;
  result: SimulationResult | null;
  loading: boolean;
  error: string | null;
  updateParams: (updates: Partial<SimulationParams>) => void;
  runSimulation: () => Promise<void>;
  resetSimulation: () => void;
  validationErrors: string[];
}

export const useSimulation = (): UseSimulationReturn => {
  const [params, setParams] = useState<SimulationParams>({
    magnitude: 0,
    depth: 0,
    latitude: 0,
    longitude: 0
  });

  const [result, setResult] = useState<SimulationResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  const updateParams = useCallback((updates: Partial<SimulationParams>) => {
    setParams(prev => ({ ...prev, ...updates }));
    setValidationErrors([]); // Clear errors saat update
  }, []);

  const runSimulation = useCallback(async () => {
    // Validasi parameter
    const validation = simulationService.validateParams(params);
    
    if (!validation.valid) {
      setValidationErrors(validation.errors);
      return;
    }

    setLoading(true);
    setError(null);
    setValidationErrors([]);

    try {
      const simulationResult = await simulationService.runSimulation(params);
      setResult(simulationResult);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Simulasi gagal';
      setError(errorMessage);
      console.error('Simulation error:', err);
    } finally {
      setLoading(false);
    }
  }, [params]);

  const resetSimulation = useCallback(() => {
    setParams({
      magnitude: 0,
      depth: 0,
      latitude: 0,
      longitude: 0
    });
    setResult(null);
    setError(null);
    setValidationErrors([]);
  }, []);

  return {
    params,
    result,
    loading,
    error,
    updateParams,
    runSimulation,
    resetSimulation,
    validationErrors
  };
};