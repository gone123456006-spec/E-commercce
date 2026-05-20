import type { Product } from '../data/products';
import { apiUrl } from '../lib/api';

export const PRODUCT_POLL_MS = 5000;
export const PRODUCT_VISIBILITY_DELAY_MS = 5000;

export interface CreateProductPayload {
  name: string;
  description?: string;
  price: number;
  category: string;
  group?: string;
  image?: string;
  stock?: number;
  unit?: string;
  unitValue?: number;
}

type ApiProductRecord = {
  _id: string;
  name: string;
  description?: string;
  price: number;
  category: string;
  group?: string;
  image?: string;
  stock?: number;
};

export type CreateProductResult =
  | { ok: true; product: Product }
  | { ok: false; error: string };

const isMongoId = (id: string) => /^[a-f\d]{24}$/i.test(id);

export function mapApiProductToProduct(record: ApiProductRecord): Product {
  return {
    id: record._id,
    name: record.name,
    price: Number(record.price) || 0,
    rating: 5,
    category: record.category,
    image: record.image || '',
    description: record.description || '',
    stock: typeof record.stock === 'number' ? record.stock : 0
  };
}

const API_PRODUCTS_SESSION_KEY = 'api_products_cache_v1';

function productsFingerprint(list: Product[]): string {
  return list.map((p) => `${p.id}:${p.price}:${p.stock}:${p.image}`).join('|');
}

function readSessionApiProducts(): Product[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = sessionStorage.getItem(API_PRODUCTS_SESSION_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as Product[]) : [];
  } catch {
    return [];
  }
}

function writeSessionApiProducts(products: Product[]): void {
  if (typeof window === 'undefined') return;
  try {
    sessionStorage.setItem(API_PRODUCTS_SESSION_KEY, JSON.stringify(products));
  } catch {
    // sessionStorage may be full or unavailable
  }
}

function setApiProductsCache(products: Product[], dispatchUpdate: boolean): void {
  if (typeof window === 'undefined') return;
  const win = window as unknown as { __API_PRODUCTS__?: Product[] };
  const prevFingerprint = productsFingerprint(win.__API_PRODUCTS__ ?? []);
  const nextFingerprint = productsFingerprint(products);

  win.__API_PRODUCTS__ = products;
  writeSessionApiProducts(products);

  if (dispatchUpdate && prevFingerprint !== nextFingerprint) {
    window.dispatchEvent(new Event('productsUpdated'));
  }
}

export function hydrateApiProductsFromSession(): void {
  const cached = readSessionApiProducts();
  if (cached.length === 0) return;
  setApiProductsCache(cached, true);
}

export function getApiProductsCache(): Product[] {
  if (typeof window === 'undefined') return [];
  const cached = (window as unknown as { __API_PRODUCTS__?: Product[] }).__API_PRODUCTS__;
  return Array.isArray(cached) ? cached : [];
}

export async function fetchApiProducts(): Promise<Product[]> {
  try {
    const response = await fetch(apiUrl('/api/products'));
    if (!response.ok) return getApiProductsCache();

    const json = await response.json();
    if (!json?.success || !Array.isArray(json.data)) return getApiProductsCache();

    const mapped = json.data.map((item: ApiProductRecord) => mapApiProductToProduct(item));
    setApiProductsCache(mapped, true);
    return mapped;
  } catch {
    return getApiProductsCache();
  }
}

export async function createApiProduct(payload: CreateProductPayload): Promise<CreateProductResult> {
  try {
    const response = await fetch(apiUrl('/api/products'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    const json = await response.json().catch(() => ({}));

    if (!response.ok) {
      return {
        ok: false,
        error: typeof json?.message === 'string' ? json.message : `Could not save product (${response.status})`
      };
    }

    if (!json?.success || !json.data) {
      return { ok: false, error: 'Server did not return the saved product.' };
    }

    return { ok: true, product: mapApiProductToProduct(json.data as ApiProductRecord) };
  } catch {
    return {
      ok: false,
      error: 'Cannot reach the server. Start the backend or set VITE_API_BASE_URL on your deployed site.'
    };
  }
}

export async function updateApiProduct(
  id: string,
  payload: Partial<CreateProductPayload>
): Promise<boolean> {
  if (!isMongoId(id)) return false;

  try {
    const response = await fetch(apiUrl(`/api/products/${id}`), {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    return response.ok;
  } catch {
    return false;
  }
}

export async function deleteApiProduct(id: string): Promise<boolean> {
  if (!isMongoId(id)) return false;

  try {
    const response = await fetch(apiUrl(`/api/products/${id}`), {
      method: 'DELETE'
    });
    return response.ok;
  } catch {
    return false;
  }
}

/** Refetch after server visibility delay so all devices pick up the new product */
export function scheduleVisibilityRefresh(): void {
  const delays = [PRODUCT_VISIBILITY_DELAY_MS + 500, PRODUCT_VISIBILITY_DELAY_MS + 2500];
  delays.forEach((ms) => {
    window.setTimeout(() => {
      void fetchApiProducts();
    }, ms);
  });
}

let pollTimer: ReturnType<typeof setInterval> | null = null;

export function startProductsSync(): void {
  if (typeof window === 'undefined' || pollTimer) return;

  hydrateApiProductsFromSession();
  void fetchApiProducts();
  pollTimer = setInterval(() => {
    void fetchApiProducts();
  }, PRODUCT_POLL_MS);
}

export function stopProductsSync(): void {
  if (pollTimer) {
    clearInterval(pollTimer);
    pollTimer = null;
  }
}
