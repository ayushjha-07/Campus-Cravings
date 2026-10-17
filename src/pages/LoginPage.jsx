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
  Sparkles,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { STORAGE_KEYS, SEED_STUDENTS } from '../utils/authUtils';
import ThemeToggle from '../components/ThemeToggle';

export default function LoginPage() {
  const { login, quickDemoLogin, isAuthenticated, user } = useAuth();
  const { adminLogin, staffList } = useAdmin();
  const navigate = useNavigate();
  const location = useLocation();

  // Selected login role: 'student' | 'staff' | 'admin'
  const [selectedRole, setSelectedRole] = useState('student');

  // Input fields
  const [identifier, setIdentifier] = useState('CGC2023CSE042');
  const [password, setPassword] = useState('password123');
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

    // Pre-populate sensible demo credentials per role for seamless testing
    if (role === 'student') {
      try {
        const saved = localStorage.getItem(STORAGE_KEYS.REMEMBER_ME);
        setIdentifier(saved || 'CGC2023CSE042');
      } catch {
        setIdentifier('CGC2023CSE042');
      }
      setPassword('password123');
    } else if (role === 'staff') {
      setIdentifier('rajesh.kulhad@cgc.edu.in');
      setPassword('password123');
    } else if (role === 'admin') {
      setIdentifier('dean.welfare@cgc.edu.in');
      setPassword('admin123');
    }
  };

  // Pre-populate remember me on initial mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.REMEMBER_ME);
      if (saved) {
        setIdentifier(saved);
        setPassword('password123');
      }
    } catch {
      // ignore
    }
  }, []);

  // Quick Demo fill buttons
  const handleQuickFill = (role, demoId, demoPass) => {
    setSelectedRole(role);
    setIdentifier(demoId);
    setPassword(demoPass);
    setErrorMessage(null);
  };

  // Main login submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(null);
    setIsSubmitting(true);

    const cleanId = (identifier || '').trim().toLowerCase();

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
      const isStudentMatch = SEED_STUDENTS.some(
        s => s.studentId.toLowerCase() === cleanId || s.email.toLowerCase() === cleanId
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

      // Match staff member in staffList
      const matchedStaff = (staffList || []).find(s => 
        s.email?.toLowerCase() === cleanId || 
        s.staffId?.toLowerCase() === cleanId ||
        s.name?.toLowerCase() === cleanId
      );

      setIsSubmitting(false);

      if (matchedStaff) {
        // Redirect to their assigned outlet terminal (defaults to kulhad)
        const targetOutlet = matchedStaff.assignedOutletId || 'kulhad';
        navigate(`/staff/${targetOutlet}`, { replace: true });
      } else {
        setErrorMessage('No staff account found with this ID or Email. (Demo hint: rajesh.kulhad@cgc.edu.in)');
      }
      return;
    }

    // 3. ADMIN LOGIN FLOW
    if (selectedRole === 'admin') {
      // Cross-role guards
      const isStudentMatch = SEED_STUDENTS.some(
        s => s.studentId.toLowerCase() === cleanId || s.email.toLowerCase() === cleanId
      );
      if (isStudentMatch) {
        setIsSubmitting(false);
        setErrorMessage('This account is registered as a Student. Please select the "Student" tab above to login.');
        return;
      }

      const isStaffMatch = (staffList || []).some(
        s => s.email?.toLowerCase() === cleanId || s.staffId?.toLowerCase() === cleanId
      );
      if (isStaffMatch) {
        setIsSubmitting(false);
        setErrorMessage('This account is registered as Outlet Staff. Please select the "Staff" tab above to login.');
        return;
      }

      // Check admin credentials
      if (
        cleanId.includes('admin') || 
        cleanId.includes('dean') || 
        cleanId === 'cgc-adm-001' || 
        cleanId === 'dean.welfare@cgc.edu.in'
      ) {
        adminLogin(identifier, password);
        setIsSubmitting(false);
        navigate('/admin', { replace: true });
      } else {
        setIsSubmitting(false);
        setErrorMessage('Invalid Administrator credentials. (Demo hint: dean.welfare@cgc.edu.in)');
      }
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center p-3 sm:p-6 lg:p-8 overflow-x-hidden font-sans antialiased text-stone-900 selection:bg-[#DE4927] selection:text-white">
      
      {/* Background: Realistic 3D Signboard Cafe Atmosphere */}
      <div className="fixed inset-0 z-0">
        <img
          src="/images/brand/hero-signboard.jpg"
          alt="Campus Cravings Signboard"
          className="w-full h-full object-cover object-[24%_center] filter brightness-[0.92]"
        />
        {/* Soft vignette to guarantee crisp readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/35 to-black/55" />
      </div>

      {/* Main Container: Split-Screen Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12 py-4">
        
        {/* LEFT PANEL: Brand Visual & Feature Highlights (~50% width on Desktop) */}
        <div className="w-full lg:w-1/2 flex flex-col justify-between text-white py-4 lg:py-8 px-2 sm:px-6">
          
          {/* Top navigation back link */}
          <div className="flex items-center justify-between mb-8 lg:mb-16">
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

          {/* Script Headline matching the reference image */}
          <div className="space-y-3 mb-10 lg:mb-20">
            <h1 
              style={{ fontFamily: "'Caveat', cursive" }}
              className="text-white text-5xl sm:text-6xl lg:text-[68px] xl:text-[76px] font-bold leading-[1.08] tracking-wide drop-shadow-xl"
            >
              Your Campus.<br />
              Your Cravings.<br />
              One Place.
            </h1>

            {/* Orange-Red Brush Stroke Underline directly beneath "One Place." */}
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

          {/* 3 Horizontal Feature Items matching reference bottom row */}
          <div className="grid grid-cols-3 gap-3 sm:gap-6 pt-4 border-t border-white/15">
            
            {/* Feature 1: Explore Campus Outlets */}
            <div className="flex flex-col items-center text-center space-y-2">
              <div className="w-12 h-12 rounded-full bg-[#DE864F] text-white flex items-center justify-center shadow-lg shadow-black/30">
                <Utensils className="w-5 h-5" />
              </div>
              <div className="font-bold text-white text-xs sm:text-sm leading-tight drop-shadow-sm">
                Explore<br />Campus Outlets
              </div>
              <p className="text-white/80 text-[10px] sm:text-xs leading-relaxed max-w-[130px] hidden sm:block">
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
              <p className="text-white/80 text-[10px] sm:text-xs leading-relaxed max-w-[130px] hidden sm:block">
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
              <p className="text-white/80 text-[10px] sm:text-xs leading-relaxed max-w-[130px] hidden sm:block">
                Order online and pickup without queues.
              </p>
            </div>

          </div>

        </div>

        {/* RIGHT PANEL: White Rounded Login Card (Matches Reference Image) */}
        <div className="w-full lg:w-[480px] xl:w-[500px]">
          <div className="bg-white rounded-3xl sm:rounded-[36px] shadow-2xl p-6 sm:p-9 border border-white/80">
            
            {/* Top Official Illustrated Campus Cravings Logo */}
            <div className="text-center mb-3">
              <Link to="/" className="inline-block group">
                <img
                  src="/images/brand/logo.png"
                  alt="Campus Cravings"
                  className="h-16 sm:h-20 w-auto mx-auto object-contain transition-transform group-hover:scale-102"
                />
              </Link>
            </div>

            {/* Heading & Subtitle */}
            <div className="text-center mb-6">
              <h2 
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                className="text-2xl sm:text-3xl font-bold text-[#1E232A] tracking-tight"
              >
                Welcome Back!
              </h2>
              <p className="text-xs sm:text-sm text-stone-500 mt-1">
                Login to continue to your Campus Cravings account
              </p>
            </div>

            {/* Three Selectable Role Cards */}
            <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-6">
              
              {/* Student Role Card */}
              <button
                type="button"
                onClick={() => handleRoleChange('student')}
                className={`flex flex-col items-center text-center p-2.5 sm:p-3 rounded-2xl border transition-all cursor-pointer ${
                  selectedRole === 'student'
                    ? 'border-[#DE4927] bg-[#FFF5F1] shadow-xs'
                    : 'border-stone-200/90 bg-[#F9FAFB] hover:bg-stone-100'
                }`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-1.5 ${
                  selectedRole === 'student' ? 'text-[#DE4927]' : 'text-stone-400'
                }`}>
                  <GraduationCap className="w-6 h-6" />
                </div>
                <span className="font-bold text-xs sm:text-sm text-[#1E232A]">Student</span>
                <span className="text-[10px] sm:text-[11px] text-stone-500 leading-tight mt-0.5">
                  Order food &<br />track orders
                </span>
              </button>

              {/* Staff Role Card */}
              <button
                type="button"
                onClick={() => handleRoleChange('staff')}
                className={`flex flex-col items-center text-center p-2.5 sm:p-3 rounded-2xl border transition-all cursor-pointer ${
                  selectedRole === 'staff'
                    ? 'border-[#2563EB] bg-[#EFF6FF] shadow-xs'
                    : 'border-stone-200/90 bg-[#F9FAFB] hover:bg-stone-100'
                }`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-1.5 ${
                  selectedRole === 'staff' ? 'text-[#2563EB]' : 'text-stone-400'
                }`}>
                  <UtensilsCrossed className="w-5 h-5" />
                </div>
                <span className="font-bold text-xs sm:text-sm text-[#1E232A]">Staff</span>
                <span className="text-[10px] sm:text-[11px] text-stone-500 leading-tight mt-0.5">
                  Manage menu<br />& orders
                </span>
              </button>

              {/* Admin Role Card */}
              <button
                type="button"
                onClick={() => handleRoleChange('admin')}
                className={`flex flex-col items-center text-center p-2.5 sm:p-3 rounded-2xl border transition-all cursor-pointer ${
                  selectedRole === 'admin'
                    ? 'border-[#7C3AED] bg-[#F5F3FF] shadow-xs'
                    : 'border-stone-200/90 bg-[#F9FAFB] hover:bg-stone-100'
                }`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-1.5 ${
                  selectedRole === 'admin' ? 'text-[#7C3AED]' : 'text-stone-400'
                }`}>
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <span className="font-bold text-xs sm:text-sm text-[#1E232A]">Admin</span>
                <span className="text-[10px] sm:text-[11px] text-stone-500 leading-tight mt-0.5">
                  Manage users<br />& platform
                </span>
              </button>

            </div>

            {/* Dynamic Form Header */}
            <div className="mb-4">
              <h3 className="font-bold text-sm sm:text-base text-[#1E232A]">
                {selectedRole === 'student' && 'Student Login'}
                {selectedRole === 'staff' && 'Staff Login'}
                {selectedRole === 'admin' && 'Admin Login'}
              </h3>
              <p className="text-xs text-stone-500 mt-0.5">
                {selectedRole === 'student' && 'Access campus food outlets, place orders, and track your orders.'}
                {selectedRole === 'staff' && 'Manage outlet menus, incoming orders, and kitchen preparation.'}
                {selectedRole === 'admin' && 'Oversee campus outlets, platform analytics, and user accounts.'}
              </p>
            </div>

            {/* Error Message Alert */}
            {errorMessage && (
              <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-800 flex items-start gap-2 animate-in fade-in">
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                <span className="leading-snug">{errorMessage}</span>
              </div>
            )}

            {/* Currently Logged In Alert if already authenticated as student */}
            {isAuthenticated && selectedRole === 'student' && (
              <div className="mb-4 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 flex items-center justify-between gap-2">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Currently logged in as <strong>{user?.name}</strong></span>
                </div>
                <Link to="/dashboard" className="text-[#DE4927] font-bold underline shrink-0">
                  Dashboard →
                </Link>
              </div>
            )}

            {/* Main Login Form */}
            <form onSubmit={handleSubmit} className="space-y-3.5">
              
              {/* Identifier Input */}
              <div className="relative">
                <Mail className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
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
                  className="w-full pl-10 pr-3.5 py-3 rounded-xl border border-stone-200 text-xs sm:text-sm text-stone-900 placeholder:text-stone-400 focus:outline-hidden focus:border-[#DE4927] focus:ring-1 focus:ring-[#DE4927] transition-all bg-white"
                />
              </div>

              {/* Password Input */}
              <div className="relative">
                <Lock className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  className="w-full pl-10 pr-10 py-3 rounded-xl border border-stone-200 text-xs sm:text-sm text-stone-900 placeholder:text-stone-400 focus:outline-hidden focus:border-[#DE4927] focus:ring-1 focus:ring-[#DE4927] transition-all bg-white"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 cursor-pointer"
                  title={showPassword ? 'Hide password' : 'Show password'}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              {/* Remember Me & Forgot Password Row */}
              <div className="flex items-center justify-between pt-0.5">
                <label className="flex items-center gap-2 cursor-pointer text-xs text-stone-600 font-medium">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 rounded-sm border-stone-300 text-[#DE4927] focus:ring-[#DE4927] cursor-pointer"
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
                className="w-full py-3.5 rounded-xl bg-[#DE4927] hover:bg-[#C23C1E] text-white font-bold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 mt-2"
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

            {/* Bottom Register Link */}
            <div className="text-center pt-4 mt-2">
              <span className="text-xs text-stone-500">
                Don't have an account?{' '}
                <Link
                  to="/register"
                  className="text-[#2563EB] font-bold hover:underline"
                >
                  Register here
                </Link>
              </span>
            </div>

            {/* Discreet Demo Quick Fill Bar for Examiners */}
            <div className="mt-5 pt-3 border-t border-stone-100">
              <div className="flex items-center justify-between text-[11px] text-stone-500 mb-1.5">
                <div className="flex items-center gap-1 font-bold text-stone-600">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  <span>Demo Evaluation Quick-Fill:</span>
                </div>
                <span className="text-[10px] text-stone-400">Click to fill</span>
              </div>
              <div className="grid grid-cols-3 gap-1.5">
                <button
                  type="button"
                  onClick={() => handleQuickFill('student', 'CGC2023CSE042', 'password123')}
                  className="py-1 px-1.5 rounded-lg bg-stone-50 hover:bg-stone-100 border border-stone-200 text-[10px] font-semibold text-stone-700 truncate cursor-pointer"
                  title="Aarav Sharma (Student)"
                >
                  Student (Aarav)
                </button>
                <button
                  type="button"
                  onClick={() => handleQuickFill('staff', 'rajesh.kulhad@cgc.edu.in', 'password123')}
                  className="py-1 px-1.5 rounded-lg bg-stone-50 hover:bg-stone-100 border border-stone-200 text-[10px] font-semibold text-stone-700 truncate cursor-pointer"
                  title="Rajesh Kumar (Kulhad Staff)"
                >
                  Staff (Rajesh)
                </button>
                <button
                  type="button"
                  onClick={() => handleQuickFill('admin', 'dean.welfare@cgc.edu.in', 'admin123')}
                  className="py-1 px-1.5 rounded-lg bg-stone-50 hover:bg-stone-100 border border-stone-200 text-[10px] font-semibold text-stone-700 truncate cursor-pointer"
                  title="Dr. Harpreet Singh (Dean/Admin)"
                >
                  Admin (Dean)
                </button>
              </div>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
}
