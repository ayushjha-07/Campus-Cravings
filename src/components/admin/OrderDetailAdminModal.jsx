import React, { useState } from 'react';
import { 
  X, 
  ReceiptText, 
  Clock, 
  User, 
  MapPin, 
  CreditCard, 
  CheckCircle2, 
  AlertCircle, 
  ShieldAlert, 
  FileText,
  Save,
  Ticket
} from 'lucide-react';

export default function OrderDetailAdminModal({ isOpen, onClose, order, onCancelOrder, onSaveNote }) {
  const [adminNote, setAdminNote] = useState(order?.adminNote || '');
  const [cancelReason, setCancelReason] = useState('Administrative Exception / Kitchen Issue');
  const [showCancelPrompt, setShowCancelPrompt] = useState(false);

  if (!isOpen || !order) return null;

  const isCancelled = order.status === 'Cancelled';
  const isCollected = order.status === 'Collected';

  const handleSaveNote = (e) => {
    e.preventDefault();
    onSaveNote(order.id, adminNote);
  };

  const handleConfirmCancel = () => {
    onCancelOrder(order.id, cancelReason);
    setShowCancelPrompt(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-stone-200 overflow-hidden">
        
        {/* Header */}
        <div className="p-5 border-b border-stone-100 flex items-center justify-between bg-stone-50/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#0D3828] text-white flex items-center justify-center">
              <ReceiptText className="w-5 h-5 text-[#EAA044]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-mono font-black text-stone-900 text-base leading-tight">
                  {order.id || order.orderNumber}
                </h3>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md border ${
                  order.status === 'Collected' 
                    ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                    : order.status === 'Cancelled'
                    ? 'bg-rose-50 text-rose-800 border-rose-200'
                    : 'bg-amber-50 text-amber-800 border-amber-200'
                }`}>
                  {order.status}
                </span>
              </div>
              <p className="text-stone-500 text-xs mt-0.5">
                Token: <strong className="font-mono text-stone-800">{order.pickupToken || order.pickupCode}</strong> • Placed: {order.orderDate || 'Today'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 space-y-4 overflow-y-auto flex-1 text-xs">
          
          {/* Student & Outlet Context */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-3 rounded-2xl bg-stone-50 border border-stone-200/80 space-y-1.5">
              <div className="flex items-center gap-1.5 text-stone-500 text-[11px] font-bold uppercase tracking-wider">
                <User className="w-3.5 h-3.5 text-stone-400" />
                <span>Student Information</span>
              </div>
              <div className="font-bold text-stone-900 text-sm">{order.studentName}</div>
              <div className="text-stone-500 font-mono">ID: {order.studentId || order.rollNo}</div>
              <div className="text-stone-500">Contact: {order.contactNumber}</div>
            </div>

            <div className="p-3 rounded-2xl bg-stone-50 border border-stone-200/80 space-y-1.5">
              <div className="flex items-center gap-1.5 text-stone-500 text-[11px] font-bold uppercase tracking-wider">
                <MapPin className="w-3.5 h-3.5 text-stone-400" />
                <span>Outlet & Counter</span>
              </div>
              <div className="font-bold text-stone-900 text-sm">{order.outletName}</div>
              <div className="text-stone-500">{order.outletLocation || 'Block 2 Food Court'}</div>
              <div className="text-emerald-800 font-medium">Pickup Token: {order.pickupToken || order.pickupCode}</div>
            </div>
          </div>

          {/* Ordered Food Items Breakdown */}
          <div className="border border-stone-200 rounded-2xl overflow-hidden">
            <div className="bg-stone-50 px-3.5 py-2 border-b border-stone-200 font-bold text-stone-700 text-[11px] uppercase tracking-wider">
              Food Items Summary ({order.items?.length || 0} items)
            </div>
            <div className="divide-y divide-stone-100">
              {order.items?.map((item, idx) => (
                <div key={idx} className="p-3 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="w-6 h-6 rounded-lg bg-stone-100 text-stone-700 font-bold flex items-center justify-center font-mono">
                      {item.quantity}x
                    </span>
                    <div>
                      <div className="font-bold text-stone-800">{item.name}</div>
                      <div className="text-[10px] text-stone-400">
                        {item.outletName || order.outletName} • ₹{item.price} each
                      </div>
                    </div>
                  </div>
                  <div className="font-mono font-bold text-stone-900">
                    ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                  </div>
                </div>
              ))}
            </div>

            <div className="p-3 bg-stone-50/60 border-t border-stone-200 space-y-1 text-stone-600">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span className="font-mono">₹{order.subtotal || order.total}</span>
              </div>
              <div className="flex justify-between">
                <span>Campus Packaging:</span>
                <span className="font-mono">₹{order.packagingFee || 5}</span>
              </div>
              <div className="flex justify-between font-bold text-stone-900 text-sm pt-1 border-t border-stone-200">
                <span>Total Amount:</span>
                <span className="font-mono text-emerald-800">₹{order.total}</span>
              </div>
            </div>
          </div>

          {/* Payment Status & Integrity */}
          <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200 space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-stone-500 font-bold">Payment Method:</span>
              <span className="font-bold text-stone-800">{order.paymentMethod}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-stone-500 font-bold">Payment Status:</span>
              <span className="font-bold text-emerald-800">{order.paymentStatus}</span>
            </div>
            {order.pickupNote && order.pickupNote !== 'None' && (
              <div className="pt-2 border-t border-stone-200 text-amber-900">
                <strong>Student Note:</strong> "{order.pickupNote}"
              </div>
            )}
          </div>

          {/* Admin Audit Notes */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-stone-700">
              Administrative Audit Note
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={adminNote}
                onChange={(e) => setAdminNote(e.target.value)}
                placeholder="Add confidential administrative or compliance note..."
                className="flex-1 px-3 py-2 rounded-xl border border-stone-200 text-xs focus:ring-2 focus:ring-[#0D3828] outline-hidden"
              />
              <button
                type="button"
                onClick={handleSaveNote}
                className="px-3.5 py-2 rounded-xl bg-[#0D3828] text-white font-bold flex items-center gap-1.5 hover:bg-[#144834] transition-colors cursor-pointer"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Save</span>
              </button>
            </div>
          </div>

          {/* Administrative Force Cancellation Section */}
          {!isCancelled && !isCollected && (
            <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-900 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 font-bold">
                  <ShieldAlert className="w-4 h-4 text-rose-700" />
                  <span>Admin Force Cancellation</span>
                </div>
                {!showCancelPrompt ? (
                  <button
                    type="button"
                    onClick={() => setShowCancelPrompt(true)}
                    className="px-3 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-[11px] transition-colors cursor-pointer"
                  >
                    Cancel Order
                  </button>
                ) : null}
              </div>

              {showCancelPrompt && (
                <div className="pt-2 space-y-2">
                  <p className="text-[11px] text-rose-800">
                    Cancelling will notify both the student and the outlet staff. Please record the official cancellation reason for the audit trail:
                  </p>
                  <select
                    value={cancelReason}
                    onChange={(e) => setCancelReason(e.target.value)}
                    className="w-full px-3 py-1.5 rounded-xl border border-rose-300 bg-white text-xs font-medium text-stone-900 focus:outline-hidden"
                  >
                    <option value="Administrative Exception / Kitchen Issue">Administrative Exception / Kitchen Issue</option>
                    <option value="Student Requested Emergency Cancel">Student Requested Emergency Cancel</option>
                    <option value="Food Out of Stock at Counter">Food Out of Stock at Counter</option>
                    <option value="Unscheduled Campus Power / Gas Interruption">Unscheduled Campus Power / Gas Interruption</option>
                  </select>
                  <div className="flex justify-end gap-2 pt-1">
                    <button
                      type="button"
                      onClick={() => setShowCancelPrompt(false)}
                      className="px-3 py-1 rounded-lg border border-stone-300 text-stone-600 font-bold text-xs"
                    >
                      Dismiss
                    </button>
                    <button
                      type="button"
                      onClick={handleConfirmCancel}
                      className="px-3 py-1 rounded-lg bg-rose-700 hover:bg-rose-800 text-white font-bold text-xs"
                    >
                      Confirm Cancellation
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
