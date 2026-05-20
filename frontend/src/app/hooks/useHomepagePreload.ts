import { useEffect, useMemo } from 'react';
import { preloadHomepageAssets, type HomepagePreloadInput } from '../utils/imagePreload';

type ProductLike = { image?: string };

type UseHomepagePreloadOptions = {
  products: ProductLike[];
  banners: Array<{ src?: string }>;
  categoryImages: string[];
  sectionProducts?: ProductLike[][];
};

function collectImages(products: ProductLike[]): string[] {
  return products.map((p) => p.image).filter((url): url is string => Boolean(url?.trim()));
}

export function useHomepagePreload({
  products,
  banners,
  categoryImages,
  sectionProducts = [],
}: UseHomepagePreloadOptions): void {
  const payload = useMemo((): HomepagePreloadInput => {
    const sectionImages = sectionProducts.flatMap(collectImages);
    const allProductImages = [...collectImages(products), ...sectionImages];
    return {
      productImages: [...new Set(allProductImages)],
      bannerSrcs: banners.map((b) => b.src).filter((s): s is string => Boolean(s?.trim())),
      categoryImages: [...new Set(categoryImages.filter(Boolean))],
    };
  }, [products, banners, categoryImages, sectionProducts]);

  useEffect(() => {
    preloadHomepageAssets(payload);
  }, [payload]);

  useEffect(() => {
    const onProductsUpdated = () => preloadHomepageAssets(payload);
    window.addEventListener('productsUpdated', onProductsUpdated);
    return () => window.removeEventListener('productsUpdated', onProductsUpdated);
  }, [payload]);
}
