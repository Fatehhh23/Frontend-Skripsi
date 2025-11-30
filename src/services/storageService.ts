// src/services/storageService.ts

const PREFIX = 'avatar_webgis_';

class StorageService {
  /**
   * Menyimpan data ke LocalStorage
   */
  set(key: string, value: any): void {
    try {
      const serializedValue = JSON.stringify(value);
      localStorage.setItem(`${PREFIX}${key}`, serializedValue);
    } catch (error) {
      console.error("[StorageService] Error saving key:", key, error);
    }
  }

  /**
   * Mengambil data dari LocalStorage
   */
  get<T>(key: string): T | null {
    try {
      const item = localStorage.getItem(`${PREFIX}${key}`);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error("[StorageService] Error reading key:", key, error);
      return null;
    }
  }

  /**
   * Menghapus data spesifik
   */
  remove(key: string): void {
    localStorage.removeItem(`${PREFIX}${key}`);
  }

  /**
   * Membersihkan semua data aplikasi
   */
  clear(): void {
    Object.keys(localStorage).forEach(key => {
      if (key.startsWith(PREFIX)) {
        localStorage.removeItem(key);
      }
    });
  }
}

export const storageService = new StorageService();