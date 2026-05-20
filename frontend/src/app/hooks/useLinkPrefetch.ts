import { useEffect } from 'react';
import { prefetchCategory, prefetchProduct } from '../utils/imagePreload';

let lastPrefetchAt = 0;
const PREFETCH_COOLDOWN_MS = 400;

function shouldPrefetch(): boolean {
  if (typeof document === 'undefined') return false;
  if (document.hidden) return false;
  if (Date.now() - lastPrefetchAt < PREFETCH_COOLDOWN_MS) return false;
  const conn = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
  if (conn?.saveData) return false;
  return true;
}

function handlePrefetchTarget(target: EventTarget | null): void {
  if (!shouldPrefetch() || !(target instanceof Element)) return;

  const productLink = target.closest('a[href^="/product/"]');
  if (productLink instanceof HTMLAnchorElement) {
    const id = productLink.pathname.split('/').pop();
    if (id) {
      lastPrefetchAt = Date.now();
      prefetchProduct(id);
    }
    return;
  }

  const categoryLink = target.closest('a[href^="/category/"]');
  if (categoryLink instanceof HTMLAnchorElement) {
    const id = categoryLink.pathname.split('/').pop();
    if (id) {
      lastPrefetchAt = Date.now();
      prefetchCategory(id);
    }
  }
}

/** Prefetch product/category images on hover or touch (throttled) */
export function useLinkPrefetch(): void {
  useEffect(() => {
    const onPointerOver = (event: PointerEvent) => handlePrefetchTarget(event.target);
    const onTouchStart = (event: TouchEvent) => handlePrefetchTarget(event.target);

    document.addEventListener('pointerover', onPointerOver, { passive: true });
    document.addEventListener('touchstart', onTouchStart, { passive: true });
    return () => {
      document.removeEventListener('pointerover', onPointerOver);
      document.removeEventListener('touchstart', onTouchStart);
    };
  }, []);
}
