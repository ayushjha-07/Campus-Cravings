import React, { useState, useMemo, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import HeroSection from '../components/HeroSection';
import CategoryBar from '../components/CategoryBar';
import CampusOutletsSection from '../components/CampusOutletsSection';
import SpecialOffersSection from '../components/SpecialOffersSection';
import FoodCard from '../components/FoodCard';
import FoodCardMobileRow from '../components/FoodCardMobileRow';
import FoodItemDetailModal from '../components/FoodItemDetailModal';
import HowItWorks from '../components/HowItWorks';
import { OUTLETS, getAllPopularItems, getAllFoodItems } from '../data/outlets';
import { 
  ArrowRight, 
  Search, 
  X, 
  Info, 
  Sparkles,
  Store,
  Utensils,
  Flame,
  CheckCircle2,
  Tag,
  MapPin,
  Clock
} from 'lucide-react';

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeModalItem, setActiveModalItem] = useState(null);
  const location = useLocation();

  // Check URL query parameters for search
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const q = params.get('search');
    if (q) {
      setSearchQuery(q);
      const el = document.getElementById('search-results');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  }, [location.search]);

  // Master list of all items across outlets
  const allItems = useMemo(() => getAllFoodItems(), []);
  const popularItems = useMemo(() => getAllPopularItems(), []);

  // Filtered outlets based on search and category
  const filteredOutlets = useMemo(() => {
    let result = OUTLETS;

    // Apply search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(o => 
        o.name.toLowerCase().includes(q) ||
        o.shortCategory?.toLowerCase().includes(q) ||
        o.location.toLowerCase().includes(q) ||
        o.cuisine.some(c => c.toLowerCase().includes(q))
      );
    }

    // Apply category filter to outlets if selected
    if (selectedCategory !== 'all') {
      const cat = selectedCategory.toLowerCase();
      result = result.filter(o => {
        const hasMatchingMenuItem = o.menu.some(m => {
          const itemCat = m.category.toLowerCase();
          if (cat === 'fast food') return itemCat === 'fast food' || itemCat === 'burgers' || itemCat === 'pizza';
          if (cat === 'north indian') return itemCat === 'north indian' || itemCat === 'meals';
          if (cat === 'beverages') return itemCat === 'beverages' || itemCat === 'coffee';
          return itemCat === cat;
        });
        const hasMatchingCuisine = o.cuisine.some(c => c.toLowerCase().includes(cat));
        return hasMatchingMenuItem || hasMatchingCuisine;
      });
    }

    return result;
  }, [searchQuery, selectedCategory]);

  // Filtered food items based on category and search
  const filteredFoods = useMemo(() => {
    let items = searchQuery.trim() ? allItems : popularItems;

    // Apply search filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      items = items.filter(f => 
        f.name.toLowerCase().includes(q) ||
        f.category.toLowerCase().includes(q) ||
        f.outletName?.toLowerCase().includes(q) ||
        f.description?.toLowerCase().includes(q)
      );
    }

    // Apply category filter
    if (selectedCategory !== 'all') {
      const cat = selectedCategory.toLowerCase();
      items = items.filter(f => {
        const itemCat = f.category.toLowerCase();
        if (cat === 'fast food') {
          return itemCat === 'fast food' || itemCat === 'burgers' || itemCat === 'pizza';
        }
        if (cat === 'north indian') {
          return itemCat === 'north indian' || itemCat === 'meals';
        }
        if (cat === 'beverages') {
          return itemCat === 'beverages' || itemCat === 'coffee';
        }
        return itemCat === cat;
      });
    }

    return items;
  }, [searchQuery, selectedCategory, allItems, popularItems]);

  const handleClearSearch = () => {
    setSearchQuery('');
    setSelectedCategory('all');
  };

  const handleScrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF7F0] dark:bg-[#101713] pb-24 md:pb-16 transition-colors duration-200">
      
      {/* 1. Desktop Hero Section matching reference image */}
      <HeroSection
        onOrderNowClick={() => handleScrollTo('popular')}
        onExploreOutletsClick={() => handleScrollTo('outlets')}
      />

      {/* 2. Mobile Friendly Welcome & Search Block (< md) */}
      <div className="md:hidden px-4 pt-3.5 pb-2">
        <div className="flex items-center justify-between gap-2">
          <div>
            <div className="inline-flex items-center gap-1.5 text-[11px] font-bold text-[#E76F51] tracking-wider uppercase">
              <MapPin className="w-3.5 h-3.5" />
              <span>CGC University, Mohali</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-stone-900 dark:text-[#F5F7F4] tracking-tight leading-tight mt-0.5">
              What are you craving today?
            </h1>
          </div>
        </div>

        {/* Prominent Rounded Search Bar for Food and Outlets */}
        <div className="mt-3 relative">
          <Search className="w-4 h-4 text-stone-400 dark:text-stone-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search dishes, burgers, rolls, chai, outlets..."
            className="w-full pl-10 pr-9 py-2.5 rounded-2xl bg-white dark:bg-[#19231D] border border-stone-200/90 dark:border-[#2A382F] text-xs text-stone-900 dark:text-[#F5F7F4] placeholder:text-stone-400 dark:placeholder:text-stone-500 shadow-2xs focus:outline-none focus:ring-2 focus:ring-[#0D3828]/20 focus:border-[#0D3828]"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-stone-400 hover:text-stone-600 dark:hover:text-stone-200"
              aria-label="Clear search"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* 3. Horizontal Food Categories Bar */}
      <CategoryBar
        selectedCategory={selectedCategory}
        onSelectCategory={(catId) => setSelectedCategory(catId)}
      />

      {/* 4. Mobile Attractive Promotional / Hero Banner (< md) */}
      <div className="md:hidden px-4 my-4">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#064E36] to-[#043B2B] text-white p-5 shadow-lg border border-emerald-700/40">
          <div className="relative z-10 max-w-[68%]">
            <div className="flex items-center gap-1.5 mb-1.5">
              <span className="text-[10px] font-black uppercase tracking-wider bg-[#F97316] text-white px-2 py-0.5 rounded-full">
                Fast Pickup
              </span>
              <span className="text-[10px] text-emerald-200 font-semibold bg-white/10 px-2 py-0.5 rounded-full">
                Demo Order
              </span>
            </div>
            <h3 className="text-base sm:text-lg font-black tracking-tight text-white leading-tight">
              Skip the Queue. <br />
              <span className="text-[#F97316]">Enjoy Your Break.</span>
            </h3>
            <p className="text-[11px] text-emerald-100/90 mt-1 leading-snug">
              Order ahead from your favourite campus outlets and collect your food without waiting.
            </p>
            <button
              onClick={() => handleScrollTo('popular')}
              className="mt-3 px-4 py-1.5 rounded-full bg-white text-[#0D3828] text-xs font-black shadow-xs flex items-center gap-1.5 active:scale-95 cursor-pointer"
            >
              <span>Order Now</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#F97316]" />
            </button>
          </div>
          {/* Visual food art */}
          <div className="absolute -right-5 -bottom-3 w-32 h-32 rounded-full overflow-hidden border-2 border-white/20 shadow-xl pointer-events-none">
            <img
              src="https://images.unsplash.com/photo-1550547660-d9450f859349?w=400&auto=format&fit=crop&q=80"
              alt="Campus cravings burger"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* Active Filter Indicator Banner */}
      {(searchQuery.trim() || selectedCategory !== 'all') && (
        <div id="search-results" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
          <div className="bg-white dark:bg-[#19231D] rounded-2xl p-4 border border-stone-200/90 dark:border-[#2A382F] shadow-xs flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-emerald-50 dark:bg-[#1A3326] text-[#0D3828] dark:text-[#52D8A4] flex items-center justify-center">
                <Search className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs text-stone-500 dark:text-[#B8C5BB]">Showing results for:</span>
                <span className="ml-1.5 text-sm font-bold text-stone-900 dark:text-[#F5F7F4]">
                  {searchQuery ? `"${searchQuery}"` : ''}
                  {searchQuery && selectedCategory !== 'all' ? ' in ' : ''}
                  {selectedCategory !== 'all' ? `${selectedCategory}` : ''}
                </span>
                <span className="ml-2 text-xs font-medium text-stone-400">
                  ({filteredFoods.length} items, {filteredOutlets.length} outlets)
                </span>
              </div>
            </div>

            <button
              onClick={handleClearSearch}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-stone-100 hover:bg-stone-200 dark:bg-[#222E26] dark:hover:bg-[#2A382F] text-stone-700 dark:text-stone-300 text-xs font-semibold transition-colors cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
              <span>Clear Filter</span>
            </button>
          </div>
        </div>
      )}

      {/* 5. Popular Outlets Section (horizontal scrolling carousel on mobile, grid on desktop) */}
      <CampusOutletsSection filteredOutlets={filteredOutlets} />

      {/* 4. Special Offers Section matching reference image */}
      <SpecialOffersSection />

      {/* 5. Popular Food & Campus Favourites Section */}
      <section id="popular" className="py-8 sm:py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6 sm:mb-8 pb-3 border-b border-stone-200/70 dark:border-[#2A382F]">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0D3828] dark:text-[#52D8A4] uppercase tracking-wider mb-1">
              <Utensils className="w-3.5 h-3.5 text-[#E76F51]" />
              <span>Campus Favourites</span>
            </div>
            
            <div className="flex items-center gap-3">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-black text-stone-900 dark:text-[#F5F7F4] tracking-tight">
                Popular Food
              </h2>
              {selectedCategory !== 'all' && (
                <span className="bg-[#EAA044]/20 text-stone-900 dark:text-[#FDBA74] border border-[#EAA044]/40 px-3 py-0.5 rounded-full text-xs font-bold capitalize">
                  {selectedCategory}
                </span>
              )}
            </div>

            <p className="text-stone-500 dark:text-[#B8C5BB] text-xs sm:text-sm mt-1">
              Most ordered break snacks, lunch combos, and chilled drinks by CGC students
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-stone-500 dark:text-stone-400">
              {filteredFoods.length} Items Listed
            </span>
          </div>
        </div>

        {/* Demo Data Disclaimer Badge */}
        <div className="mb-6 py-2.5 px-4 bg-amber-50/80 dark:bg-amber-950/20 border border-amber-200/70 dark:border-amber-800/40 rounded-2xl flex items-center justify-between gap-3 text-xs text-amber-900 dark:text-amber-200">
          <div className="flex items-center gap-2">
            <Info className="w-4 h-4 text-amber-700 dark:text-amber-400 shrink-0" />
            <span>
              <strong>Sample Food Items & Demo Pricing:</strong> Representative items across CGC Mohali food outlets for development. Official vendor counter menus apply.
            </span>
          </div>
          <span className="hidden sm:inline font-mono font-bold text-amber-800 dark:text-amber-300">
            Demo Pricing
          </span>
        </div>

        {/* Food Items Display */}
        {filteredFoods.length > 0 ? (
          <>
            {/* Desktop / Tablet Grid (up to 6 columns matching reference image showcase) */}
            <div className="hidden sm:grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-5">
              {filteredFoods.map(food => (
                <FoodCard 
                  key={food.id} 
                  food={food} 
                  onItemClick={(item, outlet) => setActiveModalItem({ item, outlet })} 
                />
              ))}
            </div>

            {/* Mobile 2-Column Food Grid */}
            <div className="sm:hidden grid grid-cols-2 gap-3">
              {filteredFoods.slice(0, 12).map(food => (
                <FoodCard 
                  key={food.id} 
                  food={food} 
                  onItemClick={(item, outlet) => setActiveModalItem({ item, outlet })} 
                />
              ))}
            </div>
          </>
        ) : (
          /* Empty state */
          <div className="bg-white dark:bg-[#19231D] rounded-3xl p-10 sm:p-14 text-center border border-stone-200/90 dark:border-[#2A382F] shadow-xs">
            <Utensils className="w-12 h-12 text-stone-300 dark:text-stone-600 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-stone-800 dark:text-stone-200 mb-1">
              No matching food items found
            </h3>
            <p className="text-stone-500 dark:text-[#B8C5BB] text-xs sm:text-sm max-w-sm mx-auto mb-5 leading-relaxed">
              We couldn't find any dishes matching your current filter. Try searching for pizza, burger, chai, dosa, or fries.
            </p>
            <button
              onClick={handleClearSearch}
              className="px-6 py-2.5 rounded-full bg-[#0D3828] text-white text-xs font-bold hover:bg-[#14533C] transition-colors cursor-pointer"
            >
              Reset Search & Filters
            </button>
          </div>
        )}

      </section>

      {/* 6. How It Works Section matching 4 steps from prompt */}
      <HowItWorks />

      {/* Food Item Detail Modal */}
      <FoodItemDetailModal
        item={activeModalItem?.item}
        outlet={activeModalItem?.outlet}
        isOpen={Boolean(activeModalItem)}
        onClose={() => setActiveModalItem(null)}
      />

    </div>
  );
}
