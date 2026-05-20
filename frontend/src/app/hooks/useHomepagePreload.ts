import { useEffect, useMemo } from 'react';
import { preloadHomepageAssets, type HomepagePreloadInput } from '../utils/imagePreload';

type ProductLike = { image?: string };

type UseHomepagePreloadOptions = {
  banners: Array<{ src?: string }>;
  categoryImages: string[];
  sectionProducts?: ProductLike[][];
};

const MAX_PRELOAD_IMAGES = 36;

function collectImages(products: ProductLike[]): string[] {
  return products.map((p) => p.image).filter((url): url is string => Boolean(url?.trim()));
}

export function useHomepagePreload({
  banners,
  categoryImages,
  sectionProducts = [],
}: UseHomepagePreloadOptions): void {
  const payload = useMemo((): HomepagePreloadInput => {
    const sectionImages = sectionProducts.flatMap(collectImages);
    return {
      productImages: [...new Set(sectionImages)].slice(0, MAX_PRELOAD_IMAGES),
      bannerSrcs: banners.map((b) => b.src).filter((s): s is string => Boolean(s?.trim())),
      categoryImages: [...new Set(categoryImages.filter(Boolean))].slice(0, 16),
    };
  }, [banners, categoryImages, sectionProducts]);

  useEffect(() => {
    preloadHomepageAssets(payload);
  }, [payload]);
}
