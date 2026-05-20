import { getProductById, getProductsByCategory } from '../data/products';

const preloaded = new Set<string>();
const headPreloaded = new Set<string>();

const BATCH_SIZE = 10;

let idleQueue: string[] = [];
let batchScheduled = false;

function scheduleIdleWork(run: () => void): void {
  if (typeof window === 'undefined') return;
  if ('requestIdleCallback' in window) {
    window.requestIdleCallback(() => run(), { timeout: 2500 });
  } else {
    window.setTimeout(run, 20);
  }
}

function drainQueue(): void {
  batchScheduled = false;
  const batch = idleQueue.splice(0, BATCH_SIZE);
  batch.forEach((url) => preloadImageUrl(url));
  if (idleQueue.length > 0) {
    batchScheduled = true;
    scheduleIdleWork(drainQueue);
  }
}

function enqueueUrls(urls: string[]): void {
  for (const url of urls) {
    if (!url || preloaded.has(url)) continue;
    idleQueue.push(url);
  }
  if (!batchScheduled && idleQueue.length > 0) {
    batchScheduled = true;
    scheduleIdleWork(drainQueue);
  }
}

export function preloadImageUrl(url: string): void {
  if (!url || preloaded.has(url)) return;
  preloaded.add(url);
  const img = new Image();
  img.decoding = 'async';
  img.src = url;
}

export function preloadImageUrls(urls: string[]): void {
  urls.forEach(preloadImageUrl);
}

/** High-priority first, then rest in idle batches (keeps UI smooth) */
export function preloadImageUrlsQueued(urls: string[], immediateCount = 16): void {
  const unique = [...new Set(urls.filter(Boolean))];
  const immediate = unique.slice(0, immediateCount);
  const deferred = unique.slice(immediateCount);
  preloadImageUrls(immediate);
  enqueueUrls(deferred);
}

export function injectHeadImagePreload(url: string): void {
  if (!url || typeof document === 'undefined' || headPreloaded.has(url)) return;
  headPreloaded.add(url);
  const existing = document.querySelector(`link[data-preload-img="${CSS.escape(url)}"]`);
  if (existing) return;
  const link = document.createElement('link');
  link.rel = 'preload';
  link.as = 'image';
  link.href = url;
  link.setAttribute('data-preload-img', url);
  document.head.appendChild(link);
}

export function prefetchProduct(productId: string): void {
  const product = getProductById(productId);
  if (product?.image) preloadImageUrl(product.image);
}

export function prefetchCategory(categoryId: string): void {
  const products = getProductsByCategory(categoryId).slice(0, 24);
  preloadImageUrls(products.map((p) => p.image).filter(Boolean));
}

export type HomepagePreloadInput = {
  productImages: string[];
  bannerSrcs: string[];
  categoryImages: string[];
};

export function preloadHomepageAssets(input: HomepagePreloadInput): void {
  const { productImages, bannerSrcs, categoryImages } = input;

  bannerSrcs.forEach((src, index) => {
    if (!src?.trim()) return;
    if (index === 0) injectHeadImagePreload(src);
    preloadImageUrl(src);
  });

  preloadImageUrls(categoryImages.slice(0, 12));
  preloadImageUrlsQueued([...productImages, ...categoryImages.slice(12)], 24);
}
