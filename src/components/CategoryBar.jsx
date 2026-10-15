import React from 'react';
import { 
  LayoutGrid, 
  CookingPot, 
  Soup, 
  Cookie, 
  CupSoda, 
  Sandwich, 
  Disc, 
  CakeSlice, 
  Sprout 
} from 'lucide-react';
import { CATEGORIES } from '../data/categories';

// Map icon string name to Lucide component
const ICON_MAP = {
  LayoutGrid,
  CookingPot,
  Soup,
  Cookie,
  CupSoda,
  Sandwich,
  Disc,
  CakeSlice,
  Sprout
};

export default function CategoryBar({ selectedCategory, onSelectCategory }) {
  const handleCategoryClick = (catId) => {
    onSelectCategory(catId);
    // Smooth scroll down to popular section
    const el = document.getElementById('popular');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section className="relative z-20 -mt-4 sm:-mt-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-white dark:bg-[#19231D] rounded-3xl p-3 sm:p-4 shadow-lg shadow-black/5 dark:shadow-black/20 border border-stone-200/90 dark:border-[#2A382F] transition-colors duration-200">
        
        {/* Horizontal Category Nav Row matching reference image */}
        <div className="flex items-center justify-between gap-2 sm:gap-4 overflow-x-auto pb-1 sm:pb-0 scrollbar-none no-scrollbar">
          {CATEGORIES.map((cat) => {
            const Icon = ICON_MAP[cat.icon] || LayoutGrid;
            const isSelected = selectedCategory === cat.id;

            return (
              <button
                key={cat.id}
                onClick={() => handleCategoryClick(cat.id)}
                className={`group flex flex-col items-center justify-center p-2.5 sm:p-3 rounded-2xl transition-all duration-200 shrink-0 min-w-[72px] sm:min-w-[84px] cursor-pointer ${
                  isSelected
                    ? 'bg-[#0D3828] text-white shadow-md scale-105'
                    : 'hover:bg-stone-50 dark:hover:bg-[#222E26] text-stone-700 dark:text-stone-300'
                }`}
              >
                {/* Icon wrapper */}
                <div
                  className={`w-10 h-10 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center mb-1.5 transition-transform duration-200 group-hover:scale-110 ${
                    isSelected
                      ? 'bg-white/15 text-[#EAA044]'
                      : cat.id === 'all'
                      ? 'bg-[#0D3828] text-white'
                      : 'bg-stone-100 dark:bg-[#222E26] text-stone-700 dark:text-stone-300'
                  }`}
                >
                  <Icon className="w-5 h-5 sm:w-5 sm:h-5 stroke-[2]" />
                </div>

                {/* Category Label */}
                <span className={`text-[11px] sm:text-xs font-bold whitespace-nowrap text-center ${
                  isSelected 
                    ? 'text-white' 
                    : 'text-stone-700 dark:text-stone-300 group-hover:text-stone-900 dark:group-hover:text-white'
                }`}>
                  {cat.name}
                </span>
              </button>
            );
          })}
        </div>

      </div>
    </section>
  );
}
