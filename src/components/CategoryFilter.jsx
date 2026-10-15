import React from 'react';
import { 
  Sparkles, 
  Pizza, 
  Sandwich, 
  Cookie, 
  Utensils, 
  Coffee, 
  IceCream, 
  CupSoda 
} from 'lucide-react';
import { CATEGORIES } from '../data/categories';

const ICON_MAP = {
  Sparkles,
  Pizza,
  Sandwich,
  Cookie,
  Utensils,
  Coffee,
  IceCream,
  CupSoda
};

export default function CategoryFilter({ selectedCategory, onSelectCategory }) {
  return (
    <div className="w-full">
      <div className="flex items-center gap-2.5 overflow-x-auto pb-2 scrollbar-none no-scrollbar py-1">
        {CATEGORIES.map(cat => {
          const Icon = ICON_MAP[cat.icon] || Sparkles;
          const isSelected = selectedCategory === cat.id;

          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap transition-all duration-200 shrink-0 ${
                isSelected
                  ? 'bg-[#1B4D36] text-white shadow-md shadow-emerald-900/20 scale-[1.02]'
                  : 'bg-white hover:bg-stone-100/80 text-stone-700 border border-stone-200/90 shadow-2xs'
              }`}
            >
              <Icon className={`w-4 h-4 ${isSelected ? 'text-[#F9F5EC]' : 'text-stone-500'}`} />
              <span>{cat.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
