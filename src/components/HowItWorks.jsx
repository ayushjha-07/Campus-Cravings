import React from 'react';
import { 
  Store, 
  ShoppingBag, 
  Clock, 
  PackageCheck, 
  ChevronRight,
  ArrowRight
} from 'lucide-react';

export default function HowItWorks() {
  const steps = [
    {
      step: '01',
      title: 'Browse Campus Outlets',
      desc: 'Explore 17 food spots across CGC Mohali campus and view live counter menus.',
      icon: Store,
      color: 'bg-emerald-50 dark:bg-[#1A3326] text-[#0D3828] dark:text-[#52D8A4] border border-emerald-200/60 dark:border-emerald-700/40'
    },
    {
      step: '02',
      title: 'Choose Food & Order',
      desc: 'Pick your favourite snacks, meals, or drinks with demo payment or pay at pickup.',
      icon: ShoppingBag,
      color: 'bg-amber-50 dark:bg-amber-950/30 text-[#D97706] dark:text-[#FDBA74] border border-amber-200/60 dark:border-amber-700/40'
    },
    {
      step: '03',
      title: 'Track Preparation Status',
      desc: 'Watch real-time kitchen progress stages from Order Placed to Ready for Pickup.',
      icon: Clock,
      color: 'bg-teal-50 dark:bg-teal-950/30 text-[#0F766E] dark:text-[#5EEAD4] border border-teal-200/60 dark:border-teal-700/40'
    },
    {
      step: '04',
      title: 'Collect Food When Ready',
      desc: 'Walk up to the counter, show your digital token code, and enjoy your break.',
      icon: PackageCheck,
      color: 'bg-orange-50 dark:bg-orange-950/30 text-[#EA580C] dark:text-[#FB923C] border border-orange-200/60 dark:border-orange-700/40'
    }
  ];

  return (
    <section id="how-it-works" className="py-10 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Title & Subtitle matching overall theme */}
      <div className="mb-6 sm:mb-8 text-center sm:text-left">
        <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0D3828] dark:text-[#52D8A4] uppercase tracking-wider mb-1">
          <span>Simple Campus Pickup</span>
        </div>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-black text-stone-900 dark:text-[#F5F7F4] tracking-tight">
          How It Works
        </h2>
        <p className="text-stone-500 dark:text-[#B8C5BB] text-xs sm:text-sm mt-1">
          Skip long counter queues during lecture breaks in 4 simple steps
        </p>
      </div>

      {/* Steps Container */}
      <div className="bg-white dark:bg-[#19231D] rounded-3xl p-6 sm:p-8 border border-stone-200/90 dark:border-[#2A382F] shadow-sm">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-5 relative">
          {steps.map((item, idx) => {
            const Icon = item.icon;
            const isLast = idx === steps.length - 1;

            return (
              <div key={idx} className="relative flex flex-col justify-between p-4 rounded-2xl bg-stone-50/70 dark:bg-[#222E26]/60 border border-stone-200/60 dark:border-[#2A382F] space-y-4">
                
                {/* Top Row: Icon + Step number */}
                <div className="flex items-center justify-between">
                  <div className={`w-12 h-12 rounded-2xl ${item.color} flex items-center justify-center shadow-xs`}>
                    <Icon className="w-5 h-5 stroke-[2.2]" />
                  </div>
                  <span className="font-mono text-xl font-black text-stone-300 dark:text-stone-600">
                    {item.step}
                  </span>
                </div>

                {/* Step Text */}
                <div className="space-y-1">
                  <h3 className="font-black text-stone-900 dark:text-[#F5F7F4] text-base leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs text-stone-500 dark:text-[#B8C5BB] leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                {/* Arrow connector between steps on desktop */}
                {!isLast && (
                  <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 z-10 text-stone-400 dark:text-stone-600">
                    <ChevronRight className="w-5 h-5" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
