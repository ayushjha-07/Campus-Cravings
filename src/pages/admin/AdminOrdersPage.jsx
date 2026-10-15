import React, { useState, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import AdminLayout from '../../components/admin/AdminLayout';
import OrderDetailAdminModal from '../../components/admin/OrderDetailAdminModal';
import { useAdmin } from '../../context/AdminContext';
import { useMenu } from '../../context/MenuContext';
import { useCart } from '../../context/CartContext';
import { 
  ReceiptText, 
  Search, 
  Filter, 
  Download, 
  Clock, 
  Calendar, 
  CreditCard, 
  CheckCircle2, 
  AlertCircle, 
  XCircle, 
  ChefHat, 
  Eye, 
  ShieldAlert, 
  User, 
  Store,
  Sparkles
} from 'lucide-react';

export default function AdminOrdersPage() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const initialQuery = searchParams.get('q') || '';

  const { logAction, exportToCSV } = useAdmin();
  const { outlets } = useMenu();
  const { orders, updateOrderStatus } = useCart();

  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [outletFilter, setOutletFilter] = useState('ALL');
  const [paymentFilter, setPaymentFilter] = useState('ALL');
  const [sortBy, setSortBy] = useState('DATE_DESC');

  const [selectedOrder, setSelectedOrder] = useState(null);

  // Status Filter options
  const statusOptions = ['ALL', 'Order Placed', 'Confirmed', 'Preparing', 'Ready for Pickup', 'Collected', 'Cancelled'];

  // Filter and sort orders
  const filteredOrders = useMemo(() => {
    return orders.filter(order => {
      const matchesSearch = 
        (order.id && order.id.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (order.orderNumber && order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (order.studentName && order.studentName.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (order.studentId && order.studentId.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (order.outletName && order.outletName.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (order.items && order.items.some(i => i.name.toLowerCase().includes(searchQuery.toLowerCase())));

      const matchesStatus = 
        statusFilter === 'ALL' || 
        order.status === statusFilter ||
        (statusFilter === 'Order Placed' && order.status === 'Placed');

      const matchesOutlet = 
        outletFilter === 'ALL' || 
        (order.outletId === outletFilter || order.outletName?.toLowerCase().includes(outletFilter.toLowerCase()));

      const matchesPayment = 
        paymentFilter === 'ALL' ||
        (paymentFilter === 'ONLINE' && order.paymentMethod?.toLowerCase().includes('online')) ||
        (paymentFilter === 'CASH' && !order.paymentMethod?.toLowerCase().includes('online'));

      return matchesSearch && matchesStatus && matchesOutlet && matchesPayment;
    }).sort((a, b) => {
      if (sortBy === 'DATE_DESC') {
        return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
      }
      if (sortBy === 'DATE_ASC') {
        return new Date(a.createdAt || 0) - new Date(b.createdAt || 0);
      }
      if (sortBy === 'AMOUNT_DESC') {
        return (Number(b.total) || 0) - (Number(a.total) || 0);
      }
      if (sortBy === 'AMOUNT_ASC') {
        return (Number(a.total) || 0) - (Number(b.total) || 0);
      }
      return 0;
    });
  }, [orders, searchQuery, statusFilter, outletFilter, paymentFilter, sortBy]);

  // Handle Export CSV
  const handleExportCSV = () => {
    const headers = [
      { key: 'id', label: 'Order ID' },
      { key: 'pickupToken', label: 'Pickup Token' },
      { key: 'studentName', label: 'Student Name' },
      { key: 'studentId', label: 'Student ID' },
      { key: 'outletName', label: 'Outlet' },
      { key: 'total', label: 'Total (INR)' },
      { key: 'paymentMethod', label: 'Payment Method' },
      { key: 'paymentStatus', label: 'Payment Status' },
      { key: 'status', label: 'Order Status' },
      { key: 'orderDate', label: 'Order Date' }
    ];

    exportToCSV('CGC_Campus_Orders', filteredOrders, headers);
    logAction('Orders Exported to CSV', 'Order Records', `Exported ${filteredOrders.length} order rows`, 'data_export');
  };

  const handleAdminCancel = (orderId, reason) => {
    updateOrderStatus(orderId, 'Cancelled');
    logAction('Emergency Order Cancelled', `Order #${orderId}`, reason, 'order_cancel');
    setSelectedOrder(null);
  };

  const handleSaveAdminNote = (orderId, note) => {
    logAction('Admin Note Saved', `Order #${orderId}`, note, 'order_note');
    setSelectedOrder(null);
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        
        {/* Header and Export Action */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-black text-stone-900 tracking-tight">
                Campus Food Orders Management
              </h1>
              <span className="text-xs font-mono font-bold bg-[#0D3828] text-white px-2.5 py-0.5 rounded-full">
                {filteredOrders.length} Records
              </span>
            </div>
            <p className="text-stone-500 text-xs sm:text-sm mt-0.5">
              Inspect orders across all CGC cafeterias. (Operational preparation transitions belong to outlet staff terminals)
            </p>
          </div>

          <button
            onClick={handleExportCSV}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white border border-stone-200 hover:bg-stone-50 text-stone-700 text-xs font-bold shadow-2xs hover:shadow-md transition-all cursor-pointer shrink-0"
          >
            <Download className="w-4 h-4 text-[#0D3828]" />
            <span>Export to CSV</span>
          </button>
        </div>

        {/* Filters and Search Toolbar */}
        <div className="bg-white rounded-3xl p-4 sm:p-5 border border-stone-200/90 shadow-2xs space-y-4">
          
          {/* Top Row: Search & Sorters */}
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by Order ID (CGC-DEMO), student name, student ID, outlet, or food item..."
                className="w-full pl-10 pr-4 py-2 rounded-2xl border border-stone-200 text-xs focus:ring-2 focus:ring-[#0D3828] outline-hidden font-medium"
              />
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-stone-500 whitespace-nowrap">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 rounded-xl border border-stone-200 text-xs font-bold text-stone-700 focus:outline-hidden bg-stone-50 cursor-pointer"
              >
                <option value="DATE_DESC">Newest First</option>
                <option value="DATE_ASC">Oldest First</option>
                <option value="AMOUNT_DESC">Highest Amount</option>
                <option value="AMOUNT_ASC">Lowest Amount</option>
              </select>
            </div>
          </div>

          {/* Bottom Row: Status Tabs & Dropdowns */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-stone-100">
            
            {/* Status Tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 max-w-full">
              {statusOptions.map((st) => (
                <button
                  key={st}
                  onClick={() => setStatusFilter(st)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                    statusFilter === st
                      ? 'bg-[#0D3828] text-white shadow-xs'
                      : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                  }`}
                >
                  {st === 'ALL' ? 'All Statuses' : st}
                </button>
              ))}
            </div>

            {/* Dropdown Filters: Outlet & Payment */}
            <div className="flex items-center gap-2">
              <select
                value={outletFilter}
                onChange={(e) => setOutletFilter(e.target.value)}
                className="px-3 py-1.5 rounded-xl border border-stone-200 text-xs font-bold text-stone-700 focus:outline-hidden bg-stone-50 cursor-pointer"
              >
                <option value="ALL">All Outlets</option>
                {outlets.map(o => (
                  <option key={o.id} value={o.id}>{o.name}</option>
                ))}
              </select>

              <select
                value={paymentFilter}
                onChange={(e) => setPaymentFilter(e.target.value)}
                className="px-3 py-1.5 rounded-xl border border-stone-200 text-xs font-bold text-stone-700 focus:outline-hidden bg-stone-50 cursor-pointer"
              >
                <option value="ALL">All Payment Types</option>
                <option value="ONLINE">Prepaid (Demo)</option>
                <option value="CASH">Pay at Pickup</option>
              </select>
            </div>

          </div>

        </div>

        {/* Orders Table (Desktop) & Cards (Mobile) */}
        <div className="bg-white rounded-3xl border border-stone-200/90 shadow-2xs overflow-hidden">
          
          {/* Desktop Table View */}
          <div className="hidden lg:block overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-stone-50/70 border-b border-stone-200 text-stone-500 text-[11px] font-bold uppercase tracking-wider">
                  <th className="py-3.5 px-4">Order ID & Token</th>
                  <th className="py-3.5 px-4">Student</th>
                  <th className="py-3.5 px-4">Outlet</th>
                  <th className="py-3.5 px-4">Ordered Food Items</th>
                  <th className="py-3.5 px-4">Amount</th>
                  <th className="py-3.5 px-4">Payment</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {filteredOrders.map((order) => {
                  const isCollected = order.status === 'Collected';
                  const isCancelled = order.status === 'Cancelled';
                  const isPreparing = order.status === 'Preparing';
                  const isReady = order.status === 'Ready for Pickup';

                  return (
                    <tr key={order.id} className="hover:bg-stone-50/80 transition-colors">
                      
                      {/* Order ID & Pickup Token */}
                      <td className="py-3.5 px-4 font-mono">
                        <div className="font-bold text-stone-900 text-sm">
                          {order.id || order.orderNumber}
                        </div>
                        <div className="text-[10px] text-stone-500 font-sans mt-0.5">
                          Token: <strong className="font-mono text-emerald-800">{order.pickupToken || order.pickupCode}</strong>
                        </div>
                        <div className="text-[10px] text-stone-400 font-sans">
                          {order.orderDate || 'Today'}
                        </div>
                      </td>

                      {/* Student Info */}
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-stone-900">{order.studentName}</div>
                        <div className="text-[10px] text-stone-500 font-mono">
                          {order.studentId || order.rollNo}
                        </div>
                        <div className="text-[10px] text-stone-400">
                          {order.contactNumber}
                        </div>
                      </td>

                      {/* Outlet */}
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-stone-800">{order.outletName}</div>
                        <div className="text-[10px] text-stone-400">{order.outletLocation || 'CGC Campus'}</div>
                      </td>

                      {/* Food Items */}
                      <td className="py-3.5 px-4 max-w-xs">
                        <div className="font-medium text-stone-800 truncate">
                          {order.items?.map(i => `${i.quantity}x ${i.name}`).join(', ') || 'Campus Food'}
                        </div>
                        <div className="text-[10px] text-stone-400">
                          {order.items?.length || 1} item type(s)
                        </div>
                      </td>

                      {/* Total Amount */}
                      <td className="py-3.5 px-4 font-mono">
                        <div className="font-black text-stone-900 text-sm">
                          ₹{order.total}
                        </div>
                        {order.discount > 0 && (
                          <div className="text-[10px] text-emerald-700">
                            -₹{order.discount} promo
                          </div>
                        )}
                      </td>

                      {/* Payment Status */}
                      <td className="py-3.5 px-4">
                        <div className="font-medium text-stone-800 text-[11px]">
                          {order.paymentMethod?.includes('online') || order.paymentMethod?.includes('Online') ? 'Demo Online' : 'Cash at Counter'}
                        </div>
                        <div className={`text-[10px] font-bold ${
                          order.paymentStatus?.includes('Prepaid') ? 'text-emerald-700' : 'text-amber-700'
                        }`}>
                          {order.paymentStatus || 'Payment Due at Pickup'}
                        </div>
                      </td>

                      {/* Order Status Badge */}
                      <td className="py-3.5 px-4">
                        <span className={`inline-block px-2.5 py-1 rounded-md text-[10px] font-bold border ${
                          isCollected
                            ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                            : isCancelled
                            ? 'bg-rose-50 text-rose-800 border-rose-200'
                            : isReady
                            ? 'bg-emerald-100 text-emerald-950 border-emerald-300'
                            : isPreparing
                            ? 'bg-indigo-50 text-indigo-800 border-indigo-200'
                            : 'bg-amber-50 text-amber-800 border-amber-200'
                        }`}>
                          {order.status}
                        </span>
                      </td>

                      {/* Inspect Action */}
                      <td className="py-3.5 px-4 text-right">
                        <button
                          onClick={() => setSelectedOrder(order)}
                          className="px-3 py-1.5 rounded-xl bg-stone-100 hover:bg-[#0D3828] hover:text-white text-stone-700 text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ml-auto"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>Inspect</span>
                        </button>
                      </td>

                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Mobile Card View */}
          <div className="lg:hidden divide-y divide-stone-100">
            {filteredOrders.map((order) => (
              <div key={order.id} className="p-4 space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="font-mono font-black text-stone-900 text-sm block">
                      {order.id || order.orderNumber}
                    </span>
                    <span className="text-xs text-stone-500">
                      Token: <strong className="font-mono text-emerald-800">{order.pickupToken || order.pickupCode}</strong> • {order.orderDate || 'Today'}
                    </span>
                  </div>

                  <span className={`inline-block px-2 py-0.5 rounded-md text-[10px] font-bold border ${
                    order.status === 'Collected'
                      ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                      : order.status === 'Cancelled'
                      ? 'bg-rose-50 text-rose-800 border-rose-200'
                      : 'bg-amber-50 text-amber-800 border-amber-200'
                  }`}>
                    {order.status}
                  </span>
                </div>

                <div className="text-xs space-y-1 bg-stone-50 p-3 rounded-2xl border border-stone-200/80">
                  <div className="flex justify-between">
                    <span className="text-stone-500">Student:</span>
                    <span className="font-bold text-stone-900">{order.studentName} ({order.studentId || order.rollNo})</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-500">Outlet:</span>
                    <span className="font-bold text-stone-800">{order.outletName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-500">Total:</span>
                    <span className="font-mono font-black text-stone-900 text-sm">₹{order.total}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <span className="text-[11px] text-stone-500">
                    {order.paymentMethod?.includes('online') ? 'Online Simulated' : 'Cash at Counter'}
                  </span>
                  <button
                    onClick={() => setSelectedOrder(order)}
                    className="px-3 py-1.5 rounded-xl bg-[#0D3828] text-white text-xs font-bold cursor-pointer"
                  >
                    Inspect Order
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {filteredOrders.length === 0 && (
            <div className="p-12 text-center space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-stone-100 text-stone-400 flex items-center justify-center mx-auto">
                <ReceiptText className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-stone-900">No Orders Found</h3>
              <p className="text-xs text-stone-500 max-w-sm mx-auto">
                No orders match your filter criteria. Try clearing search keywords or switching status tabs.
              </p>
            </div>
          )}

        </div>

      </div>

      {/* Order Detail Modal */}
      <OrderDetailAdminModal
        isOpen={Boolean(selectedOrder)}
        onClose={() => setSelectedOrder(null)}
        order={selectedOrder}
        onCancelOrder={handleAdminCancel}
        onSaveNote={handleSaveAdminNote}
      />
    </AdminLayout>
  );
}
