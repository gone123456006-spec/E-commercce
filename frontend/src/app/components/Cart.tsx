import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Plus, Minus, Trash2, ShoppingBag } from 'lucide-react';
import { getCart, updateCartItemQuantity, removeFromCart } from '../utils/storage';
import { getProductById } from '../data/products';
import type { CartItem } from '../utils/storage';
import { toast } from 'sonner';
import { PageHeading } from './PageHeading';
import { ProductImage } from './ProductImage';

import { LoginModal } from './LoginModal';
import { useAuth } from '../context/AuthContext';

export function Cart() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const navigate = useNavigate();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = () => {
    setCartItems(getCart());
  };

  const handleUpdateQuantity = (productId: string, newQuantity: number) => {
    updateCartItemQuantity(productId, newQuantity);
    loadCart();
    window.dispatchEvent(new Event('cartUpdated'));
    toast.success('Cart updated');
  };

  const handleRemoveItem = (productId: string) => {
    removeFromCart(productId);
    loadCart();
    window.dispatchEvent(new Event('cartUpdated'));
    toast.success('Item removed from cart');
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => {
      const product = getProductById(item.productId);
      return total + (product?.price || 0) * item.quantity;
    }, 0);
  };

  const subtotal = calculateSubtotal();
  const FREE_DELIVERY_THRESHOLD = 299;
  const DELIVERY_CHARGE = 39;
  const deliveryCharge = subtotal > 0 ? (subtotal >= FREE_DELIVERY_THRESHOLD ? 0 : DELIVERY_CHARGE) : 0;
  const total = subtotal + deliveryCharge;

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen max-w-full overflow-x-hidden bg-tawang-cream flex items-center justify-center">
        <div className="text-center">
          <ShoppingBag className="w-24 h-24 text-gray-300 mx-auto mb-4" />
          <h2 className="font-heading text-3xl mb-4">Your cart is empty</h2>
          <p className="text-xl text-gray-600 mb-8">Add some products to get started!</p>
          <Link
            to="/"
            className="inline-block px-8 py-4 bg-tawang-gold text-white/90 rounded-xl hover:bg-tawang-gold transition-colors text-lg"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen max-w-full overflow-x-hidden bg-tawang-cream">
      <PageHeading title="Shopping Cart" variant="cream" sticky={false} />

      <div className="mx-auto max-w-7xl px-3 py-4 sm:px-4 md:py-8">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 md:gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => {
              const product = getProductById(item.productId);
              if (!product) return null;

              return (
                <div key={item.productId} className="bg-white rounded-xl shadow-md p-4 md:p-6">
                  <div className="flex gap-3 md:gap-6">
                    <Link to={`/product/${product.id}`} className="flex-shrink-0">
                      <ProductImage size="thumb" src={product.image} alt={product.name} containerClassName="rounded-lg" />
                    </Link>

                    <div className="flex-1 min-w-0">
                      <Link to={`/product/${product.id}`}>
                        <h3 className="font-heading text-base md:text-2xl mb-1 md:mb-2 hover:text-tawang-gold transition-colors truncate">
                          {product.name}
                        </h3>
                      </Link>
                      <p className="text-xs md:text-base text-gray-600 mb-2 md:mb-4 line-clamp-2">{product.description}</p>
                      <div className="text-lg md:text-2xl text-tawang-gold font-semibold mb-3 md:mb-4">₹{product.price}</div>

                      <div className="flex items-center justify-between flex-wrap gap-3">
                        <div className="flex items-center gap-2 md:gap-3">
                          <button
                            onClick={() => handleUpdateQuantity(product.id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                            className="w-8 h-8 md:w-10 md:h-10 rounded-full border-2 border-gray-300 flex items-center justify-center hover:bg-tawang-beige disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                          >
                            <Minus className="w-3 h-3 md:w-4 md:h-4" />
                          </button>
                          <span className="text-base md:text-xl w-8 md:w-12 text-center">{item.quantity}</span>
                          <button
                            onClick={() => handleUpdateQuantity(product.id, item.quantity + 1)}
                            disabled={item.quantity >= product.stock}
                            className="w-8 h-8 md:w-10 md:h-10 rounded-full border-2 border-gray-300 flex items-center justify-center hover:bg-tawang-beige disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                          >
                            <Plus className="w-3 h-3 md:w-4 md:h-4" />
                          </button>
                        </div>

                        <button
                          onClick={() => handleRemoveItem(product.id)}
                          className="text-red-600 hover:text-red-700 flex items-center gap-1 md:gap-2 transition-colors text-sm md:text-base"
                        >
                          <Trash2 className="w-4 h-4 md:w-5 md:h-5" />
                          <span>Remove</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Price Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-md p-4 md:p-6 lg:sticky lg:top-24">
              <h2 className="font-heading text-xl md:text-2xl mb-4 md:mb-6">Price Summary</h2>

              <div className="space-y-3 md:space-y-4 mb-4 md:mb-6">
                <div className="flex justify-between text-base md:text-lg">
                  <span className="text-gray-600">Subtotal:</span>
                  <span>₹{subtotal}</span>
                </div>

                <div className="flex justify-between text-base md:text-lg">
                  <span className="text-gray-600">Delivery Charge:</span>
                  <span className={deliveryCharge === 0 ? 'text-tawang-gold' : ''}>
                    {deliveryCharge === 0 ? 'FREE' : `₹${deliveryCharge}`}
                  </span>
                </div>

                {subtotal < FREE_DELIVERY_THRESHOLD && subtotal > 0 && (
                  <p className="text-xs md:text-sm text-gray-600 bg-tawang-cream p-2 md:p-3 rounded-lg border border-tawang-gold/25">
                    Add ₹{FREE_DELIVERY_THRESHOLD - subtotal} more to get FREE delivery!
                  </p>
                )}

                <div className="border-t pt-3 md:pt-4">
                  <div className="flex justify-between text-xl md:text-2xl">
                    <span>Total:</span>
                    <span className="text-tawang-gold font-bold">₹{total}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => {
                  if (isAuthenticated) {
                    navigate('/checkout');
                  } else {
                    setIsLoginModalOpen(true);
                  }
                }}
                className="w-full px-4 md:px-6 py-3 md:py-4 bg-tawang-gold text-white/90 rounded-xl hover:bg-tawang-gold transition-colors text-base md:text-lg"
              >
                Proceed to Checkout
              </button>

              <Link
                to="/"
                className="block text-center mt-3 md:mt-4 text-sm md:text-base text-tawang-gold hover:underline font-medium"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onSuccess={() => navigate('/checkout')}
      />
    </div>
  );
}
