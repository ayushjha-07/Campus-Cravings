import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useAdmin } from '../context/AdminContext';
import { 
  ArrowLeft, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  ArrowRight,
  GraduationCap,
  UtensilsCrossed,
  ShieldCheck,
  Utensils,
  ShoppingCart,
  ShoppingBag,
  CheckCircle2, 
  AlertCircle
} from 'lucide-react';
import { STORAGE_KEYS, getRegisteredUsers } from '../utils/authUtils';
import ThemeToggle from '../components/ThemeToggle';

export default function LoginPage() {
  const { login, googleLogin, isAuthenticated, user } = useAuth();
  const { adminLogin, staffLogin, staffList } = useAdmin();
  const navigate = useNavigate();
  const location = useLocation();

  // Selected login role: 'student' | 'staff' | 'admin'
  const [selectedRole, setSelectedRole] = useState(() => {
    return location.state?.role || location.state?.defaultRole || 'student';
  });

  // Input fields (clean initial state, no pre-filled demo accounts)
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Target route after student login
  const from = location.state?.from?.pathname || '/dashboard';

  // Role switch handler
  const handleRoleChange = (role) => {
    setSelectedRole(role);
    setErrorMessage(null);
    setIdentifier('');
    setPassword('');
  };

  // Pre-populate saved remember-me identifier on initial mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.REMEMBER_ME);
      if (saved) {
        setIdentifier(saved);
      }
    } catch {
      // ignore
    }
  }, []);

  // Google SSO authentication handler (matches registered user by college email)
  const handleGoogleLogin = () => {
    setErrorMessage(null);
    const cleanId = (identifier || '').trim().toLowerCase();

    if (!cleanId || !cleanId.includes('@')) {
      setErrorMessage('Please enter your registered college email (e.g. name@cgc.edu.in) above to continue with Google.');
      return;
    }

    if (selectedRole === 'student') {
      const result = googleLogin(cleanId);
      if (result.success) {
        navigate(from, { replace: true });
      } else {
        setErrorMessage(result.error || `No student account found for "${cleanId}". Please register first.`);
      }
      return;
    }

    if (selectedRole === 'staff') {
      const matchedStaff = (staffList || []).find(s => s.email?.toLowerCase() === cleanId);
      if (matchedStaff) {
        try {
          localStorage.setItem('campus_cravings_staff_session', JSON.stringify(matchedStaff));
        } catch {
          // ignore
        }
        const targetOutlet = matchedStaff.assignedOutletId || 'kulhad';
        navigate(`/staff/${targetOutlet}`, { replace: true });
      } else {
        setErrorMessage(`No staff account found for "${cleanId}". Please check your email.`);
      }
      return;
    }

    if (selectedRole === 'admin') {
      const result = adminLogin(cleanId, password);
      if (result.success) {
        navigate('/admin', { replace: true });
      } else {
        setErrorMessage(result.error || `Invalid Administrator credentials for "${cleanId}".`);
      }
    }
  };

  // Main login submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(null);
    setIsSubmitting(true);

    const cleanId = (identifier || '').trim().toLowerCase();
    const registered = getRegisteredUsers();

    // 1. STUDENT LOGIN FLOW
    if (selectedRole === 'student') {
      // Cross-role guard: check if user tried entering staff credentials
      const isStaffMatch = (staffList || []).some(
        s => s.email?.toLowerCase() === cleanId || s.staffId?.toLowerCase() === cleanId
      );
      if (isStaffMatch) {
        setIsSubmitting(false);
        setErrorMessage('This account is registered as Outlet Staff. Please select the "Staff" tab above to login.');
        return;
      }

      // Cross-role guard: check if user tried entering admin credentials
      if (cleanId.includes('dean') || cleanId.includes('admin') || cleanId === 'cgc-adm-001') {
        setIsSubmitting(false);
        setErrorMessage('This account is registered as University Admin. Please select the "Admin" tab above to login.');
        return;
      }

      const result = await login(identifier, password, rememberMe);
      setIsSubmitting(false);

      if (result.success) {
        navigate(from, { replace: true });
      } else {
        setErrorMessage(result.error || 'Invalid Student ID/Email or password. Please try again.');
      }
      return;
    }

    // 2. STAFF LOGIN FLOW
    if (selectedRole === 'staff') {
      // Cross-role guard: check if user entered student ID
      const isStudentMatch = registered.some(
        s => s.studentId?.toLowerCase() === cleanId || s.email?.toLowerCase() === cleanId
      );
      if (isStudentMatch) {
        setIsSubmitting(false);
        setErrorMessage('This account is registered as a Student. Please select the "Student" tab above to login.');
        return;
      }

      // Cross-role guard: check if admin
      if (cleanId.includes('dean') || cleanId.includes('admin') || cleanId === 'cgc-adm-001') {
        setIsSubmitting(false);
        setErrorMessage('This account is registered as University Admin. Please select the "Admin" tab above to login.');
        return;
      }

      const result = staffLogin(identifier, password);
      setIsSubmitting(false);

      if (result.success) {
        const targetOutlet = result.staff?.assignedOutletId || 'kulhad';
        navigate(`/staff/${targetOutlet}`, { replace: true });
      } else {
        setErrorMessage(result.error || 'Invalid Staff credentials. Please check your ID and password.');
      }
      return;
    }

    // 3. ADMIN LOGIN FLOW
    if (selectedRole === 'admin') {
      const isStudentMatch = registered.some(
        s => s.studentId?.toLowerCase() === cleanId || s.email?.toLowerCase() === cleanId
      );
      if (isStudentMatch) {
        setIsSubmitting(false);
        setErrorMessage('This account is registered as a Student. Please select the "Student" tab above to login.');
        return;
      }

      const isStaffMatch = (staffList || []).some(
        s => s.role !== 'University Admin' && (s.email?.toLowerCase() === cleanId || s.staffId?.toLowerCase() === cleanId)
      );
      if (isStaffMatch) {
        setIsSubmitting(false);
        setErrorMessage('This account is registered as Outlet Staff. Please select the "Staff" tab above to login.');
        return;
      }

      const result = adminLogin(identifier, password);
      setIsSubmitting(false);

      if (result.success) {
        navigate('/admin', { replace: true });
      } else {
        setErrorMessage(result.error || 'Invalid Administrator credentials. Please check your email and password.');
      }
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center overflow-x-hidden font-sans antialiased text-stone-900 selection:bg-[#DE4927] selection:text-white bg-[#FAF7F0] dark:bg-[#101713]">
      
      {/* Background on Desktop: Realistic 3D Signboard Cafe Scene */}
      <div className="fixed inset-0 z-0 hidden lg:block">
        <img
          src="/images/brand/hero-signboard.jpg"
          alt="Campus Cravings Signboard"
          className="w-full h-full object-cover object-[24%_center] filter brightness-[0.92]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/35 to-black/55" />
      </div>

      {/* Background on Mobile: Warm Terracotta Gradient Arc matching reference image */}
      <div className="absolute top-0 left-0 right-0 h-44 sm:h-52 bg-gradient-to-b from-[#DE4927] via-[#D84220] to-[#C93818] z-0 lg:hidden" />

      {/* Main Container: Responsive Split-Screen / Mobile Stack */}
      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-12 py-3 sm:py-6 px-2.5 sm:px-6">
        
        {/* Mobile Top Navigation Bar (< lg screens) */}
        <div className="lg:hidden w-full flex items-center justify-between pt-1 pb-3 text-white">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-white bg-black/25 hover:bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20 transition-all"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Home</span>
          </Link>

          <div className="bg-black/25 backdrop-blur-md p-1 rounded-full border border-white/20">
            <ThemeToggle />
          </div>
        </div>

        {/* LEFT PANEL: Brand Visual & Feature Highlights (Desktop Only, ~50% width) */}
        <div className="hidden lg:flex w-full lg:w-1/2 flex-col justify-between text-white py-8 px-6">
          
          {/* Top navigation back link & theme toggle */}
          <div className="flex items-center justify-between mb-16">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-white/90 hover:text-white bg-black/30 hover:bg-black/50 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/20 transition-all"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Home</span>
            </Link>

            <div className="bg-black/30 backdrop-blur-md p-1 rounded-full border border-white/20">
              <ThemeToggle />
            </div>
          </div>

          {/* Script Headline matching reference image */}
          <div className="space-y-3 mb-20">
            <h1 
              style={{ fontFamily: "'Caveat', cursive" }}
              className="text-white text-5xl sm:text-6xl lg:text-[68px] xl:text-[76px] font-bold leading-[1.08] tracking-wide drop-shadow-xl"
            >
              Your Campus.<br />
              Your Cravings.<br />
              One Place.
            </h1>

            {/* Orange-Red Brush Stroke Underline */}
            <div className="pt-1">
              <svg 
                className="w-44 sm:w-56 h-3 text-[#DE4927]" 
                viewBox="0 0 200 12" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  d="M3 8.5C50 2 150 1.5 197 7" 
                  stroke="currentColor" 
                  strokeWidth="5" 
                  strokeLinecap="round" 
                />
              </svg>
            </div>
          </div>

          {/* 3 Horizontal Feature Items matching reference */}
          <div className="grid grid-cols-3 gap-6 pt-4 border-t border-white/15">
            
            {/* Feature 1: Explore Campus Outlets */}
            <div className="flex flex-col items-center text-center space-y-2">
              <div className="w-12 h-12 rounded-full bg-[#DE864F] text-white flex items-center justify-center shadow-lg shadow-black/30">
                <Utensils className="w-5 h-5" />
              </div>
              <div className="font-bold text-white text-xs sm:text-sm leading-tight drop-shadow-sm">
                Explore<br />Campus Outlets
              </div>
              <p className="text-white/80 text-[10px] sm:text-xs leading-relaxed max-w-[130px]">
                Discover a variety of food outlets in one place.
              </p>
            </div>

            {/* Feature 2: Order Easily */}
            <div className="flex flex-col items-center text-center space-y-2">
              <div className="w-12 h-12 rounded-full bg-[#DE864F] text-white flex items-center justify-center shadow-lg shadow-black/30">
                <ShoppingCart className="w-5 h-5" />
              </div>
              <div className="font-bold text-white text-xs sm:text-sm leading-tight drop-shadow-sm">
                Order Easily
              </div>
              <p className="text-white/80 text-[10px] sm:text-xs leading-relaxed max-w-[130px]">
                Browse menus and add your favourite items.
              </p>
            </div>

            {/* Feature 3: Quick Pickup */}
            <div className="flex flex-col items-center text-center space-y-2">
              <div className="w-12 h-12 rounded-full bg-[#DE864F] text-white flex items-center justify-center shadow-lg shadow-black/30">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div className="font-bold text-white text-xs sm:text-sm leading-tight drop-shadow-sm">
                Quick Pickup
              </div>
              <p className="text-white/80 text-[10px] sm:text-xs leading-relaxed max-w-[130px]">
                Order online and pickup without queues.
              </p>
            </div>

          </div>

        </div>

        {/* RIGHT PANEL: White Rounded Login Card (Matches Right Phone Screen Exactly) */}
        <div className="w-full lg:w-[480px] xl:w-[500px]">
          <div className="bg-white dark:bg-[#18201A] rounded-3xl sm:rounded-[36px] shadow-2xl p-4 sm:p-7 lg:p-9 border border-stone-200/90 dark:border-stone-800">
            
            {/* Top Official Illustrated Campus Cravings Logo */}
            <div className="text-center mb-2.5">
              <Link to="/" className="inline-block group">
                <img
                  src="/images/brand/logo.png"
                  alt="Campus Cravings"
                  className="h-14 sm:h-18 w-auto mx-auto object-contain transition-transform group-hover:scale-102"
                />
              </Link>
            </div>

            {/* Heading & Subtitle matching reference */}
            <div className="text-center mb-5">
              <h2 
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                className="text-2xl sm:text-3xl font-bold text-[#1E232A] dark:text-white tracking-tight"
              >
                Welcome Back!
              </h2>
              <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
                Login to continue to your Campus Cravings account.
              </p>
            </div>

            {/* Three Selectable Role Cards (Student, Staff, Admin) */}
            <div className="grid grid-cols-3 gap-1.5 sm:gap-2.5 mb-5">
              
              {/* Student Role Card */}
              <button
                type="button"
                onClick={() => handleRoleChange('student')}
                className={`flex flex-col items-center text-center p-2 sm:p-3 rounded-2xl border transition-all cursor-pointer min-h-[72px] justify-center ${
                  selectedRole === 'student'
                    ? 'border-[#DE4927] bg-[#FFF5F1] dark:bg-[#2A1814] shadow-xs'
                    : 'border-stone-200/90 dark:border-stone-800 bg-[#F9FAFB] dark:bg-[#1E2620] hover:bg-stone-100 dark:hover:bg-stone-800'
                }`}
              >
                <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center mb-1 ${
                  selectedRole === 'student' ? 'text-[#DE4927]' : 'text-stone-400 dark:text-stone-500'
                }`}>
                  <GraduationCap className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <span className="font-bold text-xs sm:text-sm text-[#1E232A] dark:text-white">Student</span>
                <span className="text-[9px] sm:text-[10px] text-stone-500 dark:text-stone-400 leading-tight mt-0.5">
                  Order food &<br />track orders
                </span>
              </button>

              {/* Staff Role Card */}
              <button
                type="button"
                onClick={() => handleRoleChange('staff')}
                className={`flex flex-col items-center text-center p-2 sm:p-3 rounded-2xl border transition-all cursor-pointer min-h-[72px] justify-center ${
                  selectedRole === 'staff'
                    ? 'border-[#2563EB] bg-[#EFF6FF] dark:bg-[#142033] shadow-xs'
                    : 'border-stone-200/90 dark:border-stone-800 bg-[#F9FAFB] dark:bg-[#1E2620] hover:bg-stone-100 dark:hover:bg-stone-800'
                }`}
              >
                <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center mb-1 ${
                  selectedRole === 'staff' ? 'text-[#2563EB]' : 'text-stone-400 dark:text-stone-500'
                }`}>
                  <UtensilsCrossed className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <span className="font-bold text-xs sm:text-sm text-[#1E232A] dark:text-white">Staff</span>
                <span className="text-[9px] sm:text-[10px] text-stone-500 dark:text-stone-400 leading-tight mt-0.5">
                  Manage menu<br />& orders
                </span>
              </button>

              {/* Admin Role Card */}
              <button
                type="button"
                onClick={() => handleRoleChange('admin')}
                className={`flex flex-col items-center text-center p-2 sm:p-3 rounded-2xl border transition-all cursor-pointer min-h-[72px] justify-center ${
                  selectedRole === 'admin'
                    ? 'border-[#7C3AED] bg-[#F5F3FF] dark:bg-[#221833] shadow-xs'
                    : 'border-stone-200/90 dark:border-stone-800 bg-[#F9FAFB] dark:bg-[#1E2620] hover:bg-stone-100 dark:hover:bg-stone-800'
                }`}
              >
                <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center mb-1 ${
                  selectedRole === 'admin' ? 'text-[#7C3AED]' : 'text-stone-400 dark:text-stone-500'
                }`}>
                  <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <span className="font-bold text-xs sm:text-sm text-[#1E232A] dark:text-white">Admin</span>
                <span className="text-[9px] sm:text-[10px] text-stone-500 dark:text-stone-400 leading-tight mt-0.5">
                  Manage users<br />& platform
                </span>
              </button>

            </div>

            {/* Dynamic Form Header */}
            <div className="mb-3.5">
              <h3 className="font-bold text-sm sm:text-base text-[#1E232A] dark:text-white">
                {selectedRole === 'student' && 'Student Login'}
                {selectedRole === 'staff' && 'Staff Login'}
                {selectedRole === 'admin' && 'Admin Login'}
              </h3>
              <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5 leading-tight">
                {selectedRole === 'student' && 'Access campus food outlets, place orders, and track your orders.'}
                {selectedRole === 'staff' && 'Manage outlet menus, incoming orders, and kitchen preparation.'}
                {selectedRole === 'admin' && 'Oversee campus outlets, platform analytics, and user accounts.'}
              </p>
            </div>

            {/* Error Message Alert */}
            {errorMessage && (
              <div className="mb-3.5 p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-xs text-rose-800 dark:text-rose-200 flex items-start gap-2 animate-in fade-in">
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                <span className="leading-snug">{errorMessage}</span>
              </div>
            )}

            {/* Currently Logged In Alert if already authenticated as student */}
            {isAuthenticated && selectedRole === 'student' && (
              <div className="mb-3.5 p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-xs text-emerald-900 dark:text-emerald-200 flex items-center justify-between gap-2">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Signed in as <strong>{user?.name}</strong></span>
                </div>
                <Link to="/dashboard" className="text-[#DE4927] font-bold underline shrink-0">
                  Dashboard →
                </Link>
              </div>
            )}

            {/* Main Login Form */}
            <form onSubmit={handleSubmit} className="space-y-3">
              
              {/* Identifier Input */}
              <div className="relative">
                <Mail className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  name="identifier"
                  id="login-identifier"
                  autoComplete="username"
                  required
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  placeholder={
                    selectedRole === 'student'
                      ? 'Student Email or Registered ID'
                      : selectedRole === 'staff'
                      ? 'Staff Email or Staff ID'
                      : 'Admin Email or Username'
                  }
                  className="w-full pl-10 pr-3.5 py-3 rounded-xl border border-stone-200 dark:border-stone-700 text-xs sm:text-sm text-stone-900 dark:text-white placeholder:text-stone-400 dark:placeholder:text-stone-500 focus:outline-hidden focus:border-[#DE4927] focus:ring-1 focus:ring-[#DE4927] transition-all bg-white dark:bg-[#1E2620] min-h-[44px]"
                />
              </div>

              {/* Password Input */}
              <div className="relative">
                <Lock className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  id="login-password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  className="w-full pl-10 pr-10 py-3 rounded-xl border border-stone-200 dark:border-stone-700 text-xs sm:text-sm text-stone-900 dark:text-white placeholder:text-stone-400 dark:placeholder:text-stone-500 focus:outline-hidden focus:border-[#DE4927] focus:ring-1 focus:ring-[#DE4927] transition-all bg-white dark:bg-[#1E2620] min-h-[44px]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 cursor-pointer p-1"
                  title={showPassword ? 'Hide password' : 'Show password'}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              {/* Remember Me & Forgot Password Row */}
              <div className="flex items-center justify-between pt-0.5">
                <label className="flex items-center gap-2 cursor-pointer text-xs text-stone-600 dark:text-stone-400 font-medium">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 rounded-sm border-stone-300 dark:border-stone-600 text-[#DE4927] focus:ring-[#DE4927] cursor-pointer"
                  />
                  <span>Remember me</span>
                </label>

                <Link
                  to="/forgot-password"
                  className="text-xs text-[#2563EB] hover:underline font-semibold"
                >
                  Forgot Password?
                </Link>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 rounded-xl bg-[#DE4927] hover:bg-[#C23C1E] text-white font-bold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 min-h-[48px] mt-1"
              >
                <span>
                  {isSubmitting
                    ? 'Logging in...'
                    : selectedRole === 'student'
                    ? 'Login as Student'
                    : selectedRole === 'staff'
                    ? 'Login as Staff'
                    : 'Login as Admin'}
                </span>
                <ArrowRight className="w-4 h-4 text-white" />
              </button>

            </form>

            {/* OR Divider matching Reference Image */}
            <div className="relative my-3.5">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-stone-200 dark:border-stone-800" />
              </div>
              <div className="relative flex justify-center text-[10px] uppercase tracking-wider font-bold text-stone-400 bg-white dark:bg-[#18201A] px-3">
                OR
              </div>
            </div>

            {/* Continue with Google Button matching Reference Image */}
            <button
              type="button"
              onClick={handleGoogleLogin}
              className="w-full py-2.5 px-4 rounded-xl bg-white dark:bg-[#1E2620] hover:bg-stone-50 dark:hover:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-700 dark:text-stone-200 font-bold text-xs sm:text-sm flex items-center justify-center gap-2.5 shadow-2xs hover:shadow-xs transition-all cursor-pointer min-h-[44px]"
            >
              <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
              </svg>
              <span>Continue with Google</span>
            </button>

            {/* Bottom Register Link */}
            <div className="text-center pt-3 mt-1">
              <span className="text-xs text-stone-500 dark:text-stone-400">
                Don't have an account?{' '}
                <Link
                  to="/register"
                  className="text-[#2563EB] font-bold hover:underline"
                >
                  Register here
                </Link>
              </span>
            </div>

            {/* Bottom Decorative Food Section matching Right Phone in Reference Image */}
            <div className="mt-4 rounded-2xl bg-[#FAF4ED] dark:bg-[#201915] p-3 sm:p-3.5 border border-amber-100 dark:border-stone-800 flex items-center justify-between gap-2.5 overflow-hidden">
              <div className="shrink-0">
                <div 
                  style={{ fontFamily: "'Caveat', cursive" }}
                  className="text-2xl sm:text-3xl font-bold text-[#9A5B2C] leading-none"
                >
                  Good Food<br />
                  <span className="text-[#DE4927]">Brighter Days</span>
                </div>
                <p className="text-[10px] text-stone-500 dark:text-stone-400 mt-1">
                  17 Campus Outlets
                </p>
              </div>
              <div className="w-28 sm:w-36 h-20 sm:h-22 rounded-xl overflow-hidden shrink-0 shadow-xs border border-white/80">
                <img
                  src="/images/brand/login-food-banner.jpg"
                  alt="Delicious burger, golden fries and chilled coffee"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
}
