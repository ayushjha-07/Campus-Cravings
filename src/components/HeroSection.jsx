import React from 'react';
import { 
  MapPin, 
  ArrowRight, 
  Store, 
  Clock, 
  UtensilsCrossed, 
  ShieldCheck, 
  Sparkles,
  Zap,
  Leaf
} from 'lucide-react';

export default function HeroSection({ onOrderNowClick, onExploreOutletsClick }) {
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative bg-[#07281B] text-white overflow-hidden">
      {/* Background container: blend dark forest-green into the campus & food imagery */}
      <div className="absolute inset-0 z-0">
        {/* Real CGC Campus Gate + Gourmet Food Photography composition from reference image */}
        <div className="absolute right-0 top-0 bottom-0 w-full lg:w-3/5 xl:w-2/3 h-full">
          <img
            src="/hero-campus-food.jpg"
            alt="CGC University Campus and delicious student food spread"
            className="w-full h-full object-cover object-right-bottom sm:object-right"
          />
          {/* Multi-stage gradient overlays to guarantee perfect text contrast and natural photographic fade */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#07281B] via-[#07281B]/95 sm:via-[#07281B]/85 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#07281B] via-transparent to-[#07281B]/40 lg:hidden" />
        </div>

        {/* Ambient subtle decorative glow */}
        <div className="absolute -left-20 -top-20 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute left-1/3 bottom-0 w-80 h-80 bg-[#EAA044]/10 rounded-full blur-3xl pointer-events-none" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-10 sm:pt-14 lg:pt-18 pb-8 sm:pb-12">
        <div className="max-w-2xl lg:max-w-xl xl:max-w-2xl space-y-6 sm:space-y-7">
          
          {/* Location Pill Badge matching reference image */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#103D2C]/90 border border-emerald-500/40 text-emerald-300 text-xs font-semibold backdrop-blur-md shadow-xs">
            <MapPin className="w-3.5 h-3.5 text-[#EAA044]" />
            <span>CGC University, Mohali</span>
          </div>

          {/* Main Headline matching reference image */}
          <div className="space-y-1 sm:space-y-2">
            <h1 className="text-3xl sm:text-5xl lg:text-[54px] xl:text-[58px] font-black tracking-tight leading-[1.08] text-white">
              <span>Good Food.</span>
              <br />
              <span className="text-[#F97316]">No Long Queues.</span>
            </h1>

            <p className="pt-2 text-stone-200/90 text-sm sm:text-base lg:text-lg font-normal leading-relaxed max-w-xl">
              Order your campus favourites from top food outlets and pick them up when they're ready.
            </p>
          </div>

          {/* Action Buttons: Order Now (Primary Orange) + Explore Outlets (Outlined) */}
          <div className="flex flex-wrap items-center gap-3.5 pt-1">
            <button
              onClick={() => onOrderNowClick ? onOrderNowClick() : scrollTo('popular')}
              className="px-7 sm:px-8 py-3.5 rounded-full bg-[#F97316] hover:bg-[#EA580C] active:scale-[0.98] text-white font-extrabold text-sm sm:text-base flex items-center gap-2.5 shadow-lg shadow-orange-950/30 transition-all cursor-pointer"
            >
              <UtensilsCrossed className="w-4 h-4 text-white" />
              <span>Order Now</span>
              <ArrowRight className="w-4 h-4 text-white ml-0.5" />
            </button>

            <button
              onClick={() => onExploreOutletsClick ? onExploreOutletsClick() : scrollTo('outlets')}
              className="px-6 sm:px-7 py-3.5 rounded-full bg-black/30 hover:bg-black/50 active:scale-[0.98] border border-white/40 hover:border-white/70 text-white font-bold text-sm sm:text-base flex items-center gap-2 backdrop-blur-md transition-all cursor-pointer"
            >
              <Store className="w-4 h-4 text-emerald-300" />
              <span>Explore Outlets</span>
            </button>
          </div>

          {/* 4 Feature Highlights Row matching reference image */}
          <div className="pt-6 sm:pt-8 grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-5 border-t border-emerald-900/60 max-w-3xl">
            
            {/* 1. Quick Ordering */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/10 border border-white/15 flex items-center justify-center shrink-0 shadow-inner">
                <Clock className="w-5 h-5 text-emerald-300" />
              </div>
              <div>
                <div className="text-xs sm:text-sm font-bold text-white leading-tight">
                  Quick Ordering
                </div>
                <div className="text-[11px] text-stone-300 font-medium">
                  Save time
                </div>
              </div>
            </div>

            {/* 2. Fresh & Tasty Food */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/10 border border-white/15 flex items-center justify-center shrink-0 shadow-inner">
                <Leaf className="w-5 h-5 text-emerald-300" />
              </div>
              <div>
                <div className="text-xs sm:text-sm font-bold text-white leading-tight">
                  Fresh & Tasty Food
                </div>
                <div className="text-[11px] text-stone-300 font-medium">
                  Quality assured
                </div>
              </div>
            </div>

            {/* 3. Hassle-Free Pickup */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/10 border border-white/15 flex items-center justify-center shrink-0 shadow-inner">
                <ShieldCheck className="w-5 h-5 text-emerald-300" />
              </div>
              <div>
                <div className="text-xs sm:text-sm font-bold text-white leading-tight">
                  Hassle-Free Pickup
                </div>
                <div className="text-[11px] text-stone-300 font-medium">
                  Easy collection
                </div>
              </div>
            </div>

            {/* 4. Exclusive Offers */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/10 border border-white/15 flex items-center justify-center shrink-0 shadow-inner">
                <Sparkles className="w-5 h-5 text-[#EAA044]" />
              </div>
              <div>
                <div className="text-xs sm:text-sm font-bold text-white leading-tight">
                  Exclusive Offers
                </div>
                <div className="text-[11px] text-stone-300 font-medium">
                  For CGC students
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
