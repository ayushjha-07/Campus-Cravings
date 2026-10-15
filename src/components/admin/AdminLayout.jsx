import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAdmin } from '../../context/AdminContext';
import { 
  LayoutDashboard, 
  Store, 
  ReceiptText, 
  UtensilsCrossed, 
  Users, 
  UserCheck, 
  BarChart3, 
  Bell, 
  Settings, 
  ChevronLeft, 
  ChevronRight, 
  ExternalLink, 
  LogOut, 
  Menu, 
  X, 
  Building2, 
  ShieldCheck, 
  Search, 
  ChefHat, 
  Sparkles,
  Info
} from 'lucide-react';
import ThemeToggle from '../ThemeToggle';

export default function AdminLayout({ children }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { adminUser, adminLogout, unreadCount, settings } = useAdmin();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [globalSearch, setGlobalSearch] = useState('');

  const navLinks = [
    { label: 'Overview', path: '/admin', icon: LayoutDashboard, exact: true },
    { label: 'Food Outlets', path: '/admin/outlets', icon: Store },
    { label: 'All Orders', path: '/admin/orders', icon: ReceiptText },
    { label: 'Menu Management', path: '/admin/menu', icon: UtensilsCrossed },
    { label: 'Students', path: '/admin/students', icon: Users },
    { label: 'Staff Management', path: '/admin/staff', icon: UserCheck },
    { label: 'Analytics & Reports', path: '/admin/analytics', icon: BarChart3 },
    { 
      label: 'Notifications', 
      path: '/admin/notifications', 
      icon: Bell, 
      badge: unreadCount > 0 ? unreadCount : null 
    },
    { label: 'Settings', path: '/admin/settings', icon: Settings }
  ];

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (!globalSearch.trim()) return;
    // Route to orders or outlets based on query
    if (globalSearch.toUpperCase().includes('CGC-') || !isNaN(globalSearch)) {
      navigate(`/admin/orders?q=${encodeURIComponent(globalSearch.trim())}`);
    } else {
      navigate(`/admin/outlets?q=${encodeURIComponent(globalSearch.trim())}`);
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F5F0] text-stone-900 flex flex-col antialiased font-sans">
      
      {/* Top Header Bar */}
      <header className="sticky top-0 z-40 bg-[#0D3828] text-white border-b border-emerald-900/60 shadow-md">
        <div className="w-full px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          
          {/* Logo & Portal Identity */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="hidden lg:flex p-1.5 rounded-lg text-emerald-200 hover:text-white hover:bg-emerald-900/60 transition-colors"
              title={isCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
              aria-label="Toggle sidebar collapse"
            >
              {isCollapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
            </button>

            <Link to="/admin" className="flex items-center gap-2.5 group">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-600 to-[#144834] text-white flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
                <Building2 className="w-5 h-5 text-[#EAA044]" />
              </div>
              <div>
                <span className="font-black text-sm tracking-tight block leading-tight text-white">
                  Campus Cravings
                </span>
                <span className="text-[10px] text-emerald-200/90 font-medium block uppercase tracking-wider">
                  CGC University Admin
                </span>
              </div>
            </Link>

            {/* Campus Operational Status Indicator */}
            <div className="hidden md:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-900/80 border border-emerald-700/60 text-[11px] text-emerald-200 font-medium ml-2">
              <span className={`w-2 h-2 rounded-full ${settings.systemStatus === 'OPEN' ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`} />
              <span>
                {settings.systemStatus === 'OPEN' ? 'Campus Kitchens Active' : settings.systemStatus}
              </span>
            </div>
          </div>

          {/* Center Search Bar */}
          <div className="hidden md:flex flex-1 max-w-md mx-4">
            <form onSubmit={handleSearchSubmit} className="relative w-full">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-emerald-300" />
              <input
                type="text"
                value={globalSearch}
                onChange={(e) => setGlobalSearch(e.target.value)}
                placeholder="Search orders (e.g. CGC-DEMO), outlets, students..."
                className="w-full bg-[#144834]/80 text-white placeholder-emerald-300/70 text-xs rounded-xl pl-9 pr-4 py-2 border border-emerald-700/60 focus:outline-hidden focus:ring-1 focus:ring-[#EAA044]"
              />
            </form>
          </div>

          {/* Right Header Controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Theme Toggle Button */}
            <ThemeToggle className="bg-white/10 hover:bg-white/20 text-white border-white/10" />

            {/* Notifications Bell */}
            <Link
              to="/admin/notifications"
              className="relative p-2 rounded-xl text-emerald-200 hover:text-white hover:bg-white/10 transition-colors"
              title="Notifications"
            >
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-[#EAA044] text-white text-[10px] font-bold flex items-center justify-center animate-pulse">
                  {unreadCount}
                </span>
              )}
            </Link>

            {/* Staff Kitchen Terminal Switcher */}
            <Link
              to="/staff"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition-colors border border-white/10"
              title="Open Cafeteria Counter Terminal"
            >
              <ChefHat className="w-3.5 h-3.5 text-[#EAA044]" />
              <span>Staff POS</span>
            </Link>

            {/* Student Portal Switcher */}
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition-colors border border-white/10"
              title="Return to Student View"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Student View</span>
            </Link>

            {/* Admin Profile Pill */}
            <div className="hidden xl:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/10 text-xs border border-white/10">
              <span className="w-6 h-6 rounded-lg bg-[#EAA044] text-[#0D3828] flex items-center justify-center font-bold text-[11px]">
                HS
              </span>
              <div className="text-left leading-none">
                <div className="font-bold text-white text-[11px]">{adminUser.name}</div>
                <div className="text-[9px] text-emerald-200">{adminUser.role}</div>
              </div>
            </div>

            {/* Logout Button */}
            <button
              onClick={adminLogout}
              className="p-2 rounded-xl text-emerald-200 hover:text-rose-300 hover:bg-white/10 transition-colors cursor-pointer"
              title="Lock Admin Session"
            >
              <LogOut className="w-4 h-4" />
            </button>

            {/* Mobile Menu Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-white hover:bg-white/10 transition-colors cursor-pointer"
              aria-label="Toggle navigation"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

          </div>
        </div>
      </header>

      {/* Main Content Area with Desktop Sidebar */}
      <div className="flex-1 w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col lg:flex-row gap-6">
        
        {/* Desktop Left Sidebar */}
        <aside
          className={`hidden lg:block shrink-0 transition-all duration-300 ${
            isCollapsed ? 'w-20' : 'w-64'
          }`}
        >
          <div className="sticky top-22 space-y-4">
            
            {/* Navigation Card */}
            <nav className="bg-white rounded-3xl p-3 border border-stone-200/90 shadow-2xs space-y-1">
              {!isCollapsed && (
                <div className="px-3 py-2 text-[10px] uppercase font-bold text-stone-400 tracking-wider">
                  Campus Administration
                </div>
              )}

              {navLinks.map((link) => {
                const isActive = link.exact
                  ? location.pathname === link.path
                  : location.pathname.startsWith(link.path);
                const Icon = link.icon;

                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    title={isCollapsed ? link.label : undefined}
                    className={`flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-xs font-bold transition-all ${
                      isActive
                        ? 'bg-[#0D3828] text-white shadow-xs'
                        : 'text-stone-700 hover:bg-stone-100 hover:text-stone-900'
                    } ${isCollapsed ? 'justify-center px-0' : ''}`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="w-4 h-4 shrink-0" />
                      {!isCollapsed && <span>{link.label}</span>}
                    </div>

                    {!isCollapsed && link.badge && (
                      <span className="text-[10px] font-mono font-bold bg-[#EAA044] text-white px-2 py-0.5 rounded-full animate-pulse">
                        {link.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Demo Platform Indicator */}
            {!isCollapsed && (
              <div className="p-4 rounded-3xl bg-amber-50/90 border border-amber-200/80 text-amber-950 text-xs space-y-1.5">
                <div className="flex items-center gap-1.5 font-bold text-amber-900">
                  <ShieldCheck className="w-4 h-4 text-amber-700 shrink-0" />
                  <span>University Dean View</span>
                </div>
                <p className="text-[11px] leading-relaxed text-amber-900/90">
                  Administrative control panel for CGC University, Mohali. All live outlet, order, student, and menu updates persist locally.
                </p>
              </div>
            )}

          </div>
        </aside>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white rounded-3xl p-4 border border-stone-200 shadow-lg space-y-3 animate-in fade-in">
            <div className="flex items-center justify-between pb-2 border-b border-stone-100">
              <div className="text-xs font-bold text-stone-900">
                Administration Portal Navigation
              </div>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="text-stone-400 p-1 hover:text-stone-700"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {navLinks.map((link) => {
                const isActive = link.exact
                  ? location.pathname === link.path
                  : location.pathname.startsWith(link.path);
                const Icon = link.icon;

                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`p-3 rounded-2xl text-center text-xs font-bold flex flex-col items-center justify-center gap-1.5 transition-all ${
                      isActive
                        ? 'bg-[#0D3828] text-white'
                        : 'bg-stone-50 text-stone-700 hover:bg-stone-100'
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

        {/* Main Routed Page Content */}
        <main className="flex-1 min-w-0">
          {children}
        </main>

      </div>
    </div>
  );
}
