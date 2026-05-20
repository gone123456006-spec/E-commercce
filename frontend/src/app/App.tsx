import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { startProductsSync, stopProductsSync } from './services/productService';
import { ScrollToTop } from './components/ScrollToTop';
import { Toaster } from './components/ui/sonner';
import { Navbar } from './components/Navbar';
import { HomePage } from './components/HomePage';
import { CategoryPage } from './components/CategoryPage';
import { ProductDetails } from './components/ProductDetails';
import { SearchResults } from './components/SearchResults';
import { Cart } from './components/Cart';
import { Checkout } from './components/Checkout';
import { OrderConfirmation } from './components/OrderConfirmation';
import { Account } from './components/Account';
import { AdminOrderDashboard } from './components/AdminOrderDashboard';
import { CustomerOrders } from './components/CustomerOrders';

import { AuthProvider } from './context/AuthContext';
import { Footer } from './components/Footer';
import { MobileBottomNav } from './components/MobileBottomNav';
import { useLinkPrefetch } from './hooks/useLinkPrefetch';

function AppRoutes() {
  useLinkPrefetch();
  const location = useLocation();
  const isAdminPanel = location.pathname.startsWith('/admin-dashboard');
  const isHome = location.pathname === '/';

  return (
    <div
      className={`flex min-h-screen flex-col relative max-w-full overflow-x-hidden font-body ${
        isAdminPanel
          ? 'bg-tawang-beige'
          : `bg-tawang-cream ${isHome ? '' : 'pb-[calc(3.75rem+env(safe-area-inset-bottom,0px))] md:pb-0'}`
      }`}
    >
      {!isAdminPanel && (
        <header className="site-header-sticky fixed inset-x-0 top-0 z-[100] pt-[env(safe-area-inset-top,0px)]">
          <Navbar />
        </header>
      )}
      <main
        className={`relative z-0 flex-1 max-w-full overflow-x-hidden ${
          !isAdminPanel ? 'pt-[calc(3.5rem+env(safe-area-inset-top,0px))] sm:pt-[calc(4rem+env(safe-area-inset-top,0px))]' : ''
        }`}
      >
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/category/:category" element={<CategoryPage />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/order-confirmation/:orderId" element={<OrderConfirmation />} />
        <Route path="/orders" element={<CustomerOrders />} />
        <Route path="/account" element={<Account />} />
        <Route path="/admin-dashboard" element={<AdminOrderDashboard />} />
      </Routes>
      </main>
      <Toaster position="top-center" richColors />
      {!isAdminPanel && <Footer />}
      {!isAdminPanel && <MobileBottomNav />}
    </div>
  );
}

export default function App() {
  useEffect(() => {
    startProductsSync();
    return () => stopProductsSync();
  }, []);

  return (
    <AuthProvider>
      <BrowserRouter>
        <ScrollToTop />
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  );
}
