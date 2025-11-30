// src/types/index.ts
// Export semua types dari file terpisah

export * from './simulation';
export * from './map';
export * from './api';

// Common types
export interface User {
  id: string;
  email: string;
  name: string;
  role?: 'admin' | 'user';
}

export interface ValidationError {
  field: string;
  message: string;
}

export interface PaginationParams {
  page: number;
  limit: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  totalPages: number;
}