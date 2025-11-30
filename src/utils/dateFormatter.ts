// src/utils/dateFormatter.ts

/**
 * Memformat objek Date atau string ISO ke format Indonesia lengkap
 * Contoh: "Senin, 12 Agustus 2025 pukul 14.30 WIB"
 */
export const formatDateTime = (dateInput: string | Date): string => {
  const date = new Date(dateInput);
  
  return new Intl.DateTimeFormat('id-ID', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZoneName: 'short',
    timeZone: 'Asia/Jakarta' // WIB
  }).format(date);
};

/**
 * Memformat tanggal ke format pendek untuk tabel/grafik
 * Contoh: "12/08/2025 14:30"
 */
export const formatShortDateTime = (dateInput: string | Date): string => {
  const date = new Date(dateInput);
  
  return new Intl.DateTimeFormat('id-ID', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
};

/**
 * Mengubah durasi (menit) menjadi teks yang mudah dibaca
 * Contoh: 65 -> "1 jam 5 menit"
 */
export const formatDuration = (minutes: number): string => {
  if (minutes < 60) return `${Math.round(minutes)} menit`;
  
  const hrs = Math.floor(minutes / 60);
  const mins = Math.round(minutes % 60);
  return `${hrs} jam ${mins > 0 ? `${mins} menit` : ''}`;
};