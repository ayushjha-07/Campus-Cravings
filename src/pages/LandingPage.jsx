import React, { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { OUTLETS } from '../data/outlets';
import { 
  Store, 
  Search, 
  ArrowRight, 
  Clock, 
  Sparkles, 
  MapPin, 
  ShieldCheck, 
  CheckCircle2, 
  UtensilsCrossed, 
  Compass, 
  ShoppingBag, 
  ChefHat, 
  Tag, 
  Mail, 
  Phone, 
  ChevronRight, 
  Filter, 
  Layers, 
  Award, 
  Zap, 
  ArrowUpRight, 
  HelpCircle, 
  Info,
  Coffee,
  Pizza,
  Utensils,
  ShoppingCart
} from 'lucide-react';

export default function LandingPage() {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  const [outletSearch, setOutletSearch] = useState('');
  const [selectedCuisine, setSelectedCuisine] = useState('All');

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Cuisine category filters for 17 outlets
  const cuisineCategories = [
    'All',
    'Cafe & Fast Food',
    'North Indian',
    'Chinese & Asian',
    'Beverages & Shakes',
    'Snacks & Quick Bites',
    'Bakery & Desserts'
  ];

  // Filter outlets dynamically based on existing data
  const filteredOutlets = useMemo(() => {
    return OUTLETS.filter((outlet) => {
      // Search query filter (matches name, category, location, or cuisine)
      const query = outletSearch.toLowerCase().trim();
      const matchesSearch = !query || (
        outlet.name.toLowerCase().includes(query) ||
        outlet.shortCategory?.toLowerCase().includes(query) ||
        outlet.location?.toLowerCase().includes(query) ||
        (outlet.cuisine && outlet.cuisine.some(c => c.toLowerCase().includes(query)))
      );

      // Cuisine pill filter
      if (selectedCuisine === 'All') return matchesSearch;

      const cat = selectedCuisine.toLowerCase();
      const matchesCategory = 
        outlet.shortCategory?.toLowerCase().includes(cat) ||
        (outlet.cuisine && outlet.cuisine.some(c => c.toLowerCase().includes(cat))) ||
        (cat === 'cafe & fast food' && (outlet.shortCategory?.toLowerCase().includes('cafe') || outlet.shortCategory?.toLowerCase().includes('burger') || outlet.shortCategory?.toLowerCase().includes('pizza'))) ||
        (cat === 'north Indian' && (outlet.shortCategory?.toLowerCase().includes('canteen') || outlet.shortCategory?.toLowerCase().includes('indian'))) ||
        (cat === 'beverages & shakes' && (outlet.shortCategory?.toLowerCase().includes('tea') || outlet.shortCategory?.toLowerCase().includes('coffee') || outlet.shortCategory?.toLowerCase().includes('shake') || outlet.name.toLowerCase().includes('nescafe') || outlet.name.toLowerCase().includes('kulhad'))) ||
        (cat === 'snacks & quick bites' && (outlet.shortCategory?.toLowerCase().includes('snack') || outlet.shortCategory?.toLowerCase().includes('roll') || outlet.shortCategory?.toLowerCase().includes('tuck')));

      return matchesSearch && matchesCategory;
    });
  }, [outletSearch, selectedCuisine]);

  return (
    <div className="min-h-screen bg-[#FAF7F0] dark:bg-[#101713] text-stone-900 dark:text-stone-100 antialiased font-sans selection:bg-[#E63946] selection:text-white transition-colors duration-200">
      
      {/* Logged In Quick Notice Banner (only shown if student is already authenticated) */}
      {isAuthenticated && (
        <div className="bg-[#0D1826] text-white px-4 py-2.5 text-xs border-b border-stone-800">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
            <div className="flex items-center gap-2 text-center sm:text-left">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
              <span>
                You are currently signed in as <strong className="text-amber-300">{user?.name || 'Aarav Sharma'}</strong>.
              </span>
            </div>
            <Link
              to="/dashboard"
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E63946] hover:bg-[#d5323f] text-white text-[11px] font-bold transition-all shadow-xs"
            >
              <span>Go to Student Dashboard</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      )}

      {/* =========================================================================
          1. HERO SECTION (Requirement 3)
          ========================================================================= */}
      <section id="hero" className="relative bg-[#0D1826] text-white overflow-hidden min-h-[560px] sm:min-h-[640px] lg:min-h-[700px] flex flex-col justify-between">
        
        {/* Background visual: Realistic 3D Campus Cravings signboard image */}
        <div className="absolute inset-0 z-0">
          <img
            src="/images/brand/hero-signboard.jpg"
            alt="Campus Cravings 3D illuminated signboard at university cafe"
            className="w-full h-full object-cover object-[26%_20%] sm:object-[35%_25%] md:object-center brightness-[0.92] contrast-[1.04]"
            loading="eager"
            fetchPriority="high"
          />
          {/* Subtle top vignette preserving authentic cafe ambient lighting */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/20 to-transparent pointer-events-none" />
          
          {/* Smooth bottom dark navy gradient placed below the 3D signboard to guarantee text contrast */}
          <div 
            className="absolute inset-0 bg-gradient-to-t from-[#0B1528] via-[#0B1528]/85 to-transparent pointer-events-none" 
            style={{ top: '28%' }} 
          />
          
          {/* Ambient subtle decorative glow matching logo accents */}
          <div className="absolute right-10 top-1/4 w-80 h-80 bg-[#E63946]/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute left-1/4 bottom-10 w-96 h-96 bg-[#F4A261]/10 rounded-full blur-3xl pointer-events-none" />
        </div>

        {/* Top Location & Campus Badges */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-4 sm:pt-6 w-full flex items-center justify-between">
          <div className="inline-flex items-center gap-2 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-black/45 border border-white/20 text-white text-[11px] sm:text-xs font-bold backdrop-blur-md shadow-md">
            <MapPin className="w-3.5 h-3.5 text-[#F4A261]" />
            <span>CGC University, Mohali</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse ml-0.5" />
            <span className="text-emerald-300 text-[10px] uppercase font-bold tracking-wider hidden sm:inline">17 Outlets Live</span>
          </div>

          <div className="hidden sm:inline-flex items-center gap-1.5 text-xs text-stone-300 font-medium bg-black/40 px-3 py-1.5 rounded-full border border-white/10 backdrop-blur-xs">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Official Student Dining Platform</span>
          </div>
        </div>

        {/* Main Hero Content: Positioned below the 3D signboard so illuminated lettering is fully visible */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pb-6 sm:pb-12 pt-28 sm:pt-40 md:pt-48 lg:pt-56 w-full">
          <div className="max-w-2xl lg:max-w-3xl space-y-4 sm:space-y-6">
            
            {/* Headline matching Reference Mobile Image */}
            <div className="space-y-2 sm:space-y-3">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-black tracking-tight leading-[1.12] text-white drop-shadow-md">
                Your Campus.<br />
                Your Cravings.<br />
                <span className="text-[#EAA044]">One Place.</span>
              </h1>

              {/* Supporting Text matching Reference Mobile Image */}
              <p className="pt-0.5 text-stone-200/95 text-xs sm:text-sm md:text-base font-medium leading-relaxed max-w-md drop-shadow-xs">
                Discover your favourite campus food outlets, explore menus, and order your meals conveniently without standing in long queues.
              </p>
            </div>

            {/* Buttons: Primary "Explore Outlets →" & Secondary "Get Started" */}
            <div className="flex flex-wrap items-center gap-2.5 sm:gap-3.5 pt-1">
              <button
                type="button"
                onClick={() => scrollTo('outlets')}
                className="px-5 sm:px-7 py-2.5 sm:py-3.5 rounded-xl bg-[#DE4927] hover:bg-[#C23C1E] active:scale-[0.98] text-white font-extrabold text-xs sm:text-sm flex items-center gap-2 shadow-xl shadow-red-950/40 transition-all cursor-pointer min-h-[44px]"
              >
                <span>Explore Outlets</span>
                <ArrowRight className="w-4 h-4 text-white" />
              </button>

              {isAuthenticated ? (
                <Link
                  to="/dashboard"
                  className="px-5 sm:px-6 py-2.5 sm:py-3.5 rounded-xl bg-white hover:bg-stone-100 active:scale-[0.98] text-[#0D1826] font-bold text-xs sm:text-sm flex items-center gap-2 shadow-lg transition-all min-h-[44px]"
                >
                  <span>Go to Dashboard</span>
                  <ArrowRight className="w-4 h-4 text-[#DE4927]" />
                </Link>
              ) : (
                <Link
                  to="/register"
                  className="px-5 sm:px-6 py-2.5 sm:py-3.5 rounded-xl bg-black/60 hover:bg-black/80 active:scale-[0.98] border border-white/25 hover:border-white/50 text-white font-bold text-xs sm:text-sm flex items-center gap-2 backdrop-blur-md transition-all cursor-pointer min-h-[44px]"
                >
                  <span>Get Started</span>
                </Link>
              )}
            </div>

            {/* 3 Circular Feature Highlights matching Reference Left Phone Screen */}
            <div className="pt-3 sm:pt-6 border-t border-white/15">
              <div className="grid grid-cols-3 gap-2 sm:gap-4 max-w-lg">
                
                {/* 1. Multiple Outlets */}
                <div className="flex flex-col items-center text-center space-y-1">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#DE864F] text-white flex items-center justify-center shadow-md shrink-0">
                    <Utensils className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <div className="text-[11px] sm:text-xs font-bold text-white leading-tight">
                    Multiple<br />Outlets
                  </div>
                  <p className="text-[9px] sm:text-[11px] text-stone-300 leading-tight">
                    All your campus favourites in one place.
                  </p>
                </div>

                {/* 2. Easy Ordering */}
                <div className="flex flex-col items-center text-center space-y-1">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#DE864F] text-white flex items-center justify-center shadow-md shrink-0">
                    <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <div className="text-[11px] sm:text-xs font-bold text-white leading-tight">
                    Easy<br />Ordering
                  </div>
                  <p className="text-[9px] sm:text-[11px] text-stone-300 leading-tight">
                    Browse menus and add items to your cart.
                  </p>
                </div>

                {/* 3. Quick Pickup */}
                <div className="flex flex-col items-center text-center space-y-1">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#DE864F] text-white flex items-center justify-center shadow-md shrink-0">
                    <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <div className="text-[11px] sm:text-xs font-bold text-white leading-tight">
                    Quick<br />Pickup
                  </div>
                  <p className="text-[9px] sm:text-[11px] text-stone-300 leading-tight">
                    Order online and pickup without queues.
                  </p>
                </div>

              </div>

              {/* 4 Pagination / Carousel indicator dots matching reference */}
              <div className="flex items-center justify-center gap-1.5 pt-3.5 sm:pt-4">
                <span className="w-4 h-1.5 rounded-full bg-[#DE4927]" />
                <span className="w-1.5 h-1.5 rounded-full bg-white/40" />
                <span className="w-1.5 h-1.5 rounded-full bg-white/40" />
                <span className="w-1.5 h-1.5 rounded-full bg-white/40" />
              </div>

            </div>

          </div>
        </div>

        {/* Organic Wavy Transition to Popular Outlets Section */}
        <div className="w-full overflow-hidden leading-none relative z-10 -mb-1">
          <svg 
            className="relative block w-full h-7 sm:h-11 text-[#FAF7F0] dark:text-[#101713]" 
            viewBox="0 0 1200 120" 
            preserveAspectRatio="none"
          >
            <path d="M0,0 C320,85 880,115 1200,35 L1200,120 L0,120 Z" fill="currentColor"></path>
          </svg>
        </div>

      </section>

      {/* =========================================================================
          POPULAR CAMPUS OUTLETS (Matches Reference Left Phone Screen)
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-4">
        <div className="mb-3.5">
          <h2 
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            className="text-xl sm:text-2xl font-bold text-[#1E232A] dark:text-white tracking-tight"
          >
            Popular Campus Outlets
          </h2>
          <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">
            Explore food outlets available on campus
          </p>
        </div>

        {/* 2-Column Responsive Grid on Mobile / 4 on Tablets & Desktops */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          
          {/* Card 1: College Canteen */}
          <Link
            to="/outlet/canteen"
            className="group bg-white dark:bg-[#19231D] rounded-2xl overflow-hidden border border-stone-200/90 dark:border-stone-800 shadow-2xs hover:shadow-md transition-all flex flex-col cursor-pointer"
          >
            <div className="relative h-24 sm:h-32 overflow-hidden bg-stone-100 dark:bg-stone-800">
              <img
                src="https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=800&auto=format&fit=crop&q=80"
                alt="College Canteen"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                loading="lazy"
              />
            </div>
            <div className="px-3 py-2 bg-white dark:bg-[#1E2922] flex items-center justify-between">
              <span className="text-xs font-bold text-stone-900 dark:text-white truncate">
                College Canteen
              </span>
              <ChevronRight className="w-3.5 h-3.5 text-stone-400 shrink-0 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </Link>

          {/* Card 2: Buddy's Bistro */}
          <Link
            to="/outlet/buddys-bistro"
            className="group bg-white dark:bg-[#19231D] rounded-2xl overflow-hidden border border-stone-200/90 dark:border-stone-800 shadow-2xs hover:shadow-md transition-all flex flex-col cursor-pointer"
          >
            <div className="relative h-24 sm:h-32 overflow-hidden bg-stone-100 dark:bg-stone-800">
              <img
                src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&auto=format&fit=crop&q=80"
                alt="Buddy's Bistro"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                loading="lazy"
              />
            </div>
            <div className="px-3 py-2 bg-white dark:bg-[#1E2922] flex items-center justify-between">
              <span className="text-xs font-bold text-stone-900 dark:text-white truncate">
                Buddy's Bistro
              </span>
              <ChevronRight className="w-3.5 h-3.5 text-stone-400 shrink-0 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </Link>

          {/* Card 3: Nescafe */}
          <Link
            to="/outlet/nescafe"
            className="group bg-white dark:bg-[#19231D] rounded-2xl overflow-hidden border border-stone-200/90 dark:border-stone-800 shadow-2xs hover:shadow-md transition-all flex flex-col cursor-pointer"
          >
            <div className="relative h-24 sm:h-32 overflow-hidden bg-stone-100 dark:bg-stone-800">
              <img
                src="https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=800&auto=format&fit=crop&q=80"
                alt="Nescafe"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                loading="lazy"
              />
            </div>
            <div className="px-3 py-2 bg-white dark:bg-[#1E2922] flex items-center justify-between">
              <span className="text-xs font-bold text-stone-900 dark:text-white truncate">
                Nescafe
              </span>
              <ChevronRight className="w-3.5 h-3.5 text-stone-400 shrink-0 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </Link>

          {/* Card 4: Domino's */}
          <Link
            to="/outlet/dominos"
            className="group bg-white dark:bg-[#19231D] rounded-2xl overflow-hidden border border-stone-200/90 dark:border-stone-800 shadow-2xs hover:shadow-md transition-all flex flex-col cursor-pointer"
          >
            <div className="relative h-24 sm:h-32 overflow-hidden bg-stone-100 dark:bg-stone-800">
              <img
                src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&auto=format&fit=crop&q=80"
                alt="Domino's"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                loading="lazy"
              />
            </div>
            <div className="px-3 py-2 bg-white dark:bg-[#1E2922] flex items-center justify-between">
              <span className="text-xs font-bold text-stone-900 dark:text-white truncate">
                Domino's
              </span>
              <ChevronRight className="w-3.5 h-3.5 text-stone-400 shrink-0 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </Link>

        </div>
      </section>

      {/* =========================================================================
          2. EXPLORE CAMPUS OUTLETS (Requirement 4)
          ========================================================================= */}
      <section id="outlets" className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#E63946] uppercase tracking-wider mb-2">
              <Store className="w-4 h-4" />
              <span>Campus Food Discovery</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-stone-900 dark:text-white tracking-tight">
              Explore Campus Outlets
            </h2>
            <p className="text-stone-500 dark:text-stone-400 text-sm sm:text-base mt-1 max-w-xl">
              Browse all 17 cafeterias, food courts, and kiosks across CGC University. View full menus, dish varieties, and transparent pricing.
            </p>
          </div>

          <div className="text-xs font-semibold text-stone-500 dark:text-stone-400">
            Showing <strong className="text-stone-900 dark:text-white">{filteredOutlets.length}</strong> of {OUTLETS.length} Outlets
          </div>
        </div>

        {/* Search & Category Filter Controls */}
        <div className="space-y-4 mb-8">
          
          {/* Outlet Search Bar */}
          <div className="relative max-w-md">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={outletSearch}
              onChange={(e) => setOutletSearch(e.target.value)}
              placeholder="Search outlets by name, cuisine, or block..."
              className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-white dark:bg-[#19231D] border border-stone-200 dark:border-stone-800 text-xs sm:text-sm text-stone-900 dark:text-white placeholder:text-stone-400 focus:outline-hidden focus:ring-2 focus:ring-[#E63946]/20 focus:border-[#E63946] transition-all shadow-2xs"
            />
            {outletSearch && (
              <button
                onClick={() => setOutletSearch('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 cursor-pointer"
              >
                Clear
              </button>
            )}
          </div>

          {/* Cuisine Category Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {cuisineCategories.map((cat) => {
              const isSelected = selectedCuisine === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCuisine(cat)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#0D1826] text-white shadow-xs dark:bg-stone-100 dark:text-stone-900'
                      : 'bg-white dark:bg-[#19231D] text-stone-600 dark:text-stone-300 border border-stone-200 dark:border-stone-800 hover:bg-stone-50 dark:hover:bg-stone-800'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

        </div>

        {/* Outlets Grid: 17 Outlets Dynamic Display */}
        {filteredOutlets.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
            {filteredOutlets.map((outlet) => {
              const menuCount = (outlet.menu || []).length;
              return (
                <div
                  key={outlet.id}
                  className="bg-white dark:bg-[#19231D] rounded-3xl overflow-hidden border border-stone-200/90 dark:border-stone-800 shadow-2xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between group"
                >
                  <div>
                    {/* Outlet Image Container */}
                    <div className="relative h-48 sm:h-52 overflow-hidden bg-stone-100 dark:bg-stone-800">
                      <img
                        src={outlet.image}
                        alt={outlet.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                      
                      {/* Short Category Tag */}
                      <div className="absolute top-3 left-3">
                        <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-white/95 dark:bg-[#19231D]/95 text-stone-900 dark:text-white backdrop-blur-xs shadow-xs">
                          {outlet.shortCategory || 'Campus Food'}
                        </span>
                      </div>

                      {/* Prep Time / Menu Items Count */}
                      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs font-semibold">
                        <div className="flex items-center gap-1.5 drop-shadow-sm">
                          <Clock className="w-3.5 h-3.5 text-[#F4A261]" />
                          <span>{outlet.prepTime || '10-15 mins'}</span>
                        </div>
                        {menuCount > 0 && (
                          <div className="px-2 py-0.5 rounded-md bg-black/40 backdrop-blur-xs text-[11px]">
                            {menuCount} Dishes Available
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Outlet Details */}
                    <div className="p-5 sm:p-6 space-y-3">
                      <div>
                        <h3 className="text-xl font-black text-stone-900 dark:text-white group-hover:text-[#E63946] transition-colors leading-tight">
                          {outlet.name}
                        </h3>
                        <div className="flex items-center gap-1 text-xs text-stone-500 dark:text-stone-400 mt-1">
                          <MapPin className="w-3.5 h-3.5 text-[#E63946] shrink-0" />
                          <span className="truncate">{outlet.location}</span>
                        </div>
                      </div>

                      {/* Tagline / Specialties */}
                      {outlet.tagline && (
                        <p className="text-xs text-stone-600 dark:text-stone-300 line-clamp-2 leading-relaxed">
                          {outlet.tagline}
                        </p>
                      )}

                      {/* Cuisine Pills */}
                      {outlet.cuisine && outlet.cuisine.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {outlet.cuisine.slice(0, 3).map((item, idx) => (
                            <span
                              key={idx}
                              className="text-[10px] font-medium bg-[#FAF7F0] dark:bg-stone-800 text-stone-600 dark:text-stone-300 px-2 py-0.5 rounded-md border border-stone-200/70 dark:border-stone-700"
                            >
                              {item}
                            </span>
                          ))}
                          {outlet.cuisine.length > 3 && (
                            <span className="text-[10px] font-medium text-stone-400 py-0.5">
                              +{outlet.cuisine.length - 3} more
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Footer Card Action: View Menu */}
                  <div className="p-5 sm:p-6 pt-0">
                    <Link
                      to={`/outlet/${outlet.id}`}
                      className="w-full py-2.5 sm:py-3 rounded-2xl bg-stone-900 hover:bg-[#E63946] dark:bg-stone-800 dark:hover:bg-[#E63946] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-xs cursor-pointer group/btn"
                    >
                      <span>View Menu</span>
                      <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="bg-white dark:bg-[#19231D] rounded-3xl p-12 text-center border border-stone-200 dark:border-stone-800 max-w-md mx-auto">
            <Store className="w-12 h-12 text-stone-300 dark:text-stone-600 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-stone-900 dark:text-white">No outlets found</h3>
            <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
              Try searching for a different outlet name or select "All" categories.
            </p>
            <button
              onClick={() => { setOutletSearch(''); setSelectedCuisine('All'); }}
              className="mt-4 px-4 py-2 rounded-xl bg-stone-900 text-white text-xs font-bold"
            >
              Reset Filters
            </button>
          </div>
        )}

      </section>

      {/* =========================================================================
          3. HOW IT WORKS (Requirement 5)
          ========================================================================= */}
      <section id="how-it-works" className="py-16 sm:py-20 bg-stone-100/70 dark:bg-[#0c120e] border-y border-stone-200/80 dark:border-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#E63946] uppercase tracking-wider mb-2">
              <Compass className="w-4 h-4" />
              <span>Simple 3-Step Process</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-stone-900 dark:text-white tracking-tight">
              How It Works
            </h2>
            <p className="text-stone-500 dark:text-stone-400 text-sm sm:text-base mt-2">
              Three simple steps to order and enjoy your favourite campus food without standing in line.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Step 1: Explore */}
            <div className="bg-white dark:bg-[#19231D] rounded-3xl p-8 border border-stone-200/80 dark:border-stone-800 shadow-2xs relative overflow-hidden group hover:shadow-md transition-all">
              <div className="text-5xl font-black text-stone-100 dark:text-stone-800/80 absolute right-6 top-6 font-mono select-none">
                01
              </div>
              <div className="w-14 h-14 rounded-2xl bg-amber-50 dark:bg-amber-950/30 text-[#EAA044] border border-amber-200/60 dark:border-amber-800/50 flex items-center justify-center mb-6 shadow-xs">
                <Compass className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-black text-stone-900 dark:text-white mb-2">
                1. Explore
              </h3>
              <p className="text-stone-600 dark:text-stone-300 text-sm leading-relaxed">
                Discover campus outlets and browse their menus. Check out what is available across all 17 campus food spots.
              </p>
            </div>

            {/* Step 2: Choose */}
            <div className="bg-white dark:bg-[#19231D] rounded-3xl p-8 border border-stone-200/80 dark:border-stone-800 shadow-2xs relative overflow-hidden group hover:shadow-md transition-all">
              <div className="text-5xl font-black text-stone-100 dark:text-stone-800/80 absolute right-6 top-6 font-mono select-none">
                02
              </div>
              <div className="w-14 h-14 rounded-2xl bg-rose-50 dark:bg-rose-950/30 text-[#E63946] border border-rose-200/60 dark:border-rose-800/50 flex items-center justify-center mb-6 shadow-xs">
                <UtensilsCrossed className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-black text-stone-900 dark:text-white mb-2">
                2. Choose
              </h3>
              <p className="text-stone-600 dark:text-stone-300 text-sm leading-relaxed">
                Select dishes, customize available variants, and add items to your cart. Choose portions and options that suit your appetite.
              </p>
            </div>

            {/* Step 3: Order */}
            <div className="bg-white dark:bg-[#19231D] rounded-3xl p-8 border border-stone-200/80 dark:border-stone-800 shadow-2xs relative overflow-hidden group hover:shadow-md transition-all">
              <div className="text-5xl font-black text-stone-100 dark:text-stone-800/80 absolute right-6 top-6 font-mono select-none">
                03
              </div>
              <div className="w-14 h-14 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 border border-emerald-200/60 dark:border-emerald-800/50 flex items-center justify-center mb-6 shadow-xs">
                <ShoppingBag className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-black text-stone-900 dark:text-white mb-2">
                3. Order
              </h3>
              <p className="text-stone-600 dark:text-stone-300 text-sm leading-relaxed">
                Review your cart and complete the available checkout process. Get your digital pickup token to collect hot food at the counter.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* =========================================================================
          4. WHY CAMPUS CRAVINGS? (Requirement 6)
          ========================================================================= */}
      <section id="why-us" className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#E63946] uppercase tracking-wider mb-2">
            <ShieldCheck className="w-4 h-4" />
            <span>Platform Benefits</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-stone-900 dark:text-white tracking-tight">
            Why Campus Cravings?
          </h2>
          <p className="text-stone-500 dark:text-stone-400 text-sm sm:text-base mt-2">
            Practical dining conveniences designed specifically around student life at CGC University, Mohali.
          </p>
        </div>

        {/* 5 Existing Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          
          {/* Benefit 1 */}
          <div className="bg-white dark:bg-[#19231D] rounded-3xl p-6 sm:p-7 border border-stone-200/80 dark:border-stone-800 shadow-2xs space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 flex items-center justify-center">
              <Store className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-black text-stone-900 dark:text-white">
              Multiple Campus Outlets in One Place
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
              Access all 17 university cafeterias, kiosks, canteens, and food courts from a single unified website without walking between blocks just to see what is cooking.
            </p>
          </div>

          {/* Benefit 2 */}
          <div className="bg-white dark:bg-[#19231D] rounded-3xl p-6 sm:p-7 border border-stone-200/80 dark:border-stone-800 shadow-2xs space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 dark:bg-amber-950/40 text-[#EAA044] flex items-center justify-center">
              <Layers className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-black text-stone-900 dark:text-white">
              Easy Menu Browsing
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
              Explore categorized menus with authentic dish photographs, detailed descriptions, and cuisine tags so you always know what you are ordering.
            </p>
          </div>

          {/* Benefit 3 */}
          <div className="bg-white dark:bg-[#19231D] rounded-3xl p-6 sm:p-7 border border-stone-200/80 dark:border-stone-800 shadow-2xs space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-rose-50 dark:bg-rose-950/40 text-[#E63946] flex items-center justify-center">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-black text-stone-900 dark:text-white">
              Convenient Online Ordering
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
              Select dishes from your phone or laptop between classes and send your order straight to the kitchen counter to skip long waiting lines.
            </p>
          </div>

          {/* Benefit 4 */}
          <div className="bg-white dark:bg-[#19231D] rounded-3xl p-6 sm:p-7 border border-stone-200/80 dark:border-stone-800 shadow-2xs space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-950/40 text-blue-600 flex items-center justify-center">
              <Tag className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-black text-stone-900 dark:text-white">
              Clear Item Prices & Available Variants
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
              Check authentic prices upfront. Customise sizes, toppings, and portion options transparently with zero hidden surcharges or surprise fees.
            </p>
          </div>

          {/* Benefit 5 */}
          <div className="bg-white dark:bg-[#19231D] rounded-3xl p-6 sm:p-7 border border-stone-200/80 dark:border-stone-800 shadow-2xs space-y-3 md:col-span-2 lg:col-span-2">
            <div className="w-12 h-12 rounded-2xl bg-purple-50 dark:bg-purple-950/40 text-purple-600 flex items-center justify-center">
              <Clock className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-black text-stone-900 dark:text-white">
              Convenient Pickup & Order Tracking
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
              Receive a digital pickup token immediately after placing your order. Check preparation progress and present your token at the counter for quick collection during short lecture breaks.
            </p>
          </div>

        </div>

      </section>

      {/* =========================================================================
          5. ABOUT CAMPUS CRAVINGS (Requirement 7)
          ========================================================================= */}
      <section id="about" className="py-16 sm:py-20 bg-white dark:bg-[#141d17] border-y border-stone-200/80 dark:border-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            
            {/* Left: Brand Mascot & Identity Visual */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative">
                <div className="w-64 h-64 sm:w-72 sm:h-72 rounded-3xl bg-[#FAF7F0] dark:bg-[#19231D] border border-stone-200 dark:border-stone-700/60 p-6 flex items-center justify-center shadow-xl">
                  <img
                    src="/images/brand/logo.png"
                    alt="Campus Cravings Official Logo"
                    className="w-full h-full object-contain"
                  />
                </div>
                {/* Decorative floating badge */}
                <div className="absolute -bottom-4 -right-4 bg-[#0D1826] text-white px-4 py-2 rounded-2xl shadow-lg border border-white/20 text-xs font-bold flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#F4A261]" />
                  <span>CGC University, Mohali</span>
                </div>
              </div>
            </div>

            {/* Right: Natural, Professional Copy from Requirement 7 */}
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#E63946] uppercase tracking-wider">
                <Award className="w-4 h-4" />
                <span>Our Campus Mission</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-black text-stone-900 dark:text-white tracking-tight leading-tight">
                About Campus Cravings
              </h2>

              <p className="text-stone-600 dark:text-stone-300 text-sm sm:text-base leading-relaxed">
                Campus Cravings is a campus-focused food discovery and ordering platform designed to make ordering from campus outlets easier for students at CGC University, Mohali.
              </p>

              <p className="text-stone-600 dark:text-stone-300 text-sm sm:text-base leading-relaxed">
                Between packed lecture schedules, laboratory sessions, and 15-minute intervals, standing in long cafeteria queues often consumes valuable break time. Campus Cravings brings all 17 on-campus eateries into one digital hub—connecting students with popular cafes, traditional canteens, food courts, and quick-bite kiosks.
              </p>

              <div className="pt-2 grid grid-cols-2 sm:grid-cols-3 gap-4 border-t border-stone-100 dark:border-stone-800">
                <div>
                  <div className="text-2xl font-black text-[#0D1826] dark:text-white">17</div>
                  <div className="text-xs text-stone-500 dark:text-stone-400">Campus Outlets</div>
                </div>
                <div>
                  <div className="text-2xl font-black text-[#E63946]">100%</div>
                  <div className="text-xs text-stone-500 dark:text-stone-400">Digital Menus</div>
                </div>
                <div>
                  <div className="text-2xl font-black text-[#F4A261]">Direct</div>
                  <div className="text-xs text-stone-500 dark:text-stone-400">Counter Pickup</div>
                </div>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* =========================================================================
          6. FINAL CALL TO ACTION (Requirement 8)
          ========================================================================= */}
      <section className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#0D1826] via-[#122238] to-[#162544] text-white p-8 sm:p-12 lg:p-16 shadow-2xl border border-white/10">
          
          {/* Ambient Glow Accents */}
          <div className="absolute right-0 top-0 w-96 h-96 bg-[#E63946]/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute left-10 bottom-0 w-80 h-80 bg-[#F4A261]/15 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-2xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-amber-200 text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Campus Dining Made Simple</span>
            </div>

            {/* Exact Headline from Requirement 8 */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
              Ready to Satisfy Your Cravings?
            </h2>

            <p className="text-stone-200 text-sm sm:text-base leading-relaxed">
              Explore menus from all 17 campus food outlets or create your student account to start ordering your meals for fast counter collection.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              <button
                type="button"
                onClick={() => scrollTo('outlets')}
                className="px-7 sm:px-8 py-3.5 rounded-full bg-white text-[#0D1826] hover:bg-stone-100 font-extrabold text-sm sm:text-base flex items-center gap-2 shadow-lg transition-all cursor-pointer"
              >
                <Store className="w-4 h-4 text-[#E63946]" />
                <span>Explore Outlets</span>
              </button>

              {isAuthenticated ? (
                <Link
                  to="/dashboard"
                  className="px-7 sm:px-8 py-3.5 rounded-full bg-[#E63946] hover:bg-[#d5323f] text-white font-extrabold text-sm sm:text-base flex items-center gap-2 shadow-lg transition-all"
                >
                  <span>Go to Dashboard</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              ) : (
                <Link
                  to="/register"
                  className="px-7 sm:px-8 py-3.5 rounded-full bg-[#E63946] hover:bg-[#d5323f] text-white font-extrabold text-sm sm:text-base flex items-center gap-2 shadow-lg shadow-red-950/40 transition-all cursor-pointer"
                >
                  <span>Get Started</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              )}
            </div>
          </div>

          {/* Right Mascot Illustration Emblem */}
          <div className="hidden lg:block absolute right-12 bottom-8 w-56 h-56 rounded-3xl bg-white/95 p-3 shadow-2xl border border-white/30 rotate-3 pointer-events-none">
            <img
              src="/images/brand/logo-icon.png"
              alt="Campus Cravings mascot"
              className="w-full h-full object-contain"
            />
          </div>

        </div>
      </section>

      {/* =========================================================================
          7. CONTACT SECTION (Requirement 2 & 8)
          ========================================================================= */}
      <section id="contact" className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-stone-200/80 dark:border-stone-800">
        <div className="bg-white dark:bg-[#19231D] rounded-3xl p-6 sm:p-8 border border-stone-200/90 dark:border-stone-800 shadow-2xs">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs sm:text-sm">
            
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <div className="font-bold text-stone-900 dark:text-white">Campus Location</div>
                <div className="text-stone-500 dark:text-stone-400 mt-0.5">
                  CGC University Campus, Sector 112 / Landran, Mohali, Punjab 140307
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-[#EAA044] flex items-center justify-center shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <div className="font-bold text-stone-900 dark:text-white">Operating Hours</div>
                <div className="text-stone-500 dark:text-stone-400 mt-0.5">
                  Campus Outlets: 8:00 AM – 9:30 PM (Demo Operating Hours)
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-rose-50 dark:bg-rose-950/40 text-[#E63946] flex items-center justify-center shrink-0">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <div className="font-bold text-stone-900 dark:text-white">Student Dining Support</div>
                <div className="text-stone-500 dark:text-stone-400 mt-0.5">
                  support.campuscravings@cgc.edu.in
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
