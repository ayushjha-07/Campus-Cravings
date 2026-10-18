import React, { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { OUTLETS } from '../data/outlets';
import { useMenu } from '../context/MenuContext';
import FoodItemDetailModal from '../components/FoodItemDetailModal';
import OutletEmblem from '../components/OutletEmblem';
import { useCart } from '../context/CartContext';
import { 
  Star, 
  Clock, 
  MapPin, 
  ChevronLeft, 
  Search, 
  ShoppingBag, 
  Info, 
  CheckCircle2,
  AlertCircle,
  Plus,
  Minus,
  Heart,
  Eye,
  Utensils,
  ArrowRight,
  ChefHat,
  Sparkles,
  Store,
  Tag
} from 'lucide-react';

export default function OutletMenuPage() {
  const { id } = useParams();
  const { itemCount, subtotal, addToCart, updateQuantity, getItemQuantity, isFavorite, toggleFavorite } = useCart();
  const { getOutlet } = useMenu();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [activeModalItem, setActiveModalItem] = useState(null);

  // Find outlet with live menu
  const outlet = getOutlet ? getOutlet(id) : OUTLETS.find(o => o.id === id);

  // Categories dynamically extracted from this outlet's menu
  const outletCategories = useMemo(() => {
    if (!outlet) return ['all'];
    const cats = new Set((outlet.menu || []).map(item => item.category));
    return ['all', ...Array.from(cats)];
  }, [outlet]);

  // Filtered menu items
  const filteredMenu = useMemo(() => {
    if (!outlet) return [];
    return (outlet.menu || []).filter(item => {
      const matchesCategory = selectedCategory === 'all' || item.category.toLowerCase() === selectedCategory.toLowerCase();
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch = !q || (
        item.name.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q)
      );
      return matchesCategory && matchesSearch;
    });
  }, [outlet, selectedCategory, searchQuery]);

  if (!outlet) {
    return (
      <div className="min-h-[75vh] flex flex-col items-center justify-center px-4 py-16 text-center max-w-md mx-auto">
        <div className="w-16 h-16 rounded-3xl bg-amber-50 text-amber-700 flex items-center justify-center mb-4">
          <AlertCircle className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-black text-stone-900 mb-2">Campus Outlet Not Found</h2>
        <p className="text-stone-500 text-sm mb-6 leading-relaxed">
          The requested campus food outlet could not be found. Please return to the homepage to browse all 17 CGC Mohali outlets.
        </p>
        <Link
          to="/"
          className="px-6 py-3 rounded-2xl bg-[#0D3828] text-white font-bold text-xs hover:bg-[#144834] transition-colors shadow-sm"
        >
          Return to Campus Home
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FBF8F2] pb-24">
      
      {/* 1. Header Banner & Cover Image */}
      <div className="bg-[#0D3828] text-white relative overflow-hidden">
        {/* Blurred Cover Photo */}
        <div className="absolute inset-0 opacity-25">
          <img
            src={outlet.image}
            alt={
              outlet.id === 'sip-n-bites' || outlet.name === 'Sip N Bites'
                ? 'Sip N Bites outlet storefront'
                : outlet.id === 'yum-experts' || outlet.name === 'Yum Experts'
                ? 'Yum Experts outlet storefront'
                : outlet.name
            }
            className={`w-full h-full object-cover ${outlet.id === 'sip-n-bites' ? 'object-[center_30%]' : ''}`}
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B3426] via-[#0D3828]/80 to-transparent" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-10 sm:pb-14">
          {/* Back Navigation Button */}
          <Link
            to="/#outlets"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-stone-200 hover:text-white bg-black/40 hover:bg-black/60 px-3.5 py-1.5 rounded-xl backdrop-blur-md mb-6 transition-colors shadow-xs"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Back to All Outlets</span>
          </Link>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            {/* Left: Outlet Logo & Information */}
            <div className="md:col-span-8 flex flex-col sm:flex-row items-start sm:items-center gap-5">
              <div className="shrink-0 p-1 bg-white rounded-3xl shadow-lg shadow-black/30">
                <OutletEmblem outlet={outlet} />
              </div>

              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[11px] font-bold text-emerald-300 bg-emerald-950/80 border border-emerald-500/40 px-2.5 py-0.5 rounded-full uppercase">
                    {outlet.shortCategory || 'Campus Outlet'}
                  </span>
                  {outlet.isVegOnly && (
                    <span className="text-[11px] font-bold text-emerald-300 bg-emerald-950/80 border border-emerald-500/40 px-2.5 py-0.5 rounded-full uppercase">
                      Pure Veg
                    </span>
                  )}
                  <span className="text-[11px] text-stone-300 bg-white/10 px-2.5 py-0.5 rounded-full">
                    CGC Mohali
                  </span>
                </div>

                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
                  {outlet.name}
                </h1>

                <p className="text-stone-300 text-xs sm:text-sm max-w-xl leading-relaxed">
                  {outlet.tagline}
                </p>

                {/* Location, Prep Time & Rating Badges */}
                <div className="flex flex-wrap items-center gap-3 text-xs text-stone-300 pt-1">
                  {outlet.location && (
                    <div className="flex items-center gap-1.5 bg-white/10 backdrop-blur-md px-3 py-1 rounded-xl">
                      <MapPin className="w-3.5 h-3.5 text-emerald-300" />
                      <span>{outlet.location}</span>
                    </div>
                  )}
                  {outlet.prepTime && (
                    <div className="flex items-center gap-1.5 bg-white/10 backdrop-blur-md px-3 py-1 rounded-xl">
                      <Clock className="w-3.5 h-3.5 text-amber-300" />
                      <span>Prep: {outlet.prepTime}</span>
                    </div>
                  )}
                  {outlet.rating && (
                    <div className="flex items-center gap-1 bg-white/10 backdrop-blur-md px-3 py-1 rounded-xl">
                      <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                      <span className="font-bold text-white">{outlet.rating}</span>
                      {outlet.reviewsCount && <span className="text-stone-400">({outlet.reviewsCount})</span>}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Right: Operational Details Card & Authentic Storefront Photo */}
            <div className="md:col-span-4 bg-white/10 backdrop-blur-md border border-white/15 p-4 sm:p-5 rounded-3xl space-y-3 text-xs text-stone-200">
              {/* Authentic Outlet Storefront Photo Showcase */}
              <div className={`relative w-full rounded-2xl overflow-hidden border border-white/20 shadow-md bg-black/20 group ${
                outlet.id === 'sip-n-bites' ? 'h-[250px] sm:h-[280px] lg:h-[380px]' : 'aspect-16/10'
              }`}>
                <img
                  src={outlet.image}
                  alt={
                    outlet.id === 'sip-n-bites' || outlet.name === 'Sip N Bites'
                      ? 'Sip N Bites outlet storefront'
                      : outlet.id === 'yum-experts' || outlet.name === 'Yum Experts'
                      ? 'Yum Experts outlet storefront'
                      : `${outlet.name} storefront`
                  }
                  className={`w-full h-full object-cover group-hover:scale-102 transition-transform duration-500 ${
                    outlet.id === 'sip-n-bites' ? 'object-[center_30%]' : 'object-center'
                  }`}
                />
                <div className="absolute bottom-2 left-2 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-black/60 backdrop-blur-md text-white border border-white/20 flex items-center gap-1.5 shadow-xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                  <span>{outlet.id === 'sip-n-bites' || outlet.id === 'yum-experts' ? 'Official Outlet Storefront' : 'Storefront Photo'}</span>
                </div>
              </div>

              {outlet.timing ? (
                <div className="flex justify-between items-center pb-2 border-b border-white/10">
                  <span className="text-stone-300">Campus Hours</span>
                  <span className="font-semibold text-emerald-300">{outlet.timing}</span>
                </div>
              ) : (
                <div className="flex justify-between items-center pb-2 border-b border-white/10">
                  <span className="text-stone-300">Campus Dining</span>
                  <span className="font-semibold text-emerald-300">CGC University, Mohali</span>
                </div>
              )}
              {outlet.priceForTwo && (
                <div className="flex justify-between items-center pb-2 border-b border-white/10">
                  <span className="text-stone-300">Average Spend</span>
                  <span className="font-bold text-white">{outlet.priceForTwo} for two</span>
                </div>
              )}
              <div className="flex items-center gap-2 text-[11px] text-stone-300 pt-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Order online & collect at counter with digital token</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Menu Section: Either Friendly Empty Menu State or Active Menu List */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {(!outlet.menu || outlet.menu.length === 0) ? (
          /* Dedicated Friendly Empty Menu State for Outlets With Upcoming Menus */
          <div className="bg-white dark:bg-[#19231D] rounded-3xl p-8 sm:p-14 text-center border border-stone-200/90 dark:border-[#2A382F] shadow-xs my-6 max-w-2xl mx-auto">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-3xl bg-amber-50 dark:bg-amber-950/30 text-amber-700 dark:text-amber-400 border border-amber-200/70 dark:border-amber-700/40 flex items-center justify-center mx-auto mb-5 shadow-inner">
              <ChefHat className="w-8 h-8 sm:w-10 sm:h-10 stroke-[1.75]" />
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100/70 dark:bg-amber-950/50 text-amber-900 dark:text-amber-300 text-xs font-bold mb-3 border border-amber-300/40">
              <Sparkles className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
              <span>Menu Coming Soon</span>
            </div>

            <h3 className="text-xl sm:text-2xl font-black text-stone-900 dark:text-[#F5F7F4] tracking-tight mb-3">
              {outlet.name} Menu is on the Way!
            </h3>

            <p className="text-stone-500 dark:text-[#B8C5BB] text-xs sm:text-sm max-w-md mx-auto mb-8 leading-relaxed">
              The counter menu and student prices for <strong>{outlet.name}</strong> will be available soon. In the meantime, explore delicious meals and quick snacks from our other campus food outlets.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                to="/#outlets"
                className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-[#0D3828] hover:bg-[#144834] text-white font-bold text-xs sm:text-sm shadow-md shadow-emerald-950/10 hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Store className="w-4 h-4" />
                <span>Explore Other Campus Outlets</span>
              </Link>
              <Link
                to="/"
                className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-stone-100 hover:bg-stone-200 dark:bg-[#222E26] dark:hover:bg-[#2A382F] text-stone-800 dark:text-stone-200 font-bold text-xs sm:text-sm transition-colors flex items-center justify-center"
              >
                <span>Back to Homepage</span>
              </Link>
            </div>
          </div>
        ) : (
          <>
            {/* Outlet Menu Notice */}
            <div className="mb-6 py-2.5 px-4 rounded-2xl bg-amber-50/90 border border-amber-200/80 text-amber-900 text-xs flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <Info className="w-4 h-4 text-amber-700 shrink-0" />
                <span>
                  {outlet.id === 'dockyard-le-bistro' ? (
                    <><strong>Official Bistro Counter Menu:</strong> Full verified items, prices & categories for Dockyard Le Bistro at CGC Mohali.</>
                  ) : outlet.id === 'canteen' ? (
                    <><strong>Official College Canteen Menu:</strong> Full verified items, prices & categories from the central university canteen board.</>
                  ) : outlet.id === 'buddys-bistro' ? (
                    <><strong>Official Buddy's Bistro Menu:</strong> Full verified items, prices & portion sizes from the original physical menu boards.</>
                  ) : outlet.id === 'dominos' ? (
                    <><strong>Official Domino's Menu:</strong> Full verified pizzas, garlic breads, sides, beverages & desserts from the campus food truck board.</>
                  ) : outlet.id === 'thick-let-to' ? (
                    <><strong>Official Thick & Letto Menu:</strong> Full verified exotic fruit thick shakes, cold coffees, cheesecake shakes & extras from the vendor menu board.</>
                  ) : outlet.id === 'chutar-putar' ? (
                    <><strong>Official Chutar Putar Menu:</strong> Full verified sandwiches, burgers, wraps, momos, fries, chaats, warm chais & shakes from the counter menu board.</>
                  ) : outlet.id === 'applebeez' ? (
                    <><strong>Official Apple Beez Menu:</strong> Full verified noodles, fast foods, pastas, bhaturas, burgers, shakes, pastries & main courses from the vendor menu boards.</>
                  ) : outlet.id === 'nescafe' ? (
                    <><strong>Official Nescafe Kiosk Menu:</strong> Full verified Maggi varieties, pizzas, sweet corn, coffees, teas, coolers & frappes from the campus kiosk board.</>
                  ) : outlet.id === 'easy-day' ? (
                    <><strong>Official Mini Easy Day Menu:</strong> Full verified burgers, pastas, fries, mini meals, shakes, drinks, sandwiches & crispy patties from the store menu board.</>
                  ) : outlet.id === 'rock-n-roll' ? (
                    <><strong>Official Rock N Roll Menu:</strong> Full verified kathi rolls (egg, veg & chicken), fried rice, noodles & cold drinks from the vendor physical menu board.</>
                  ) : outlet.id === 'topn-n-town-for-hunger' ? (
                    <><strong>Official Top N' Town Menu:</strong> Full verified burgers, sandwiches, momos, fried rice, chowmein, thupka, pastas & Korean specials from the physical menu boards.</>
                  ) : outlet.id === 'x-burgers' ? (
                    <><strong>Official X Burgers Café Menu:</strong> Full verified burgers, Biggie combos, wraps, loaded fries, spring rolls, momos, shakes & cold coffees from the vendor menu boards.</>
                  ) : outlet.id === 'kulhad' ? (
                    <><strong>Official Kulhad Menu:</strong> Full verified earthen kulhad chais, pizzas, maggi, burgers, wraps, lassi, shakes & cookies from the vendor menu board.</>
                  ) : outlet.id === 'yum-experts' ? (
                    <><strong>Official Yum Experts Menu:</strong> Full verified mocktails, smoothies, fresh juices, chaats, burgers, wraps, pasta, Chinese wok dishes, rice bowls & combos from the vendor menu board.</>
                  ) : outlet.id === 'sip-n-bites' ? (
                    <><strong>Official Sip N Bites Menu:</strong> Full verified thick shakes, ice cream shakes, biscuit shakes, fresh juices, burgers, momos, pastas, noodles, rolls & combos from the original menu boards.</>
                  ) : outlet.id === 'food-court' ? (
                    <><strong>Official Food Court Menu:</strong> Full verified breakfast, sandwiches, burgers, pizzas, pastas, noodles, thalis, snacks, momos, Chinese & beverages from the central food court board.</>
                  ) : outlet.id === 'tuckshop' ? (
                    <><strong>Official Tuckshop Catalogue:</strong> Full verified stationery, printing & xerox services, computer accessories, gifts & daily essentials from the campus shop board.</>
                  ) : (
                    <><strong>Sample Outlet Menu:</strong> Representative items & prices for development. Real menus will be loaded per outlet.</>
                  )}
                </span>
              </div>
              <span className="hidden sm:inline font-bold text-amber-800">
                {outlet.menu.length} Items Listed
              </span>
            </div>

            {/* Happy Offers Section (e.g. Dockyard Le Bistro deals) */}
            {outlet.offers && outlet.offers.length > 0 && (
              <div className="mb-8 p-4 sm:p-6 rounded-3xl bg-gradient-to-br from-amber-500/10 via-orange-500/5 to-transparent border border-amber-300/40 dark:border-amber-700/40 backdrop-blur-xs">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-xl bg-amber-500 text-white flex items-center justify-center shadow-xs">
                      <Sparkles className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="font-extrabold text-sm sm:text-base text-stone-900 dark:text-[#F5F7F4] flex items-center gap-2">
                        <span>Happy Offers & Bistro Deals</span>
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-800 dark:text-amber-300 border border-amber-400/40">
                          Special Deals
                        </span>
                      </h3>
                      <p className="text-[11px] sm:text-xs text-stone-500 dark:text-[#B8C5BB]">
                        Order at counter or select from menu below to claim these campus specials
                      </p>
                    </div>
                  </div>
                  <span className="text-[11px] text-amber-700 dark:text-amber-300 font-medium">
                    Valid for CGC University students
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  {outlet.offers.map((offer) => (
                    <div
                      key={offer.id}
                      onClick={() => {
                        if (offer.targetCategory) {
                          setSelectedCategory(offer.targetCategory);
                          const el = document.getElementById('outlet-menu-search');
                          if (el) el.scrollIntoView({ behavior: 'smooth' });
                        }
                      }}
                      className="group p-3.5 rounded-2xl bg-white/90 dark:bg-[#19231D]/90 border border-stone-200/90 dark:border-[#2A382F] hover:border-amber-400 dark:hover:border-amber-600 shadow-2xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-1.5">
                          <span className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full border ${offer.tagColor || 'bg-amber-100 text-amber-800 border-amber-200'}`}>
                            {offer.badge}
                          </span>
                          <Tag className="w-3.5 h-3.5 text-amber-500" />
                        </div>
                        <h4 className="font-black text-xs sm:text-sm text-stone-900 dark:text-[#F5F7F4] group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                          {offer.title}
                        </h4>
                        <p className="text-[11px] text-stone-600 dark:text-stone-300 mt-1 leading-snug">
                          {offer.deal}
                        </p>
                      </div>

                      <div className="mt-3 pt-2 border-t border-stone-100 dark:border-stone-800/80 flex items-center justify-between text-[11px] font-bold text-amber-700 dark:text-amber-400">
                        <span>Browse Items</span>
                        <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Search Bar & Category Tabs Row */}
            <div id="outlet-menu-search" className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-8">
              {/* Menu Search */}
              <div className="relative flex-1 max-w-md">
                <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={`Search in ${outlet.name} menu...`}
                  className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-white border border-stone-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#0D3828]/20 focus:border-[#0D3828] shadow-2xs font-normal"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700 text-xs"
                  >
                    Clear
                  </button>
                )}
              </div>

              {/* Menu Category Tabs */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none no-scrollbar">
                {outletCategories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap capitalize transition-all cursor-pointer ${
                      selectedCategory.toLowerCase() === cat.toLowerCase()
                        ? 'bg-[#0D3828] text-white shadow-xs'
                        : 'bg-white border border-stone-200 text-stone-700 hover:bg-stone-50'
                    }`}
                  >
                    {cat === 'all' ? 'All Items' : cat}
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Food Card Grid (2-column on mobile, responsive up to 4 cols) */}
            {filteredMenu.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
                {filteredMenu.map(food => {
                  const quantity = getItemQuantity(food.id);
                  const favorited = isFavorite ? isFavorite(food.id) : false;
                  const isAvailable = food.isAvailable !== false;

                  return (
                    <div
                      key={food.id}
                      onClick={() => setActiveModalItem(food)}
                      className="group bg-white dark:bg-[#19231D] rounded-2xl sm:rounded-3xl border border-stone-200/90 dark:border-[#2A382F] overflow-hidden shadow-2xs hover:shadow-lg hover:border-stone-300 dark:hover:border-[#2A382F] hover:-translate-y-0.5 transition-all duration-300 flex flex-col justify-between cursor-pointer"
                    >
                      <div>
                        {/* Food Photo with Overlay Badges */}
                        <div className="relative aspect-4/3 w-full overflow-hidden bg-stone-100 dark:bg-[#222E26]">
                          <img
                            src={food.image}
                            alt={food.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                            loading="lazy"
                          />

                          {/* Veg / Non-Veg Indicator */}
                          <div className="absolute top-2 left-2 sm:top-3 sm:left-3 bg-white/95 dark:bg-stone-900/90 backdrop-blur-md p-1 sm:p-1.5 rounded-md sm:rounded-lg shadow-xs flex items-center justify-center">
                            <span
                              className={`w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 border flex items-center justify-center rounded-2xs ${
                                food.isVeg ? 'border-emerald-600' : 'border-rose-600'
                              }`}
                            >
                              <span
                                className={`w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full ${
                                  food.isVeg ? 'bg-emerald-600' : 'bg-rose-600'
                                }`}
                              />
                            </span>
                          </div>

                          {/* Favourite Heart Button */}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              if (toggleFavorite) toggleFavorite(food.id);
                            }}
                            className="absolute top-2 right-2 sm:top-3 sm:right-3 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-black/30 backdrop-blur-md hover:bg-black/50 text-white flex items-center justify-center transition-all cursor-pointer z-10"
                            aria-label="Toggle favourite"
                          >
                            <Heart
                              className={`w-3.5 h-3.5 sm:w-4 sm:h-4 transition-colors ${
                                favorited ? 'text-rose-500 fill-rose-500' : 'text-white'
                              }`}
                            />
                          </button>

                          {/* Availability status badge */}
                          {!isAvailable && (
                            <div className="absolute inset-0 bg-black/60 backdrop-blur-2xs flex items-center justify-center">
                              <span className="bg-rose-600 text-white text-[10px] sm:text-xs font-bold px-2 py-0.5 sm:px-3 sm:py-1 rounded-full shadow-md">
                                Sold Out
                              </span>
                            </div>
                          )}

                          {/* View Details hint on hover */}
                          <div className="absolute bottom-2.5 right-2.5 opacity-0 group-hover:opacity-100 transition-opacity bg-black/60 backdrop-blur-md text-white text-[10px] sm:text-[11px] font-semibold px-2 py-0.5 rounded-lg hidden sm:flex items-center gap-1">
                            <Eye className="w-3.5 h-3.5" />
                            <span>Details</span>
                          </div>
                        </div>

                        {/* Food Info */}
                        <div className="p-2.5 sm:p-4 pb-1 sm:pb-2">
                          <div className="flex items-center justify-between gap-1 mb-0.5 sm:mb-1">
                            <h4 className="font-extrabold text-stone-900 dark:text-[#F5F7F4] text-xs sm:text-base leading-snug group-hover:text-[#0D3828] dark:group-hover:text-[#52D8A4] transition-colors truncate">
                              {food.name}
                            </h4>
                          </div>

                          <p className="text-[11px] sm:text-xs text-stone-500 dark:text-[#B8C5BB] line-clamp-1 sm:line-clamp-2 leading-relaxed mb-1 sm:mb-3 hidden sm:block">
                            {food.description}
                          </p>
                        </div>
                      </div>

                      {/* Price & Add to Cart Controls */}
                      <div className="p-2.5 sm:p-4 pt-1 flex items-center justify-between border-t border-stone-100 dark:border-[#2A382F]">
                        <div className="flex items-baseline gap-1">
                          {food.variants && food.variants.length > 0 ? (
                            <span className="text-xs sm:text-base font-black text-stone-900 dark:text-[#F5F7F4]">
                              ₹{food.variants[0].price} - ₹{food.variants[food.variants.length - 1].price}
                            </span>
                          ) : (
                            <span className="text-xs sm:text-lg font-black text-stone-900 dark:text-[#F5F7F4]">
                              ₹{food.price}
                            </span>
                          )}
                        </div>

                        {isAvailable ? (
                          food.variants && food.variants.length > 0 ? (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setActiveModalItem(food);
                              }}
                              className="flex items-center gap-1 px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-lg sm:rounded-xl bg-[#0D3828] hover:bg-[#144834] text-white text-[11px] sm:text-xs font-bold transition-all active:scale-95 shadow-2xs cursor-pointer"
                            >
                              <span>Options</span>
                              <Plus className="w-3 h-3 sm:w-3.5 sm:h-3.5 stroke-[2.5]" />
                            </button>
                          ) : quantity === 0 ? (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                addToCart(food, outlet, 1);
                              }}
                              className="flex items-center gap-1 px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-lg sm:rounded-xl bg-[#0D3828] hover:bg-[#144834] text-white text-[11px] sm:text-xs font-bold transition-all active:scale-95 shadow-2xs cursor-pointer"
                            >
                              <span>Add</span>
                              <Plus className="w-3 h-3 sm:w-3.5 sm:h-3.5 stroke-[2.5]" />
                            </button>
                          ) : (
                            <div 
                              onClick={(e) => e.stopPropagation()}
                              className="flex items-center gap-1 bg-emerald-50 dark:bg-[#1A3326] border border-emerald-200/90 dark:border-emerald-800 rounded-lg sm:rounded-xl p-0.5 sm:p-1"
                            >
                              <button
                                onClick={() => updateQuantity(food.id, quantity - 1)}
                                className="w-5 h-5 sm:w-6 sm:h-6 rounded-md sm:rounded-lg bg-white dark:bg-[#222E26] text-[#0D3828] dark:text-[#52D8A4] hover:bg-emerald-100 flex items-center justify-center font-bold text-xs shadow-2xs transition-colors cursor-pointer"
                                aria-label="Decrease quantity"
                              >
                                <Minus className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                              </button>
                              <span className="w-4 sm:w-5 text-center text-[11px] sm:text-xs font-bold text-[#0D3828] dark:text-[#52D8A4]">
                                {quantity}
                              </span>
                              <button
                                onClick={() => updateQuantity(food.id, quantity + 1)}
                                className="w-5 h-5 sm:w-6 sm:h-6 rounded-md sm:rounded-lg bg-[#0D3828] text-white hover:bg-[#144834] flex items-center justify-center font-bold text-xs shadow-2xs transition-colors cursor-pointer"
                                aria-label="Increase quantity"
                              >
                                <Plus className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                              </button>
                            </div>
                          )
                        ) : (
                          <span className="text-[10px] sm:text-xs font-semibold text-rose-600 bg-rose-50 dark:bg-rose-950/30 px-2 py-0.5 rounded-lg sm:rounded-xl">
                            Sold Out
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              /* Empty State when search or category filter yields no items */
              <div className="bg-white rounded-3xl p-12 text-center border border-stone-200/90 shadow-2xs my-4">
                <Utensils className="w-12 h-12 text-stone-300 mx-auto mb-3" />
                <h3 className="text-lg font-bold text-stone-800 mb-1">
                  No menu items found in {outlet.name}
                </h3>
                <p className="text-stone-500 text-xs sm:text-sm max-w-sm mx-auto mb-6 leading-relaxed">
                  We couldn't find any items matching "{searchQuery}" in the selected category.
                </p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('all');
                  }}
                  className="px-5 py-2.5 rounded-xl bg-[#0D3828] text-white text-xs font-bold hover:bg-[#144834] transition-colors cursor-pointer shadow-sm"
                >
                  Reset Search & Show All Items
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {/* 4. Food Item Detail Modal */}
      <FoodItemDetailModal
        item={activeModalItem}
        outlet={outlet}
        isOpen={Boolean(activeModalItem)}
        onClose={() => setActiveModalItem(null)}
      />

      {/* 5. Sticky Mini Cart Floating Bar if cart has items */}
      {itemCount > 0 && (
        <div className="fixed bottom-16 md:bottom-6 left-4 right-4 max-w-xl mx-auto z-40 animate-in slide-in-from-bottom-4 duration-300">
          <div className="bg-[#0D3828] text-white p-3.5 sm:p-4 rounded-2xl shadow-2xl border border-emerald-700/60 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center font-black text-sm">
                {itemCount}
              </div>
              <div>
                <div className="text-[11px] text-emerald-200">Cart Total (Subtotal)</div>
                <div className="text-base font-black text-white">₹{subtotal}</div>
              </div>
            </div>

            <Link
              to="/cart"
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white text-[#0D3828] hover:bg-emerald-50 text-xs sm:text-sm font-extrabold shadow-sm transition-colors"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Review Cart</span>
              <ArrowRight className="w-3.5 h-3.5 ml-0.5" />
            </Link>
          </div>
        </div>
      )}

    </div>
  );
}
