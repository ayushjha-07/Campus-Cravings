import React, { useState, useEffect, useRef } from 'react';
import { 
  X, 
  Mail, 
  Phone, 
  ShieldCheck, 
  Clock, 
  RotateCw, 
  AlertCircle, 
  CheckCircle2, 
  Sparkles,
  Info
} from 'lucide-react';
import { formatIndianMobile } from '../utils/authUtils';
import { apiRequest } from '../utils/apiClient';

export default function OtpVerificationModal({
  isOpen,
  onClose,
  type = 'email', // 'email' | 'phone'
  target = '',
  purpose = 'register',
  onSuccess
}) {
  const isEmail = type === 'email';
  const [digits, setDigits] = useState(['', '', '', '', '', '']);
  const [isSending, setIsSending] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [statusMessage, setStatusMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [providerNotice, setProviderNotice] = useState(null);
  const [cooldown, setCooldown] = useState(60);
  const [expiresIn, setExpiresIn] = useState(300); // 5 minutes = 300 seconds
  const [isVerified, setIsVerified] = useState(false);

  const inputRefs = useRef([]);

  // Trigger send on open if modal just became visible
  useEffect(() => {
    if (isOpen && target) {
      setDigits(['', '', '', '', '', '']);
      setErrorMessage(null);
      setProviderNotice(null);
      setIsVerified(false);
      handleSendOtp();
    }
  }, [isOpen, target]);

  // Expiration countdown
  useEffect(() => {
    if (!isOpen || isVerified) return;
    if (expiresIn <= 0) return;

    const timer = setInterval(() => {
      setExpiresIn(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, [isOpen, expiresIn, isVerified]);

  // Cooldown countdown
  useEffect(() => {
    if (!isOpen) return;
    if (cooldown <= 0) return;

    const timer = setInterval(() => {
      setCooldown(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, [isOpen, cooldown]);

  // Focus first input box when loaded
  useEffect(() => {
    if (isOpen && inputRefs.current[0]) {
      setTimeout(() => {
        inputRefs.current[0]?.focus();
      }, 150);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const formatTimer = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSendOtp = async () => {
    setIsSending(true);
    setErrorMessage(null);
    setProviderNotice(null);
    setStatusMessage(null);

    const endpoint = isEmail ? '/api/otp/send-email' : '/api/otp/send-sms';
    const payload = isEmail 
      ? { email: target, purpose } 
      : { phone: target, purpose };

    try {
      const res = await apiRequest(endpoint, {
        method: 'POST',
        body: payload
      });

      if (res.ok && res.data?.success) {
        setStatusMessage(res.data.message || 'Verification code sent.');
        if (res.data.devMode && res.data.devCode) {
          setProviderNotice(`[Testing Notice] Gateway credentials pending. Your 6-digit verification code is: ${res.data.devCode}`);
        }
        setCooldown(res.data.cooldownSeconds || 60);
        setExpiresIn(300); // 5 min
      } else {
        const errorData = res.data || {};
        if (errorData.code === 'PROVIDER_NOT_CONFIGURED') {
          setProviderNotice(errorData.error || res.error);
        } else {
          setErrorMessage(res.error || errorData.error || 'Failed to send verification code.');
        }
        if (errorData.waitSeconds) {
          setCooldown(errorData.waitSeconds);
        }
      }
    } catch (err) {
      setErrorMessage(`Connection error: ${err.message}. Please verify the server is running.`);
    } finally {
      setIsSending(false);
    }
  };

  const handleDigitChange = (index, value) => {
    // Only allow single digit
    const cleaned = value.replace(/\D/g, '');
    const newDigits = [...digits];

    if (!cleaned) {
      newDigits[index] = '';
      setDigits(newDigits);
      return;
    }

    newDigits[index] = cleaned[cleaned.length - 1];
    setDigits(newDigits);
    setErrorMessage(null);

    // Auto-focus next input
    if (index < 5 && cleaned) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !digits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    if (!pasteData) return;

    const newDigits = [...digits];
    for (let i = 0; i < 6; i++) {
      newDigits[i] = pasteData[i] || '';
    }
    setDigits(newDigits);

    const focusIndex = Math.min(pasteData.length, 5);
    inputRefs.current[focusIndex]?.focus();
  };

  const handleVerify = async (e) => {
    if (e) e.preventDefault();
    const otp = digits.join('');

    if (otp.length < 6) {
      setErrorMessage('Please enter all 6 digits of your verification code.');
      return;
    }

    if (expiresIn <= 0) {
      setErrorMessage('This verification code has expired. Please click "Resend Code" to get a fresh code.');
      return;
    }

    setIsVerifying(true);
    setErrorMessage(null);

    const endpoint = isEmail ? '/api/otp/verify-email' : '/api/otp/verify-sms';
    const payload = isEmail 
      ? { email: target, otp, purpose } 
      : { phone: target, otp, purpose };

    try {
      const res = await apiRequest(endpoint, {
        method: 'POST',
        body: payload
      });

      if (res.ok && res.data?.success) {
        setIsVerified(true);
        setStatusMessage(res.data.message || 'Verification successful!');
        setTimeout(() => {
          onSuccess({
            type,
            target,
            verificationToken: res.data.verificationToken
          });
          onClose();
        }, 1000);
      } else {
        const errorData = res.data || {};
        setErrorMessage(res.error || errorData.error || 'Verification failed. Please check the code.');
      }
    } catch (err) {
      setErrorMessage(`Verification connection error: ${err.message}`);
    } finally {
      setIsVerifying(false);
    }
  };

  const displayTarget = isEmail 
    ? target 
    : formatIndianMobile(target);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/60 backdrop-blur-sm animate-in fade-in duration-200">
      
      {/* Modal Dialog Card */}
      <div 
        className="w-full max-w-md bg-white rounded-3xl shadow-2xl border border-stone-200/80 overflow-hidden text-stone-900 transition-all transform scale-100"
        role="dialog"
        aria-modal="true"
        aria-labelledby="otp-modal-title"
      >
        
        {/* Top Header Banner */}
        <div className="bg-gradient-to-r from-[#0D1826] to-[#162544] text-white p-5 sm:p-6 relative">
          <button
            type="button"
            onClick={onClose}
            className="absolute right-4 top-4 p-1.5 rounded-full text-stone-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-[#F97316] shrink-0">
              {isEmail ? <Mail className="w-6 h-6" /> : <Phone className="w-6 h-6" />}
            </div>
            <div>
              <div className="text-[10px] uppercase font-bold tracking-wider text-amber-300">
                Secure OTP Verification
              </div>
              <h2 id="otp-modal-title" className="text-lg sm:text-xl font-black text-white">
                {isEmail ? 'Verify College Email' : 'Verify Mobile Number'}
              </h2>
            </div>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-5">
          
          {/* Target Description */}
          <div className="text-center space-y-1">
            <p className="text-xs sm:text-sm text-stone-600">
              Enter the 6-digit verification code sent to:
            </p>
            <div className="inline-block px-3 py-1 rounded-full bg-stone-100 border border-stone-200 text-stone-900 font-mono font-bold text-xs sm:text-sm">
              {displayTarget}
            </div>
          </div>

          {/* Provider Notice (if credentials are being configured) */}
          {providerNotice && (
            <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-start gap-2.5 animate-in fade-in">
              <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div className="leading-relaxed font-medium">
                {providerNotice}
              </div>
            </div>
          )}

          {/* Error Message */}
          {errorMessage && (
            <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-start gap-2.5 animate-in fade-in">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <div className="leading-relaxed font-medium">
                {errorMessage}
              </div>
            </div>
          )}

          {/* Status / Success Message */}
          {statusMessage && !errorMessage && !isVerified && (
            <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2 animate-in fade-in">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{statusMessage}</span>
            </div>
          )}

          {/* Verified Success State */}
          {isVerified ? (
            <div className="py-6 text-center space-y-3 animate-in zoom-in-95">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-[#064E36] flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-10 h-10 text-emerald-600" />
              </div>
              <div>
                <h3 className="text-lg font-black text-stone-900">Verification Complete!</h3>
                <p className="text-xs text-stone-500">Your {isEmail ? 'email' : 'mobile number'} is verified.</p>
              </div>
            </div>
          ) : (
            /* OTP Digits Input Form */
            <form onSubmit={handleVerify} className="space-y-5">
              
              {/* 6 Digit Inputs */}
              <div className="flex justify-center gap-2 sm:gap-3" onPaste={handlePaste}>
                {digits.map((digit, idx) => (
                  <input
                    key={idx}
                    ref={el => (inputRefs.current[idx] = el)}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={e => handleDigitChange(idx, e.target.value)}
                    onKeyDown={e => handleKeyDown(idx, e)}
                    className={`w-11 h-13 sm:w-12 sm:h-14 text-center font-mono font-bold text-xl sm:text-2xl rounded-2xl border transition-all focus:outline-hidden ${
                      digit 
                        ? 'bg-emerald-50/50 border-[#064E36] text-[#064E36] ring-2 ring-[#064E36]/10' 
                        : 'bg-stone-50 border-stone-300 text-stone-900 focus:border-[#064E36] focus:ring-2 focus:ring-[#064E36]/20'
                    }`}
                    aria-label={`Digit ${idx + 1}`}
                  />
                ))}
              </div>

              {/* Timer Bar: Expiry & Resend Cooldown */}
              <div className="flex items-center justify-between text-xs text-stone-500 pt-1 border-t border-stone-100">
                <div className="flex items-center gap-1.5 font-medium">
                  <Clock className="w-3.5 h-3.5 text-stone-400" />
                  <span>
                    Expires in:{' '}
                    <span className={`font-mono font-bold ${expiresIn < 60 ? 'text-rose-600' : 'text-stone-800'}`}>
                      {formatTimer(expiresIn)}
                    </span>
                  </span>
                </div>

                <div>
                  {cooldown > 0 ? (
                    <span className="text-stone-400 font-medium">
                      Resend in <span className="font-mono font-bold text-stone-600">{cooldown}s</span>
                    </span>
                  ) : (
                    <button
                      type="button"
                      disabled={isSending}
                      onClick={handleSendOtp}
                      className="inline-flex items-center gap-1 font-bold text-[#F97316] hover:text-[#EA580C] hover:underline cursor-pointer disabled:opacity-50"
                    >
                      <RotateCw className={`w-3 h-3 ${isSending ? 'animate-spin' : ''}`} />
                      <span>{isSending ? 'Sending...' : 'Resend Code'}</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-2">
                <button
                  type="submit"
                  disabled={isVerifying || digits.join('').length < 6 || expiresIn <= 0}
                  className="w-full py-3.5 rounded-2xl bg-[#064E36] hover:bg-[#043B2B] text-white font-black text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ShieldCheck className="w-4 h-4 text-[#EAA044]" />
                  <span>{isVerifying ? 'Verifying Code...' : 'Verify Code'}</span>
                </button>

                <button
                  type="button"
                  onClick={onClose}
                  className="w-full py-2.5 rounded-2xl text-xs font-bold text-stone-500 hover:text-stone-800 hover:bg-stone-100 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
              </div>

            </form>
          )}

          {/* Security Guarantee Footer */}
          <div className="pt-2 text-center text-[11px] text-stone-400 flex items-center justify-center gap-1.5">
            <Sparkles className="w-3 h-3 text-amber-500" />
            <span>Encrypted with SHA-256 salted tokens • 5-minute expiry</span>
          </div>

        </div>

      </div>

    </div>
  );
}
