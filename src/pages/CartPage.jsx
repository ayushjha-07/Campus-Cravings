import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import OutletEmblem from '../components/OutletEmblem';
import { 
  ShoppingBag, 
  Trash2, 
  Plus, 
  Minus, 
  ArrowRight, 
  ArrowLeft,
  Tag, 
  ShieldCheck, 
  Clock, 
  MapPin, 
  Store,
  Check, 
  X,
  Info,
  Sparkles,
  AlertCircle
} from 'lucide-react';

export default function CartPage() {
  const { 
    cartItems, 
    updateQuantity, 
    removeFromCart, 
    clearCart, 
    subtotal, 
    packagingFee, 
    discountAmount, 
    total,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    outletsInCart,
    itemCount
  } = useCart();

  const [couponInput, setCouponInput] = useState('');
  const [couponMessage, setCouponMessage] = useState(null);
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const navigate = useNavigate();

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    const res = applyCoupon(couponInput);
    setCouponMessage(res);
  };

  const handleQuickApply = (code) => {
    setCouponInput(code);
    const res = applyCoupon(code);
    setCouponMessage(res);
  };

  // 1. Empty Cart State matching Requirement 5
  if (cartItems.length === 0) {
    return (
      <div className="min-h-[75vh] flex flex-col items-center justify-center px-4 py-16 text-center max-w-lg mx-auto">
        {/* Custom Empty Cart Illustration in Forest-green and Warm Cream */}
        <div className="relative mb-6">
          <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-3xl bg-[#EAF4EE] border border-[#C2DED0] flex items-center justify-center shadow-inner">
            <ShoppingBag className="w-14 h-14 sm:w-16 sm:h-16 text-[#0D3828] stroke-[1.5]" />
          </div>
          <div className="absolute -bottom-2 -right-2 w-10 h-10 rounded-2xl bg-[#EAA044] text-white flex items-center justify-center shadow-md">
            <Sparkles className="w-5 h-5" />
          </div>
        </div>

        <h2 className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight mb-2">
          Your Campus Cart is Empty
        </h2>

        <p className="text-stone-500 text-xs sm:text-sm max-w-sm mb-8 leading-relaxed">
          Looks like you haven't added any break snacks, meals, or drinks from CGC University food outlets yet.
        </p>

        {/* Primary Action Button: Browse Outlets */}
        <div className="flex flex-col sm:flex-row gap-3 w-full justify-center max-w-xs">
          <Link
            to="/#outlets"
            className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-[#0D3828] hover:bg-[#144834] text-white font-extrabold text-xs sm:text-sm shadow-md shadow-emerald-950/10 hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Store className="w-4 h-4" />
            <span>Browse Outlets</span>
          </Link>
          <Link
            to="/orders"
            className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-white hover:bg-stone-50 text-stone-700 font-bold text-xs sm:text-sm border border-stone-200 shadow-2xs transition-all flex items-center justify-center"
          >
            <span>My Orders</span>
          </Link>
        </div>
      </div>
    );
  }

  // 2. Active Cart with Items
  return (
    <div className="min-h-screen bg-[#FBF8F2] py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Header Row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 sm:mb-8 pb-4 border-b border-stone-200/80">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0D3828] uppercase tracking-wider mb-1">
              <ShoppingBag className="w-4 h-4 text-[#E76F51]" />
              <span>CGC University Student Dining Cart</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight">
              Review Cart & Pickup Summary
            </h1>
            <p className="text-stone-500 text-xs sm:text-sm mt-0.5">
              {itemCount} {itemCount === 1 ? 'item' : 'items'} selected across {outletsInCart.length} campus {outletsInCart.length === 1 ? 'outlet' : 'outlets'}
            </p>
          </div>

          {/* Action Header Controls */}
          <div className="flex items-center gap-2.5 self-start sm:self-auto">
            {/* Continue Shopping Button */}
            <Link
              to="/#outlets"
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white hover:bg-stone-50 border border-stone-200 text-stone-700 text-xs font-bold transition-all shadow-2xs"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Continue Shopping</span>
            </Link>

            {/* Clear Cart Button */}
            {showClearConfirm ? (
              <div className="flex items-center gap-1.5 bg-rose-50 border border-rose-200 p-1 rounded-xl">
                <span className="text-[11px] font-bold text-rose-800 px-2">Clear all?</span>
                <button
                  onClick={() => {
                    clearCart();
                    setShowClearConfirm(false);
                  }}
                  className="px-2.5 py-1 bg-rose-600 text-white rounded-lg text-xs font-bold hover:bg-rose-700 cursor-pointer"
                >
                  Yes
                </button>
                <button
                  onClick={() => setShowClearConfirm(false)}
                  className="px-2 py-1 bg-white text-stone-600 rounded-lg text-xs font-bold hover:bg-stone-100 cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <button
                onClick={() => setShowClearConfirm(true)}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-rose-600 hover:bg-rose-50 border border-rose-200/70 transition-colors cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Clear Cart</span>
              </button>
            )}
          </div>
        </div>

        {/* Demo Pricing Advisory */}
        <div className="mb-6 py-2 px-3.5 bg-amber-50/90 border border-amber-200/80 rounded-2xl flex items-center justify-between gap-3 text-xs text-amber-900">
          <div className="flex items-center gap-2">
            <Info className="w-4 h-4 text-amber-700 shrink-0" />
            <span>
              <strong>Sample Demo Cart:</strong> Item prices and totals reflect demonstration data for CGC University Mohali cafeteria ordering.
            </span>
          </div>
          <span className="font-bold text-amber-800 shrink-0 hidden sm:inline">
            Campus Express
          </span>
        </div>

        {/* Main Content Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Cart items GROUPED BY OUTLET (Requirement 11) */}
          <div className="lg:col-span-7 space-y-6">
            {outletsInCart.map((outletGroup) => (
              <div
                key={outletGroup.outletId || outletGroup.outletName}
                className="bg-white rounded-3xl p-5 sm:p-6 border border-stone-200/90 shadow-2xs overflow-hidden"
              >
                {/* Outlet Header Card with Pickup Counter Landmark */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 mb-4 border-b border-stone-100">
                  <div className="flex items-center gap-3">
                    {/* Visual Outlet Emblem */}
                    <div className="shrink-0 p-0.5 bg-stone-50 rounded-2xl border border-stone-200/80">
                      <OutletEmblem outlet={{ id: outletGroup.outletId, name: outletGroup.outletName }} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-extrabold text-stone-900 text-base sm:text-lg">
                          {outletGroup.outletName}
                        </h3>
                        <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200/60">
                          {outletGroup.outletItemCount} {outletGroup.outletItemCount === 1 ? 'item' : 'items'}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-stone-500 mt-0.5">
                        <MapPin className="w-3.5 h-3.5 text-[#0D3828] shrink-0" />
                        <span>Pickup Counter: <strong>{outletGroup.outletLocation}</strong></span>
                      </div>
                    </div>
                  </div>

                  {/* Add more items link for this specific outlet */}
                  <Link
                    to={`/outlet/${outletGroup.outletId}`}
                    className="self-start sm:self-auto text-xs font-bold text-[#0D3828] hover:underline flex items-center gap-1"
                  >
                    <span>+ Add more from this outlet</span>
                  </Link>
                </div>

                {/* Items List for this Outlet */}
                <div className="divide-y divide-stone-100">
                  {outletGroup.items.map(item => {
                    const itemSubtotal = item.price * item.quantity;

                    return (
                      <div
                        key={item.id}
                        className="py-4 first:pt-0 last:pb-0 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4"
                      >
                        {/* Food Details (Thumbnail, Veg Indicator, Name, Unit Price) */}
                        <div className="flex items-center gap-3.5 flex-1 min-w-0">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-16 h-16 sm:w-18 sm:h-18 rounded-2xl object-cover shrink-0 bg-stone-100 border border-stone-100"
                          />

                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-1.5 mb-1">
                              <span
                                className={`w-3 h-3 border flex items-center justify-center rounded-2xs shrink-0 ${
                                  item.isVeg ? 'border-emerald-600' : 'border-rose-600'
                                }`}
                              >
                                <span
                                  className={`w-1.5 h-1.5 rounded-full ${
                                    item.isVeg ? 'bg-emerald-600' : 'bg-rose-600'
                                  }`}
                                />
                              </span>
                              <span className="font-extrabold text-stone-900 text-sm sm:text-base leading-tight truncate">
                                {item.name}
                              </span>
                            </div>

                            <div className="text-xs text-stone-500 flex items-center gap-2">
                              <span>Unit Price: <strong className="text-stone-800">₹{item.price}</strong></span>
                              <span className="text-stone-300">•</span>
                              <span className="text-[11px] text-stone-400 capitalize">{item.category}</span>
                            </div>
                          </div>
                        </div>

                        {/* Controls: Quantity Stepper, Item Subtotal & Remove Button */}
                        <div className="flex items-center justify-between sm:justify-end gap-2.5 sm:gap-4 shrink-0">
                          
                          {/* Quantity Stepper */}
                          <div className="flex items-center gap-1.5 bg-stone-100 rounded-xl p-1 border border-stone-200/80">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="w-7 h-7 rounded-lg bg-white text-stone-700 hover:text-[#0D3828] flex items-center justify-center font-bold text-xs shadow-2xs transition-colors cursor-pointer"
                              aria-label="Decrease quantity"
                              title="Decrease"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="w-6 text-center text-xs font-black text-stone-900">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="w-7 h-7 rounded-lg bg-white text-stone-700 hover:text-[#0D3828] flex items-center justify-center font-bold text-xs shadow-2xs transition-colors cursor-pointer"
                              aria-label="Increase quantity"
                              title="Increase"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          {/* Dynamic Item Subtotal (Requirement 2 & 4) */}
                          <div className="text-right min-w-[70px]">
                            <span className="text-xs text-stone-400 block -mb-0.5">Subtotal</span>
                            <span className="font-black text-base text-stone-900">
                              ₹{itemSubtotal}
                            </span>
                          </div>

                          {/* Remove Item Button */}
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="p-2 text-stone-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors cursor-pointer"
                            aria-label={`Remove ${item.name} from cart`}
                            title="Remove item"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Subtotal Banner for this Outlet */}
                <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-xs text-stone-600 bg-stone-50/70 p-3 rounded-2xl">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#0D3828]" />
                    <span>Collect from counter when your token is called</span>
                  </div>
                  <div>
                    <span>Outlet Subtotal: </span>
                    <strong className="text-stone-900 font-extrabold text-sm">₹{outletGroup.outletSubtotal}</strong>
                  </div>
                </div>
              </div>
            ))}

            {/* Bottom Add More Prompter */}
            <div className="p-4 rounded-3xl bg-white border border-dashed border-stone-300 flex items-center justify-between">
              <span className="text-xs text-stone-600">Want to order another dish before checkout?</span>
              <Link
                to="/#outlets"
                className="text-xs font-bold text-[#0D3828] hover:underline flex items-center gap-1"
              >
                <span>+ Browse All 17 Campus Outlets</span>
              </Link>
            </div>
          </div>

          {/* Right Column: Coupon, Dynamic Bill Breakdown & Checkout CTA */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Student Campus Coupon Card */}
            <div className="bg-white rounded-3xl p-5 sm:p-6 border border-stone-200/90 shadow-2xs">
              <div className="flex items-center gap-2 text-stone-900 font-bold text-sm mb-3">
                <Tag className="w-4 h-4 text-[#E76F51]" />
                <span>Student Discount Coupon</span>
              </div>

              {appliedCoupon ? (
                <div className="flex items-center justify-between p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs">
                  <div className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <div>
                      <div className="font-black text-sm">{appliedCoupon.code} Applied</div>
                      <div className="text-[11px] text-emerald-700">
                        {appliedCoupon.description} (You save ₹{discountAmount})
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={removeCoupon}
                    className="p-1.5 text-emerald-700 hover:text-emerald-900 hover:bg-emerald-100 rounded-lg cursor-pointer"
                    title="Remove coupon"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="space-y-3">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value)}
                      placeholder="Enter promo code (e.g. CGC10)"
                      className="flex-1 px-3.5 py-2.5 rounded-xl bg-stone-50 border border-stone-200 text-xs uppercase placeholder:normal-case font-mono focus:outline-none focus:ring-2 focus:ring-[#0D3828]/20 focus:border-[#0D3828]"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2.5 rounded-xl bg-[#0D3828] hover:bg-[#144834] text-white text-xs font-bold transition-colors cursor-pointer"
                    >
                      Apply
                    </button>
                  </div>

                  {couponMessage && (
                    <div
                      className={`text-xs p-2 rounded-xl flex items-center gap-1.5 ${
                        couponMessage.success
                          ? 'bg-emerald-50 text-emerald-800'
                          : 'bg-rose-50 text-rose-800'
                      }`}
                    >
                      {couponMessage.message}
                    </div>
                  )}

                  {/* Clickable Quick Coupon suggestions */}
                  <div className="flex items-center gap-2 pt-1 text-[11px] text-stone-500 flex-wrap">
                    <span>Student Codes:</span>
                    <button
                      type="button"
                      onClick={() => handleQuickApply('CGC10')}
                      className="font-mono bg-stone-100 hover:bg-emerald-50 hover:text-[#0D3828] px-2 py-0.5 rounded-md font-bold text-stone-700 border border-stone-200 transition-colors cursor-pointer"
                    >
                      CGC10 (10% Off)
                    </button>
                    <button
                      type="button"
                      onClick={() => handleQuickApply('BREAK5')}
                      className="font-mono bg-stone-100 hover:bg-emerald-50 hover:text-[#0D3828] px-2 py-0.5 rounded-md font-bold text-stone-700 border border-stone-200 transition-colors cursor-pointer"
                    >
                      BREAK5 (5% Off)
                    </button>
                  </div>
                </form>
              )}
            </div>

            {/* Bill Summary Card (Requirements 4, 12, 13) */}
            <div className="bg-white rounded-3xl p-5 sm:p-6 border border-stone-200/90 shadow-2xs space-y-4">
              <h3 className="font-bold text-stone-900 text-sm uppercase tracking-wider">
                Order Bill Summary
              </h3>

              <div className="space-y-2.5 text-xs sm:text-sm text-stone-600">
                <div className="flex justify-between items-center">
                  <span>Item Subtotal ({itemCount} {itemCount === 1 ? 'item' : 'items'})</span>
                  <span className="font-extrabold text-stone-900">₹{subtotal}</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="flex items-center gap-1">
                    Campus Eco-Packaging
                    <span className="text-[10px] text-stone-400">(Biodegradable)</span>
                  </span>
                  <span className="font-extrabold text-stone-900">₹{packagingFee}</span>
                </div>

                {appliedCoupon && (
                  <div className="flex justify-between items-center text-emerald-700 font-bold">
                    <span>Student Discount ({appliedCoupon.code})</span>
                    <span>-₹{discountAmount}</span>
                  </div>
                )}

                <div className="pt-3 border-t border-stone-100 flex justify-between items-center text-base sm:text-lg font-black text-stone-900">
                  <span>Total Amount</span>
                  <span className="text-[#0D3828] text-xl font-black">₹{total}</span>
                </div>
              </div>

              {/* Pickup Assurance Information */}
              <div className="p-3 bg-stone-50 rounded-2xl text-[11px] text-stone-500 space-y-1">
                <div className="flex items-center gap-1.5 font-bold text-stone-800">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>CGC Direct Pickup Counter Guarantee</span>
                </div>
                <p className="leading-relaxed">
                  Your food is freshly prepared at each outlet. Present your digital pickup token at the counter during lecture breaks to collect your hot meal.
                </p>
              </div>

              {/* Primary Action: Proceed to Checkout (Requirement 7) */}
              <button
                onClick={() => navigate('/checkout')}
                className="w-full py-4 rounded-2xl bg-[#0D3828] hover:bg-[#144834] text-white font-extrabold text-sm sm:text-base flex items-center justify-center gap-2 shadow-md shadow-emerald-950/10 hover:shadow-lg transition-all active:scale-[0.99] cursor-pointer"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              {/* Secondary Action: Continue Shopping (Requirement 6) */}
              <Link
                to="/#outlets"
                className="w-full py-3 rounded-2xl bg-white hover:bg-stone-50 text-stone-700 font-bold text-xs sm:text-sm border border-stone-200 text-center block transition-colors shadow-2xs"
              >
                Continue Shopping
              </Link>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
