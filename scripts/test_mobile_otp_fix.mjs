import assert from 'assert';
import { apiHandler } from '../server/api.js';
import { _debugReset, createOtp, verifyOtp } from '../server/otpManager.js';
import { safeParseResponse } from '../src/utils/apiClient.js';
import { EventEmitter } from 'events';

console.log('================================================================');
console.log('🧪 TESTING MOBILE OTP CONNECTION & SAFE JSON RESPONSE HANDLING');
console.log('================================================================\n');

// Mock Node HTTP request/response helper
function mockReqRes({ method = 'POST', url = '/api/otp/send-sms', body = null }) {
  const req = new EventEmitter();
  req.method = method;
  req.url = url;
  req.headers = { host: 'localhost:3000' };

  const res = {
    statusCode: 200,
    headers: {},
    data: '',
    setHeader(k, v) { this.headers[k.toLowerCase()] = v; },
    end(chunk) {
      if (chunk) this.data += chunk;
      this.emit('done');
    }
  };
  Object.assign(res, EventEmitter.prototype);
  EventEmitter.call(res);

  const donePromise = new Promise(resolve => res.on('done', resolve));

  setTimeout(() => {
    if (body) req.emit('data', JSON.stringify(body));
    req.emit('end');
  }, 10);

  return { req, res, donePromise };
}

// -----------------------------------------------------------------------------
// 1. Test safeParseResponse against empty and malformed responses
// -----------------------------------------------------------------------------
console.log('--- 1. Safe JSON Response Parsing Tests ---');

// Case A: Empty response (0 bytes) - the exact condition that caused "Unexpected end of JSON input"
{
  const mockResponse = {
    ok: false,
    status: 502,
    statusText: 'Bad Gateway',
    text: async () => ''
  };

  const parsed = await safeParseResponse(mockResponse);
  assert.strictEqual(parsed.ok, false);
  assert.strictEqual(parsed.status, 502);
  assert.ok(parsed.error.includes('HTTP 502'), 'Must provide clear error for empty response');
  console.log('  ✓ Empty response (0 bytes) safely handled without throwing JSON error');
}

// Case B: HTML Error Page (e.g. Render / Cloudflare 502/503 HTML)
{
  const mockResponse = {
    ok: false,
    status: 503,
    statusText: 'Service Unavailable',
    text: async () => '<!DOCTYPE html><html><body><h1>503 Service Temporarily Unavailable</h1></body></html>'
  };

  const parsed = await safeParseResponse(mockResponse);
  assert.strictEqual(parsed.ok, false);
  assert.strictEqual(parsed.status, 503);
  assert.ok(parsed.error.includes('Server is temporarily unavailable'), 'Must detect HTML response');
  console.log('  ✓ HTML error page from proxy/gateway safely parsed without JSON crash');
}

// Case C: Valid JSON Response
{
  const mockResponse = {
    ok: true,
    status: 200,
    statusText: 'OK',
    text: async () => JSON.stringify({ success: true, message: 'OTP verified', token: 'xyz123' })
  };

  const parsed = await safeParseResponse(mockResponse);
  assert.strictEqual(parsed.ok, true);
  assert.strictEqual(parsed.status, 200);
  assert.strictEqual(parsed.data.token, 'xyz123');
  console.log('  ✓ Valid JSON response correctly parsed');
}

// -----------------------------------------------------------------------------
// 2. Test Backend Mobile OTP Endpoints Return Valid, Non-Empty JSON
// -----------------------------------------------------------------------------
console.log('\n--- 2. Backend Mobile OTP API Response Tests ---');

_debugReset();

// Test A: Mobile OTP send with invalid Indian number
{
  const { req, res, donePromise } = mockReqRes({
    method: 'POST',
    url: '/api/otp/send-sms',
    body: { phone: '12345' }
  });
  apiHandler(req, res);
  await donePromise;

  assert.strictEqual(res.statusCode, 400);
  assert.strictEqual(res.headers['content-type'], 'application/json; charset=utf-8');
  assert.ok(res.data.length > 0, 'Response body must not be empty');

  const json = JSON.parse(res.data);
  assert.strictEqual(json.success, false);
  assert.ok(json.error.includes('10-digit Indian mobile number'));
  console.log('  ✓ Invalid mobile number returns HTTP 400 JSON with clear error');
}

// Test B: Mobile OTP send for already registered Indian number
{
  const { req, res, donePromise } = mockReqRes({
    method: 'POST',
    url: '/api/otp/send-sms',
    body: { phone: '9876543210', purpose: 'register' } // Aarav Sharma's phone
  });
  apiHandler(req, res);
  await donePromise;

  assert.strictEqual(res.statusCode, 409);
  assert.strictEqual(res.headers['content-type'], 'application/json; charset=utf-8');
  assert.ok(res.data.length > 0);

  const json = JSON.parse(res.data);
  assert.strictEqual(json.success, false);
  assert.strictEqual(json.code, 'PHONE_ALREADY_EXISTS');
  console.log('  ✓ Duplicate mobile registration returns HTTP 409 JSON');
}

// Test C: Mobile OTP send when provider is unconfigured (returns devMode code for testing)
{
  _debugReset();
  const { req, res, donePromise } = mockReqRes({
    method: 'POST',
    url: '/api/otp/send-sms',
    body: { phone: '9811223344', purpose: 'register' }
  });
  apiHandler(req, res);
  await donePromise;

  assert.strictEqual(res.statusCode, 200);
  assert.strictEqual(res.headers['content-type'], 'application/json; charset=utf-8');
  assert.ok(res.data.length > 0);

  const json = JSON.parse(res.data);
  assert.strictEqual(json.success, true);
  assert.strictEqual(json.devMode, true);
  assert.strictEqual(json.code, 'PROVIDER_NOT_CONFIGURED');
  assert.ok(json.devCode && json.devCode.length === 6);
  console.log('  ✓ Unconfigured SMS provider returns HTTP 200 JSON with testing code to prevent lockout');
}

// Test D: Mobile OTP verification with invalid code
{
  _debugReset();
  const phone = '9811223344';
  const { otp } = createOtp({ identifier: phone, type: 'sms', purpose: 'register' });

  const { req, res, donePromise } = mockReqRes({
    method: 'POST',
    url: '/api/otp/verify-sms',
    body: { phone, otp: '000000', purpose: 'register' }
  });
  apiHandler(req, res);
  await donePromise;

  assert.strictEqual(res.statusCode, 400);
  assert.strictEqual(res.headers['content-type'], 'application/json; charset=utf-8');
  assert.ok(res.data.length > 0);

  const json = JSON.parse(res.data);
  assert.strictEqual(json.success, false);
  assert.strictEqual(json.code, 'INCORRECT_CODE');
  assert.strictEqual(json.attemptsLeft, 4);
  console.log('  ✓ Incorrect mobile OTP returns HTTP 400 JSON with remaining attempts');
}

// Test E: Mobile OTP verification with correct code -> issues single-use token
{
  const phone = '9811223344';
  // Retrieve the valid OTP created in Test D
  const { req: sendReq, res: sendRes, donePromise: sendDone } = mockReqRes({
    method: 'POST',
    url: '/api/otp/verify-sms',
    body: { phone, otp: _debugReset() || 'create_fresh' }
  });

  const freshOtp = createOtp({ identifier: phone, type: 'sms', purpose: 'register' });
  const { req, res, donePromise } = mockReqRes({
    method: 'POST',
    url: '/api/otp/verify-sms',
    body: { phone, otp: freshOtp.otp, purpose: 'register' }
  });
  apiHandler(req, res);
  await donePromise;

  assert.strictEqual(res.statusCode, 200);
  assert.strictEqual(res.headers['content-type'], 'application/json; charset=utf-8');
  const json = JSON.parse(res.data);
  assert.strictEqual(json.success, true);
  assert.ok(json.verificationToken);
  console.log('  ✓ Correct mobile OTP returns HTTP 200 JSON with single-use verification token');
}

// Test F: Trailing slash normalization (/api/otp/send-sms/ -> /api/otp/send-sms)
{
  const { req, res, donePromise } = mockReqRes({
    method: 'POST',
    url: '/api/otp/send-sms/',
    body: { phone: '12345' }
  });
  apiHandler(req, res);
  await donePromise;

  assert.strictEqual(res.statusCode, 400, 'Trailing slash should not cause 404');
  console.log('  ✓ URL with trailing slash normalized correctly without 404');
}

console.log('\n================================================================');
console.log('🎉 ALL MOBILE OTP CONNECTION & JSON PARSING TESTS PASSED!');
console.log('================================================================\n');
