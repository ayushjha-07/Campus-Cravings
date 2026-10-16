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
  ShoppingBag, 
  Clock, 
  CheckCircle2, 
  ChefHat, 
  BellRing, 
  IndianRupee, 
  ArrowRight, 
  ArrowUpRight,
  TrendingUp, 
  AlertCircle, 
  Sparkles,
  Ticket,
  MapPin,
  Utensils
} from 'lucide-react';

export default function StaffDashboardPage() {
  const { outletId = 'kulhad' } = useParams();
  const { orders, updateOrderStatus } = useCart();
  const currentOutlet = OUTLETS.find(o => o.id === outletId || o.aliasId === outletId || (Array.isArray(o.aliases) && o.aliases.includes(outletId))) || OUTLETS[0];

  // Outlet-filtered orders
  const outletOrders = getOutletOrders(orders, currentOutlet.id);

  // Status groupings
  const newOrders = outletOrders.filter(o => o.status === 'Order Placed' || o.status === 'Placed');
  const preparingOrders = outletOrders.filter(o => o.status === 'Preparing');
  const readyOrders = outletOrders.filter(o => o.status === 'Ready for Pickup');
  const completedOrders = outletOrders.filter(o => o.status === 'Collected' || o.status === 'Completed');

  // Today's Sales calculation (sum of non-cancelled order item subtotals for this outlet)
  const todaySales = outletOrders
    .filter(o => o.status !== 'Cancelled')
    .reduce((sum, ord) => sum + getOutletSubtotalInOrder(ord, currentOutlet.id), 0);

  // Active queue needing staff attention (New, Confirmed, Preparing, Ready)
  const activeQueue = outletOrders.filter(
    o => o.status !== 'Collected' && o.status !== 'Completed' && o.status !== 'Cancelled'
  );

  // Modal confirmation state
  const [confirmModalData, setConfirmModalData] = useState(null);

  const handleActionClick = (order, targetStatus, actionInfo) => {
    // If marking collected, prompt confirmation
    if (targetStatus === 'Collected') {
      setConfirmModalData({
        order,
        targetStatus,
        title: `Handover Order #${order.pickupCode || order.pickupToken}`,
        message: `Verify the student has presented Token #${order.pickupCode || order.pickupToken} before handing over this order.`,
        confirmText: 'Mark Collected',
        confirmColor: 'blue'
      });
    } else {
      // Direct valid transition
      updateOrderStatus(order.id || order.orderNumber, targetStatus);
    }
  };

  const handleConfirmModalAction = () => {
    if (confirmModalData) {
      updateOrderStatus(
        confirmModalData.order.id || confirmModalData.order.orderNumber,
        confirmModalData.targetStatus
      );
      setConfirmModalData(null);
    }
  };

  return (
    <StaffLayout>
      <div className="space-y-6">
        
        {/* Top Welcome & Shift Status Banner */}
        <div className="bg-white rounded-3xl p-6 sm:p-7 border border-stone-200/90 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0D3828] uppercase tracking-wider mb-1">
              <ChefHat className="w-4 h-4 text-[#EAA044]" />
              <span>Cafeteria Counter Shift Live</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight">
              {currentOutlet.name} Kitchen Console
            </h1>
            <p className="text-stone-500 text-xs sm:text-sm mt-0.5 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#0D3828]" />
              <span>{currentOutlet.location}</span>
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Link
              to={`/staff/${currentOutlet.id}/orders`}
              className="px-4 py-2.5 rounded-2xl bg-[#0D3828] hover:bg-[#144834] text-white text-xs font-bold transition-colors shadow-xs flex items-center gap-1.5 cursor-pointer"
            >
              <span>Manage All Orders ({outletOrders.length})</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* 5 Core Metric Cards (Requirement 1) */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-3.5 sm:gap-4">
          
          {/* 1. Today's Total Orders */}
          <div className="bg-white rounded-3xl p-5 border border-stone-200/90 shadow-2xs space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-stone-400">
                Total Orders
              </span>
              <div className="w-8 h-8 rounded-xl bg-stone-100 text-stone-600 flex items-center justify-center">
                <ShoppingBag className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-black text-stone-900">
              {outletOrders.length}
            </div>
            <div className="text-[11px] text-stone-500">
              Today's orders on record
            </div>
          </div>

          {/* 2. New Orders Awaiting Confirmation */}
          <div className={`rounded-3xl p-5 border transition-all space-y-2 ${
            newOrders.length > 0 
              ? 'bg-amber-50/70 border-amber-300 ring-2 ring-amber-100 shadow-2xs' 
              : 'bg-white border-stone-200/90 shadow-2xs'
          }`}>
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-amber-800">
                New Orders
              </span>
              <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center">
                <BellRing className={`w-4 h-4 ${newOrders.length > 0 ? 'animate-bounce' : ''}`} />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-black text-amber-950">
              {newOrders.length}
            </div>
            <div className="text-[11px] text-amber-800 font-semibold">
              {newOrders.length > 0 ? '⚠️ Action needed now' : 'All caught up'}
            </div>
          </div>

          {/* 3. Orders Currently Being Prepared */}
          <div className="bg-white rounded-3xl p-5 border border-stone-200/90 shadow-2xs space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-stone-400">
                In Kitchen
              </span>
              <div className="w-8 h-8 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center">
                <ChefHat className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-black text-orange-950">
              {preparingOrders.length}
            </div>
            <div className="text-[11px] text-stone-500">
              Cooking on grill / fryer
            </div>
          </div>

          {/* 4. Orders Ready for Pickup */}
          <div className="bg-white rounded-3xl p-5 border border-stone-200/90 shadow-2xs space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-stone-400">
                Ready at Counter
              </span>
              <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
                <CheckCircle2 className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-black text-emerald-950">
              {readyOrders.length}
            </div>
            <div className="text-[11px] text-stone-500">
              Awaiting student collection
            </div>
          </div>

          {/* 5. Today's Sales Summary (Clearly labeled as demo data) */}
          <div className="col-span-2 lg:col-span-1 bg-gradient-to-br from-[#0D3828] to-[#144834] text-white rounded-3xl p-5 shadow-sm space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-200">
                Today's Sales
              </span>
              <span className="text-[9px] bg-white/20 text-white font-mono px-1.5 py-0.2 rounded-md">
                Demo
              </span>
            </div>
            <div className="text-2xl sm:text-3xl font-black text-[#EAA044]">
              ₹{todaySales}
            </div>
            <div className="text-[10px] text-emerald-100/90 line-clamp-1">
              {completedOrders.length} completed orders
            </div>
          </div>

        </div>

        {/* Live Active Orders Queue (Fast Kitchen POS Action Feed) */}
        <div className="bg-white rounded-3xl p-6 sm:p-7 border border-stone-200/90 shadow-2xs space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-stone-100">
            <div>
              <h2 className="text-lg font-black text-stone-900 tracking-tight flex items-center gap-2">
                <Clock className="w-5 h-5 text-[#0D3828]" />
                <span>Active Kitchen Order Queue ({activeQueue.length})</span>
              </h2>
              <p className="text-stone-500 text-xs mt-0.5">
                Orders requiring kitchen confirmation, preparation, or counter handover.
              </p>
            </div>

            <Link
              to={`/staff/${currentOutlet.id}/orders`}
              className="text-xs font-bold text-[#0D3828] hover:underline flex items-center gap-1"
            >
              <span>Full Order Screen</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {activeQueue.length > 0 ? (
            <div className="space-y-3.5">
              {activeQueue.map(order => {
                const outletItems = getOutletItemsInOrder(order, currentOutlet.id);
                const outletSubtotal = getOutletSubtotalInOrder(order, currentOutlet.id);
                const nextAction = getStatusActionInfo(order.status);

                return (
                  <div
                    key={order.id}
                    className={`p-4 sm:p-5 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                      order.status === 'Order Placed'
                        ? 'bg-amber-50/50 border-amber-200'
                        : order.status === 'Ready for Pickup'
                        ? 'bg-emerald-50/40 border-emerald-200'
                        : 'bg-stone-50/70 border-stone-200/90'
                    }`}
                  >
                    {/* Left: Token, Student & Items */}
                    <div className="flex items-start gap-4">
                      {/* Big Pickup Code Token */}
                      <div className={`w-14 h-14 rounded-2xl flex flex-col items-center justify-center shrink-0 shadow-2xs ${
                        order.status === 'Ready for Pickup'
                          ? 'bg-emerald-600 text-white ring-2 ring-emerald-300'
                          : order.status === 'Order Placed'
                          ? 'bg-amber-500 text-white'
                          : 'bg-[#0D3828] text-white'
                      }`}>
                        <span className="text-[9px] uppercase font-bold text-stone-200 leading-none mb-0.5">
                          Token
                        </span>
                        <span className="font-mono font-black text-base">
                          {order.pickupCode || order.pickupToken}
                        </span>
                      </div>

                      <div className="space-y-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="font-extrabold text-stone-900 text-sm sm:text-base">
                            #{order.orderNumber || order.id}
                          </h3>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                            order.status === 'Order Placed'
                              ? 'bg-amber-100 text-amber-900 border border-amber-300'
                              : order.status === 'Preparing'
                              ? 'bg-orange-100 text-orange-900'
                              : 'bg-emerald-100 text-emerald-900'
                          }`}>
                            {order.status}
                          </span>
                        </div>

                        <div className="text-xs text-stone-600">
                          Student: <strong className="text-stone-900">{order.studentName || 'Student'}</strong> ({order.studentId || order.rollNo}) • {order.orderDate}
                        </div>

                        {/* Items ordered from this outlet */}
                        <div className="flex flex-wrap gap-1.5 pt-0.5">
                          {outletItems.map(it => (
                            <span
                              key={it.id}
                              className="inline-flex items-center gap-1 text-[11px] bg-white border border-stone-200/80 px-2 py-0.5 rounded-lg text-stone-800"
                            >
                              <span>{it.name}</span>
                              <strong className="text-[#0D3828]">×{it.quantity}</strong>
                            </span>
                          ))}
                        </div>

                        {order.pickupNote && order.pickupNote !== 'None' && (
                          <div className="text-[11px] text-amber-800 italic pt-0.5">
                            Kitchen Note: "{order.pickupNote}"
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Right: Payment info & Quick Next Transition Action */}
                    <div className="flex sm:flex-col items-end justify-between sm:justify-center gap-2 shrink-0 border-t sm:border-t-0 pt-3 sm:pt-0 border-stone-200/80">
                      <div className="text-left sm:text-right">
                        <div className="font-black text-stone-900 text-base">
                          ₹{outletSubtotal}
                        </div>
                        <div className="text-[10px] text-stone-400">
                          {order.paymentMethod}
                        </div>
                      </div>

                      {/* State Transition Button */}
                      {nextAction && (
                        <button
                          type="button"
                          onClick={() => handleActionClick(order, nextAction.nextStatus, nextAction)}
                          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer ${
                            nextAction.color === 'emerald'
                              ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                              : nextAction.color === 'amber'
                              ? 'bg-[#EAA044] hover:bg-[#d89139] text-white'
                              : 'bg-blue-600 hover:bg-blue-700 text-white'
                          }`}
                        >
                          {nextAction.label}
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="py-10 text-center space-y-2">
              <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto" />
              <h3 className="font-bold text-stone-800 text-sm">Kitchen Queue Clear</h3>
              <p className="text-xs text-stone-500 max-w-sm mx-auto">
                No active orders in preparation for {currentOutlet.name}. Incoming student orders will appear here automatically.
              </p>
            </div>
          )}
        </div>

      </div>

      {/* Confirmation Modal */}
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
