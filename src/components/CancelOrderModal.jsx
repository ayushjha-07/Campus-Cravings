import React, { useState } from 'react';
import { 
  AlertTriangle, 
  X, 
  CheckCircle2, 
  Info,
  Clock,
  ArrowRight
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { isOrderEligibleForCancellation } from '../utils/orderUtils';

export default function CancelOrderModal({ order, isOpen, onClose, onCancelled }) {
  const { cancelOrder } = useCart();
  const [reason, setReason] = useState('Lecture schedule changed');
  const [customNote, setCustomNote] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  if (!isOpen || !order) return null;

  const isEligible = isOrderEligibleForCancellation(order);

  const predefinedReasons = [
    'Lecture / class schedule changed',
    'Placed order at wrong campus outlet',
    'Ordered incorrect food items',
    'Break time ended sooner than expected',
    'Change of mind / friend already bought food',
    'Other reason'
  ];

  const handleConfirmCancel = () => {
    if (!isEligible) {
      setErrorMsg('This order has already entered kitchen preparation and can no longer be cancelled.');
      return;
    }

    setIsSubmitting(true);
    const selectedReason = reason === 'Other reason' && customNote.trim() 
      ? customNote.trim() 
      : reason;

    const res = cancelOrder(order.id || order.orderNumber, selectedReason);
    setIsSubmitting(false);

    if (res.success) {
      if (onCancelled) onCancelled(order.id);
      onClose();
    } else {
      setErrorMsg(res.message || 'Failed to cancel order.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-3xl max-w-md w-full border border-stone-200 shadow-2xl p-6 sm:p-7 space-y-5 animate-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 border border-rose-200 flex items-center justify-center shrink-0">
              <AlertTriangle className="w-6 h-6 stroke-[2.2]" />
            </div>
            <div>
              <h3 className="text-lg font-black text-stone-900 tracking-tight">
                Cancel Order #{order.orderNumber || order.id}?
              </h3>
              <p className="text-stone-500 text-xs">
                Outlet: <strong className="text-stone-700">{order.outletName}</strong>
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-stone-700 rounded-xl hover:bg-stone-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Eligibility Check Notice */}
        {!isEligible ? (
          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs space-y-1">
            <div className="font-bold flex items-center gap-1.5 text-amber-950">
              <Clock className="w-4 h-4 text-amber-600 shrink-0" />
              <span>Order Ineligible for Cancellation</span>
            </div>
            <p className="leading-relaxed pl-5.5 text-amber-800">
              This order's status is <strong>{order.status}</strong>. Campus outlets cannot accept cancellations once food preparation has commenced.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200/80 text-xs text-stone-600 space-y-1">
              <p>
                Are you sure you want to cancel this order? This action cannot be undone.
              </p>
              <p className="text-stone-500 text-[11px]">
                {order.paymentMethod?.includes('Online')
                  ? '• A demo simulation refund has been flagged for your account.'
                  : '• No payment has been taken; you will not owe anything at the pickup counter.'}
              </p>
            </div>

            {/* Reason selector */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-stone-800">
                Please select a reason for cancellation:
              </label>
              <div className="space-y-1.5">
                {predefinedReasons.map(r => (
                  <label
                    key={r}
                    className={`flex items-center gap-2.5 p-2.5 rounded-xl border text-xs cursor-pointer transition-all ${
                      reason === r
                        ? 'border-rose-300 bg-rose-50/50 text-rose-950 font-medium'
                        : 'border-stone-200 bg-white hover:bg-stone-50 text-stone-700'
                    }`}
                  >
                    <input
                      type="radio"
                      name="cancel_reason"
                      checked={reason === r}
                      onChange={() => setReason(r)}
                      className="text-rose-600 focus:ring-rose-500"
                    />
                    <span>{r}</span>
                  </label>
                ))}
              </div>
            </div>

            {reason === 'Other reason' && (
              <textarea
                value={customNote}
                onChange={(e) => setCustomNote(e.target.value)}
                placeholder="Briefly describe why you are cancelling..."
                className="w-full text-xs p-3 rounded-xl border border-stone-200 focus:outline-hidden focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 resize-none h-18"
              />
            )}

            {errorMsg && (
              <p className="text-xs text-rose-600 font-semibold bg-rose-50 p-2.5 rounded-xl border border-rose-200">
                {errorMsg}
              </p>
            )}
          </div>
        )}

        {/* Modal Actions */}
        <div className="flex items-center gap-3 pt-2">
          <button
            onClick={onClose}
            className="flex-1 py-3 px-4 rounded-xl border border-stone-200 hover:bg-stone-50 text-stone-700 text-xs font-bold transition-colors cursor-pointer"
          >
            Keep My Order
          </button>

          {isEligible && (
            <button
              onClick={handleConfirmCancel}
              disabled={isSubmitting}
              className="flex-1 py-3 px-4 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold transition-colors shadow-xs flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
            >
              {isSubmitting ? 'Cancelling...' : 'Confirm Cancellation'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
