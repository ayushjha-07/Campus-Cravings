import React, { useState, useMemo, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { useMenu } from '../context/MenuContext';
import { OUTLETS } from '../data/outlets';
import OutletCard from '../components/OutletCard';
import { 
  Store, 
  Search, 
  X, 
  SlidersHorizontal, 
  CheckCircle2, 
  MapPin, 
  Sparkles,
  ArrowLeft,
  UtensilsCrossed
} from 'lucide-react';

export default function OutletsPage() {
  const { outlets } = useMenu();
  const allOutlets = outlets && outlets.length > 0 ? outlets : OUTLETS;
  const location = useLocation();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [vegOnly, setVegOnly] = useState(false);
  const [openOnly, setOpenOnly] = useState(false);

  // Sync search param from URL if present
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const q = params.get('search');
    if (q) setSearchQuery(q);
  }, [location.search]);

  // Extract unique shortCategories
  const categories = useMemo(() => {
    const set = new Set();
    allOutlets.forEach(o => {
      if (o.shortCategory) set.add(o.shortCategory);
    });
    return ['all', ...Array.from(set)];
  }, [allOutlets]);

  // Filtered outlets
  const filteredOutlets = useMemo(() => {
    return allOutlets.filter(outlet => {
      // Search query filter (matches name, cuisine, tagline, location, category)
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesName = outlet.name.toLowerCase().includes(q);
        const matchesCategory = outlet.shortCategory?.toLowerCase().includes(q);
        const matchesTagline = outlet.tagline?.toLowerCase().includes(q);
        const matchesLocation = outlet.location?.toLowerCase().includes(q);
        const matchesCuisine = outlet.cuisine?.some(c => c.toLowerCase().includes(q));
        const matchesMenu = (outlet.menu || []).some(m => m.name.toLowerCase().includes(q));

        if (!matchesName && !matchesCategory && !matchesTagline && !matchesLocation && !matchesCuisine && !matchesMenu) {
          return false;
        }
      }

      // Category filter
      if (selectedCategory !== 'all') {
        const cat = selectedCategory.toLowerCase();
        const matchesShortCat = outlet.shortCategory?.toLowerCase() === cat;
        const matchesCuisine = outlet.cuisine?.some(c => c.toLowerCase() === cat || c.toLowerCase().includes(cat));
        if (!matchesShortCat && !matchesCuisine) {
          return false;
        }
      }

      // Veg only filter
      if (vegOnly && !outlet.isVegOnly) {
        return false;
      }

      // Open only filter
      if (openOnly && outlet.isOpen === false) {
        return false;
      }

      return true;
    });
  }, [allOutlets, searchQuery, selectedCategory, vegOnly, openOnly]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setVegOnly(false);
    setOpenOnly(false);
  };

  return (
    <div className="min-h-screen bg-[#FAF7F0] dark:bg-[#101713] pb-24 md:pb-16 transition-colors duration-200">
      
      {/* Header Banner */}
      <section className="bg-gradient-to-b from-[#0D3828] to-[#0A291E] text-white pt-8 pb-12 sm:pb-16 px-4 sm:px-6 lg:px-8 border-b border-emerald-900/40">
        <div className="max-w-7xl mx-auto">
          
          {/* Breadcrumb Navigation */}
          <div className="flex items-center gap-2 text-xs text-emerald-200/80 mb-4">
            <Link to="/" className="hover:text-white flex items-center gap-1 transition-colors">
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Campus Home</span>
            </Link>
            <span>/</span>
            <span className="text-white font-semibold">All Food Outlets</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-emerald-200 text-xs font-bold uppercase tracking-wider backdrop-blur-xs mb-3">
                <Store className="w-3.5 h-3.5 text-[#EAA044]" />
                <span>CGC University Dining Hub</span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-black tracking-tight text-white">
                All Campus Outlets
              </h1>
              <p className="mt-2 text-sm sm:text-base text-emerald-100/90 max-w-2xl leading-relaxed">
                Explore all {allOutlets.length} campus dining spots at CGC University, Mohali. From quick rolls and student canteens to premium bistros, order ahead and skip the counter lines.
              </p>
            </div>

            {/* Total Active Outlets Counter Badge */}
            <div className="shrink-0 bg-white/10 dark:bg-[#19231D]/80 backdrop-blur-md rounded-2xl p-4 border border-white/15 dark:border-[#2A382F] flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#E76F51] text-white flex items-center justify-center font-black text-xl shadow-md">
                {allOutlets.length}
              </div>
              <div>
                <div className="text-xs text-emerald-100 font-medium uppercase tracking-wider">Campus Spots</div>
                <div className="text-base font-extrabold text-white">All 17 Outlets Available</div>
              </div>
            </div>
          </div>

          {/* Interactive Search Bar in Header */}
          <div className="mt-8 max-w-2xl relative">
            <Search className="w-5 h-5 text-stone-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search outlets by name, cuisine, rolls, pizza, chai..."
              className="w-full pl-12 pr-10 py-3.5 rounded-2xl bg-white dark:bg-[#19231D] text-stone-900 dark:text-[#F5F7F4] placeholder:text-stone-400 dark:placeholder:text-stone-500 text-sm sm:text-base shadow-lg border border-stone-200/90 dark:border-[#2A382F] focus:outline-none focus:ring-2 focus:ring-[#E76F51]"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 transition-colors"
                aria-label="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

        </div>
      </section>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-4">
        
        {/* Controls & Filter Chips Bar */}
        <div className="bg-white dark:bg-[#19231D] rounded-3xl p-4 sm:p-5 border border-stone-200/90 dark:border-[#2A382F] shadow-sm mb-8 space-y-4">
          
          {/* Top row: Categories */}
          <div className="flex items-center justify-between gap-3 flex-wrap">
            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none no-scrollbar flex-1">
              <span className="text-xs font-bold text-stone-400 dark:text-stone-500 uppercase tracking-wider shrink-0 mr-1 flex items-center gap-1">
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span>Categories:</span>
              </span>
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap capitalize transition-all cursor-pointer ${
                    selectedCategory.toLowerCase() === cat.toLowerCase()
                      ? 'bg-[#0D3828] text-white shadow-xs'
                      : 'bg-stone-100 dark:bg-[#222E26] text-stone-700 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-[#2A382F]'
                  }`}
                >
                  {cat === 'all' ? `All (${allOutlets.length})` : cat}
                </button>
              ))}
            </div>

            {/* Quick Toggle Pills: Veg Only & Open Now */}
            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() => setVegOnly(!vegOnly)}
                className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer border ${
                  vegOnly
                    ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                    : 'bg-stone-50 dark:bg-[#222E26] text-stone-700 dark:text-stone-300 border-stone-200 dark:border-[#2A382F]'
                }`}
              >
                <span className={`w-2 h-2 rounded-full ${vegOnly ? 'bg-white' : 'bg-emerald-500'}`} />
                <span>Veg Only</span>
              </button>

              <button
                type="button"
                onClick={() => setOpenOnly(!openOnly)}
                className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer border ${
                  openOnly
                    ? 'bg-[#0D3828] text-white border-[#0D3828] shadow-xs'
                    : 'bg-stone-50 dark:bg-[#222E26] text-stone-700 dark:text-stone-300 border-stone-200 dark:border-[#2A382F]'
                }`}
              >
                <span className={`w-2 h-2 rounded-full ${openOnly ? 'bg-white' : 'bg-amber-400'}`} />
                <span>Open Now</span>
              </button>
            </div>
          </div>

          {/* Active Filter Pills & Reset */}
          {(searchQuery || selectedCategory !== 'all' || vegOnly || openOnly) && (
            <div className="flex items-center justify-between pt-3 border-t border-stone-100 dark:border-[#2A382F] text-xs">
              <div className="flex items-center gap-2 flex-wrap text-stone-600 dark:text-[#B8C5BB]">
                <span>Showing <strong>{filteredOutlets.length}</strong> of {allOutlets.length} outlets</span>
                {searchQuery && (
                  <span className="px-2 py-0.5 rounded-md bg-stone-100 dark:bg-[#222E26] font-semibold text-stone-800 dark:text-stone-200">
                    Query: "{searchQuery}"
                  </span>
                )}
                {selectedCategory !== 'all' && (
                  <span className="px-2 py-0.5 rounded-md bg-stone-100 dark:bg-[#222E26] font-semibold text-stone-800 dark:text-stone-200">
                    Category: {selectedCategory}
                  </span>
                )}
                {vegOnly && (
                  <span className="px-2 py-0.5 rounded-md bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 font-semibold">
                    Pure Veg
                  </span>
                )}
                {openOnly && (
                  <span className="px-2 py-0.5 rounded-md bg-stone-100 dark:bg-[#222E26] font-semibold text-stone-800 dark:text-stone-200">
                    Open Outlets
                  </span>
                )}
              </div>

              <button
                type="button"
                onClick={handleResetFilters}
                className="text-xs font-bold text-[#E76F51] hover:underline flex items-center gap-1 cursor-pointer shrink-0"
              >
                <X className="w-3.5 h-3.5" />
                <span>Reset Filters</span>
              </button>
            </div>
          )}

        </div>

        {/* Outlets Grid */}
        {filteredOutlets.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredOutlets.map((outlet) => (
              <OutletCard key={outlet.id} outlet={outlet} />
            ))}
          </div>
        ) : (
          /* Empty Search / Filter State */
          <div className="bg-white dark:bg-[#19231D] rounded-3xl p-12 text-center border border-stone-200/90 dark:border-[#2A382F] shadow-xs my-8 max-w-lg mx-auto">
            <div className="w-16 h-16 rounded-3xl bg-amber-50 dark:bg-[#222E26] text-amber-600 dark:text-amber-400 flex items-center justify-center mx-auto mb-4">
              <UtensilsCrossed className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-black text-stone-900 dark:text-[#F5F7F4] mb-2">
              No Outlets Found
            </h3>
            <p className="text-stone-500 dark:text-[#B8C5BB] text-xs sm:text-sm mb-6 leading-relaxed">
              We couldn't find any campus food outlets matching your selected criteria. Try adjusting your search query or resetting filters.
            </p>
            <button
              type="button"
              onClick={handleResetFilters}
              className="px-6 py-2.5 rounded-xl bg-[#0D3828] text-white text-xs font-bold hover:bg-[#144834] transition-colors shadow-sm cursor-pointer"
            >
              Reset All Filters
            </button>
          </div>
        )}

      </main>
    </div>
  );
}
