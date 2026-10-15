import React from 'react';
import { ShoppingBag, X, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function CartToast() {
  const { notification, dismissNotification, itemCount, subtotal } = useCart();

  if (!notification) return null;

  return (
    <div className="fixed bottom-20 md:bottom-6 right-4 left-4 sm:left-auto sm:max-w-md z-50 animate-in slide-in-from-bottom-5 duration-300">
      <div className="bg-[#0D3828] text-white rounded-2xl p-4 shadow-2xl border border-emerald-700/60 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-300 flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          </div>
          <div className="min-w-0">
            <div className="text-xs font-bold text-white truncate">
              {notification}
            </div>
            <div className="text-[11px] text-emerald-200/80">
              Cart Total: <strong className="text-white">₹{subtotal}</strong> ({itemCount} items)
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <Link
            to="/cart"
            onClick={dismissNotification}
            className="px-3 py-1.5 rounded-xl bg-white text-[#0D3828] text-xs font-bold hover:bg-emerald-50 transition-colors"
          >
            View Cart
          </Link>
          <button
            onClick={dismissNotification}
            className="p-1 text-emerald-300 hover:text-white rounded-lg"
            aria-label="Dismiss notification"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
