import { CONFIG } from '../config.js';

/**
 * Validate and format Indian mobile number
 * Returns 10-digit number or null if invalid
 */
export function normalizeIndianMobile(phone) {
  if (!phone || typeof phone !== 'string') return null;
  const digits = phone.replace(/\D/g, '');
  
  // 10 digits starting with 6-9
  if (digits.length === 10 && /^[6-9]\d{9}$/.test(digits)) {
    return digits;
  }
  // 11 digits starting with 0 followed by 6-9
  if (digits.length === 11 && digits.startsWith('0') && /^[6-9]\d{9}$/.test(digits.slice(1))) {
    return digits.slice(1);
  }
  // 12 digits starting with 91 followed by 6-9
  if (digits.length === 12 && digits.startsWith('91') && /^[6-9]\d{9}$/.test(digits.slice(2))) {
    return digits.slice(2);
  }

  return null;
}

/**
 * Send SMS using Twilio REST API
 */
async function sendViaTwilio({ phone10, otp }) {
  const sid = CONFIG.SMS.TWILIO_ACCOUNT_SID;
  const token = CONFIG.SMS.TWILIO_AUTH_TOKEN;
  const from = CONFIG.SMS.TWILIO_PHONE_NUMBER;

  if (!sid || !token || !from) return null;

  const to = `+91${phone10}`;
  const body = `Your Campus Cravings verification code is: ${otp}. Valid for 5 minutes. Do not share this code. - CGC University`;

  const url = `https://api.twilio.com/2010-04-01/Accounts/${sid}/Messages.json`;
  const params = new URLSearchParams({
    To: to,
    From: from,
    Body: body
  });

  const auth = Buffer.from(`${sid}:${token}`).toString('base64');
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${auth}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: params.toString()
  });

  const data = await response.json();
  if (!response.ok) {
    const err = new Error(data.message || `Twilio SMS failed with status ${response.status}`);
    err.providerResponse = data;
    throw err;
  }

  return {
    success: true,
    provider: 'twilio',
    sid: data.sid
  };
}

/**
 * Send SMS using Fast2SMS API (Indian SMS Gateway)
 */
async function sendViaFast2SMS({ phone10, otp }) {
  const apiKey = CONFIG.SMS.FAST2SMS_API_KEY;
  if (!apiKey || apiKey.trim() === '' || apiKey.includes('YOUR_FAST2SMS_API_KEY')) {
    return null;
  }

  const response = await fetch('https://www.fast2sms.com/dev/bulkV2', {
    method: 'POST',
    headers: {
      'authorization': apiKey,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      variables_values: otp,
      route: 'otp',
      numbers: phone10
    })
  });

  const data = await response.json();
  if (!response.ok || data.return === false) {
    const err = new Error((data.message && data.message[0]) || 'Fast2SMS dispatch failed');
    err.providerResponse = data;
    throw err;
  }

  return {
    success: true,
    provider: 'fast2sms',
    requestId: data.request_id
  };
}

/**
 * Primary dispatch function for mobile OTP
 */
export async function sendSmsOtp({ phone, otp, purpose = 'registration' }) {
  const phone10 = normalizeIndianMobile(phone);
  if (!phone10) {
    const error = new Error('Invalid Indian mobile number. Please provide a 10-digit number starting with 6, 7, 8, or 9.');
    error.code = 'INVALID_PHONE_FORMAT';
    throw error;
  }

  // 1. Try Fast2SMS first if configured (specialized for Indian OTPs)
  if (CONFIG.SMS.FAST2SMS_API_KEY && !CONFIG.SMS.FAST2SMS_API_KEY.includes('YOUR_')) {
    try {
      const res = await sendViaFast2SMS({ phone10, otp });
      if (res) return res;
    } catch (e) {
      console.warn('Fast2SMS failed, falling back to Twilio if available:', e.message);
    }
  }

  // 2. Try Twilio
  if (CONFIG.SMS.TWILIO_ACCOUNT_SID && !CONFIG.SMS.TWILIO_ACCOUNT_SID.includes('YOUR_')) {
    const res = await sendViaTwilio({ phone10, otp });
    if (res) return res;
  }

  // 3. Neither configured
  const error = new Error('SMS provider is not configured. Set FAST2SMS_API_KEY or TWILIO credentials in .env file to enable live SMS delivery.');
  error.code = 'SMS_PROVIDER_NOT_CONFIGURED';
  throw error;
}
