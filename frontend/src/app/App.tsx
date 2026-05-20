import { lazy, Suspense, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { startProductsSync, stopProductsSync } from './services/productService';
import { startSiteContentSync, stopSiteContentSync } from './services/siteContentService';
import { ScrollToTop } from './components/ScrollToTop';
import { Toaster } from './components/ui/sonner';
import { Navbar } from './components/Navbar';
import { AuthProvider } from './context/AuthContext';
import { Footer } from './components/Footer';
import { MobileBottomNav } from './components/MobileBottomNav';
import { useLinkPrefetch } from './hooks/useLinkPrefetch';

const HomePage = lazy(() => import('./components/HomePage').then((m) => ({ default: m.HomePage })));
const CategoryPage = lazy(() => import('./components/CategoryPage').then((m) => ({ default: m.CategoryPage })));
const ProductDetails = lazy(() => import('./components/ProductDetails').then((m) => ({ default: m.ProductDetails })));
const SearchResults = lazy(() => import('./components/SearchResults').then((m) => ({ default: m.SearchResults })));
const Cart = lazy(() => import('./components/Cart').then((m) => ({ default: m.Cart })));
const Checkout = lazy(() => import('./components/Checkout').then((m) => ({ default: m.Checkout })));
const OrderConfirmation = lazy(() =>
  import('./components/OrderConfirmation').then((m) => ({ default: m.OrderConfirmation }))
);
const Account = lazy(() => import('./components/Account').then((m) => ({ default: m.Account })));
const AdminOrderDashboard = lazy(() =>
  import('./components/AdminOrderDashboard').then((m) => ({ default: m.AdminOrderDashboard }))
);
const CustomerOrders = lazy(() => import('./components/CustomerOrders').then((m) => ({ default: m.CustomerOrders })));

function PageLoader() {
  return (
    <div className="flex min-h-[50vh] items-center justify-center bg-tawang-cream">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-tawang-gold border-t-transparent" />
    </div>
  );
}

function AppRoutes() {
  useLinkPrefetch();
  const location = useLocation();
  const isAdminPanel = location.pathname.startsWith('/admin-dashboard');
  const isHome = location.pathname === '/';

  return (
    <div
      className={`flex min-h-screen flex-col relative max-w-full overflow-x-clip font-body ${
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
        className={`relative z-0 flex-1 max-w-full overflow-x-clip ${
          !isAdminPanel ? 'pt-[calc(3.5rem+env(safe-area-inset-top,0px))] sm:pt-[calc(4rem+env(safe-area-inset-top,0px))]' : ''
        }`}
      >
        <Suspense fallback={<PageLoader />}>
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
        </Suspense>
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
    startSiteContentSync();
    return () => {
      stopProductsSync();
      stopSiteContentSync();
    };
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
