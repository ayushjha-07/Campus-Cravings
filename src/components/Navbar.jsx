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
          
          {/* Left: Official Campus Cravings Brand Logo */}
          <Link to="/" className="flex items-center gap-2 sm:gap-3 group shrink-0">
            <div className="flex items-center p-1 sm:p-1.5 rounded-xl sm:rounded-2xl bg-white dark:bg-white/95 border border-stone-200/80 dark:border-stone-700/50 shadow-xs group-hover:shadow-md transition-all">
              <img
                src="/images/brand/logo.png"
                alt="Campus Cravings Logo"
                className="h-8 sm:h-10 md:h-12 w-auto object-contain group-hover:scale-102 transition-transform duration-300"
              />
            </div>
            <div className="hidden sm:block">
              <span className="text-[10px] sm:text-[11px] font-bold text-stone-500 dark:text-[#B8C5BB] tracking-wider uppercase block">
                CGC University, Mohali
              </span>
              <span className="text-[9px] font-semibold text-[#E63946] flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Live Express Counter Pickup
              </span>
            </div>
          </Link>

          {/* Center Navigation Links (Desktop) matching Requirement 2 */}
          <nav className="hidden xl:flex items-center gap-6">
            {!isAuthenticated ? (
              <>
                <Link
                  to="/"
                  className={`text-sm font-bold transition-all relative py-2 ${
                    isHome && !location.hash
                      ? 'text-[#E63946]'
                      : 'text-stone-700 dark:text-stone-300 hover:text-stone-950 dark:hover:text-white'
                  }`}
                >
                  <span>Home</span>
                  {isHome && !location.hash && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#E63946] rounded-full" />
                  )}
                </Link>

                <a
                  href="/#outlets"
                  onClick={(e) => {
                    if (location.pathname === '/') {
                      e.preventDefault();
                      const el = document.getElementById('outlets');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className="text-sm font-semibold text-stone-700 dark:text-stone-300 hover:text-stone-950 dark:hover:text-white transition-colors py-2"
                >
                  Explore Outlets
                </a>

                <a
                  href="/#how-it-works"
                  onClick={(e) => {
                    if (location.pathname === '/') {
                      e.preventDefault();
                      const el = document.getElementById('how-it-works');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className="text-sm font-semibold text-stone-700 dark:text-stone-300 hover:text-stone-950 dark:hover:text-white transition-colors py-2"
                >
                  How It Works
                </a>

                <a
                  href="/#about"
                  onClick={(e) => {
                    if (location.pathname === '/') {
                      e.preventDefault();
                      const el = document.getElementById('about');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className="text-sm font-semibold text-stone-700 dark:text-stone-300 hover:text-stone-950 dark:hover:text-white transition-colors py-2"
                >
                  About Us
                </a>

                <a
                  href="/#contact"
                  onClick={(e) => {
                    if (location.pathname === '/') {
                      e.preventDefault();
                      const el = document.getElementById('contact');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className="text-sm font-semibold text-stone-700 dark:text-stone-300 hover:text-stone-950 dark:hover:text-white transition-colors py-2"
                >
                  Contact
                </a>
              </>
            ) : (
              <>
                <Link
                  to="/dashboard"
                  className={`text-sm font-bold transition-all relative py-2 ${
                    location.pathname === '/dashboard' || location.pathname === '/menu'
                      ? 'text-[#E63946]'
                      : 'text-stone-700 dark:text-stone-300 hover:text-stone-950 dark:hover:text-white'
                  }`}
                >
                  <span>Dashboard</span>
                  {(location.pathname === '/dashboard' || location.pathname === '/menu') && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#E63946] rounded-full" />
                  )}
                </Link>

                <Link
                  to="/outlets"
                  className={`text-sm font-semibold transition-colors py-2 ${
                    location.pathname === '/outlets'
                      ? 'text-[#E63946] font-bold'
                      : 'text-stone-700 dark:text-stone-300 hover:text-stone-950 dark:hover:text-white'
                  }`}
                >
                  Food Outlets
                </Link>

                <Link
                  to="/orders"
                  className={`text-sm font-semibold transition-colors py-2 ${
                    location.pathname.startsWith('/order')
                      ? 'text-[#E63946] font-bold'
                      : 'text-stone-700 dark:text-stone-300 hover:text-stone-950 dark:hover:text-white'
                  }`}
                >
                  My Orders
                </Link>

                <a
                  href="/#how-it-works"
                  className="text-sm font-semibold text-stone-700 dark:text-stone-300 hover:text-stone-950 dark:hover:text-white transition-colors py-2"
                >
                  About
                </a>
              </>
            )}
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

            {/* Desktop User Greeting & Profile Dropdown OR Login + Get Started */}
            {isAuthenticated || user?.isLoggedIn ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  type="button"
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  className="flex items-center gap-2.5 pl-2 pr-3 py-1.5 rounded-full hover:bg-stone-100 dark:hover:bg-[#222E26] transition-colors cursor-pointer border border-transparent hover:border-stone-200/80 dark:hover:border-[#2A382F]"
                >
                  {/* Circular User Avatar */}
                  <div className="w-9 h-9 rounded-full bg-[#0D1826] text-white flex items-center justify-center font-bold text-xs shadow-xs">
                    <User className="w-4 h-4 text-[#F4A261]" />
                  </div>

                  {/* Greeting Text */}
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
                        to="/dashboard"
                        onClick={() => setProfileDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2 text-xs font-semibold text-stone-700 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-[#222E26] hover:text-[#E63946]"
                      >
                        <Store className="w-4 h-4" />
                        <span>Student Dashboard</span>
                      </Link>

                      <Link
                        to="/profile"
                        onClick={() => setProfileDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2 text-xs font-semibold text-stone-700 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-[#222E26] hover:text-[#E63946]"
                      >
                        <User className="w-4 h-4" />
                        <span>Student Profile</span>
                      </Link>

                      <Link
                        to="/orders"
                        onClick={() => setProfileDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2 text-xs font-semibold text-stone-700 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-[#222E26] hover:text-[#E63946]"
                      >
                        <ReceiptText className="w-4 h-4" />
                        <span>My Orders & Pickup</span>
                      </Link>

                      <Link
                        to="/staff/kulhad"
                        onClick={() => setProfileDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2 text-xs font-semibold text-[#0D3828] dark:text-[#52D8A4] hover:bg-emerald-50 dark:hover:bg-[#222E26]"
                      >
                        <ChefHat className="w-4 h-4 text-[#F4A261]" />
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
            ) : (
              <div className="hidden sm:flex items-center gap-2 sm:gap-2.5">
                {/* Login Button (Requirement 2) */}
                <Link
                  to="/login"
                  className="px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full border border-stone-300 dark:border-stone-700 text-stone-800 dark:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 text-xs sm:text-sm font-bold transition-all cursor-pointer"
                >
                  <span>Login</span>
                </Link>

                {/* Prominent Get Started Button (Requirement 2) */}
                <Link
                  to="/register"
                  className="px-4 sm:px-5 py-1.5 sm:py-2 rounded-full bg-[#E63946] hover:bg-[#d5323f] text-white text-xs sm:text-sm font-extrabold shadow-md hover:shadow-lg transition-all hover:scale-103 active:scale-97 flex items-center gap-1 cursor-pointer"
                >
                  <span>Get Started</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            )}

            {/* Menu Toggle for Mobile & Tablet */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-1.5 sm:p-2 rounded-xl text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-[#222E26] transition-colors cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu (Requirement 2) */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-white dark:bg-[#19231D] border-t border-stone-200 dark:border-[#2A382F] px-4 pt-4 pb-6 space-y-3 animate-in fade-in duration-150 shadow-lg">
          
          {/* Quick Nav Links */}
          <div className="space-y-1">
            {!isAuthenticated ? (
              <>
                <Link
                  to="/"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-3 rounded-xl hover:bg-stone-50 dark:hover:bg-[#222E26] text-stone-800 dark:text-stone-200 text-sm font-bold flex items-center justify-between"
                >
                  <span>Home</span>
                  <ChevronDown className="w-4 h-4 -rotate-90 text-stone-400" />
                </Link>

                <a
                  href="/#outlets"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    if (location.pathname === '/') {
                      const el = document.getElementById('outlets');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className="p-3 rounded-xl hover:bg-stone-50 dark:hover:bg-[#222E26] text-stone-800 dark:text-stone-200 text-sm font-bold flex items-center justify-between"
                >
                  <span>Explore Outlets</span>
                  <ChevronDown className="w-4 h-4 -rotate-90 text-stone-400" />
                </a>

                <a
                  href="/#how-it-works"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    if (location.pathname === '/') {
                      const el = document.getElementById('how-it-works');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className="p-3 rounded-xl hover:bg-stone-50 dark:hover:bg-[#222E26] text-stone-800 dark:text-stone-200 text-sm font-bold flex items-center justify-between"
                >
                  <span>How It Works</span>
                  <ChevronDown className="w-4 h-4 -rotate-90 text-stone-400" />
                </a>

                <a
                  href="/#about"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    if (location.pathname === '/') {
                      const el = document.getElementById('about');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className="p-3 rounded-xl hover:bg-stone-50 dark:hover:bg-[#222E26] text-stone-800 dark:text-stone-200 text-sm font-bold flex items-center justify-between"
                >
                  <span>About Us</span>
                  <ChevronDown className="w-4 h-4 -rotate-90 text-stone-400" />
                </a>

                <a
                  href="/#contact"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    if (location.pathname === '/') {
                      const el = document.getElementById('contact');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className="p-3 rounded-xl hover:bg-stone-50 dark:hover:bg-[#222E26] text-stone-800 dark:text-stone-200 text-sm font-bold flex items-center justify-between"
                >
                  <span>Contact</span>
                  <ChevronDown className="w-4 h-4 -rotate-90 text-stone-400" />
                </a>
              </>
            ) : (
              <>
                <Link
                  to="/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-3 rounded-xl hover:bg-stone-50 dark:hover:bg-[#222E26] text-stone-800 dark:text-stone-200 text-sm font-bold flex items-center justify-between"
                >
                  <span>Student Dashboard</span>
                  <ChevronDown className="w-4 h-4 -rotate-90 text-stone-400" />
                </Link>

                <Link
                  to="/outlets"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-3 rounded-xl hover:bg-stone-50 dark:hover:bg-[#222E26] text-stone-800 dark:text-stone-200 text-sm font-bold flex items-center justify-between"
                >
                  <span>Food Outlets</span>
                  <ChevronDown className="w-4 h-4 -rotate-90 text-stone-400" />
                </Link>

                <Link
                  to="/orders"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-3 rounded-xl hover:bg-stone-50 dark:hover:bg-[#222E26] text-stone-800 dark:text-stone-200 text-sm font-bold flex items-center justify-between"
                >
                  <span>My Orders & Pickup</span>
                  <ChevronDown className="w-4 h-4 -rotate-90 text-stone-400" />
                </Link>

                <Link
                  to="/profile"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-3 rounded-xl hover:bg-stone-50 dark:hover:bg-[#222E26] text-stone-800 dark:text-stone-200 text-sm font-bold flex items-center justify-between"
                >
                  <span>Student Profile</span>
                  <ChevronDown className="w-4 h-4 -rotate-90 text-stone-400" />
                </Link>
              </>
            )}
          </div>

          {/* Bottom Action Section in Mobile Menu */}
          <div className="pt-3 border-t border-stone-100 dark:border-[#2A382F] space-y-2">
            {!isAuthenticated ? (
              <div className="grid grid-cols-2 gap-2">
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 text-stone-800 dark:text-stone-200 text-sm font-bold text-center block"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full py-2.5 rounded-xl bg-[#E63946] text-white text-sm font-bold text-center block shadow-sm"
                >
                  Get Started
                </Link>
              </div>
            ) : (
              <button
                type="button"
                onClick={handleLogout}
                className="w-full py-2.5 rounded-xl bg-rose-50 text-rose-700 font-bold text-sm text-center block cursor-pointer"
              >
                Sign Out ({user?.name || studentFirstName})
              </button>
            )}
          </div>

        </div>
      )}
    </header>
  );
}
