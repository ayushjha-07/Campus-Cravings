import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { 
  CreditCard, 
  Banknote, 
  Clock, 
  MapPin, 
  User, 
  CheckCircle, 
  ArrowLeft, 
  ShieldCheck, 
  AlertCircle,
  QrCode,
  Store,
  FileText,
  Phone,
  GraduationCap,
  Sparkles,
  Info
} from 'lucide-react';

export default function CheckoutPage() {
  const { cartItems, total, subtotal, packagingFee, discountAmount, user, placeOrder, outletsInCart } = useCart();
  const navigate = useNavigate();

  // Form input states
  const [studentName, setStudentName] = useState(user?.name || 'Aarav Sharma');
  const [studentId, setStudentId] = useState(user?.rollNo || 'CGC2023CSE042');
  const [contactNumber, setContactNumber] = useState(user?.phone || '9876543210');
  const [pickupNote, setPickupNote] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('pickup'); // 'pickup' or 'online'
  const [demoUpiId, setDemoUpiId] = useState('student@okhdfcbank');
  
  // Validation errors state
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // If cart is empty, redirect or display friendly empty state
  if (cartItems.length === 0) {
    return (
      <div className="min-h-[75vh] flex flex-col items-center justify-center px-4 py-16 text-center max-w-md mx-auto">
        <div className="w-16 h-16 rounded-3xl bg-amber-50 text-amber-700 flex items-center justify-center mb-4">
          <AlertCircle className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-black text-stone-900 mb-2">Your Cart is Empty</h2>
        <p className="text-stone-500 text-xs sm:text-sm mb-6 leading-relaxed">
          You don't have any items in your cart to checkout. Please add food from our campus outlets first.
        </p>
        <Link
          to="/#outlets"
          className="px-6 py-3 rounded-2xl bg-[#0D3828] text-white font-bold text-xs hover:bg-[#144834] transition-colors shadow-sm"
        >
          Browse Campus Outlets
        </Link>
      </div>
    );
  }

  // Summary string of outlets involved
  const outletNamesString = outletsInCart.map(o => o.outletName).join(', ');

  // Form Validation
  const validateForm = () => {
    const errs = {};

    if (!studentName.trim()) {
      errs.studentName = 'Student full name is required';
    } else if (studentName.trim().length < 3) {
      errs.studentName = 'Name must be at least 3 characters';
    }

    if (!studentId.trim()) {
      errs.studentId = 'Student ID / CGC Roll Number is required';
    } else if (studentId.trim().length < 4) {
      errs.studentId = 'Enter a valid CGC Student ID (e.g. CGC2023CSE042)';
    }

    const cleanPhone = contactNumber.replace(/\D/g, '');
    if (!cleanPhone) {
      errs.contactNumber = 'Contact number is required for pickup alerts';
    } else if (cleanPhone.length < 10) {
      errs.contactNumber = 'Please enter a valid 10-digit mobile number';
    }

    if (paymentMethod === 'online' && !demoUpiId.trim()) {
      errs.demoUpiId = 'Please provide a demo UPI ID for simulation';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmitOrder = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    setTimeout(() => {
      const createdOrder = placeOrder({
        studentName: studentName.trim(),
        studentId: studentId.trim().toUpperCase(),
        contactNumber: contactNumber.trim(),
        pickupOutlet: outletNamesString,
        pickupNote: pickupNote.trim() || 'Standard order',
        paymentMethod: paymentMethod === 'online' ? 'online' : 'counter'
      });

      setIsSubmitting(false);

      if (createdOrder) {
        navigate(`/order-confirmation/${createdOrder.id}`, { state: { order: createdOrder } });
      } else {
        navigate('/orders');
      }
    }, 600);
  };

  return (
    <div className="min-h-screen bg-[#FBF8F2] py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back to Cart Navigation Link */}
        <div className="mb-6">
          <Link
            to="/cart"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-stone-600 hover:text-[#0D3828] bg-white border border-stone-200/90 px-3.5 py-2 rounded-xl transition-colors shadow-2xs"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Cart</span>
          </Link>
        </div>

        {/* Page Title & Context */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0D3828] uppercase tracking-wider mb-1">
            <CheckCircle className="w-4 h-4 text-[#E76F51]" />
            <span>CGC University Campus Express Pickup</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight">
            Checkout & Pickup Details
          </h1>
          <p className="text-stone-500 text-xs sm:text-sm mt-0.5">
            Fill in your student pickup credentials and choose your payment preference.
          </p>
        </div>

        <form onSubmit={handleSubmitOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Form Details (Student Info, Pickup Counter, Payment Options) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* 1. Student Pickup Details Form Card (Requirement 2) */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-stone-200/90 shadow-2xs space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-stone-100">
                <div className="flex items-center gap-2 font-black text-stone-900 text-sm sm:text-base">
                  <User className="w-4 h-4 text-[#0D3828]" />
                  <span>Student Pickup Identification</span>
                </div>
                <span className="text-[11px] text-stone-400 font-medium">* Required for counter verification</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Student Full Name */}
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Student Full Name <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={studentName}
                      onChange={(e) => {
                        setStudentName(e.target.value);
                        if (errors.studentName) setErrors(prev => ({ ...prev, studentName: null }));
                      }}
                      placeholder="e.g. Aarav Sharma"
                      className={`w-full pl-10 pr-4 py-2.5 rounded-xl bg-stone-50 border text-xs sm:text-sm focus:outline-none focus:ring-2 ${
                        errors.studentName
                          ? 'border-rose-400 focus:ring-rose-200 bg-rose-50/20'
                          : 'border-stone-200 focus:ring-[#0D3828]/20 focus:border-[#0D3828]'
                      }`}
                    />
                  </div>
                  {errors.studentName && (
                    <span className="text-[11px] text-rose-600 mt-1 block font-medium">
                      {errors.studentName}
                    </span>
                  )}
                </div>

                {/* Student ID / Roll Number */}
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Student ID / CGC Roll No. <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <GraduationCap className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={studentId}
                      onChange={(e) => {
                        setStudentId(e.target.value);
                        if (errors.studentId) setErrors(prev => ({ ...prev, studentId: null }));
                      }}
                      placeholder="e.g. CGC2023CSE042"
                      className={`w-full pl-10 pr-4 py-2.5 rounded-xl bg-stone-50 border text-xs sm:text-sm font-mono uppercase focus:outline-none focus:ring-2 ${
                        errors.studentId
                          ? 'border-rose-400 focus:ring-rose-200 bg-rose-50/20'
                          : 'border-stone-200 focus:ring-[#0D3828]/20 focus:border-[#0D3828]'
                      }`}
                    />
                  </div>
                  {errors.studentId && (
                    <span className="text-[11px] text-rose-600 mt-1 block font-medium">
                      {errors.studentId}
                    </span>
                  )}
                </div>
              </div>

              {/* Contact Number */}
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  Contact Number (for Pickup SMS / Ready Alerts) <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="tel"
                    value={contactNumber}
                    onChange={(e) => {
                      setContactNumber(e.target.value);
                      if (errors.contactNumber) setErrors(prev => ({ ...prev, contactNumber: null }));
                    }}
                    placeholder="10-digit mobile number"
                    className={`w-full pl-10 pr-4 py-2.5 rounded-xl bg-stone-50 border text-xs sm:text-sm focus:outline-none focus:ring-2 ${
                      errors.contactNumber
                        ? 'border-rose-400 focus:ring-rose-200 bg-rose-50/20'
                        : 'border-stone-200 focus:ring-[#0D3828]/20 focus:border-[#0D3828]'
                    }`}
                  />
                </div>
                {errors.contactNumber && (
                  <span className="text-[11px] text-rose-600 mt-1 block font-medium">
                    {errors.contactNumber}
                  </span>
                )}
              </div>
            </div>

            {/* 2. Pickup Outlet Verification Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-stone-200/90 shadow-2xs space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-stone-100">
                <div className="flex items-center gap-2 font-black text-stone-900 text-sm sm:text-base">
                  <Store className="w-4 h-4 text-[#0D3828]" />
                  <span>Pickup Outlet & Counter Locations</span>
                </div>
                <span className="text-[11px] text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full font-bold">
                  {outletsInCart.length} Outlet Counter{outletsInCart.length > 1 ? 's' : ''}
                </span>
              </div>

              <div className="space-y-3">
                {outletsInCart.map((outletGroup) => (
                  <div
                    key={outletGroup.outletId || outletGroup.outletName}
                    className="p-3.5 bg-stone-50 rounded-2xl border border-stone-200/80 flex items-center justify-between gap-3 text-xs"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-xl bg-[#0D3828] text-white flex items-center justify-center font-bold text-xs shrink-0">
                        {outletGroup.outletName.charAt(0)}
                      </div>
                      <div>
                        <div className="font-extrabold text-stone-900 text-sm">
                          {outletGroup.outletName}
                        </div>
                        <div className="text-stone-500 flex items-center gap-1 mt-0.5 text-[11px]">
                          <MapPin className="w-3 h-3 text-[#0D3828]" />
                          <span>{outletGroup.outletLocation}</span>
                        </div>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="text-[11px] text-stone-400 block font-medium">Items</span>
                      <span className="font-extrabold text-stone-900">{outletGroup.items.length} items</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Optional Kitchen Instructions */}
              <div className="pt-2">
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  Optional Instructions for Counter / Kitchen Staff
                </label>
                <div className="relative">
                  <FileText className="w-4 h-4 text-stone-400 absolute left-3.5 top-3" />
                  <textarea
                    rows={2}
                    value={pickupNote}
                    onChange={(e) => setPickupNote(e.target.value)}
                    placeholder="e.g. Less spicy, keep chutney in separate container, extra napkins"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-stone-50 border border-stone-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#0D3828]/20 focus:border-[#0D3828] resize-none"
                  />
                </div>
              </div>
            </div>

            {/* 3. Payment Method Card (Requirement 3) */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-stone-200/90 shadow-2xs space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-stone-100">
                <div className="flex items-center gap-2 font-black text-stone-900 text-sm sm:text-base">
                  <CreditCard className="w-4 h-4 text-[#0D3828]" />
                  <span>Select Payment Method</span>
                </div>
                <span className="text-[11px] font-bold text-stone-500 bg-stone-100 px-2 py-0.5 rounded-md">
                  Choose 1 Option
                </span>
              </div>

              <div className="space-y-3">
                
                {/* Option A: Pay at Pickup */}
                <label
                  className={`flex items-start gap-3.5 p-4 rounded-2xl border cursor-pointer transition-all ${
                    paymentMethod === 'pickup'
                      ? 'border-[#0D3828] bg-emerald-50/60 shadow-2xs ring-2 ring-[#0D3828]/10'
                      : 'border-stone-200 hover:bg-stone-50'
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentOption"
                    value="pickup"
                    checked={paymentMethod === 'pickup'}
                    onChange={() => setPaymentMethod('pickup')}
                    className="mt-1 accent-[#0D3828] w-4 h-4"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-extrabold text-stone-900">
                        Pay at Pickup (Counter Cash / UPI)
                      </span>
                      <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">
                        Recommended
                      </span>
                    </div>
                    <p className="text-xs text-stone-500 mt-1 leading-relaxed">
                      Payment is due when collecting your food at the outlet counter. You can pay via cash or UPI directly to the outlet operator.
                    </p>
                  </div>
                </label>

                {/* Option B: Pay Online (Demo Simulator) */}
                <label
                  className={`flex items-start gap-3.5 p-4 rounded-2xl border cursor-pointer transition-all ${
                    paymentMethod === 'online'
                      ? 'border-[#0D3828] bg-emerald-50/60 shadow-2xs ring-2 ring-[#0D3828]/10'
                      : 'border-stone-200 hover:bg-stone-50'
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentOption"
                    value="online"
                    checked={paymentMethod === 'online'}
                    onChange={() => setPaymentMethod('online')}
                    className="mt-1 accent-[#0D3828] w-4 h-4"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-extrabold text-stone-900">
                        Pay Online (Academic Demo Simulation)
                      </span>
                      <span className="text-[10px] bg-amber-100 text-amber-900 font-bold px-2 py-0.5 rounded-full">
                        Demo Simulator
                      </span>
                    </div>
                    <p className="text-xs text-stone-500 mt-1 leading-relaxed">
                      Simulate student UPI pre-payment. Clean academic integration placeholder without charging real cards or money.
                    </p>

                    {/* Demo UPI details sub-box */}
                    {paymentMethod === 'online' && (
                      <div className="mt-3 p-3.5 bg-white rounded-xl border border-stone-200 space-y-2">
                        <div className="text-[11px] font-bold text-stone-700 flex items-center gap-1.5">
                          <QrCode className="w-3.5 h-3.5 text-[#0D3828]" />
                          <span>Demo Student UPI ID Handle:</span>
                        </div>
                        <input
                          type="text"
                          value={demoUpiId}
                          onChange={(e) => setDemoUpiId(e.target.value)}
                          placeholder="student@okaxis"
                          className="w-full px-3 py-1.5 rounded-lg bg-stone-50 border border-stone-200 text-xs font-mono"
                        />
                        <span className="block text-[10px] text-stone-400">
                          *Simulated pre-authorization for CGC University Mohali demo
                        </span>
                      </div>
                    )}
                  </div>
                </label>

              </div>
            </div>

          </div>

          {/* Right Column: Order Summary & Placement CTA */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-stone-200/90 shadow-2xs space-y-4 sticky top-24">
              <div className="flex items-center justify-between pb-3 border-b border-stone-100">
                <h3 className="font-black text-stone-900 text-sm uppercase tracking-wider">
                  Order Summary
                </h3>
                <span className="text-xs font-bold text-stone-500">
                  {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'}
                </span>
              </div>

              {/* Items List */}
              <div className="max-h-60 overflow-y-auto divide-y divide-stone-100 pr-1 text-xs">
                {cartItems.map(item => (
                  <div key={item.id} className="py-2.5 flex items-center justify-between gap-3">
                    <div className="min-w-0 flex-1">
                      <div className="font-bold text-stone-900 truncate">{item.name}</div>
                      <div className="text-[11px] text-stone-400">
                        {item.outletName} • Qty: <strong>{item.quantity}</strong>
                      </div>
                    </div>
                    <div className="text-right font-black text-stone-900 shrink-0">
                      ₹{item.price * item.quantity}
                    </div>
                  </div>
                ))}
              </div>

              {/* Price Breakdown */}
              <div className="pt-3 border-t border-stone-100 space-y-2 text-xs text-stone-600">
                <div className="flex justify-between">
                  <span>Item Subtotal</span>
                  <span className="font-bold text-stone-900">₹{subtotal}</span>
                </div>
                <div className="flex justify-between">
                  <span>Campus Packaging</span>
                  <span className="font-bold text-stone-900">₹{packagingFee}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-bold">
                    <span>Student Discount</span>
                    <span>-₹{discountAmount}</span>
                  </div>
                )}
                <div className="pt-2 border-t border-stone-100 flex justify-between text-base font-black text-stone-900">
                  <span>Total Amount</span>
                  <span className="text-[#0D3828] text-xl font-black">₹{total}</span>
                </div>
              </div>

              {/* Placement Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 rounded-2xl bg-[#0D3828] hover:bg-[#144834] disabled:bg-stone-300 disabled:cursor-not-allowed text-white font-black text-sm sm:text-base flex items-center justify-center gap-2 shadow-md shadow-emerald-950/10 hover:shadow-lg transition-all active:scale-[0.99] cursor-pointer"
              >
                {isSubmitting ? (
                  <span>Generating Pickup Order Token...</span>
                ) : (
                  <>
                    <span>Confirm & Place Demo Order</span>
                    <CheckCircle className="w-4 h-4" />
                  </>
                )}
              </button>

              {/* Verified campus notice */}
              <div className="flex items-center justify-center gap-2 text-[11px] text-stone-400 pt-1 text-center">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Zero convenience fees for CGC University students</span>
              </div>
            </div>

          </div>

        </form>

      </div>
    </div>
  );
}
