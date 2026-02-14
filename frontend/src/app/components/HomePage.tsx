import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ChevronRight } from 'lucide-react';

const categories = [
  {
    id: 'clothes',
    name: 'Clothes',
    image: 'https://images.unsplash.com/photo-1611312449545-94176309c857?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwY2xvdGhlcyUyMGFwcGFyZWx8ZW58MXx8fHwxNzcwMzMxNzQ1fDA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Latest fashion trends'
  },
  {
    id: 'jewellery',
    name: 'Jewellery',
    image: 'https://images.unsplash.com/photo-1718871186381-6d59524a64f6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqZXdlbHJ5JTIwZ29sZCUyMGFjY2Vzc29yaWVzfGVufDF8fHx8MTc3MDM5NDAzN3ww&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Elegant accessories'
  },
  {
    id: 'food',
    name: 'Food',
    image: 'https://images.unsplash.com/photo-1610636996379-4d184e2ef20a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMGZvb2QlMjBncm9jZXJpZXN8ZW58MXx8fHwxNzcwMzk0MDM4fDA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Fresh & organic'
  }
];

export function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-[400px] md:h-[500px] bg-gradient-to-r from-blue-600 to-purple-600">
        <img
          src="https://images.unsplash.com/photo-1766524871302-88590e1fa1bf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwc2hvcHBpbmclMjBzYWxlJTIwYmFubmVyfGVufDF8fHx8MTc3MDM2MDQ4Mnww&ixlib=rb-4.1.0&q=80&w=1080"
          alt="Hero banner"
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white px-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-3 md:mb-4 text-center leading-tight">
            Welcome to ShopZone
          </h1>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-6 md:mb-8 text-center px-4">
            Discover Amazing Deals on Your Favorite Products
          </p>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="w-full max-w-2xl px-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search for products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 sm:px-6 py-3 sm:py-4 rounded-full bg-white/10 backdrop-blur-md border border-white text-white placeholder-white/70 text-base sm:text-lg outline-none focus:ring-4 focus:ring-white/50 transition-all duration-300"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-blue-600 hover:bg-blue-700 text-white p-2 sm:p-3 rounded-full transition-colors"
              >
                <Search className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Categories Section */}
      <div className="max-w-7xl mx-auto px-4 py-8 md:py-16">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl mb-3 md:mb-4">Shop by Category</h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600">
            Browse our wide selection of products
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-8">
          {categories.map((category) => (
            <Link
              key={category.id}
              to={`/category/${category.id}`}
              className="group relative h-64 sm:h-72 md:h-80 rounded-xl md:rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-4 md:p-6">
                <h3 className="text-2xl sm:text-3xl text-white mb-1 md:mb-2">
                  {category.name}
                </h3>
                <p className="text-white/90 text-sm sm:text-base md:text-lg mb-2 md:mb-3">
                  {category.description}
                </p>
                <div className="flex items-center text-white group-hover:text-blue-300 transition-colors">
                  <span className="text-base md:text-lg">Shop Now</span>
                  <ChevronRight className="w-5 h-5 md:w-6 md:h-6 ml-2 group-hover:translate-x-2 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white py-8 md:py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 text-center">
            <div className="p-4 md:p-6">
              <div className="w-14 h-14 md:w-16 md:h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
                <svg className="w-7 h-7 md:w-8 md:h-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-lg md:text-xl mb-2">Quality Products</h3>
              <p className="text-sm md:text-base text-gray-600">Handpicked items with guaranteed quality</p>
            </div>

            <div className="p-4 md:p-6">
              <div className="w-14 h-14 md:w-16 md:h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
                <svg className="w-7 h-7 md:w-8 md:h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg md:text-xl mb-2">Best Prices</h3>
              <p className="text-sm md:text-base text-gray-600">Competitive pricing on all products</p>
            </div>

            <div className="p-4 md:p-6">
              <div className="w-14 h-14 md:w-16 md:h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
                <svg className="w-7 h-7 md:w-8 md:h-8 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-lg md:text-xl mb-2">Fast Delivery</h3>
              <p className="text-sm md:text-base text-gray-600">Quick and reliable shipping</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
