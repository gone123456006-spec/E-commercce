import { useEffect, useMemo, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Star, ShoppingCart, Plus, Minus } from 'lucide-react';
import { getProductById, getProducts } from '../data/products';
import { addToCart } from '../utils/storage';
import { toast } from 'sonner';

export function ProductDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const product = getProductById(id!);
  const [quantity, setQuantity] = useState(1);
  const [visibleRelatedCount, setVisibleRelatedCount] = useState(20);
  const [, setProductVersion] = useState(0);

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl mb-4">Product not found</h2>
          <Link to="/" className="text-green-600 hover:underline">
            Go back to home
          </Link>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product.id, quantity);
    toast.success(`${quantity} x ${product.name} added to cart!`);
    window.dispatchEvent(new Event('cartUpdated'));
  };

  const handleBuyNow = () => {
    addToCart(product.id, quantity);
    window.dispatchEvent(new Event('cartUpdated'));
    navigate('/cart');
  };

  const relatedProducts = useMemo(() => {
    const allProducts = getProducts();
    const sameCategory = allProducts.filter((p) => p.category === product.category && p.id !== product.id);
    const fallback = allProducts.filter((p) => p.id !== product.id && p.category !== product.category);
    return [...sameCategory, ...fallback];
  }, [product.category, product.id]);

  useEffect(() => {
    const onProductsUpdated = () => setProductVersion((v) => v + 1);
    window.addEventListener('productsUpdated', onProductsUpdated);
    return () => window.removeEventListener('productsUpdated', onProductsUpdated);
  }, []);

  useEffect(() => {
    setVisibleRelatedCount(20);
  }, [product.id]);

  useEffect(() => {
    const onScroll = () => {
      if (visibleRelatedCount >= relatedProducts.length) return;
      const scrollPosition = window.innerHeight + window.scrollY;
      const triggerPosition = document.body.offsetHeight - 280;
      if (scrollPosition >= triggerPosition) {
        setVisibleRelatedCount((prev) => Math.min(prev + 20, relatedProducts.length));
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [relatedProducts.length, visibleRelatedCount]);

  const incrementQuantity = () => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1);
    }
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <div className="min-h-screen bg-yellow-50/40">
      <div className="mx-auto max-w-7xl px-0 py-2 sm:px-4 sm:py-4 md:py-8">
        {/* Breadcrumb */}
        <div className="mb-2 flex items-center gap-1.5 overflow-x-auto px-3 text-xs text-gray-600 sm:mb-3 sm:gap-2 sm:px-0 sm:text-sm md:mb-5">
          <Link to="/" className="hover:text-green-600 whitespace-nowrap">Home</Link>
          <span>/</span>
          <Link to={`/category/${product.category}`} className="hover:text-green-600 capitalize whitespace-nowrap">
            {product.category}
          </Link>
          <span>/</span>
          <span className="text-gray-900 truncate">{product.name}</span>
        </div>

        {/* Product Details — full-bleed on small screens so content uses full width */}
        <div className="overflow-hidden bg-white shadow-md sm:mx-0 sm:rounded-xl md:rounded-2xl md:shadow-lg">
          <div className="grid grid-cols-1 items-start gap-4 px-3 py-4 sm:gap-6 sm:p-6 md:grid-cols-2 md:gap-8 md:p-7 lg:p-8">
            {/* Product Image — fixed frame so tall photos show full product, not a tiny strip */}
            <div className="w-full max-w-full sm:mx-auto sm:max-w-md md:mx-0 md:max-w-none">
              <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-white sm:rounded-xl md:rounded-2xl">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-full w-full object-contain object-center"
                />
              </div>
            </div>

            {/* Product Info — compact e-commerce style density */}
            <div className="flex min-h-0 w-full flex-col gap-3 sm:gap-4 md:gap-5">
              <div>
                <h1 className="text-xl font-semibold leading-snug text-gray-900 sm:text-2xl md:text-3xl lg:text-4xl">
                  {product.name}
                </h1>

                <div className="mt-1.5 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-gray-700 sm:mt-2 sm:gap-x-3 sm:text-base">
                  <div className="flex items-center gap-1 text-amber-500">
                    <Star className="h-4 w-4 shrink-0 fill-current sm:h-5 sm:w-5" />
                    <span className="font-medium">{product.rating}</span>
                  </div>
                  <span className="text-gray-300">·</span>
                  <span className={`font-medium ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
                  </span>
                </div>

                <p className="mt-2 text-2xl font-bold text-green-600 sm:mt-2.5 sm:text-3xl md:text-4xl">₹{product.price}</p>
              </div>

              <div className="rounded-lg border border-gray-100 bg-gray-50 p-3 sm:p-4">
                <h2 className="text-[11px] font-medium uppercase tracking-wide text-gray-500">Description</h2>
                <p className="mt-1 text-sm leading-relaxed text-gray-800 sm:text-base">
                  {product.description}
                </p>
              </div>

              <div className="border-b border-gray-100 pb-3 sm:pb-4">
                <h2 className="text-[11px] font-medium uppercase tracking-wide text-gray-500">Quantity</h2>
                <div className="mt-2 flex items-center gap-3">
                  <button
                    type="button"
                    onClick={decrementQuantity}
                    disabled={quantity <= 1}
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-gray-300 bg-white text-gray-700 transition-colors active:bg-gray-50 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 sm:h-11 sm:w-11"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="min-w-[2rem] text-center text-lg font-semibold tabular-nums sm:text-xl">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={incrementQuantity}
                    disabled={quantity >= product.stock}
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-gray-300 bg-white text-gray-700 transition-colors active:bg-gray-50 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 sm:h-11 sm:w-11"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="flex flex-col gap-2 sm:flex-row sm:gap-3">
                <button
                  type="button"
                  onClick={handleAddToCart}
                  disabled={product.stock === 0}
                  className="flex min-h-[44px] flex-1 items-center justify-center gap-2 rounded-lg border border-green-600 bg-white px-4 py-2.5 text-sm font-semibold text-green-600 transition-colors hover:bg-green-50 active:bg-green-50 disabled:cursor-not-allowed disabled:opacity-50 sm:py-3 sm:text-base"
                >
                  <ShoppingCart className="h-4 w-4 shrink-0 sm:h-5 sm:w-5" />
                  Add to Cart
                </button>
                <button
                  type="button"
                  onClick={handleBuyNow}
                  disabled={product.stock === 0}
                  className="min-h-[44px] flex-1 rounded-lg bg-green-600 px-4 py-2.5 text-sm font-semibold text-yellow-100 transition-colors hover:bg-green-700 active:bg-green-800 disabled:cursor-not-allowed disabled:opacity-50 sm:py-3 sm:text-base"
                >
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products - Loads more on scroll */}
        <div className="mt-4 px-3 sm:mt-6 sm:px-0 md:mt-8">
          <h2 className="mb-2 text-base font-semibold text-gray-900 sm:mb-3 sm:text-lg md:mb-4">Related Products</h2>
          <div className="grid grid-cols-2 gap-3 sm:gap-4 md:gap-6 lg:grid-cols-4">
            {relatedProducts.slice(0, visibleRelatedCount).map((related) => (
              <div
                key={related.id}
                className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100"
              >
                <Link to={`/product/${related.id}`} className="block">
                  <div className="aspect-square overflow-hidden bg-gray-50">
                    <img
                      src={related.image}
                      alt={related.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </Link>
                <div className="p-3">
                  <Link to={`/product/${related.id}`}>
                    <h3 className="text-sm md:text-base line-clamp-2 mb-2 hover:text-green-600 transition-colors">
                      {related.name}
                    </h3>
                  </Link>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-green-600 font-bold">₹{related.price}</span>
                    <span className="text-xs text-gray-600">⭐ {related.rating.toFixed(1)}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      addToCart(related.id, 1);
                      window.dispatchEvent(new Event('cartUpdated'));
                      toast.success(`${related.name} added to cart!`);
                    }}
                    className="w-full px-3 py-2 text-sm bg-green-600 text-yellow-100 rounded-lg hover:bg-green-500 transition-colors"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
