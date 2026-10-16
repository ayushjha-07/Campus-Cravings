import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  ShoppingBag, 
  Search, 
  Menu, 
  X, 
  Utensils, 
  User, 
  ChevronDown,
  ReceiptText, 
  Store, 
  ChefHat, 
  LogOut, 
  Sparkles,
  ShieldCheck,
  Tag
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import ThemeToggle from './ThemeToggle';

export default function Navbar({ onSearchSubmit }) {
  const { itemCount } = useCart();
  const { user, isAuthenticated, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  const isHome = location.pathname === '/';

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setProfileDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      if (onSearchSubmit) {
        onSearchSubmit(searchQuery.trim());
      } else {
        navigate(`/?search=${encodeURIComponent(searchQuery.trim())}`);
      }
      setMobileMenuOpen(false);
    }
  };

  const handleLogout = () => {
    logout();
    setProfileDropdownOpen(false);
    navigate('/login');
  };

  // Student display name
  const studentFirstName = user?.name ? user.name.split(' ')[0] : 'Ayush';

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-[#19231D] border-b border-stone-200/90 dark:border-[#2A382F] shadow-xs transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 md:h-20 gap-2 sm:gap-4">
          
          {/* Left: Brand Logo & CGC Mohali subtitle */}
          <Link to="/" className="flex items-center gap-2 sm:gap-3 group shrink-0">
            {/* Visual Fork & Knife circular emblem */}
            <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-11 md:h-11 rounded-xl sm:rounded-2xl bg-[#EAF4EE] dark:bg-[#1A3326] flex items-center justify-center relative overflow-hidden group-hover:scale-105 transition-transform border border-emerald-200/50 dark:border-emerald-700/30">
              <div className="flex items-center justify-center">
                <Utensils className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-[#1B4D36] dark:text-[#52D8A4]" />
              </div>
              <span className="absolute bottom-1 right-1 w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-[#E76F51]" />
            </div>

            <div>
              <div className="flex items-baseline">
                <span className="text-lg sm:text-xl md:text-2xl font-black tracking-tight text-[#143C29] dark:text-[#F5F7F4]">
                  Campus
                </span>
                <span className="text-lg sm:text-xl md:text-2xl font-black tracking-tight text-[#E76F51] ml-0.5">
                  Cravings
                </span>
              </div>
              <div className="text-[9px] sm:text-[10px] md:text-[11px] text-stone-500 dark:text-[#B8C5BB] font-semibold -mt-0.5 tracking-wider uppercase">
                CGC University, Mohali
              </div>
            </div>
          </Link>

          {/* Center Navigation Links (Desktop) matching reference */}
          <nav className="hidden xl:flex items-center gap-7">
            <Link
              to="/"
              className={`text-sm font-bold transition-all relative py-2 ${
                isHome
                  ? 'text-[#E76F51]'
                  : 'text-stone-700 dark:text-stone-300 hover:text-stone-950 dark:hover:text-white'
              }`}
            >
              <span>Home</span>
              {isHome && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#E76F51] rounded-full" />
              )}
            </Link>

            <Link
              to="/outlets"
              className={`text-sm font-semibold transition-colors py-2 ${
                location.pathname === '/outlets'
                  ? 'text-[#E76F51] font-bold'
                  : 'text-stone-700 dark:text-stone-300 hover:text-stone-950 dark:hover:text-white'
              }`}
            >
              Food Outlets
            </Link>

            <a
              href="/#offers"
              className="text-sm font-semibold text-stone-700 dark:text-stone-300 hover:text-stone-950 dark:hover:text-white transition-colors py-2 flex items-center gap-1.5"
            >
              <span>Offers</span>
              <span className="text-[10px] font-bold bg-[#EAA044]/20 text-[#C2410C] dark:text-[#FDBA74] px-1.5 py-0.2 rounded-full border border-[#EAA044]/40">
                Hot
              </span>
            </a>

            <a
              href="/#how-it-works"
              className="text-sm font-semibold text-stone-700 dark:text-stone-300 hover:text-stone-950 dark:hover:text-white transition-colors py-2"
            >
              About
            </a>
          </nav>

          {/* Center-Right Search Input Bar (Desktop / Laptop) */}
          <form
            onSubmit={handleSearch}
            className="hidden md:flex items-center flex-1 max-w-xs lg:max-w-sm xl:max-w-md bg-[#F9F6F0] dark:bg-[#222E26] rounded-full px-4 py-2 border border-stone-200/90 dark:border-[#2A382F] focus-within:border-[#1B4D36] dark:focus-within:border-[#52D8A4] focus-within:ring-2 focus-within:ring-[#1B4D36]/10 transition-all mx-2"
          >
            <Search className="w-4 h-4 text-stone-400 dark:text-stone-500 mr-2.5 shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for food, outlets or cuisines..."
              className="w-full bg-transparent text-xs sm:text-sm text-stone-800 dark:text-stone-100 placeholder:text-stone-400 dark:placeholder:text-stone-500 focus:outline-none"
            />
          </form>

          {/* Right Action Controls: Dark Toggle, Cart, Profile Menu */}
          <div className="flex items-center gap-1.5 sm:gap-3.5 shrink-0">
            
            {/* Dark Mode / Light Mode Pill Toggle */}
            <ThemeToggle />

            {/* Shopping Cart Icon with Live Badge */}
            <Link
              to="/cart"
              className="relative p-1.5 sm:p-2.5 rounded-full hover:bg-stone-100 dark:hover:bg-[#222E26] text-stone-800 dark:text-stone-200 transition-colors flex items-center justify-center cursor-pointer"
              aria-label="Shopping Cart"
              title="View your campus cart"
            >
              <ShoppingBag className="w-5 h-5 sm:w-6 sm:h-6 text-stone-800 dark:text-[#F5F7F4]" />
              {itemCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-[#E76F51] text-white text-[10px] sm:text-[11px] font-black min-w-4.5 h-4.5 sm:min-w-5 sm:h-5 px-1 rounded-full flex items-center justify-center shadow-xs animate-in zoom-in-75">
                  {itemCount}
                </span>
              )}
            </Link>

            {/* Mobile-only Profile/Login Quick Button (< sm) */}
            <Link
              to={isAuthenticated || user?.isLoggedIn ? '/profile' : '/login'}
              className="sm:hidden p-1 rounded-full hover:bg-stone-100 dark:hover:bg-[#222E26] transition-colors"
              aria-label={isAuthenticated || user?.isLoggedIn ? 'Student Profile' : 'Student Login'}
              title={isAuthenticated || user?.isLoggedIn ? 'Student Profile' : 'Student Login'}
            >
              <div className="w-8 h-8 rounded-full bg-[#0D3828] text-white flex items-center justify-center font-bold text-xs shadow-xs border border-emerald-600/30">
                <User className="w-4 h-4 text-[#EAA044]" />
              </div>
            </Link>

            {/* Desktop User Greeting & Profile Dropdown (>= sm) */}
            <div className="relative hidden sm:block" ref={dropdownRef}>
              {isAuthenticated || user?.isLoggedIn ? (
                <button
                  type="button"
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  className="flex items-center gap-2.5 pl-2 pr-3 py-1.5 rounded-full hover:bg-stone-100 dark:hover:bg-[#222E26] transition-colors cursor-pointer border border-transparent hover:border-stone-200/80 dark:hover:border-[#2A382F]"
                >
                  {/* Circular User Avatar */}
                  <div className="w-9 h-9 rounded-full bg-[#0D3828] text-white flex items-center justify-center font-bold text-xs shadow-xs">
                    <User className="w-4 h-4 text-[#EAA044]" />
                  </div>

                  {/* Greeting Text from Reference Image */}
                  <div className="text-left leading-tight hidden lg:block">
                    <div className="text-[10px] text-stone-400 dark:text-stone-400 font-medium">
                      Good to see you,
                    </div>
                    <div className="text-xs sm:text-sm font-bold text-stone-900 dark:text-[#F5F7F4] flex items-center gap-1">
                      <span>{studentFirstName}!</span>
                      <ChevronDown className="w-3.5 h-3.5 text-stone-500" />
                    </div>
                  </div>
                </button>
              ) : (
                <Link
                  to="/login"
                  className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#0D3828] hover:bg-[#144834] text-white text-xs sm:text-sm font-bold shadow-xs transition-all hover:scale-105 active:scale-95"
                >
                  <User className="w-4 h-4 text-[#EAA044]" />
                  <span>Login</span>
                </Link>
              )}

              {/* Profile Dropdown Menu */}
              {profileDropdownOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-[#19231D] rounded-2xl shadow-xl border border-stone-200 dark:border-[#2A382F] py-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                  <div className="px-4 py-3 border-b border-stone-100 dark:border-[#2A382F]">
                    <p className="text-xs font-bold text-stone-900 dark:text-[#F5F7F4]">
                      {user?.name || 'Aarav Sharma'}
                    </p>
                    <p className="text-[11px] text-stone-500 dark:text-[#B8C5BB] font-mono mt-0.5">
                      {user?.studentId || 'CGC2023CSE042'}
                    </p>
                    <p className="text-[10px] text-emerald-700 dark:text-emerald-400 font-medium mt-1">
                      CGC University Student
                    </p>
                  </div>

                  <div className="py-1">
                    <Link
                      to="/profile"
                      onClick={() => setProfileDropdownOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2 text-xs font-semibold text-stone-700 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-[#222E26] hover:text-[#0D3828] dark:hover:text-[#52D8A4]"
                    >
                      <User className="w-4 h-4" />
                      <span>Student Profile</span>
                    </Link>

                    <Link
                      to="/orders"
                      onClick={() => setProfileDropdownOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2 text-xs font-semibold text-stone-700 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-[#222E26] hover:text-[#0D3828] dark:hover:text-[#52D8A4]"
                    >
                      <ReceiptText className="w-4 h-4" />
                      <span>My Orders & Live Pickup</span>
                    </Link>

                    <Link
                      to="/staff/kulhad"
                      onClick={() => setProfileDropdownOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2 text-xs font-semibold text-[#0D3828] dark:text-[#52D8A4] hover:bg-emerald-50 dark:hover:bg-[#222E26]"
                    >
                      <ChefHat className="w-4 h-4 text-[#EAA044]" />
                      <span>Cafeteria Staff Portal</span>
                    </Link>

                    <Link
                      to="/admin"
                      onClick={() => setProfileDropdownOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2 text-xs font-semibold text-stone-700 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-[#222E26]"
                    >
                      <ShieldCheck className="w-4 h-4 text-[#0D3828] dark:text-[#52D8A4]" />
                      <span>University Admin</span>
                    </Link>
                  </div>

                  <div className="border-t border-stone-100 dark:border-[#2A382F] pt-1">
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2.5 px-4 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/20 text-left cursor-pointer"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Tablet Menu Toggle (hidden on mobile to prevent overcrowding) */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="hidden sm:flex xl:hidden p-2 rounded-xl text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-[#222E26] transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-white dark:bg-[#19231D] border-t border-stone-200 dark:border-[#2A382F] px-4 pt-4 pb-6 space-y-3 animate-in fade-in duration-150 shadow-lg">
          {/* Mobile search bar */}
          <form onSubmit={handleSearch} className="flex items-center gap-2 bg-[#F9F6F0] dark:bg-[#222E26] rounded-xl border border-stone-200 dark:border-[#2A382F] px-3 py-2">
            <Search className="w-4 h-4 text-stone-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for food, outlets..."
              className="w-full bg-transparent text-sm text-stone-800 dark:text-stone-100 placeholder:text-stone-400 focus:outline-none"
            />
            <button type="submit" className="px-3 py-1 bg-[#0D3828] text-white text-xs font-bold rounded-lg cursor-pointer">
              Search
            </button>
          </form>

          {/* Quick Nav Links */}
          <div className="grid grid-cols-2 gap-2 pt-2">
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className="p-3 rounded-xl bg-stone-50 dark:bg-[#222E26] text-stone-800 dark:text-stone-200 text-sm font-semibold flex items-center gap-2"
            >
              <span>Home</span>
            </Link>

            <Link
              to="/outlets"
              onClick={() => setMobileMenuOpen(false)}
              className="p-3 rounded-xl bg-stone-50 dark:bg-[#222E26] text-stone-800 dark:text-stone-200 text-sm font-semibold flex items-center gap-2"
            >
              <Store className="w-4 h-4 text-[#0D3828] dark:text-[#52D8A4]" />
              <span>Food Outlets</span>
            </Link>

            <a
              href="/#offers"
              onClick={() => setMobileMenuOpen(false)}
              className="p-3 rounded-xl bg-stone-50 dark:bg-[#222E26] text-stone-800 dark:text-stone-200 text-sm font-semibold flex items-center gap-2"
            >
              <Tag className="w-4 h-4 text-[#EAA044]" />
              <span>Offers</span>
            </a>

            <Link
              to="/orders"
              onClick={() => setMobileMenuOpen(false)}
              className="p-3 rounded-xl bg-stone-50 dark:bg-[#222E26] text-stone-800 dark:text-stone-200 text-sm font-semibold flex items-center gap-2"
            >
              <ReceiptText className="w-4 h-4 text-[#0D3828] dark:text-[#52D8A4]" />
              <span>My Orders</span>
            </Link>
          </div>

          <div className="pt-2 border-t border-stone-100 dark:border-[#2A382F] space-y-2">
            <Link
              to={isAuthenticated || user?.isLoggedIn ? '/profile' : '/login'}
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-2.5 rounded-xl bg-[#0D3828] text-white text-sm font-bold flex items-center justify-center gap-2"
            >
              <User className="w-4 h-4 text-[#EAA044]" />
              <span>{isAuthenticated || user?.isLoggedIn ? `Student Profile (${studentFirstName})` : 'Student Login'}</span>
            </Link>

            <Link
              to="/staff/kulhad"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-2.5 rounded-xl bg-emerald-50 dark:bg-[#222E26] border border-emerald-200 dark:border-emerald-800 text-[#0D3828] dark:text-[#52D8A4] text-sm font-bold flex items-center justify-center gap-2"
            >
              <ChefHat className="w-4 h-4 text-[#EAA044]" />
              <span>Cafeteria Staff Portal</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
