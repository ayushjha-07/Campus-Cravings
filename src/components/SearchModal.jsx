import React, { useEffect, useRef } from 'react';
import { X, Search } from 'lucide-react';
import SearchBar from './SearchBar';

export default function SearchModal({ isOpen, onClose }) {
  const modalRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        ref={modalRef}
        className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-stone-200 p-4 sm:p-6 space-y-4 animate-in zoom-in-95 duration-150"
      >
        <div className="flex items-center justify-between pb-2 border-b border-stone-100">
          <div className="flex items-center gap-2 text-xs font-bold text-stone-500 uppercase tracking-wider">
            <Search className="w-4 h-4 text-[#1B4D36]" />
            <span>Search Campus Cravings</span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <SearchBar onSelect={onClose} />

        <div className="pt-2 text-center text-xs text-stone-400">
          Search all 17 CGC Mohali food outlets and student cafeteria dishes
        </div>
      </div>
    </div>
  );
}
