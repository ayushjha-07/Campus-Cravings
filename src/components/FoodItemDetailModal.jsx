import React, { useState, useEffect } from 'react';
import { 
  X, 
  Plus, 
  Minus, 
  ShoppingBag, 
  Heart, 
  Star, 
  Clock, 
  Store, 
  CheckCircle2, 
  AlertCircle,
  ShieldCheck
} from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function FoodItemDetailModal({ item, outlet, isOpen, onClose }) {
  const { addToCart, getItemQuantity, isFavorite, toggleFavorite } = useCart();
  const [quantity, setQuantity] = useState(1);

  // Reset quantity when opened or item changes
  useEffect(() => {
    if (isOpen) {
      setQuantity(1);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, item]);

  // Handle ESC key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !item) return null;

  const currentCartQty = getItemQuantity(item.id);
  const favorited = isFavorite ? isFavorite(item.id) : false;
  const isAvailable = item.isAvailable !== false;

  const handleIncrement = () => setQuantity(prev => prev + 1);
  const handleDecrement = () => setQuantity(prev => Math.max(1, prev - 1));

  const handleAddToCart = () => {
    if (!isAvailable) return;
    addToCart(item, outlet, quantity);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-lg bg-white rounded-3xl overflow-hidden shadow-2xl border border-stone-200 animate-in zoom-in-95 duration-200 flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3.5 right-3.5 z-20 w-9 h-9 rounded-full bg-black/40 hover:bg-black/60 text-white backdrop-blur-md flex items-center justify-center transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Top: Large Food Photography */}
        <div className="relative aspect-16/10 w-full overflow-hidden bg-stone-100 shrink-0">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

          {/* Veg/Non-Veg tag */}
          <div className="absolute top-3.5 left-3.5 bg-white/95 backdrop-blur-md p-1.5 rounded-lg shadow-sm flex items-center justify-center">
            <span
              className={`w-3.5 h-3.5 border flex items-center justify-center rounded-2xs ${
                item.isVeg ? 'border-emerald-600' : 'border-rose-600'
              }`}
            >
              <span
                className={`w-1.5 h-1.5 rounded-full ${
                  item.isVeg ? 'bg-emerald-600' : 'bg-rose-600'
                }`}
              />
            </span>
          </div>

          {/* Favourite button */}
          <button
            onClick={() => toggleFavorite && toggleFavorite(item.id)}
            className="absolute top-3.5 right-14 w-9 h-9 rounded-full bg-black/40 hover:bg-black/60 text-white backdrop-blur-md flex items-center justify-center transition-all cursor-pointer"
            aria-label={favorited ? "Remove from favourites" : "Add to favourites"}
          >
            <Heart
              className={`w-4 h-4 transition-colors ${
                favorited ? 'text-rose-500 fill-rose-500' : 'text-white'
              }`}
            />
          </button>

          {/* Category & Availability Badges */}
          <div className="absolute bottom-3 left-3.5 right-3.5 flex items-center justify-between text-white text-xs">
            <span className="bg-black/50 backdrop-blur-md px-2.5 py-1 rounded-lg font-medium">
              {item.category}
            </span>

            {isAvailable ? (
              <span className="bg-emerald-600/90 backdrop-blur-md px-2.5 py-1 rounded-lg font-bold flex items-center gap-1 text-[11px]">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Available for Pickup</span>
              </span>
            ) : (
              <span className="bg-rose-600/90 backdrop-blur-md px-2.5 py-1 rounded-lg font-bold flex items-center gap-1 text-[11px]">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>Temporarily Sold Out</span>
              </span>
            )}
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-4 flex-1">
          {/* Outlet Attribution */}
          {outlet?.name && (
            <div className="flex items-center gap-2 text-xs font-semibold text-[#0D3828]">
              <Store className="w-3.5 h-3.5" />
              <span>{outlet.name}</span>
              <span className="text-stone-300">•</span>
              <span className="text-stone-500 font-normal">{outlet.location}</span>
            </div>
          )}

          {/* Title & Price */}
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="font-extrabold text-xl sm:text-2xl text-stone-900 leading-tight">
                {item.name}
              </h3>
              {item.rating && (
                <div className="flex items-center gap-1 mt-1 text-xs text-stone-600">
                  <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                  <span className="font-bold text-stone-900">{item.rating}</span>
                  <span className="text-stone-400">• CGC Student Top Pick</span>
                </div>
              )}
            </div>

            <div className="text-right shrink-0">
              <span className="text-2xl font-black text-[#0D3828]">
                ₹{item.price}
              </span>
              <span className="block text-[10px] text-stone-400 font-medium">
                (demo price)
              </span>
            </div>
          </div>

          {/* Description */}
          <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200/80 text-xs sm:text-sm text-stone-600 leading-relaxed">
            {item.description || 'Prepared fresh with campus hygiene standards. Pick up warm directly at the counter.'}
          </div>

          {/* Current cart indicator if already in cart */}
          {currentCartQty > 0 && (
            <div className="p-2.5 bg-emerald-50 rounded-xl border border-emerald-200/80 text-xs text-emerald-800 flex items-center justify-between">
              <span>Already in your cart:</span>
              <span className="font-bold">{currentCartQty} added</span>
            </div>
          )}

          {/* Prep & Pickup Assurance */}
          <div className="flex items-center gap-2 text-xs text-stone-500 pt-1">
            <Clock className="w-3.5 h-3.5 text-[#0D3828]" />
            <span>Avg. Prep Time: {outlet?.prepTime || '8-12 mins'}</span>
            <span className="text-stone-300">•</span>
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Campus Outlet Verified</span>
          </div>
        </div>

        {/* Modal Footer: Quantity Stepper & Add to Cart Button */}
        <div className="p-4 sm:p-5 bg-stone-50/80 border-t border-stone-200/80 flex items-center justify-between gap-4 shrink-0">
          {/* Quantity Selector */}
          <div className="flex items-center gap-2 bg-white border border-stone-200 rounded-2xl p-1.5 shadow-2xs">
            <button
              onClick={handleDecrement}
              disabled={!isAvailable || quantity <= 1}
              className="w-8 h-8 rounded-xl bg-stone-100 hover:bg-stone-200 disabled:opacity-40 text-stone-800 flex items-center justify-center font-bold text-sm transition-colors cursor-pointer"
              aria-label="Decrease quantity"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <span className="w-8 text-center text-sm font-black text-stone-900">
              {quantity}
            </span>
            <button
              onClick={handleIncrement}
              disabled={!isAvailable}
              className="w-8 h-8 rounded-xl bg-[#0D3828] hover:bg-[#144834] disabled:opacity-40 text-white flex items-center justify-center font-bold text-sm transition-colors cursor-pointer"
              aria-label="Increase quantity"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Add To Cart CTA Button */}
          <button
            onClick={handleAddToCart}
            disabled={!isAvailable}
            className="flex-1 py-3 px-5 rounded-2xl bg-[#0D3828] hover:bg-[#144834] disabled:bg-stone-300 disabled:cursor-not-allowed text-white font-extrabold text-sm sm:text-base flex items-center justify-center gap-2 shadow-md shadow-emerald-950/10 hover:shadow-lg transition-all active:scale-[0.99] cursor-pointer"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>
              {isAvailable ? `Add to Cart • ₹${item.price * quantity}` : 'Item Sold Out'}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
