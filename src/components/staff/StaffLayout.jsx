import React, { useState } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { OUTLETS } from '../../data/outlets';
import { useCart } from '../../context/CartContext';
import { useAdmin } from '../../context/AdminContext';
import { getOutletOrders } from '../../utils/orderUtils';
import { 
  Store, 
  LayoutDashboard, 
  ReceiptText,
  LogOut, 
  UtensilsCrossed, 
  ExternalLink, 
  ChevronDown, 
  Clock, 
  ShieldCheck, 
  Sparkles, 
  BellRing,
  Menu,
  X,
  ChefHat,
  Info,
  Layers
} from 'lucide-react';
import ThemeToggle from '../ThemeToggle';

export default function StaffLayout({ children }) {
  const { outletId = 'kulhad' } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { orders } = useCart();
  const { staffLogout } = useAdmin();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [currentStaffUser] = useState(() => {
    try {
      const saved = localStorage.getItem('campus_cravings_staff_session');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const handleStaffLogout = () => {
    if (staffLogout) staffLogout();
    try {
      localStorage.removeItem('campus_cravings_staff_session');
    } catch {}
    navigate('/login', { replace: true });
  };

  // Active outlet details
  const currentOutlet = OUTLETS.find(o => o.id === outletId) || OUTLETS[0];

  // Outlet-filtered orders for badge counts
  const outletOrders = getOutletOrders(orders, currentOutlet.id);
  const pendingOrdersCount = outletOrders.filter(
    o => o.status === 'Order Placed' || o.status === 'Placed'
  ).length;
  const preparingOrdersCount = outletOrders.filter(
    o => o.status === 'Preparing'
  ).length;

  const navLinks = [
    {
      label: 'Overview',
      path: `/staff/${currentOutlet.id}`,
      icon: LayoutDashboard,
      exact: true
    },
    {
      label: 'Incoming Orders',
      path: `/staff/${currentOutlet.id}/orders`,
      icon: ReceiptText,
      badge: pendingOrdersCount > 0 ? `${pendingOrdersCount} new` : null,
      badgeColor: 'amber'
    },
    {
      label: 'Menu Management',
      path: `/staff/${currentOutlet.id}/menu`,
      icon: UtensilsCrossed
    }
  ];

  const handleSwitchOutlet = (newOutletId) => {
    // Keep current subpath (/orders, /menu, or root)
    if (location.pathname.includes('/orders')) {
      navigate(`/staff/${newOutletId}/orders`);
    } else if (location.pathname.includes('/menu')) {
      navigate(`/staff/${newOutletId}/menu`);
    } else {
      navigate(`/staff/${newOutletId}`);
    }
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#F7F5F0] text-stone-900 flex flex-col antialiased">
      
      {/* Top Header Bar */}
      <header className="sticky top-0 z-40 bg-[#0D3828] text-white border-b border-emerald-900/60 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          
          {/* Logo & Counter Terminal Identity */}
          <div className="flex items-center gap-3">
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="p-1 rounded-xl bg-white shadow-2xs group-hover:scale-105 transition-transform shrink-0">
                <img
                  src="/images/brand/logo.png"
                  alt="Campus Cravings Logo"
                  className="h-8 w-auto object-contain"
                />
              </div>
              <div>
                <span className="font-black text-sm tracking-tight block leading-tight text-white">
                  Campus Cravings
                </span>
                <span className="text-[10px] text-amber-300 font-medium block uppercase tracking-wider">
                  Staff Kitchen Terminal
                </span>
              </div>
            </Link>

            {/* Terminal Live Pill */}
            <div className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-900/80 border border-emerald-700/60 text-[11px] text-emerald-200 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Counter POS Active</span>
            </div>
          </div>

          {/* Center / Right: Outlet Selector & Staff Profile */}
          <div className="flex items-center gap-3">
            
            {/* Quick Outlet Switcher Dropdown */}
            <div className="relative">
              <div className="flex items-center gap-2 bg-[#144834] border border-emerald-700/70 rounded-xl px-3 py-1.5 text-xs text-white">
                <Store className="w-3.5 h-3.5 text-[#EAA044] shrink-0" />
                <span className="text-emerald-300 hidden md:inline">Outlet:</span>
                <select
                  value={currentOutlet.id}
                  onChange={(e) => handleSwitchOutlet(e.target.value)}
                  className="bg-transparent text-white font-bold text-xs focus:outline-hidden cursor-pointer"
                >
                  {OUTLETS.map(o => (
                    <option key={o.id} value={o.id} className="bg-stone-900 text-white">
                      {o.name} ({o.shortCategory})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Staff Profile Pill */}
            <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/10 text-xs border border-white/10">
              <span className="w-6 h-6 rounded-lg bg-[#EAA044] text-[#0D3828] flex items-center justify-center font-bold text-[11px]">
                {currentStaffUser?.name ? currentStaffUser.name.split(' ').map(n=>n[0]).join('').slice(0,2) : 'ST'}
              </span>
              <div className="text-left leading-none">
                <div className="font-bold text-white text-[11px]">{currentStaffUser?.name || 'Counter Operator'}</div>
                <div className="text-[9px] text-emerald-200">{currentStaffUser?.role || 'Staff Operator'}</div>
              </div>
            </div>

            {/* Theme Toggle Button */}
            <ThemeToggle className="bg-white/10 hover:bg-white/20 text-white border-white/10" />

            {/* Back to Student Portal Button */}
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition-colors border border-white/10"
              title="Return to Student Food Ordering View"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Student View</span>
            </Link>

            {/* Staff Logout Button */}
            <button
              type="button"
              onClick={handleStaffLogout}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-rose-900/40 text-white hover:text-rose-200 text-xs font-semibold transition-colors border border-white/10 cursor-pointer"
              title="Log out of Staff Terminal"
            >
              <LogOut className="w-3.5 h-3.5 text-rose-300" />
              <span className="hidden sm:inline">Logout</span>
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-white hover:bg-white/10 transition-colors"
              aria-label="Toggle staff menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

          </div>
        </div>
      </header>

      {/* Main Container with Sidebar (Desktop) */}
      <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col lg:flex-row gap-6">
        
        {/* Desktop Sidebar Navigation */}
        <aside className="hidden lg:block w-64 shrink-0 space-y-5">
          
          {/* Active Outlet Card */}
          <div className="bg-white rounded-3xl p-5 border border-stone-200/90 shadow-2xs space-y-3">
            <div className="flex items-start justify-between gap-2">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#0D3828] to-[#144834] text-white flex items-center justify-center font-black text-xl shadow-xs">
                {currentOutlet.name[0]}
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                Live Outlet
              </span>
            </div>

            <div>
              <h2 className="font-black text-stone-900 text-base leading-tight">
                {currentOutlet.name}
              </h2>
              <p className="text-stone-500 text-xs mt-0.5 line-clamp-1">
                {currentOutlet.location}
              </p>
            </div>

            <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-[11px] text-stone-500">
              <span>Avg Prep Time:</span>
              <strong className="text-stone-800">{currentOutlet.prepTime || '10-15 mins'}</strong>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="bg-white rounded-3xl p-3 border border-stone-200/90 shadow-2xs space-y-1">
            <div className="px-3 py-2 text-[10px] uppercase font-bold text-stone-400 tracking-wider">
              Staff Counter Controls
            </div>

            {navLinks.map(link => {
              const isActive = link.exact 
                ? location.pathname === link.path 
                : location.pathname.startsWith(link.path);
              const Icon = link.icon;

              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-xs font-bold transition-all ${
                    isActive
                      ? 'bg-[#0D3828] text-white shadow-xs'
                      : 'text-stone-700 hover:bg-stone-100/80 hover:text-stone-900'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="w-4 h-4" />
                    <span>{link.label}</span>
                  </div>

                  {link.badge && (
                    <span className="text-[10px] font-mono font-bold bg-[#EAA044] text-white px-2 py-0.5 rounded-full animate-pulse">
                      {link.badge}
                    </span>
                  )}
                </Link>
              );
            })}

            <div className="pt-2 border-t border-stone-100">
              <Link
                to={`/outlet/${currentOutlet.id}`}
                target="_blank"
                className="flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-xs font-semibold text-stone-600 hover:bg-emerald-50 hover:text-[#0D3828] transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <ExternalLink className="w-4 h-4 text-[#0D3828]" />
                  <span>View Student Menu</span>
                </div>
                <span className="text-[10px] text-stone-400">↗</span>
              </Link>
            </div>
          </nav>

          {/* Academic Prototype Notice */}
          <div className="p-4 rounded-3xl bg-amber-50/90 border border-amber-200/80 text-amber-950 text-xs space-y-1.5">
            <div className="flex items-center gap-1.5 font-bold text-amber-900">
              <ShieldCheck className="w-4 h-4 text-amber-700 shrink-0" />
              <span>Demo Staff Environment</span>
            </div>
            <p className="text-[11px] leading-relaxed text-amber-900/90">
              This terminal prototype runs in demonstration mode for CGC University, Mohali. All order transitions and menu edits persist locally in your browser.
            </p>
          </div>

        </aside>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white rounded-3xl p-4 border border-stone-200 shadow-lg space-y-3 animate-in fade-in">
            <div className="flex items-center justify-between pb-2 border-b border-stone-100">
              <div className="text-xs font-bold text-stone-900">
                Staff Terminal Menu • {currentOutlet.name}
              </div>
              <button onClick={() => setMobileMenuOpen(false)} className="text-stone-400 p-1">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-3 gap-2">
              {navLinks.map(link => {
                const isActive = link.exact ? location.pathname === link.path : location.pathname.startsWith(link.path);
                const Icon = link.icon;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`p-3 rounded-2xl text-center text-xs font-bold flex flex-col items-center justify-center gap-1.5 transition-all ${
                      isActive ? 'bg-[#0D3828] text-white' : 'bg-stone-50 text-stone-700 hover:bg-stone-100'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{link.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        )}

        {/* Main Content Area */}
        <main className="flex-1 min-w-0">
          {children}
        </main>

      </div>
    </div>
  );
}
