import { Link, useLocation } from 'react-router-dom';
import { Home, Package, ShoppingCart, User } from 'lucide-react';
import { useEffect, useState } from 'react';
import { getCartCount } from '../utils/storage';

const navItems = [
  { path: '/', label: 'Home', icon: Home },
  { path: '/orders', label: 'Orders', icon: Package },
  { path: '/cart', label: 'Cart', icon: ShoppingCart, showBadge: true },
  { path: '/account', label: 'Account', icon: User },
];

export function MobileBottomNav() {
  const location = useLocation();
  const [cartCount, setCartCount] = useState(0);

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

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-green-700 border-t border-green-600"
      aria-label="Mobile navigation"
    >
      <div className="flex items-center justify-around h-16 px-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path);
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center justify-center flex-1 min-w-0 py-2 gap-0.5 transition-colors touch-manipulation ${
                active ? 'text-yellow-400' : 'text-yellow-100/80'
              }`}
            >
              <div className="relative">
                <Icon
                  className={`w-6 h-6 ${active ? 'stroke-[2.5]' : ''}`}
                  strokeWidth={active ? 2.5 : 2}
                />
                {item.showBadge && cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 min-w-[18px] h-[18px] px-1 flex items-center justify-center bg-red-500 text-white text-[10px] font-bold rounded-full">
                    {cartCount > 99 ? '99+' : cartCount}
                  </span>
                )}
              </div>
              <span className="text-[10px] font-medium truncate max-w-full">
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
