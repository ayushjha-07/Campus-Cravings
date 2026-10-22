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
  Eye, 
  EyeOff, 
  AlertCircle,
  KeyRound
} from 'lucide-react';
import ThemeToggle from '../components/ThemeToggle';
import OtpVerificationModal from '../components/OtpVerificationModal';
import { validateEmail, getRegisteredUsers } from '../utils/authUtils';

export default function ForgotPasswordPage() {
  const { requestPasswordReset, resetPasswordWithToken } = useAuth();
  const navigate = useNavigate();

  // Steps: 'request' | 'new_password' | 'success'
  const [step, setStep] = useState('request');
  const [email, setEmail] = useState('');
  const [verificationToken, setVerificationToken] = useState(null);

  // New password inputs
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [errorMessage, setErrorMessage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // OTP Modal
  const [isOtpModalOpen, setIsOtpModalOpen] = useState(false);

  // Step 1: Submit identifier to start OTP verification
  const handleRequestOtp = (e) => {
    e.preventDefault();
    setErrorMessage(null);

    const cleanInput = email.trim().toLowerCase();
    if (!cleanInput) {
      setErrorMessage('Please enter your registered college email or Student ID.');
      return;
    }

    // Resolve email if student ID was entered
    let targetEmail = cleanInput;
    if (!cleanInput.includes('@')) {
      const users = getRegisteredUsers();
      const match = users.find(u => 
        (u.studentId && u.studentId.toLowerCase() === cleanInput) ||
        (u.rollNo && u.rollNo.toLowerCase() === cleanInput)
      );
      if (match) {
        targetEmail = match.email;
      } else {
        setErrorMessage('No student account found with this Student ID. Please check spelling.');
        return;
      }
    } else {
      if (!validateEmail(targetEmail)) {
        setErrorMessage('Please enter a valid college email address.');
        return;
      }
    }

    setEmail(targetEmail);
    setIsOtpModalOpen(true);
  };

  // Called when OTP verification modal succeeds
  const handleOtpSuccess = ({ verificationToken: token }) => {
    setVerificationToken(token);
    setStep('new_password');
    setErrorMessage(null);
  };

  // Step 2: Submit new password
  const handleResetPassword = async (e) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!newPassword || newPassword.length < 6) {
      setErrorMessage('Password must be at least 6 characters long.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setErrorMessage('Passwords do not match. Please ensure both passwords match.');
      return;
    }

    setIsSubmitting(true);
    const res = await resetPasswordWithToken({
      email,
      verificationToken,
      newPassword
    });
    setIsSubmitting(false);

    if (res.success) {
      setStep('success');
    } else {
      setErrorMessage(res.error || 'Failed to update password.');
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF7F0] flex flex-col lg:flex-row antialiased font-sans text-stone-900 selection:bg-[#064E36] selection:text-white">
      
      {/* Mobile Top Header */}
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

      {/* Left Panel: Desktop Split-Screen */}
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

        {/* Center Headline */}
        <div className="relative z-10 max-w-lg space-y-4 my-8">
          <h1 className="text-4xl xl:text-5xl font-black tracking-tight leading-tight text-white">
            Reset Your <br />
            <span className="text-[#F97316]">Password</span>
          </h1>
          <p className="text-amber-100/90 text-sm xl:text-base leading-relaxed">
            Verify your email with a secure 6-digit OTP code to safely regain access to your Campus Cravings student account.
          </p>
        </div>

        {/* Bottom Food Photography */}
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

      {/* Right Panel: Content Area */}
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

        {/* Card Content according to step */}
        <div className="w-full max-w-md space-y-6">
          
          {step === 'request' && (
            /* STEP 1: Enter Email / Student ID */
            <div className="space-y-6 animate-in fade-in">
              
              <div className="text-center space-y-3">
                <div className="w-16 h-16 rounded-3xl bg-amber-100/80 text-[#F97316] flex items-center justify-center mx-auto shadow-xs border border-amber-200/60">
                  <Lock className="w-7 h-7" />
                </div>
                
                <h2 className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight">
                  Forgot Password?
                </h2>
                <p className="text-xs sm:text-sm text-stone-500 max-w-xs mx-auto leading-relaxed">
                  Enter your registered college email or Student ID to verify via OTP.
                </p>
              </div>

              {errorMessage && (
                <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-xs text-rose-800 flex items-start gap-2.5 animate-in fade-in">
                  <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                  <div className="leading-relaxed font-medium">{errorMessage}</div>
                </div>
              )}

              <form onSubmit={handleRequestOtp} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1.5">
                    College Email or Student ID
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type="text"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. name@cgc.ac.in or CGC2024CSE101"
                      className="w-full pl-10 pr-4 py-3 rounded-2xl bg-white border border-stone-200 text-xs sm:text-sm text-stone-900 placeholder:text-stone-400 focus:outline-hidden focus:ring-2 focus:ring-[#064E36]/20 focus:border-[#064E36] transition-all shadow-2xs"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 rounded-2xl bg-[#064E36] hover:bg-[#043B2B] text-white font-black text-xs sm:text-sm shadow-md shadow-emerald-950/15 hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
                >
                  <ShieldCheck className="w-4 h-4 text-[#EAA044]" />
                  <span>Send Verification Code</span>
                  <ArrowRight className="w-4 h-4 text-[#EAA044]" />
                </button>
              </form>

              <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 text-stone-700 text-xs space-y-1.5 flex items-start gap-3">
                <Info className="w-4 h-4 text-stone-500 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-stone-900">OTP Verification Notice</div>
                  <p className="text-[11px] text-stone-600 leading-relaxed">
                    A secure 6-digit one-time code will be dispatched to your registered email address. Codes expire after 5 minutes.
                  </p>
                </div>
              </div>

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
          )}

          {step === 'new_password' && (
            /* STEP 2: Enter New Password */
            <div className="space-y-6 animate-in fade-in">
              
              <div className="text-center space-y-3">
                <div className="w-16 h-16 rounded-3xl bg-emerald-100 text-[#064E36] flex items-center justify-center mx-auto shadow-xs border border-emerald-200/60">
                  <KeyRound className="w-7 h-7 text-emerald-700" />
                </div>
                
                <h2 className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight">
                  Set New Password
                </h2>
                <p className="text-xs sm:text-sm text-stone-500 max-w-xs mx-auto leading-relaxed">
                  Email verified! Create a secure new password for <strong className="text-stone-800">{email}</strong>.
                </p>
              </div>

              {errorMessage && (
                <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-xs text-rose-800 flex items-start gap-2.5 animate-in fade-in">
                  <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                  <div className="leading-relaxed font-medium">{errorMessage}</div>
                </div>
              )}

              <form onSubmit={handleResetPassword} className="space-y-4">
                {/* New Password */}
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1.5">
                    New Password
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="Minimum 6 characters"
                      className="w-full pl-10 pr-11 py-3 rounded-2xl bg-white border border-stone-200 text-xs sm:text-sm text-stone-900 placeholder:text-stone-400 focus:outline-hidden focus:ring-2 focus:ring-[#064E36]/20 focus:border-[#064E36] transition-all shadow-2xs"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 text-stone-400 hover:text-stone-600 cursor-pointer"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Confirm New Password */}
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1.5">
                    Confirm New Password
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Re-enter new password"
                      className="w-full pl-10 pr-11 py-3 rounded-2xl bg-white border border-stone-200 text-xs sm:text-sm text-stone-900 placeholder:text-stone-400 focus:outline-hidden focus:ring-2 focus:ring-[#064E36]/20 focus:border-[#064E36] transition-all shadow-2xs"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 text-stone-400 hover:text-stone-600 cursor-pointer"
                    >
                      {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 rounded-2xl bg-[#064E36] hover:bg-[#043B2B] text-white font-black text-xs sm:text-sm shadow-md shadow-emerald-950/15 hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
                >
                  <span>{isSubmitting ? 'Updating Password...' : 'Save New Password'}</span>
                  <ArrowRight className="w-4 h-4 text-[#EAA044]" />
                </button>
              </form>

            </div>
          )}

          {step === 'success' && (
            /* STEP 3: Password Updated Confirmation */
            <div className="space-y-6 text-center animate-in zoom-in-95">
              
              <div className="w-16 h-16 rounded-3xl bg-emerald-100 text-[#064E36] flex items-center justify-center mx-auto shadow-xs border border-emerald-200/80">
                <CheckCircle2 className="w-8 h-8 text-emerald-700" />
              </div>

              <div className="space-y-2">
                <h2 className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight">
                  Password Updated!
                </h2>
                <p className="text-xs sm:text-sm text-stone-500 max-w-sm mx-auto leading-relaxed">
                  Your password has been securely reset. You can now log into Campus Cravings with your new password.
                </p>
              </div>

              <div className="space-y-3 pt-2">
                <Link
                  to="/login"
                  className="w-full py-3.5 rounded-2xl bg-[#064E36] hover:bg-[#043B2B] text-white font-black text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Sign In With New Password</span>
                  <ArrowRight className="w-4 h-4 text-[#EAA044]" />
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

      {/* OTP Verification Modal for Password Reset */}
      <OtpVerificationModal
        isOpen={isOtpModalOpen}
        onClose={() => setIsOtpModalOpen(false)}
        type="email"
        target={email}
        purpose="password_reset"
        onSuccess={handleOtpSuccess}
      />

    </div>
  );
}
