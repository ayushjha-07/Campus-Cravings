import React from 'react';
import { Heart, Plus, Minus } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

export default function FoodCardMobileRow({ food, outletInfo, onItemClick }) {
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

  const handleClick = () => {
    if (onItemClick) {
      onItemClick(food, effectiveOutlet);
    }
  };

  return (
    <div 
      onClick={handleClick}
      className="bg-white rounded-2xl p-3 border border-stone-200/90 shadow-2xs flex items-center justify-between gap-3 cursor-pointer"
    >
      {/* Thumbnail */}
      <div className="relative w-18 h-18 shrink-0">
        <img
          src={food.image}
          alt={food.name}
          className="w-full h-full rounded-xl object-cover bg-stone-100"
        />
        {!isAvailable && (
          <div className="absolute inset-0 bg-black/60 rounded-xl flex items-center justify-center">
            <span className="text-[10px] text-white font-bold">Sold Out</span>
          </div>
        )}
      </div>

      {/* Title & Outlet */}
      <div className="flex-1 min-w-0 pr-1">
        <h4 className="font-extrabold text-stone-900 text-sm truncate leading-snug">
          {food.name}
        </h4>
        <Link
          to={`/outlet/${effectiveOutlet.id}`}
          onClick={(e) => e.stopPropagation()}
          className="text-xs text-stone-400 font-medium block truncate mt-0.5 hover:text-stone-700"
        >
          {effectiveOutlet.name}
        </Link>
        <div className="font-black text-stone-900 text-sm mt-1">
          ₹{food.price}
        </div>
      </div>

      {/* Actions: Heart + Add button */}
      <div className="flex flex-col items-end justify-between h-18 py-0.5 shrink-0">
        <button
          onClick={handleHeartToggle}
          className="p-1 text-stone-400 hover:text-rose-500 transition-colors cursor-pointer"
          aria-label="Toggle favourite"
        >
          <Heart
            className={`w-4 h-4 ${
              favorited ? 'text-rose-500 fill-rose-500' : 'text-stone-300'
            }`}
          />
        </button>

        {isAvailable ? (
          quantity === 0 ? (
            <button
              onClick={handleAdd}
              className="flex items-center gap-1 px-3 py-1 rounded-xl bg-[#0D3828] text-white text-xs font-bold active:scale-95 shadow-2xs cursor-pointer"
            >
              <span>Add</span>
              <Plus className="w-3 h-3 stroke-[2.5]" />
            </button>
          ) : (
            <div 
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-1 bg-emerald-50 border border-emerald-200 rounded-xl p-0.5"
            >
              <button
                onClick={handleDecrement}
                className="w-5 h-5 rounded-lg bg-white text-[#0D3828] flex items-center justify-center font-bold text-xs"
              >
                <Minus className="w-2.5 h-2.5" />
              </button>
              <span className="w-4 text-center text-xs font-bold text-[#0D3828]">
                {quantity}
              </span>
              <button
                onClick={handleIncrement}
                className="w-5 h-5 rounded-lg bg-[#0D3828] text-white flex items-center justify-center font-bold text-xs"
              >
                <Plus className="w-2.5 h-2.5" />
              </button>
            </div>
          )
        ) : (
          <span className="text-[10px] text-rose-600 bg-rose-50 px-2 py-0.5 rounded-md font-semibold">
            Sold Out
          </span>
        )}
      </div>
    </div>
  );
}
