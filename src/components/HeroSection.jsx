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

import { useAuth } from '../context/AuthContext';

export default function HeroSection({ onOrderNowClick, onExploreOutletsClick }) {
  const { user, isAuthenticated } = useAuth();
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative bg-[#0D1826] text-white overflow-hidden min-h-[520px] sm:min-h-[580px] md:min-h-[640px] flex flex-col justify-between">
      {/* Background container: Realistic 3D Campus Cravings signboard in cafe */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/brand/hero-signboard.jpg"
          alt="Campus Cravings 3D Signboard at CGC University Cafe"
          className="w-full h-full object-cover object-[35%_25%] sm:object-[40%_30%] md:object-center brightness-[0.92] contrast-[1.04]"
          loading="eager"
          fetchPriority="high"
        />
        {/* Subtle top vignette preserving authentic cafe lighting */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/10 to-transparent pointer-events-none" />
        {/* Smooth bottom gradient placed specifically below the 3D signboard to guarantee text contrast */}
        <div 
          className="absolute inset-0 bg-gradient-to-t from-[#0B1528] via-[#0B1528]/85 to-transparent pointer-events-none" 
          style={{ top: '35%' }} 
        />
        {/* Ambient subtle decorative glow matching logo accents */}
        <div className="absolute right-10 top-1/4 w-80 h-80 bg-[#E63946]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute left-1/4 bottom-10 w-96 h-96 bg-[#F4A261]/10 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* Top Location & Campus Status Badge */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-4 sm:pt-6 w-full flex items-center justify-between">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/45 border border-white/20 text-white text-xs font-bold backdrop-blur-md shadow-md">
          <MapPin className="w-3.5 h-3.5 text-[#F4A261]" />
          <span>CGC University, Mohali</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse ml-0.5" />
          <span className="text-emerald-300 text-[10px] uppercase font-bold tracking-wider hidden sm:inline">17 Outlets Live</span>
        </div>
      </div>

      {/* Main Hero Content: Positioned below the 3D signboard to preserve complete signboard visibility */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pb-8 sm:pb-12 pt-36 sm:pt-48 md:pt-60 lg:pt-68 w-full">
        <div className="max-w-2xl lg:max-w-3xl space-y-5 sm:space-y-6">
          
          {/* Main Headline & Subtitle */}
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E63946] text-white text-[11px] sm:text-xs font-black uppercase tracking-wider shadow-md backdrop-blur-xs">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{isAuthenticated ? `Student Dining • Welcome, ${user?.name ? user.name.split(' ')[0] : 'Student'}` : 'Official Campus Dining'}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[56px] font-black tracking-tight leading-[1.08] text-white drop-shadow-md">
              <span>Good Food.</span> <br className="sm:hidden" />
              <span className="text-[#F4A261] drop-shadow-sm ml-1 sm:ml-2">No Long Queues.</span>
            </h1>

            <p className="pt-1 text-stone-200 text-sm sm:text-base lg:text-lg font-medium leading-relaxed max-w-xl drop-shadow-xs">
              Order your favourite meals from all 17 campus cafeterias and pick them up hot & fresh when ready.
            </p>
          </div>

          {/* Action Buttons: Order Now (Primary Brand Red) + Explore Outlets (Outlined Glass) */}
          <div className="flex flex-wrap items-center gap-3.5 pt-1">
            <button
              onClick={() => onOrderNowClick ? onOrderNowClick() : scrollTo('popular')}
              className="px-7 sm:px-8 py-3.5 rounded-full bg-[#E63946] hover:bg-[#D93845] active:scale-[0.98] text-white font-extrabold text-sm sm:text-base flex items-center gap-2.5 shadow-xl shadow-red-950/40 transition-all cursor-pointer"
            >
              <UtensilsCrossed className="w-4 h-4 text-white" />
              <span>Order Now</span>
              <ArrowRight className="w-4 h-4 text-white ml-0.5" />
            </button>

            <button
              onClick={() => onExploreOutletsClick ? onExploreOutletsClick() : scrollTo('outlets')}
              className="px-6 sm:px-7 py-3.5 rounded-full bg-black/40 hover:bg-black/60 active:scale-[0.98] border border-white/30 hover:border-white/60 text-white font-bold text-sm sm:text-base flex items-center gap-2 backdrop-blur-md transition-all cursor-pointer"
            >
              <Store className="w-4 h-4 text-[#F4A261]" />
              <span>Explore 17 Outlets</span>
            </button>
          </div>

          {/* 4 Feature Highlights Row */}
          <div className="pt-5 sm:pt-7 grid grid-cols-2 sm:grid-cols-4 gap-3.5 sm:gap-4 border-t border-white/15 max-w-3xl">
            
            {/* 1. Quick Ordering */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/10 border border-white/15 flex items-center justify-center shrink-0 shadow-inner">
                <Clock className="w-5 h-5 text-[#F4A261]" />
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
                <ShieldCheck className="w-5 h-5 text-[#F4A261]" />
              </div>
              <div>
                <div className="text-xs sm:text-sm font-bold text-white leading-tight">
                  Hassle-Free Pickup
                </div>
                <div className="text-[11px] text-stone-300 font-medium">
                  Skip the counter line
                </div>
              </div>
            </div>

            {/* 4. Exclusive Offers */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/10 border border-white/15 flex items-center justify-center shrink-0 shadow-inner">
                <Sparkles className="w-5 h-5 text-[#E63946]" />
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
