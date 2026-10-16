import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Store, 
  MapPin, 
  Clock, 
  ReceiptText, 
  CreditCard, 
  CheckCircle2, 
  AlertCircle, 
  XCircle, 
  Ticket, 
  Info, 
  Sparkles,
  ShoppingBag,
  BellRing,
  Phone,
  User,
  ShieldCheck,
  AlertTriangle,
  RotateCcw
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { isOrderEligibleForCancellation, getOrderOutletGroups } from '../utils/orderUtils';
import OrderStatusTracker from '../components/OrderStatusTracker';
import CancelOrderModal from '../components/CancelOrderModal';
import DemoStaffSimulationBar from '../components/DemoStaffSimulationBar';

export default function OrderDetailPage() {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const { getOrderById, orders } = useCart();
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);

  // Find order
  const order = getOrderById ? getOrderById(orderId) : orders.find(o => o.id === orderId || o.orderNumber === orderId);

  if (!order) {
    return (
      <div className="min-h-[75vh] flex flex-col items-center justify-center px-4 py-16 text-center max-w-md mx-auto">
        <div className="w-16 h-16 rounded-3xl bg-amber-50 text-amber-700 flex items-center justify-center mb-4">
          <AlertCircle className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-black text-stone-900 mb-2">Order Not Found</h2>
        <p className="text-stone-500 text-xs sm:text-sm mb-6 leading-relaxed">
          We could not locate the details for order #{orderId}. It may have been cleared or the ID is incorrect.
        </p>
        <div className="flex gap-3">
          <Link
            to="/orders"
            className="px-5 py-2.5 rounded-xl bg-[#0D3828] text-white text-xs font-bold hover:bg-[#144834]"
          >
            Back to My Orders
          </Link>
          <Link
            to="/"
            className="px-5 py-2.5 rounded-xl bg-white border border-stone-200 text-stone-700 text-xs font-bold hover:bg-stone-50"
          >
            Campus Home
          </Link>
        </div>
      </div>
    );
  }

  const isEligibleForCancel = isOrderEligibleForCancellation(order);
  const isReady = order.status === 'Ready for Pickup';
  const isCollected = order.status === 'Collected' || order.status === 'Completed';
  const isCancelled = order.status === 'Cancelled';

  // Outlet groups (supporting multi-outlet breakdown)
  const outletGroups = getOrderOutletGroups(order);

  return (
    <div className="min-h-screen bg-[#FBF8F2] dark:bg-[#101713] py-4 sm:py-12 pb-24 md:pb-12 transition-colors duration-200">
      <div className="max-w-4xl mx-auto px-3.5 sm:px-6 lg:px-8 space-y-5 sm:space-y-6">
        
        {/* Top Navigation */}
        <div className="flex items-center justify-between gap-4">
          <button
            onClick={() => navigate('/orders')}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-stone-600 hover:text-stone-900 bg-white border border-stone-200/90 px-3.5 py-2 rounded-xl transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Orders</span>
          </button>

          <div className="flex items-center gap-2">
            <span className="text-xs text-stone-400 font-mono hidden sm:inline">Order ID:</span>
            <span className="font-mono text-xs font-extrabold text-[#0D3828] bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-lg">
              #{order.orderNumber || order.id}
            </span>
          </div>
        </div>

        {/* PROMINENT READY FOR PICKUP BANNER (Requirement 3) */}
        {isReady && (
          <div className="bg-gradient-to-r from-emerald-600 via-[#0D3828] to-[#144834] text-white rounded-3xl p-6 sm:p-7 shadow-lg relative overflow-hidden animate-in fade-in duration-300">
            <div className="absolute right-0 top-0 translate-x-8 -translate-y-8 w-44 h-44 bg-white/5 rounded-full pointer-events-none" />
            <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-5">
              <div className="space-y-1.5">
                <div className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider bg-emerald-500/30 text-emerald-100 px-3 py-0.5 rounded-full border border-emerald-400/30">
                  <BellRing className="w-3.5 h-3.5 text-amber-300 animate-bounce" />
                  <span>Ready at Counter</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
                  Your order is ready for pickup!
                </h2>
                <p className="text-emerald-100/90 text-xs sm:text-sm max-w-xl">
                  Please proceed to <strong className="text-white underline decoration-emerald-400">{order.outletName}</strong> ({order.outletLocation || 'CGC Campus Counter'}) and show your pickup token code.
                </p>
              </div>

              {/* High visibility pickup code box */}
              <div className="bg-white text-stone-900 px-6 py-4 rounded-2xl text-center shadow-md shrink-0 border-2 border-amber-300">
                <div className="text-[10px] uppercase font-bold text-stone-500 tracking-wider">
                  Pickup Code
                </div>
                <div className="text-3xl sm:text-4xl font-mono font-black text-[#0D3828] tracking-tight">
                  {order.pickupCode || order.pickupToken}
                </div>
                <div className="text-[10px] text-emerald-700 font-semibold mt-0.5">
                  Show at counter
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Cancelled Banner */}
        {isCancelled && (
          <div className="bg-rose-50 border border-rose-200 rounded-3xl p-6 text-rose-950 space-y-2">
            <div className="flex items-center gap-2.5 font-black text-rose-800 text-lg">
              <XCircle className="w-6 h-6 text-rose-600 shrink-0" />
              <span>This Order Was Cancelled</span>
            </div>
            <p className="text-xs sm:text-sm text-rose-900/90 leading-relaxed pl-8.5">
              {order.cancellationReason 
                ? `Cancellation note: "${order.cancellationReason}"` 
                : 'This order was cancelled at the student\'s request.'}
            </p>
            {order.paymentMethod?.includes('Online') && (
              <p className="text-xs text-rose-700 font-semibold pl-8.5">
                • Demo simulation refund status: Initiated to student account.
              </p>
            )}
          </div>
        )}

        {/* Main Status & Visual Tracker Card (Requirement 2 & 3) */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/90 shadow-2xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-100">
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-black text-stone-900 tracking-tight">
                  Order Status Tracking
                </h1>
                <span className={`text-xs px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider ${
                  isCancelled
                    ? 'bg-rose-100 text-rose-800'
                    : isCollected
                    ? 'bg-emerald-100 text-emerald-800'
                    : isReady
                    ? 'bg-amber-100 text-amber-900 border border-amber-300'
                    : 'bg-emerald-50 text-[#0D3828] border border-emerald-200'
                }`}>
                  {order.status}
                </span>
              </div>
              <p className="text-xs text-stone-500 mt-1">
                Placed on {order.orderDate} • Token: <strong className="text-stone-800 font-mono">#{order.pickupCode || order.pickupToken}</strong>
              </p>
            </div>

            {/* Estimated time pill */}
            <div className="flex items-center gap-2 bg-[#FBF8F2] px-4 py-2 rounded-2xl border border-stone-200 text-xs">
              <Clock className="w-4 h-4 text-amber-600" />
              <div>
                <div className="text-[10px] text-stone-400 uppercase font-semibold">Estimated Timing</div>
                <div className="font-extrabold text-[#0D3828]">{order.estimatedTime || 'Ready in ~12 mins'}</div>
              </div>
            </div>
          </div>

          {/* 5-Stage Visual Progress Tracker */}
          <div className="py-2">
            <OrderStatusTracker order={order} isCompact={false} />
          </div>

          {/* Cancel Order Action (Only if eligible: not entered preparation) */}
          {isEligibleForCancel && (
            <div className="pt-4 border-t border-stone-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="text-xs text-stone-500 flex items-center gap-1.5">
                <Info className="w-4 h-4 text-stone-400 shrink-0" />
                <span>Need to change your break schedule? This order hasn't entered kitchen prep yet.</span>
              </div>
              <button
                onClick={() => setIsCancelModalOpen(true)}
                className="self-start sm:self-auto px-4 py-2 rounded-xl text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 text-xs font-bold transition-colors cursor-pointer"
              >
                Cancel This Order
              </button>
            </div>
          )}
        </div>

        {/* Multi-Outlet Pickup Groups & Counter Instructions (Requirement 5) */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-black text-stone-900 text-base flex items-center gap-2">
              <Store className="w-5 h-5 text-[#0D3828]" />
              <span>Campus Outlet & Pickup Counters ({outletGroups.length})</span>
            </h3>
            {outletGroups.length > 1 && (
              <span className="text-xs font-bold text-amber-800 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
                Multi-Outlet Order
              </span>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {outletGroups.map((group, gIdx) => (
              <div
                key={group.outletId || gIdx}
                className="bg-white rounded-3xl p-5 border border-stone-200/90 shadow-2xs space-y-3"
              >
                <div className="flex items-start justify-between gap-3 pb-3 border-b border-stone-100">
                  <div>
                    <div className="font-extrabold text-stone-900 text-base">
                      {group.outletName}
                    </div>
                    <div className="flex items-center gap-1 text-xs text-stone-500 mt-0.5">
                      <MapPin className="w-3.5 h-3.5 text-[#0D3828] shrink-0" />
                      <span>{group.outletLocation || 'CGC Mohali Campus Counter'}</span>
                    </div>
                  </div>

                  {/* Token badge for this outlet */}
                  <div className="text-right">
                    <span className="text-[10px] text-stone-400 block font-semibold">Pickup Code</span>
                    <span className="text-base font-mono font-black text-[#0D3828] bg-[#FBF8F2] px-2.5 py-0.5 rounded-lg border border-stone-200 inline-block">
                      {group.pickupCode || order.pickupCode || order.pickupToken}
                    </span>
                  </div>
                </div>

                {/* Items from this outlet */}
                <div className="space-y-1.5 text-xs text-stone-600">
                  <div className="text-[11px] font-bold text-stone-400 uppercase tracking-wider">
                    Food to collect at this counter:
                  </div>
                  {group.items.map(it => (
                    <div key={it.id} className="flex justify-between items-center bg-stone-50 p-2 rounded-xl">
                      <span>{it.name} <strong className="text-stone-900">×{it.quantity}</strong></span>
                      <span className="font-bold text-stone-800">₹{it.price * it.quantity}</span>
                    </div>
                  ))}
                </div>

                {/* Instructions */}
                <div className="text-[11px] text-stone-500 bg-emerald-50/50 p-2.5 rounded-xl border border-emerald-100 flex items-center gap-2">
                  <Info className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                  <span>Show token code <strong>{group.pickupCode || order.pickupToken}</strong> at this outlet's counter.</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Itemized Order Summary Table & Payment Breakdown (Requirement 3) */}
        <div className="bg-white rounded-3xl p-6 sm:p-7 border border-stone-200/90 shadow-2xs space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-stone-100">
            <h3 className="font-black text-stone-900 text-base flex items-center gap-2">
              <ReceiptText className="w-5 h-5 text-[#0D3828]" />
              <span>Complete Itemized Order Summary</span>
            </h3>
            <span className="text-xs text-stone-400">{order.items?.length || 0} items total</span>
          </div>

          <div className="divide-y divide-stone-100 text-xs sm:text-sm">
            {order.items?.map(item => (
              <div key={item.id} className="py-3.5 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  {item.image && (
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-12 h-12 rounded-2xl object-cover bg-stone-100 shrink-0"
                    />
                  )}
                  <div>
                    <div className="font-bold text-stone-900">{item.name}</div>
                    <div className="text-xs text-stone-500">
                      {item.outletName || order.outletName} • ₹{item.price} each
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-xs text-stone-400">Qty: <strong className="text-stone-800">{item.quantity}</strong></div>
                  <div className="font-extrabold text-stone-900">₹{item.price * item.quantity}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Pricing Totals & Payment Method */}
          <div className="pt-4 border-t border-stone-100 grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Student & Payment Info */}
            <div className="bg-[#FBF8F2] p-4 rounded-2xl border border-stone-200/80 space-y-2 text-xs">
              <div className="font-bold text-stone-900 text-xs mb-1 flex items-center gap-1.5">
                <CreditCard className="w-3.5 h-3.5 text-[#0D3828]" />
                <span>Payment & Student Credentials</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">Student Name:</span>
                <span className="font-bold text-stone-800">{order.studentName || 'Aarav Sharma'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">Student ID / Roll:</span>
                <span className="font-mono font-bold text-stone-800">{order.studentId || order.rollNo}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">Payment Option:</span>
                <span className="font-bold text-stone-800">{order.paymentMethod}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">Payment Status:</span>
                <span className="font-extrabold text-emerald-800">{order.paymentStatus}</span>
              </div>
              {order.pickupNote && order.pickupNote !== 'None' && (
                <div className="pt-1 text-[11px] text-stone-500">
                  Special Note: <span className="italic">"{order.pickupNote}"</span>
                </div>
              )}
            </div>

            {/* Calculations */}
            <div className="space-y-2 text-xs">
              <div className="flex justify-between text-stone-600">
                <span>Subtotal</span>
                <span className="font-bold text-stone-900">₹{order.subtotal}</span>
              </div>
              <div className="flex justify-between text-stone-600">
                <span>Packaging Fee</span>
                <span className="font-bold text-stone-900">₹{order.packagingFee || 5}</span>
              </div>
              {order.discount > 0 && (
                <div className="flex justify-between text-emerald-700 font-bold">
                  <span>Student Discount</span>
                  <span>-₹{order.discount}</span>
                </div>
              )}
              <div className="pt-2 border-t border-stone-200 flex justify-between text-base font-black text-stone-900">
                <span>Final Amount</span>
                <span className="text-xl text-[#0D3828]">₹{order.total}</span>
              </div>
            </div>

          </div>
        </div>

        {/* Outlet Staff Simulator Tool (Separated vendor testing view) */}
        <DemoStaffSimulationBar order={order} />

        {/* Academic Demo Disclaimer Banner */}
        <div className="p-4 rounded-2xl bg-amber-50/90 border border-amber-200 text-amber-950 text-xs space-y-1">
          <div className="flex items-center gap-2 font-bold text-amber-900">
            <Info className="w-4 h-4 text-amber-700 shrink-0" />
            <span>Demonstration Data Notice</span>
          </div>
          <p className="text-[11px] leading-relaxed text-amber-900/90 pl-6">
            This order and tracking stages are stored locally in your browser for demonstration at CGC University, Mohali. In production, kitchen stages are triggered live by cafeteria staff over a secure backend.
          </p>
        </div>

      </div>

      {/* Cancellation Modal */}
      <CancelOrderModal
        order={order}
        isOpen={isCancelModalOpen}
        onClose={() => setIsCancelModalOpen(false)}
        onCancelled={() => setIsCancelModalOpen(false)}
      />
    </div>
  );
}
