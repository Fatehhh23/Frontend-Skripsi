// src/hooks/useLocalStorage.ts
import { useState } from 'react';

/**
 * Custom hook untuk sinkronisasi state dengan LocalStorage browser
 * @param key Kunci penyimpanan di LocalStorage
 * @param initialValue Nilai awal jika data belum ada
 */
export function useLocalStorage<T>(key: string, initialValue: T) {
  // State untuk menyimpan nilai saat ini
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === 'undefined') {
      return initialValue;
    }
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  // Fungsi setter yang membungkus useState standar + update LocalStorage
  const setValue = (value: T | ((val: T) => T)) => {
    try {
      // Izinkan value berupa fungsi (seperti useState standar)
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      
      // Simpan state
      setStoredValue(valueToStore);
      
      // Simpan ke LocalStorage
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue] as const;
}