import React from 'react';
import { Heart, Plus, Minus, Eye } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

export default function FoodCard({ food, outletInfo, onItemClick }) {
  const { addToCart, updateQuantity, getItemQuantity, isFavorite, toggleFavorite } = useCart();
  const quantity = getItemQuantity(food.id);
  const favorited = isFavorite ? isFavorite(food.id) : false;
  const isAvailable = food.isAvailable !== false;

  const effectiveOutlet = outletInfo || {
    id: food.outletId,
    name: food.outletName,
    location: food.outletLocation
  };

  const handleAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(food, effectiveOutlet, 1);
  };

  const handleIncrement = (e) => {
    e.preventDefault();
    e.stopPropagation();
    updateQuantity(food.id, quantity + 1);
  };

  const handleDecrement = (e) => {
    e.preventDefault();
    e.stopPropagation();
    updateQuantity(food.id, quantity - 1);
  };

  const handleHeartToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (toggleFavorite) {
      toggleFavorite(food.id);
    }
  };

  const handleCardClick = () => {
    if (onItemClick) {
      onItemClick(food, effectiveOutlet);
    }
  };

  return (
    <div 
      onClick={handleCardClick}
      className="group bg-white dark:bg-[#19231D] rounded-2xl sm:rounded-3xl border border-stone-200/90 dark:border-[#2A382F] overflow-hidden shadow-2xs hover:shadow-lg hover:border-stone-300 dark:hover:border-[#2A382F] hover:-translate-y-0.5 transition-all duration-300 flex flex-col justify-between cursor-pointer"
    >
      <div>
        {/* Food Image & Favourite Heart Button */}
        <div className="relative aspect-4/3 w-full overflow-hidden bg-stone-100 dark:bg-[#222E26]">
          <img
            src={food.image}
            alt={food.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
            loading="lazy"
          />

          {/* Veg / Non-Veg emblem */}
          <div className="absolute top-2 left-2 sm:top-2.5 sm:left-2.5 bg-white/95 dark:bg-stone-900/90 backdrop-blur-xs p-1 rounded-md shadow-xs flex items-center justify-center z-10">
            <span className={`w-2.5 h-2.5 sm:w-3 sm:h-3 border flex items-center justify-center rounded-2xs ${food.isVeg ? 'border-emerald-600' : 'border-rose-600'}`}>
              <span className={`w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full ${food.isVeg ? 'bg-emerald-600' : 'bg-rose-600'}`} />
            </span>
          </div>

          {/* Favourite Heart Button matching reference */}
          <button
            onClick={handleHeartToggle}
            className="absolute top-2 right-2 sm:top-2.5 sm:right-2.5 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-black/30 backdrop-blur-md hover:bg-black/50 text-white flex items-center justify-center transition-all cursor-pointer z-10"
            aria-label={favorited ? "Remove from favourites" : "Add to favourites"}
          >
            <Heart
              className={`w-3.5 h-3.5 sm:w-4 sm:h-4 transition-colors ${
                favorited
                  ? 'text-rose-500 fill-rose-500'
                  : 'text-white'
              }`}
            />
          </button>

          {/* Sold out overlay */}
          {!isAvailable && (
            <div className="absolute inset-0 bg-black/60 backdrop-blur-2xs flex items-center justify-center z-10">
              <span className="bg-rose-600 text-white text-[10px] sm:text-xs font-bold px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full shadow-md">
                Sold Out
              </span>
            </div>
          )}

          {/* Hover hint */}
          <div className="absolute bottom-2.5 right-2.5 opacity-0 group-hover:opacity-100 transition-opacity bg-black/60 backdrop-blur-md text-white text-[10px] font-semibold px-2 py-0.5 rounded-lg flex items-center gap-1 pointer-events-none">
            <Eye className="w-3 h-3" />
            <span>Details</span>
          </div>
        </div>

        {/* Content: Title & Outlet */}
        <div className="p-2.5 sm:p-4 pb-1 sm:pb-2">
          <h4 className="font-extrabold text-stone-900 dark:text-[#F5F7F4] text-xs sm:text-base leading-snug line-clamp-1 group-hover:text-[#0D3828] dark:group-hover:text-[#52D8A4] transition-colors">
            {food.name}
          </h4>

          {effectiveOutlet?.name && (
            <Link
              to={`/outlet/${effectiveOutlet.id}`}
              onClick={(e) => e.stopPropagation()}
              className="block text-[10px] sm:text-xs text-stone-400 dark:text-[#B8C5BB] font-medium hover:text-stone-700 dark:hover:text-stone-200 transition-colors mt-0.5 line-clamp-1"
            >
              {effectiveOutlet.name}
            </Link>
          )}
        </div>
      </div>

      {/* Pricing & Add to Cart Controls */}
      <div className="p-2.5 sm:p-4 pt-1 flex items-center justify-between">
        <div className="flex items-baseline gap-1">
          <span className="text-xs sm:text-base font-black text-stone-900 dark:text-[#F5F7F4]">
            ₹{food.price}
          </span>
          <span className="text-[9px] sm:text-[10px] text-stone-400 hidden sm:inline">(demo)</span>
        </div>

        {isAvailable ? (
          quantity === 0 ? (
            <button
              onClick={handleAdd}
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
                onClick={handleDecrement}
                className="w-5 h-5 sm:w-6 sm:h-6 rounded-md sm:rounded-lg bg-white dark:bg-[#222E26] text-[#0D3828] dark:text-[#52D8A4] hover:bg-emerald-100 flex items-center justify-center font-bold text-xs shadow-2xs transition-colors cursor-pointer"
                aria-label="Decrease quantity"
              >
                <Minus className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
              </button>
              <span className="w-4 sm:w-5 text-center text-[11px] sm:text-xs font-bold text-[#0D3828] dark:text-[#52D8A4]">
                {quantity}
              </span>
              <button
                onClick={handleIncrement}
                className="w-5 h-5 sm:w-6 sm:h-6 rounded-md sm:rounded-lg bg-[#0D3828] text-white hover:bg-[#144834] flex items-center justify-center font-bold text-xs shadow-2xs transition-colors cursor-pointer"
                aria-label="Increase quantity"
              >
                <Plus className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
              </button>
            </div>
          )
        ) : (
          <span className="text-[10px] sm:text-xs font-semibold text-rose-600 bg-rose-50 dark:bg-rose-950/30 px-2 py-0.5 rounded-lg">
            Sold Out
          </span>
        )}
      </div>
    </div>
  );
}
