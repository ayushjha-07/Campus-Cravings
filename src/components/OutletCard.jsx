import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Star, Clock, MapPin, Heart, ArrowRight, Store } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function OutletCard({ outlet }) {
  const { isFavorite, toggleFavorite } = useCart();
  const navigate = useNavigate();

  const favorited = isFavorite ? isFavorite(outlet.id) : false;
  const isOpen = outlet.isOpen !== false;

  const handleFavoriteClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (toggleFavorite) {
      toggleFavorite(outlet.id);
    }
  };

  const handleCardClick = () => {
    navigate(`/outlet/${outlet.id}`);
  };

  return (
    <div
      onClick={handleCardClick}
      className="group bg-white dark:bg-[#19231D] rounded-3xl border border-stone-200/90 dark:border-[#2A382F] overflow-hidden shadow-2xs hover:shadow-xl hover:border-stone-300 dark:hover:border-stone-700 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between cursor-pointer"
    >
      <div>
        {/* Top Storefront / Food Photography Image */}
        <div className={`relative w-full overflow-hidden bg-stone-100 dark:bg-[#222E26] ${
          outlet.id === 'yum-experts' || outlet.id === 'applebeez' || outlet.id === 'apple-beez' || outlet.id === 'tuckshop' || outlet.id === 'canteen' || outlet.id === 'college-canteen' || outlet.id === 'kulhad' || outlet.id === 'dockyard-le-bistro' || outlet.id === 'buddys-bistro' || outlet.id === 'buds-bistro' || outlet.id === 'dominos' || outlet.id === 'dominos-pizza' || outlet.id === 'easy-day' || outlet.id === 'easyday' || outlet.id === 'chutar-putar' || outlet.id === 'chutarputar' || outlet.id === 'nescafe' || outlet.id === 'thick-let-to' || outlet.id === 'thick-letto' || outlet.id === 'rock-n-roll' || outlet.id === 'topn-n-town-for-hunger' || outlet.id === 'x-burgers' || outlet.id === 'sip-n-bites' ? 'h-[190px] sm:h-[260px]' : 'aspect-16/10'
        }`}>
          <img
            src={outlet.image}
            alt={
              outlet.id === 'applebeez' || outlet.id === 'apple-beez' || outlet.name === 'Apple Beez'
                ? 'Apple Beez campus garden and outdoor dining pavilion at Block 2'
                : outlet.id === 'tuckshop' || outlet.name === 'Tuckshop'
                ? 'Tuck Shop stationery, printing and daily essentials campus store'
                : outlet.id === 'canteen' || outlet.id === 'college-canteen' || outlet.name === 'College Canteen'
                ? 'College Canteen storefront with food counters and outdoor seating'
                : outlet.id === 'kulhad' || outlet.name === 'Kulhad'
                ? 'Kulhad campus food outlet with black storefront and menu boards'
                : outlet.id === 'dockyard-le-bistro' || outlet.name === 'Dockyard Le Bistro'
                ? 'Dockyard Le Bistro green container-style restaurant with outdoor seating'
                : outlet.id === 'buddys-bistro' || outlet.id === 'buds-bistro' || outlet.name === "Buddy's Bistro"
                ? "Buddy’s Bistro restaurant storefront"
                : outlet.id === 'dominos' || outlet.id === 'dominos-pizza' || outlet.name === "Domino's" || outlet.name === "Domino's Pizza" || outlet.name === "Dominos"
                ? "Domino’s pizza outlet storefront"
                : outlet.id === 'easy-day' || outlet.id === 'easyday' || outlet.name === 'Easy Day SuperMart'
                ? 'Easy Day SuperMart storefront with shop sign and entrance'
                : outlet.id === 'chutar-putar' || outlet.id === 'chutarputar' || outlet.name === 'Chutar Putar'
                ? 'Chutar Putar yellow and red storefront with its sign clearly visible'
                : outlet.id === 'nescafe' || outlet.name === 'Nescafe'
                ? 'Nescafe coffee outlet storefront'
                : outlet.id === 'thick-let-to' || outlet.id === 'thick-letto' || outlet.name === 'Thick & Letto'
                ? 'Thick & Letto red shake and dessert kiosk with striped awning on campus'
                : outlet.id === 'rock-n-roll' || outlet.name === 'Rock N Roll' || outlet.name === 'Rock In Roll'
                ? 'Rock In Roll campus food stall with blue awning, menu boards, and serving counter'
                : outlet.id === 'topn-n-town-for-hunger' || outlet.name === "Top N' Town for Hunger" || outlet.name === "Top N' Town"
                ? "Top N' Town for Hunger campus food outlet storefront"
                : outlet.id === 'x-burgers' || outlet.name === 'X Burgers Café' || outlet.name === 'X Burgers'
                ? 'X Burgers storefront with red sign and menu boards'
                : outlet.id === 'sip-n-bites' || outlet.name === 'Sip N Bites'
                ? 'Sip N Bites campus outlet storefront with green awning and menu boards'
                : outlet.id === 'yum-experts' || outlet.name === 'Yum Experts'
                ? 'Yum Experts campus food outlet storefront with red and green sign'
                : outlet.name
            }
            className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out ${
              outlet.id === 'yum-experts' ? 'object-[center_22%]' : outlet.id === 'applebeez' || outlet.id === 'apple-beez' ? 'object-[center_50%]' : outlet.id === 'tuckshop' ? 'object-[center_15%]' : outlet.id === 'canteen' || outlet.id === 'college-canteen' ? 'object-[center_20%]' : outlet.id === 'kulhad' ? 'object-[center_30%]' : outlet.id === 'dockyard-le-bistro' ? 'object-[center_45%]' : outlet.id === 'buddys-bistro' || outlet.id === 'buds-bistro' ? 'object-[center_25%]' : outlet.id === 'dominos' || outlet.id === 'dominos-pizza' ? 'object-[center_12%]' : outlet.id === 'easy-day' || outlet.id === 'easyday' ? 'object-[center_15%]' : outlet.id === 'chutar-putar' || outlet.id === 'chutarputar' ? 'object-[center_15%]' : outlet.id === 'nescafe' ? 'object-[center_25%]' : outlet.id === 'thick-let-to' || outlet.id === 'thick-letto' ? 'object-[center_30%]' : outlet.id === 'rock-n-roll' ? 'object-[center_40%]' : outlet.id === 'topn-n-town-for-hunger' ? 'object-[center_32%]' : outlet.id === 'x-burgers' ? 'object-[center_20%]' : outlet.id === 'sip-n-bites' ? 'object-[center_25%]' : ''
            }`}
            loading="lazy"
          />

          {/* Vignette Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />

          {/* Favourite Heart Button matching reference image */}
          <button
            type="button"
            onClick={handleFavoriteClick}
            className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-md text-white flex items-center justify-center transition-all cursor-pointer z-10"
            aria-label={favorited ? `Remove ${outlet.name} from favourites` : `Add ${outlet.name} to favourites`}
            title={favorited ? "Favourited outlet" : "Add to favourites"}
          >
            <Heart
              className={`w-4 h-4 transition-colors ${
                favorited
                  ? 'text-rose-500 fill-rose-500'
                  : 'text-white'
              }`}
            />
          </button>

          {/* Open / Closed Status Badge matching reference image (only when known) */}
          {outlet.isOpen !== undefined && (
            <div className="absolute bottom-2.5 right-2.5 z-10">
              {outlet.isOpen ? (
                <span className="inline-flex items-center gap-1 bg-emerald-600/90 text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full shadow-xs backdrop-blur-xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                  <span>Open</span>
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 bg-rose-600/90 text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full shadow-xs backdrop-blur-xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-white" />
                  <span>Closed</span>
                </span>
              )}
            </div>
          )}
        </div>

        {/* Card Body matching reference image */}
        <div className="p-4 sm:p-5 pb-2 space-y-2">
          
          {/* Outlet Name & Rating Row */}
          <div className="flex items-center justify-between gap-2">
            <h3 className="font-extrabold text-stone-900 dark:text-[#F5F7F4] text-base sm:text-lg leading-tight group-hover:text-[#0D3828] dark:group-hover:text-[#52D8A4] transition-colors truncate">
              {outlet.name}
            </h3>

            {outlet.rating && (
              <div className="flex items-center gap-1 bg-amber-50 dark:bg-[#222E26] border border-amber-200/80 dark:border-amber-500/30 px-2 py-0.5 rounded-lg shrink-0">
                <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                <span className="text-xs font-bold text-stone-900 dark:text-stone-100">{outlet.rating}</span>
                <span className="text-[10px] text-stone-400 font-medium">({outlet.reviewsCount || 150})</span>
              </div>
            )}
          </div>

          {/* Cuisine / Category */}
          <div className="flex items-center gap-1.5 text-xs text-stone-500 dark:text-[#B8C5BB] truncate">
            <Store className="w-3.5 h-3.5 text-stone-400 shrink-0" />
            <span className="truncate">
              {outlet.cuisine ? outlet.cuisine.slice(0, 3).join(', ') : outlet.shortCategory}
            </span>
          </div>

          {/* Metadata Footer: Prep Time & Distance */}
          <div className="flex items-center justify-between pt-1 text-[11px] sm:text-xs text-stone-400 dark:text-stone-400 border-t border-stone-100 dark:border-[#2A382F]">
            <div className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-stone-400" />
              <span>{outlet.prepTime || 'Counter Order'}</span>
            </div>

            <div className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-stone-400" />
              <span className="truncate max-w-[120px]">
                {outlet.location ? outlet.location.split(',')[0] : 'CGC Mohali'}
              </span>
            </div>
          </div>

        </div>
      </div>

      {/* View Menu CTA Button */}
      <div className="p-4 pt-1 sm:p-5 sm:pt-2">
        <Link
          to={`/outlet/${outlet.id}`}
          onClick={(e) => e.stopPropagation()}
          className="w-full py-2.5 rounded-xl bg-stone-50 hover:bg-[#0D3828] dark:bg-[#222E26] dark:hover:bg-[#14533C] text-stone-800 hover:text-white dark:text-stone-200 dark:hover:text-white font-bold text-xs flex items-center justify-center gap-1.5 border border-stone-200/80 dark:border-[#2A382F] hover:border-transparent transition-all cursor-pointer"
        >
          <span>View Menu</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
