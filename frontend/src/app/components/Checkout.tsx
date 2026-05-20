import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Check, MapPin, CreditCard, Package, ChevronLeft } from 'lucide-react';
import { getCart, getAddresses, saveAddress, createOrder, clearCart } from '../utils/storage';
import { getProductById } from '../data/products';
import type { Address } from '../utils/storage';
import { toast } from 'sonner';
import { PageHeading } from './PageHeading';
import { ProductImage } from './ProductImage';

type CheckoutStep = 'address' | 'review' | 'payment';

const FIXED_CITY = 'Tawang';
const FIXED_STATE = 'Arunachal Pradesh';
const FIXED_PINCODE = '790104';
const MOBILE_REGEX = /^[6-9]\d{9}$/;

export function Checkout() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<CheckoutStep>('address');
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<'cod' | null>(null);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const redirectTimerRef = useRef<number | null>(null);
  const [cartItems, setCartItems] = useState(() => getCart());

  const [newAddress, setNewAddress] = useState({
    name: '',
    mobile: '',
    house: '',
    city: FIXED_CITY,
    state: FIXED_STATE,
    pincode: FIXED_PINCODE
  });

  useEffect(() => {
    const syncCart = () => setCartItems(getCart());
    syncCart();
    window.addEventListener('storage', syncCart);
    window.addEventListener('cartUpdated', syncCart);
    return () => {
      window.removeEventListener('storage', syncCart);
      window.removeEventListener('cartUpdated', syncCart);
    };
  }, []);

  useEffect(() => {
    loadAddresses();
  }, []);

  useEffect(() => {
    if (!orderPlaced && cartItems.length === 0) {
      navigate('/cart');
    }
  }, [cartItems.length, navigate, orderPlaced]);

  useEffect(() => {
    return () => {
      if (redirectTimerRef.current !== null) {
        window.clearTimeout(redirectTimerRef.current);
      }
    };
  }, []);

  const loadAddresses = () => {
    const savedAddresses = getAddresses();
    setAddresses(savedAddresses);
    if (savedAddresses.length > 0 && !selectedAddress) {
      setSelectedAddress(savedAddresses[0]);
    }
  };

  const calculateTotal = () => {
    const subtotal = cartItems.reduce((total, item) => {
      const product = getProductById(item.productId);
      return total + (product?.price || 0) * item.quantity;
    }, 0);
    const FREE_DELIVERY_THRESHOLD = 299;
    const DELIVERY_CHARGE = 39;
    const deliveryCharge = subtotal >= FREE_DELIVERY_THRESHOLD ? 0 : DELIVERY_CHARGE;
    return { subtotal, deliveryCharge, total: subtotal + deliveryCharge };
  };

  const { subtotal, deliveryCharge, total } = calculateTotal();

  const handleAddAddress = () => {
    if (!newAddress.name || !newAddress.mobile || !newAddress.house || 
        !newAddress.city || !newAddress.state || !newAddress.pincode) {
      toast.error('Please fill all address fields');
      return;
    }

    const mobileDigits = newAddress.mobile.replace(/\D/g, '');
    if (!MOBILE_REGEX.test(mobileDigits)) {
      toast.error('Please enter a valid 10-digit mobile number');
      return;
    }

    const normalizedAddress = {
      ...newAddress,
      mobile: mobileDigits,
      city: FIXED_CITY,
      state: FIXED_STATE,
      pincode: FIXED_PINCODE
    };
    const savedAddr = saveAddress(normalizedAddress);
    setSelectedAddress(savedAddr);
    loadAddresses();
    setShowAddressForm(false);
    setNewAddress({
      name: '',
      mobile: '',
      house: '',
      city: FIXED_CITY,
      state: FIXED_STATE,
      pincode: FIXED_PINCODE
    });
    toast.success('Address added successfully');
  };

  const handlePlaceOrder = () => {
    if (!selectedAddress) {
      toast.error('Please select a delivery address');
      return;
    }

    if (!paymentMethod) {
      toast.error('Please select a payment method');
      return;
    }

    setIsProcessing(true);
    const order = createOrder(cartItems, selectedAddress, paymentMethod, total, {
      paymentStatus: 'pending'
    });
    clearCart();
    window.dispatchEvent(new Event('cartUpdated'));
    setIsProcessing(false);
    setOrderPlaced(true);
    toast.success(`Order #${order.id} placed successfully`);
    redirectTimerRef.current = window.setTimeout(() => navigate('/'), 2200);
  };

  const canProceedToReview = selectedAddress !== null;
  const canProceedToPayment = selectedAddress !== null;
  const canPlaceOrder = selectedAddress !== null && paymentMethod !== null;

  const steps = [
    { id: 'address', label: 'Address', icon: MapPin },
    { id: 'review', label: 'Review', icon: Package },
    { id: 'payment', label: 'Payment', icon: CreditCard }
  ];

  return (
    <div className="min-h-screen max-w-full overflow-x-hidden bg-tawang-cream">
      {!orderPlaced && <PageHeading title="Checkout" variant="cream" sticky={false} />}

      <div className="mx-auto max-w-7xl px-3 py-4 sm:px-4 md:py-8">
        {orderPlaced ? (
          <div className="max-w-xl mx-auto bg-white rounded-xl shadow-md p-6 md:p-8 text-center">
            <div className="w-14 h-14 mx-auto rounded-full bg-tawang-beige flex items-center justify-center mb-4">
              <Check className="w-7 h-7 text-tawang-gold" />
            </div>
            <h2 className="font-heading text-2xl md:text-3xl mb-2">Order Placed Successfully</h2>
            <p className="text-gray-600 mb-6">
              Redirecting to home page automatically...
            </p>
            <Link
              to="/"
              className="inline-block px-6 py-3 bg-tawang-gold text-white/90 rounded-lg hover:bg-tawang-gold transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <>
        <Link
          to="/cart"
          className="mb-4 inline-flex items-center gap-2 rounded-full px-1 py-1 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-200 active:bg-gray-300 sm:mb-6 md:text-base"
          aria-label="Go back to cart"
        >
          <ChevronLeft className="h-6 w-6 shrink-0" strokeWidth={2.5} />
          Back to cart
        </Link>

        {/* Step Indicator */}
        <div className="flex items-center justify-center mb-8 md:mb-12 overflow-x-auto px-4">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isActive = currentStep === step.id;
            const isCompleted = 
              (step.id === 'address' && (currentStep === 'review' || currentStep === 'payment')) ||
              (step.id === 'review' && currentStep === 'payment');

            return (
              <div key={step.id} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div className={`w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center border-2 transition-colors ${
                    isCompleted ? 'bg-tawang-gold border-tawang-gold text-white' :
                    isActive ? 'bg-tawang-gold border-tawang-gold text-white' :
                    'bg-white border-gray-300 text-gray-400'
                  }`}>
                    {isCompleted ? <Check className="w-5 h-5 md:w-8 md:h-8" /> : <Icon className="w-5 h-5 md:w-8 md:h-8" />}
                  </div>
                  <span className={`mt-1 md:mt-2 text-xs md:text-lg whitespace-nowrap ${isActive || isCompleted ? 'text-gray-900' : 'text-gray-400'}`}>
                    {step.label}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-12 md:w-32 h-1 mx-2 md:mx-4 ${isCompleted ? 'bg-tawang-gold' : 'bg-gray-300'}`} />
                )}
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Address Step */}
            {currentStep === 'address' && (
              <div className="bg-white rounded-lg md:rounded-xl shadow-md p-4 md:p-6">
                <h2 className="font-heading text-xl md:text-2xl mb-4 md:mb-6">Select Delivery Address</h2>

                {addresses.length > 0 && (
                  <div className="space-y-3 md:space-y-4 mb-4 md:mb-6">
                    {addresses.map((address) => (
                      <div
                        key={address.id}
                        onClick={() => setSelectedAddress(address)}
                        className={`p-3 md:p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                          selectedAddress?.id === address.id
                            ? 'border-tawang-gold bg-tawang-beige'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="min-w-0 flex-1">
                            <p className="text-base md:text-lg mb-1 truncate">{address.name}</p>
                            <p className="text-sm md:text-base text-gray-600">{address.mobile}</p>
                            <p className="text-sm md:text-base text-gray-600">{address.house}</p>
                            <p className="text-sm md:text-base text-gray-600">
                              {address.city}, {address.state} - {address.pincode}
                            </p>
                          </div>
                          {selectedAddress?.id === address.id && (
                            <Check className="w-5 h-5 md:w-6 md:h-6 text-tawang-gold flex-shrink-0" />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {!showAddressForm ? (
                  <button
                    onClick={() => setShowAddressForm(true)}
                    className="w-full px-4 md:px-6 py-2.5 md:py-3 text-sm md:text-base border-2 border-tawang-gold text-tawang-gold rounded-lg hover:bg-tawang-beige transition-colors"
                  >
                    + Add New Address
                  </button>
                ) : (
                  <div className="border-2 border-gray-200 rounded-lg p-4 md:p-6">
                    <h3 className="font-heading text-lg md:text-xl mb-3 md:mb-4">Add New Address</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                      <input
                        type="text"
                        placeholder="Full Name"
                        value={newAddress.name}
                        onChange={(e) => setNewAddress({ ...newAddress, name: e.target.value })}
                        className="px-3 md:px-4 py-2.5 md:py-3 text-sm md:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-tawang-gold"
                      />
                      <input
                        type="tel"
                        placeholder="Mobile Number"
                        value={newAddress.mobile}
                        onChange={(e) => {
                          const digitsOnly = e.target.value.replace(/\D/g, '').slice(0, 10);
                          setNewAddress({ ...newAddress, mobile: digitsOnly });
                        }}
                        inputMode="numeric"
                        maxLength={10}
                        pattern="[0-9]{10}"
                        className="px-3 md:px-4 py-2.5 md:py-3 text-sm md:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-tawang-gold"
                      />
                      <input
                        type="text"
                        placeholder="House / Street"
                        value={newAddress.house}
                        onChange={(e) => setNewAddress({ ...newAddress, house: e.target.value })}
                        className="md:col-span-2 px-3 md:px-4 py-2.5 md:py-3 text-sm md:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-tawang-gold"
                      />
                      <input
                        type="text"
                        placeholder="City"
                        value={newAddress.city}
                        disabled
                        className="px-3 md:px-4 py-2.5 md:py-3 text-sm md:text-base border border-gray-300 rounded-lg bg-tawang-beige text-gray-700 cursor-not-allowed"
                      />
                      <input
                        type="text"
                        placeholder="State"
                        value={newAddress.state}
                        disabled
                        className="px-3 md:px-4 py-2.5 md:py-3 text-sm md:text-base border border-gray-300 rounded-lg bg-tawang-beige text-gray-700 cursor-not-allowed"
                      />
                      <input
                        type="text"
                        placeholder="Pincode"
                        value={newAddress.pincode}
                        disabled
                        className="px-3 md:px-4 py-2.5 md:py-3 text-sm md:text-base border border-gray-300 rounded-lg bg-tawang-beige text-gray-700 cursor-not-allowed"
                      />
                      <div className="md:col-span-2 flex items-center gap-2 rounded-lg bg-tawang-beige border border-tawang-gold/25 px-3 py-2">
                        <MapPin className="w-4 h-4 md:w-5 md:h-5 text-tawang-gold animate-bounce" />
                        <p className="text-xs md:text-sm font-bold text-tawang-gold">
                          Your order will be within the range of 5km from your existing location.
                        </p>
                      </div>
                      <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-2">
                        <div className="rounded-lg border border-gray-200 bg-white px-3 py-2">
                          <p className="text-xs font-semibold text-gray-800">Fast Delivery</p>
                          <p className="text-[11px] text-gray-600">Most orders reach in 20-40 minutes.</p>
                        </div>
                        <div className="rounded-lg border border-gray-200 bg-white px-3 py-2">
                          <p className="text-xs font-semibold text-gray-800">Local Service Area</p>
                          <p className="text-[11px] text-gray-600">Delivery support only within Tawang region.</p>
                        </div>
                        <div className="rounded-lg border border-gray-200 bg-white px-3 py-2">
                          <p className="text-xs font-semibold text-gray-800">Live Order Updates</p>
                          <p className="text-[11px] text-gray-600">Track order status from pending to delivered.</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-3 md:gap-4 mt-3 md:mt-4">
                      <button
                        onClick={handleAddAddress}
                        className="flex-1 px-4 md:px-6 py-2.5 md:py-3 text-sm md:text-base bg-tawang-gold text-white/90 rounded-lg hover:bg-tawang-gold transition-colors"
                      >
                        Save Address
                      </button>
                      <button
                        onClick={() => setShowAddressForm(false)}
                        className="flex-1 px-4 md:px-6 py-2.5 md:py-3 text-sm md:text-base border border-gray-300 text-gray-700 rounded-lg hover:bg-tawang-beige transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}

                <button
                  onClick={() => setCurrentStep('review')}
                  disabled={!canProceedToReview}
                  className="w-full mt-4 md:mt-6 px-4 md:px-6 py-3 md:py-4 text-base md:text-lg bg-tawang-gold text-white/90 rounded-lg hover:bg-tawang-gold disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                >
                  Continue to Review
                </button>
              </div>
            )}

            {/* Review Step */}
            {currentStep === 'review' && (
              <div className="bg-white rounded-lg md:rounded-xl shadow-md p-4 md:p-6">
                <h2 className="font-heading text-xl md:text-2xl mb-4 md:mb-6">Review Your Order</h2>

                {/* Delivery Address */}
                {selectedAddress && (
                  <div className="mb-4 md:mb-6 p-3 md:p-4 bg-tawang-beige rounded-lg">
                    <h3 className="font-heading text-base md:text-lg mb-2">Delivery Address</h3>
                    <p className="text-sm md:text-base mb-1">{selectedAddress.name}</p>
                    <p className="text-xs md:text-base text-gray-600">{selectedAddress.mobile}</p>
                    <p className="text-xs md:text-base text-gray-600">{selectedAddress.house}</p>
                    <p className="text-xs md:text-base text-gray-600">
                      {selectedAddress.city}, {selectedAddress.state} - {selectedAddress.pincode}
                    </p>
                    <button
                      onClick={() => setCurrentStep('address')}
                      className="mt-2 text-tawang-gold hover:underline"
                    >
                      Change Address
                    </button>
                  </div>
                )}

                {/* Order Items */}
                <div className="space-y-4 mb-6">
                  <h3 className="font-heading text-lg">Order Items</h3>
                  {cartItems.map((item) => {
                    const product = getProductById(item.productId);
                    if (!product) return null;

                    return (
                      <div key={item.productId} className="flex gap-4 p-4 border border-gray-200 rounded-lg">
                        <ProductImage size="thumb" src={product.image} alt={product.name} containerClassName="rounded flex-shrink-0" />
                        <div className="flex-1">
                          <h4 className="font-heading text-lg">{product.name}</h4>
                          <p className="text-gray-600">Quantity: {item.quantity}</p>
                          <p className="text-tawang-gold">₹{product.price} x {item.quantity}</p>
                        </div>
                        <div className="text-lg">
                          ₹{product.price * item.quantity}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Estimated Delivery */}
                <div className="p-4 bg-tawang-beige rounded-lg mb-6">
                  <p className="text-tawang-gold">
                    Average delivery: <strong>15 - 30 minutes</strong>
                  </p>
                </div>

                <button
                  onClick={() => setCurrentStep('payment')}
                  disabled={!canProceedToPayment}
                  className="w-full px-4 md:px-6 py-3 md:py-4 text-base md:text-lg bg-tawang-gold text-white/90 rounded-lg hover:bg-tawang-gold disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                >
                  Continue to Payment
                </button>
              </div>
            )}

            {/* Payment Step */}
            {currentStep === 'payment' && (
              <div className="bg-white rounded-lg md:rounded-xl shadow-md p-4 md:p-6">
                <h2 className="font-heading text-xl md:text-2xl mb-4 md:mb-6">Select Payment Method</h2>

                <div className="space-y-3 md:space-y-4 mb-4 md:mb-6">
                  <div
                    onClick={() => setPaymentMethod('cod')}
                    className={`p-4 md:p-6 border-2 rounded-lg cursor-pointer transition-colors ${
                      paymentMethod === 'cod'
                        ? 'border-tawang-gold bg-tawang-beige'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3 md:gap-4 min-w-0">
                        <div className="w-10 h-10 md:w-12 md:h-12 bg-tawang-beige rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-xl md:text-2xl">💵</span>
                        </div>
                        <div className="min-w-0">
                          <h3 className="font-heading text-base md:text-xl truncate">Cash on Delivery</h3>
                          <p className="text-xs md:text-base text-gray-600">Pay when you receive your order</p>
                        </div>
                      </div>
                      {paymentMethod === 'cod' && (
                        <Check className="w-5 h-5 md:w-6 md:h-6 text-tawang-gold flex-shrink-0" />
                      )}
                    </div>
                  </div>
                </div>
                {paymentMethod === 'cod' && (
                  <button
                    onClick={handlePlaceOrder}
                    disabled={!canPlaceOrder || isProcessing}
                    className="w-full px-4 md:px-6 py-3 md:py-4 text-base md:text-lg bg-tawang-gold text-white/90 rounded-lg hover:brightness-110 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
                  >
                    {isProcessing ? (
                      <>
                        <div className="w-5 h-5 md:w-6 md:h-6 border-4 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Processing...</span>
                      </>
                    ) : (
                      <>
                        <span>Place Order</span>
                        <span>₹{total}</span>
                      </>
                    )}
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg md:rounded-xl shadow-md p-4 md:p-6 lg:sticky lg:top-24">
              <h2 className="font-heading text-xl md:text-2xl mb-4 md:mb-6">Order Summary</h2>

              <div className="space-y-3 md:space-y-4 mb-4 md:mb-6">
                <div className="flex justify-between text-sm md:text-base">
                  <span className="text-gray-600">Items ({cartItems.length}):</span>
                  <span>₹{subtotal}</span>
                </div>

                <div className="flex justify-between text-sm md:text-base">
                  <span className="text-gray-600">Delivery:</span>
                  <span className={deliveryCharge === 0 ? 'text-tawang-gold' : ''}>
                    {deliveryCharge === 0 ? 'FREE' : `₹${deliveryCharge}`}
                  </span>
                </div>

                <div className="border-t pt-3 md:pt-4">
                  <div className="flex justify-between text-xl md:text-2xl">
                    <span>Total:</span>
                    <span className="text-tawang-gold">₹{total}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2 text-xs md:text-sm text-gray-600">
                <p>✓ Secure checkout</p>
                <p>✓ Easy returns within 7 days</p>
                <p>✓ Quality guaranteed</p>
              </div>
            </div>
          </div>
        </div>
        </>
        )}
      </div>
    </div>
  );
}
