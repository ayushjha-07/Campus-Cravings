import crypto from 'crypto';
import { CONFIG } from './config.js';
import {
  findUserByEmail,
  findUserByPhone,
  findUserByStudentId,
  createUser,
  updateUserPassword,
  getAllUsers
} from './db.js';
import { createOtp, verifyOtp, consumeVerificationToken } from './otpManager.js';
import { sendEmailOtp } from './services/emailService.js';
import { sendSmsOtp, normalizeIndianMobile } from './services/smsService.js';

// Simple SHA-256 hash helper matching client-side hash
function hashPassword(plainText) {
  return crypto.createHash('sha256').update(plainText).digest('hex');
}

/**
 * Helper to parse JSON body from incoming Node.js request
 */
async function parseBody(req) {
  if (req.body && typeof req.body === 'object') return req.body;
  return new Promise((resolve, reject) => {
    let data = '';
    req.on('data', chunk => {
      data += chunk;
      if (data.length > 1e6) {
        req.destroy();
        reject(new Error('Payload too large'));
      }
    });
    req.on('end', () => {
      if (!data) return resolve({});
      try {
        resolve(JSON.parse(data));
      } catch (e) {
        reject(new Error('Invalid JSON'));
      }
    });
    req.on('error', reject);
  });
}

/**
 * Send JSON response helper
 */
function sendJson(res, statusCode, payload) {
  res.statusCode = statusCode;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(payload));
}

/**
 * Connect/Express compatible API middleware handler
 */
export async function apiHandler(req, res, next) {
  const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  const pathname = url.pathname;

  // Only handle /api/* routes
  if (!pathname.startsWith('/api/')) {
    if (typeof next === 'function') return next();
    res.statusCode = 404;
    res.end('Not found');
    return;
  }

  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.statusCode = 204;
    res.end();
    return;
  }

  try {
    // ------------------------------------------------------------------------
    // GET /api/health
    // ------------------------------------------------------------------------
    if (pathname === '/api/health' && req.method === 'GET') {
      const emailConfigured = Boolean(CONFIG.EMAIL.RESEND_API_KEY && !CONFIG.EMAIL.RESEND_API_KEY.includes('YOUR_'));
      const smsConfigured = Boolean(
        (CONFIG.SMS.FAST2SMS_API_KEY && !CONFIG.SMS.FAST2SMS_API_KEY.includes('YOUR_')) ||
        (CONFIG.SMS.TWILIO_ACCOUNT_SID && !CONFIG.SMS.TWILIO_ACCOUNT_SID.includes('YOUR_'))
      );
      return sendJson(res, 200, {
        status: 'ok',
        timestamp: new Date().toISOString(),
        providers: {
          email: {
            service: 'Resend',
            configured: emailConfigured
          },
          sms: {
            service: CONFIG.SMS.FAST2SMS_API_KEY ? 'Fast2SMS' : 'Twilio',
            configured: smsConfigured
          }
        }
      });
    }

    // Parse body for POST requests
    const body = req.method === 'POST' ? await parseBody(req) : {};

    // ------------------------------------------------------------------------
    // POST /api/auth/check-availability
    // ------------------------------------------------------------------------
    if (pathname === '/api/auth/check-availability' && req.method === 'POST') {
      const { email, phone, studentId } = body;
      const emailTaken = email ? Boolean(findUserByEmail(email)) : false;
      const phoneTaken = phone ? Boolean(findUserByPhone(phone)) : false;
      const studentIdTaken = studentId ? Boolean(findUserByStudentId(studentId)) : false;

      return sendJson(res, 200, {
        available: !emailTaken && !phoneTaken && !studentIdTaken,
        emailTaken,
        phoneTaken,
        studentIdTaken
      });
    }

    // ------------------------------------------------------------------------
    // POST /api/otp/send-email
    // ------------------------------------------------------------------------
    if (pathname === '/api/otp/send-email' && req.method === 'POST') {
      const { email, purpose = 'register', name = 'Student' } = body;

      if (!email || !email.includes('@')) {
        return sendJson(res, 400, { success: false, error: 'A valid email address is required.' });
      }

      const cleanEmail = email.trim().toLowerCase();

      // Check duplicates for registration
      if (purpose === 'register') {
        const existingUser = findUserByEmail(cleanEmail);
        if (existingUser) {
          return sendJson(res, 409, {
            success: false,
            error: `The email "${cleanEmail}" is already registered. Please sign in instead.`,
            code: 'EMAIL_ALREADY_EXISTS'
          });
        }
      }

      // Check existence for password reset
      if (purpose === 'password_reset') {
        const existingUser = findUserByEmail(cleanEmail);
        if (!existingUser) {
          return sendJson(res, 404, {
            success: false,
            error: `No student account found with the email "${cleanEmail}".`,
            code: 'USER_NOT_FOUND'
          });
        }
      }

      // Create OTP record with salted hash, 5m expiry, 60s cooldown, rate limiting
      let otpRecord;
      try {
        otpRecord = createOtp({
          identifier: cleanEmail,
          type: 'email',
          purpose
        });
      } catch (err) {
        return sendJson(res, 429, {
          success: false,
          error: err.message,
          code: err.code || 'COOLDOWN_ACTIVE',
          waitSeconds: err.waitSeconds
        });
      }

      // Send via real email provider
      try {
        await sendEmailOtp({
          email: cleanEmail,
          otp: otpRecord.otp,
          purpose,
          name
        });

        return sendJson(res, 200, {
          success: true,
          message: `A 6-digit verification code has been sent to ${cleanEmail}.`,
          expiresAt: otpRecord.expiresAt,
          cooldownSeconds: otpRecord.cooldownSeconds
        });
      } catch (sendErr) {
        console.error('Email dispatch error:', sendErr);
        if (sendErr.code === 'EMAIL_PROVIDER_NOT_CONFIGURED') {
          return sendJson(res, 503, {
            success: false,
            code: 'PROVIDER_NOT_CONFIGURED',
            error: 'Live email service is currently pending API credentials. Please set RESEND_API_KEY in the .env file.'
          });
        }
        return sendJson(res, 502, {
          success: false,
          error: `Failed to deliver verification email: ${sendErr.message}`,
          code: 'DELIVERY_FAILED'
        });
      }
    }

    // ------------------------------------------------------------------------
    // POST /api/otp/verify-email
    // ------------------------------------------------------------------------
    if (pathname === '/api/otp/verify-email' && req.method === 'POST') {
      const { email, otp, purpose = 'register' } = body;

      if (!email || !otp) {
        return sendJson(res, 400, {
          success: false,
          error: 'Email and 6-digit verification code are required.'
        });
      }

      try {
        const result = verifyOtp({
          identifier: email,
          type: 'email',
          purpose,
          otp
        });

        return sendJson(res, 200, result);
      } catch (verifyErr) {
        return sendJson(res, 400, {
          success: false,
          error: verifyErr.message,
          code: verifyErr.code,
          attemptsLeft: verifyErr.attemptsLeft
        });
      }
    }

    // ------------------------------------------------------------------------
    // POST /api/otp/send-sms
    // ------------------------------------------------------------------------
    if (pathname === '/api/otp/send-sms' && req.method === 'POST') {
      const { phone, purpose = 'register' } = body;

      const phone10 = normalizeIndianMobile(phone);
      if (!phone10) {
        return sendJson(res, 400, {
          success: false,
          error: 'Please enter a valid 10-digit Indian mobile number (e.g. 9876543210).'
        });
      }

      // Check duplicate phone for registration
      if (purpose === 'register') {
        const existingUser = findUserByPhone(phone10);
        if (existingUser) {
          return sendJson(res, 409, {
            success: false,
            error: `Mobile number +91 ${phone10} is already registered. Please sign in or use another number.`,
            code: 'PHONE_ALREADY_EXISTS'
          });
        }
      }

      // Create OTP record
      let otpRecord;
      try {
        otpRecord = createOtp({
          identifier: phone10,
          type: 'sms',
          purpose
        });
      } catch (err) {
        return sendJson(res, 429, {
          success: false,
          error: err.message,
          code: err.code || 'COOLDOWN_ACTIVE',
          waitSeconds: err.waitSeconds
        });
      }

      // Send via real SMS provider
      try {
        await sendSmsOtp({
          phone: phone10,
          otp: otpRecord.otp,
          purpose
        });

        return sendJson(res, 200, {
          success: true,
          message: `A 6-digit verification SMS has been sent to +91 ${phone10}.`,
          expiresAt: otpRecord.expiresAt,
          cooldownSeconds: otpRecord.cooldownSeconds
        });
      } catch (sendErr) {
        console.error('SMS dispatch error:', sendErr);
        if (sendErr.code === 'SMS_PROVIDER_NOT_CONFIGURED') {
          return sendJson(res, 503, {
            success: false,
            code: 'PROVIDER_NOT_CONFIGURED',
            error: 'Live SMS service is currently pending API credentials. Please set FAST2SMS_API_KEY or Twilio credentials in the .env file.'
          });
        }
        return sendJson(res, 502, {
          success: false,
          error: `Failed to deliver verification SMS: ${sendErr.message}`,
          code: 'DELIVERY_FAILED'
        });
      }
    }

    // ------------------------------------------------------------------------
    // POST /api/otp/verify-sms
    // ------------------------------------------------------------------------
    if (pathname === '/api/otp/verify-sms' && req.method === 'POST') {
      const { phone, otp, purpose = 'register' } = body;

      const phone10 = normalizeIndianMobile(phone);
      if (!phone10 || !otp) {
        return sendJson(res, 400, {
          success: false,
          error: 'Valid Indian mobile number and 6-digit verification code are required.'
        });
      }

      try {
        const result = verifyOtp({
          identifier: phone10,
          type: 'sms',
          purpose,
          otp
        });

        return sendJson(res, 200, result);
      } catch (verifyErr) {
        return sendJson(res, 400, {
          success: false,
          error: verifyErr.message,
          code: verifyErr.code,
          attemptsLeft: verifyErr.attemptsLeft
        });
      }
    }

    // ------------------------------------------------------------------------
    // POST /api/auth/register
    // Enforces backend single-use verification tokens for both email and phone
    // ------------------------------------------------------------------------
    if (pathname === '/api/auth/register' && req.method === 'POST') {
      const {
        name,
        email,
        phone,
        studentId,
        password,
        termsAccepted,
        emailVerificationToken,
        phoneVerificationToken,
        department = 'Computer Science & Engineering',
        hostel = 'Campus Day Scholar'
      } = body;

      // Basic field checks
      if (!name || name.trim().length < 2) {
        return sendJson(res, 400, { success: false, error: 'Full student name is required.' });
      }
      if (!email || !email.includes('@')) {
        return sendJson(res, 400, { success: false, error: 'Valid college email is required.' });
      }
      const phone10 = normalizeIndianMobile(phone);
      if (!phone10) {
        return sendJson(res, 400, { success: false, error: 'Valid 10-digit Indian mobile number is required.' });
      }
      if (!studentId || studentId.trim().length < 4) {
        return sendJson(res, 400, { success: false, error: 'Student ID must be at least 4 characters.' });
      }
      if (!password || password.length < 6) {
        return sendJson(res, 400, { success: false, error: 'Password must be at least 6 characters.' });
      }
      if (!termsAccepted) {
        return sendJson(res, 400, { success: false, error: 'You must accept the terms and conditions.' });
      }

      // Check duplicates again on server
      const cleanEmail = email.trim().toLowerCase();
      const cleanId = studentId.trim().toUpperCase();

      if (findUserByEmail(cleanEmail)) {
        return sendJson(res, 409, { success: false, error: 'Email is already registered.' });
      }
      if (findUserByPhone(phone10)) {
        return sendJson(res, 409, { success: false, error: 'Mobile number is already registered.' });
      }
      if (findUserByStudentId(cleanId)) {
        return sendJson(res, 409, { success: false, error: 'Student ID is already registered.' });
      }

      // ENFORCE VERIFICATION TOKENS:
      // The server validates that single-use tokens exist for both email and mobile
      const emailCheck = consumeVerificationToken({
        token: emailVerificationToken,
        identifier: cleanEmail,
        type: 'email',
        purpose: 'register'
      });

      if (!emailCheck.valid) {
        return sendJson(res, 403, {
          success: false,
          error: `Email verification incomplete or expired: ${emailCheck.error}. Please verify your email first.`,
          code: 'EMAIL_VERIFICATION_REQUIRED'
        });
      }

      const phoneCheck = consumeVerificationToken({
        token: phoneVerificationToken,
        identifier: phone10,
        type: 'sms',
        purpose: 'register'
      });

      if (!phoneCheck.valid) {
        return sendJson(res, 403, {
          success: false,
          error: `Mobile verification incomplete or expired: ${phoneCheck.error}. Please verify your phone number first.`,
          code: 'PHONE_VERIFICATION_REQUIRED'
        });
      }

      // Both verifications passed! Create new student account
      const passwordHash = hashPassword(password);
      const newUser = createUser({
        id: `cgc_user_${Date.now()}`,
        name: name.trim(),
        studentId: cleanId,
        rollNo: cleanId,
        email: cleanEmail,
        phone: phone10,
        department: department.trim(),
        hostel: hostel.trim(),
        campus: 'CGC University, Mohali',
        passwordHash,
        emailVerified: true,
        phoneVerified: true,
        isLoggedIn: true
      });

      return sendJson(res, 201, {
        success: true,
        user: newUser,
        message: 'Account created successfully with verified email and mobile number.'
      });
    }

    // ------------------------------------------------------------------------
    // POST /api/auth/reset-password
    // ------------------------------------------------------------------------
    if (pathname === '/api/auth/reset-password' && req.method === 'POST') {
      const { email, verificationToken, newPassword } = body;

      if (!email || !verificationToken || !newPassword) {
        return sendJson(res, 400, {
          success: false,
          error: 'Email, verification token, and new password are required.'
        });
      }

      if (newPassword.length < 6) {
        return sendJson(res, 400, {
          success: false,
          error: 'Password must be at least 6 characters long.'
        });
      }

      const cleanEmail = email.trim().toLowerCase();

      // Validate & consume token
      const tokenCheck = consumeVerificationToken({
        token: verificationToken,
        identifier: cleanEmail,
        type: 'email',
        purpose: 'password_reset'
      });

      if (!tokenCheck.valid) {
        return sendJson(res, 403, {
          success: false,
          error: `Password reset verification expired or invalid: ${tokenCheck.error}.`
        });
      }

      const passwordHash = hashPassword(newPassword);
      const updated = updateUserPassword(cleanEmail, passwordHash);

      if (!updated) {
        return sendJson(res, 404, {
          success: false,
          error: 'User account not found.'
        });
      }

      return sendJson(res, 200, {
        success: true,
        message: 'Password has been successfully updated. You may now log in.'
      });
    }

    // Unmatched API route
    return sendJson(res, 404, { success: false, error: 'Endpoint not found' });

  } catch (err) {
    console.error('Unhandled API exception:', err);
    return sendJson(res, 500, {
      success: false,
      error: 'Internal server error',
      details: err.message
    });
  }
}
