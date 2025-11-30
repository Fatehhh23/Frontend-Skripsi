// src/services/realtimeService.ts
import { API_ENDPOINTS } from '../constants/apiEndpoints';

class RealtimeService {
  private socket: WebSocket | null = null;
  private listeners: ((data: any) => void)[] = [];

  /**
   * Membuka koneksi WebSocket
   */
  connect() {
    // Cek jika endpoint stream tersedia
    if (!API_ENDPOINTS.REALTIME_STREAM) return;

    this.socket = new WebSocket(API_ENDPOINTS.REALTIME_STREAM);

    this.socket.onopen = () => {
      console.log("[RealtimeService] Connected to stream");
    };

    this.socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      this.notifyListeners(data);
    };

    this.socket.onclose = () => {
      console.log("[RealtimeService] Disconnected");
      // Implementasi auto-reconnect bisa ditambahkan di sini
    };
  }

  /**
   * Mendaftarkan callback function untuk menerima update data
   */
  subscribe(callback: (data: any) => void) {
    this.listeners.push(callback);
    return () => {
      this.listeners = this.listeners.filter(cb => cb !== callback);
    };
  }

  private notifyListeners(data: any) {
    this.listeners.forEach(callback => callback(data));
  }

  disconnect() {
    if (this.socket) {
      this.socket.close();
      this.socket = null;
    }
  }
}

export const realtimeService = new RealtimeService();