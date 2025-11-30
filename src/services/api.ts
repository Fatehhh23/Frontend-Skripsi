// src/services/api.ts
import { API_ENDPOINTS } from '../constants/apiEndpoints';

// Header default untuk setiap request JSON
const headers = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
};

// Fungsi helper untuk handle response
async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `Request failed with status ${response.status}`);
  }
  return response.json();
}

/**
 * Wrapper untuk HTTP GET
 */
export async function get<T>(url: string): Promise<T> {
  const response = await fetch(url, { method: 'GET', headers });
  return handleResponse<T>(response);
}

/**
 * Wrapper untuk HTTP POST
 */
export async function post<T>(url: string, body: any): Promise<T> {
  const response = await fetch(url, {
    method: 'POST',
    headers,
    body: JSON.stringify(body),
  });
  return handleResponse<T>(response);
}

export const api = {
  get,
  post
};