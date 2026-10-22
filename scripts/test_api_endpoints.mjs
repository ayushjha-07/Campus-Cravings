import assert from 'assert';
import { apiHandler } from '../server/api.js';
import { _debugReset, createOtp, verifyOtp } from '../server/otpManager.js';
import { EventEmitter } from 'events';

console.log('--- Testing API Handler via Mock HTTP Request / Response ---');

function mockReqRes({ method = 'GET', url = '/api/health', body = null }) {
  const req = new EventEmitter();
  req.method = method;
  req.url = url;
  req.headers = { host: 'localhost:3000' };

  const res = {
    statusCode: 200,
    headers: {},
    data: '',
    setHeader(k, v) { this.headers[k] = v; },
    end(chunk) {
      if (chunk) this.data += chunk;
      this.emit('done');
    }
  };
  Object.assign(res, EventEmitter.prototype);
  EventEmitter.call(res);

  const donePromise = new Promise(resolve => res.on('done', resolve));

  // Feed body chunk asynchronously
  setTimeout(() => {
    if (body) {
      req.emit('data', JSON.stringify(body));
    }
    req.emit('end');
  }, 10);

  return { req, res, donePromise };
}

async function runApiTests() {
  _debugReset();

  // Test 1: GET /api/health
  {
    const { req, res, donePromise } = mockReqRes({ method: 'GET', url: '/api/health' });
    apiHandler(req, res);
    await donePromise;
    assert.strictEqual(res.statusCode, 200);
    const body = JSON.parse(res.data);
    assert.strictEqual(body.status, 'ok');
    console.log('  ✓ GET /api/health returned 200 OK');
  }

  // Test 2: Duplicate Email Registration Check on /api/otp/send-email
  {
    const { req, res, donePromise } = mockReqRes({
      method: 'POST',
      url: '/api/otp/send-email',
      body: { email: 'aarav.cgc@cgc.edu.in', purpose: 'register' }
    });
    apiHandler(req, res);
    await donePromise;
    assert.strictEqual(res.statusCode, 409);
    const body = JSON.parse(res.data);
    assert.strictEqual(body.code, 'EMAIL_ALREADY_EXISTS');
    console.log('  ✓ Duplicate email rejected on /api/otp/send-email with 409');
  }

  // Test 3: Duplicate Phone Registration Check on /api/otp/send-sms
  {
    const { req, res, donePromise } = mockReqRes({
      method: 'POST',
      url: '/api/otp/send-sms',
      body: { phone: '9876543210', purpose: 'register' }
    });
    apiHandler(req, res);
    await donePromise;
    assert.strictEqual(res.statusCode, 409);
    const body = JSON.parse(res.data);
    assert.strictEqual(body.code, 'PHONE_ALREADY_EXISTS');
    console.log('  ✓ Duplicate mobile number rejected on /api/otp/send-sms with 409');
  }

  // Test 4: Registration fails without valid verification tokens
  {
    const { req, res, donePromise } = mockReqRes({
      method: 'POST',
      url: '/api/auth/register',
      body: {
        name: 'Test Student',
        email: 'test.unverified@cgc.edu.in',
        phone: '9888877777',
        studentId: 'CGC2026TEST01',
        password: 'password123',
        termsAccepted: true
      }
    });
    apiHandler(req, res);
    await donePromise;
    assert.strictEqual(res.statusCode, 403);
    const body = JSON.parse(res.data);
    assert.strictEqual(body.code, 'EMAIL_VERIFICATION_REQUIRED');
    console.log('  ✓ Registration rejected without email verification token (403)');
  }

  // Test 5: Registration succeeds when valid single-use tokens are provided
  {
    // Simulate verified email
    const email = 'verified.student@cgc.edu.in';
    const emailOtp = createOtp({ identifier: email, type: 'email', purpose: 'register' });
    const emailVer = verifyOtp({ identifier: email, type: 'email', purpose: 'register', otp: emailOtp.otp });

    // Simulate verified phone
    const phone = '9888877777';
    const phoneOtp = createOtp({ identifier: phone, type: 'sms', purpose: 'register' });
    const phoneVer = verifyOtp({ identifier: phone, type: 'sms', purpose: 'register', otp: phoneOtp.otp });

    const { req, res, donePromise } = mockReqRes({
      method: 'POST',
      url: '/api/auth/register',
      body: {
        name: 'Verified Student',
        email,
        phone,
        studentId: 'CGC2026VER01',
        password: 'password123',
        termsAccepted: true,
        emailVerificationToken: emailVer.verificationToken,
        phoneVerificationToken: phoneVer.verificationToken
      }
    });
    apiHandler(req, res);
    await donePromise;
    assert.strictEqual(res.statusCode, 201);
    const body = JSON.parse(res.data);
    assert.strictEqual(body.success, true);
    assert.strictEqual(body.user.emailVerified, true);
    assert.strictEqual(body.user.phoneVerified, true);
    console.log('  ✓ Registration succeeded with valid tokens (201 Created)');
  }

  console.log('\n🎉 ALL API HANDLER TESTS PASSED!');
}

runApiTests().catch(err => {
  console.error('API Test Failure:', err);
  process.exit(1);
});
