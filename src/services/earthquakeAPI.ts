// src/services/earthquakeAPI.ts
import { API_ENDPOINTS } from '../constants/apiEndpoints';

export interface EarthquakeFeature {
  properties: {
    mag: number;
    place: string;
    time: number;
    url: string;
    title: string;
  };
  geometry: {
    coordinates: [number, number, number]; // [lon, lat, depth]
  };
}

class EarthquakeAPI {
  /**
   * Mengambil data gempa terbaru dari USGS (Global)
   * Filter: Gempa > M4.0 hari ini
   */
  async getLatestEarthquakes(): Promise<EarthquakeFeature[]> {
    try {
      const response = await fetch(API_ENDPOINTS.USGS_EARTHQUAKE);
      if (!response.ok) throw new Error('Failed to fetch USGS data');
      
      const data = await response.json();
      
      // Filter hanya area Indonesia (secara kasar) untuk relevansi
      // Batas Indonesia: Lat 6N - 11S, Lon 95E - 141E
      const indonesiaQuakes = data.features.filter((f: any) => {
        const [lon, lat] = f.geometry.coordinates;
        return lat >= -11 && lat <= 6 && lon >= 95 && lon <= 141;
      });

      return indonesiaQuakes.length > 0 ? indonesiaQuakes : data.features.slice(0, 5); // Fallback top 5 global
    } catch (error) {
      console.error("[EarthquakeAPI] Error fetching USGS:", error);
      return [];
    }
  }

  /**
   * Mengambil data gempa dari BMKG (Indonesia)
   * Note: BMKG API butuh penanganan CORS (Proxy) di production
   */
  async getBMKGData() {
    // Implementasi fetch ke BMKG
    // Seringkali membutuhkan server proxy untuk menghindari CORS di browser
    console.warn("BMKG API fetch not implemented due to CORS restriction in browser.");
    return null;
  }
}

export const earthquakeAPI = new EarthquakeAPI();