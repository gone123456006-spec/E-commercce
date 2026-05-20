import { useLocation } from 'react-router-dom';
import { Home, Package, ShoppingCart, User, Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { getCartCount } from '../utils/storage';

export function Navbar() {
  const location = useLocation();
  const [cartCount, setCartCount] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const updateCartCount = () => {
      setCartCount(getCartCount());
    };

    updateCartCount();
    window.addEventListener('storage', updateCartCount);
    window.addEventListener('cartUpdated', updateCartCount);

    return () => {
      window.removeEventListener('storage', updateCartCount);
      window.removeEventListener('cartUpdated', updateCartCount);
    };
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    document.body.style.removeProperty('overflow');
  }, [location]);

  useEffect(() => {
    if (!isMobileMenuOpen) {
      document.body.style.removeProperty('overflow');
      return;
    }
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.removeProperty('overflow');
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    return () => {
      document.body.style.removeProperty('overflow');
    };
  }, []);

  const isActive = (path: string) => location.pathname === path;

  const navLinks = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/orders', label: 'Orders', icon: Package },
    { path: '/cart', label: 'Cart', icon: ShoppingCart, badge: cartCount },
    { path: '/account', label: 'Account', icon: User },
  ];

  return (
    <nav className="tawang-ornament w-full tawang-gradient-navy shadow-lg pointer-events-auto">
      <div className="max-w-7xl mx-auto px-3 sm:px-4">
        <div className="flex items-center justify-between h-14 sm:h-16">
          <a href="/" className="flex shrink-0 items-center hover:opacity-90 transition-opacity" aria-label="MyBalag home">
            <img
              src="/assets/images/logo%20final%20.png"
              alt="MyBalag — Tawang's Own Grocery E-Store"
              decoding="async"
              fetchPriority="high"
              className="h-8 w-auto max-w-[175px] sm:h-9 sm:max-w-[200px] md:h-10 md:max-w-[230px] object-contain object-left"
            />
          </a>

          <div className="hidden md:flex items-center gap-2 lg:gap-3">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <a
                  key={link.path}
                  href={link.path}
                  className={`flex items-center gap-2 px-3 py-2 rounded-xl font-body text-sm transition-all duration-200 relative no-underline ${
                    isActive(link.path) ? 'tawang-nav-link-active shadow-tawang-glow' : 'tawang-nav-link'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{link.label}</span>
                  {link.badge != null && link.badge > 0 && (
                    <span className="absolute -top-1 -right-1 bg-tawang-gold text-tawang-navy text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                      {link.badge > 9 ? '9+' : link.badge}
                    </span>
                  )}
                </a>
              );
            })}
          </div>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-3 -m-1 rounded-xl tawang-nav-link min-w-[44px] min-h-[44px] flex items-center justify-center touch-manipulation"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-tawang-gold/25 bg-tawang-navy/95 backdrop-blur-sm">
          <div className="px-4 py-4 space-y-2">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <a
                  key={link.path}
                  href={link.path}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 relative no-underline font-body ${
                    isActive(link.path) ? 'tawang-nav-link-active' : 'tawang-nav-link'
                  }`}
                >
                  <Icon className="w-6 h-6" />
                  <span className="text-lg">{link.label}</span>
                  {link.badge != null && link.badge > 0 && (
                    <span className="ml-auto bg-tawang-gold text-tawang-navy text-sm font-bold rounded-full w-6 h-6 flex items-center justify-center">
                      {link.badge > 9 ? '9+' : link.badge}
                    </span>
                  )}
                </a>
              );
            })}
          </div>
        </div>
      )}
    </nav>
  );
}
