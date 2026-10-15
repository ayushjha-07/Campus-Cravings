import React from 'react';
import { Link } from 'react-router-dom';
import { UtensilsCrossed, Home, Search } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div className="min-h-[75vh] flex flex-col items-center justify-center px-4 py-16 text-center max-w-md mx-auto">
      <div className="w-16 h-16 rounded-3xl bg-amber-50 text-amber-600 flex items-center justify-center mb-4">
        <UtensilsCrossed className="w-8 h-8" />
      </div>
      <h1 className="text-4xl font-black text-stone-900 mb-2">404</h1>
      <h2 className="text-xl font-bold text-stone-800 mb-2">Page Not Found on Campus</h2>
      <p className="text-stone-500 text-sm mb-6 leading-relaxed">
        The food stall, page, or link you are looking for doesn't exist or might have moved to another campus block.
      </p>
      <div className="flex gap-3">
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#1B4D36] text-white text-xs font-bold hover:bg-[#153C2A] transition-colors"
        >
          <Home className="w-4 h-4" />
          <span>Back to Campus Home</span>
        </Link>
      </div>
    </div>
  );
}
