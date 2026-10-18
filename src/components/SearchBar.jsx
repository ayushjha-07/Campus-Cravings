import React, { useState, useRef, useEffect } from 'react';
import { Search, X, Store, Utensils, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { OUTLETS, getAllFoodItems } from '../data/outlets';
import { useMenu } from '../context/MenuContext';

export default function SearchBar({ placeholder = "Search for food (pizza, shakes, maggi) or outlets (Dominos, Kulhad)...", onSelect }) {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);
  const navigate = useNavigate();
  const { outlets } = useMenu();
  const activeOutlets = outlets?.length > 0 ? outlets : OUTLETS;

  // Filter outlets and food items
  const matchedOutlets = query.trim()
    ? activeOutlets.filter(o =>
        o.name.toLowerCase().includes(query.toLowerCase()) ||
        o.shortCategory?.toLowerCase().includes(query.toLowerCase()) ||
        o.cuisine?.some(c => c.toLowerCase().includes(query.toLowerCase())) ||
        o.location?.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 4)
    : [];

  const matchedFoods = query.trim()
    ? getAllFoodItems().filter(f =>
        f.name.toLowerCase().includes(query.toLowerCase()) ||
        f.category.toLowerCase().includes(query.toLowerCase()) ||
        f.description.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 5)
    : [];

  const hasResults = matchedOutlets.length > 0 || matchedFoods.length > 0;

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelectOutlet = (outletId) => {
    setIsOpen(false);
    setQuery('');
    if (onSelect) onSelect();
    navigate(`/outlet/${outletId}`);
  };

  const handleSelectFood = (item) => {
    setIsOpen(false);
    setQuery('');
    if (onSelect) onSelect();
    navigate(`/outlet/${item.outletId}`);
  };

  return (
    <div ref={containerRef} className="relative w-full max-w-2xl mx-auto">
      <div className="relative flex items-center shadow-lg shadow-emerald-950/5 rounded-2xl bg-white border border-stone-200/90 focus-within:border-[#1B4D36] focus-within:ring-4 focus-within:ring-[#1B4D36]/10 transition-all">
        <div className="pl-4 pr-2 text-stone-400">
          <Search className="w-5 h-5 text-[#1B4D36]" />
        </div>
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          placeholder={placeholder}
          className="w-full py-3.5 pr-10 text-stone-900 placeholder:text-stone-400 text-sm md:text-base bg-transparent border-none focus:outline-none"
        />
        {query && (
          <button
            onClick={() => setQuery('')}
            className="p-1 mr-3 text-stone-400 hover:text-stone-600 rounded-full hover:bg-stone-100 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Instant Dropdown Suggestions */}
      {isOpen && query.trim().length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-xl border border-stone-200 overflow-hidden z-50 animate-in fade-in duration-100 divide-y divide-stone-100">
          {hasResults ? (
            <>
              {/* Outlets Match */}
              {matchedOutlets.length > 0 && (
                <div className="p-3">
                  <div className="text-[11px] font-bold text-stone-400 tracking-wider uppercase px-2 mb-2 flex items-center gap-1.5">
                    <Store className="w-3.5 h-3.5 text-[#1B4D36]" />
                    <span>Campus Outlets</span>
                  </div>
                  <div className="space-y-1">
                    {matchedOutlets.map(outlet => (
                      <button
                        key={outlet.id}
                        onClick={() => handleSelectOutlet(outlet.id)}
                        className="w-full text-left flex items-center justify-between p-2 rounded-xl hover:bg-emerald-50/70 transition-colors group"
                      >
                        <div className="flex items-center gap-3">
                          <img
                            src={outlet.image}
                            alt={
                              outlet.id === 'applebeez' || outlet.id === 'apple-beez' || outlet.name === 'Apple Beez'
                                ? 'Apple Beez campus garden and outdoor dining pavilion at Block 2'
                                : outlet.id === 'tuckshop' || outlet.name === 'Tuckshop' || outlet.name === 'Tuck Shop'
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
                            className={`w-10 h-10 rounded-lg object-cover ${
                              outlet.id === 'yum-experts'
                                ? 'object-[center_22%]'
                                : outlet.id === 'applebeez' || outlet.id === 'apple-beez'
                                ? 'object-[center_50%]'
                                : outlet.id === 'tuckshop'
                                ? 'object-[center_15%]'
                                : outlet.id === 'canteen' || outlet.id === 'college-canteen'
                                ? 'object-[center_20%]'
                                : outlet.id === 'kulhad'
                                ? 'object-[center_30%]'
                                : outlet.id === 'dockyard-le-bistro'
                                ? 'object-[center_45%]'
                                : outlet.id === 'buddys-bistro' || outlet.id === 'buds-bistro'
                                ? 'object-[center_25%]'
                                : outlet.id === 'dominos' || outlet.id === 'dominos-pizza'
                                ? 'object-[center_12%]'
                                : outlet.id === 'easy-day' || outlet.id === 'easyday'
                                ? 'object-[center_15%]'
                                : outlet.id === 'chutar-putar' || outlet.id === 'chutarputar'
                                ? 'object-[center_15%]'
                                : outlet.id === 'nescafe'
                                ? 'object-[center_25%]'
                                : outlet.id === 'thick-let-to' || outlet.id === 'thick-letto'
                                ? 'object-[center_30%]'
                                : outlet.id === 'rock-n-roll'
                                ? 'object-[center_40%]'
                                : outlet.id === 'topn-n-town-for-hunger'
                                ? 'object-[center_32%]'
                                : outlet.id === 'x-burgers'
                                ? 'object-[center_20%]'
                                : outlet.id === 'sip-n-bites'
                                ? 'object-[center_25%]'
                                : ''
                            }`}
                          />
                          <div>
                            <div className="text-sm font-semibold text-stone-900 group-hover:text-[#1B4D36]">
                              {outlet.name}
                            </div>
                            <div className="text-xs text-stone-500">
                              {outlet.location ? `${outlet.location} • ` : ''}
                              {outlet.rating ? (
                                <span className="text-emerald-700 font-medium">★ {outlet.rating}</span>
                              ) : (
                                <span className="text-emerald-700 font-medium">{outlet.shortCategory || 'Campus Outlet'}</span>
                              )}
                            </div>
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-stone-300 group-hover:text-[#1B4D36] transition-transform group-hover:translate-x-1" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Foods Match */}
              {matchedFoods.length > 0 && (
                <div className="p-3">
                  <div className="text-[11px] font-bold text-stone-400 tracking-wider uppercase px-2 mb-2 flex items-center gap-1.5">
                    <Utensils className="w-3.5 h-3.5 text-[#E76F51]" />
                    <span>Dishes & Items</span>
                  </div>
                  <div className="space-y-1">
                    {matchedFoods.map(food => (
                      <button
                        key={food.id}
                        onClick={() => handleSelectFood(food)}
                        className="w-full text-left flex items-center justify-between p-2 rounded-xl hover:bg-emerald-50/70 transition-colors group"
                      >
                        <div className="flex items-center gap-3">
                          <img
                            src={food.image}
                            alt={food.name}
                            className="w-10 h-10 rounded-lg object-cover"
                          />
                          <div>
                            <div className="flex items-center gap-1.5">
                              <span className={`w-2 h-2 rounded-full ${food.isVeg ? 'bg-emerald-600' : 'bg-rose-600'}`} />
                              <span className="text-sm font-semibold text-stone-900 group-hover:text-[#1B4D36]">
                                {food.name}
                              </span>
                            </div>
                            <div className="text-xs text-stone-500">
                              Available at <span className="font-medium text-stone-700">{food.outletName}</span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="text-sm font-bold text-stone-900">₹{food.price}</span>
                          <span className="block text-[10px] text-stone-400">View Menu</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="p-6 text-center text-stone-500 text-sm">
              No matching food or campus outlets found for "{query}".
              <div className="mt-2 text-xs text-stone-400">
                Try searching for "Kulhad", "Dominos", "Wrap", "Coffee", or "Burger"
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
