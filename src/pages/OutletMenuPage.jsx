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
  ChefHat
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

  if (!outlet) {
    return (
      <div className="min-h-[75vh] flex flex-col items-center justify-center px-4 py-16 text-center max-w-md mx-auto">
        <div className="w-16 h-16 rounded-3xl bg-amber-50 text-amber-700 flex items-center justify-center mb-4">
          <AlertCircle className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-black text-stone-900 mb-2">Campus Outlet Not Found</h2>
        <p className="text-stone-500 text-sm mb-6 leading-relaxed">
          The requested campus food outlet could not be found. Please return to the homepage to browse all 14 CGC Mohali outlets.
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

  // Categories dynamically extracted from this outlet's menu
  const outletCategories = useMemo(() => {
    const cats = new Set(outlet.menu.map(item => item.category));
    return ['all', ...Array.from(cats)];
  }, [outlet]);

  // Filtered menu items
  const filteredMenu = useMemo(() => {
    return outlet.menu.filter(item => {
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

  return (
    <div className="min-h-screen bg-[#FBF8F2] pb-24">
      
      {/* 1. Header Banner & Cover Image */}
      <div className="bg-[#0D3828] text-white relative overflow-hidden">
        {/* Blurred Cover Photo */}
        <div className="absolute inset-0 opacity-25">
          <img
            src={outlet.image}
            alt={outlet.name}
            className="w-full h-full object-cover"
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
                  <div className="flex items-center gap-1.5 bg-white/10 backdrop-blur-md px-3 py-1 rounded-xl">
                    <MapPin className="w-3.5 h-3.5 text-emerald-300" />
                    <span>{outlet.location}</span>
                  </div>
                  <div className="flex items-center gap-1.5 bg-white/10 backdrop-blur-md px-3 py-1 rounded-xl">
                    <Clock className="w-3.5 h-3.5 text-amber-300" />
                    <span>Prep: {outlet.prepTime}</span>
                  </div>
                  <div className="flex items-center gap-1 bg-white/10 backdrop-blur-md px-3 py-1 rounded-xl">
                    <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                    <span className="font-bold text-white">{outlet.rating}</span>
                    <span className="text-stone-400">({outlet.reviewsCount})</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Operational Details Card */}
            <div className="md:col-span-4 bg-white/10 backdrop-blur-md border border-white/15 p-5 rounded-3xl space-y-2.5 text-xs text-stone-200">
              <div className="flex justify-between items-center pb-2 border-b border-white/10">
                <span className="text-stone-300">Campus Hours</span>
                <span className="font-semibold text-emerald-300">{outlet.timing}</span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b border-white/10">
                <span className="text-stone-300">Average Spend</span>
                <span className="font-bold text-white">{outlet.priceForTwo} for two</span>
              </div>
              <div className="flex items-center gap-2 text-[11px] text-stone-300 pt-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Order online & collect at counter with digital token</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Menu Search & Category Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        
        {/* Sample Menu Notice */}
        <div className="mb-6 py-2.5 px-4 rounded-2xl bg-amber-50/90 border border-amber-200/80 text-amber-900 text-xs flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Info className="w-4 h-4 text-amber-700 shrink-0" />
            <span>
              <strong>Sample Outlet Menu:</strong> Representative items & prices for development. Real menus will be loaded per outlet.
            </span>
          </div>
          <span className="hidden sm:inline font-bold text-amber-800">
            {outlet.menu.length} Items Listed
          </span>
        </div>

        {/* Search Bar & Category Tabs Row */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-8">
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

        {/* 3. Food Card Grid */}
        {filteredMenu.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 sm:gap-6">
            {filteredMenu.map(food => {
              const quantity = getItemQuantity(food.id);
              const favorited = isFavorite ? isFavorite(food.id) : false;
              const isAvailable = food.isAvailable !== false;

              return (
                <div
                  key={food.id}
                  onClick={() => setActiveModalItem(food)}
                  className="group bg-white rounded-3xl border border-stone-200/90 overflow-hidden shadow-2xs hover:shadow-lg hover:border-stone-300 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between cursor-pointer"
                >
                  <div>
                    {/* Food Photo with Overlay Badges */}
                    <div className="relative aspect-4/3 w-full overflow-hidden bg-stone-100">
                      <img
                        src={food.image}
                        alt={food.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                        loading="lazy"
                      />

                      {/* Veg / Non-Veg Indicator */}
                      <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md p-1.5 rounded-lg shadow-xs flex items-center justify-center">
                        <span
                          className={`w-3.5 h-3.5 border flex items-center justify-center rounded-2xs ${
                            food.isVeg ? 'border-emerald-600' : 'border-rose-600'
                          }`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
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
                        className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/30 backdrop-blur-md hover:bg-black/50 text-white flex items-center justify-center transition-all cursor-pointer"
                        aria-label="Toggle favourite"
                      >
                        <Heart
                          className={`w-4 h-4 transition-colors ${
                            favorited ? 'text-rose-500 fill-rose-500' : 'text-white'
                          }`}
                        />
                      </button>

                      {/* Availability status badge */}
                      {!isAvailable && (
                        <div className="absolute inset-0 bg-black/60 backdrop-blur-2xs flex items-center justify-center">
                          <span className="bg-rose-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                            Sold Out
                          </span>
                        </div>
                      )}

                      {/* View Details hint on hover */}
                      <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity bg-black/60 backdrop-blur-md text-white text-[11px] font-semibold px-2.5 py-1 rounded-lg flex items-center gap-1">
                        <Eye className="w-3.5 h-3.5" />
                        <span>Details</span>
                      </div>
                    </div>

                    {/* Food Info */}
                    <div className="p-4 pb-2">
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <h4 className="font-extrabold text-stone-900 text-sm sm:text-base leading-snug group-hover:text-[#0D3828] transition-colors truncate">
                          {food.name}
                        </h4>
                      </div>

                      <p className="text-xs text-stone-500 line-clamp-2 leading-relaxed mb-3">
                        {food.description}
                      </p>
                    </div>
                  </div>

                  {/* Price & Add to Cart Controls */}
                  <div className="p-4 pt-1 flex items-center justify-between border-t border-stone-100">
                    <div className="flex items-baseline gap-1">
                      <span className="text-base sm:text-lg font-black text-stone-900">
                        ₹{food.price}
                      </span>
                      <span className="text-[10px] text-stone-400 font-medium">demo</span>
                    </div>

                    {isAvailable ? (
                      quantity === 0 ? (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            addToCart(food, outlet, 1);
                          }}
                          className="flex items-center gap-1 px-3.5 py-1.5 rounded-xl bg-[#0D3828] hover:bg-[#144834] text-white text-xs font-bold transition-all active:scale-95 shadow-2xs cursor-pointer"
                        >
                          <span>Add</span>
                          <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
                        </button>
                      ) : (
                        <div 
                          onClick={(e) => e.stopPropagation()}
                          className="flex items-center gap-1.5 bg-emerald-50 border border-emerald-200/90 rounded-xl p-1"
                        >
                          <button
                            onClick={() => updateQuantity(food.id, quantity - 1)}
                            className="w-6 h-6 rounded-lg bg-white text-[#0D3828] hover:bg-emerald-100 flex items-center justify-center font-bold text-xs shadow-2xs transition-colors cursor-pointer"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-5 text-center text-xs font-bold text-[#0D3828]">
                            {quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(food.id, quantity + 1)}
                            className="w-6 h-6 rounded-lg bg-[#0D3828] text-white hover:bg-[#144834] flex items-center justify-center font-bold text-xs shadow-2xs transition-colors cursor-pointer"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      )
                    ) : (
                      <span className="text-xs font-semibold text-rose-600 bg-rose-50 px-2.5 py-1 rounded-xl">
                        Unavailable
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
