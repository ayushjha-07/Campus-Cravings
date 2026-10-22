import assert from 'assert';
import {
  generateRandomOtp,
  hashOtp,
  createOtp,
  verifyOtp,
  consumeVerificationToken,
  _debugReset
} from '../server/otpManager.js';
import { normalizeIndianMobile, sendSmsOtp } from '../server/services/smsService.js';
import { sendEmailOtp } from '../server/services/emailService.js';
import {
  findUserByEmail,
  findUserByPhone,
  findUserByStudentId,
  createUser,
  getAllUsers
} from '../server/db.js';

console.log('================================================================');
console.log('🧪 RUNNING COMPREHENSIVE OTP & SECURITY TEST SUITE');
console.log('================================================================\n');

let passedTests = 0;
let totalTests = 0;

function test(name, fn) {
  totalTests++;
  try {
    fn();
    console.log(`  ✓ ${name}`);
    passedTests++;
  } catch (err) {
    console.error(`  ✗ ${name}`);
    console.error(`    Error: ${err.message}`);
    throw err;
  }
}

async function asyncTest(name, fn) {
  totalTests++;
  try {
    await fn();
    console.log(`  ✓ ${name}`);
    passedTests++;
  } catch (err) {
    console.error(`  ✗ ${name}`);
    console.error(`    Error: ${err.message}`);
    throw err;
  }
}

// -----------------------------------------------------------------------------
// Test Group 1: 6-Digit OTP Generation & Salted Hashing
// -----------------------------------------------------------------------------
console.log('--- 1. OTP Generation & Cryptographic Hashing ---');

test('Generates genuine random 6-digit numerical codes', () => {
  const samples = new Set();
  for (let i = 0; i < 50; i++) {
    const code = generateRandomOtp();
    assert.strictEqual(typeof code, 'string');
    assert.strictEqual(code.length, 6);
    assert.match(code, /^\d{6}$/);
    samples.add(code);
  }
  // Highly improbable to have collisions in 50 random 6-digit codes
  assert.ok(samples.size >= 48, 'Generated OTPs must be random and distinct');
});

test('Hashes OTP with unique salt using SHA-256', () => {
  const otp = '123456';
  const salt1 = 'salt_abc';
  const salt2 = 'salt_xyz';
  const hash1 = hashOtp(otp, salt1);
  const hash2 = hashOtp(otp, salt2);

  assert.strictEqual(hash1.length, 64);
  assert.strictEqual(hash2.length, 64);
  assert.notStrictEqual(hash1, hash2, 'Different salts must yield different hashes');
});

// -----------------------------------------------------------------------------
// Test Group 2: Indian Mobile Number Formatting
// -----------------------------------------------------------------------------
console.log('\n--- 2. Indian Mobile Number Normalization ---');

test('Validates 10-digit Indian numbers starting with 6, 7, 8, 9', () => {
  assert.strictEqual(normalizeIndianMobile('9876543210'), '9876543210');
  assert.strictEqual(normalizeIndianMobile('8123456789'), '8123456789');
  assert.strictEqual(normalizeIndianMobile('7012345678'), '7012345678');
  assert.strictEqual(normalizeIndianMobile('6234567890'), '6234567890');
});

test('Normalizes Indian numbers with +91, 91, or 0 prefixes and spaces', () => {
  assert.strictEqual(normalizeIndianMobile('+91 98765 43210'), '9876543210');
  assert.strictEqual(normalizeIndianMobile('919876543210'), '9876543210');
  assert.strictEqual(normalizeIndianMobile('09876543210'), '9876543210');
  assert.strictEqual(normalizeIndianMobile('+91-98765-43210'), '9876543210');
});

test('Rejects invalid numbers (e.g. non-Indian, short length, invalid starting digits)', () => {
  assert.strictEqual(normalizeIndianMobile('1234567890'), null); // Starts with 1
  assert.strictEqual(normalizeIndianMobile('5876543210'), null); // Starts with 5
  assert.strictEqual(normalizeIndianMobile('98765'), null);      // Too short
  assert.strictEqual(normalizeIndianMobile('abcdefghij'), null);  // Alpha
});

// -----------------------------------------------------------------------------
// Test Group 3: OTP Lifecycle, Cooldown & Attempt Limits
// -----------------------------------------------------------------------------
console.log('\n--- 3. OTP Verification Lifecycle & Security Controls ---');

test('Enforces 60-second cooldown on immediate re-requests', () => {
  _debugReset();
  const email = 'student.test1@cgc.edu.in';
  createOtp({ identifier: email, type: 'email', purpose: 'register' });

  // Re-requesting immediately must throw RESEND_COOLDOWN
  let threw = false;
  try {
    createOtp({ identifier: email, type: 'email', purpose: 'register' });
  } catch (err) {
    threw = true;
    assert.strictEqual(err.code, 'RESEND_COOLDOWN');
    assert.ok(err.waitSeconds > 0 && err.waitSeconds <= 60);
  }
  assert.ok(threw, 'Expected cooldown error was not thrown');
});

test('Tracks incorrect attempts and locks out after 5 failures', () => {
  _debugReset();
  const email = 'student.attempts@cgc.edu.in';
  const { otp } = createOtp({ identifier: email, type: 'email', purpose: 'register' });

  // 4 failed attempts
  for (let i = 1; i <= 4; i++) {
    try {
      verifyOtp({ identifier: email, type: 'email', purpose: 'register', otp: '000000' });
      assert.fail('Should not succeed with invalid code');
    } catch (err) {
      assert.strictEqual(err.code, 'INCORRECT_CODE');
      assert.strictEqual(err.attemptsLeft, 5 - i);
    }
  }

  // 5th failed attempt -> locks out
  try {
    verifyOtp({ identifier: email, type: 'email', purpose: 'register', otp: '000000' });
    assert.fail('Should not allow 5th failure');
  } catch (err) {
    assert.strictEqual(err.code, 'MAX_ATTEMPTS_EXCEEDED');
  }

  // Subsequent attempt with even the CORRECT OTP must be rejected because code is invalidated
  try {
    verifyOtp({ identifier: email, type: 'email', purpose: 'register', otp });
    assert.fail('Locked out code must not verify');
  } catch (err) {
    assert.strictEqual(err.code, 'NOT_FOUND');
  }
});

test('Issues single-use verification token upon valid OTP and invalidates code', () => {
  _debugReset();
  const phone = '9876500001';
  const { otp } = createOtp({ identifier: phone, type: 'sms', purpose: 'register' });

  const result = verifyOtp({ identifier: phone, type: 'sms', purpose: 'register', otp });
  assert.strictEqual(result.success, true);
  assert.ok(result.verificationToken);
  assert.strictEqual(result.verificationToken.length, 64); // 32-byte hex

  // Attempting to re-verify the same OTP code immediately must fail (single-use)
  try {
    verifyOtp({ identifier: phone, type: 'sms', purpose: 'register', otp });
    assert.fail('Reused OTP must be rejected');
  } catch (err) {
    assert.strictEqual(err.code, 'NOT_FOUND');
  }

  // Verification token can be consumed once
  const tokenCheck1 = consumeVerificationToken({
    token: result.verificationToken,
    identifier: phone,
    type: 'sms',
    purpose: 'register'
  });
  assert.strictEqual(tokenCheck1.valid, true);

  // Attempting to consume the token a second time must fail
  const tokenCheck2 = consumeVerificationToken({
    token: result.verificationToken,
    identifier: phone,
    type: 'sms',
    purpose: 'register'
  });
  assert.strictEqual(tokenCheck2.valid, false);
});

// -----------------------------------------------------------------------------
// Test Group 4: Provider Configuration Guards
// -----------------------------------------------------------------------------
console.log('\n--- 4. Live Provider Configuration Validation ---');

await asyncTest('Email service reports PROVIDER_NOT_CONFIGURED when API key is missing', async () => {
  let threw = false;
  try {
    await sendEmailOtp({
      email: 'unconfigured.test@cgc.edu.in',
      otp: '654321',
      purpose: 'register'
    });
  } catch (err) {
    threw = true;
    assert.strictEqual(err.code, 'EMAIL_PROVIDER_NOT_CONFIGURED');
    assert.ok(err.message.includes('RESEND_API_KEY'));
  }
  assert.ok(threw, 'Should report unconfigured email provider');
});

await asyncTest('SMS service reports PROVIDER_NOT_CONFIGURED when API credentials are missing', async () => {
  let threw = false;
  try {
    await sendSmsOtp({
      phone: '9876543210',
      otp: '654321',
      purpose: 'register'
    });
  } catch (err) {
    threw = true;
    assert.strictEqual(err.code, 'SMS_PROVIDER_NOT_CONFIGURED');
    assert.ok(err.message.includes('FAST2SMS') || err.message.includes('TWILIO'));
  }
  assert.ok(threw, 'Should report unconfigured SMS provider');
});

// -----------------------------------------------------------------------------
// Test Group 5: Seed Users & Database Duplication Safeguards
// -----------------------------------------------------------------------------
console.log('\n--- 5. Seed Accounts & Duplicate Detection ---');

test('Preserves pre-seeded users (Aarav & Simran) with verified status', () => {
  const aarav = findUserByEmail('aarav.cgc@cgc.edu.in');
  assert.ok(aarav, 'Aarav Sharma must exist');
  assert.strictEqual(aarav.emailVerified, true);
  assert.strictEqual(aarav.phoneVerified, true);

  const simran = findUserByEmail('simran.cgc@cgc.edu.in');
  assert.ok(simran, 'Simran Kaur must exist');
  assert.strictEqual(simran.emailVerified, true);
  assert.strictEqual(simran.phoneVerified, true);
});

test('Detects duplicate email, mobile number, and student ID', () => {
  assert.ok(findUserByEmail('aarav.cgc@cgc.edu.in') !== null);
  assert.ok(findUserByPhone('9876543210') !== null);
  assert.ok(findUserByStudentId('CGC2023CSE042') !== null);

  assert.strictEqual(findUserByEmail('brandnew.student@cgc.edu.in'), null);
  assert.strictEqual(findUserByPhone('9111223344'), null);
  assert.strictEqual(findUserByStudentId('CGC2026NEW001'), null);
});

console.log(`\n================================================================`);
console.log(`🎉 ALL ${passedTests}/${totalTests} TESTS PASSED SUCCESSFULLY!`);
console.log(`================================================================\n`);
