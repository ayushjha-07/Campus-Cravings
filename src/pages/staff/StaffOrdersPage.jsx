import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import StaffLayout from '../../components/staff/StaffLayout';
import StatusConfirmModal from '../../components/staff/StatusConfirmModal';
import { OUTLETS } from '../../data/outlets';
import { useCart } from '../../context/CartContext';
import { 
  getOutletOrders, 
  getOutletItemsInOrder, 
  getOutletSubtotalInOrder, 
  getNextValidStatus,
  getStatusActionInfo
} from '../../utils/orderUtils';
import { 
  ReceiptText, 
  Search, 
  Clock, 
  User, 
  MapPin, 
  CheckCircle2, 
  AlertCircle, 
  XCircle, 
  Filter, 
  Ticket, 
  CreditCard,
  ChefHat,
  ChevronRight,
  Info,
  Sparkles
} from 'lucide-react';

export default function StaffOrdersPage() {
  const { outletId = 'kulhad' } = useParams();
  const { orders, updateOrderStatus, cancelOrder } = useCart();
  const currentOutlet = OUTLETS.find(o => o.id === outletId) || OUTLETS[0];

  const [activeTab, setActiveTab] = useState('all'); // 'all', 'new', 'confirmed', 'preparing', 'ready', 'completed', 'cancelled'
  const [searchQuery, setSearchQuery] = useState('');
  const [confirmModalData, setConfirmModalData] = useState(null);

  // Filter orders for this outlet
  const outletOrders = getOutletOrders(orders, currentOutlet.id);

  // Status mapping for tabs
  const filteredOrders = outletOrders.filter(order => {
    // Search query filter (Order #, student name, roll, or token code)
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      const matchNum = (order.orderNumber || order.id || '').toLowerCase().includes(q);
      const matchName = (order.studentName || '').toLowerCase().includes(q);
      const matchRoll = (order.studentId || order.rollNo || '').toLowerCase().includes(q);
      const matchToken = (order.pickupCode || order.pickupToken || '').toLowerCase().includes(q);
      if (!matchNum && !matchName && !matchRoll && !matchToken) return false;
    }

    if (activeTab === 'new') {
      return order.status === 'Order Placed' || order.status === 'Placed';
    }
    if (activeTab === 'confirmed') {
      return order.status === 'Confirmed';
    }
    if (activeTab === 'preparing') {
      return order.status === 'Preparing';
    }
    if (activeTab === 'ready') {
      return order.status === 'Ready for Pickup';
    }
    if (activeTab === 'completed') {
      return order.status === 'Collected' || order.status === 'Completed';
    }
    if (activeTab === 'cancelled') {
      return order.status === 'Cancelled';
    }
    return true; // 'all'
  });

  const tabOptions = [
    { key: 'all', label: 'All Orders', count: outletOrders.length },
    { key: 'new', label: 'New Orders', count: outletOrders.filter(o => o.status === 'Order Placed' || o.status === 'Placed').length },
    { key: 'confirmed', label: 'Confirmed', count: outletOrders.filter(o => o.status === 'Confirmed').length },
    { key: 'preparing', label: 'Preparing', count: outletOrders.filter(o => o.status === 'Preparing').length },
    { key: 'ready', label: 'Ready for Pickup', count: outletOrders.filter(o => o.status === 'Ready for Pickup').length },
    { key: 'completed', label: 'Completed', count: outletOrders.filter(o => o.status === 'Collected' || o.status === 'Completed').length },
    { key: 'cancelled', label: 'Cancelled', count: outletOrders.filter(o => o.status === 'Cancelled').length }
  ];

  const handleAdvanceStatus = (order) => {
    const actionInfo = getStatusActionInfo(order.status);
    if (!actionInfo) return;

    if (actionInfo.nextStatus === 'Collected') {
      setConfirmModalData({
        order,
        targetStatus: 'Collected',
        title: `Handover Order #${order.pickupCode || order.pickupToken}`,
        message: `Verify the student has shown Token #${order.pickupCode || order.pickupToken} before handing over the meal.`,
        confirmText: 'Mark Collected',
        confirmColor: 'blue'
      });
    } else {
      updateOrderStatus(order.id || order.orderNumber, actionInfo.nextStatus);
    }
  };

  const handleCancelOrderClick = (order) => {
    setConfirmModalData({
      order,
      isCancel: true,
      title: `Cancel Order #${order.orderNumber || order.id}?`,
      message: `Are you sure you want to cancel this order from ${currentOutlet.name}? This will notify the student and update their order status.`,
      confirmText: 'Confirm Cancellation',
      confirmColor: 'rose'
    });
  };

  const handleConfirmModalAction = () => {
    if (confirmModalData) {
      if (confirmModalData.isCancel) {
        cancelOrder(
          confirmModalData.order.id || confirmModalData.order.orderNumber,
          'Cancelled by outlet counter staff'
        );
      } else {
        updateOrderStatus(
          confirmModalData.order.id || confirmModalData.order.orderNumber,
          confirmModalData.targetStatus
        );
      }
      setConfirmModalData(null);
    }
  };

  return (
    <StaffLayout>
      <div className="space-y-6">
        
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0D3828] uppercase tracking-wider mb-1">
              <ReceiptText className="w-4 h-4" />
              <span>Counter POS Order Dispatch</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight">
              Incoming Orders • {currentOutlet.name}
            </h1>
            <p className="text-stone-500 text-xs sm:text-sm mt-0.5">
              Live incoming student meal tickets. Progress orders as meals are cooked and ready.
            </p>
          </div>

          {/* Search bar */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search token, order #, student..."
              className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-white border border-stone-200 text-xs sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-[#0D3828]/20 focus:border-[#0D3828] shadow-2xs"
            />
          </div>
        </div>

        {/* Tab Filters (Requirement 2) */}
        <div className="flex items-center gap-2 border-b border-stone-200/90 pb-2 overflow-x-auto scrollbar-none">
          {tabOptions.map(tab => {
            const isActive = activeTab === tab.key;
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`py-2 px-3 sm:px-3.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shrink-0 cursor-pointer ${
                  isActive
                    ? 'bg-[#0D3828] text-white shadow-xs'
                    : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
                }`}
              >
                <span>{tab.label}</span>
                <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full ${
                  isActive ? 'bg-white/20 text-white' : 'bg-stone-200 text-stone-600'
                }`}>
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Orders List / Table Container */}
        {filteredOrders.length > 0 ? (
          <div className="space-y-4">
            
            {/* Desktop Table View (Requirement 2) */}
            <div className="hidden md:block bg-white rounded-3xl border border-stone-200/90 shadow-2xs overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#FAF8F5] text-stone-400 uppercase font-black text-[10px] tracking-wider border-b border-stone-200/80">
                    <tr>
                      <th className="py-3.5 px-4">Token & ID</th>
                      <th className="py-3.5 px-4">Time</th>
                      <th className="py-3.5 px-4">Student</th>
                      <th className="py-3.5 px-4">Items Ordered</th>
                      <th className="py-3.5 px-4">Amount</th>
                      <th className="py-3.5 px-4">Payment</th>
                      <th className="py-3.5 px-4">Status</th>
                      <th className="py-3.5 px-4 text-right">Kitchen Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100 text-stone-700">
                    {filteredOrders.map(order => {
                      const outletItems = getOutletItemsInOrder(order, currentOutlet.id);
                      const outletSubtotal = getOutletSubtotalInOrder(order, currentOutlet.id);
                      const actionInfo = getStatusActionInfo(order.status);
                      const isCancelled = order.status === 'Cancelled';
                      const isCollected = order.status === 'Collected' || order.status === 'Completed';

                      return (
                        <tr 
                          key={order.id} 
                          className={`hover:bg-stone-50/70 transition-colors ${
                            order.status === 'Order Placed' ? 'bg-amber-50/30' : ''
                          }`}
                        >
                          {/* Token & ID */}
                          <td className="py-4 px-4 whitespace-nowrap">
                            <div className="flex items-center gap-2.5">
                              <span className="w-10 h-10 rounded-xl bg-[#0D3828] text-white flex flex-col items-center justify-center font-mono font-black text-xs shadow-2xs">
                                <span className="text-[8px] text-stone-300 font-sans leading-none">TKN</span>
                                {order.pickupCode || order.pickupToken}
                              </span>
                              <div>
                                <span className="font-mono font-bold text-stone-900 block">
                                  #{order.orderNumber || order.id}
                                </span>
                                {order.pickupNote && order.pickupNote !== 'None' && (
                                  <span className="text-[10px] text-amber-700 font-semibold block truncate max-w-xs" title={order.pickupNote}>
                                    Note: "{order.pickupNote}"
                                  </span>
                                )}
                              </div>
                            </div>
                          </td>

                          {/* Time */}
                          <td className="py-4 px-4 whitespace-nowrap text-stone-500 font-mono text-[11px]">
                            {order.orderDate?.split(',')[1] || order.orderDate || 'Today'}
                          </td>

                          {/* Student */}
                          <td className="py-4 px-4 whitespace-nowrap">
                            <div className="font-bold text-stone-900">
                              {order.studentName || 'Aarav Sharma'}
                            </div>
                            <div className="font-mono text-[10px] text-stone-400">
                              {order.studentId || order.rollNo}
                            </div>
                          </td>

                          {/* Items Ordered */}
                          <td className="py-4 px-4">
                            <div className="space-y-1 max-w-xs">
                              {outletItems.map(it => (
                                <div key={it.id} className="text-stone-800 text-[11px] flex items-center justify-between gap-2">
                                  <span className="truncate">{it.name}</span>
                                  <strong className="text-[#0D3828] shrink-0">×{it.quantity}</strong>
                                </div>
                              ))}
                            </div>
                          </td>

                          {/* Total */}
                          <td className="py-4 px-4 whitespace-nowrap font-black text-stone-900 text-sm">
                            ₹{outletSubtotal}
                          </td>

                          {/* Payment (Strict rule: no manual claim of unverified payment) */}
                          <td className="py-4 px-4 whitespace-nowrap">
                            <div className="text-[11px] font-semibold text-stone-800">
                              {order.paymentMethod?.includes('Online') ? 'Online Demo' : 'Pay at Counter'}
                            </div>
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md inline-block mt-0.5 ${
                              order.paymentStatus?.includes('Prepaid')
                                ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                                : order.paymentStatus?.includes('Paid at Counter')
                                ? 'bg-emerald-100 text-emerald-900'
                                : 'bg-amber-50 text-amber-900 border border-amber-200'
                            }`}>
                              {order.paymentStatus}
                            </span>
                          </td>

                          {/* Current Status */}
                          <td className="py-4 px-4 whitespace-nowrap">
                            <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider inline-flex items-center gap-1 ${
                              isCancelled
                                ? 'bg-rose-100 text-rose-800'
                                : isCollected
                                ? 'bg-emerald-100 text-emerald-800'
                                : order.status === 'Ready for Pickup'
                                ? 'bg-emerald-50 text-emerald-900 border border-emerald-300 font-black animate-pulse'
                                : order.status === 'Preparing'
                                ? 'bg-orange-100 text-orange-900'
                                : 'bg-amber-100 text-amber-900 border border-amber-300'
                            }`}>
                              {order.status}
                            </span>
                          </td>

                          {/* Kitchen Action */}
                          <td className="py-4 px-4 text-right whitespace-nowrap">
                            <div className="flex items-center justify-end gap-1.5">
                              {actionInfo && (
                                <button
                                  type="button"
                                  onClick={() => handleAdvanceStatus(order)}
                                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shadow-2xs cursor-pointer ${
                                    actionInfo.color === 'emerald'
                                      ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                                      : actionInfo.color === 'amber'
                                      ? 'bg-[#EAA044] hover:bg-[#d89139] text-white'
                                      : 'bg-blue-600 hover:bg-blue-700 text-white'
                                  }`}
                                >
                                  {actionInfo.label}
                                </button>
                              )}

                              {!isCollected && !isCancelled && (
                                <button
                                  type="button"
                                  onClick={() => handleCancelOrderClick(order)}
                                  className="p-1.5 text-stone-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition-colors"
                                  title="Cancel order"
                                >
                                  <XCircle className="w-4 h-4" />
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Mobile Order Cards View (Requirement 2) */}
            <div className="md:hidden space-y-3.5">
              {filteredOrders.map(order => {
                const outletItems = getOutletItemsInOrder(order, currentOutlet.id);
                const outletSubtotal = getOutletSubtotalInOrder(order, currentOutlet.id);
                const actionInfo = getStatusActionInfo(order.status);
                const isCancelled = order.status === 'Cancelled';
                const isCollected = order.status === 'Collected' || order.status === 'Completed';

                return (
                  <div
                    key={order.id}
                    className="bg-white rounded-3xl p-5 border border-stone-200/90 shadow-2xs space-y-4"
                  >
                    {/* Top Bar: Token & Order # */}
                    <div className="flex items-center justify-between pb-3 border-b border-stone-100">
                      <div className="flex items-center gap-3">
                        <span className="w-12 h-12 rounded-2xl bg-[#0D3828] text-white flex flex-col items-center justify-center font-mono font-black text-sm shadow-2xs">
                          <span className="text-[8px] text-stone-300 font-sans leading-none">TOKEN</span>
                          {order.pickupCode || order.pickupToken}
                        </span>
                        <div>
                          <span className="font-extrabold text-stone-900 text-base block">
                            #{order.orderNumber || order.id}
                          </span>
                          <span className="text-[11px] text-stone-400 font-mono">
                            {order.orderDate}
                          </span>
                        </div>
                      </div>

                      <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider ${
                        isCancelled
                          ? 'bg-rose-100 text-rose-800'
                          : isCollected
                          ? 'bg-emerald-100 text-emerald-800'
                          : order.status === 'Ready for Pickup'
                          ? 'bg-emerald-50 text-emerald-900 border border-emerald-300 font-black'
                          : order.status === 'Preparing'
                          ? 'bg-orange-100 text-orange-900'
                          : 'bg-amber-100 text-amber-900'
                      }`}>
                        {order.status}
                      </span>
                    </div>

                    {/* Student Info */}
                    <div className="text-xs text-stone-600 flex items-center justify-between">
                      <span>Student: <strong>{order.studentName || 'Student'}</strong></span>
                      <span className="font-mono text-stone-400">{order.studentId || order.rollNo}</span>
                    </div>

                    {/* Items */}
                    <div className="bg-stone-50 p-3 rounded-2xl space-y-1.5 text-xs">
                      {outletItems.map(it => (
                        <div key={it.id} className="flex justify-between items-center text-stone-800">
                          <span>{it.name}</span>
                          <strong className="text-[#0D3828]">×{it.quantity}</strong>
                        </div>
                      ))}
                      {order.pickupNote && order.pickupNote !== 'None' && (
                        <div className="pt-1.5 border-t border-stone-200 text-[11px] text-amber-900 italic">
                          Special Note: "{order.pickupNote}"
                        </div>
                      )}
                    </div>

                    {/* Pricing & Payment */}
                    <div className="flex items-center justify-between text-xs pt-1">
                      <div>
                        <span className="text-stone-400 block text-[10px]">Outlet Items Total</span>
                        <span className="font-black text-stone-900 text-base">₹{outletSubtotal}</span>
                      </div>
                      <div className="text-right">
                        <span className="text-stone-400 block text-[10px]">Payment Status</span>
                        <span className="font-bold text-stone-800 text-[11px]">{order.paymentStatus}</span>
                      </div>
                    </div>

                    {/* Action Button */}
                    {actionInfo && (
                      <button
                        type="button"
                        onClick={() => handleAdvanceStatus(order)}
                        className={`w-full py-3 rounded-2xl text-xs font-bold shadow-xs cursor-pointer ${
                          actionInfo.color === 'emerald'
                            ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                            : actionInfo.color === 'amber'
                            ? 'bg-[#EAA044] hover:bg-[#d89139] text-white'
                            : 'bg-blue-600 hover:bg-blue-700 text-white'
                        }`}
                      >
                        {actionInfo.label}
                      </button>
                    )}
                  </div>
                );
              })}
            </div>

          </div>
        ) : (
          <div className="bg-white rounded-3xl p-12 text-center border border-stone-200/90 shadow-2xs space-y-3">
            <ReceiptText className="w-12 h-12 text-stone-300 mx-auto" />
            <h3 className="font-bold text-stone-800 text-base">No Orders Found</h3>
            <p className="text-xs text-stone-500 max-w-md mx-auto">
              There are no orders matching the selected filter "{activeTab}" for {currentOutlet.name}.
            </p>
          </div>
        )}

      </div>

      {/* Confirmation Dialog */}
      <StatusConfirmModal
        isOpen={Boolean(confirmModalData)}
        title={confirmModalData?.title || 'Confirm Action'}
        message={confirmModalData?.message || 'Proceed with status update?'}
        confirmText={confirmModalData?.confirmText || 'Confirm'}
        confirmColor={confirmModalData?.confirmColor || 'emerald'}
        onConfirm={handleConfirmModalAction}
        onClose={() => setConfirmModalData(null)}
      />
    </StaffLayout>
  );
}
