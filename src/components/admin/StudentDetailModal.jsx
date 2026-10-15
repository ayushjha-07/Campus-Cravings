import React from 'react';
import { X, User, Mail, Phone, Building2, ShoppingBag, ShieldAlert, CheckCircle2, RotateCcw, Calendar } from 'lucide-react';

export default function StudentDetailModal({ isOpen, onClose, student, onToggleStatus, onResetPassword }) {
  if (!isOpen || !student) return null;

  const isActive = student.status === 'Active';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-3xl max-w-lg w-full shadow-2xl border border-stone-200 overflow-hidden">
        
        {/* Header */}
        <div className="p-5 border-b border-stone-100 flex items-center justify-between bg-stone-50/50">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#0D3828] to-[#144834] text-white flex items-center justify-center font-black text-lg shadow-xs">
              {student.name[0]}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-black text-stone-900 text-base leading-tight">
                  {student.name}
                </h3>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md border ${
                  isActive
                    ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                    : 'bg-red-50 text-red-800 border-red-200'
                }`}>
                  {student.status || 'Active'}
                </span>
              </div>
              <p className="text-stone-500 text-xs font-mono mt-0.5">
                Roll No: {student.studentId || student.rollNo}
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
        <div className="p-5 space-y-4 text-xs">
          
          {/* Key Metrics Grid */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 rounded-2xl bg-stone-50 border border-stone-200/80">
              <span className="text-stone-500 text-[11px] block">Total Orders Placed</span>
              <strong className="text-stone-900 text-base font-black">
                {student.totalOrders || 0} Orders
              </strong>
            </div>

            <div className="p-3 rounded-2xl bg-stone-50 border border-stone-200/80">
              <span className="text-stone-500 text-[11px] block">Cumulative Spending</span>
              <strong className="text-emerald-800 text-base font-black">
                ₹{student.totalSpent ? student.totalSpent.toLocaleString('en-IN') : '0'}
              </strong>
            </div>
          </div>

          {/* Academic & Contact Details */}
          <div className="p-4 rounded-2xl border border-stone-200 space-y-2.5">
            <div className="flex items-center justify-between text-stone-600">
              <span className="flex items-center gap-1.5 text-stone-500">
                <Mail className="w-3.5 h-3.5" /> Email:
              </span>
              <span className="font-bold text-stone-800">{student.email}</span>
            </div>

            <div className="flex items-center justify-between text-stone-600">
              <span className="flex items-center gap-1.5 text-stone-500">
                <Phone className="w-3.5 h-3.5" /> Contact:
              </span>
              <span className="font-bold text-stone-800">{student.phone}</span>
            </div>

            <div className="flex items-center justify-between text-stone-600">
              <span className="flex items-center gap-1.5 text-stone-500">
                <Building2 className="w-3.5 h-3.5" /> Department:
              </span>
              <span className="font-bold text-stone-800 text-right max-w-[200px] truncate">
                {student.department || 'Computer Science & Engineering'}
              </span>
            </div>

            <div className="flex items-center justify-between text-stone-600">
              <span className="text-stone-500">Hostel / Campus Residence:</span>
              <span className="font-bold text-stone-800 text-right">
                {student.hostel || 'Campus Day Scholar'}
              </span>
            </div>

            <div className="flex items-center justify-between text-stone-600">
              <span className="flex items-center gap-1.5 text-stone-500">
                <Calendar className="w-3.5 h-3.5" /> Enrolled Since:
              </span>
              <span className="font-mono text-stone-800">
                {student.createdAt ? new Date(student.createdAt).toLocaleDateString() : 'Jan 2026'}
              </span>
            </div>
          </div>

          {/* Security & Disciplinary Notice */}
          <div className="p-3.5 rounded-2xl bg-amber-50/80 border border-amber-200/80 text-amber-950 text-[11px] leading-relaxed">
            <strong>Campus Policy Reminder:</strong> Student accounts can be temporarily suspended by authorized administration in the event of repeated uncollected perishable orders or cafeteria violations.
          </div>

          {/* Admin Management Actions */}
          <div className="pt-3 border-t border-stone-100 flex items-center justify-between gap-2">
            <button
              onClick={() => onResetPassword(student.studentId)}
              className="px-3 py-2 rounded-xl border border-stone-200 text-stone-700 hover:bg-stone-50 font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5 text-stone-500" />
              <span>Reset Demo Password</span>
            </button>

            <button
              onClick={() => onToggleStatus(student.studentId)}
              className={`px-4 py-2 rounded-xl text-white font-bold flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer ${
                isActive
                  ? 'bg-rose-700 hover:bg-rose-800'
                  : 'bg-emerald-700 hover:bg-emerald-800'
              }`}
            >
              {isActive ? (
                <>
                  <ShieldAlert className="w-3.5 h-3.5" />
                  <span>Suspend Account</span>
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Reactivate Account</span>
                </>
              )}
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
