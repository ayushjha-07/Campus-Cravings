import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  ArrowLeft, 
  User, 
  Mail, 
  Phone, 
  Lock, 
  Eye, 
  EyeOff, 
  Store, 
  Zap, 
  Tag, 
  Clock, 
  ArrowRight,
  AlertCircle, 
  CheckCircle2, 
  UtensilsCrossed, 
  CreditCard
} from 'lucide-react';
import ThemeToggle from '../components/ThemeToggle';

export default function RegisterPage() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    studentId: '',
    phone: '',
    password: '',
    confirmPassword: '',
    termsAccepted: false
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errorMessage) setErrorMessage(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(null);

    // Form Validations matching requirements
    if (!formData.name.trim()) {
      setErrorMessage('Please enter your full name.');
      return;
    }
    if (!formData.email.trim() || !formData.email.includes('@')) {
      setErrorMessage('Please enter a valid college email address (e.g. name@cgc.ac.in).');
      return;
    }
    if (!formData.studentId.trim() || formData.studentId.trim().length < 4) {
      setErrorMessage('Student ID must be at least 4 characters (e.g. CGC2024CSE101).');
      return;
    }
    if (!formData.phone.trim() || formData.phone.replace(/\D/g, '').length < 10) {
      setErrorMessage('Please enter a valid 10-digit mobile contact number.');
      return;
    }
    if (!formData.password || formData.password.length < 6) {
      setErrorMessage('Password must be at least 6 characters long.');
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setErrorMessage('Passwords do not match. Please ensure both passwords match.');
      return;
    }
    if (!formData.termsAccepted) {
      setErrorMessage('Please accept the Terms and Conditions to proceed.');
      return;
    }

    setIsSubmitting(true);
    const result = await register({
      ...formData,
      department: 'Computer Science & Engineering',
      hostel: 'Campus Day Scholar'
    });
    setIsSubmitting(false);

    if (result.success) {
      navigate('/profile');
    } else {
      setErrorMessage(result.error);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF7F0] flex flex-col lg:flex-row antialiased font-sans text-stone-900 selection:bg-[#064E36] selection:text-white">
      
      {/* Mobile Top Header (Visible on Mobile / Tablet) */}
      <div className="lg:hidden bg-white border-b border-stone-200/80 px-4 py-3.5 flex items-center justify-between sticky top-0 z-30">
        <Link 
          to="/login"
          className="p-1.5 -ml-1.5 rounded-xl text-stone-700 hover:bg-stone-100 transition-colors"
          aria-label="Back to login"
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

      {/* Left Panel: Desktop Split-Screen (Dark Forest-Green with Pizza Photography) */}
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
              Be a part of a <br />
              <span className="text-[#F97316]">tastier campus.</span>
            </h1>
            <p className="text-emerald-100/90 text-sm xl:text-base leading-relaxed">
              Create your account and start ordering from CGC University food outlets.
            </p>
          </div>

          {/* 4 Feature Badges with Orange Circle Icons */}
          <div className="grid grid-cols-2 gap-3.5 pt-2">
            
            <div className="flex items-center gap-2.5 text-xs font-bold text-white">
              <div className="w-6 h-6 rounded-full bg-[#F97316]/20 border border-[#F97316]/60 flex items-center justify-center shrink-0">
                <Store className="w-3.5 h-3.5 text-[#F97316]" />
              </div>
              <span>Explore All Outlets</span>
            </div>

            <div className="flex items-center gap-2.5 text-xs font-bold text-white">
              <div className="w-6 h-6 rounded-full bg-[#F97316]/20 border border-[#F97316]/60 flex items-center justify-center shrink-0">
                <Zap className="w-3.5 h-3.5 text-[#F97316]" />
              </div>
              <span>Easy Ordering</span>
            </div>

            <div className="flex items-center gap-2.5 text-xs font-bold text-white">
              <div className="w-6 h-6 rounded-full bg-[#F97316]/20 border border-[#F97316]/60 flex items-center justify-center shrink-0">
                <Tag className="w-3.5 h-3.5 text-[#F97316]" />
              </div>
              <span>Exclusive Offers</span>
            </div>

            <div className="flex items-center gap-2.5 text-xs font-bold text-white">
              <div className="w-6 h-6 rounded-full bg-[#F97316]/20 border border-[#F97316]/60 flex items-center justify-center shrink-0">
                <Clock className="w-3.5 h-3.5 text-[#F97316]" />
              </div>
              <span>Faster Pickup</span>
            </div>

          </div>
        </div>

        {/* Bottom Food Photography: Artisan Hot Pizza */}
        <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl border border-white/10 group">
          <img
            src="https://images.unsplash.com/photo-1513104890138-7c749659a591?w=900&auto=format&fit=crop&q=80"
            alt="Freshly baked artisan pizza at Dominos CGC food counter"
            className="w-full h-64 xl:h-72 object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#043B2B]/90 via-[#043B2B]/20 to-transparent" />
          
          <div className="absolute bottom-4 left-5 right-5 flex items-center justify-between text-xs text-white">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#EAA044] animate-pulse" />
              <span className="font-bold text-emerald-100">Dominos & Cafe Counters</span>
            </div>
            <span className="text-emerald-200/80 font-medium">Block 3 Canteen</span>
          </div>
        </div>

      </div>

      {/* Right Panel: Form Screen */}
      <div className="flex-1 flex flex-col justify-center items-center p-6 sm:p-10 lg:p-12 xl:p-16 max-w-xl mx-auto w-full">
        
        {/* Desktop Top Back Link & Theme Toggle */}
        <div className="hidden lg:flex w-full items-center justify-between mb-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-xs font-bold text-stone-500 hover:text-[#064E36] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>
          <ThemeToggle />
        </div>

        {/* Content Card */}
        <div className="w-full max-w-md space-y-5">
          
          {/* Header Texts */}
          <div className="text-center lg:text-left space-y-1">
            <h2 className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight">
              Create Your Account
            </h2>
            <p className="text-xs sm:text-sm text-stone-500">
              Join Campus Cravings today.
            </p>
          </div>

          {/* Error Message Alert */}
          {errorMessage && (
            <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-xs text-rose-800 flex items-start gap-2.5 animate-in fade-in">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <div className="leading-relaxed font-medium">{errorMessage}</div>
            </div>
          )}

          {/* Registration Form */}
          <form onSubmit={handleSubmit} className="space-y-3.5">
            
            {/* Full Name */}
            <div>
              <div className="relative">
                <User className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  placeholder="Full Name"
                  className="w-full pl-10 pr-4 py-2.5 sm:py-3 rounded-2xl bg-white border border-stone-200 text-xs sm:text-sm text-stone-900 placeholder:text-stone-400 focus:outline-hidden focus:ring-2 focus:ring-[#064E36]/20 focus:border-[#064E36] transition-all shadow-2xs"
                />
              </div>
            </div>

            {/* College Email */}
            <div>
              <div className="relative">
                <Mail className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  placeholder="College Email (e.g. name@cgc.ac.in)"
                  className="w-full pl-10 pr-4 py-2.5 sm:py-3 rounded-2xl bg-white border border-stone-200 text-xs sm:text-sm text-stone-900 placeholder:text-stone-400 focus:outline-hidden focus:ring-2 focus:ring-[#064E36]/20 focus:border-[#064E36] transition-all shadow-2xs"
                />
              </div>
            </div>

            {/* Student ID */}
            <div>
              <div className="relative">
                <CreditCard className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  required
                  value={formData.studentId}
                  onChange={(e) => handleChange('studentId', e.target.value)}
                  placeholder="Student ID"
                  className="w-full pl-10 pr-4 py-2.5 sm:py-3 rounded-2xl bg-white border border-stone-200 text-xs sm:text-sm text-stone-900 placeholder:text-stone-400 focus:outline-hidden focus:ring-2 focus:ring-[#064E36]/20 focus:border-[#064E36] transition-all shadow-2xs"
                />
              </div>
            </div>

            {/* Phone Number */}
            <div>
              <div className="relative">
                <Phone className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => handleChange('phone', e.target.value)}
                  placeholder="Phone Number"
                  className="w-full pl-10 pr-4 py-2.5 sm:py-3 rounded-2xl bg-white border border-stone-200 text-xs sm:text-sm text-stone-900 placeholder:text-stone-400 focus:outline-hidden focus:ring-2 focus:ring-[#064E36]/20 focus:border-[#064E36] transition-all shadow-2xs"
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
                  value={formData.password}
                  onChange={(e) => handleChange('password', e.target.value)}
                  placeholder="Password"
                  className="w-full pl-10 pr-11 py-2.5 sm:py-3 rounded-2xl bg-white border border-stone-200 text-xs sm:text-sm text-stone-900 placeholder:text-stone-400 focus:outline-hidden focus:ring-2 focus:ring-[#064E36]/20 focus:border-[#064E36] transition-all shadow-2xs"
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

            {/* Confirm Password */}
            <div>
              <div className="relative">
                <Lock className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  required
                  value={formData.confirmPassword}
                  onChange={(e) => handleChange('confirmPassword', e.target.value)}
                  placeholder="Confirm Password"
                  className="w-full pl-10 pr-11 py-2.5 sm:py-3 rounded-2xl bg-white border border-stone-200 text-xs sm:text-sm text-stone-900 placeholder:text-stone-400 focus:outline-hidden focus:ring-2 focus:ring-[#064E36]/20 focus:border-[#064E36] transition-all shadow-2xs"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 text-stone-400 hover:text-stone-600 cursor-pointer"
                  title={showConfirmPassword ? 'Hide password' : 'Show password'}
                  aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                >
                  {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Terms and Conditions Checkbox */}
            <div className="pt-1">
              <label className="flex items-center gap-2 cursor-pointer text-xs text-stone-600 font-medium">
                <input
                  type="checkbox"
                  checked={formData.termsAccepted}
                  onChange={(e) => handleChange('termsAccepted', e.target.checked)}
                  className="w-4 h-4 rounded-md border-stone-300 text-[#064E36] focus:ring-[#064E36]/20 cursor-pointer shrink-0"
                />
                <span>
                  I agree to the{' '}
                  <span className="text-[#F97316] font-bold">Terms and Conditions</span>
                </span>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 rounded-2xl bg-[#064E36] hover:bg-[#043B2B] text-white font-black text-xs sm:text-sm shadow-md shadow-emerald-950/15 hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
            >
              <span>{isSubmitting ? 'Creating Account...' : 'Create Account'}</span>
              <ArrowRight className="w-4 h-4 text-[#EAA044]" />
            </button>

          </form>

          {/* Link back to Login */}
          <div className="text-center pt-2">
            <span className="text-xs text-stone-500 font-medium">
              Already have an account?{' '}
              <Link
                to="/login"
                className="font-bold text-[#F97316] hover:underline"
              >
                Sign In
              </Link>
            </span>
          </div>

        </div>

      </div>

    </div>
  );
}
