// src/hooks/useDebounce.ts
import { useState, useEffect } from 'react';

/**
 * Custom hook untuk men-debounce nilai (mencegah perubahan state terlalu cepat)
 * @param value Nilai yang akan di-debounce
 * @param delay Waktu tunda dalam milidetik (default: 500ms)
 */
export function useDebounce<T>(value: T, delay: number = 500): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    // Set timeout untuk update nilai setelah delay
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Bersihkan timeout jika nilai berubah sebelum delay selesai (cancel previous)
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}