import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  ArrowLeft, 
  Mail, 
  Lock, 
  CheckCircle2, 
  Info, 
  ArrowRight,
  ShieldCheck,
  UtensilsCrossed,
  Sparkles
} from 'lucide-react';
import ThemeToggle from '../components/ThemeToggle';

export default function ForgotPasswordPage() {
  const { requestPasswordReset } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!email.trim()) {
      setErrorMessage('Please enter your registered college email or Student ID.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      const res = requestPasswordReset(email);
      setIsSubmitting(false);
      if (res.success) {
        setIsSubmitted(true);
      } else {
        setErrorMessage(res.error);
      }
    }, 400);
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
        <Link to="/" className="flex items-center">
          <div className="p-1 rounded-xl bg-white shadow-2xs border border-stone-200/80">
            <img
              src="/images/brand/logo.png"
              alt="Campus Cravings Logo"
              className="h-7 w-auto object-contain"
            />
          </div>
        </Link>

        <ThemeToggle />
      </div>

      {/* Left Panel: Desktop Split-Screen (Navy Blue & Warm Red/Gold) */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-[#0D1826] to-[#162544] text-white p-12 xl:p-16 flex-col justify-between relative overflow-hidden">
        
        {/* Subtle Ambient Glow */}
        <div className="absolute -right-20 -top-20 w-96 h-96 bg-[#E63946]/10 rounded-full blur-3xl pointer-events-none" />

        {/* Top Logo & University Title */}
        <div className="relative z-10">
          <Link to="/" className="inline-block p-2 rounded-2xl bg-white shadow-lg border border-white/20 group hover:scale-102 transition-transform">
            <img
              src="/images/brand/logo.png"
              alt="Campus Cravings Logo"
              className="h-11 w-auto object-contain"
            />
          </Link>
          <div className="text-[11px] uppercase font-bold tracking-widest text-amber-300 mt-2">
            CGC UNIVERSITY, MOHALI • STUDENT DINING
          </div>
        </div>

        {/* Center Headline & Supporting Text */}
        <div className="relative z-10 max-w-lg space-y-4 my-8">
          <h1 className="text-4xl xl:text-5xl font-black tracking-tight leading-tight text-white">
            Reset Your <br />
            <span className="text-[#F97316]">Password</span>
          </h1>
          <p className="text-amber-100/90 text-sm xl:text-base leading-relaxed">
            No worries! Enter your email and we'll help you reset your password.
          </p>
        </div>

        {/* Bottom Food Photography: Official 3D Campus Cravings Cafe Signboard */}
        <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl border border-white/10 group">
          <img
            src="/images/brand/hero-signboard.jpg"
            alt="Campus Cravings 3D Signboard at CGC University Cafe"
            className="w-full h-72 xl:h-80 object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B1528]/90 via-[#0B1528]/20 to-transparent" />
          
          <div className="absolute bottom-4 left-5 right-5 flex items-center justify-between text-xs text-white">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#EAA044] animate-pulse" />
              <span className="font-bold text-amber-200">Official Campus Cafes</span>
            </div>
            <span className="text-stone-300 font-medium">17 Express Counters</span>
          </div>
        </div>

      </div>

      {/* Right Panel: Form Screen */}
      <div className="flex-1 flex flex-col justify-center items-center p-6 sm:p-10 lg:p-12 xl:p-16 max-w-xl mx-auto w-full">
        
        {/* Desktop Top Back Link & Theme Toggle */}
        <div className="hidden lg:flex w-full items-center justify-between mb-6">
          <Link
            to="/login"
            className="inline-flex items-center gap-2 text-xs font-bold text-stone-500 hover:text-[#064E36] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Login</span>
          </Link>
          <ThemeToggle />
        </div>

        {/* Content Card / View States */}
        <div className="w-full max-w-md space-y-6">
          
          {!isSubmitted ? (
            /* State 1: Forgot Password Input Form */
            <div className="space-y-6 animate-in fade-in">
              
              {/* Centered Orange Lock Emblem */}
              <div className="text-center space-y-3">
                <div className="w-16 h-16 rounded-3xl bg-amber-100/80 text-[#F97316] flex items-center justify-center mx-auto shadow-xs border border-amber-200/60">
                  <Lock className="w-7 h-7" />
                </div>
                
                <h2 className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight">
                  Forgot Password?
                </h2>
                <p className="text-xs sm:text-sm text-stone-500 max-w-xs mx-auto leading-relaxed">
                  Enter your registered email address and we'll send you a reset link.
                </p>
              </div>

              {/* Error Message */}
              {errorMessage && (
                <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-xs text-rose-800 flex items-center gap-2 animate-in fade-in">
                  <span className="font-bold">!</span>
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1.5">
                    Email address
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type="text"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. name@cgc.edu.in or Student ID"
                      className="w-full pl-10 pr-4 py-3 rounded-2xl bg-white border border-stone-200 text-xs sm:text-sm text-stone-900 placeholder:text-stone-400 focus:outline-hidden focus:ring-2 focus:ring-[#064E36]/20 focus:border-[#064E36] transition-all shadow-2xs"
                    />
                  </div>
                </div>

                {/* Primary Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 rounded-2xl bg-[#064E36] hover:bg-[#043B2B] text-white font-black text-xs sm:text-sm shadow-md shadow-emerald-950/15 hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
                >
                  <span>{isSubmitting ? 'Sending Link...' : 'Send Reset Link'}</span>
                  <ArrowRight className="w-4 h-4 text-[#EAA044]" />
                </button>
              </form>

              {/* Demo Feature Info Callout Card */}
              <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-200/80 text-blue-950 text-xs space-y-1.5 flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center shrink-0 mt-0.5 font-bold text-[11px]">
                  i
                </div>
                <div>
                  <div className="font-bold text-blue-900">This is a demo feature.</div>
                  <p className="text-[11px] text-blue-800/90 leading-relaxed">
                    In a live system, a password reset link will be sent to your email. (For testing, demo account passwords remain <code className="font-mono font-bold bg-white px-1 py-0.5 rounded">password123</code>).
                  </p>
                </div>
              </div>

              {/* Footer Back Link */}
              <div className="text-center pt-2">
                <Link
                  to="/login"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-stone-600 hover:text-[#064E36] transition-colors"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back to Login</span>
                </Link>
              </div>

            </div>
          ) : (
            /* State 2: Reset Link Sent Confirmation */
            <div className="space-y-6 text-center animate-in zoom-in-95">
              
              {/* Green Envelope with Checkmark Emblem */}
              <div className="w-16 h-16 rounded-3xl bg-emerald-100 text-[#064E36] flex items-center justify-center mx-auto shadow-xs border border-emerald-200/80">
                <CheckCircle2 className="w-8 h-8 text-emerald-700" />
              </div>

              <div className="space-y-2">
                <h2 className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight">
                  Reset Link Sent!
                </h2>
                <p className="text-xs sm:text-sm text-stone-500 max-w-sm mx-auto leading-relaxed">
                  If this email is registered with us, you will receive a password reset link shortly at <strong className="text-stone-800">{email}</strong>.
                </p>
              </div>

              {/* Green Demo Callout Card */}
              <div className="p-4 rounded-2xl bg-emerald-50/80 border border-emerald-200 text-emerald-950 text-xs text-left flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-emerald-200 text-emerald-800 flex items-center justify-center shrink-0 mt-0.5 font-bold text-[11px]">
                  ✓
                </div>
                <div>
                  <div className="font-bold text-emerald-900">This is a demo feature.</div>
                  <p className="text-[11px] text-emerald-800/90 leading-relaxed">
                    In a live system, a password reset email will be sent to your inbox. You can continue testing by logging in with default demo credentials.
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 pt-2">
                <Link
                  to="/login"
                  className="w-full py-3.5 rounded-2xl bg-[#064E36] hover:bg-[#043B2B] text-white font-black text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Back to Login</span>
                </Link>

                <Link
                  to="/"
                  className="block text-xs font-bold text-stone-600 hover:text-[#064E36] transition-colors"
                >
                  Go to Home
                </Link>
              </div>

            </div>
          )}

        </div>

      </div>

    </div>
  );
}
