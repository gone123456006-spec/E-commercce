/** Backend base URL — LAN-friendly in dev (uses same host as the page, port 5000) */
function resolveApiBaseUrl(): string {
  const fromEnv = import.meta.env.VITE_API_BASE_URL as string | undefined;

  if (!import.meta.env.DEV) {
    return fromEnv || 'https://ecommerce-api-6y9p.onrender.com';
  }

  if (typeof window !== 'undefined') {
    const host = window.location.hostname;
    if (host && host !== 'localhost' && host !== '127.0.0.1') {
      return `http://${host}:5000`;
    }
  }

  if (fromEnv && !fromEnv.includes('localhost') && !fromEnv.includes('127.0.0.1')) {
    return fromEnv;
  }

  // Same machine: Vite proxy → localhost:5000
  return '';
}

export const API_BASE_URL = resolveApiBaseUrl();

export const apiUrl = (path: string) => `${API_BASE_URL}${path}`;
