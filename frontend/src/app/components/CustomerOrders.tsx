import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Package, Download } from 'lucide-react';
import { getOrders } from '../utils/storage';
import { getProductById } from '../data/products';
import type { Order } from '../utils/storage';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

function fmtDate(dateIso?: string) {
  if (!dateIso) return '-';
  return new Date(dateIso).toLocaleString('en-IN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}

function downloadInvoice(order: Order) {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  // Theme Colors
  const primaryColor = [35, 47, 62]; // Amazon Navy
  const textColor = [51, 51, 51]; // Dark Gray
  const lightGray = [245, 245, 245];

  // Header Section
  doc.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.rect(0, 0, 210, 40, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(24);
  doc.setFont('helvetica', 'bold');
  doc.text('GajuStore', 14, 25);

  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text('Tax Invoice/Bill of Supply', 196, 25, { align: 'right' });

  // Order Details Section
  doc.setTextColor(textColor[0], textColor[1], textColor[2]);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.text('Order Details', 14, 55);

  doc.setFont('helvetica', 'normal');
  doc.text(`Order ID: ${order.id}`, 14, 62);
  doc.text(`Order Date: ${fmtDate(order.date)}`, 14, 68);
  doc.text(`Invoice Date: ${fmtDate(new Date().toISOString())}`, 14, 74);

  // Billing / Delivery Address Box
  doc.setFillColor(lightGray[0], lightGray[1], lightGray[2]);
  doc.rect(120, 48, 76, 32, 'F');

  doc.setFont('helvetica', 'bold');
  doc.text('Delivery Address:', 124, 55);
  doc.setFont('helvetica', 'normal');
  doc.text(`${order.address.name}`, 124, 61);
  doc.text(`${order.address.house}`, 124, 67);
  doc.text(`${order.address.city}, ${order.address.state} - ${order.address.pincode}`, 124, 73);
  doc.text(`Phone: ${order.address.mobile}`, 124, 79);

  // Table Data Preparation
  const tableData: any[] = [];
  let index = 1;
  order.items.forEach((item) => {
    const product = getProductById(item.productId);
    if (!product) return;
    tableData.push([
      index++,
      product.name,
      `Rs. ${product.price.toFixed(2)}`,
      item.quantity,
      `Rs. ${(product.price * item.quantity).toFixed(2)}`
    ]);
  });

  // Product Table
  autoTable(doc, {
    startY: 90,
    head: [['Sl. No', 'Description', 'Unit Price', 'Qty', 'Total']],
    body: tableData,
    theme: 'striped',
    headStyles: { fillColor: primaryColor as [number, number, number], textColor: 255, fontStyle: 'bold' },
    styles: { fontSize: 9, cellPadding: 5 },
    columnStyles: {
      0: { cellWidth: 20 },
      1: { cellWidth: 'auto' },
      2: { cellWidth: 30, halign: 'right' },
      3: { cellWidth: 20, halign: 'center' },
      4: { cellWidth: 35, halign: 'right' }
    }
  });

  // Totals Section
  const finalY = (doc as any).lastAutoTable.finalY || 150;

  doc.setFont('helvetica', 'bold');
  doc.text('Payment Information', 14, finalY + 15);
  doc.setFont('helvetica', 'normal');
  doc.text(`Payment Mode: ${order.paymentMethod === 'cod' ? 'Cash on Delivery' : 'Google Pay (UPI)'}`, 14, finalY + 22);
  doc.text(`Payment Status: ${order.paymentStatus}`, 14, finalY + 28);

  // Final Total Alignment
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('Total Amount:', 130, finalY + 22);
  doc.text(`Rs. ${order.total.toFixed(2)}`, 196, finalY + 22, { align: 'right' });

  // Footer
  doc.setFontSize(8);
  doc.setFont('helvetica', 'italic');
  doc.setTextColor(150, 150, 150);
  doc.text('Thank you for shopping with GajuStore!', 105, 280, { align: 'center' });
  doc.text('This is a computer generated document and does not require a signature.', 105, 285, { align: 'center' });

  doc.save(`Invoice_${order.id}.pdf`);
}

const statusColors: Record<Order['status'], string> = {
  pending: 'bg-amber-100 text-amber-700 border-amber-200',
  accepted: 'bg-blue-100 text-blue-700 border-blue-200',
  out_for_delivery: 'bg-purple-100 text-purple-700 border-purple-200',
  delivered: 'bg-green-100 text-green-700 border-green-200',
  cancelled: 'bg-red-100 text-red-700 border-red-200'
};

const statusLabels: Record<Order['status'], string> = {
  pending: 'Pending',
  accepted: 'Accepted',
  out_for_delivery: 'Out for Delivery',
  delivered: 'Delivered',
  cancelled: 'Cancelled'
};

export function CustomerOrders() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const loadOrders = () => setOrders(getOrders());
    loadOrders();
    window.addEventListener('ordersUpdated', loadOrders);
    return () => window.removeEventListener('ordersUpdated', loadOrders);
  }, []);

  if (orders.length === 0) {
    return (
      <div className="min-h-screen bg-yellow-50/40 flex items-center justify-center px-4">
        <div className="text-center">
          <Package className="w-16 h-16 md:w-24 md:h-24 text-gray-300 mx-auto mb-3 md:mb-4" />
          <h2 className="text-2xl md:text-3xl mb-3 md:mb-4">No orders yet</h2>
          <p className="text-base md:text-lg text-gray-600 mb-6">Start shopping to see your orders here!</p>
          <Link to="/" className="inline-block px-6 py-3 bg-green-600 text-yellow-100 rounded-lg hover:bg-green-500 transition-colors">
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

              <div className="p-4 md:p-6">
                <div className="space-y-4">
                  {order.items.map((item) => {
                    const product = getProductById(item.productId);
                    if (!product) return null;

                    return (
                      <div key={item.productId} className="flex gap-3 md:gap-4">
                        <Link to={`/product/${product.id}`}>
                          <img src={product.image} alt={product.name} className="w-20 h-20 md:w-24 md:h-24 object-cover rounded-lg" />
                        </Link>
                        <div className="flex-1 min-w-0">
                          <Link to={`/product/${product.id}`}>
                            <h3 className="text-base md:text-xl hover:text-blue-600 transition-colors mb-1 truncate">{product.name}</h3>
                          </Link>
                          <p className="text-sm md:text-base text-gray-600">Quantity: {item.quantity}</p>
                          <p className="text-sm md:text-lg text-blue-600">₹{product.price} x {item.quantity} = ₹{product.price * item.quantity}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-6 pt-6 border-t">
                  <h3 className="text-lg mb-2">Delivery Address</h3>
                  <p className="text-gray-700">{order.address.name}</p>
                  <p className="text-gray-600">{order.address.mobile}</p>
                  <p className="text-gray-600">{order.address.house}</p>
                  <p className="text-gray-600">{order.address.city}, {order.address.state} - {order.address.pincode}</p>
                </div>

                <div className="mt-4">
                  <h3 className="text-lg mb-2">Payment Method</h3>
                  <p className="text-gray-700">{order.paymentMethod === 'cod' ? 'Cash on Delivery' : 'Google Pay (UPI)'}</p>
                </div>

                <div className="mt-6 flex flex-wrap gap-3">
                  {order.status === 'delivered' && (
                    <button
                      onClick={() => downloadInvoice(order)}
                      className="flex items-center justify-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                    >
                      <Download className="w-5 h-5" />
                      Download Invoice
                    </button>
                  )}
                  <Link
                    to={`/order-confirmation/${order.id}`}
                    className="flex flex-1 items-center justify-center gap-2 px-6 py-3 border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
                  >
                    View Order Details
                    <ChevronRight className="w-5 h-5" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
