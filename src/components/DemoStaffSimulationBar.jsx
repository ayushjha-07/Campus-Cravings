import React, { useState } from 'react';
import { 
  Store, 
  ChefHat, 
  Clock, 
  PackageCheck, 
  Sparkles, 
  ChevronDown, 
  ChevronUp,
  Info,
  ShieldAlert
} from 'lucide-react';
import { useCart } from '../context/CartContext';

/**
 * DemoStaffSimulationBar
 * 
 * Separates outlet staff kitchen controls from the student interface.
 * Strictly adheres to: "Do not allow students to mark their own orders as prepared or collected.
 * Prepare the application for future backend integration so that outlet staff can update statuses 
 * and students can see those changes."
 */
export default function DemoStaffSimulationBar({ order }) {
  const { updateOrderStatus } = useCart();
  const [isOpen, setIsOpen] = useState(false);

  if (!order || order.status === 'Cancelled') return null;

  const currentStatus = order.status;

  const statusOptions = [
    { key: 'Confirmed', label: '1. Confirmed', desc: 'Accept order in kitchen' },
    { key: 'Preparing', label: '2. Preparing', desc: 'Food being cooked' },
    { key: 'Ready for Pickup', label: '3. Ready for Pickup', desc: 'Notify student to collect' },
    { key: 'Collected', label: '4. Collected', desc: 'Handed over at counter' }
  ];

  const handleUpdate = (newStatus) => {
    updateOrderStatus(order.id || order.orderNumber, newStatus);
  };

  return (
    <div className="bg-stone-100/90 border border-stone-300/80 rounded-2xl overflow-hidden text-xs">
      {/* Header toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-2.5 flex items-center justify-between text-left hover:bg-stone-200/60 transition-colors"
      >
        <div className="flex items-center gap-2 text-stone-700">
          <Store className="w-4 h-4 text-[#0D3828]" />
          <span className="font-bold">Outlet Staff Terminal Simulator</span>
          <span className="text-[10px] bg-stone-200 text-stone-700 px-2 py-0.5 rounded-full font-mono">
            Demo / Vendor View
          </span>
        </div>
        <div className="flex items-center gap-1 text-stone-500 text-[11px]">
          <span>{isOpen ? 'Hide Simulator' : 'Test Kitchen Status Update'}</span>
          {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </div>
      </button>

      {/* Expanded controls */}
      {isOpen && (
        <div className="p-4 bg-white border-t border-stone-200/90 space-y-3">
          <div className="flex items-start gap-2 text-amber-900 bg-amber-50 p-2.5 rounded-xl border border-amber-200/70 text-[11px] leading-relaxed">
            <Info className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            <div>
              <strong>Why is this here?</strong> In production, campus outlet staff update these stages from their kitchen counter POS terminal via real-time WebSocket. For academic testing, you can simulate vendor kitchen updates below to verify student status tracking.
            </div>
          </div>

          <div>
            <div className="text-[11px] font-bold text-stone-600 uppercase tracking-wider mb-2">
              Advance Outlet Status for Token #{order.pickupCode || order.pickupToken}:
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {statusOptions.map(opt => {
                const isActive = currentStatus === opt.key;
                return (
                  <button
                    key={opt.key}
                    onClick={() => handleUpdate(opt.key)}
                    className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                      isActive
                        ? 'bg-[#0D3828] text-white border-[#0D3828] shadow-xs'
                        : 'bg-stone-50 hover:bg-stone-100 border-stone-200 text-stone-800'
                    }`}
                  >
                    <div className="font-bold text-xs">{opt.label}</div>
                    <div className={`text-[10px] truncate ${isActive ? 'text-emerald-200' : 'text-stone-400'}`}>
                      {opt.desc}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
