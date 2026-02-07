import { useParams, Link } from 'react-router-dom';
import { Star, ShoppingCart } from 'lucide-react';
import { products } from '../data/products';
import { addToCart } from '../utils/storage';
import { toast } from 'sonner';

const categoryNames = {
  clothes: 'Clothes',
  jewellery: 'Jewellery',
  food: 'Food'
};

export function CategoryPage() {
  const { category } = useParams<{ category: string }>();
  const categoryProducts = products.filter(p => p.category === category);

  const handleAddToCart = (productId: string, productName: string) => {
    addToCart(productId, 1);
    toast.success(`${productName} added to cart!`);
    window.dispatchEvent(new Event('cartUpdated'));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-4 md:py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm md:text-base text-gray-600 mb-4 md:mb-6">
          <Link to="/" className="hover:text-blue-600">Home</Link>
          <span>/</span>
          <span className="text-gray-900">{categoryNames[category as keyof typeof categoryNames]}</span>
        </div>

        {/* Page Header */}
        <div className="mb-6 md:mb-8">
          <h1 className="text-2xl md:text-3xl lg:text-4xl mb-2">
            {categoryNames[category as keyof typeof categoryNames]}
          </h1>
          <p className="text-base md:text-lg lg:text-xl text-gray-600">
            {categoryProducts.length} products available
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {categoryProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg md:rounded-xl shadow-md hover:shadow-xl transition-shadow overflow-hidden group"
            >
              <Link to={`/product/${product.id}`} className="block">
                <div className="relative h-48 md:h-64 overflow-hidden bg-gray-100">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
              </Link>

              <div className="p-3 md:p-4">
                <Link to={`/product/${product.id}`}>
                  <h3 className="text-base md:text-xl mb-2 hover:text-blue-600 transition-colors line-clamp-1">
                    {product.name}
                  </h3>
                </Link>

                <div className="flex items-center gap-2 mb-3 text-sm md:text-base">
                  <div className="flex items-center gap-1 text-yellow-500">
                    <Star className="w-4 h-4 md:w-5 md:h-5 fill-current" />
                    <span className="text-gray-700">{product.rating}</span>
                  </div>
                  <span className="text-gray-400">|</span>
                  <span className="text-xs md:text-sm text-gray-600">
                    {product.stock} in stock
                  </span>
                </div>

                <div className="flex items-center justify-between gap-2">
                  <span className="text-lg md:text-2xl text-blue-600">
                    ₹{product.price}
                  </span>
                  <div className="flex gap-2">
                    <Link
                      to={`/product/${product.id}`}
                      className="px-2 md:px-4 py-1.5 md:py-2 text-sm md:text-base border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
                    >
                      Details
                    </Link>
                    <button
                      onClick={() => handleAddToCart(product.id, product.name)}
                      className="px-2 md:px-4 py-1.5 md:py-2 text-sm md:text-base bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-1 md:gap-2"
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

        {categoryProducts.length === 0 && (
          <div className="text-center py-16">
            <p className="text-xl text-gray-600">No products found in this category.</p>
          </div>
        )}
      </div>
    </div>
  );
}
