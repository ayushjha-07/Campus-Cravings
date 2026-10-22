import { CONFIG } from '../config.js';

/**
 * Generate branded HTML email for Campus Cravings OTP
 */
function buildOtpEmailHtml({ otp, purpose = 'registration', name = 'Student' }) {
  const isReset = purpose === 'password_reset';
  const actionText = isReset ? 'Password Reset Verification' : 'Student Account Verification';
  const introText = isReset 
    ? 'We received a request to reset your Campus Cravings account password.' 
    : 'Thank you for registering with Campus Cravings at CGC University, Mohali.';

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Campus Cravings Verification Code</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #FAF7F0; margin: 0; padding: 0; color: #1c1917; }
    .container { max-width: 560px; margin: 30px auto; background: #ffffff; border-radius: 20px; overflow: hidden; border: 1px solid #e7e5e4; box-shadow: 0 4px 20px rgba(0,0,0,0.06); }
    .header { background: linear-gradient(135deg, #0D1826 0%, #162544 100%); padding: 32px 24px; text-align: center; }
    .logo-badge { display: inline-block; background: #ffffff; padding: 8px 16px; border-radius: 12px; margin-bottom: 12px; }
    .logo-badge span { font-weight: 900; font-size: 18px; color: #064E36; }
    .logo-badge span.accent { color: #F97316; }
    .subhead { color: #FDE047; font-size: 11px; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase; }
    .content { padding: 36px 32px; text-align: center; }
    .title { font-size: 22px; font-weight: 800; color: #1c1917; margin: 0 0 12px 0; }
    .desc { font-size: 14px; color: #57534e; line-height: 1.6; margin: 0 0 28px 0; }
    .otp-box { background: #F4F1EA; border: 2px dashed #064E36; border-radius: 16px; padding: 20px; margin: 0 auto 28px auto; max-width: 320px; }
    .otp-label { font-size: 11px; text-transform: uppercase; letter-spacing: 1.5px; color: #78716c; font-weight: 700; margin-bottom: 8px; }
    .otp-code { font-family: 'Courier New', Courier, monospace; font-size: 38px; font-weight: 900; letter-spacing: 10px; color: #064E36; margin: 0; }
    .warning { background: #FEF3C7; border: 1px solid #FDE68A; border-radius: 12px; padding: 12px 16px; font-size: 12px; color: #92400E; text-align: left; line-height: 1.5; margin-bottom: 24px; }
    .footer { background: #f5f5f4; padding: 20px 24px; font-size: 11px; color: #a8a29e; text-align: center; border-top: 1px solid #e7e5e4; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="logo-badge">
        <span>Campus</span> <span class="accent">Cravings</span>
      </div>
      <div class="subhead">CGC University, Mohali • Student Dining</div>
    </div>
    <div class="content">
      <h1 class="title">${actionText}</h1>
      <p class="desc">Hello ${name || 'Student'}, ${introText.toLowerCase()} Please use the 6-digit verification code below to complete your verification.</p>
      
      <div class="otp-box">
        <div class="otp-label">Your One-Time Password</div>
        <div class="otp-code">${otp}</div>
      </div>

      <div class="warning">
        <strong>Security Notice:</strong> This code is valid for <strong>5 minutes</strong>. Never share this OTP with anyone, including university staff or cafe operators.
      </div>

      <p style="font-size: 12px; color: #78716c; margin: 0;">
        If you did not request this verification, you can safely ignore this email.
      </p>
    </div>
    <div class="footer">
      Campus Cravings Dining Services &copy; ${new Date().getFullYear()} CGC University, Mohali.<br>
      Automated verification system — please do not reply to this email.
    </div>
  </div>
</body>
</html>
`;
}

/**
 * Send real email via Resend API
 */
export async function sendEmailOtp({ email, otp, purpose = 'registration', name = 'Student' }) {
  if (!email) {
    throw new Error('Email address is required.');
  }

  const apiKey = CONFIG.EMAIL.RESEND_API_KEY;
  if (!apiKey || apiKey.trim() === '' || apiKey.includes('YOUR_RESEND_API_KEY')) {
    const error = new Error('Email provider is not configured. Set RESEND_API_KEY in .env file to enable live email delivery.');
    error.code = 'EMAIL_PROVIDER_NOT_CONFIGURED';
    throw error;
  }

  const from = CONFIG.EMAIL.FROM || 'Campus Cravings <onboarding@resend.dev>';
  const subject = purpose === 'password_reset'
    ? `${otp} is your Campus Cravings password reset code`
    : `${otp} is your Campus Cravings verification code`;

  const html = buildOtpEmailHtml({ otp, purpose, name });
  const text = `Your Campus Cravings verification code is: ${otp}. It expires in 5 minutes. Do not share this code with anyone.`;

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from,
        to: [email],
        subject,
        html,
        text
      })
    });

    const data = await response.json();

    if (!response.ok) {
      const err = new Error(data.message || `Resend API failed with status ${response.status}`);
      err.providerResponse = data;
      throw err;
    }

    return {
      success: true,
      provider: 'resend',
      id: data.id
    };
  } catch (err) {
    console.error('Failed to send email via Resend:', err);
    throw err;
  }
}
