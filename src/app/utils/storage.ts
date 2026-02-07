export interface CartItem {
  productId: string;
  quantity: number;
}

export interface Address {
  id: string;
  name: string;
  mobile: string;
  house: string;
  city: string;
  state: string;
  pincode: string;
}

export interface Order {
  id: string;
  date: string;
  items: CartItem[];
  address: Address;
  paymentMethod: 'cod' | 'gpay';
  status: 'confirmed' | 'packed' | 'shipped' | 'delivered';
  total: number;
}

export interface UserProfile {
  name: string;
  email: string;
  phone: string;
}

// Local Storage Keys
const CART_KEY = 'ecommerce_cart';
const ADDRESSES_KEY = 'ecommerce_addresses';
const ORDERS_KEY = 'ecommerce_orders';
const PROFILE_KEY = 'ecommerce_profile';

// Cart Operations
export const getCart = (): CartItem[] => {
  const cart = localStorage.getItem(CART_KEY);
  return cart ? JSON.parse(cart) : [];
};

export const saveCart = (cart: CartItem[]): void => {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
};

export const addToCart = (productId: string, quantity: number = 1): void => {
  const cart = getCart();
  const existingItem = cart.find(item => item.productId === productId);
  
  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.push({ productId, quantity });
  }
  
  saveCart(cart);
};

export const updateCartItemQuantity = (productId: string, quantity: number): void => {
  const cart = getCart();
  const item = cart.find(item => item.productId === productId);
  
  if (item) {
    item.quantity = quantity;
    if (item.quantity <= 0) {
      removeFromCart(productId);
    } else {
      saveCart(cart);
    }
  }
};

export const removeFromCart = (productId: string): void => {
  const cart = getCart();
  const updatedCart = cart.filter(item => item.productId !== productId);
  saveCart(updatedCart);
};

export const clearCart = (): void => {
  localStorage.removeItem(CART_KEY);
};

export const getCartCount = (): number => {
  const cart = getCart();
  return cart.reduce((total, item) => total + item.quantity, 0);
};

// Address Operations
export const getAddresses = (): Address[] => {
  const addresses = localStorage.getItem(ADDRESSES_KEY);
  return addresses ? JSON.parse(addresses) : [];
};

export const saveAddress = (address: Omit<Address, 'id'>): Address => {
  const addresses = getAddresses();
  const newAddress: Address = {
    ...address,
    id: `addr_${Date.now()}`
  };
  addresses.push(newAddress);
  localStorage.setItem(ADDRESSES_KEY, JSON.stringify(addresses));
  return newAddress;
};

export const deleteAddress = (addressId: string): void => {
  const addresses = getAddresses();
  const updatedAddresses = addresses.filter(addr => addr.id !== addressId);
  localStorage.setItem(ADDRESSES_KEY, JSON.stringify(updatedAddresses));
};

// Order Operations
export const getOrders = (): Order[] => {
  const orders = localStorage.getItem(ORDERS_KEY);
  return orders ? JSON.parse(orders) : [];
};

export const createOrder = (
  items: CartItem[],
  address: Address,
  paymentMethod: 'cod' | 'gpay',
  total: number
): Order => {
  const orders = getOrders();
  const newOrder: Order = {
    id: `ORD${Date.now().toString().slice(-8)}`,
    date: new Date().toISOString(),
    items,
    address,
    paymentMethod,
    status: 'confirmed',
    total
  };
  orders.unshift(newOrder);
  localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
  return newOrder;
};

export const getOrderById = (orderId: string): Order | undefined => {
  const orders = getOrders();
  return orders.find(order => order.id === orderId);
};

export const updateOrderStatus = (orderId: string, status: Order['status']): void => {
  const orders = getOrders();
  const order = orders.find(o => o.id === orderId);
  if (order) {
    order.status = status;
    localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
  }
};

// Profile Operations
export const getProfile = (): UserProfile | null => {
  const profile = localStorage.getItem(PROFILE_KEY);
  return profile ? JSON.parse(profile) : null;
};

export const saveProfile = (profile: UserProfile): void => {
  localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
};

export const hasProfile = (): boolean => {
  return getProfile() !== null;
};
