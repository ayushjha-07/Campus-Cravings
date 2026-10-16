import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronLeft, ChevronRight, Store, Sparkles } from 'lucide-react';
import { OUTLETS } from '../data/outlets';
import { useMenu } from '../context/MenuContext';
import OutletCard from './OutletCard';

export default function CampusOutletsSection({ filteredOutlets }) {
  const { outlets } = useMenu();
  const allOutlets = filteredOutlets || outlets || OUTLETS;
  const [showAll, setShowAll] = useState(false);

  // By default display first 5-8 outlets matching reference, or all 14 when toggled
  const displayedOutlets = showAll ? allOutlets : allOutlets.slice(0, 5);

  return (
    <section id="outlets" className="py-8 sm:py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Section Header matching reference image: "Popular Outlets" + "View All Outlets →" */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6 sm:mb-8 pb-3 border-b border-stone-200/70 dark:border-[#2A382F]">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0D3828] dark:text-[#52D8A4] uppercase tracking-wider mb-1">
            <Store className="w-3.5 h-3.5" />
            <span>Campus Dining Hub</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-black text-stone-900 dark:text-[#F5F7F4] tracking-tight">
            Popular Outlets
          </h2>
          <p className="text-stone-500 dark:text-[#B8C5BB] text-xs sm:text-sm mt-1">
            Explore top food outlets at CGC University, Mohali ({allOutlets.length} active campus spots)
          </p>
        </div>

        {/* View All Outlets Button */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setShowAll(!showAll)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-stone-100 hover:bg-stone-200 dark:bg-[#222E26] dark:hover:bg-[#2A382F] text-stone-800 dark:text-stone-200 text-xs sm:text-sm font-bold transition-all cursor-pointer border border-stone-200/80 dark:border-[#2A382F]"
          >
            <span>{showAll ? 'Show Top Outlets' : 'View All Outlets'}</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#E76F51]" />
          </button>
        </div>
      </div>

      {/* Mobile Horizontal Scrolling Carousel */}
      <div className="flex sm:hidden overflow-x-auto gap-3.5 pb-3 -mx-4 px-4 scrollbar-none no-scrollbar snap-x snap-mandatory">
        {displayedOutlets.map((outlet) => (
          <div key={outlet.id} className="min-w-[240px] max-w-[260px] snap-start shrink-0">
            <OutletCard outlet={outlet} />
          </div>
        ))}
      </div>

      {/* Desktop / Tablet Responsive Grid */}
      <div className="hidden sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
        {displayedOutlets.map((outlet) => (
          <OutletCard key={outlet.id} outlet={outlet} />
        ))}
      </div>

      {/* When only 5 are shown, a subtle toggle reminder at bottom */}
      {!showAll && allOutlets.length > 5 && (
        <div className="mt-8 text-center">
          <button
            type="button"
            onClick={() => setShowAll(true)}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white dark:bg-[#19231D] hover:bg-stone-50 dark:hover:bg-[#222E26] text-[#0D3828] dark:text-[#52D8A4] font-bold text-xs sm:text-sm border border-stone-200 dark:border-[#2A382F] shadow-sm transition-all cursor-pointer hover:shadow-md"
          >
            <span>View All {allOutlets.length} CGC Outlets</span>
            <ArrowRight className="w-4 h-4 text-[#E76F51]" />
          </button>
        </div>
      )}
    </section>
  );
}
