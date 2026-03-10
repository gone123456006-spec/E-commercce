import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ChevronRight, ChevronLeft } from 'lucide-react';

const banners = [
  { id: 1, src: '/assets/images/Banner 1 .png', link: '/' },
  { id: 2, src: '/assets/images/Banner 2.png', link: '/' },
  { id: 3, src: '/assets/images/Banner 3.png', link: '/' },
  { id: 4, src: '/assets/images/Banner 4.png', link: '/' },
  { id: 5, src: '/assets/images/Banner 5.png', link: '/' },
  { id: 7, src: '/assets/images/Banner 7.png', link: '/' },
];

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
  const [currentBanner, setCurrentBanner] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % banners.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const nextBanner = () => {
    setCurrentBanner((prev) => (prev + 1) % banners.length);
  };

  const prevBanner = () => {
    setCurrentBanner((prev) => (prev - 1 + banners.length) % banners.length);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <div className="min-h-screen bg-yellow-50/40">
      {/* Search Bar */}
      <div className="bg-yellow-50/40 py-3 px-3 sm:py-4 sm:px-4">
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
        <div className="relative group rounded-xl sm:rounded-2xl overflow-hidden shadow-lg bg-gray-100 h-[160px] sm:h-[240px] md:h-[300px] w-full">
          {banners.map((banner, idx) => (
            <Link
              key={idx}
              to={banner.link}
              className={`absolute inset-0 transition-opacity duration-500 ease-in-out block ${currentBanner === idx ? 'opacity-100 z-10' : 'opacity-0 z-0'
                }`}
            >
              <img
                src={banner.src}
                alt={`Banner ${idx + 1}`}
                className="w-full h-full object-cover object-center"
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
      <div className="max-w-7xl mx-auto px-3 sm:px-4 py-6 sm:py-8 md:py-16">
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

      {/* WhatsApp Promo Banner */}
      <div className="w-full max-w-7xl mx-auto px-3 sm:px-4 pb-6 sm:pb-8 md:pb-12">
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
                className="relative flex items-center gap-1 sm:gap-1.5 px-3 py-1 sm:px-4 sm:py-1.5 md:px-5 md:py-1.5 rounded-full text-white font-bold text-[10px] sm:text-xs md:text-sm"
                style={{
                  background: 'rgba(255,255,255,0.15)',
                  backdropFilter: 'blur(6px)',
                  border: '1.5px solid rgba(255,255,255,0.7)',
                  animation: 'whatsapp-bounce 2.8s ease-in-out infinite',
                  boxShadow: '0 2px 12px rgba(0,0,0,0.15)',
                }}
              >
                {/* WhatsApp icon */}
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 flex-shrink-0">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                <span style={{ color: '#fff', WebkitTextFillColor: '#fff', animation: 'whatsapp-shimmer 3.5s linear infinite' }}>
                  Click Here
                </span>
              </span>
            </div>
          </div>

          {/* Keyframes injected via style tag */}
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
          `}</style>
        </a>
      </div>


      {/* Features Section */}
      <div className="bg-yellow-50/40 py-6 sm:py-8 md:py-16">
        <div className="max-w-7xl mx-auto px-3 sm:px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8 text-center">
            <div className="p-4 md:p-6">
              <div className="w-14 h-14 md:w-16 md:h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
                <svg className="w-7 h-7 md:w-8 md:h-8 text-yellow-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
              <div className="w-14 h-14 md:w-16 md:h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
                <svg className="w-7 h-7 md:w-8 md:h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
