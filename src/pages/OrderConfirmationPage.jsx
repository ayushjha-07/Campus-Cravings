import React from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { 
  CheckCircle2, 
  Store, 
  MapPin, 
  Clock, 
  CreditCard, 
  ReceiptText, 
  Home, 
  Ticket, 
  Info, 
  AlertCircle,
  ShieldCheck,
  User,
  Phone,
  GraduationCap
} from 'lucide-react';

export default function OrderConfirmationPage() {
  const { orderId } = useParams();
  const { orders, getOrderById } = useCart();
  const location = useLocation();

  // Try to find order from location state or orderId or latest order
  const order = (orderId && getOrderById ? getOrderById(orderId) : null) || 
                location.state?.order || 
                (orders.length > 0 ? orders[0] : null);

  if (!order) {
    return (
      <div className="min-h-[75vh] flex flex-col items-center justify-center px-4 py-16 text-center max-w-md mx-auto">
        <div className="w-16 h-16 rounded-3xl bg-amber-50 text-amber-700 flex items-center justify-center mb-4">
          <AlertCircle className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-black text-stone-900 mb-2">Order Not Found</h2>
        <p className="text-stone-500 text-xs sm:text-sm mb-6 leading-relaxed">
          We could not locate this order details. It may have been cleared or not placed yet.
        </p>
        <div className="flex gap-3">
          <Link
            to="/orders"
            className="px-5 py-2.5 rounded-xl bg-[#0D3828] text-white text-xs font-bold hover:bg-[#144834]"
          >
            View All Orders
          </Link>
          <Link
            to="/"
            className="px-5 py-2.5 rounded-xl bg-white border border-stone-200 text-stone-700 text-xs font-bold hover:bg-stone-50"
          >
            Return Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FBF8F2] py-8 sm:py-14">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Success Header Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/90 shadow-2xs text-center space-y-4">
          <div className="flex justify-center mb-1">
            <div className="p-1.5 rounded-2xl bg-white border border-stone-200 shadow-2xs inline-block">
              <img
                src="/images/brand/logo.png"
                alt="Campus Cravings Logo"
                className="h-10 w-auto object-contain"
              />
            </div>
          </div>

          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-3xl bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center mx-auto shadow-inner">
            <CheckCircle2 className="w-8 h-8 sm:w-9 sm:h-9 stroke-[2.2]" />
          </div>

          <div>
            <span className="inline-block text-[11px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200/80 px-3 py-1 rounded-full uppercase tracking-wider mb-2">
              Order {order.status}
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight">
              Order Successfully Confirmed!
            </h1>
            <p className="text-stone-500 text-xs sm:text-sm mt-1 max-w-md mx-auto leading-relaxed">
              Your campus food pickup token has been generated. Show this token at the counter to collect your food.
            </p>
          </div>

          {/* Large Token & Order Number Box */}
          <div className="bg-gradient-to-br from-[#0D3828] to-[#144834] text-white p-5 rounded-2xl max-w-sm mx-auto shadow-md">
            <div className="text-[11px] text-emerald-200 uppercase font-bold tracking-wider mb-0.5">
              Pickup Token Number
            </div>
            <div className="text-4xl font-mono font-black tracking-tight text-[#EAA044]">
              {order.pickupToken || 'C-18'}
            </div>
            <div className="text-xs text-stone-300 font-mono mt-1 pt-2 border-t border-white/10">
              Demo Order ID: <strong>{order.id || order.orderNumber}</strong>
            </div>
          </div>
        </div>

        {/* Mandatory Demo Data Notice Banner */}
        <div className="p-4 rounded-2xl bg-amber-50/95 border border-amber-200 text-amber-950 text-xs space-y-1">
          <div className="flex items-center gap-2 font-bold text-amber-900">
            <Info className="w-4 h-4 text-amber-700 shrink-0" />
            <span>Academic Project Demonstration Notice</span>
          </div>
          <p className="leading-relaxed pl-6 text-amber-800/90 text-[11px]">
            This demo order is stored locally in your browser for demonstration purposes as part of the CGC University Mohali web application project. It is <strong>not</strong> an actual order transmitted to physical campus cafeteria vendors.
          </p>
        </div>

        {/* Pickup & Order Information Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          {/* Pickup Details Card */}
          <div className="bg-white rounded-3xl p-5 sm:p-6 border border-stone-200/90 shadow-2xs space-y-3.5">
            <div className="flex items-center gap-2 font-bold text-stone-900 text-sm pb-2 border-b border-stone-100">
              <Store className="w-4 h-4 text-[#0D3828]" />
              <span>Collection & Outlet Details</span>
            </div>

            <div className="space-y-2.5 text-xs">
              <div>
                <span className="text-stone-400 block text-[11px]">Pickup Outlet:</span>
                <span className="font-extrabold text-stone-900 text-sm">
                  {order.outletName}
                </span>
              </div>

              <div>
                <span className="text-stone-400 block text-[11px]">Counter Location:</span>
                <span className="font-semibold text-stone-700 flex items-center gap-1.5 mt-0.5">
                  <MapPin className="w-3.5 h-3.5 text-[#0D3828] shrink-0" />
                  <span>{order.outletLocation || 'CGC Mohali Campus'}</span>
                </span>
              </div>

              <div>
                <span className="text-stone-400 block text-[11px]">Estimated Pickup Timing:</span>
                <span className="font-semibold text-[#0D3828] flex items-center gap-1.5 mt-0.5">
                  <Clock className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                  <span>{order.estimatedTime || 'Ready in ~12-15 mins'}</span>
                </span>
              </div>

              {order.pickupNote && order.pickupNote !== 'None' && (
                <div className="pt-2 border-t border-stone-100">
                  <span className="text-stone-400 block text-[11px]">Special Instructions:</span>
                  <span className="font-medium text-stone-800 italic">"{order.pickupNote}"</span>
                </div>
              )}
            </div>
          </div>

          {/* Student & Payment Summary Card */}
          <div className="bg-white rounded-3xl p-5 sm:p-6 border border-stone-200/90 shadow-2xs space-y-3.5">
            <div className="flex items-center gap-2 font-bold text-stone-900 text-sm pb-2 border-b border-stone-100">
              <CreditCard className="w-4 h-4 text-[#0D3828]" />
              <span>Student & Payment Info</span>
            </div>

            <div className="space-y-2.5 text-xs">
              <div className="flex justify-between items-center">
                <span className="text-stone-500">Student Name:</span>
                <span className="font-bold text-stone-900">{order.studentName}</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-stone-500">Student ID / Roll:</span>
                <span className="font-mono font-bold text-stone-900 uppercase">{order.studentId || order.rollNo}</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-stone-500">Contact Number:</span>
                <span className="font-medium text-stone-800">{order.contactNumber || '+91 98765 43210'}</span>
              </div>

              <div className="pt-2 border-t border-stone-100 flex justify-between items-center">
                <span className="text-stone-500">Payment Method:</span>
                <span className="font-bold text-stone-900">{order.paymentMethod}</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-stone-500">Payment Status:</span>
                <span className="font-extrabold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200 text-[11px]">
                  {order.paymentStatus}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-stone-500">Order Status:</span>
                <span className="font-extrabold text-[#0D3828] bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200 text-[11px]">
                  {order.status}
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* Order Items Summary Table */}
        <div className="bg-white rounded-3xl p-5 sm:p-6 border border-stone-200/90 shadow-2xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-stone-100">
            <h3 className="font-bold text-stone-900 text-sm uppercase tracking-wider">
              Ordered Food Items ({order.items?.length || 0})
            </h3>
            <span className="text-xs text-stone-500">Date: {order.orderDate || 'Today'}</span>
          </div>

          <div className="divide-y divide-stone-100 text-xs">
            {order.items?.map(item => (
              <div key={item.id} className="py-2.5 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  {item.image && (
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-10 h-10 rounded-xl object-cover bg-stone-100"
                    />
                  )}
                  <div>
                    <div className="font-bold text-stone-900">{item.name}</div>
                    <div className="text-[11px] text-stone-400">
                      {item.outletName || order.outletName} • Qty: <strong>{item.quantity}</strong>
                    </div>
                  </div>
                </div>
                <div className="text-right font-black text-stone-900 text-sm">
                  ₹{item.price * item.quantity}
                </div>
              </div>
            ))}
          </div>

          {/* Pricing Totals */}
          <div className="pt-3 border-t border-stone-100 space-y-2 text-xs text-stone-600">
            <div className="flex justify-between">
              <span>Item Subtotal</span>
              <span className="font-bold text-stone-900">₹{order.subtotal}</span>
            </div>
            <div className="flex justify-between">
              <span>Campus Packaging</span>
              <span className="font-bold text-stone-900">₹{order.packagingFee || 5}</span>
            </div>
            {order.discount > 0 && (
              <div className="flex justify-between text-emerald-700 font-bold">
                <span>Student Discount</span>
                <span>-₹{order.discount}</span>
              </div>
            )}
            <div className="pt-2 border-t border-stone-100 flex justify-between text-base font-black text-stone-900">
              <span>Total Amount</span>
              <span className="text-[#0D3828] text-lg font-black">₹{order.total}</span>
            </div>
          </div>
        </div>

        {/* Action Buttons: View My Orders & Return Home (Requirement 5) */}
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <Link
            to={`/orders/${order.id || order.orderNumber}`}
            className="flex-1 py-3.5 px-6 rounded-2xl bg-[#0D3828] hover:bg-[#144834] text-white font-extrabold text-xs sm:text-sm text-center shadow-md shadow-emerald-950/10 hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Clock className="w-4 h-4 text-amber-300" />
            <span>Track Order Status</span>
          </Link>

          <Link
            to="/"
            className="flex-1 py-3.5 px-6 rounded-2xl bg-white hover:bg-stone-50 border border-stone-200 text-stone-800 font-bold text-xs sm:text-sm text-center shadow-2xs transition-colors flex items-center justify-center gap-2"
          >
            <Home className="w-4 h-4" />
            <span>Return to Campus Home</span>
          </Link>
        </div>

      </div>
    </div>
  );
}
