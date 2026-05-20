import { useEffect, useMemo, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, ShoppingCart } from 'lucide-react';
import { getProducts } from '../data/products';
import { addToCart } from '../utils/storage';
import { preloadImageUrls } from '../utils/imagePreload';
import { toast } from 'sonner';
import { CategoryPageHeader } from './CategoryPageHeader';
import { ProductImage } from './ProductImage';

export function CategoryPage() {
  const { category } = useParams<{ category: string }>();
  const [productVersion, setProductVersion] = useState(0);
  const categoryProducts = useMemo(
    () =>
      getProducts()
        .filter((p) => p.category === category)
        .sort((a, b) => {
          const aCustom = a.id.startsWith('custom_') ? 1 : 0;
          const bCustom = b.id.startsWith('custom_') ? 1 : 0;
          if (aCustom !== bCustom) return bCustom - aCustom;
          return b.rating - a.rating || a.price - b.price;
        }),
    [category, productVersion]
  );
  const [visibleCount, setVisibleCount] = useState(20);

  const handleAddToCart = (productId: string, productName: string) => {
    addToCart(productId, 1);
    toast.success(`${productName} added to cart!`);
    window.dispatchEvent(new Event('cartUpdated'));
  };

  useEffect(() => {
    setVisibleCount(20);
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [category]);

  useEffect(() => {
    const onProductsUpdated = () => setProductVersion((v) => v + 1);
    window.addEventListener('productsUpdated', onProductsUpdated);
    return () => window.removeEventListener('productsUpdated', onProductsUpdated);
  }, []);

  useEffect(() => {
    preloadImageUrls(categoryProducts.slice(0, 24).map((p) => p.image).filter(Boolean));
  }, [category, categoryProducts]);

  useEffect(() => {
    const onScroll = () => {
      if (visibleCount >= categoryProducts.length) return;
      const scrollPosition = window.innerHeight + window.scrollY;
      const triggerPosition = document.body.offsetHeight - 260;
      if (scrollPosition >= triggerPosition) {
        setVisibleCount((prev) => Math.min(prev + 20, categoryProducts.length));
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [categoryProducts.length, visibleCount]);

  return (
    <div className="min-h-screen max-w-full overflow-x-hidden bg-tawang-cream">
      {category && <CategoryPageHeader category={category} />}

      <div className="mx-auto max-w-7xl px-3 pt-1 pb-4 sm:px-4 md:pt-2 md:pb-8">
        <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3 md:gap-6">
          {categoryProducts.slice(0, visibleCount).map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-xl shadow-md hover:shadow-lg active:shadow-md transition-all duration-300 overflow-hidden group flex flex-col border border-gray-100 min-w-0"
            >
              <Link to={`/product/${product.id}`} className="block flex-shrink-0 relative">
                <ProductImage
                  size="category"
                  src={product.image}
                  alt={product.name}
                  containerClassName="rounded-t-xl bg-tawang-beige"
                  className="transition-transform duration-300 group-hover:scale-[1.02]"
                />
                {product.stock < 10 && (
                  <span className="absolute top-1 left-1 z-10 px-1.5 py-0.5 text-[10px] font-medium bg-amber-500 text-white rounded">
                    Low stock
                  </span>
                )}
              </Link>

              <div className="bg-tawang-beige p-2.5 sm:p-3 md:p-4 flex-1 flex flex-col min-h-0 min-w-0 rounded-b-xl border-t border-gray-100/80">
                <Link to={`/product/${product.id}`}>
                  <h3 className="font-heading text-xs sm:text-sm md:text-lg mb-1 sm:mb-2 hover:text-tawang-gold transition-colors line-clamp-2 font-medium text-gray-900">
                    {product.name}
                  </h3>
                </Link>

                <div className="flex items-center gap-1.5 sm:gap-2 mb-2 sm:mb-3 flex-wrap">
                  <div className="flex items-center gap-0.5 text-amber-500">
                    <Star className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current" />
                    <span className="text-[11px] sm:text-sm text-gray-700">{product.rating}</span>
                  </div>
                  <span className="text-gray-300">·</span>
                  <span className="text-[10px] sm:text-xs text-gray-500">{product.stock} in stock</span>
                </div>

                <div className="mt-auto pt-1 flex items-center justify-between gap-1 sm:gap-2 min-w-0">
                  <span className="text-sm sm:text-base md:text-xl text-tawang-gold font-bold truncate min-w-0">
                    ₹{product.price}
                  </span>
                  <div className="flex gap-1 sm:gap-1.5 shrink-0">
                    <Link
                      to={`/product/${product.id}`}
                      className="min-h-[32px] sm:min-h-[36px] flex items-center justify-center px-2 sm:px-3 py-1.5 sm:py-2 text-[10px] sm:text-sm font-medium border border-tawang-gold text-tawang-gold rounded-lg hover:bg-tawang-beige active:bg-tawang-beige transition-colors whitespace-nowrap"
                    >
                      Details
                    </Link>
                    <button
                      type="button"
                      onClick={() => handleAddToCart(product.id, product.name)}
                      className="min-h-[32px] sm:min-h-[36px] w-8 h-8 sm:w-9 sm:h-9 flex-shrink-0 flex items-center justify-center bg-tawang-navy text-white rounded-lg hover:bg-tawang-navy/90 active:scale-95 transition-all"
                    >
                      <ShoppingCart className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {categoryProducts.length === 0 && (
          <div className="text-center py-16">
            <p className="text-xl text-gray-600">No products found in this category.</p>
          </div>
        )}
      </div>
    </div>
  );
}
