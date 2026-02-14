import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from './components/ui/sonner';
import { Navbar } from './components/Navbar';
import { HomePage } from './components/HomePage';
import { CategoryPage } from './components/CategoryPage';
import { ProductDetails } from './components/ProductDetails';
import { SearchResults } from './components/SearchResults';
import { Cart } from './components/Cart';
import { Checkout } from './components/Checkout';
import { OrderConfirmation } from './components/OrderConfirmation';
import { Orders } from './components/Orders';
import { Account } from './components/Account';

import { AuthProvider } from './context/AuthContext';
import { Footer } from './components/Footer';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/category/:category" element={<CategoryPage />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/search" element={<SearchResults />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/order-confirmation/:orderId" element={<OrderConfirmation />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/account" element={<Account />} />
          </Routes>
          <Toaster position="top-center" richColors />
          <Footer />
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}
