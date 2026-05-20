import { useSearchParams, Link } from 'react-router-dom';
import { Star, ShoppingCart, Search as SearchIcon } from 'lucide-react';
import { searchProducts } from '../data/products';
import { ProductImage } from './ProductImage';
import { PageHeading } from './PageHeading';
import { addToCart } from '../utils/storage';
import { toast } from 'sonner';

export function SearchResults() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const results = query ? searchProducts(query) : [];

  const handleAddToCart = (productId: string, productName: string) => {
    addToCart(productId, 1);
    toast.success(`${productName} added to cart!`);
    window.dispatchEvent(new Event('cartUpdated'));
  };

  return (
    <div className="min-h-screen max-w-full overflow-x-hidden bg-tawang-cream">
      <PageHeading title="Search Results" variant="cream" sticky={false} />

      <div className="mx-auto max-w-7xl px-3 py-4 sm:px-4 md:py-8">

        {results.length === 0 ? (
          <div className="text-center py-12 md:py-16">
            <SearchIcon className="w-16 h-16 md:w-24 md:h-24 text-gray-300 mx-auto mb-3 md:mb-4" />
            <h2 className="font-heading text-xl md:text-2xl mb-3 md:mb-4">No products found</h2>
            <p className="text-base md:text-lg lg:text-xl text-gray-600 mb-6 md:mb-8 px-4">
              Try searching with different keywords
            </p>
            <Link
              to="/"
              className="inline-block px-6 md:px-8 py-3 md:py-4 bg-tawang-gold text-white/90 rounded-lg md:rounded-xl hover:bg-tawang-gold transition-colors text-base md:text-lg"
            >
              Back to Home
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {results.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-lg md:rounded-xl shadow-md hover:shadow-xl transition-shadow overflow-hidden group"
              >
                <Link to={`/product/${product.id}`} className="block">
                  <ProductImage size="search" src={product.image} alt={product.name} containerClassName="bg-tawang-beige" />
                </Link>

                <div className="p-3 md:p-4">
                  <Link to={`/product/${product.id}`}>
                    <h3 className="font-heading text-base md:text-xl mb-2 hover:text-tawang-gold transition-colors line-clamp-1">
                      {product.name}
                    </h3>
                  </Link>

                  <div className="flex items-center gap-2 mb-3 text-sm md:text-base">
                    <div className="flex items-center gap-1 text-tawang-gold">
                      <Star className="w-4 h-4 md:w-5 md:h-5 fill-current" />
                      <span className="text-gray-700">{product.rating}</span>
                    </div>
                    <span className="text-gray-400">|</span>
                    <Link
                      to={`/category/${product.category}`}
                      className="text-xs md:text-sm text-tawang-gold hover:underline capitalize truncate"
                    >
                      {product.category}
                    </Link>
                  </div>

                  <div className="flex items-center justify-between gap-2">
                    <span className="text-lg md:text-2xl text-tawang-gold font-bold">
                      ₹{product.price}
                    </span>
                    <div className="flex gap-2">
                      <Link
                        to={`/product/${product.id}`}
                        className="px-2 md:px-4 py-1.5 md:py-2 text-sm md:text-base border border-tawang-gold text-tawang-gold rounded-lg hover:bg-tawang-beige transition-colors"
                      >
                        Details
                      </Link>
                      <button
                        onClick={() => handleAddToCart(product.id, product.name)}
                        className="px-2 md:px-4 py-1.5 md:py-2 text-sm md:text-base bg-tawang-gold text-white/90 rounded-lg hover:bg-tawang-gold transition-colors flex items-center gap-1 md:gap-2"
                      >
                        <ShoppingCart className="w-3 h-3 md:w-4 md:h-4" />
                        <span className="hidden sm:inline">Add</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
