export interface HomepageCategory {
  id: string;
  name: string;
  image: string;
}

export interface HomepageCategorySection {
  id: 'snacks-drinks' | 'grocery-kitchen' | 'beauty-personal-care';
  title: string;
  categories: HomepageCategory[];
  viewAllCategoryId: string;
}

export const ADMIN_CATEGORY_THUMBNAILS_KEY = 'admin_homepage_category_thumbnails';

const DEFAULT_SNACKS_AND_DRINKS: HomepageCategory[] = [
  { id: 'chips-namkeen', name: 'Chips &\nNamkeen', image: 'https://images.pexels.com/photos/533280/pexels-photo-533280.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop' },
  { id: 'sweets-chocolates', name: 'Sweets &\nChocolates', image: 'https://images.pexels.com/photos/65882/pexels-photo-65882.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop' },
  { id: 'drinks-juices', name: 'Drinks &\nJuices', image: 'https://images.pexels.com/photos/1622483767028-3f66f32aef97/pexels-photo-1622483767028-3f66f32aef97.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop' },
  { id: 'tea-coffee', name: 'Tea, Coffee\n& Milk Drinks', image: 'https://images.pexels.com/photos/1559525839-b184a4d698c7?w=400&h=400&fit=crop' },
  { id: 'instant-food', name: 'Instant Food', image: 'https://images.pexels.com/photos/1598514982205-f36b96d1e8d4?w=400&h=400&fit=crop' },
  { id: 'sauces-spreads', name: 'Sauces &\nSpreads', image: 'https://images.pexels.com/photos/143133/pexels-photo-143133.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop' },
  { id: 'paan-corner', name: 'Paan Corner', image: 'https://images.pexels.com/photos/1628169829377-5264b7bd1608?w=400&h=400&fit=crop' },
  { id: 'ice-creams', name: 'Ice Creams &\nMore', image: 'https://images.pexels.com/photos/1557142046-c704a3adf8f7?w=400&h=400&fit=crop' }
];

const DEFAULT_GROCERY_AND_KITCHEN: HomepageCategory[] = [
  { id: 'vegetables-fruits', name: 'Vegetables &\nFruits', image: 'https://images.pexels.com/photos/533280/pexels-photo-533280.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop' },
  { id: 'atta-rice-dal', name: 'Atta, Rice &\nDal', image: 'https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop' },
  { id: 'oil-ghee-masala', name: 'Oil, Ghee &\nMasala', image: '/assets/images/amul-ghee.jpg' },
  { id: 'dairy-bread-eggs', name: 'Dairy, Bread &\nEggs', image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400&h=400&fit=crop' },
  { id: 'bakery-biscuits', name: 'Bakery &\nBiscuits', image: 'https://images.pexels.com/photos/230325/pexels-photo-230325.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop' },
  { id: 'dry-fruits-cereals', name: 'Dry Fruits &\nCereals', image: 'https://images.pexels.com/photos/4198370/pexels-photo-4198370.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop' },
  { id: 'chicken-meat-fish', name: 'Chicken,\nMeat & Fish', image: 'https://images.pexels.com/photos/2338377/pexels-photo-2338377.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop' },
  { id: 'kitchenware-appliances', name: 'Kitchenware &\nAppliances', image: 'https://images.pexels.com/photos/2724749/pexels-photo-2724749.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop' }
];

const DEFAULT_BEAUTY_AND_PERSONAL_CARE: HomepageCategory[] = [
  { id: 'bath-body', name: 'Bath & Body', image: 'https://images.unsplash.com/photo-1629363447385-a7b37db457fc?w=400&h=400&fit=crop' },
  { id: 'hair', name: 'Hair', image: 'https://images.unsplash.com/photo-1526947425960-945c6e72858f?w=400&h=400&fit=crop' },
  { id: 'skin-face', name: 'Skin & Face', image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=400&h=400&fit=crop' },
  { id: 'beauty-cosmetics', name: 'Beauty &\nCosmetics', image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=400&fit=crop' },
  { id: 'feminine-hygiene', name: 'Feminine\nHygiene', image: 'https://images.unsplash.com/photo-1620608643809-5626292376fb?w=400&h=400&fit=crop' },
  { id: 'baby-care', name: 'Baby Care', image: 'https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=400&h=400&fit=crop' },
  { id: 'health-pharma', name: 'Health &\nPharma', image: 'https://images.unsplash.com/photo-1584308666744-24d5e169ddef?w=400&h=400&fit=crop' },
  { id: 'sexual-wellness', name: 'Sexual\nWellness', image: 'https://images.unsplash.com/photo-1614850715649-1d0106293cb1?w=400&h=400&fit=crop' }
];

export type CategoryThumbnailOverrides = Record<string, string>;

export function getCategoryThumbnailOverrides(): CategoryThumbnailOverrides {
  if (typeof window === 'undefined') return {};

  let fromStorage: CategoryThumbnailOverrides = {};
  try {
    const raw = localStorage.getItem(ADMIN_CATEGORY_THUMBNAILS_KEY);
    const parsed = raw ? JSON.parse(raw) : {};
    if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) {
      fromStorage = parsed as CategoryThumbnailOverrides;
    }
  } catch {
    fromStorage = {};
  }

  const runtime = (window as unknown as { __ADMIN_CATEGORY_THUMBNAILS__?: CategoryThumbnailOverrides })
    .__ADMIN_CATEGORY_THUMBNAILS__;
  const fromRuntime =
    runtime && typeof runtime === 'object' && !Array.isArray(runtime) ? runtime : {};

  return { ...fromStorage, ...fromRuntime };
}

export function persistCategoryThumbnailOverrides(next: CategoryThumbnailOverrides): void {
  if (typeof window === 'undefined') return;
  (window as unknown as { __ADMIN_CATEGORY_THUMBNAILS__: CategoryThumbnailOverrides }).__ADMIN_CATEGORY_THUMBNAILS__ =
    next;
  try {
    localStorage.setItem(ADMIN_CATEGORY_THUMBNAILS_KEY, JSON.stringify(next));
  } catch {
    // quota exceeded — runtime override still applies this session
  }
  window.dispatchEvent(new Event('siteContentUpdated'));
}

function mergeWithOverrides(categories: HomepageCategory[]): HomepageCategory[] {
  const overrides = getCategoryThumbnailOverrides();
  return categories.map((category) => {
    const custom = overrides[category.id];
    return {
      ...category,
      image: typeof custom === 'string' && custom.trim() ? custom.trim() : category.image
    };
  });
}

export function getSnacksAndDrinksCategories(): HomepageCategory[] {
  return mergeWithOverrides(DEFAULT_SNACKS_AND_DRINKS);
}

export function getGroceryAndKitchenCategories(): HomepageCategory[] {
  return mergeWithOverrides(DEFAULT_GROCERY_AND_KITCHEN);
}

export function getBeautyAndPersonalCareCategories(): HomepageCategory[] {
  return mergeWithOverrides(DEFAULT_BEAUTY_AND_PERSONAL_CARE);
}

export function getShopFromHereGroups(): HomepageCategorySection[] {
  return [
    {
      id: 'snacks-drinks',
      title: 'Snacks & Drinks',
      categories: getSnacksAndDrinksCategories(),
      viewAllCategoryId: 'chips-namkeen'
    },
    {
      id: 'grocery-kitchen',
      title: 'Grocery & Kitchen',
      categories: getGroceryAndKitchenCategories(),
      viewAllCategoryId: 'vegetables-fruits'
    },
    {
      id: 'beauty-personal-care',
      title: 'Beauty & Personal Care',
      categories: getBeautyAndPersonalCareCategories(),
      viewAllCategoryId: 'bath-body'
    }
  ];
}

/** For admin dashboard — default image per category id */
export function getDefaultCategoryImage(categoryId: string): string {
  const all = [...DEFAULT_SNACKS_AND_DRINKS, ...DEFAULT_GROCERY_AND_KITCHEN, ...DEFAULT_BEAUTY_AND_PERSONAL_CARE];
  return all.find((c) => c.id === categoryId)?.image || '';
}

export const HOMEPAGE_CATEGORY_SECTIONS_FOR_ADMIN: Array<{
  id: HomepageCategorySection['id'];
  title: string;
  categories: HomepageCategory[];
}> = [
  { id: 'snacks-drinks', title: 'Snacks & Drinks', categories: DEFAULT_SNACKS_AND_DRINKS },
  { id: 'grocery-kitchen', title: 'Grocery & Kitchen', categories: DEFAULT_GROCERY_AND_KITCHEN },
  { id: 'beauty-personal-care', title: 'Beauty & Personal Care', categories: DEFAULT_BEAUTY_AND_PERSONAL_CARE }
];
