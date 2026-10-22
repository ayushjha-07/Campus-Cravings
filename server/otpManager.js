import crypto from 'crypto';
import { CONFIG } from './config.js';

// In-memory state for active OTP records, rate limits, and verification tokens
// Key format: `${purpose}:${type}:${identifier}` e.g. "register:email:test@cgc.edu.in"
const otpStore = new Map();

// Rate limiting store for generation requests: `${type}:${identifier}` -> array of timestamps
const requestWindowStore = new Map();

// Single-use verified tokens store: `token` -> { identifier, type, purpose, expiresAt }
const verifiedTokenStore = new Map();

/**
 * Generate a cryptographically secure 6-digit OTP
 */
export function generateRandomOtp() {
  return crypto.randomInt(100000, 1000000).toString();
}

/**
 * Salted SHA-256 hash helper
 */
export function hashOtp(otp, salt) {
  return crypto.createHash('sha256').update(`${salt}:${otp}`).digest('hex');
}

/**
 * Check rate limit for OTP requests (e.g., max 5 requests per 15 minutes)
 */
function checkRateLimit(rateKey) {
  const now = Date.now();
  const windowMs = CONFIG.OTP.RATE_LIMIT_WINDOW_MS;
  const maxRequests = CONFIG.OTP.MAX_REQUESTS_PER_WINDOW;

  const timestamps = (requestWindowStore.get(rateKey) || []).filter(ts => now - ts < windowMs);
  
  if (timestamps.length >= maxRequests) {
    const oldest = timestamps[0];
    const waitSeconds = Math.ceil((windowMs - (now - oldest)) / 1000);
    return {
      allowed: false,
      error: `Too many verification requests. Please wait ${waitSeconds} seconds before trying again.`,
      waitSeconds
    };
  }

  timestamps.push(now);
  requestWindowStore.set(rateKey, timestamps);
  return { allowed: true };
}

/**
 * Create and register an OTP for a target
 */
export function createOtp({ identifier, type = 'email', purpose = 'register' }) {
  const cleanId = type === 'email' ? identifier.trim().toLowerCase() : identifier.replace(/\D/g, '');
  const storeKey = `${purpose}:${type}:${cleanId}`;
  const rateKey = `${type}:${cleanId}`;
  const now = Date.now();

  // 1. Check Rate Limit
  const rateCheck = checkRateLimit(rateKey);
  if (!rateCheck.allowed) {
    const error = new Error(rateCheck.error);
    error.code = 'RATE_LIMIT_EXCEEDED';
    error.waitSeconds = rateCheck.waitSeconds;
    throw error;
  }

  // 2. Check Resend Cooldown
  const existing = otpStore.get(storeKey);
  if (existing) {
    const timeSinceLast = now - existing.createdAt;
    if (timeSinceLast < CONFIG.OTP.RESEND_COOLDOWN_MS) {
      const waitSeconds = Math.ceil((CONFIG.OTP.RESEND_COOLDOWN_MS - timeSinceLast) / 1000);
      const error = new Error(`Please wait ${waitSeconds}s before requesting a new code.`);
      error.code = 'RESEND_COOLDOWN';
      error.waitSeconds = waitSeconds;
      throw error;
    }
  }

  // 3. Generate new 6-digit OTP & salted hash
  const otp = generateRandomOtp();
  const salt = crypto.randomBytes(16).toString('hex');
  const otpHash = hashOtp(otp, salt);
  const expiresAt = now + CONFIG.OTP.EXPIRY_MS;

  const record = {
    identifier: cleanId,
    type,
    purpose,
    salt,
    otpHash,
    createdAt: now,
    expiresAt,
    attemptsLeft: CONFIG.OTP.MAX_ATTEMPTS,
    verified: false
  };

  otpStore.set(storeKey, record);

  return {
    otp, // Returned only for delivery service (Resend / SMS), never stored in plaintext
    expiresAt,
    cooldownSeconds: Math.ceil(CONFIG.OTP.RESEND_COOLDOWN_MS / 1000)
  };
}

/**
 * Verify a submitted OTP code
 */
export function verifyOtp({ identifier, type = 'email', purpose = 'register', otp }) {
  if (!otp || typeof otp !== 'string' || otp.trim().length !== 6) {
    const error = new Error('Please enter a complete 6-digit verification code.');
    error.code = 'INVALID_FORMAT';
    throw error;
  }

  const cleanId = type === 'email' ? identifier.trim().toLowerCase() : identifier.replace(/\D/g, '');
  const storeKey = `${purpose}:${type}:${cleanId}`;
  const record = otpStore.get(storeKey);
  const now = Date.now();

  if (!record) {
    const error = new Error('No verification code was requested for this address/number. Please request a new code.');
    error.code = 'NOT_FOUND';
    throw error;
  }

  // Check Expiry
  if (now > record.expiresAt) {
    otpStore.delete(storeKey);
    const error = new Error('This verification code has expired (valid for 5 minutes). Please request a new code.');
    error.code = 'EXPIRED';
    throw error;
  }

  // Check Attempts
  if (record.attemptsLeft <= 0) {
    otpStore.delete(storeKey);
    const error = new Error('Maximum verification attempts exceeded. Please request a new code.');
    error.code = 'MAX_ATTEMPTS_EXCEEDED';
    throw error;
  }

  // Compare salted hash
  const attemptHash = hashOtp(otp.trim(), record.salt);
  if (attemptHash !== record.otpHash) {
    record.attemptsLeft -= 1;
    if (record.attemptsLeft <= 0) {
      otpStore.delete(storeKey);
      const error = new Error('Incorrect code. Maximum attempts exceeded. This code has been invalidated.');
      error.code = 'MAX_ATTEMPTS_EXCEEDED';
      throw error;
    } else {
      const error = new Error(`Incorrect verification code. ${record.attemptsLeft} attempt${record.attemptsLeft === 1 ? '' : 's'} remaining.`);
      error.code = 'INCORRECT_CODE';
      error.attemptsLeft = record.attemptsLeft;
      throw error;
    }
  }

  // Code matches! Invalidate OTP immediately so it cannot be reused
  otpStore.delete(storeKey);

  // Issue a single-use verification token valid for 15 minutes
  const verificationToken = crypto.randomBytes(32).toString('hex');
  const tokenExpiresAt = now + 15 * 60 * 1000;

  verifiedTokenStore.set(verificationToken, {
    identifier: cleanId,
    type,
    purpose,
    expiresAt: tokenExpiresAt
  });

  return {
    success: true,
    verificationToken,
    expiresAt: tokenExpiresAt,
    message: `${type === 'email' ? 'Email' : 'Mobile number'} successfully verified.`
  };
}

/**
 * Validate and consume a single-use verification token
 */
export function consumeVerificationToken({ token, identifier, type, purpose }) {
  if (!token) return { valid: false, error: 'Missing verification token.' };

  const record = verifiedTokenStore.get(token);
  if (!record) {
    return { valid: false, error: 'Verification token not found or already used.' };
  }

  if (Date.now() > record.expiresAt) {
    verifiedTokenStore.delete(token);
    return { valid: false, error: 'Verification token has expired. Please verify again.' };
  }

  const cleanId = type === 'email' ? identifier.trim().toLowerCase() : identifier.replace(/\D/g, '');
  if (record.identifier !== cleanId || record.type !== type || record.purpose !== purpose) {
    return { valid: false, error: 'Verification token mismatch for this account.' };
  }

  // Single-use: delete immediately
  verifiedTokenStore.delete(token);
  return { valid: true };
}

/**
 * Inspect active OTP record for debugging/testing
 */
export function _debugGetRecord(storeKey) {
  return otpStore.get(storeKey);
}

/**
 * Clear all stores (for test suites)
 */
export function _debugReset() {
  otpStore.clear();
  requestWindowStore.clear();
  verifiedTokenStore.clear();
}
