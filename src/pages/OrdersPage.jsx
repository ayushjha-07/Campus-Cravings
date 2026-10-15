import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { isOrderEligibleForCancellation, getOrderOutletGroups } from '../utils/orderUtils';
import OrderStatusTracker from '../components/OrderStatusTracker';
import CancelOrderModal from '../components/CancelOrderModal';
import DemoStaffSimulationBar from '../components/DemoStaffSimulationBar';
import { 
  ReceiptText, 
  Clock, 
  MapPin, 
  Ticket, 
  CheckCircle2, 
  Store, 
  ChefHat, 
  BellRing, 
  ShoppingBag, 
  ArrowRight,
  Info,
  Sparkles,
  AlertTriangle,
  XCircle,
  Eye,
  Filter,
  PackageCheck
} from 'lucide-react';

export default function OrdersPage() {
  const { orders } = useCart();
  const navigate = useNavigate();
  const [selectedFilter, setSelectedFilter] = useState('all'); // 'all', 'active', 'completed', 'cancelled'
  const [orderToCancel, setOrderToCancel] = useState(null);

  // Categorize orders
  const activeOrders = orders.filter(
    o => o.status !== 'Collected' && o.status !== 'Completed' && o.status !== 'Cancelled'
  );
  const completedOrders = orders.filter(
    o => o.status === 'Collected' || o.status === 'Completed'
  );
  const cancelledOrders = orders.filter(
    o => o.status === 'Cancelled'
  );

  // Filtered list
  const filteredOrders = orders.filter(o => {
    if (selectedFilter === 'active') {
      return o.status !== 'Collected' && o.status !== 'Completed' && o.status !== 'Cancelled';
    }
    if (selectedFilter === 'completed') {
      return o.status === 'Collected' || o.status === 'Completed';
    }
    if (selectedFilter === 'cancelled') {
      return o.status === 'Cancelled';
    }
    return true; // 'all'
  });

  const filterTabs = [
    { key: 'all', label: 'All Orders', count: orders.length },
    { key: 'active', label: 'Active', count: activeOrders.length },
    { key: 'completed', label: 'Completed', count: completedOrders.length },
    { key: 'cancelled', label: 'Cancelled', count: cancelledOrders.length }
  ];

  return (
    <div className="min-h-screen bg-[#FBF8F2] py-8 sm:py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0D3828] uppercase tracking-wider mb-1">
              <ReceiptText className="w-4 h-4" />
              <span>CGC University, Mohali</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight">
              My Campus Orders & Pickup Tracking
            </h1>
            <p className="text-stone-500 text-xs sm:text-sm mt-1 max-w-xl">
              Track live food preparation, check counter pickup codes, and view your order history across campus food outlets.
            </p>
          </div>

          <Link
            to="/"
            className="self-start sm:self-auto inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-[#0D3828] text-white text-xs sm:text-sm font-bold hover:bg-[#144834] transition-colors shadow-xs"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Order Food Now</span>
          </Link>
        </div>

        {/* Academic Demo Disclaimer Banner */}
        <div className="p-3.5 rounded-2xl bg-amber-50/90 border border-amber-200/80 text-amber-950 text-xs flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Info className="w-4 h-4 text-amber-700 shrink-0" />
            <span className="text-[11px] leading-relaxed">
              <strong>Academic Demonstration:</strong> Orders are stored locally in your browser. In production, status updates are triggered live by outlet staff.
            </span>
          </div>
          <span className="text-[10px] font-mono text-amber-800 bg-amber-100/80 px-2 py-0.5 rounded-md hidden md:inline-block shrink-0">
            CGC Mohali Edition
          </span>
        </div>

        {/* Filter Navigation Tabs (Requirement 1: All Orders, Active, Completed, Cancelled) */}
        <div className="flex items-center gap-2 border-b border-stone-200/90 pb-2 overflow-x-auto scrollbar-none">
          {filterTabs.map(tab => {
            const isActive = selectedFilter === tab.key;
            return (
              <button
                key={tab.key}
                onClick={() => setSelectedFilter(tab.key)}
                className={`py-2 px-3.5 sm:px-4 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 shrink-0 cursor-pointer ${
                  isActive
                    ? 'bg-[#0D3828] text-white shadow-xs'
                    : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100/80'
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

        {/* Orders Listing */}
        {filteredOrders.length > 0 ? (
          <div className="space-y-6">
            {filteredOrders.map(order => {
              const isEligibleForCancel = isOrderEligibleForCancellation(order);
              const isReady = order.status === 'Ready for Pickup';
              const isCollected = order.status === 'Collected' || order.status === 'Completed';
              const isCancelled = order.status === 'Cancelled';
              const outletGroups = getOrderOutletGroups(order);

              return (
                <div
                  key={order.id || order.orderNumber}
                  className={`bg-white rounded-3xl p-5 sm:p-6 border transition-all space-y-5 shadow-2xs ${
                    isReady 
                      ? 'border-emerald-300 ring-2 ring-emerald-100' 
                      : isCancelled
                      ? 'border-rose-200'
                      : 'border-stone-200/90'
                  }`}
                >
                  {/* Order Top Bar: Outlets, Token, Status & Timing */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-100">
                    <div className="flex items-start gap-3.5">
                      {/* Pickup Code Box - Highlighted prominently when Ready! */}
                      <div className={`w-14 h-14 rounded-2xl flex flex-col items-center justify-center shrink-0 shadow-2xs transition-all ${
                        isCancelled
                          ? 'bg-rose-100 text-rose-700 border border-rose-200'
                          : isReady
                          ? 'bg-gradient-to-br from-emerald-600 to-[#0D3828] text-white ring-2 ring-amber-300 scale-105'
                          : 'bg-[#0D3828] text-white'
                      }`}>
                        <span className="text-[9px] uppercase font-bold text-stone-300 leading-none mb-0.5">
                          Code
                        </span>
                        <span className={`font-mono font-black text-base ${isReady ? 'text-amber-300' : 'text-white'}`}>
                          {order.pickupCode || order.pickupToken}
                        </span>
                      </div>

                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="font-black text-stone-900 text-lg">
                            {order.outletName}
                          </h3>
                          <span className="text-xs font-mono text-stone-400">
                            #{order.orderNumber || order.id}
                          </span>
                        </div>

                        <div className="flex items-center gap-1.5 text-xs text-stone-500 mt-0.5">
                          <MapPin className="w-3.5 h-3.5 text-[#0D3828] shrink-0" />
                          <span>{order.outletLocation || 'CGC Mohali Campus'}</span>
                        </div>

                        <div className="text-[11px] text-stone-400 mt-0.5">
                          Ordered on {order.orderDate}
                        </div>
                      </div>
                    </div>

                    {/* Status Badge & Timing */}
                    <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between gap-1.5 bg-[#FBF8F2] p-3 rounded-2xl border border-stone-200/80">
                      <div className="flex items-center gap-1.5">
                        <span className={`text-[11px] px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider ${
                          isCancelled
                            ? 'bg-rose-100 text-rose-800'
                            : isCollected
                            ? 'bg-emerald-100 text-emerald-800'
                            : isReady
                            ? 'bg-amber-100 text-amber-900 border border-amber-300 animate-pulse'
                            : 'bg-emerald-50 text-[#0D3828] border border-emerald-200'
                        }`}>
                          {order.status}
                        </span>
                      </div>

                      <div className="text-xs font-extrabold text-[#0D3828] flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-amber-600" />
                        <span>{order.estimatedTime || 'Ready in ~12 mins'}</span>
                      </div>
                    </div>
                  </div>

                  {/* PROMINENT READY BANNER on the card when Ready for Pickup (Requirement 3 & 4) */}
                  {isReady && (
                    <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-between gap-3 text-xs text-emerald-950">
                      <div className="flex items-center gap-2">
                        <BellRing className="w-4 h-4 text-emerald-700 shrink-0 animate-bounce" />
                        <div>
                          <strong className="text-emerald-900 font-extrabold">Your order is ready for pickup!</strong>
                          <span className="text-emerald-800 text-[11px] block sm:inline sm:ml-1">
                            Present Code <strong>{order.pickupCode || order.pickupToken}</strong> at {order.outletName}.
                          </span>
                        </div>
                      </div>
                      <span className="font-mono font-black text-sm text-[#0D3828] bg-white px-2.5 py-1 rounded-xl border border-emerald-300 shrink-0">
                        {order.pickupCode || order.pickupToken}
                      </span>
                    </div>
                  )}

                  {/* 5-Stage Visual Progress Tracker (Requirement 2) */}
                  <div className="py-1">
                    <OrderStatusTracker order={order} isCompact={true} />
                  </div>

                  {/* Multi-outlet notice if items are from multiple outlets */}
                  {outletGroups.length > 1 && (
                    <div className="text-xs text-stone-600 bg-amber-50/70 p-3 rounded-2xl border border-amber-200/70 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="flex items-center gap-1.5 font-bold text-amber-900">
                        <Store className="w-4 h-4 text-amber-700 shrink-0" />
                        <span>Food to collect from {outletGroups.length} campus counters:</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {outletGroups.map((g, idx) => (
                          <span key={idx} className="bg-white px-2.5 py-1 rounded-lg text-[11px] border border-amber-200 text-stone-800">
                            <strong>{g.outletName}</strong>: Code {g.pickupCode}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Food Item Names & Quantities + Payment Method & Total */}
                  <div className="pt-3 border-t border-stone-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    
                    {/* Item chips */}
                    <div className="space-y-1">
                      <div className="text-[11px] font-bold text-stone-400 uppercase tracking-wider">
                        Items Ordered ({order.items?.length || 0}):
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {order.items?.map(it => (
                          <span
                            key={it.id}
                            className="inline-flex items-center gap-1.5 text-xs bg-stone-50 border border-stone-200/70 px-2.5 py-1 rounded-xl text-stone-700"
                          >
                            <span>{it.name}</span>
                            <span className="font-extrabold text-stone-900">×{it.quantity}</span>
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Payment & Total Amount */}
                    <div className="flex items-center gap-5 justify-between md:justify-end shrink-0">
                      <div className="text-right">
                        <div className="text-[11px] text-stone-400">
                          {order.paymentMethod} • <span className="text-emerald-700 font-semibold">{order.paymentStatus}</span>
                        </div>
                        <div className="text-lg font-black text-stone-900">
                          Total: <span className="text-[#0D3828]">₹{order.total}</span>
                        </div>
                      </div>

                      {/* View Details Action Button (Requirement 1 & 3) */}
                      <div className="flex items-center gap-2">
                        {isEligibleForCancel && (
                          <button
                            onClick={() => setOrderToCancel(order)}
                            className="px-3 py-2 rounded-xl text-xs font-bold text-rose-700 hover:bg-rose-50 border border-rose-200 transition-colors cursor-pointer"
                          >
                            Cancel
                          </button>
                        )}

                        <Link
                          to={`/orders/${order.id || order.orderNumber}`}
                          className="px-4 py-2 rounded-xl bg-[#0D3828] hover:bg-[#144834] text-white text-xs font-bold transition-colors shadow-2xs flex items-center gap-1.5 cursor-pointer"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>View Details</span>
                        </Link>
                      </div>
                    </div>

                  </div>

                  {/* Clean staff simulator toggle for this order */}
                  <DemoStaffSimulationBar order={order} />

                </div>
              );
            })}
          </div>
        ) : (
          /* Empty State per Filter */
          <div className="bg-white rounded-3xl p-12 text-center border border-stone-200/90 shadow-2xs space-y-4">
            <div className="w-16 h-16 rounded-3xl bg-stone-100 text-stone-400 flex items-center justify-center mx-auto">
              <ShoppingBag className="w-8 h-8 stroke-[1.5]" />
            </div>

            <div>
              <h3 className="text-lg font-black text-stone-900">
                {selectedFilter === 'active'
                  ? 'No Active Orders'
                  : selectedFilter === 'completed'
                  ? 'No Completed Orders Yet'
                  : selectedFilter === 'cancelled'
                  ? 'No Cancelled Orders'
                  : 'No Orders Found'}
              </h3>
              <p className="text-stone-500 text-xs sm:text-sm max-w-md mx-auto mt-1 leading-relaxed">
                {selectedFilter === 'active'
                  ? 'You do not have any meals in preparation right now. Skip the counter line by ordering ahead!'
                  : selectedFilter === 'completed'
                  ? 'Your finished food pickups will appear here for fast re-ordering.'
                  : selectedFilter === 'cancelled'
                  ? 'You have not cancelled any orders.'
                  : 'You have not placed any campus food orders yet.'}
              </p>
            </div>

            <div className="pt-2">
              <Link
                to="/"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-[#0D3828] text-white text-xs font-bold hover:bg-[#144834] transition-colors shadow-xs"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Browse Campus Outlets</span>
              </Link>
            </div>
          </div>
        )}

      </div>

      {/* Cancellation confirmation modal */}
      <CancelOrderModal
        order={orderToCancel}
        isOpen={Boolean(orderToCancel)}
        onClose={() => setOrderToCancel(null)}
        onCancelled={() => setOrderToCancel(null)}
      />
    </div>
  );
}
