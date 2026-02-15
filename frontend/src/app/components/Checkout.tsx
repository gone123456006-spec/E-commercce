import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, MapPin, CreditCard, Package, Loader2, Navigation } from 'lucide-react';
import { getCart, getAddresses, saveAddress, createOrder, clearCart } from '../utils/storage';
import { getProductById } from '../data/products';
import { isWithinDeliveryRange, SHOP_LOCATION } from '../utils/location';
import type { Address } from '../utils/storage';
import { toast } from 'sonner';

type LocationStatus = 'idle' | 'checking' | 'in_range' | 'out_of_range' | 'denied';

type CheckoutStep = 'address' | 'review' | 'payment';

export function Checkout() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<CheckoutStep>('address');
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'gpay' | null>(null);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const [locationStatus, setLocationStatus] = useState<LocationStatus>('idle');
  const [distanceKm, setDistanceKm] = useState<number | null>(null);
  const [isFetchingAddress, setIsFetchingAddress] = useState(false);

  const [newAddress, setNewAddress] = useState({
    name: '',
    mobile: '',
    house: '',
    city: '',
    state: '',
    pincode: ''
  });

  const cartItems = getCart();

  useEffect(() => {
    if (cartItems.length === 0) {
      navigate('/cart');
    }
    loadAddresses();
  }, [cartItems, navigate]);

  // Auto-detect location when on Address step
  const checkLocation = useCallback(() => {
    if (!navigator.geolocation) {
      setLocationStatus('denied');
      return;
    }
    setLocationStatus('checking');
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { inRange, distanceKm: d } = isWithinDeliveryRange(
          position.coords.latitude,
          position.coords.longitude
        );
        setDistanceKm(d);
        setLocationStatus(inRange ? 'in_range' : 'out_of_range');
      },
      () => setLocationStatus('denied')
    );
  }, []);

  useEffect(() => {
    if (currentStep === 'address') {
      checkLocation();
    }
  }, [currentStep, checkLocation]);

  const handleUseMyLocation = () => {
    if (!navigator.geolocation) {
      toast.error('Location is not supported');
      return;
    }
    setIsFetchingAddress(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { inRange, distanceKm: d } = isWithinDeliveryRange(
          position.coords.latitude,
          position.coords.longitude
        );
        setDistanceKm(d);
        setLocationStatus(inRange ? 'in_range' : 'out_of_range');
        if (!inRange) {
          setIsFetchingAddress(false);
          toast.error(`You're ${d.toFixed(1)}km from store. We deliver within 6km only.`);
          return;
        }
        try {
          const { lat, lng } = position.coords;
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`,
            { headers: { 'Accept-Language': 'en' } }
          );
          const data = await res.json();
          const addr = data?.address || {};
          setNewAddress((prev) => ({
            ...prev,
            house: [addr.road, addr.suburb, addr.village].filter(Boolean).join(', ') || prev.house,
            city: addr.city || addr.town || addr.county || addr.state_district || prev.city,
            state: addr.state || prev.state,
            pincode: addr.postcode || prev.pincode
          }));
          setShowAddressForm(true);
          toast.success('Address filled from your location');
        } catch {
          toast.error('Could not fetch address. Please enter manually.');
        }
        setIsFetchingAddress(false);
      },
      () => {
        setLocationStatus('denied');
        setIsFetchingAddress(false);
        toast.error('Allow location access');
      }
    );
  };

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
  const gpayQrUrl = `https://quickchart.io/qr?size=320&text=${encodeURIComponent(
    `upi://pay?pa=shopzone@okaxis&pn=ShopZone&am=${total}&cu=INR&tn=ShopZone%20Order%20Payment`
  )}`;

  const handleAddAddress = () => {
    if (!newAddress.name || !newAddress.mobile || !newAddress.house || 
        !newAddress.city || !newAddress.state || !newAddress.pincode) {
      toast.error('Please fill all address fields');
      return;
    }

    const savedAddr = saveAddress(newAddress);
    setSelectedAddress(savedAddr);
    loadAddresses();
    setShowAddressForm(false);
    setNewAddress({
      name: '',
      mobile: '',
      house: '',
      city: '',
      state: '',
      pincode: ''
    });
    toast.success('Address added successfully');
  };

  const handlePlaceOrder = (paymentStatusOverride?: 'pending' | 'paid') => {
    if (!selectedAddress) {
      toast.error('Please select a delivery address');
      return;
    }

    if (!paymentMethod) {
      toast.error('Please select a payment method');
      return;
    }

    // Verify delivery range (6km) using user's location
    if (!navigator.geolocation) {
      toast.error('Location access is required to verify delivery availability');
      return;
    }

    setIsProcessing(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { inRange, distanceKm } = isWithinDeliveryRange(
          position.coords.latitude,
          position.coords.longitude
        );
        if (!inRange) {
          setIsProcessing(false);
          toast.error(
            `We deliver only within ${SHOP_LOCATION.deliveryRadiusKm}km of our store. Your location is ${distanceKm.toFixed(1)}km away.`
          );
          return;
        }
        // Within range - place order
        const order = createOrder(cartItems, selectedAddress, paymentMethod, total, {
          paymentStatus: paymentStatusOverride || (paymentMethod === 'gpay' ? 'paid' : 'pending')
        });
        clearCart();
        window.dispatchEvent(new Event('cartUpdated'));
        setIsProcessing(false);
        navigate(`/order-confirmation/${order.id}`);
      },
      () => {
        setIsProcessing(false);
        toast.error('Please allow location access to verify we deliver to your area');
      }
    );
  };

  const canProceedToReview = selectedAddress !== null && locationStatus === 'in_range';
  const canProceedToPayment = selectedAddress !== null;
  const canPlaceOrder = selectedAddress !== null && paymentMethod !== null;

  const steps = [
    { id: 'address', label: 'Address', icon: MapPin },
    { id: 'review', label: 'Review', icon: Package },
    { id: 'payment', label: 'Payment', icon: CreditCard }
  ];

  return (
    <div className="min-h-screen bg-yellow-50/40">
      <div className="max-w-7xl mx-auto px-4 py-4 md:py-8">
        <h1 className="text-2xl md:text-4xl mb-4 md:mb-8">Checkout</h1>

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
                    isCompleted ? 'bg-green-500 border-green-500 text-white' :
                    isActive ? 'bg-green-600 border-green-600 text-white' :
                    'bg-white border-gray-300 text-gray-400'
                  }`}>
                    {isCompleted ? <Check className="w-5 h-5 md:w-8 md:h-8" /> : <Icon className="w-5 h-5 md:w-8 md:h-8" />}
                  </div>
                  <span className={`mt-1 md:mt-2 text-xs md:text-lg whitespace-nowrap ${isActive || isCompleted ? 'text-gray-900' : 'text-gray-400'}`}>
                    {step.label}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-12 md:w-32 h-1 mx-2 md:mx-4 ${isCompleted ? 'bg-green-500' : 'bg-gray-300'}`} />
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
                <h2 className="text-xl md:text-2xl mb-4 md:mb-6">Select Delivery Address</h2>

                {/* Auto-detect location status */}
                <div className={`mb-4 md:mb-6 p-4 rounded-lg border ${
                  locationStatus === 'in_range' ? 'bg-green-50 border-green-200' :
                  locationStatus === 'out_of_range' || locationStatus === 'denied' ? 'bg-red-50 border-red-200' :
                  'bg-blue-50 border-blue-200'
                }`}>
                  {(locationStatus === 'checking' || locationStatus === 'idle') && (
                    <p className="text-sm md:text-base flex items-center gap-2">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Detecting your location from store...
                    </p>
                  )}
                  {locationStatus === 'in_range' && distanceKm !== null && (
                    <p className="text-sm md:text-base text-green-800">
                      <Check className="inline w-4 h-4 mr-1" />
                      <strong>You're within delivery range.</strong> {distanceKm.toFixed(1)} km from our store.
                    </p>
                  )}
                  {locationStatus === 'out_of_range' && distanceKm !== null && (
                    <p className="text-sm md:text-base text-red-800">
                      <MapPin className="inline w-4 h-4 mr-1" />
                      You're <strong>{distanceKm.toFixed(1)} km</strong> from our store. We deliver within {SHOP_LOCATION.deliveryRadiusKm}km only.
                    </p>
                  )}
                  {locationStatus === 'denied' && (
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="text-sm md:text-base text-amber-800">Allow location access to verify delivery availability.</p>
                      <button onClick={checkLocation} className="text-sm px-3 py-1 bg-amber-100 text-amber-800 rounded hover:bg-amber-200">Retry</button>
                    </div>
                  )}
                  <p className="text-xs mt-2 text-gray-600">
                    Store: <a href={SHOP_LOCATION.mapsUrl} target="_blank" rel="noopener noreferrer" className="text-green-600 hover:underline">View on map</a>
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleUseMyLocation}
                  disabled={locationStatus === 'checking' || isFetchingAddress}
                  className="w-full mb-4 px-4 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500 disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {isFetchingAddress ? <Loader2 className="w-5 h-5 animate-spin" /> : <Navigation className="w-5 h-5" />}
                  Use my current location (auto-fill address)
                </button>

                {addresses.length > 0 && (
                  <div className="space-y-3 md:space-y-4 mb-4 md:mb-6">
                    {addresses.map((address) => (
                      <div
                        key={address.id}
                        onClick={() => setSelectedAddress(address)}
                        className={`p-3 md:p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                          selectedAddress?.id === address.id
                            ? 'border-green-600 bg-green-50'
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
                            <Check className="w-5 h-5 md:w-6 md:h-6 text-green-600 flex-shrink-0" />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {!showAddressForm ? (
                  <button
                    onClick={() => setShowAddressForm(true)}
                    className="w-full px-4 md:px-6 py-2.5 md:py-3 text-sm md:text-base border-2 border-green-600 text-green-600 rounded-lg hover:bg-green-50 transition-colors"
                  >
                    + Add New Address
                  </button>
                ) : (
                  <div className="border-2 border-gray-200 rounded-lg p-4 md:p-6">
                    <h3 className="text-lg md:text-xl mb-3 md:mb-4">Add New Address</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                      <input
                        type="text"
                        placeholder="Full Name"
                        value={newAddress.name}
                        onChange={(e) => setNewAddress({ ...newAddress, name: e.target.value })}
                        className="px-3 md:px-4 py-2.5 md:py-3 text-sm md:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                      />
                      <input
                        type="tel"
                        placeholder="Mobile Number"
                        value={newAddress.mobile}
                        onChange={(e) => setNewAddress({ ...newAddress, mobile: e.target.value })}
                        className="px-3 md:px-4 py-2.5 md:py-3 text-sm md:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                      />
                      <input
                        type="text"
                        placeholder="House / Street"
                        value={newAddress.house}
                        onChange={(e) => setNewAddress({ ...newAddress, house: e.target.value })}
                        className="md:col-span-2 px-3 md:px-4 py-2.5 md:py-3 text-sm md:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                      />
                      <input
                        type="text"
                        placeholder="City"
                        value={newAddress.city}
                        onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
                        className="px-3 md:px-4 py-2.5 md:py-3 text-sm md:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                      />
                      <input
                        type="text"
                        placeholder="State"
                        value={newAddress.state}
                        onChange={(e) => setNewAddress({ ...newAddress, state: e.target.value })}
                        className="px-3 md:px-4 py-2.5 md:py-3 text-sm md:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                      />
                      <input
                        type="text"
                        placeholder="Pincode"
                        value={newAddress.pincode}
                        onChange={(e) => setNewAddress({ ...newAddress, pincode: e.target.value })}
                        className="px-3 md:px-4 py-2.5 md:py-3 text-sm md:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                      />
                    </div>
                    <div className="flex flex-col sm:flex-row gap-3 md:gap-4 mt-3 md:mt-4">
                      <button
                        onClick={handleAddAddress}
                        className="flex-1 px-4 md:px-6 py-2.5 md:py-3 text-sm md:text-base bg-green-600 text-yellow-100 rounded-lg hover:bg-green-500 transition-colors"
                      >
                        Save Address
                      </button>
                      <button
                        onClick={() => setShowAddressForm(false)}
                        className="flex-1 px-4 md:px-6 py-2.5 md:py-3 text-sm md:text-base border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}

                <button
                  onClick={() => setCurrentStep('review')}
                  disabled={!canProceedToReview}
                  className="w-full mt-4 md:mt-6 px-4 md:px-6 py-3 md:py-4 text-base md:text-lg bg-green-600 text-yellow-100 rounded-lg hover:bg-green-500 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                >
                  Continue to Review
                </button>
              </div>
            )}

            {/* Review Step */}
            {currentStep === 'review' && (
              <div className="bg-white rounded-lg md:rounded-xl shadow-md p-4 md:p-6">
                <h2 className="text-xl md:text-2xl mb-4 md:mb-6">Review Your Order</h2>

                {/* Delivery Address */}
                {selectedAddress && (
                  <div className="mb-4 md:mb-6 p-3 md:p-4 bg-gray-50 rounded-lg">
                    <h3 className="text-base md:text-lg mb-2">Delivery Address</h3>
                    <p className="text-sm md:text-base mb-1">{selectedAddress.name}</p>
                    <p className="text-xs md:text-base text-gray-600">{selectedAddress.mobile}</p>
                    <p className="text-xs md:text-base text-gray-600">{selectedAddress.house}</p>
                    <p className="text-xs md:text-base text-gray-600">
                      {selectedAddress.city}, {selectedAddress.state} - {selectedAddress.pincode}
                    </p>
                    <button
                      onClick={() => setCurrentStep('address')}
                      className="mt-2 text-green-600 hover:underline"
                    >
                      Change Address
                    </button>
                  </div>
                )}

                {/* Order Items */}
                <div className="space-y-4 mb-6">
                  <h3 className="text-lg">Order Items</h3>
                  {cartItems.map((item) => {
                    const product = getProductById(item.productId);
                    if (!product) return null;

                    return (
                      <div key={item.productId} className="flex gap-4 p-4 border border-gray-200 rounded-lg">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-20 h-20 object-cover rounded"
                        />
                        <div className="flex-1">
                          <h4 className="text-lg">{product.name}</h4>
                          <p className="text-gray-600">Quantity: {item.quantity}</p>
                          <p className="text-green-600">₹{product.price} x {item.quantity}</p>
                        </div>
                        <div className="text-lg">
                          ₹{product.price * item.quantity}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Estimated Delivery */}
                <div className="p-4 bg-green-50 rounded-lg mb-6">
                  <p className="text-green-700">
                    Average delivery: <strong>15 - 30 minutes</strong>
                  </p>
                </div>

                <button
                  onClick={() => setCurrentStep('payment')}
                  disabled={!canProceedToPayment}
                  className="w-full px-4 md:px-6 py-3 md:py-4 text-base md:text-lg bg-green-600 text-yellow-100 rounded-lg hover:bg-green-500 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                >
                  Continue to Payment
                </button>
              </div>
            )}

            {/* Payment Step */}
            {currentStep === 'payment' && (
              <div className="bg-white rounded-lg md:rounded-xl shadow-md p-4 md:p-6">
                <h2 className="text-xl md:text-2xl mb-4 md:mb-6">Select Payment Method</h2>

                <div className="space-y-3 md:space-y-4 mb-4 md:mb-6">
                  <div
                    onClick={() => setPaymentMethod('cod')}
                    className={`p-4 md:p-6 border-2 rounded-lg cursor-pointer transition-colors ${
                      paymentMethod === 'cod'
                        ? 'border-green-600 bg-green-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3 md:gap-4 min-w-0">
                        <div className="w-10 h-10 md:w-12 md:h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-xl md:text-2xl">💵</span>
                        </div>
                        <div className="min-w-0">
                          <h3 className="text-base md:text-xl truncate">Cash on Delivery</h3>
                          <p className="text-xs md:text-base text-gray-600">Pay when you receive your order</p>
                        </div>
                      </div>
                      {paymentMethod === 'cod' && (
                        <Check className="w-5 h-5 md:w-6 md:h-6 text-green-600 flex-shrink-0" />
                      )}
                    </div>
                  </div>

                  <div
                    onClick={() => setPaymentMethod('gpay')}
                    className={`p-4 md:p-6 border-2 rounded-lg cursor-pointer transition-colors ${
                      paymentMethod === 'gpay'
                        ? 'border-green-600 bg-green-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3 md:gap-4 min-w-0">
                        <div className="w-10 h-10 md:w-12 md:h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-xl md:text-2xl">📱</span>
                        </div>
                        <div className="min-w-0">
                          <h3 className="text-base md:text-xl truncate">Google Pay (UPI)</h3>
                          <p className="text-xs md:text-base text-gray-600">Pay instantly using UPI</p>
                        </div>
                      </div>
                      {paymentMethod === 'gpay' && (
                        <Check className="w-5 h-5 md:w-6 md:h-6 text-green-600 flex-shrink-0" />
                      )}
                    </div>
                  </div>
                </div>
                {paymentMethod === 'gpay' && (
                  <div className="border border-green-200 rounded-lg p-4 bg-green-50 mb-4">
                    <h3 className="text-base md:text-lg mb-2 text-green-800">Scan & Pay with Google Pay (UPI)</h3>
                    <img
                      src={gpayQrUrl}
                      alt="Google Pay UPI QR"
                      className="w-56 h-56 md:w-72 md:h-72 object-contain mx-auto rounded-lg border bg-white"
                    />
                    <p className="text-xs md:text-sm text-gray-600 mt-3 text-center">
                      Scan this QR in GPay and complete payment of <strong>₹{total}</strong>.
                    </p>
                    <button
                      onClick={() => {
                        toast.success('Payment marked as completed. Placing order...');
                        handlePlaceOrder('paid');
                      }}
                      disabled={isProcessing}
                      className="w-full mt-4 px-4 md:px-6 py-3 md:py-4 text-base md:text-lg bg-green-600 text-yellow-100 rounded-lg hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                    >
                      I Have Paid - Auto Place Order
                    </button>
                  </div>
                )}

                {paymentMethod === 'cod' && (
                  <button
                    onClick={() => handlePlaceOrder('pending')}
                    disabled={!canPlaceOrder || isProcessing}
                    className="w-full px-4 md:px-6 py-3 md:py-4 text-base md:text-lg bg-green-600 text-yellow-100 rounded-lg hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
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
              <h2 className="text-xl md:text-2xl mb-4 md:mb-6">Order Summary</h2>

              <div className="space-y-3 md:space-y-4 mb-4 md:mb-6">
                <div className="flex justify-between text-sm md:text-base">
                  <span className="text-gray-600">Items ({cartItems.length}):</span>
                  <span>₹{subtotal}</span>
                </div>

                <div className="flex justify-between text-sm md:text-base">
                  <span className="text-gray-600">Delivery:</span>
                  <span className={deliveryCharge === 0 ? 'text-green-600' : ''}>
                    {deliveryCharge === 0 ? 'FREE' : `₹${deliveryCharge}`}
                  </span>
                </div>

                <div className="border-t pt-3 md:pt-4">
                  <div className="flex justify-between text-xl md:text-2xl">
                    <span>Total:</span>
                    <span className="text-green-600">₹{total}</span>
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
      </div>
    </div>
  );
}
