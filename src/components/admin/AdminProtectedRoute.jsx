import React, { useState } from 'react';
import { useAdmin } from '../../context/AdminContext';
import { ShieldCheck, Lock, ArrowRight, Sparkles, Building2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function AdminProtectedRoute({ children }) {
  const { isAdminLoggedIn, adminLogin } = useAdmin();
  const [email, setEmail] = useState('dean.welfare@cgc.edu.in');
  const [password, setPassword] = useState('admin123');

  if (isAdminLoggedIn) {
    return children;
  }

  const handleUnlock = (e) => {
    e.preventDefault();
    adminLogin(email, password);
  };

  return (
    <div className="min-h-screen bg-[#F7F5F0] flex items-center justify-center p-4 sm:p-6 font-sans antialiased text-stone-900">
      <div className="max-w-md w-full bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/90 shadow-xl space-y-6">
        
        {/* Header Branding */}
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#0D3828] to-[#144834] text-white flex items-center justify-center mx-auto shadow-md">
            <Building2 className="w-7 h-7 text-[#EAA044]" />
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-stone-900 tracking-tight">
            CGC University Administration
          </h1>
          <p className="text-stone-500 text-xs sm:text-sm">
            Campus Cravings Operations & Cafeteria Management Portal
          </p>
        </div>

        {/* Prototype Info Box */}
        <div className="p-4 rounded-2xl bg-amber-50/90 border border-amber-200/80 text-amber-950 text-xs space-y-1.5">
          <div className="flex items-center gap-1.5 font-bold text-amber-900">
            <ShieldCheck className="w-4 h-4 text-amber-700 shrink-0" />
            <span>Academic Demonstration Environment</span>
          </div>
          <p className="text-[11px] leading-relaxed text-amber-900/90">
            For evaluation, you can unlock the full administrator dashboard with one click below or use demo credentials.
          </p>
        </div>

        {/* Demo Sign In Form */}
        <form onSubmit={handleUnlock} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1">
              Administrator Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-xs focus:ring-2 focus:ring-[#0D3828] focus:border-transparent outline-hidden"
              placeholder="dean.welfare@cgc.edu.in"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1">
              Demo Access Code
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-xs focus:ring-2 focus:ring-[#0D3828] focus:border-transparent outline-hidden"
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 px-4 rounded-xl bg-[#0D3828] hover:bg-[#144834] text-white text-xs font-black tracking-wide shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Unlock Admin Demo Portal</span>
            <ArrowRight className="w-4 h-4 text-[#EAA044]" />
          </button>
        </form>

        {/* Back Link */}
        <div className="pt-2 border-t border-stone-100 text-center">
          <Link
            to="/"
            className="text-xs text-stone-500 hover:text-[#0D3828] font-bold transition-colors"
          >
            ← Return to Student Ordering Portal
          </Link>
        </div>

      </div>
    </div>
  );
}
