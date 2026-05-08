import { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { BarChart3, Download, Package, Search, Bell, ChevronRight } from 'lucide-react';
import { getProductById } from '../data/products';
import { cancelOrder, getOrders, updateOrderStatus } from '../utils/storage';
import type { Order } from '../utils/storage';
import { toast } from 'sonner';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
const INVOICE_LOGO_URL = '/assets/images/websites logo (2).png';

const statusLabelMap: Record<Order['status'], string> = {
  pending: 'Pending',
  accepted: 'Accepted',
  out_for_delivery: 'Out for Delivery',
  delivered: 'Delivered',
  cancelled: 'Cancelled'
};

const statusQuickFilters: { value: 'all' | Order['status']; label: string; badge: string; color: string }[] = [
  { value: 'all', label: 'All Orders', badge: '⚪', color: 'text-gray-700' },
  { value: 'pending', label: 'Pending Orders', badge: '🟡', color: 'text-amber-700' },
  { value: 'accepted', label: 'Accepted Orders', badge: '🟢', color: 'text-green-700' },
  { value: 'out_for_delivery', label: 'Out for Delivery', badge: '🔵', color: 'text-blue-700' },
  { value: 'delivered', label: 'Delivered Orders', badge: '🟣', color: 'text-purple-700' },
  { value: 'cancelled', label: 'Cancelled Orders', badge: '🔴', color: 'text-red-700' }
];

function isToday(dateIso: string) {
  const d = new Date(dateIso);
  const now = new Date();
  return d.getDate() === now.getDate() && d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
}

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

function csvEscape(value: string | number) {
  const str = String(value ?? '');
  return `"${str.replace(/"/g, '""')}"`;
}

const INVOICE_POLICY_LINES = [
  'Return policy: Return request allowed only within 15 minutes of order placement.',
  'Return accepted only for expired item or default/defective item.',
  'No return for any other reason.',
  'No exchange available.',
  'For return call: 8003759454'
];

async function getImageDataUrl(url: string) {
  const response = await fetch(url);
  const blob = await response.blob();
  return await new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(String(reader.result || ''));
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

async function downloadInvoice(order: Order) {
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
  doc.rect(0, 0, 210, 30, 'F');

  try {
    const logoData = await getImageDataUrl(INVOICE_LOGO_URL);
    if (logoData) {
      doc.addImage(logoData, 'PNG', 14, 8, 30, 12);
    }
  } catch {
    // If logo fails, fallback text keeps invoice usable.
  }

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(24);
  doc.setFont('helvetica', 'bold');
  // Keep only logo in header (no duplicate brand text).

  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text('Tax Invoice/Bill', 196, 19, { align: 'right' });

  // Order Details Section
  doc.setTextColor(textColor[0], textColor[1], textColor[2]);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.text('Order Details', 14, 42);

  doc.setFont('helvetica', 'normal');
  doc.text(`Order ID: ${order.id}`, 14, 49);
  doc.text(`Order Date: ${fmtDate(order.date)}`, 14, 55);
  doc.text(`Invoice Date: ${fmtDate(new Date().toISOString())}`, 14, 61);

  // Billing / Delivery Address Box
  doc.setFillColor(lightGray[0], lightGray[1], lightGray[2]);
  doc.rect(120, 36, 76, 30, 'F');

  doc.setFont('helvetica', 'bold');
  doc.text('Delivery Address:', 124, 43);
  doc.setFont('helvetica', 'normal');
  doc.text(`${order.address.name}`, 124, 49);
  doc.text(`${order.address.house}`, 124, 55);
  doc.text(`${order.address.city}, ${order.address.state} - ${order.address.pincode}`, 124, 61);
  doc.text(`Phone: ${order.address.mobile}`, 124, 67);

  // Table Data Preparation
  const tableData: (string | number)[][] = [];
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
    startY: 74,
    head: [['Sl. No', 'Description', 'Unit Price', 'Qty', 'Total']],
    body: tableData,
    theme: 'grid',
    headStyles: { fillColor: [255, 255, 255], textColor: 30, fontStyle: 'bold', lineColor: [70, 70, 70], lineWidth: 0.2 },
    styles: { fontSize: 9, cellPadding: 5, lineColor: [70, 70, 70], lineWidth: 0.2 },
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

  const policyStartY = finalY + 36;
  doc.setFont('helvetica', 'bold');
  doc.text('Return / Exchange Policy', 14, policyStartY);
  doc.setFont('helvetica', 'normal');
  INVOICE_POLICY_LINES.forEach((line, i) => {
    doc.text(`- ${line}`, 14, policyStartY + 6 + i * 6);
  });

  // Final Total Alignment
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('Total Amount:', 130, finalY + 22);
  doc.text(`Rs. ${order.total.toFixed(2)}`, 196, finalY + 22, { align: 'right' });

  // Footer
  doc.setFontSize(8);
  doc.setFont('helvetica', 'italic');
  doc.setTextColor(150, 150, 150);
  doc.text('Thank you for shopping with mybalag!', 105, 280, { align: 'center' });
  doc.text('This is a computer generated document and does not require a signature.', 105, 285, { align: 'center' });

  doc.save(`Invoice_${order.id}.pdf`);
}

export function Orders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [paymentFilter, setPaymentFilter] = useState<'all' | 'pending' | 'paid' | 'refunded'>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | Order['status']>('all');

  const [newOrderId, setNewOrderId] = useState<string | null>(null);
  const prevCountRef = useRef(0);

  useEffect(() => {
    const load = () => {
      const latest = getOrders();
      prevCountRef.current = latest.length;
      setOrders(latest);
    };
    load();

    const onOrdersUpdated = () => {
      const latest = getOrders();
      const prevCount = prevCountRef.current;
      if (latest.length > prevCount) {
        const added = latest[0]; // Newest first
        toast.success("It's Done! New order placed.", { duration: 4000 });
        setNewOrderId(added?.id || null);
        setTimeout(() => setNewOrderId(null), 3000);
      }
      prevCountRef.current = latest.length;
      setOrders(latest);
    };

    window.addEventListener('ordersUpdated', onOrdersUpdated);
    window.addEventListener('storage', onOrdersUpdated);
    return () => {
      window.removeEventListener('ordersUpdated', onOrdersUpdated);
      window.removeEventListener('storage', onOrdersUpdated);
    };
  }, []);

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const q = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !q ||
        order.id.toLowerCase().includes(q) ||
        order.address.name.toLowerCase().includes(q);

      const d = new Date(order.date);
      const fromOk = !dateFrom || d >= new Date(`${dateFrom}T00:00:00`);
      const toOk = !dateTo || d <= new Date(`${dateTo}T23:59:59`);

      const paymentOk = paymentFilter === 'all' || order.paymentStatus === paymentFilter;
      const statusOk = statusFilter === 'all' || order.status === statusFilter;
      return matchesSearch && fromOk && toOk && paymentOk && statusOk;
    });
  }, [orders, searchQuery, dateFrom, dateTo, paymentFilter, statusFilter]);

  const summary = useMemo(() => {
    const totalOrders = orders.length;
    const pendingOrders = orders.filter((o) => o.status === 'pending').length;
    const acceptedOrders = orders.filter((o) => o.status === 'accepted').length;
    const outForDelivery = orders.filter((o) => o.status === 'out_for_delivery').length;
    const deliveredOrders = orders.filter((o) => o.status === 'delivered').length;
    const cancelledOrders = orders.filter((o) => o.status === 'cancelled').length;
    const totalRevenue = orders
      .filter((o) => o.paymentStatus === 'paid')
      .reduce((sum, o) => sum + o.total, 0);
    const todaysOrders = orders.filter((o) => isToday(o.date)).length;
    return {
      totalOrders,
      pendingOrders,
      acceptedOrders,
      outForDelivery,
      deliveredOrders,
      cancelledOrders,
      totalRevenue,
      todaysOrders
    };
  }, [orders]);

  const monthlyData = useMemo(() => {
    const now = new Date();
    const result: { label: string; orders: number; revenue: number }[] = [];
    for (let i = 5; i >= 0; i -= 1) {
      const dt = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const label = dt.toLocaleDateString('en-IN', { month: 'short' });
      const monthOrders = orders.filter((o) => {
        const od = new Date(o.date);
        return od.getMonth() === dt.getMonth() && od.getFullYear() === dt.getFullYear();
      });
      result.push({
        label,
        orders: monthOrders.length,
        revenue: monthOrders.filter((o) => o.paymentStatus === 'paid').reduce((s, o) => s + o.total, 0)
      });
    }
    return result;
  }, [orders]);

  const maxOrdersInMonth = Math.max(...monthlyData.map((m) => m.orders), 1);

  const avgDeliveryMinutes = useMemo(() => {
    const delivered = orders.filter((o) => o.deliveredAt);
    if (!delivered.length) return null;
    const totalMins = delivered.reduce((sum, o) => {
      const start = new Date(o.date).getTime();
      const end = new Date(o.deliveredAt as string).getTime();
      return sum + Math.max(0, (end - start) / 60000);
    }, 0);
    return Math.round(totalMins / delivered.length);
  }, [orders]);

  const exportCsv = () => {
    const header = [
      'Order ID',
      'Customer Name',
      'Phone',
      'Order Date',
      'Status',
      'Payment Mode',
      'Payment Status',
      'Total'
    ];
    const rows = filteredOrders.map((o) => [
      csvEscape(o.id),
      csvEscape(o.address.name),
      csvEscape(o.address.mobile),
      csvEscape(fmtDate(o.date)),
      csvEscape(statusLabelMap[o.status]),
      csvEscape(o.paymentMethod === 'cod' ? 'Cash on Delivery' : 'Google Pay (UPI)'),
      csvEscape(o.paymentStatus),
      csvEscape(o.total)
    ]);
    const csv = [header.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `orders-${Date.now()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const renderOrderRow = (order: Order) => {
    const itemsLabel = order.items
      .map((item) => {
        const p = getProductById(item.productId);
        return p ? `${p.name} x${item.quantity}` : '';
      })
      .filter(Boolean)
      .join(', ');

    return (
      <div key={order.id} className="border rounded-lg p-3 md:p-4 bg-white">
        <div className="grid grid-cols-1 md:grid-cols-6 gap-2 md:gap-4 text-sm">
          <div>
            <p className="text-xs text-gray-500">Order ID</p>
            <p className="font-medium">{order.id}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Customer</p>
            <p>{order.address.name}</p>
            <p className="text-xs text-gray-500">{order.address.mobile}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Date & Time</p>
            <p>{fmtDate(order.date)}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Amount</p>
            <p className="text-green-700 font-semibold">₹{order.total}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Payment</p>
            <p>{order.paymentStatus}</p>
          </div>
          <div className="md:text-right">
            <p className="text-xs text-gray-500">Status</p>
            <p>{statusLabelMap[order.status]}</p>
          </div>
        </div>
        <p className="mt-2 text-xs md:text-sm text-gray-600">
          <strong>Items:</strong> {itemsLabel || '-'}
        </p>
        <p className="text-xs md:text-sm text-gray-600">
          <strong>Address:</strong> {order.address.house}, {order.address.city}, {order.address.state} - {order.address.pincode}
        </p>
      </div>
    );
  };

  const pendingOrders = filteredOrders.filter((o) => o.status === 'pending');
  const acceptedOrders = filteredOrders.filter((o) => o.status === 'accepted');
  const outForDeliveryOrders = filteredOrders.filter((o) => o.status === 'out_for_delivery');
  const deliveredOrders = filteredOrders.filter((o) => o.status === 'delivered');
  const cancelledOrders = filteredOrders.filter((o) => o.status === 'cancelled');
  const showPendingSection = statusFilter === 'all' || statusFilter === 'pending';
  const showAcceptedSection = statusFilter === 'all' || statusFilter === 'accepted';
  const showOutForDeliverySection = statusFilter === 'all' || statusFilter === 'out_for_delivery';
  const showDeliveredSection = statusFilter === 'all' || statusFilter === 'delivered';
  const showCancelledSection = statusFilter === 'all' || statusFilter === 'cancelled';

  return (
    <div className="min-h-screen bg-yellow-50/40">
      <div className="w-full px-2 md:px-4 py-4 md:py-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-6">
          <h1 className="text-2xl md:text-4xl">Order Dashboard</h1>
          <button
            onClick={exportCsv}
            className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-yellow-100 rounded-lg hover:bg-green-500 transition-colors"
          >
            <Download className="w-4 h-4" />
            Export CSV
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-8 gap-3 mb-6">
          <div className="bg-white rounded-lg p-3 shadow"><p className="text-xs text-gray-500">Total Orders</p><p className="text-xl">{summary.totalOrders}</p></div>
          <div className="bg-white rounded-lg p-3 shadow"><p className="text-xs text-gray-500">Pending</p><p className="text-xl text-amber-700">{summary.pendingOrders}</p></div>
          <div className="bg-white rounded-lg p-3 shadow"><p className="text-xs text-gray-500">Accepted</p><p className="text-xl text-blue-700">{summary.acceptedOrders}</p></div>
          <div className="bg-white rounded-lg p-3 shadow"><p className="text-xs text-gray-500">Out for Delivery</p><p className="text-xl text-indigo-700">{summary.outForDelivery}</p></div>
          <div className="bg-white rounded-lg p-3 shadow"><p className="text-xs text-gray-500">Delivered</p><p className="text-xl text-green-700">{summary.deliveredOrders}</p></div>
          <div className="bg-white rounded-lg p-3 shadow"><p className="text-xs text-gray-500">Cancelled</p><p className="text-xl text-red-700">{summary.cancelledOrders}</p></div>
          <div className="bg-white rounded-lg p-3 shadow"><p className="text-xs text-gray-500">Revenue</p><p className="text-xl text-green-700">₹{summary.totalRevenue}</p></div>
          <div className="bg-white rounded-lg p-3 shadow"><p className="text-xs text-gray-500">Today's Orders</p><p className="text-xl">{summary.todaysOrders}</p></div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-4 md:p-6 mb-6">
          <h2 className="text-lg md:text-2xl mb-4 inline-flex items-center gap-2"><Search className="w-5 h-5" /> Filters & Search</h2>
          <div className="mb-3 flex flex-wrap gap-2">
            {statusQuickFilters.map((item) => (
              <button
                key={item.value}
                type="button"
                onClick={() => setStatusFilter(item.value)}
                className={`px-3 py-1.5 rounded-full text-xs md:text-sm border transition-colors ${
                  statusFilter === item.value
                    ? 'bg-green-600 text-yellow-100 border-green-600'
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                }`}
              >
                <span className="mr-1">{item.badge}</span>
                <span className={statusFilter === item.value ? '' : item.color}>{item.label}</span>
              </button>
            ))}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            <input
              type="text"
              placeholder="Search Order ID / Customer Name"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="px-3 py-2 border rounded-lg"
            />
            <input type="date" value={dateFrom} onChange={(e) => setDateFrom(e.target.value)} className="px-3 py-2 border rounded-lg" />
            <input type="date" value={dateTo} onChange={(e) => setDateTo(e.target.value)} className="px-3 py-2 border rounded-lg" />
            <select
              value={paymentFilter}
              onChange={(e) => setPaymentFilter(e.target.value as 'all' | 'pending' | 'paid' | 'refunded')}
              className="px-3 py-2 border rounded-lg"
            >
              <option value="all">All Payment Status</option>
              <option value="pending">Pending</option>
              <option value="paid">Paid</option>
              <option value="refunded">Refunded</option>
            </select>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as 'all' | Order['status'])}
              className="px-3 py-2 border rounded-lg"
            >
              <option value="all">All Order Status</option>
              <option value="pending">Pending</option>
              <option value="accepted">Accepted</option>
              <option value="out_for_delivery">Out for Delivery</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-4 md:p-6 mb-6">
          <h2 className="text-lg md:text-2xl mb-4 inline-flex items-center gap-2"><BarChart3 className="w-5 h-5" /> Monthly Orders & Revenue</h2>
          <div className="grid grid-cols-6 gap-3 items-end h-52">
            {monthlyData.map((m) => (
              <div key={m.label} className="text-center">
                <div className="h-40 flex items-end justify-center">
                  <div
                    className="w-8 md:w-12 bg-green-500 rounded-t"
                    style={{ height: `${Math.max(10, (m.orders / maxOrdersInMonth) * 100)}%` }}
                    title={`${m.orders} orders | ₹${m.revenue}`}
                  />
                </div>
                <p className="text-xs mt-2">{m.label}</p>
                <p className="text-[10px] text-gray-500">{m.orders}</p>
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-600 mt-3">Bar height = orders count. Hover bar for revenue tooltip.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-xl p-4 shadow">
            <h3 className="font-semibold mb-1">Delivery Performance</h3>
            <p className="text-sm text-gray-600">Average delivery time</p>
            <p className="text-xl text-indigo-700">{avgDeliveryMinutes !== null ? `${avgDeliveryMinutes} mins` : 'No delivered orders yet'}</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow">
            <h3 className="font-semibold mb-1 inline-flex items-center gap-1"><Bell className="w-4 h-4" /> Real-time Notifications</h3>
            <p className="text-sm text-gray-600">New order alerts are enabled via local event listener.</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow">
            <h3 className="font-semibold mb-1">Customer Alerts</h3>
            <p className="text-sm text-gray-600">Email/SMS notifications are simulated via in-app toasts.</p>
          </div>
        </div>

        <div className="space-y-6">
          {showPendingSection && <section className="bg-white rounded-xl shadow-md p-4 md:p-6">
            <h2 className="text-lg md:text-2xl mb-3">🟡 Pending Orders ({pendingOrders.length})</h2>
            {pendingOrders.length === 0 && <p className="text-gray-500">No pending orders.</p>}
            <div className="space-y-3">
              {pendingOrders.map((order) => (
                <div
                  key={order.id}
                  className={`rounded-lg transition-all duration-500 ${newOrderId === order.id ? 'ring-2 ring-green-500 bg-green-50/50 animate-pulse' : ''
                    }`}
                  style={newOrderId === order.id ? { animationDuration: '1.5s' } : undefined}
                >
                  {newOrderId === order.id && (
                    <div className="text-sm font-semibold text-green-600 mb-2 flex items-center gap-1">
                      <span className="inline-block w-2 h-2 rounded-full bg-green-500 animate-ping" /> It&apos;s Done! New order
                    </div>
                  )}
                  {renderOrderRow(order)}
                  <div className="flex flex-wrap gap-2 mt-2">
                    <button onClick={() => { updateOrderStatus(order.id, 'accepted'); toast.success('Order accepted'); }} className="px-3 py-1.5 text-sm bg-green-600 text-white rounded">Accept</button>
                    <button onClick={() => { cancelOrder(order.id, 'Rejected by admin'); toast.info('Order rejected'); }} className="px-3 py-1.5 text-sm bg-red-600 text-white rounded">Reject</button>
                  </div>
                </div>
              ))}
            </div>
          </section>}

          {showAcceptedSection && <section className="bg-white rounded-xl shadow-md p-4 md:p-6">
            <h2 className="text-lg md:text-2xl mb-3">🟢 Accepted Orders ({acceptedOrders.length})</h2>
            {acceptedOrders.length === 0 && <p className="text-gray-500">No accepted orders.</p>}
            <div className="space-y-3">
              {acceptedOrders.map((order) => (
                <div key={order.id}>
                  {renderOrderRow(order)}
                  <div className="flex flex-wrap gap-2 mt-2">
                    <button onClick={() => { updateOrderStatus(order.id, 'out_for_delivery'); toast.success('Marked out for delivery'); }} className="px-3 py-1.5 text-sm bg-indigo-600 text-white rounded">Mark as Out for Delivery</button>
                    <button onClick={() => toast.success(`Notification sent to ${order.address.mobile}`)} className="px-3 py-1.5 text-sm border rounded">Notify Customer</button>
                  </div>
                </div>
              ))}
            </div>
          </section>}

          {showOutForDeliverySection && <section className="bg-white rounded-xl shadow-md p-4 md:p-6">
            <h2 className="text-lg md:text-2xl mb-3">🔵 Out for Delivery ({outForDeliveryOrders.length})</h2>
            {outForDeliveryOrders.length === 0 && <p className="text-gray-500">No orders out for delivery.</p>}
            <div className="space-y-3">
              {outForDeliveryOrders.map((order) => (
                <div key={order.id}>
                  {renderOrderRow(order)}
                  <p className="text-sm text-gray-600 mt-2">
                    <strong>Agent:</strong> {order.deliveryAgentName} ({order.deliveryAgentPhone}) | <strong>ETA:</strong> 15 - 30 minutes
                  </p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <button onClick={() => { updateOrderStatus(order.id, 'delivered'); toast.success('Marked delivered'); }} className="px-3 py-1.5 text-sm bg-green-700 text-white rounded">Mark as Delivered</button>
                  </div>
                </div>
              ))}
            </div>
          </section>}

          {showDeliveredSection && <section className="bg-white rounded-xl shadow-md p-4 md:p-6">
            <h2 className="text-lg md:text-2xl mb-3">🟣 Delivered Orders ({deliveredOrders.length})</h2>
            {deliveredOrders.length === 0 && <p className="text-gray-500">No delivered orders.</p>}
            <div className="space-y-3">
              {deliveredOrders.map((order) => (
                <div key={order.id}>
                  {renderOrderRow(order)}
                  <p className="text-sm text-gray-600 mt-2">Delivered Date: {fmtDate(order.deliveredAt || order.date)}</p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <button onClick={() => downloadInvoice(order)} className="px-3 py-1.5 text-sm bg-purple-600 text-white rounded inline-flex items-center gap-1">
                      <Download className="w-3 h-3" />
                      Download Invoice
                    </button>
                    <Link to={`/order-confirmation/${order.id}`} className="px-3 py-1.5 text-sm border rounded inline-flex items-center gap-1">
                      View
                      <ChevronRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </section>}

          {showCancelledSection && <section className="bg-white rounded-xl shadow-md p-4 md:p-6">
            <h2 className="text-lg md:text-2xl mb-3">🔴 Cancelled Orders ({cancelledOrders.length})</h2>
            {cancelledOrders.length === 0 && <p className="text-gray-500">No cancelled orders.</p>}
            <div className="space-y-3">
              {cancelledOrders.map((order) => (
                <div key={order.id}>
                  {renderOrderRow(order)}
                  <p className="text-sm text-gray-600 mt-2">
                    Cancel Reason: {order.cancellationReason || '-'} | Refund: {order.refundStatus || 'not_required'} | Date: {fmtDate(order.cancelledAt)}
                  </p>
                </div>
              ))}
            </div>
          </section>}
        </div>

        {orders.length === 0 && (
          <div className="text-center py-12">
            <Package className="w-16 h-16 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-600">No orders yet. Place first order from checkout.</p>
            <Link to="/" className="inline-block mt-4 px-4 py-2 bg-green-600 text-yellow-100 rounded-lg">Start Shopping</Link>
          </div>
        )}
      </div>
    </div>
  );
}
