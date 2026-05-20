import { ADMIN_CATEGORY_THUMBNAILS_KEY, persistCategoryThumbnailOverrides } from '../data/homepageCategories';
import { apiUrl } from '../lib/api';

export const ADMIN_HOMEPAGE_BANNERS_KEY = 'admin_homepage_banners';
export const ADMIN_FLASH_DEALS_KEY = 'admin_homepage_flash_deals';
export const ADMIN_CARD_EDITS_KEY = 'admin_dashboard_card_edits';
export const ADMIN_CUSTOM_CARDS_KEY = 'admin_dashboard_custom_cards';
export const ADMIN_DELETED_CARDS_KEY = 'admin_dashboard_deleted_cards';

export interface HomeBanner {
  id: number;
  src: string;
  link: string;
}

export interface FlashDealCardConfig {
  productId: string;
  badgeText: string;
}

export interface FlashDealConfig {
  cards: FlashDealCardConfig[];
  endAt: string;
}

export interface SiteContent {
  categoryThumbnails: Record<string, string>;
  homepageBanners: HomeBanner[];
  flashDeals: FlashDealConfig;
  productCardEdits: Record<string, unknown>;
  customCards: unknown[];
  deletedProductIds: string[];
}

const EMPTY_SITE_CONTENT: SiteContent = {
  categoryThumbnails: {},
  homepageBanners: [],
  flashDeals: { cards: [], endAt: '' },
  productCardEdits: {},
  customCards: [],
  deletedProductIds: []
};

function readJson<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback;
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function writeJson(key: string, value: unknown): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // quota exceeded — runtime cache still applies this session
  }
}

export function readSiteContentFromClient(): SiteContent {
  if (typeof window === 'undefined') return EMPTY_SITE_CONTENT;

  const win = window as unknown as {
    __ADMIN_CATEGORY_THUMBNAILS__?: Record<string, string>;
    __ADMIN_HOMEPAGE_BANNERS__?: HomeBanner[];
    __ADMIN_FLASH_DEALS__?: FlashDealConfig;
    __ADMIN_PRODUCT_OVERRIDES__?: Record<string, unknown>;
    __ADMIN_CUSTOM_CARDS__?: unknown[];
    __ADMIN_DELETED_PRODUCT_IDS__?: string[];
  };

  const categoryFromStorage = readJson<Record<string, string>>(ADMIN_CATEGORY_THUMBNAILS_KEY, {});
  const categoryFromRuntime = win.__ADMIN_CATEGORY_THUMBNAILS__ ?? {};

  const bannersFromStorage = readJson<HomeBanner[]>(ADMIN_HOMEPAGE_BANNERS_KEY, []);
  const bannersFromRuntime = Array.isArray(win.__ADMIN_HOMEPAGE_BANNERS__) ? win.__ADMIN_HOMEPAGE_BANNERS__ : [];

  const flashFromStorage = readJson<FlashDealConfig>(ADMIN_FLASH_DEALS_KEY, { cards: [], endAt: '' });
  const flashFromRuntime =
    win.__ADMIN_FLASH_DEALS__ && typeof win.__ADMIN_FLASH_DEALS__ === 'object'
      ? win.__ADMIN_FLASH_DEALS__
      : { cards: [], endAt: '' };

  const editsFromStorage = readJson<Record<string, unknown>>(ADMIN_CARD_EDITS_KEY, {});
  const editsFromRuntime =
    win.__ADMIN_PRODUCT_OVERRIDES__ && typeof win.__ADMIN_PRODUCT_OVERRIDES__ === 'object'
      ? win.__ADMIN_PRODUCT_OVERRIDES__
      : {};

  const customFromStorage = readJson<unknown[]>(ADMIN_CUSTOM_CARDS_KEY, []);
  const customFromRuntime = Array.isArray(win.__ADMIN_CUSTOM_CARDS__) ? win.__ADMIN_CUSTOM_CARDS__ : [];

  const deletedFromStorage = readJson<string[]>(ADMIN_DELETED_CARDS_KEY, []);
  const deletedFromRuntime = Array.isArray(win.__ADMIN_DELETED_PRODUCT_IDS__)
    ? win.__ADMIN_DELETED_PRODUCT_IDS__
    : [];

  return {
    categoryThumbnails: { ...categoryFromStorage, ...categoryFromRuntime },
    homepageBanners: bannersFromRuntime.length ? bannersFromRuntime : bannersFromStorage,
    flashDeals: {
      cards: flashFromRuntime.cards?.length ? flashFromRuntime.cards : flashFromStorage.cards ?? [],
      endAt: flashFromRuntime.endAt || flashFromStorage.endAt || ''
    },
    productCardEdits: { ...editsFromStorage, ...editsFromRuntime },
    // Runtime may be [] after save/hydrate — must not resurrect stale localStorage.
    customCards: Array.isArray(customFromRuntime) ? customFromRuntime : customFromStorage,
    deletedProductIds: Array.isArray(deletedFromRuntime) ? deletedFromRuntime : deletedFromStorage
  };
}

export function applySiteContentToClient(content: SiteContent): void {
  if (typeof window === 'undefined') return;

  const win = window as unknown as {
    __ADMIN_CATEGORY_THUMBNAILS__?: Record<string, string>;
    __ADMIN_HOMEPAGE_BANNERS__?: HomeBanner[];
    __ADMIN_FLASH_DEALS__?: FlashDealConfig;
    __ADMIN_PRODUCT_OVERRIDES__?: Record<string, unknown>;
    __ADMIN_CUSTOM_CARDS__?: unknown[];
    __ADMIN_DELETED_PRODUCT_IDS__?: string[];
  };

  win.__ADMIN_CATEGORY_THUMBNAILS__ = content.categoryThumbnails;
  writeJson(ADMIN_CATEGORY_THUMBNAILS_KEY, content.categoryThumbnails);

  win.__ADMIN_HOMEPAGE_BANNERS__ = content.homepageBanners;
  writeJson(ADMIN_HOMEPAGE_BANNERS_KEY, content.homepageBanners);

  win.__ADMIN_FLASH_DEALS__ = content.flashDeals;
  writeJson(ADMIN_FLASH_DEALS_KEY, content.flashDeals);

  win.__ADMIN_PRODUCT_OVERRIDES__ = content.productCardEdits;
  writeJson(ADMIN_CARD_EDITS_KEY, content.productCardEdits);

  win.__ADMIN_CUSTOM_CARDS__ = content.customCards;
  writeJson(ADMIN_CUSTOM_CARDS_KEY, content.customCards);

  win.__ADMIN_DELETED_PRODUCT_IDS__ = content.deletedProductIds;
  writeJson(ADMIN_DELETED_CARDS_KEY, content.deletedProductIds);

  persistCategoryThumbnailOverrides(content.categoryThumbnails);
}

export async function fetchSiteContentFromServer(): Promise<SiteContent | null> {
  try {
    const response = await fetch(apiUrl('/api/site/content'));
    if (!response.ok) return null;
    const json = await response.json();
    if (!json?.success || !json.data) return null;
    const data = json.data;
    return {
      categoryThumbnails:
        data.categoryThumbnails && typeof data.categoryThumbnails === 'object'
          ? data.categoryThumbnails
          : {},
      homepageBanners: Array.isArray(data.homepageBanners) ? data.homepageBanners : [],
      flashDeals:
        data.flashDeals && typeof data.flashDeals === 'object'
          ? {
              cards: Array.isArray(data.flashDeals.cards) ? data.flashDeals.cards : [],
              endAt: typeof data.flashDeals.endAt === 'string' ? data.flashDeals.endAt : ''
            }
          : { cards: [], endAt: '' },
      productCardEdits:
        data.productCardEdits && typeof data.productCardEdits === 'object' ? data.productCardEdits : {},
      customCards: Array.isArray(data.customCards) ? data.customCards : [],
      deletedProductIds: Array.isArray(data.deletedProductIds) ? data.deletedProductIds : []
    };
  } catch {
    return null;
  }
}

export async function syncSiteContentToServer(content: SiteContent): Promise<boolean> {
  try {
    const response = await fetch(apiUrl('/api/site/content'), {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(content)
    });
    if (!response.ok) return false;
    const json = await response.json();
    return Boolean(json?.success);
  } catch {
    return false;
  }
}

function hasSiteContent(content: SiteContent): boolean {
  return (
    Object.keys(content.categoryThumbnails).length > 0 ||
    content.homepageBanners.length > 0 ||
    content.flashDeals.cards.length > 0 ||
    Boolean(content.flashDeals.endAt) ||
    Object.keys(content.productCardEdits).length > 0 ||
    content.customCards.length > 0 ||
    content.deletedProductIds.length > 0
  );
}

function mergeSiteContent(local: SiteContent, remote: SiteContent): SiteContent {
  const remoteEdits =
    remote.productCardEdits && typeof remote.productCardEdits === 'object' && !Array.isArray(remote.productCardEdits)
      ? remote.productCardEdits
      : {};
  return {
    categoryThumbnails: { ...local.categoryThumbnails, ...remote.categoryThumbnails },
    homepageBanners: remote.homepageBanners.length ? remote.homepageBanners : local.homepageBanners,
    flashDeals: {
      cards: remote.flashDeals.cards.length ? remote.flashDeals.cards : local.flashDeals.cards,
      endAt: remote.flashDeals.endAt || local.flashDeals.endAt
    },
    // Server is source of truth for dashboard card state (including empty arrays / cleared edits).
    productCardEdits: { ...remoteEdits },
    customCards: Array.isArray(remote.customCards) ? remote.customCards : [],
    deletedProductIds: Array.isArray(remote.deletedProductIds) ? remote.deletedProductIds : []
  };
}

/** Load from API and merge with local cache so every visitor sees the same admin content. */
export async function hydrateSiteContentFromServer(): Promise<void> {
  const remote = await fetchSiteContentFromServer();
  if (!remote) return;

  const local = readSiteContentFromClient();

  if (!hasSiteContent(remote) && hasSiteContent(local)) {
    await syncSiteContentToServer(local);
    applySiteContentToClient(local);
  } else {
    applySiteContentToClient(mergeSiteContent(local, remote));
  }

  window.dispatchEvent(new Event('siteContentUpdated'));
  window.dispatchEvent(new Event('productsUpdated'));
}

/** Apply locally and push to API so every device sees the same content. */
export async function persistAndSyncSiteContent(partial: Partial<SiteContent>): Promise<boolean> {
  const current = readSiteContentFromClient();
  const next: SiteContent = {
    categoryThumbnails: partial.categoryThumbnails ?? current.categoryThumbnails,
    homepageBanners: partial.homepageBanners ?? current.homepageBanners,
    flashDeals: partial.flashDeals ?? current.flashDeals,
    productCardEdits: partial.productCardEdits ?? current.productCardEdits,
    customCards: partial.customCards ?? current.customCards,
    deletedProductIds: partial.deletedProductIds ?? current.deletedProductIds
  };

  applySiteContentToClient(next);
  window.dispatchEvent(new Event('siteContentUpdated'));
  if (
    partial.productCardEdits !== undefined ||
    partial.customCards !== undefined ||
    partial.deletedProductIds !== undefined
  ) {
    window.dispatchEvent(new Event('productsUpdated'));
  }
  return syncSiteContentToServer(next);
}

/** Poll site content so dashboard image/card edits appear on the storefront within ~30s without a manual refresh. */
export const SITE_CONTENT_POLL_MS = 25_000;

let siteContentPollTimer: ReturnType<typeof setInterval> | null = null;
let siteContentVisibilityAttached = false;

function pollSiteContentIfVisible(): void {
  if (typeof document !== 'undefined' && document.hidden) return;
  void hydrateSiteContentFromServer();
}

function attachSiteContentVisibilityListener(): void {
  if (siteContentVisibilityAttached || typeof document === 'undefined') return;
  siteContentVisibilityAttached = true;
  document.addEventListener('visibilitychange', () => {
    if (!document.hidden) pollSiteContentIfVisible();
  });
}

export function startSiteContentSync(): void {
  if (typeof window === 'undefined' || siteContentPollTimer) return;
  siteContentPollTimer = setInterval(pollSiteContentIfVisible, SITE_CONTENT_POLL_MS);
  attachSiteContentVisibilityListener();
}

export function stopSiteContentSync(): void {
  if (siteContentPollTimer) {
    clearInterval(siteContentPollTimer);
    siteContentPollTimer = null;
  }
}
