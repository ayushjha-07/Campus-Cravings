import fs from 'fs';
import path from 'path';

// Load .env file manually if exists
function loadEnv() {
  const envPath = path.resolve('.env');
  if (fs.existsSync(envPath)) {
    try {
      const content = fs.readFileSync(envPath, 'utf8');
      const lines = content.split('\n');
      for (const line of lines) {
        const trimmed = line.trim();
        if (trimmed && !trimmed.startsWith('#') && trimmed.includes('=')) {
          const [key, ...values] = trimmed.split('=');
          const k = key.trim();
          const v = values.join('=').trim().replace(/^["']|["']$/g, '');
          if (!process.env[k]) {
            process.env[k] = v;
          }
        }
      }
    } catch (e) {
      console.warn('Failed to parse .env file', e);
    }
  }
}

loadEnv();

export const CONFIG = {
  PORT: parseInt(process.env.PORT || '3001', 10),
  NODE_ENV: process.env.NODE_ENV || 'development',
  
  // Email Service (Resend or SMTP)
  EMAIL: {
    RESEND_API_KEY: process.env.RESEND_API_KEY || '',
    FROM: process.env.EMAIL_FROM || 'Campus Cravings <onboarding@resend.dev>',
    SMTP_HOST: process.env.SMTP_HOST || '',
    SMTP_PORT: parseInt(process.env.SMTP_PORT || '587', 10),
    SMTP_USER: process.env.SMTP_USER || '',
    SMTP_PASS: process.env.SMTP_PASS || ''
  },

  // SMS Service (Twilio or Fast2SMS for Indian numbers)
  SMS: {
    TWILIO_ACCOUNT_SID: process.env.TWILIO_ACCOUNT_SID || '',
    TWILIO_AUTH_TOKEN: process.env.TWILIO_AUTH_TOKEN || '',
    TWILIO_PHONE_NUMBER: process.env.TWILIO_PHONE_NUMBER || '',
    FAST2SMS_API_KEY: process.env.FAST2SMS_API_KEY || ''
  },

  // Security & Limits
  OTP: {
    EXPIRY_MS: 5 * 60 * 1000, // 5 minutes
    RESEND_COOLDOWN_MS: 60 * 1000, // 60 seconds
    MAX_ATTEMPTS: 5,
    MAX_REQUESTS_PER_WINDOW: 5,
    RATE_LIMIT_WINDOW_MS: 15 * 60 * 1000 // 15 minutes
  }
};
