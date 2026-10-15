import React from 'react';
import { 
  Coffee, 
  Store, 
  Pizza, 
  Sandwich, 
  UtensilsCrossed, 
  CupSoda, 
  IceCream, 
  Flame 
} from 'lucide-react';

export default function OutletEmblem({ outlet }) {
  const { id, name, logoType, brandColor } = outlet;

  switch (id) {
    case 'applebeez':
      return (
        <div className="w-16 h-16 rounded-2xl bg-[#E63946] flex flex-col items-center justify-center text-white shadow-sm p-1">
          <div className="text-xl leading-none">🍎</div>
          <span className="text-[10px] font-black tracking-tight mt-0.5 font-sans">Applebeez</span>
        </div>
      );

    case 'topn-n-town-for-hunger':
      return (
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#D90429] to-[#EF233C] flex flex-col items-center justify-center text-white shadow-sm p-1 text-center">
          <span className="text-[9px] font-extrabold uppercase leading-tight tracking-tighter">
            Topn n Town
          </span>
          <span className="text-[8px] font-bold text-amber-200 leading-none">for Hunger</span>
        </div>
      );

    case 'easy-day':
      return (
        <div className="w-16 h-16 rounded-2xl bg-[#2B9348] flex flex-col items-center justify-center text-white shadow-sm p-1">
          <div className="text-lg">🛒</div>
          <span className="text-[10px] font-extrabold tracking-tight">Easy Day</span>
        </div>
      );

    case 'kulhad':
      return (
        <div className="w-16 h-16 rounded-2xl bg-[#8B4513] flex flex-col items-center justify-center text-white shadow-sm p-1">
          <div className="text-xl">🏺</div>
          <span className="text-[10px] font-black tracking-wide">Kulhad</span>
        </div>
      );

    case 'tuckshop':
      return (
        <div className="w-16 h-16 rounded-2xl bg-[#D00000] flex flex-col items-center justify-center text-white shadow-sm p-1">
          <div className="text-lg">🍟</div>
          <span className="text-[10px] font-extrabold tracking-tight">Tuckshop</span>
        </div>
      );

    case 'dominos':
      return (
        <div className="w-16 h-16 rounded-2xl bg-[#0055A5] flex flex-col items-center justify-center text-white shadow-sm p-1 relative overflow-hidden">
          <div className="flex items-center gap-0.5 mb-0.5">
            <span className="w-2.5 h-2.5 bg-red-600 rounded-xs rotate-45 border border-white"></span>
            <span className="w-2.5 h-2.5 bg-blue-500 rounded-xs rotate-45 border border-white"></span>
          </div>
          <span className="text-[10px] font-black tracking-tight">Domino's</span>
        </div>
      );

    case 'nescafe':
      return (
        <div className="w-16 h-16 rounded-2xl bg-[#C1121F] flex flex-col items-center justify-center text-white shadow-sm p-1">
          <Coffee className="w-5 h-5 text-amber-100 mb-0.5" />
          <span className="text-[9px] font-black tracking-wider uppercase">Nescafe</span>
        </div>
      );

    case 'canteen':
      return (
        <div className="w-16 h-16 rounded-2xl bg-[#2D6A4F] flex flex-col items-center justify-center text-white shadow-sm p-1">
          <UtensilsCrossed className="w-5 h-5 text-emerald-100 mb-0.5" />
          <span className="text-[10px] font-bold">Canteen</span>
        </div>
      );

    case 'buddys-bistro':
      return (
        <div className="w-16 h-16 rounded-2xl bg-[#F77F00] flex flex-col items-center justify-center text-white shadow-sm p-1 text-center">
          <span className="text-[10px] font-black leading-tight">Buddy's</span>
          <span className="text-[8px] font-semibold text-stone-100">Bistro</span>
        </div>
      );

    case 'chutar-putar':
      return (
        <div className="w-16 h-16 rounded-2xl bg-[#E76F51] flex flex-col items-center justify-center text-white shadow-sm p-1 text-center">
          <Flame className="w-4 h-4 text-amber-200 mb-0.5" />
          <span className="text-[8px] font-black leading-tight">Chutar Putar</span>
        </div>
      );

    case 'food-court':
      return (
        <div className="w-16 h-16 rounded-2xl bg-[#1B4D36] flex flex-col items-center justify-center text-white shadow-sm p-1">
          <Store className="w-5 h-5 text-emerald-200 mb-0.5" />
          <span className="text-[9px] font-bold text-center leading-none mt-0.5">Food Court</span>
        </div>
      );

    case 'sip-n-bites':
      return (
        <div className="w-16 h-16 rounded-2xl bg-[#0EA5E9] flex flex-col items-center justify-center text-white shadow-sm p-1 text-center">
          <CupSoda className="w-5 h-5 text-cyan-100 mb-0.5" />
          <span className="text-[8px] font-extrabold leading-tight">Sip n Bites</span>
        </div>
      );

    case 'x-burgers':
      return (
        <div className="w-16 h-16 rounded-2xl bg-[#1E293B] flex flex-col items-center justify-center text-white shadow-sm p-1 text-center">
          <Sandwich className="w-5 h-5 text-amber-400 mb-0.5" />
          <span className="text-[9px] font-black text-amber-400 tracking-tight">X Burgers</span>
        </div>
      );

    case 'thick-let-to':
      return (
        <div className="w-16 h-16 rounded-2xl bg-[#582F0E] flex flex-col items-center justify-center text-white shadow-sm p-1 text-center">
          <IceCream className="w-5 h-5 text-amber-200 mb-0.5" />
          <span className="text-[8px] font-bold leading-none text-amber-100 mt-0.5">Thick let to</span>
        </div>
      );

    default:
      return (
        <div className="w-16 h-16 rounded-2xl bg-[#1B4D36] flex flex-col items-center justify-center text-white shadow-sm p-1">
          <Store className="w-5 h-5 text-emerald-200" />
          <span className="text-[9px] font-bold truncate max-w-14 text-center">{name}</span>
        </div>
      );
  }
}
