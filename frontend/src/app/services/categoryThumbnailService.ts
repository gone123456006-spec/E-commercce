import type { CategoryThumbnailOverrides } from '../data/homepageCategories';
import { persistAndSyncSiteContent, hydrateSiteContentFromServer } from './siteContentService';

export async function hydrateCategoryThumbnailsFromServer(): Promise<void> {
  await hydrateSiteContentFromServer();
}

export async function syncCategoryThumbnails(
  thumbnails: CategoryThumbnailOverrides
): Promise<boolean> {
  return persistAndSyncSiteContent({ categoryThumbnails: thumbnails });
}
