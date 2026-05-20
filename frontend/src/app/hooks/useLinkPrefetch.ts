import { useEffect } from 'react';
import { prefetchCategory, prefetchProduct } from '../utils/imagePreload';

function handlePrefetchTarget(target: EventTarget | null): void {
  if (!(target instanceof Element)) return;

  const productLink = target.closest('a[href^="/product/"]');
  if (productLink instanceof HTMLAnchorElement) {
    const id = productLink.pathname.split('/').pop();
    if (id) prefetchProduct(id);
    return;
  }

  const categoryLink = target.closest('a[href^="/category/"]');
  if (categoryLink instanceof HTMLAnchorElement) {
    const id = categoryLink.pathname.split('/').pop();
    if (id) prefetchCategory(id);
  }
}

/** Prefetch product/category images on hover or touch (mobile) */
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
