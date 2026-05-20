import { useLocation } from 'react-router-dom';
import { Home, Package, ShoppingCart, User } from 'lucide-react';
import { useEffect, useState } from 'react';
import { getCartCount } from '../utils/storage';

const navItems = [
  { path: '/', label: 'Home', icon: Home },
  { path: '/orders', label: 'Orders', icon: Package },
  { path: '/cart', label: 'Cart', icon: ShoppingCart, showBadge: true },
  { path: '/account', label: 'Account', icon: User },
];

const SCROLL_END_THRESHOLD_PX = 72;

export function MobileBottomNav() {
  const location = useLocation();
  const [cartCount, setCartCount] = useState(0);
  const [atPageEnd, setAtPageEnd] = useState(false);

  const isHome = location.pathname === '/';

  useEffect(() => {
    const updateCartCount = () => setCartCount(getCartCount());
    updateCartCount();
    window.addEventListener('storage', updateCartCount);
    window.addEventListener('cartUpdated', updateCartCount);
    return () => {
      window.removeEventListener('storage', updateCartCount);
      window.removeEventListener('cartUpdated', updateCartCount);
    };
  }, []);

  useEffect(() => {
    const checkScrollEnd = () => {
      const scrollBottom = window.innerHeight + window.scrollY;
      const pageHeight = document.documentElement.scrollHeight;
      setAtPageEnd(scrollBottom >= pageHeight - SCROLL_END_THRESHOLD_PX);
    };

    checkScrollEnd();
    window.addEventListener('scroll', checkScrollEnd, { passive: true });
    window.addEventListener('resize', checkScrollEnd, { passive: true });
    return () => {
      window.removeEventListener('scroll', checkScrollEnd);
      window.removeEventListener('resize', checkScrollEnd);
    };
  }, [location.pathname]);

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <nav
      className={`fixed inset-x-3 z-[9999] max-w-[calc(100%-1.5rem)] md:hidden border border-tawang-gold/30 rounded-xl shadow-lg pointer-events-auto backdrop-blur-md transition-[bottom] duration-300 ease-out ${
        atPageEnd ? 'bottom-8' : 'bottom-3'
      } ${isHome ? 'bg-tawang-navy/55' : 'tawang-gradient-navy'}`}
      aria-label="Mobile navigation"
      style={{ isolation: 'isolate' }}
    >
      <div className="flex items-center justify-around h-12 px-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path);
          return (
            <a
              key={item.path}
              href={item.path}
              className={`flex flex-col items-center justify-center flex-1 min-w-0 py-1 gap-0 transition-all duration-200 touch-manipulation active:scale-95 cursor-pointer no-underline min-h-[40px] font-body ${
                active ? 'text-tawang-gold' : 'text-white/75 hover:text-tawang-gold'
              }`}
              aria-label={item.label}
              aria-current={active ? 'page' : undefined}
            >
              <div className="relative">
                <Icon
                  className={`w-5 h-5 ${active ? 'stroke-[2.5] drop-shadow-[0_0_6px_rgba(216,155,43,0.5)]' : ''}`}
                  strokeWidth={active ? 2.5 : 2}
                />
                {item.showBadge && cartCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 min-w-[15px] h-[15px] px-0.5 flex items-center justify-center bg-tawang-gold text-tawang-navy text-[9px] font-bold leading-none rounded-full pointer-events-none">
                    {cartCount > 99 ? '99+' : cartCount}
                  </span>
                )}
              </div>
              <span className="text-[9px] font-medium leading-tight truncate max-w-full mt-0.5">{item.label}</span>
            </a>
          );
        })}
      </div>
    </nav>
  );
}
