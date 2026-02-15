import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Package, ChevronRight, ShoppingBag } from 'lucide-react';
import { getOrders } from '../utils/storage';
import { getProductById } from '../data/products';
import type { Order } from '../utils/storage';

const statusColors = {
  confirmed: 'bg-blue-100 text-blue-700 border-blue-200',
  packed: 'bg-yellow-100 text-yellow-700 border-yellow-200',
  shipped: 'bg-purple-100 text-purple-700 border-purple-200',
  delivered: 'bg-green-100 text-green-700 border-green-200'
};

const statusLabels = {
  confirmed: 'Confirmed',
  packed: 'Packed',
  shipped: 'Shipped',
  delivered: 'Delivered'
};

export function Orders() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = () => {
    setOrders(getOrders());
  };

  if (orders.length === 0) {
    return (
      <div className="min-h-screen bg-yellow-50/40 flex items-center justify-center px-4">
        <div className="text-center">
          <Package className="w-16 h-16 md:w-24 md:h-24 text-gray-300 mx-auto mb-3 md:mb-4" />
          <h2 className="text-2xl md:text-3xl mb-3 md:mb-4">No orders yet</h2>
          <p className="text-base md:text-lg lg:text-xl text-gray-600 mb-6 md:mb-8">Start shopping to see your orders here!</p>
          <Link
            to="/"
            className="inline-block px-6 md:px-8 py-3 md:py-4 bg-green-600 text-yellow-100 rounded-lg md:rounded-xl hover:bg-green-500 transition-colors text-base md:text-lg"
          >
            Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-yellow-50/40">
      <div className="max-w-7xl mx-auto px-4 py-4 md:py-8">
        <h1 className="text-2xl md:text-4xl mb-4 md:mb-8">My Orders</h1>

        <div className="space-y-4 md:space-y-6">
          {orders.map((order) => (
            <div key={order.id} className="bg-white rounded-lg md:rounded-xl shadow-md overflow-hidden">
              {/* Order Header */}
              <div className="bg-gray-50 px-4 md:px-6 py-4 border-b">
                <div className="grid grid-cols-2 md:flex md:flex-wrap items-start md:items-center md:justify-between gap-3 md:gap-4">
                  <div>
                    <p className="text-xs md:text-sm text-gray-600">Order ID</p>
                    <p className="text-base md:text-xl">#{order.id}</p>
                  </div>
                  <div>
                    <p className="text-xs md:text-sm text-gray-600">Order Date</p>
                    <p className="text-sm md:text-lg">
                      {new Date(order.date).toLocaleDateString('en-IN', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs md:text-sm text-gray-600">Total Amount</p>
                    <p className="text-base md:text-xl text-green-600 font-bold">₹{order.total}</p>
                  </div>
                  <div className="col-span-2 md:col-span-1">
                    <p className="text-xs md:text-sm text-gray-600 mb-1">Status</p>
                    <span className={`inline-block px-3 md:px-4 py-1.5 md:py-2 rounded-full text-xs md:text-sm border ${statusColors[order.status]}`}>
                      {statusLabels[order.status]}
                    </span>
                  </div>
                </div>
              </div>

              {/* Order Items */}
              <div className="p-4 md:p-6">
                <div className="space-y-4">
                  {order.items.map((item) => {
                    const product = getProductById(item.productId);
                    if (!product) return null;

                    return (
                      <div key={item.productId} className="flex gap-3 md:gap-4">
                        <Link to={`/product/${product.id}`}>
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-20 h-20 md:w-24 md:h-24 object-cover rounded-lg"
                          />
                        </Link>
                        <div className="flex-1 min-w-0">
                          <Link to={`/product/${product.id}`}>
                            <h3 className="text-base md:text-xl hover:text-blue-600 transition-colors mb-1 truncate">
                              {product.name}
                            </h3>
                          </Link>
                          <p className="text-sm md:text-base text-gray-600">Quantity: {item.quantity}</p>
                          <p className="text-sm md:text-lg text-blue-600">
                            ₹{product.price} x {item.quantity} = ₹{product.price * item.quantity}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Delivery Address */}
                <div className="mt-6 pt-6 border-t">
                  <h3 className="text-lg mb-2">Delivery Address</h3>
                  <p className="text-gray-700">{order.address.name}</p>
                  <p className="text-gray-600">{order.address.mobile}</p>
                  <p className="text-gray-600">{order.address.house}</p>
                  <p className="text-gray-600">
                    {order.address.city}, {order.address.state} - {order.address.pincode}
                  </p>
                </div>

                {/* Payment Method */}
                <div className="mt-4">
                  <h3 className="text-lg mb-2">Payment Method</h3>
                  <p className="text-gray-700">
                    {order.paymentMethod === 'cod' ? 'Cash on Delivery' : 'Google Pay (UPI)'}
                  </p>
                </div>

                {/* Order Timeline */}
                <div className="mt-6 pt-6 border-t">
                  <h3 className="text-base md:text-lg mb-4">Order Status Timeline</h3>
                  <div className="flex items-center justify-between relative px-2">
                    <div className="absolute top-4 md:top-5 left-0 right-0 h-1 bg-gray-200">
                      <div
                        className="h-full bg-blue-600 transition-all duration-500"
                        style={{
                          width:
                            order.status === 'confirmed' ? '0%' :
                            order.status === 'packed' ? '33%' :
                            order.status === 'shipped' ? '66%' :
                            '100%'
                        }}
                      />
                    </div>
                    {['confirmed', 'packed', 'shipped', 'delivered'].map((status, index) => {
                      const isComplete =
                        (status === 'confirmed') ||
                        (status === 'packed' && ['packed', 'shipped', 'delivered'].includes(order.status)) ||
                        (status === 'shipped' && ['shipped', 'delivered'].includes(order.status)) ||
                        (status === 'delivered' && order.status === 'delivered');

                      return (
                        <div key={status} className="relative flex flex-col items-center z-10">
                          <div className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center ${
                            isComplete ? 'bg-blue-600' : 'bg-gray-200'
                          }`}>
                            {isComplete ? (
                              <svg className="w-4 h-4 md:w-6 md:h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                            ) : (
                              <span className="text-xs md:text-sm text-gray-400">{index + 1}</span>
                            )}
                          </div>
                          <p className={`mt-1 md:mt-2 text-xs md:text-sm text-center ${isComplete ? 'text-gray-900' : 'text-gray-400'}`}>
                            {statusLabels[status as keyof typeof statusLabels]}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* View Details Button */}
                <Link
                  to={`/order-confirmation/${order.id}`}
                  className="mt-6 flex items-center justify-center gap-2 px-6 py-3 border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
                >
                  View Order Details
                  <ChevronRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
