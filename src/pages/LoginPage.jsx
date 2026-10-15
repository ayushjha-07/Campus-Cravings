import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  ArrowLeft, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  User, 
  Store, 
  Zap, 
  UtensilsCrossed, 
  ShoppingBag, 
  ArrowRight,
  AlertCircle, 
  CheckCircle2, 
  Sparkles 
} from 'lucide-react';
import { STORAGE_KEYS } from '../utils/authUtils';
import ThemeToggle from '../components/ThemeToggle';

export default function LoginPage() {
  const { login, quickDemoLogin, isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Target to redirect after successful login
  const from = location.state?.from?.pathname || '/';

  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Prepopulate identifier if saved in localStorage (Remember Me)
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.REMEMBER_ME);
      if (saved) {
        setIdentifier(saved);
        setPassword('password123');
      } else {
        setIdentifier('CGC2023CSE042');
        setPassword('password123');
      }
    } catch {
      setIdentifier('CGC2023CSE042');
      setPassword('password123');
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage(null);
    setIsSubmitting(true);

    const result = await login(identifier, password, rememberMe);
    setIsSubmitting(false);

    if (result.success) {
      navigate(from, { replace: true });
    } else {
      // Clean error matching reference image: "Invalid email/Student ID or password. Please try again."
      setErrorMessage(result.error || 'Invalid email/Student ID or password. Please try again.');
    }
  };

  const handleQuickDemo = (studentId) => {
    quickDemoLogin(studentId);
    navigate(from, { replace: true });
  };

  const handleSocialLogin = (provider) => {
    // Demo SSO login simulator for Google / Microsoft
    quickDemoLogin('CGC2023CSE042');
    navigate(from, { replace: true });
  };

  return (
    <div className="min-h-screen bg-[#FAF7F0] flex flex-col lg:flex-row antialiased font-sans text-stone-900 selection:bg-[#064E36] selection:text-white">
      
      {/* Mobile Top Header (Visible on Mobile / Tablet) */}
      <div className="lg:hidden bg-white border-b border-stone-200/80 px-4 py-3.5 flex items-center justify-between sticky top-0 z-30">
        <Link 
          to="/"
          className="p-1.5 -ml-1.5 rounded-xl text-stone-700 hover:bg-stone-100 transition-colors"
          aria-label="Back to home"
        >
          <ArrowLeft className="w-5 h-5 text-stone-700" />
        </Link>

        {/* Center Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-[#064E36] text-white flex items-center justify-center">
            <UtensilsCrossed className="w-3.5 h-3.5 text-[#EAA044]" />
          </div>
          <div className="text-left">
            <span className="font-black text-sm text-stone-900 tracking-tight block leading-tight">
              Campus Cravings
            </span>
          </div>
        </Link>

        <ThemeToggle />
      </div>

      {/* Left Panel: Desktop Split-Screen (Dark Forest-Green with Burger Photography) */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-[#064E36] to-[#043B2B] text-white p-12 xl:p-16 flex-col justify-between relative overflow-hidden">
        
        {/* Subtle Ambient Glow */}
        <div className="absolute -right-20 -top-20 w-96 h-96 bg-[#EAA044]/10 rounded-full blur-3xl pointer-events-none" />

        {/* Top Logo & University Title */}
        <div className="relative z-10">
          <Link to="/" className="inline-flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-full bg-white/10 border border-white/20 flex items-center justify-center group-hover:scale-105 transition-transform backdrop-blur-xs">
              <UtensilsCrossed className="w-5 h-5 text-[#EAA044]" />
            </div>
            <div>
              <div className="font-black text-xl tracking-tight text-white leading-tight">
                Campus Cravings
              </div>
              <div className="text-[10px] uppercase font-bold tracking-widest text-emerald-200/90">
                CGC UNIVERSITY, MOHALI
              </div>
            </div>
          </Link>
        </div>

        {/* Center Headline & Features */}
        <div className="relative z-10 max-w-lg space-y-6 my-6">
          <div className="space-y-3">
            <h1 className="text-4xl xl:text-5xl font-black tracking-tight leading-tight text-white">
              Good food. <br />
              <span className="text-[#F97316]">No long queues.</span>
            </h1>
            <p className="text-emerald-100/90 text-sm xl:text-base leading-relaxed">
              Order your campus favourites and pick them up when they're ready.
            </p>
          </div>

          {/* 4 Feature Badges with Orange Circle Icons */}
          <div className="grid grid-cols-2 gap-3.5 pt-2">
            
            <div className="flex items-center gap-2.5 text-xs font-bold text-white">
              <div className="w-6 h-6 rounded-full bg-[#F97316]/20 border border-[#F97316]/60 flex items-center justify-center shrink-0">
                <Store className="w-3.5 h-3.5 text-[#F97316]" />
              </div>
              <span>Your Favourite Outlets</span>
            </div>

            <div className="flex items-center gap-2.5 text-xs font-bold text-white">
              <div className="w-6 h-6 rounded-full bg-[#F97316]/20 border border-[#F97316]/60 flex items-center justify-center shrink-0">
                <Zap className="w-3.5 h-3.5 text-[#F97316]" />
              </div>
              <span>Quick Ordering</span>
            </div>

            <div className="flex items-center gap-2.5 text-xs font-bold text-white">
              <div className="w-6 h-6 rounded-full bg-[#F97316]/20 border border-[#F97316]/60 flex items-center justify-center shrink-0">
                <UtensilsCrossed className="w-3.5 h-3.5 text-[#F97316]" />
              </div>
              <span>Fresh & Tasty Food</span>
            </div>

            <div className="flex items-center gap-2.5 text-xs font-bold text-white">
              <div className="w-6 h-6 rounded-full bg-[#F97316]/20 border border-[#F97316]/60 flex items-center justify-center shrink-0">
                <ShoppingBag className="w-3.5 h-3.5 text-[#F97316]" />
              </div>
              <span>Hassle-Free Pickup</span>
            </div>

          </div>
        </div>

        {/* Bottom Food Photography: Burger, Fries & Cold Drink */}
        <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl border border-white/10 group">
          <img
            src="https://images.unsplash.com/photo-1550547660-d9450f859349?w=900&auto=format&fit=crop&q=80"
            alt="Delicious burger, crispy fries, and refreshing iced drink at CGC cafeteria"
            className="w-full h-64 xl:h-72 object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#043B2B]/90 via-[#043B2B]/20 to-transparent" />
          
          <div className="absolute bottom-4 left-5 right-5 flex items-center justify-between text-xs text-white">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#EAA044] animate-pulse" />
              <span className="font-bold text-emerald-100">Live Campus Kitchens</span>
            </div>
            <span className="text-emerald-200/80 font-medium">Block 2 Food Court</span>
          </div>
        </div>

      </div>

      {/* Right Panel: Form Screen */}
      <div className="flex-1 flex flex-col justify-center items-center p-6 sm:p-10 lg:p-12 xl:p-16 max-w-xl mx-auto w-full">
        
        {/* Desktop Top Back Link & Theme Toggle */}
        <div className="hidden lg:flex w-full items-center justify-between mb-6">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-xs font-bold text-stone-500 hover:text-[#064E36] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>
          <ThemeToggle />
        </div>

        {/* Mobile Food Image Header (As shown in Reference Image column 1) */}
        <div className="lg:hidden w-full flex justify-center mb-4">
          <div className="w-40 h-28 rounded-2xl overflow-hidden shadow-md border border-stone-200/80 relative">
            <img
              src="https://images.unsplash.com/photo-1550547660-d9450f859349?w=600&auto=format&fit=crop&q=80"
              alt="Burger and fries"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 to-transparent" />
            <span className="absolute bottom-1.5 left-2 text-[10px] text-white font-bold">
              Break Meals
            </span>
          </div>
        </div>

        {/* Content Card */}
        <div className="w-full max-w-md space-y-6">
          
          {/* Header Texts */}
          <div className="text-center lg:text-left space-y-1.5">
            <h2 className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight">
              Welcome Back!
            </h2>
            <p className="text-xs sm:text-sm text-stone-500">
              Sign in to continue to Campus Cravings.
            </p>
          </div>

          {/* Currently logged-in status banner if already authenticated */}
          {isAuthenticated && (
            <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-950 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Signed in as <strong>{user?.name}</strong></span>
              </div>
              <Link
                to="/profile"
                className="text-[#064E36] font-bold underline text-[11px] shrink-0"
              >
                Profile →
              </Link>
            </div>
          )}

          {/* Error Message Alert (Matches Reference "Login Error Mobile") */}
          {errorMessage && (
            <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-xs text-rose-800 flex items-start gap-2.5 animate-in fade-in">
              <div className="w-4 h-4 rounded-full bg-rose-200 text-rose-700 flex items-center justify-center shrink-0 font-bold text-[10px] mt-0.5">
                !
              </div>
              <div className="leading-relaxed">
                <strong>{errorMessage}</strong>
              </div>
            </div>
          )}

          {/* Main Login Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            
            {/* Email or Student ID */}
            <div>
              <div className="relative">
                <User className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  required
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  placeholder="Email or Student ID"
                  className="w-full pl-10 pr-4 py-3 rounded-2xl bg-white border border-stone-200 text-xs sm:text-sm text-stone-900 placeholder:text-stone-400 focus:outline-hidden focus:ring-2 focus:ring-[#064E36]/20 focus:border-[#064E36] transition-all shadow-2xs"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <div className="relative">
                <Lock className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  className="w-full pl-10 pr-11 py-3 rounded-2xl bg-white border border-stone-200 text-xs sm:text-sm text-stone-900 placeholder:text-stone-400 focus:outline-hidden focus:ring-2 focus:ring-[#064E36]/20 focus:border-[#064E36] transition-all shadow-2xs"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 text-stone-400 hover:text-stone-600 cursor-pointer"
                  title={showPassword ? 'Hide password' : 'Show password'}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password Row */}
            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 cursor-pointer text-xs text-stone-600 font-medium">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded-md border-stone-300 text-[#064E36] focus:ring-[#064E36]/20 cursor-pointer"
                />
                <span>Remember me</span>
              </label>

              <Link
                to="/forgot-password"
                className="text-xs font-bold text-[#F97316] hover:underline"
              >
                Forgot Password?
              </Link>
            </div>

            {/* Sign In Primary Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 rounded-2xl bg-[#064E36] hover:bg-[#043B2B] text-white font-black text-xs sm:text-sm shadow-md shadow-emerald-950/15 hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
            >
              <span>{isSubmitting ? 'Signing In...' : 'Sign In'}</span>
              <ArrowRight className="w-4 h-4 text-[#EAA044]" />
            </button>

          </form>

          {/* Social Continue Divider */}
          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-stone-200" />
            </div>
            <div className="relative flex justify-center text-[11px] text-stone-400 bg-[#FAF7F0] px-3">
              or continue with
            </div>
          </div>

          {/* SSO Buttons: Google & Microsoft */}
          <div className="space-y-2.5">
            <button
              type="button"
              onClick={() => handleSocialLogin('Google')}
              className="w-full py-2.5 px-4 rounded-2xl bg-white hover:bg-stone-50 border border-stone-200 text-stone-700 font-bold text-xs flex items-center justify-center gap-2.5 shadow-2xs hover:shadow-xs transition-all cursor-pointer"
            >
              <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
              </svg>
              <span>Continue with Google</span>
            </button>

            <button
              type="button"
              onClick={() => handleSocialLogin('Microsoft')}
              className="w-full py-2.5 px-4 rounded-2xl bg-white hover:bg-stone-50 border border-stone-200 text-stone-700 font-bold text-xs flex items-center justify-center gap-2.5 shadow-2xs hover:shadow-xs transition-all cursor-pointer"
            >
              <svg className="w-4 h-4 shrink-0" viewBox="0 0 21 21">
                <rect x="1" y="1" width="9" height="9" fill="#f25022" />
                <rect x="11" y="1" width="9" height="9" fill="#7fba00" />
                <rect x="1" y="11" width="9" height="9" fill="#00a4ef" />
                <rect x="11" y="11" width="9" height="9" fill="#ffb900" />
              </svg>
              <span>Continue with Microsoft</span>
            </button>
          </div>

          {/* Quick Demo Evaluation Bar */}
          <div className="pt-2">
            <div className="p-3 rounded-2xl bg-amber-50/80 border border-amber-200/70 text-xs space-y-1.5">
              <div className="flex items-center justify-between text-[11px] font-bold text-amber-900">
                <div className="flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#F97316]" />
                  <span>Instant Demo Student Login:</span>
                </div>
                <span className="font-mono text-stone-500">pass: password123</span>
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => handleQuickDemo('CGC2023CSE042')}
                  className="flex-1 py-1.5 px-2 rounded-xl bg-white text-[11px] font-bold text-stone-800 border border-amber-200 hover:bg-amber-100 transition-colors truncate"
                >
                  Aarav (CSE)
                </button>
                <button
                  type="button"
                  onClick={() => handleQuickDemo('CGC2023ECE019')}
                  className="flex-1 py-1.5 px-2 rounded-xl bg-white text-[11px] font-bold text-stone-800 border border-amber-200 hover:bg-amber-100 transition-colors truncate"
                >
                  Simran (ECE)
                </button>
              </div>
            </div>
          </div>

          {/* Bottom Link: Don't have an account? Create Account */}
          <div className="text-center pt-2">
            <span className="text-xs text-stone-500 font-medium">
              Don't have an account?{' '}
              <Link
                to="/register"
                className="font-bold text-[#F97316] hover:underline"
              >
                Create Account
              </Link>
            </span>
          </div>

        </div>

      </div>

    </div>
  );
}
