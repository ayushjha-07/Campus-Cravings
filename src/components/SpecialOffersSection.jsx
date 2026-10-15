import React, { useState } from 'react';
import { Tag, Sparkles, Copy, Check, ArrowRight, Flame, Coffee, Moon, Percent, Clock } from 'lucide-react';
import { SPECIAL_OFFERS } from '../data/offers';
import { useCart } from '../context/CartContext';

const ICON_MAP = {
  Sparkles,
  Flame,
  Coffee,
  Moon
};

export default function SpecialOffersSection() {
  const { applyCoupon, showNotification } = useCart();
  const [copiedCode, setCopiedCode] = useState(null);

  const handleApplyOffer = (code) => {
    // Copy code to clipboard
    try {
      navigator.clipboard.writeText(code);
    } catch {
      // fallback
    }

    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2500);

    // Apply coupon to cart if available
    if (applyCoupon) {
      const res = applyCoupon(code);
      if (showNotification) {
        showNotification(res.message || `Promo code ${code} applied to your cart!`);
      }
    }
  };

  return (
    <section id="offers" className="py-8 sm:py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Section Header matching reference image: "Special Offers" + "View All Offers →" */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6 sm:mb-8 pb-3 border-b border-stone-200/70 dark:border-[#2A382F]">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#E76F51] uppercase tracking-wider mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Campus Discounts & Combos</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-black text-stone-900 dark:text-[#F5F7F4] tracking-tight">
            Special Offers
          </h2>
          <p className="text-stone-500 dark:text-[#B8C5BB] text-xs sm:text-sm mt-1">
            Student-friendly deals & demo promotions across CGC Mohali food outlets
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-stone-500 dark:text-stone-400">
            {SPECIAL_OFFERS.length} Active Deals
          </span>
        </div>
      </div>

      {/* Offer Cards Responsive Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {SPECIAL_OFFERS.map((offer) => {
          const Icon = ICON_MAP[offer.icon] || Tag;
          const isCopied = copiedCode === offer.code;

          return (
            <div
              key={offer.id}
              className="group bg-white dark:bg-[#19231D] rounded-3xl border border-stone-200/90 dark:border-[#2A382F] overflow-hidden shadow-2xs hover:shadow-xl hover:border-stone-300 dark:hover:border-stone-700 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Top Banner Gradient with Food Photography */}
                <div className={`relative h-36 bg-gradient-to-br ${offer.bgGradient} p-4 flex flex-col justify-between overflow-hidden text-white`}>
                  {/* Subtle Food image vignette in corner */}
                  <div className="absolute right-0 top-0 bottom-0 w-1/2 opacity-30 mix-blend-overlay pointer-events-none">
                    <img
                      src={offer.image}
                      alt={offer.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Top Badge: Badge Tag + Demo label */}
                  <div className="flex items-center justify-between relative z-10">
                    <span className={`text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full border ${offer.tagColor}`}>
                      {offer.badge}
                    </span>
                    <span className="text-[9px] uppercase font-bold bg-black/40 text-stone-300 px-2 py-0.5 rounded-md backdrop-blur-xs">
                      Demo Promo
                    </span>
                  </div>

                  {/* Discount Big Heading */}
                  <div className="relative z-10 space-y-0.5">
                    <div className="text-2xl font-black tracking-tight" style={{ color: offer.accentColor }}>
                      {offer.discount}
                    </div>
                    <div className="text-xs font-bold text-white leading-tight">
                      {offer.title}
                    </div>
                  </div>
                </div>

                {/* Offer Details */}
                <div className="p-4 sm:p-5 space-y-3">
                  <p className="text-xs text-stone-600 dark:text-[#B8C5BB] leading-relaxed">
                    {offer.subtitle}
                  </p>

                  <div className="space-y-1.5 text-[11px] text-stone-500 dark:text-stone-400">
                    <div className="flex items-center justify-between">
                      <span>Outlet:</span>
                      <strong className="text-stone-800 dark:text-stone-200 font-semibold">{offer.outlet}</strong>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Conditions:</span>
                      <span>{offer.minOrderText} • {offer.maxDiscountText}</span>
                    </div>
                    <div className="flex items-center justify-between pt-0.5">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-stone-400" />
                        <span>Timing:</span>
                      </span>
                      <span className="text-emerald-700 dark:text-[#52D8A4] font-semibold">{offer.validity}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Promo Code & Apply CTA */}
              <div className="p-4 pt-0 sm:p-5 sm:pt-0">
                <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-stone-50 dark:bg-[#222E26] border border-dashed border-stone-300 dark:border-stone-700">
                  <div className="flex-1 pl-2.5 font-mono font-black text-xs text-stone-900 dark:text-[#F5F7F4] tracking-wider uppercase">
                    {offer.code}
                  </div>

                  <button
                    type="button"
                    onClick={() => handleApplyOffer(offer.code)}
                    className={`px-3 py-1.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer shadow-2xs ${
                      isCopied
                        ? 'bg-emerald-600 text-white'
                        : 'bg-[#0D3828] hover:bg-[#14533C] text-white active:scale-95'
                    }`}
                  >
                    {isCopied ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Applied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        <span>Apply</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
