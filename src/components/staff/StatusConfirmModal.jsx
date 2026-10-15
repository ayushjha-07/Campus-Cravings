import React from 'react';
import { AlertCircle, CheckCircle2, XCircle, X } from 'lucide-react';

export default function StatusConfirmModal({ 
  isOpen, 
  title, 
  message, 
  confirmText = 'Confirm', 
  cancelText = 'Cancel', 
  confirmColor = 'emerald', // 'emerald', 'blue', 'rose'
  onConfirm, 
  onClose,
  details = null
}) {
  if (!isOpen) return null;

  const colorStyles = {
    emerald: 'bg-emerald-600 hover:bg-emerald-700 text-white',
    blue: 'bg-blue-600 hover:bg-blue-700 text-white',
    rose: 'bg-rose-600 hover:bg-rose-700 text-white',
    amber: 'bg-amber-600 hover:bg-amber-700 text-white'
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 border border-stone-200 shadow-2xl animate-in zoom-in-95 duration-200"
        role="dialog"
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 ${
              confirmColor === 'rose' 
                ? 'bg-rose-50 text-rose-600 border border-rose-200' 
                : 'bg-emerald-50 text-emerald-600 border border-emerald-200'
            }`}>
              {confirmColor === 'rose' ? (
                <XCircle className="w-6 h-6" />
              ) : (
                <CheckCircle2 className="w-6 h-6" />
              )}
            </div>
            <div>
              <h3 className="text-base font-black text-stone-900">
                {title}
              </h3>
              <p className="text-xs text-stone-500">
                CGC Outlet Counter Action
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-stone-400 hover:text-stone-700 rounded-lg cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-xs text-stone-600 leading-relaxed">
          {message}
        </p>

        {details && (
          <div className="p-3 bg-stone-50 rounded-2xl border border-stone-200 text-xs text-stone-700 space-y-1">
            {details}
          </div>
        )}

        <div className="flex items-center gap-2 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-2.5 px-4 rounded-xl border border-stone-200 text-stone-600 hover:bg-stone-50 text-xs font-bold transition-colors cursor-pointer"
          >
            {cancelText}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-bold shadow-xs transition-colors cursor-pointer ${
              colorStyles[confirmColor] || colorStyles.emerald
            }`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
