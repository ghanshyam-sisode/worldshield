// In dev, Vite proxies /api -> http://127.0.0.1:8000/api (no CORS needed)
// In production, set VITE_API_BASE_URL to the deployed backend URL
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api/v1';

export async function fetchApi(endpoint: string, options: RequestInit = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  const response = await fetch(url, {
    ...options,
    headers,
  });

  if (!response.ok) {
    let errorData;
    try {
      errorData = await response.json();
    } catch (e) {
      errorData = { message: 'An unknown error occurred' };
    }
    throw new Error(errorData.error?.message || errorData.message || response.statusText);
  }

  return response.json();
}
