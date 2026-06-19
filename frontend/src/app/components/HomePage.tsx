import { useState, useEffect, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ChevronRight, ChevronLeft, ShoppingBag, Truck, ShieldCheck, BadgeCheck, Star } from 'lucide-react';
import { getProductById, getProducts } from '../data/products';
import { ProductImage } from './ProductImage';
import { CategoryCardLabel } from './CategoryCardLabel';
import { SectionHeading } from './SectionHeading';
import { FlashDealCountdown } from './FlashDealCountdown';
import { addToCart, getCart, getOrders } from '../utils/storage';
import { useHomepagePreload } from '../hooks/useHomepagePreload';
import {
  ADMIN_CATEGORY_THUMBNAILS_KEY,
  getBeautyAndPersonalCareCategories,
  getGroceryAndKitchenCategories,
  getShopFromHereGroups,
  getSnacksAndDrinksCategories,
} from '../data/homepageCategories';
import { toast } from 'sonner';

import { readSiteContentFromClient } from '../services/siteContentService';

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
  const { homepageBanners } = readSiteContentFromClient();
  if (homepageBanners.length > 0) {
    return homepageBanners.filter((banner) => banner?.src?.trim());
  }
  return defaultBanners;
};

interface FlashDealConfig {
  cards: Array<{ productId: string; badgeText?: string }>;
  endAt?: string;
}

const getFlashDealConfig = (): FlashDealConfig => {
  if (typeof window === 'undefined') return { cards: [] };
  const { flashDeals } = readSiteContentFromClient();
  return {
    cards: Array.isArray(flashDeals.cards) ? flashDeals.cards : [],
    endAt: typeof flashDeals.endAt === 'string' ? flashDeals.endAt : ''
  };
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

const SHOP_PRODUCTS_PER_ROW = 10;


export function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentBanner, setCurrentBanner] = useState(0);
  const [banners, setBanners] = useState(() => getHomeBanners());
  const [selectedQuantities, setSelectedQuantities] = useState<Record<string, number>>({});
  const [cartSubtotal, setCartSubtotal] = useState(0);
  const [brandFilter, setBrandFilter] = useState('all');
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
  const [productVersion, setProductVersion] = useState(0);
  const [categoryThumbVersion, setCategoryThumbVersion] = useState(0);
  const navigate = useNavigate();
  const liveProducts = useMemo(() => getProducts(), [productVersion]);
  const orders = useMemo(() => getOrders(), [productVersion]);

  const snacksAndDrinksCategories = useMemo(
    () => getSnacksAndDrinksCategories(),
    [categoryThumbVersion]
  );
  const groceryAndKitchenCategories = useMemo(
    () => getGroceryAndKitchenCategories(),
    [categoryThumbVersion]
  );
  const beautyAndPersonalCareCategories = useMemo(
    () => getBeautyAndPersonalCareCategories(),
    [categoryThumbVersion]
  );
  const shopFromHereGroups = useMemo(() => getShopFromHereGroups(), [categoryThumbVersion]);

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

  const categoryImages = useMemo(
    () =>
      [
        ...categories,
        ...snacksAndDrinksCategories,
        ...groceryAndKitchenCategories,
        ...beautyAndPersonalCareCategories,
      ]
        .map((c) => c.image)
        .filter(Boolean),
    [categoryThumbVersion, snacksAndDrinksCategories, groceryAndKitchenCategories, beautyAndPersonalCareCategories]
  );

  useHomepagePreload({
    banners,
    categoryImages,
    sectionProducts: [
      flashDealProducts,
      brandFilteredProducts,
      recommendedProducts,
      buyAgainProducts,
      recentlyViewedProducts,
    ],
  });

  useEffect(() => {
    if (banners.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % banners.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [banners.length]);


  useEffect(() => {
    const onSiteContentUpdated = () => {
      setBanners(getHomeBanners());
      setFlashDealConfig(getFlashDealConfig());
      setCategoryThumbVersion((v) => v + 1);
      setProductVersion((v) => v + 1);
    };
    const onProductsUpdated = () => setProductVersion((v) => v + 1);
    const onStorage = (e: StorageEvent) => {
      if (e.key === ADMIN_CATEGORY_THUMBNAILS_KEY) {
        setCategoryThumbVersion((v) => v + 1);
      }
    };
    window.addEventListener('siteContentUpdated', onSiteContentUpdated);
    window.addEventListener('productsUpdated', onProductsUpdated);
    window.addEventListener('storage', onStorage);
    return () => {
      window.removeEventListener('siteContentUpdated', onSiteContentUpdated);
      window.removeEventListener('productsUpdated', onProductsUpdated);
      window.removeEventListener('storage', onStorage);
    };
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
    <div className="max-w-full overflow-x-clip bg-tawang-cream">
      {/* Search Bar */}
      <div className="fixed left-0 right-0 z-[90] border-b border-tawang-gold/10 bg-tawang-cream/95 py-2.5 px-3 backdrop-blur-md top-[calc(3.5rem+env(safe-area-inset-top,0px))] md:sticky md:top-[calc(4rem+env(safe-area-inset-top,0px))] md:z-40 md:py-3 md:px-4 sm:py-4">
        <div className="max-w-xl mx-auto">
          <form onSubmit={handleSearch}>
            <div className="relative flex items-center bg-white rounded-full shadow-md border border-tawang-gold/20 overflow-hidden">
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
                className="m-1 flex-shrink-0 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-tawang-gold active:scale-95 transition-all duration-200 text-tawang-navy flex items-center justify-center touch-manipulation hover:shadow-tawang-glow"
              >
                <Search className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="h-[3.25rem] shrink-0 md:hidden" aria-hidden />

      {/* Auto-Sliding Banner Section */}
      <div className="w-full max-w-7xl mx-auto px-3 sm:px-4 py-3 sm:py-4 md:py-6">
        <div className="relative group rounded-xl sm:rounded-2xl overflow-hidden shadow-lg bg-tawang-beige h-[160px] sm:h-[280px] md:h-[320px] lg:h-[380px] w-full">
          {banners.map((banner, idx) => {
            if (Math.abs(idx - currentBanner) > 1) return null;
            return (
              <Link
                key={idx}
                to={banner.link}
                className={`transition-opacity duration-500 ease-in-out block ${currentBanner === idx ? 'opacity-100 z-10' : 'opacity-0 z-0'
                  } ${idx === 0 ? 'sm:relative absolute inset-0' : 'absolute inset-0'}`}
              >
                <img
                  src={banner.src}
                  alt={`Banner ${idx + 1}`}
                  loading={idx === currentBanner ? 'eager' : 'lazy'}
                  decoding="async"
                  fetchPriority={idx === currentBanner ? 'high' : 'low'}
                  className="w-full h-full object-cover object-center"
                />
              </Link>
            );
          })}

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
        <SectionHeading
          className="mb-6 sm:mb-8 md:mb-12"
          title="Shop by Category"
          subtitle="Browse our wide selection of products"
          titleClassName="md:text-2xl lg:text-3xl"
        />

        <div className="grid grid-cols-3 gap-2 sm:gap-4 md:gap-8">
          {categories.map((category) => (
            <Link
              key={category.id}
              to={`/category/${category.id}`}
              className="group flex flex-col rounded-lg sm:rounded-xl md:rounded-2xl overflow-hidden bg-tawang-cream border border-tawang-gold/15 shadow-md hover:shadow-lg transition-all duration-300 active:scale-[0.98] sm:hover:-translate-y-1 touch-manipulation"
            >
              <div className="relative h-24 sm:h-32 md:h-36 lg:h-44 overflow-hidden">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="flex flex-1 flex-col items-center justify-center px-2 py-3 sm:py-4 bg-tawang-cream">
                <CategoryCardLabel name={category.name} size="lg" />
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Snacks & Drinks Section */}
      <div className="max-w-7xl mx-auto px-3 sm:px-4 pb-6 sm:pb-8 md:pb-12">
        <SectionHeading className="mb-4 sm:mb-6" title="Snacks & Drinks" />
        <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-3 sm:gap-4 md:gap-5">
          {snacksAndDrinksCategories.map((category) => (
            <Link
              key={category.id}
              to={`/category/${category.id}`}
              className="flex flex-col items-center group touch-manipulation"
            >
              <div className="w-full aspect-square bg-tawang-beige rounded-xl sm:rounded-2xl flex items-center justify-center overflow-hidden mb-2 sm:mb-3 group-hover:shadow-md transition-all duration-300">
                <img
                  key={`${category.id}-${category.image}`}
                  src={category.image}
                  alt={category.name.replace('\n', ' ')}
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <CategoryCardLabel name={category.name} size="sm" />
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
      `}</style>









      {/* Grocery & Kitchen Section */}
      <div className="max-w-7xl mx-auto px-3 sm:px-4 pb-6 sm:pb-8 md:pb-12 text-black">
        <SectionHeading className="mb-4 sm:mb-6" title="Grocery & Kitchen" />
        <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-3 sm:gap-4 md:gap-5">
          {groceryAndKitchenCategories.map((category) => (
            <Link
              key={category.id}
              to={`/category/${category.id}`}
              className="flex flex-col items-center group touch-manipulation"
            >
              <div className="w-full aspect-square bg-tawang-beige rounded-xl sm:rounded-2xl flex items-center justify-center overflow-hidden mb-2 sm:mb-3 group-hover:shadow-md transition-all duration-300">
                <img
                  key={`${category.id}-${category.image}`}
                  src={category.image}
                  alt={category.name.replace('\n', ' ')}
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <CategoryCardLabel name={category.name} size="sm" />
            </Link>
          ))}
        </div>
      </div>

      {/* Beauty & Personal Care Section */}
      <div className="max-w-7xl mx-auto px-3 sm:px-4 pb-6 sm:pb-8 md:pb-12 text-black">
        <SectionHeading className="mb-4 sm:mb-6" title="Beauty & Personal Care" />
        <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-3 sm:gap-4 md:gap-5">
          {beautyAndPersonalCareCategories.map((category) => (
            <Link
              key={category.id}
              to={`/category/${category.id}`}
              className="flex flex-col items-center group touch-manipulation"
            >
              <div className="w-full aspect-square bg-tawang-beige rounded-xl sm:rounded-2xl flex items-center justify-center overflow-hidden mb-2 sm:mb-3 group-hover:shadow-md transition-all duration-300">
                <img
                  key={`${category.id}-${category.image}`}
                  src={category.image}
                  alt={category.name.replace('\n', ' ')}
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <CategoryCardLabel name={category.name} size="sm" />
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
          <div className="absolute inset-0 bg-gradient-to-r from-tawang-navy/95 via-tawang-navy/80 to-tawang-gold/40" />
          <div className="relative z-10 h-full p-4 sm:p-6 md:p-8 flex flex-col justify-center max-w-xl">
            <p className="font-heading text-2xl sm:text-3xl md:text-4xl text-white drop-shadow-sm">
              {seasonalCampaign.title}
            </p>
            <p className="text-sm sm:text-base md:text-lg text-tawang-cream/90 mt-1 sm:mt-2 font-body">
              {seasonalCampaign.subtitle}
            </p>
            <Link
              to={seasonalCampaign.cta}
              className="inline-flex mt-3 sm:mt-4 w-fit px-4 sm:px-5 py-2 rounded-xl bg-tawang-gold text-tawang-navy text-sm sm:text-base font-semibold hover:shadow-tawang-glow transition-all"
            >
              Shop Campaign
            </Link>
          </div>
        </div>
      </div>

      <div id="flash-deals" className="max-w-7xl mx-auto px-3 sm:px-4 pb-6">
        <SectionHeading as="h3" className="mb-2" title="Flash Deals" />
        <FlashDealCountdown endAt={flashDealConfig.endAt} />
        <div className="scroll-row-x no-scrollbar">
          <div className="flex w-max gap-3 items-stretch">
            {flashDealProducts.map((product) => (
              <div key={`flash-${product.id}`} className="flex flex-col h-full min-w-[180px] sm:min-w-[210px] bg-white border rounded-xl p-2.5">
                <Link to={`/product/${product.id}`} onClick={() => trackProductView(product.id)}>
                  <div className="relative mb-2">
                    <ProductImage priority size="md" src={product.image} alt={product.name} containerClassName="rounded-lg" />
                    {(flashDealConfig.cards.find((c) => c.productId === product.id)?.badgeText || (product.stock <= 20 ? 'Low Stock' : 'Flash Deal')) && (
                      <span className="absolute top-1 left-1 text-[10px] px-1.5 py-0.5 bg-red-600 text-white rounded">
                        {flashDealConfig.cards.find((c) => c.productId === product.id)?.badgeText || (product.stock <= 20 ? 'Low Stock' : 'Flash Deal')}
                      </span>
                    )}
                  </div>
                  <p className="text-xs sm:text-sm font-semibold text-gray-900 line-clamp-2">{product.name}</p>
                </Link>
                <p className="mt-auto pt-1 text-sm font-bold text-tawang-gold">Rs. {product.price}</p>
                <button onClick={() => handleAddToCart(product.id)} className="mt-2 w-full px-3 py-1.5 text-xs sm:text-sm tawang-btn-primary rounded-xl">
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Buying History - Priority Position */}
      <div className="max-w-7xl mx-auto px-3 sm:px-4 pb-6">
        <div className="bg-white rounded-xl border border-tawang-gold/25 p-3 sm:p-4">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-heading text-sm sm:text-base md:text-lg font-semibold text-gray-900">Your Buying History</h4>
            <span className="text-[11px] sm:text-xs px-2 py-1 rounded-full bg-tawang-beige text-tawang-gold">Buy Again</span>
          </div>
          <div className="scroll-row-x no-scrollbar">
            <div className="flex w-max gap-2.5 items-stretch">
              {buyAgainProducts.length > 0 ? buyAgainProducts.map((p) => (
                <Link key={`history-${p.id}`} to={`/product/${p.id}`} onClick={() => trackProductView(p.id)} className="flex flex-col h-full min-w-[150px] sm:min-w-[190px] border rounded-lg p-2 bg-white">
                  <ProductImage size="xs" src={p.image} alt={p.name} containerClassName="rounded-md mb-1.5" />
                  <p className="text-xs sm:text-sm line-clamp-2">{p.name}</p>
                  <p className="text-sm font-bold text-tawang-gold mt-auto pt-1">Rs. {p.price}</p>
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
            className={`rounded-xl p-3 sm:p-4 border ${section.title === 'Recently Viewed'
                ? 'bg-gradient-to-r from-tawang-beige to-tawang-cream border-tawang-gold/30'
                : 'bg-white border-tawang-navy/10'
              }`}
          >
            <h4 className="font-heading text-sm sm:text-base md:text-lg font-semibold mb-2">{section.title}</h4>
            <div className="scroll-row-x no-scrollbar">
              <div className="flex w-max gap-2.5 items-stretch">
                {section.products.length > 0 ? section.products.map((p) => (
                  <Link key={`${section.title}-${p.id}`} to={`/product/${p.id}`} onClick={() => trackProductView(p.id)} className="flex flex-col h-full min-w-[150px] sm:min-w-[190px] border rounded-lg p-2">
                    <ProductImage size="xs" src={p.image} alt={p.name} containerClassName="rounded-md mb-1.5" />
                    <p className="text-xs sm:text-sm line-clamp-2">{p.name}</p>
                    <p className="text-sm font-bold text-tawang-gold mt-auto pt-1">Rs. {p.price}</p>
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
        <SectionHeading as="h3" className="mb-3" title="Top Brands" />
        <div className="scroll-row-x no-scrollbar mb-3">
          <div className="flex w-max gap-2">
            {topBrands.map((brand) => (
              <button
                key={brand.id}
                type="button"
                onClick={() => setBrandFilter(brand.id)}
                className={`px-3 py-2 rounded-lg border text-xs sm:text-sm ${brandFilter === brand.id ? 'bg-tawang-gold text-white/90 border-tawang-gold' : 'bg-white text-gray-700 border-gray-300'}`}
              >
                {brand.label}
              </button>
            ))}
          </div>
        </div>
        <div className="scroll-row-x no-scrollbar">
          <div className="flex w-max gap-3 items-stretch">
            {brandFilteredProducts.map((p) => (
              <Link key={`brand-${p.id}`} to={`/product/${p.id}`} onClick={() => trackProductView(p.id)} className="flex flex-col h-full min-w-[170px] sm:min-w-[200px] bg-white border rounded-xl p-2.5">
                <ProductImage size="md" src={p.image} alt={p.name} containerClassName="rounded-lg mb-2" />
                <p className="text-xs sm:text-sm line-clamp-2">{p.name}</p>
                <p className="text-sm font-bold text-tawang-gold mt-auto pt-1">Rs. {p.price}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Shop From Here */}
      <div id="shop-from-here" className="max-w-7xl mx-auto px-3 sm:px-4 pt-3 sm:pt-4 md:pt-5 pb-4 sm:pb-6 md:pb-8">
        <SectionHeading
          as="h3"
          className="mb-6"
          title="Shop From Here"
          titleClassName="text-base sm:text-lg md:text-xl"
        />
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
              })
              .slice(0, SHOP_PRODUCTS_PER_ROW * 2);
            const primaryRowProducts = groupProducts.slice(0, SHOP_PRODUCTS_PER_ROW);
            const secondaryRowProducts = groupProducts.slice(SHOP_PRODUCTS_PER_ROW);
            const tertiaryRowProducts: typeof groupProducts = [];
            const quaternaryRowProducts: typeof groupProducts = [];

            return (
              <section key={group.id}>
                <h4 className="font-heading mb-3 text-center text-sm uppercase tracking-[0.1em] text-tawang-navy sm:text-base md:text-lg">
                  {group.title}
                </h4>
                <div className="scroll-row-x no-scrollbar">
                  <div className="flex w-max gap-3 sm:gap-4 items-stretch">
                    {primaryRowProducts.map((product, index) => {
                      const mrp = Math.round(product.price * 1.15);
                      const discountPercent = Math.round(((mrp - product.price) / mrp) * 100);
                      const selectedQty = getSelectedQuantity(product.id);

                      return (
                        <div
                          key={`${product.id}-${index}`}
                          className="flex flex-col h-full min-w-[180px] sm:min-w-[200px] md:min-w-[220px] bg-white border border-tawang-gold/15 tawang-card rounded-xl p-2.5 sm:p-3 shadow-sm"
                        >
                          <Link to={`/product/${product.id}`} onClick={() => trackProductView(product.id)} className="block">
                            <ProductImage
                              size="md"
                              src={product.image}
                              alt={product.name}
                              containerClassName="rounded-lg mb-2"
                            />
                            <p className="text-xs sm:text-sm font-semibold text-gray-900 line-clamp-2 min-h-[2.2rem]">
                              {product.name}
                            </p>
                          </Link>

                          <div className="mt-auto pt-2 flex items-center gap-2">
                            <p className="text-sm sm:text-base font-bold text-tawang-gold">Rs. {product.price}</p>
                            <p className="text-xs text-gray-400 line-through">Rs. {mrp}</p>
                            <span className="text-[10px] sm:text-xs text-emerald-700 font-semibold">{discountPercent}% OFF</span>
                          </div>

                          <div className="mt-2 flex items-center justify-between">
                            <p className="text-xs sm:text-sm text-gray-600">★ {product.rating.toFixed(1)}</p>
                            <div className="inline-flex items-center border rounded-md overflow-hidden">
                              <button
                                type="button"
                                onClick={() => updateSelectedQuantity(product.id, selectedQty - 1)}
                                className="px-2 py-1 text-sm hover:bg-tawang-beige"
                                aria-label={`Decrease quantity for ${product.name}`}
                              >
                                -
                              </button>
                              <span className="px-2 py-1 text-xs sm:text-sm min-w-[28px] text-center">{selectedQty}</span>
                              <button
                                type="button"
                                onClick={() => updateSelectedQuantity(product.id, selectedQty + 1)}
                                className="px-2 py-1 text-sm hover:bg-tawang-beige"
                                aria-label={`Increase quantity for ${product.name}`}
                              >
                                +
                              </button>
                            </div>
                          </div>

                          <button
                            type="button"
                            onClick={() => handleAddToCart(product.id)}
                            className="mt-3 w-full px-3 py-2 text-xs sm:text-sm bg-tawang-gold text-white/90 rounded-lg hover:bg-tawang-gold transition-colors"
                          >
                            Add to Cart
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
                {secondaryRowProducts.length > 0 && (
                  <div className="scroll-row-x no-scrollbar mt-3">
                    <div className="flex w-max gap-3 sm:gap-4 items-stretch">
                      {secondaryRowProducts.map((product, index) => {
                        const mrp = Math.round(product.price * 1.15);
                        const discountPercent = Math.round(((mrp - product.price) / mrp) * 100);
                        const selectedQty = getSelectedQuantity(product.id);

                        return (
                          <div
                            key={`${group.id}-extra-${product.id}-${index}`}
                            className="flex flex-col h-full min-w-[180px] sm:min-w-[200px] md:min-w-[220px] bg-white border border-tawang-gold/15 tawang-card rounded-xl p-2.5 sm:p-3 shadow-sm"
                          >
                            <Link to={`/product/${product.id}`} onClick={() => trackProductView(product.id)} className="block">
                              <ProductImage
                                size="md"
                                src={product.image}
                                alt={product.name}
                                containerClassName="rounded-lg mb-2"
                              />
                              <p className="text-xs sm:text-sm font-semibold text-gray-900 line-clamp-2 min-h-[2.2rem]">
                                {product.name}
                              </p>
                            </Link>

                            <div className="mt-auto pt-2 flex items-center gap-2">
                              <p className="text-sm sm:text-base font-bold text-tawang-gold">Rs. {product.price}</p>
                              <p className="text-xs text-gray-400 line-through">Rs. {mrp}</p>
                              <span className="text-[10px] sm:text-xs text-emerald-700 font-semibold">{discountPercent}% OFF</span>
                            </div>

                            <div className="mt-2 flex items-center justify-between">
                              <p className="text-xs sm:text-sm text-gray-600">â­ {product.rating.toFixed(1)}</p>
                              <div className="inline-flex items-center border rounded-md overflow-hidden">
                                <button
                                  type="button"
                                  onClick={() => updateSelectedQuantity(product.id, selectedQty - 1)}
                                  className="px-2 py-1 text-sm hover:bg-tawang-beige"
                                  aria-label={`Decrease quantity for ${product.name}`}
                                >
                                  -
                                </button>
                                <span className="px-2 py-1 text-xs sm:text-sm min-w-[28px] text-center">{selectedQty}</span>
                                <button
                                  type="button"
                                  onClick={() => updateSelectedQuantity(product.id, selectedQty + 1)}
                                  className="px-2 py-1 text-sm hover:bg-tawang-beige"
                                  aria-label={`Increase quantity for ${product.name}`}
                                >
                                  +
                                </button>
                              </div>
                            </div>

                            <button
                              type="button"
                              onClick={() => handleAddToCart(product.id)}
                              className="mt-3 w-full px-3 py-2 text-xs sm:text-sm bg-tawang-gold text-white/90 rounded-lg hover:bg-tawang-gold transition-colors"
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
                  <div className="scroll-row-x no-scrollbar mt-3">
                    <div className="flex w-max gap-3 sm:gap-4 items-stretch">
                      {tertiaryRowProducts.map((product, index) => {
                        const mrp = Math.round(product.price * 1.15);
                        const discountPercent = Math.round(((mrp - product.price) / mrp) * 100);
                        const selectedQty = getSelectedQuantity(product.id);

                        return (
                          <div
                            key={`${group.id}-extra2-${product.id}-${index}`}
                            className="flex flex-col h-full min-w-[180px] sm:min-w-[200px] md:min-w-[220px] bg-white border border-tawang-gold/15 tawang-card rounded-xl p-2.5 sm:p-3 shadow-sm"
                          >
                            <Link to={`/product/${product.id}`} onClick={() => trackProductView(product.id)} className="block">
                              <ProductImage
                                size="md"
                                src={product.image}
                                alt={product.name}
                                containerClassName="rounded-lg mb-2"
                              />
                              <p className="text-xs sm:text-sm font-semibold text-gray-900 line-clamp-2 min-h-[2.2rem]">
                                {product.name}
                              </p>
                            </Link>

                            <div className="mt-auto pt-2 flex items-center gap-2">
                              <p className="text-sm sm:text-base font-bold text-tawang-gold">Rs. {product.price}</p>
                              <p className="text-xs text-gray-400 line-through">Rs. {mrp}</p>
                              <span className="text-[10px] sm:text-xs text-emerald-700 font-semibold">{discountPercent}% OFF</span>
                            </div>

                            <div className="mt-2 flex items-center justify-between">
                              <p className="text-xs sm:text-sm text-gray-600">â­ {product.rating.toFixed(1)}</p>
                              <div className="inline-flex items-center border rounded-md overflow-hidden">
                                <button
                                  type="button"
                                  onClick={() => updateSelectedQuantity(product.id, selectedQty - 1)}
                                  className="px-2 py-1 text-sm hover:bg-tawang-beige"
                                  aria-label={`Decrease quantity for ${product.name}`}
                                >
                                  -
                                </button>
                                <span className="px-2 py-1 text-xs sm:text-sm min-w-[28px] text-center">{selectedQty}</span>
                                <button
                                  type="button"
                                  onClick={() => updateSelectedQuantity(product.id, selectedQty + 1)}
                                  className="px-2 py-1 text-sm hover:bg-tawang-beige"
                                  aria-label={`Increase quantity for ${product.name}`}
                                >
                                  +
                                </button>
                              </div>
                            </div>

                            <button
                              type="button"
                              onClick={() => handleAddToCart(product.id)}
                              className="mt-3 w-full px-3 py-2 text-xs sm:text-sm bg-tawang-gold text-white/90 rounded-lg hover:bg-tawang-gold transition-colors"
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
                  <div className="scroll-row-x no-scrollbar mt-3">
                    <div className="flex w-max gap-3 sm:gap-4 items-stretch">
                      {quaternaryRowProducts.map((product, index) => {
                        const mrp = Math.round(product.price * 1.15);
                        const discountPercent = Math.round(((mrp - product.price) / mrp) * 100);
                        const selectedQty = getSelectedQuantity(product.id);

                        return (
                          <div
                            key={`${group.id}-extra3-${product.id}-${index}`}
                            className="flex flex-col h-full min-w-[180px] sm:min-w-[200px] md:min-w-[220px] bg-white border border-tawang-gold/15 tawang-card rounded-xl p-2.5 sm:p-3 shadow-sm"
                          >
                            <Link to={`/product/${product.id}`} onClick={() => trackProductView(product.id)} className="block">
                              <ProductImage
                                size="md"
                                src={product.image}
                                alt={product.name}
                                containerClassName="rounded-lg mb-2"
                              />
                              <p className="text-xs sm:text-sm font-semibold text-gray-900 line-clamp-2 min-h-[2.2rem]">
                                {product.name}
                              </p>
                            </Link>

                            <div className="mt-auto pt-2 flex items-center gap-2">
                              <p className="text-sm sm:text-base font-bold text-tawang-gold">Rs. {product.price}</p>
                              <p className="text-xs text-gray-400 line-through">Rs. {mrp}</p>
                              <span className="text-[10px] sm:text-xs text-emerald-700 font-semibold">{discountPercent}% OFF</span>
                            </div>

                            <div className="mt-2 flex items-center justify-between">
                              <p className="text-xs sm:text-sm text-gray-600">â­ {product.rating.toFixed(1)}</p>
                              <div className="inline-flex items-center border rounded-md overflow-hidden">
                                <button
                                  type="button"
                                  onClick={() => updateSelectedQuantity(product.id, selectedQty - 1)}
                                  className="px-2 py-1 text-sm hover:bg-tawang-beige"
                                  aria-label={`Decrease quantity for ${product.name}`}
                                >
                                  -
                                </button>
                                <span className="px-2 py-1 text-xs sm:text-sm min-w-[28px] text-center">{selectedQty}</span>
                                <button
                                  type="button"
                                  onClick={() => updateSelectedQuantity(product.id, selectedQty + 1)}
                                  className="px-2 py-1 text-sm hover:bg-tawang-beige"
                                  aria-label={`Increase quantity for ${product.name}`}
                                >
                                  +
                                </button>
                              </div>
                            </div>

                            <button
                              type="button"
                              onClick={() => handleAddToCart(product.id)}
                              className="mt-3 w-full px-3 py-2 text-xs sm:text-sm bg-tawang-gold text-white/90 rounded-lg hover:bg-tawang-gold transition-colors"
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


      <div className="bg-tawang-cream py-6 sm:py-8 md:py-12">
        <div className="max-w-7xl mx-auto px-3 sm:px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 text-center">
            <div className="p-4 md:p-6">
              <div className="w-12 h-12 md:w-14 md:h-14 bg-tawang-beige rounded-full flex items-center justify-center mx-auto mb-2 md:mb-3">
                <BadgeCheck className="w-6 h-6 text-tawang-gold" />
              </div>
              <h3 className="font-heading text-sm md:text-lg mb-1">Fresh Products</h3>
              <p className="text-xs md:text-sm text-gray-600">Handpicked and quality checked daily.</p>
            </div>
            <div className="p-4 md:p-6">
              <div className="w-12 h-12 md:w-14 md:h-14 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2 md:mb-3">
                <Truck className="w-6 h-6 text-blue-700" />
              </div>
              <h3 className="font-heading text-sm md:text-lg mb-1">Fast Delivery</h3>
              <p className="text-xs md:text-sm text-gray-600">Quick dispatch inside your local zone.</p>
            </div>
            <div className="p-4 md:p-6">
              <div className="w-12 h-12 md:w-14 md:h-14 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2 md:mb-3">
                <ShoppingBag className="w-6 h-6 text-purple-700" />
              </div>
              <h3 className="font-heading text-sm md:text-lg mb-1">Easy Returns</h3>
              <p className="text-xs md:text-sm text-gray-600">Simple return flow on eligible products.</p>
            </div>
            <div className="p-4 md:p-6">
              <div className="w-12 h-12 md:w-14 md:h-14 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-2 md:mb-3">
                <ShieldCheck className="w-6 h-6 text-emerald-700" />
              </div>
              <h3 className="font-heading text-sm md:text-lg mb-1">Secure Payment</h3>
              <p className="text-xs md:text-sm text-gray-600">Protected checkout and trusted handling.</p>
            </div>
          </div>
        </div>
      </div>

      <div id="testimonials" className="max-w-7xl mx-auto px-3 sm:px-4 pb-2 sm:pb-4">
        <div className="bg-white rounded-xl border p-4 sm:p-5">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            <SectionHeading as="h3" title="Customer Love" />
            <div className="inline-flex items-center gap-1.5 bg-tawang-cream px-3 py-1.5 rounded-full">
              <Star className="w-4 h-4 text-tawang-gold fill-tawang-gold" />
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
