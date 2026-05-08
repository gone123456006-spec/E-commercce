import { useState, useEffect, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ChevronRight, ChevronLeft, ShoppingBag, Truck, ShieldCheck, BadgeCheck, Star } from 'lucide-react';
import { getProductById, getProducts } from '../data/products';
import { addToCart, getCart, getOrders } from '../utils/storage';
import { toast } from 'sonner';

const ADMIN_HOMEPAGE_BANNERS_KEY = 'admin_homepage_banners';
const ADMIN_FLASH_DEALS_KEY = 'admin_homepage_flash_deals';

const defaultBanners = [
  { id: 1, src: '/assets/images/Banner 1 .png', link: '/' },
  { id: 2, src: '/assets/images/Banner 2.png', link: '/' },
  { id: 3, src: '/assets/images/Banner 3.png', link: '/' },
  { id: 4, src: '/assets/images/Banner 4.png', link: '/' },
  { id: 5, src: '/assets/images/Banner 5.png', link: '/' },
  { id: 7, src: '/assets/images/Banner 7.png', link: '/' },
];

const getHomeBanners = () => {
  if (typeof window === 'undefined') return defaultBanners;
  const runtimeBanners = (window as any).__ADMIN_HOMEPAGE_BANNERS__;
  if (Array.isArray(runtimeBanners) && runtimeBanners.length > 0) {
    return runtimeBanners;
  }
  try {
    const raw = localStorage.getItem(ADMIN_HOMEPAGE_BANNERS_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    if (!Array.isArray(parsed) || parsed.length === 0) return defaultBanners;
    return parsed.filter((banner) => banner && typeof banner.src === 'string' && banner.src.trim());
  } catch {
    return defaultBanners;
  }
};

interface FlashDealConfig {
  cards: Array<{ productId: string; badgeText?: string }>;
  endAt?: string;
}

const getFlashDealConfig = (): FlashDealConfig => {
  if (typeof window === 'undefined') return { cards: [] };
  const runtime = (window as any).__ADMIN_FLASH_DEALS__;
  if (runtime && typeof runtime === 'object') {
    return {
      cards: Array.isArray(runtime.cards) ? runtime.cards : [],
      endAt: typeof runtime.endAt === 'string' ? runtime.endAt : ''
    };
  }
  try {
    const raw = localStorage.getItem(ADMIN_FLASH_DEALS_KEY);
    const parsed = raw ? JSON.parse(raw) : {};
    return {
      cards: Array.isArray(parsed?.cards) ? parsed.cards : [],
      endAt: typeof parsed?.endAt === 'string' ? parsed.endAt : ''
    };
  } catch {
    return { cards: [] };
  }
};

const categories = [
  {
    id: 'chips-namkeen',
    name: 'Snacks & Drinks',
    image: 'https://images.unsplash.com/photo-1568909344668-6f14a07b56a0?w=1080&h=720&fit=crop',
    description: 'Tasty snacks and cool drinks'
  },
  {
    id: 'vegetables-fruits',
    name: 'Grocery & Kitchen',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=1080&h=720&fit=crop',
    description: 'Daily grocery and kitchen needs'
  },
  {
    id: 'food',
    name: 'Food',
    image: 'https://images.unsplash.com/photo-1610636996379-4d184e2ef20a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMGZvb2QlMjBncm9jZXJpZXN8ZW58MXx8fHwxNzcwMzk0MDM4fDA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Fresh & organic'
  }
];

const snacksAndDrinksCategories = [
  {
    id: 'chips-namkeen',
    name: 'Chips &\nNamkeen',
    image: 'https://images.unsplash.com/photo-1568909344668-6f14a07b56a0?w=400&h=400&fit=crop'
  },
  {
    id: 'sweets-chocolates',
    name: 'Sweets &\nChocolates',
    image: 'https://images.unsplash.com/photo-1548843268-de31c26284de?w=400&h=400&fit=crop'
  },
  {
    id: 'drinks-juices',
    name: 'Drinks &\nJuices',
    image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=400&h=400&fit=crop'
  },
  {
    id: 'tea-coffee',
    name: 'Tea, Coffee\n& Milk Drinks',
    image: 'https://images.unsplash.com/photo-1559525839-b184a4d698c7?w=400&h=400&fit=crop'
  },
  {
    id: 'instant-food',
    name: 'Instant Food',
    image: 'https://images.unsplash.com/photo-1598514982205-f36b96d1e8d4?w=400&h=400&fit=crop'
  },
  {
    id: 'sauces-spreads',
    name: 'Sauces &\nSpreads',
    image: 'https://images.unsplash.com/photo-1528751014936-863e6e8a4a5b?w=400&h=400&fit=crop'
  },
  {
    id: 'paan-corner',
    name: 'Paan Corner',
    image: 'https://images.unsplash.com/photo-1628169829377-5264b7bd1608?w=400&h=400&fit=crop'
  },
  {
    id: 'ice-creams',
    name: 'Ice Creams &\nMore',
    image: 'https://images.unsplash.com/photo-1557142046-c704a3adf8f7?w=400&h=400&fit=crop'
  }
];






const groceryAndKitchenCategories = [
  {
    id: 'vegetables-fruits',
    name: 'Vegetables &\nFruits',
    image: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=400&h=400&fit=crop'
  },
  {
    id: 'atta-rice-dal',
    name: 'Atta, Rice &\nDal',
    image: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/481977a.jpg'
  },
  {
    id: 'oil-ghee-masala',
    name: 'Oil, Ghee &\nMasala',
    image: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/190a.jpg'
  },
  {
    id: 'dairy-bread-eggs',
    name: 'Dairy, Bread &\nEggs',
    image: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/14a.jpg'
  },
  {
    id: 'bakery-biscuits',
    name: 'Bakery &\nBiscuits',
    image: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/496979a.jpg'
  },
  {
    id: 'dry-fruits-cereals',
    name: 'Dry Fruits &\nCereals',
    image: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/images/products/sliding_image/105655a.jpg'
  },
  {
    id: 'chicken-meat-fish',
    name: 'Chicken,\nMeat & Fish',
    image: 'https://images.unsplash.com/photo-1587593810167-a84920ea0781?w=400&h=400&fit=crop'
  },
  {
    id: 'kitchenware-appliances',
    name: 'Kitchenware &\nAppliances',
    image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=400&h=400&fit=crop'
  }
];

const beautyAndPersonalCareCategories = [
  {
    id: 'bath-body',
    name: 'Bath & Body',
    image: 'https://images.unsplash.com/photo-1629363447385-a7b37db457fc?w=400&h=400&fit=crop'
  },
  {
    id: 'hair',
    name: 'Hair',
    image: 'https://images.unsplash.com/photo-1526947425960-945c6e72858f?w=400&h=400&fit=crop'
  },
  {
    id: 'skin-face',
    name: 'Skin & Face',
    image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=400&h=400&fit=crop'
  },
  {
    id: 'beauty-cosmetics',
    name: 'Beauty &\nCosmetics',
    image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=400&fit=crop'
  },
  {
    id: 'feminine-hygiene',
    name: 'Feminine\nHygiene',
    image: 'https://images.unsplash.com/photo-1620608643809-5626292376fb?w=400&h=400&fit=crop'
  },
  {
    id: 'baby-care',
    name: 'Baby Care',
    image: 'https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=400&h=400&fit=crop'
  },
  {
    id: 'health-pharma',
    name: 'Health &\nPharma',
    image: 'https://images.unsplash.com/photo-1584308666744-24d5e169ddef?w=400&h=400&fit=crop'
  },
  {
    id: 'sexual-wellness',
    name: 'Sexual\nWellness',
    image: 'https://images.unsplash.com/photo-1614850715649-1d0106293cb1?w=400&h=400&fit=crop'
  }
];

const shopFromHereGroups = [
  {
    id: 'snacks-drinks',
    title: 'Snacks & Drinks',
    categories: snacksAndDrinksCategories,
    viewAllCategoryId: 'chips-namkeen'
  },
  {
    id: 'grocery-kitchen',
    title: 'Grocery & Kitchen',
    categories: groceryAndKitchenCategories,
    viewAllCategoryId: 'vegetables-fruits'
  },
  {
    id: 'beauty-personal-care',
    title: 'Beauty & Personal Care',
    categories: beautyAndPersonalCareCategories,
    viewAllCategoryId: 'bath-body'
  }
];

const seasonalCampaigns = [
  {
    title: 'Summer Saver Week',
    subtitle: 'Cool drinks and essentials at better prices',
    cta: '/category/drinks-juices',
    image: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=1200&h=600&fit=crop'
  },
  {
    title: 'Wellness Days',
    subtitle: 'Personal care and health picks this week',
    cta: '/category/health-pharma',
    image: 'https://images.unsplash.com/photo-1505576399279-565b52d4ac71?w=1200&h=600&fit=crop'
  },
  {
    title: 'Kitchen Stock-Up',
    subtitle: 'Daily grocery staples for every home',
    cta: '/category/atta-rice-dal',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=1200&h=600&fit=crop'
  }
];
const RECENTLY_VIEWED_KEY = 'recently_viewed_products';
const SEARCH_HISTORY_KEY = 'homepage_search_history';
const topBrands = [
  { id: 'all', label: 'All' },
  { id: 'snacks', label: 'SnackCo' },
  { id: 'grocery', label: 'GroceryMart' },
  { id: 'beauty', label: 'BeautyCare' },
  { id: 'wellness', label: 'Wellness+' }
];


export function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentBanner, setCurrentBanner] = useState(0);
  const [banners, setBanners] = useState(() => getHomeBanners());
  const [selectedQuantities, setSelectedQuantities] = useState<Record<string, number>>({});
  const [cartSubtotal, setCartSubtotal] = useState(0);
  const [brandFilter, setBrandFilter] = useState('all');
  const [countdownNow, setCountdownNow] = useState(Date.now());
  const [recentlyViewedIds, setRecentlyViewedIds] = useState<string[]>(() => {
    try {
      const raw = localStorage.getItem(RECENTLY_VIEWED_KEY);
      const parsed = raw ? JSON.parse(raw) : [];
      return Array.isArray(parsed) ? parsed.filter((id) => typeof id === 'string') : [];
    } catch {
      return [];
    }
  });
  const [searchHistory, setSearchHistory] = useState<string[]>(() => {
    try {
      const raw = localStorage.getItem(SEARCH_HISTORY_KEY);
      const parsed = raw ? JSON.parse(raw) : [];
      return Array.isArray(parsed) ? parsed.filter((term) => typeof term === 'string') : [];
    } catch {
      return [];
    }
  });
  const [flashDealConfig, setFlashDealConfig] = useState<FlashDealConfig>(() => getFlashDealConfig());
  const [, setProductVersion] = useState(0);
  const navigate = useNavigate();
  const liveProducts = getProducts();
  const orders = getOrders();

  const averageRating = useMemo(() => {
    if (liveProducts.length === 0) return 0;
    const sum = liveProducts.reduce((acc, p) => acc + p.rating, 0);
    return sum / liveProducts.length;
  }, [liveProducts]);

  const seasonalCampaign = seasonalCampaigns[new Date().getDate() % seasonalCampaigns.length];

  const flashDealProducts = useMemo(
    () => {
      if (flashDealConfig.cards.length > 0) {
        return flashDealConfig.cards
          .map((c) => liveProducts.find((p) => p.id === c.productId))
          .filter((p): p is NonNullable<typeof p> => Boolean(p))
          .slice(0, 10);
      }
      return liveProducts
        .filter((p) => p.stock <= 20 || p.rating >= 4.8)
        .sort((a, b) => a.stock - b.stock || b.rating - a.rating)
        .slice(0, 10);
    },
    [liveProducts, flashDealConfig]
  );

  const buyAgainProducts = useMemo(() => {
    const score = new Map<string, number>();
    orders.forEach((order) => {
      order.items.forEach((item) => score.set(item.productId, (score.get(item.productId) || 0) + item.quantity));
    });
    return Array.from(score.entries())
      .sort((a, b) => b[1] - a[1])
      .map(([id]) => liveProducts.find((p) => p.id === id))
      .filter((p): p is NonNullable<typeof p> => Boolean(p))
      .slice(0, 10);
  }, [orders, liveProducts]);

  const recentlyViewedProducts = useMemo(() => {
    const fromViewed = recentlyViewedIds
      .map((id) => liveProducts.find((p) => p.id === id))
      .filter((p): p is NonNullable<typeof p> => Boolean(p));
    if (fromViewed.length > 0) return fromViewed.slice(0, 10);
    const fromCart = getCart().map((item) => liveProducts.find((p) => p.id === item.productId)).filter((p): p is NonNullable<typeof p> => Boolean(p));
    return fromCart.slice(0, 10);
  }, [liveProducts, cartSubtotal, recentlyViewedIds]);

  const recommendedProducts = useMemo(() => {
    if (searchHistory.length > 0) {
      const terms = searchHistory.slice(0, 5).map((t) => t.toLowerCase());
      const bySearch = liveProducts.filter((p) => {
        const haystack = `${p.name} ${p.description} ${p.category}`.toLowerCase();
        return terms.some((term) => haystack.includes(term));
      });
      if (bySearch.length > 0) return bySearch.slice(0, 10);
    }
    const orderedCategories = new Set<string>();
    orders.forEach((order) => {
      order.items.forEach((item) => {
        const p = liveProducts.find((prod) => prod.id === item.productId);
        if (p) orderedCategories.add(p.category);
      });
    });
    const base = liveProducts.filter((p) => orderedCategories.has(p.category));
    return (base.length ? base : liveProducts).slice(0, 10);
  }, [orders, liveProducts, searchHistory]);

  const brandFilteredProducts = useMemo(() => {
    if (brandFilter === 'all') return liveProducts.slice(0, 14);
    if (brandFilter === 'snacks') return liveProducts.filter((p) => snacksAndDrinksCategories.some((c) => c.id === p.category)).slice(0, 14);
    if (brandFilter === 'grocery') return liveProducts.filter((p) => groceryAndKitchenCategories.some((c) => c.id === p.category)).slice(0, 14);
    if (brandFilter === 'beauty') return liveProducts.filter((p) => beautyAndPersonalCareCategories.some((c) => c.id === p.category)).slice(0, 14);
    return liveProducts.filter((p) => p.category.includes('health') || p.category.includes('wellness')).slice(0, 14);
  }, [brandFilter, liveProducts]);

  useEffect(() => {
    if (banners.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % banners.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [banners.length]);


  useEffect(() => {
    const onProductsUpdated = () => {
      setBanners(getHomeBanners());
      setFlashDealConfig(getFlashDealConfig());
      setProductVersion((v) => v + 1);
    };
    window.addEventListener('productsUpdated', onProductsUpdated);
    return () => window.removeEventListener('productsUpdated', onProductsUpdated);
  }, []);

  useEffect(() => {
    if (currentBanner >= banners.length) {
      setCurrentBanner(0);
    }
  }, [banners.length, currentBanner]);

  useEffect(() => {
    const syncSubtotal = () => {
      const subtotal = getCart().reduce((sum, item) => {
        const p = getProductById(item.productId);
        return sum + (p?.price || 0) * item.quantity;
      }, 0);
      setCartSubtotal(subtotal);
    };
    syncSubtotal();
    window.addEventListener('cartUpdated', syncSubtotal);
    window.addEventListener('storage', syncSubtotal);
    return () => {
      window.removeEventListener('cartUpdated', syncSubtotal);
      window.removeEventListener('storage', syncSubtotal);
    };
  }, []);

  useEffect(() => {
    const timer = window.setInterval(() => setCountdownNow(Date.now()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  const nextBanner = () => {
    if (banners.length === 0) return;
    setCurrentBanner((prev) => (prev + 1) % banners.length);
  };

  const prevBanner = () => {
    if (banners.length === 0) return;
    setCurrentBanner((prev) => (prev - 1 + banners.length) % banners.length);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const q = searchQuery.trim();
    if (q) {
      const nextHistory = [q, ...searchHistory.filter((term) => term.toLowerCase() !== q.toLowerCase())].slice(0, 10);
      setSearchHistory(nextHistory);
      try {
        localStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify(nextHistory));
      } catch {
        // no-op
      }
      navigate(`/search?q=${encodeURIComponent(q)}`);
    }
  };

  const trackProductView = (productId: string) => {
    const nextViewed = [productId, ...recentlyViewedIds.filter((id) => id !== productId)].slice(0, 20);
    setRecentlyViewedIds(nextViewed);
    try {
      localStorage.setItem(RECENTLY_VIEWED_KEY, JSON.stringify(nextViewed));
    } catch {
      // no-op
    }
  };

  const flashEndsAt = flashDealConfig.endAt ? new Date(flashDealConfig.endAt) : new Date();
  if (!flashDealConfig.endAt) {
    flashEndsAt.setHours(23, 59, 59, 999);
  }
  const remainingMs = Math.max(0, flashEndsAt.getTime() - countdownNow);
  const hrs = String(Math.floor(remainingMs / 3600000)).padStart(2, '0');
  const mins = String(Math.floor((remainingMs % 3600000) / 60000)).padStart(2, '0');
  const secs = String(Math.floor((remainingMs % 60000) / 1000)).padStart(2, '0');

  const updateSelectedQuantity = (productId: string, nextQuantity: number) => {
    setSelectedQuantities((prev) => ({
      ...prev,
      [productId]: Math.max(1, Math.min(10, nextQuantity))
    }));
  };

  const getSelectedQuantity = (productId: string) => selectedQuantities[productId] || 1;

  const handleAddToCart = (productId: string) => {
    const quantity = getSelectedQuantity(productId);
    addToCart(productId, quantity);
    window.dispatchEvent(new Event('cartUpdated'));
    toast.success(`Added ${quantity} item(s) to cart`);
  };

  return (
    <div className="min-h-screen bg-yellow-50/40">
      {/* Search Bar */}
      <div className="sticky top-14 sm:top-16 z-40 py-3 px-3 sm:py-4 sm:px-4">
        <div className="max-w-xl mx-auto">
          <form onSubmit={handleSearch}>
            <div className="relative flex items-center bg-white rounded-full shadow-sm overflow-hidden">
              <input
                type="search"
                inputMode="search"
                autoComplete="off"
                placeholder="Search for products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 min-w-0 px-3 py-2 sm:px-4 sm:py-2.5 bg-transparent text-gray-900 placeholder-gray-500 text-sm sm:text-base outline-none border-0 focus:ring-0"
              />
              <button
                type="submit"
                className="m-1 flex-shrink-0 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-green-600 active:scale-95 transition-all duration-200 text-yellow-100 flex items-center justify-center touch-manipulation hover:bg-green-500"
              >
                <Search className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Auto-Sliding Banner Section */}
      <div className="w-full max-w-7xl mx-auto px-3 sm:px-4 py-3 sm:py-4 md:py-6">
        <div className="relative group rounded-xl sm:rounded-2xl overflow-hidden shadow-lg bg-gray-100 h-[160px] sm:h-auto w-full">
          {banners.map((banner, idx) => (
            <Link
              key={idx}
              to={banner.link}
              className={`transition-opacity duration-500 ease-in-out block ${currentBanner === idx ? 'opacity-100 z-10' : 'opacity-0 z-0'
                } ${idx === 0 ? 'sm:relative absolute inset-0' : 'absolute inset-0'}`}
            >
              <img
                src={banner.src}
                alt={`Banner ${idx + 1}`}
                className="w-full h-full sm:h-auto object-cover sm:object-top"
              />
            </Link>
          ))}

          <button
            onClick={prevBanner}
            type="button"
            className="absolute z-20 left-1 sm:left-2 top-1/2 -translate-y-1/2 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/90 shadow flex items-center justify-center active:scale-95 transition-all touch-manipulation md:opacity-0 md:group-hover:opacity-100"
            aria-label="Previous Banner"
          >
            <ChevronLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-700" />
          </button>
          <button
            onClick={nextBanner}
            type="button"
            className="absolute z-20 right-1 sm:right-2 top-1/2 -translate-y-1/2 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/90 shadow flex items-center justify-center active:scale-95 transition-all touch-manipulation md:opacity-0 md:group-hover:opacity-100"
            aria-label="Next Banner"
          >
            <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-700" />
          </button>

          {/* Indicators */}
          <div className="absolute z-20 bottom-2 left-1/2 -translate-x-1/2 flex space-x-1.5 sm:space-x-2">
            {banners.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setCurrentBanner(idx)}
                className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full transition-all ${currentBanner === idx ? 'bg-white w-3 sm:w-4' : 'bg-white/50'
                  }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Categories Section */}
      <div id="shop-by-category" className="max-w-7xl mx-auto px-3 sm:px-4 py-6 sm:py-8 md:py-16">
        <div className="text-center mb-6 sm:mb-8 md:mb-12">
          <h2 className="text-xl sm:text-2xl md:text-4xl mb-2 sm:mb-3 md:mb-4">Shop by Category</h2>
          <p className="text-sm sm:text-base md:text-xl text-gray-600 px-2">
            Browse our wide selection of products
          </p>
        </div>

        <div className="grid grid-cols-3 gap-2 sm:gap-4 md:gap-8">
          {categories.map((category) => (
            <Link
              key={category.id}
              to={`/category/${category.id}`}
              className="group relative h-28 sm:h-40 md:h-56 rounded-lg sm:rounded-xl md:rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform active:scale-[0.98] sm:hover:-translate-y-2 touch-manipulation"
            >
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-2 sm:p-4 md:p-6">
                <h3 className="text-sm sm:text-xl md:text-3xl text-white mb-0.5 sm:mb-1 md:mb-2 font-medium">
                  {category.name}
                </h3>
                <p className="text-white/90 text-xs sm:text-sm md:text-lg mb-1 sm:mb-2 md:mb-3 hidden sm:block">
                  {category.description}
                </p>
                <div className="flex items-center text-white group-hover:text-yellow-400 transition-colors">
                  <span className="text-xs sm:text-base md:text-lg">Shop Now</span>
                  <ChevronRight className="w-3 h-3 sm:w-5 sm:h-5 md:w-6 md:h-6 ml-1 sm:ml-2 group-hover:translate-x-2 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Snacks & Drinks Section */}
      <div className="max-w-7xl mx-auto px-3 sm:px-4 pb-6 sm:pb-8 md:pb-12">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6 text-gray-900">
          Snacks & Drinks
        </h2>
        <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-3 sm:gap-4 md:gap-5">
          {snacksAndDrinksCategories.map((category) => (
            <Link
              key={category.id}
              to={`/category/${category.id}`}
              className="flex flex-col items-center group touch-manipulation"
            >
              <div className="w-full aspect-square bg-[#EEF5F5] rounded-xl sm:rounded-2xl flex items-center justify-center overflow-hidden mb-2 sm:mb-3 group-hover:shadow-[0_4px_12px_rgba(0,0,0,0.05)] transition-all duration-300">
                <img
                  src={category.image}
                  alt={category.name.replace('\n', ' ')}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <h3 className="text-[10px] sm:text-xs md:text-sm font-semibold text-center text-gray-800 leading-[1.2] whitespace-pre-line">
                {category.name}
              </h3>
            </Link>
          ))}
        </div>
      </div>

      {/* WhatsApp Promo Banner */}
      <div className="w-full max-w-7xl mx-auto px-3 sm:px-4 pb-6 sm:pb-8 md:pb-12 text-black">
        <a
          href="https://wa.me/918003759454"
          target="_blank"
          rel="noopener noreferrer"
          className="block relative group rounded-xl sm:rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all active:scale-[0.98]"
        >
          <img
            src="/assets/images/Button 2 .png"
            alt="Party Starts Here - Click to WhatsApp"
            className="w-full h-auto object-cover max-h-[160px] sm:max-h-[240px] md:max-h-[300px] object-center"
          />

          {/* Animated Click Here Button */}
          <div className="absolute inset-x-0 bottom-[12%] sm:bottom-[18%] md:bottom-[22%] flex justify-center pointer-events-none">
            <div className="relative flex items-center justify-center">
              {/* Outer pulse ring */}
              <span
                className="absolute inline-flex h-full w-full rounded-full opacity-60"
                style={{
                  background: 'rgba(255,255,255,0.3)',
                  animation: 'whatsapp-ping 2.2s cubic-bezier(0,0,0.2,1) infinite',
                }}
              />
              {/* Inner button */}
              <span
                className="relative flex items-center gap-0.5 sm:gap-1.5 px-2 py-0.5 sm:px-4 sm:py-1.5 md:px-5 md:py-1.5 rounded-full text-white font-bold text-[8px] sm:text-xs md:text-sm"
                style={{
                  background: 'rgba(255,255,255,0.15)',
                  backdropFilter: 'blur(6px)',
                  border: '1.5px solid rgba(255,255,255,0.7)',
                  animation: 'whatsapp-bounce 2.8s ease-in-out infinite',
                  boxShadow: '0 2px 12px rgba(0,0,0,0.15)',
                }}
              >
                {/* WhatsApp icon */}
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-2.5 h-2.5 sm:w-4 sm:h-4 md:w-5 md:h-5 flex-shrink-0">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                <span style={{ color: '#fff', WebkitTextFillColor: '#fff', animation: 'whatsapp-shimmer 3.5s linear infinite' }}>
                  Click Here
                </span>
              </span>
            </div>
          </div>
        </a>
      </div>

      <style>{`
        @keyframes whatsapp-ping {
          0%   { transform: scale(1);   opacity: 0.6; }
          70%  { transform: scale(2.2); opacity: 0; }
          100% { transform: scale(2.2); opacity: 0; }
        }
        @keyframes whatsapp-bounce {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-6px); }
        }
        @keyframes whatsapp-shimmer {
          0%   { background-position: 200% center; }
          100% { background-position: -200% center; }
        }
        @keyframes shop-bag-bounce {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          25% { transform: translateY(-2px) rotate(-5deg); }
          50% { transform: translateY(-4px) rotate(0deg); }
          75% { transform: translateY(-2px) rotate(5deg); }
        }
        .shop-bag-bounce {
          animation: shop-bag-bounce 1.8s ease-in-out infinite;
          transform-origin: center;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>









      {/* Grocery & Kitchen Section */}
      <div className="max-w-7xl mx-auto px-3 sm:px-4 pb-6 sm:pb-8 md:pb-12 text-black">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6 text-gray-900">
          Grocery & Kitchen
        </h2>
        <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-3 sm:gap-4 md:gap-5">
          {groceryAndKitchenCategories.map((category) => (
            <Link
              key={category.id}
              to={`/category/${category.id}`}
              className="flex flex-col items-center group touch-manipulation"
            >
              <div className="w-full aspect-square bg-[#FDF4F5] rounded-xl sm:rounded-2xl flex items-center justify-center overflow-hidden mb-2 sm:mb-3 group-hover:shadow-[0_4px_12px_rgba(0,0,0,0.05)] transition-all duration-300">
                <img
                  src={category.image}
                  alt={category.name.replace('\n', ' ')}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <h3 className="text-[10px] sm:text-xs md:text-sm font-semibold text-center text-gray-800 leading-[1.2] whitespace-pre-line">
                {category.name}
              </h3>
            </Link>
          ))}
        </div>
      </div>

      {/* Beauty & Personal Care Section */}
      <div className="max-w-7xl mx-auto px-3 sm:px-4 pb-6 sm:pb-8 md:pb-12 text-black">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6 text-gray-900">
          Beauty & Personal Care
        </h2>
        <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-3 sm:gap-4 md:gap-5">
          {beautyAndPersonalCareCategories.map((category) => (
            <Link
              key={category.id}
              to={`/category/${category.id}`}
              className="flex flex-col items-center group touch-manipulation"
            >
              <div className="w-full aspect-square bg-[#EEF5F5] rounded-xl sm:rounded-2xl flex items-center justify-center overflow-hidden mb-2 sm:mb-3 group-hover:shadow-[0_4px_12px_rgba(0,0,0,0.05)] transition-all duration-300">
                <img
                  src={category.image}
                  alt={category.name.replace('\n', ' ')}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <h3 className="text-[10px] sm:text-xs md:text-sm font-semibold text-center text-gray-800 leading-[1.2] whitespace-pre-line">
                {category.name}
              </h3>
            </Link>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-3 sm:px-4 pb-4">
        <div className="relative overflow-hidden rounded-2xl min-h-[120px] sm:min-h-[130px] md:min-h-[140px]">
          <img
            src={seasonalCampaign.image}
            alt={seasonalCampaign.title}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-pink-600/90 via-fuchsia-500/80 to-pink-400/60" />
          <div className="relative z-10 h-full p-4 sm:p-6 md:p-8 flex flex-col justify-center max-w-xl">
            <p className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white drop-shadow-sm">
              {seasonalCampaign.title}
            </p>
            <p className="text-sm sm:text-base md:text-lg text-pink-50 mt-1 sm:mt-2">
              {seasonalCampaign.subtitle}
            </p>
            <Link
              to={seasonalCampaign.cta}
              className="inline-flex mt-3 sm:mt-4 w-fit px-4 sm:px-5 py-2 rounded-lg bg-white text-pink-700 text-sm sm:text-base font-semibold hover:bg-pink-50 transition-colors"
            >
              Shop Campaign
            </Link>
          </div>
        </div>
      </div>

      <div id="flash-deals" className="max-w-7xl mx-auto px-3 sm:px-4 pb-6">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">Flash Deals</h3>
          <div className="text-xs sm:text-sm font-semibold text-red-600 bg-red-50 px-2.5 py-1 rounded">Ends in {hrs}:{mins}:{secs}</div>
        </div>
        <div className="overflow-x-auto no-scrollbar">
          <div className="flex w-max gap-3">
            {flashDealProducts.map((product) => (
              <div key={`flash-${product.id}`} className="min-w-[180px] sm:min-w-[210px] bg-white border rounded-xl p-2.5">
                <Link to={`/product/${product.id}`} onClick={() => trackProductView(product.id)}>
                  <div className="relative">
                    <img src={product.image} alt={product.name} className="w-full h-28 sm:h-32 object-cover rounded-lg mb-2" />
                    {(flashDealConfig.cards.find((c) => c.productId === product.id)?.badgeText || (product.stock <= 20 ? 'Low Stock' : 'Flash Deal')) && (
                      <span className="absolute top-1 left-1 text-[10px] px-1.5 py-0.5 bg-red-600 text-white rounded">
                        {flashDealConfig.cards.find((c) => c.productId === product.id)?.badgeText || (product.stock <= 20 ? 'Low Stock' : 'Flash Deal')}
                      </span>
                    )}
                  </div>
                  <p className="text-xs sm:text-sm font-semibold text-gray-900 line-clamp-2">{product.name}</p>
                </Link>
                <p className="mt-1 text-sm font-bold text-green-700">₹{product.price}</p>
                <button onClick={() => handleAddToCart(product.id)} className="mt-2 w-full px-3 py-1.5 text-xs sm:text-sm bg-green-600 text-yellow-100 rounded-lg">
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Buying History - Priority Position */}
      <div className="max-w-7xl mx-auto px-3 sm:px-4 pb-6">
        <div className="bg-white rounded-xl border border-green-200 p-3 sm:p-4">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-sm sm:text-base md:text-lg font-semibold text-gray-900">Your Buying History</h4>
            <span className="text-[11px] sm:text-xs px-2 py-1 rounded-full bg-green-100 text-green-700">Buy Again</span>
          </div>
          <div className="overflow-x-auto no-scrollbar">
            <div className="flex w-max gap-2.5">
              {buyAgainProducts.length > 0 ? buyAgainProducts.map((p) => (
                <Link key={`history-${p.id}`} to={`/product/${p.id}`} onClick={() => trackProductView(p.id)} className="min-w-[150px] sm:min-w-[190px] border rounded-lg p-2 bg-white">
                  <img src={p.image} alt={p.name} className="w-full h-24 sm:h-28 object-cover rounded-md mb-1.5" />
                  <p className="text-xs sm:text-sm line-clamp-2">{p.name}</p>
                  <p className="text-sm font-bold text-green-700 mt-1">₹{p.price}</p>
                </Link>
              )) : (
                <p className="text-xs sm:text-sm text-gray-500">No buying history yet. Place some orders to see this section.</p>
              )}
            </div>
          </div>
        </div>
      </div>

      <div id="personalized-sections" className="max-w-7xl mx-auto px-3 sm:px-4 pb-6 space-y-4">
        {[
          { title: 'Recently Viewed', products: recentlyViewedProducts },
          { title: 'Recommended for You', products: recommendedProducts }
        ].map((section) => (
          <div
            key={section.title}
            className={`rounded-xl p-3 sm:p-4 border ${
              section.title === 'Recently Viewed'
                ? 'bg-gradient-to-r from-violet-50 to-fuchsia-50 border-violet-200'
                : 'bg-white'
            }`}
          >
            <h4 className="text-sm sm:text-base md:text-lg font-semibold mb-2">{section.title}</h4>
            <div className="overflow-x-auto no-scrollbar">
              <div className="flex w-max gap-2.5">
                {section.products.length > 0 ? section.products.map((p) => (
                  <Link key={`${section.title}-${p.id}`} to={`/product/${p.id}`} onClick={() => trackProductView(p.id)} className="min-w-[150px] sm:min-w-[190px] border rounded-lg p-2">
                    <img src={p.image} alt={p.name} className="w-full h-24 sm:h-28 object-cover rounded-md mb-1.5" />
                    <p className="text-xs sm:text-sm line-clamp-2">{p.name}</p>
                    <p className="text-sm font-bold text-green-700 mt-1">₹{p.price}</p>
                  </Link>
                )) : (
                  <p className="text-xs sm:text-sm text-gray-500">No data yet. Start ordering to personalize this section.</p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div id="top-brands" className="max-w-7xl mx-auto px-3 sm:px-4 pb-6">
        <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-3">Top Brands</h3>
        <div className="overflow-x-auto no-scrollbar mb-3">
          <div className="flex w-max gap-2">
            {topBrands.map((brand) => (
              <button
                key={brand.id}
                type="button"
                onClick={() => setBrandFilter(brand.id)}
                className={`px-3 py-2 rounded-lg border text-xs sm:text-sm ${brandFilter === brand.id ? 'bg-green-600 text-yellow-100 border-green-600' : 'bg-white text-gray-700 border-gray-300'}`}
              >
                {brand.label}
              </button>
            ))}
          </div>
        </div>
        <div className="overflow-x-auto no-scrollbar">
          <div className="flex w-max gap-3">
            {brandFilteredProducts.map((p) => (
              <Link key={`brand-${p.id}`} to={`/product/${p.id}`} onClick={() => trackProductView(p.id)} className="min-w-[170px] sm:min-w-[200px] bg-white border rounded-xl p-2.5">
                <img src={p.image} alt={p.name} className="w-full h-28 object-cover rounded-lg mb-2" />
                <p className="text-xs sm:text-sm line-clamp-2">{p.name}</p>
                <p className="text-sm font-bold text-green-700 mt-1">₹{p.price}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Shop From Here */}
      <div id="shop-from-here" className="max-w-7xl mx-auto px-3 sm:px-4 pt-3 sm:pt-4 md:pt-5 pb-8 sm:pb-10 md:pb-14">
        <div className="mb-6 flex items-center justify-center gap-2 sm:gap-3">
          <ShoppingBag className="w-5 h-5 sm:w-6 sm:h-6 text-green-700 shop-bag-bounce" />
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 text-center">
            Shop From Here
          </h3>
        </div>
        <div className="space-y-7">
          {shopFromHereGroups.map((group) => {
            const groupCategoryIds = new Set(group.categories.map((category) => category.id));
            const groupProducts = liveProducts
              .filter((product) => groupCategoryIds.has(product.category))
              .sort((a, b) => {
                const aCustom = a.id.startsWith('custom_') ? 1 : 0;
                const bCustom = b.id.startsWith('custom_') ? 1 : 0;
                if (aCustom !== bCustom) return bCustom - aCustom;
                return b.rating - a.rating || a.price - b.price;
              });
            const primaryRowProducts = groupProducts;
            const secondaryRowProducts = groupProducts.length > 0
              ? [...groupProducts.slice(6), ...groupProducts.slice(0, 6)]
              : [];
            const tertiaryRowProducts = groupProducts.length > 0
              ? [...groupProducts.slice(12), ...groupProducts.slice(0, 12)]
              : [];
            const quaternaryRowProducts = groupProducts.length > 0
              ? [...groupProducts.slice(18), ...groupProducts.slice(0, 18)]
              : [];

            return (
              <section key={group.id}>
                <h4 className="text-base sm:text-lg md:text-xl font-semibold text-gray-900 mb-3">
                  {group.title}
                </h4>
                <div className="overflow-x-auto no-scrollbar">
                  <div className="flex w-max gap-3 sm:gap-4">
                    {primaryRowProducts.map((product, index) => {
                      const mrp = Math.round(product.price * 1.15);
                      const discountPercent = Math.round(((mrp - product.price) / mrp) * 100);
                      const selectedQty = getSelectedQuantity(product.id);

                      return (
                        <div
                          key={`${product.id}-${index}`}
                          className="min-w-[180px] sm:min-w-[200px] md:min-w-[220px] bg-white border border-rose-100 rounded-xl p-2.5 sm:p-3 shadow-sm"
                        >
                          <Link to={`/product/${product.id}`} onClick={() => trackProductView(product.id)} className="block">
                            <img
                              src={product.image}
                              alt={product.name}
                              className="w-full h-28 sm:h-32 md:h-36 object-cover rounded-lg mb-2"
                            />
                            <p className="text-xs sm:text-sm font-semibold text-gray-900 line-clamp-2 min-h-[2.2rem]">
                              {product.name}
                            </p>
                          </Link>

                          <div className="mt-2 flex items-center gap-2">
                            <p className="text-sm sm:text-base font-bold text-green-700">₹{product.price}</p>
                            <p className="text-xs text-gray-400 line-through">₹{mrp}</p>
                            <span className="text-[10px] sm:text-xs text-emerald-700 font-semibold">{discountPercent}% OFF</span>
                          </div>

                          <div className="mt-2 flex items-center justify-between">
                            <p className="text-xs sm:text-sm text-gray-600">⭐ {product.rating.toFixed(1)}</p>
                            <div className="inline-flex items-center border rounded-md overflow-hidden">
                              <button
                                type="button"
                                onClick={() => updateSelectedQuantity(product.id, selectedQty - 1)}
                                className="px-2 py-1 text-sm hover:bg-gray-100"
                                aria-label={`Decrease quantity for ${product.name}`}
                              >
                                -
                              </button>
                              <span className="px-2 py-1 text-xs sm:text-sm min-w-[28px] text-center">{selectedQty}</span>
                              <button
                                type="button"
                                onClick={() => updateSelectedQuantity(product.id, selectedQty + 1)}
                                className="px-2 py-1 text-sm hover:bg-gray-100"
                                aria-label={`Increase quantity for ${product.name}`}
                              >
                                +
                              </button>
                            </div>
                          </div>

                          <button
                            type="button"
                            onClick={() => handleAddToCart(product.id)}
                            className="mt-3 w-full px-3 py-2 text-xs sm:text-sm bg-green-600 text-yellow-100 rounded-lg hover:bg-green-500 transition-colors"
                          >
                            Add to Cart
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
                {secondaryRowProducts.length > 0 && (
                  <div className="overflow-x-auto no-scrollbar mt-3">
                    <div className="flex w-max gap-3 sm:gap-4">
                      {secondaryRowProducts.map((product, index) => {
                        const mrp = Math.round(product.price * 1.15);
                        const discountPercent = Math.round(((mrp - product.price) / mrp) * 100);
                        const selectedQty = getSelectedQuantity(product.id);

                        return (
                          <div
                            key={`${group.id}-extra-${product.id}-${index}`}
                            className="min-w-[180px] sm:min-w-[200px] md:min-w-[220px] bg-white border border-rose-100 rounded-xl p-2.5 sm:p-3 shadow-sm"
                          >
                            <Link to={`/product/${product.id}`} onClick={() => trackProductView(product.id)} className="block">
                              <img
                                src={product.image}
                                alt={product.name}
                                className="w-full h-28 sm:h-32 md:h-36 object-cover rounded-lg mb-2"
                              />
                              <p className="text-xs sm:text-sm font-semibold text-gray-900 line-clamp-2 min-h-[2.2rem]">
                                {product.name}
                              </p>
                            </Link>

                            <div className="mt-2 flex items-center gap-2">
                              <p className="text-sm sm:text-base font-bold text-green-700">₹{product.price}</p>
                              <p className="text-xs text-gray-400 line-through">₹{mrp}</p>
                              <span className="text-[10px] sm:text-xs text-emerald-700 font-semibold">{discountPercent}% OFF</span>
                            </div>

                            <div className="mt-2 flex items-center justify-between">
                              <p className="text-xs sm:text-sm text-gray-600">⭐ {product.rating.toFixed(1)}</p>
                              <div className="inline-flex items-center border rounded-md overflow-hidden">
                                <button
                                  type="button"
                                  onClick={() => updateSelectedQuantity(product.id, selectedQty - 1)}
                                  className="px-2 py-1 text-sm hover:bg-gray-100"
                                  aria-label={`Decrease quantity for ${product.name}`}
                                >
                                  -
                                </button>
                                <span className="px-2 py-1 text-xs sm:text-sm min-w-[28px] text-center">{selectedQty}</span>
                                <button
                                  type="button"
                                  onClick={() => updateSelectedQuantity(product.id, selectedQty + 1)}
                                  className="px-2 py-1 text-sm hover:bg-gray-100"
                                  aria-label={`Increase quantity for ${product.name}`}
                                >
                                  +
                                </button>
                              </div>
                            </div>

                            <button
                              type="button"
                              onClick={() => handleAddToCart(product.id)}
                              className="mt-3 w-full px-3 py-2 text-xs sm:text-sm bg-green-600 text-yellow-100 rounded-lg hover:bg-green-500 transition-colors"
                            >
                              Add to Cart
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
                {tertiaryRowProducts.length > 0 && (
                  <div className="overflow-x-auto no-scrollbar mt-3">
                    <div className="flex w-max gap-3 sm:gap-4">
                      {tertiaryRowProducts.map((product, index) => {
                        const mrp = Math.round(product.price * 1.15);
                        const discountPercent = Math.round(((mrp - product.price) / mrp) * 100);
                        const selectedQty = getSelectedQuantity(product.id);

                        return (
                          <div
                            key={`${group.id}-extra2-${product.id}-${index}`}
                            className="min-w-[180px] sm:min-w-[200px] md:min-w-[220px] bg-white border border-rose-100 rounded-xl p-2.5 sm:p-3 shadow-sm"
                          >
                            <Link to={`/product/${product.id}`} onClick={() => trackProductView(product.id)} className="block">
                              <img
                                src={product.image}
                                alt={product.name}
                                className="w-full h-28 sm:h-32 md:h-36 object-cover rounded-lg mb-2"
                              />
                              <p className="text-xs sm:text-sm font-semibold text-gray-900 line-clamp-2 min-h-[2.2rem]">
                                {product.name}
                              </p>
                            </Link>

                            <div className="mt-2 flex items-center gap-2">
                              <p className="text-sm sm:text-base font-bold text-green-700">₹{product.price}</p>
                              <p className="text-xs text-gray-400 line-through">₹{mrp}</p>
                              <span className="text-[10px] sm:text-xs text-emerald-700 font-semibold">{discountPercent}% OFF</span>
                            </div>

                            <div className="mt-2 flex items-center justify-between">
                              <p className="text-xs sm:text-sm text-gray-600">⭐ {product.rating.toFixed(1)}</p>
                              <div className="inline-flex items-center border rounded-md overflow-hidden">
                                <button
                                  type="button"
                                  onClick={() => updateSelectedQuantity(product.id, selectedQty - 1)}
                                  className="px-2 py-1 text-sm hover:bg-gray-100"
                                  aria-label={`Decrease quantity for ${product.name}`}
                                >
                                  -
                                </button>
                                <span className="px-2 py-1 text-xs sm:text-sm min-w-[28px] text-center">{selectedQty}</span>
                                <button
                                  type="button"
                                  onClick={() => updateSelectedQuantity(product.id, selectedQty + 1)}
                                  className="px-2 py-1 text-sm hover:bg-gray-100"
                                  aria-label={`Increase quantity for ${product.name}`}
                                >
                                  +
                                </button>
                              </div>
                            </div>

                            <button
                              type="button"
                              onClick={() => handleAddToCart(product.id)}
                              className="mt-3 w-full px-3 py-2 text-xs sm:text-sm bg-green-600 text-yellow-100 rounded-lg hover:bg-green-500 transition-colors"
                            >
                              Add to Cart
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
                {quaternaryRowProducts.length > 0 && (
                  <div className="overflow-x-auto no-scrollbar mt-3">
                    <div className="flex w-max gap-3 sm:gap-4">
                      {quaternaryRowProducts.map((product, index) => {
                        const mrp = Math.round(product.price * 1.15);
                        const discountPercent = Math.round(((mrp - product.price) / mrp) * 100);
                        const selectedQty = getSelectedQuantity(product.id);

                        return (
                          <div
                            key={`${group.id}-extra3-${product.id}-${index}`}
                            className="min-w-[180px] sm:min-w-[200px] md:min-w-[220px] bg-white border border-rose-100 rounded-xl p-2.5 sm:p-3 shadow-sm"
                          >
                            <Link to={`/product/${product.id}`} onClick={() => trackProductView(product.id)} className="block">
                              <img
                                src={product.image}
                                alt={product.name}
                                className="w-full h-28 sm:h-32 md:h-36 object-cover rounded-lg mb-2"
                              />
                              <p className="text-xs sm:text-sm font-semibold text-gray-900 line-clamp-2 min-h-[2.2rem]">
                                {product.name}
                              </p>
                            </Link>

                            <div className="mt-2 flex items-center gap-2">
                              <p className="text-sm sm:text-base font-bold text-green-700">₹{product.price}</p>
                              <p className="text-xs text-gray-400 line-through">₹{mrp}</p>
                              <span className="text-[10px] sm:text-xs text-emerald-700 font-semibold">{discountPercent}% OFF</span>
                            </div>

                            <div className="mt-2 flex items-center justify-between">
                              <p className="text-xs sm:text-sm text-gray-600">⭐ {product.rating.toFixed(1)}</p>
                              <div className="inline-flex items-center border rounded-md overflow-hidden">
                                <button
                                  type="button"
                                  onClick={() => updateSelectedQuantity(product.id, selectedQty - 1)}
                                  className="px-2 py-1 text-sm hover:bg-gray-100"
                                  aria-label={`Decrease quantity for ${product.name}`}
                                >
                                  -
                                </button>
                                <span className="px-2 py-1 text-xs sm:text-sm min-w-[28px] text-center">{selectedQty}</span>
                                <button
                                  type="button"
                                  onClick={() => updateSelectedQuantity(product.id, selectedQty + 1)}
                                  className="px-2 py-1 text-sm hover:bg-gray-100"
                                  aria-label={`Increase quantity for ${product.name}`}
                                >
                                  +
                                </button>
                              </div>
                            </div>

                            <button
                              type="button"
                              onClick={() => handleAddToCart(product.id)}
                              className="mt-3 w-full px-3 py-2 text-xs sm:text-sm bg-green-600 text-yellow-100 rounded-lg hover:bg-green-500 transition-colors"
                            >
                              Add to Cart
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </section>
            );
          })}
        </div>
      </div>


      <div className="bg-yellow-50/40 py-6 sm:py-8 md:py-12">
        <div className="max-w-7xl mx-auto px-3 sm:px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 text-center">
            <div className="p-4 md:p-6">
              <div className="w-12 h-12 md:w-14 md:h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2 md:mb-3">
                <BadgeCheck className="w-6 h-6 text-green-700" />
              </div>
              <h3 className="text-sm md:text-lg mb-1">Fresh Products</h3>
              <p className="text-xs md:text-sm text-gray-600">Handpicked and quality checked daily.</p>
            </div>
            <div className="p-4 md:p-6">
              <div className="w-12 h-12 md:w-14 md:h-14 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2 md:mb-3">
                <Truck className="w-6 h-6 text-blue-700" />
              </div>
              <h3 className="text-sm md:text-lg mb-1">Fast Delivery</h3>
              <p className="text-xs md:text-sm text-gray-600">Quick dispatch inside your local zone.</p>
            </div>
            <div className="p-4 md:p-6">
              <div className="w-12 h-12 md:w-14 md:h-14 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2 md:mb-3">
                <ShoppingBag className="w-6 h-6 text-purple-700" />
              </div>
              <h3 className="text-sm md:text-lg mb-1">Easy Returns</h3>
              <p className="text-xs md:text-sm text-gray-600">Simple return flow on eligible products.</p>
            </div>
            <div className="p-4 md:p-6">
              <div className="w-12 h-12 md:w-14 md:h-14 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-2 md:mb-3">
                <ShieldCheck className="w-6 h-6 text-emerald-700" />
              </div>
              <h3 className="text-sm md:text-lg mb-1">Secure Payment</h3>
              <p className="text-xs md:text-sm text-gray-600">Protected checkout and trusted handling.</p>
            </div>
          </div>
        </div>
      </div>

      <div id="testimonials" className="max-w-7xl mx-auto px-3 sm:px-4 pb-8">
        <div className="bg-white rounded-xl border p-4 sm:p-5">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">Customer Love</h3>
            <div className="inline-flex items-center gap-1.5 bg-yellow-50 px-3 py-1.5 rounded-full">
              <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
              <span className="text-sm font-semibold text-gray-800">{averageRating.toFixed(1)} / 5 average rating</span>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="rounded-lg border p-3">
              <p className="text-sm text-gray-700">&quot;Very fast delivery and fresh products every time!&quot;</p>
              <p className="text-xs text-gray-500 mt-2">- Priya, Tawang</p>
            </div>
            <div className="rounded-lg border p-3">
              <p className="text-sm text-gray-700">&quot;Cart and reorder process is super easy. Loved it.&quot;</p>
              <p className="text-xs text-gray-500 mt-2">- Rahul, Tawang</p>
            </div>
            <div className="rounded-lg border p-3">
              <p className="text-sm text-gray-700">&quot;Good discounts and smooth shopping experience.&quot;</p>
              <p className="text-xs text-gray-500 mt-2">- Sonam, Tawang</p>
            </div>
          </div>
        </div>
      </div>

    </div >
  );
}
