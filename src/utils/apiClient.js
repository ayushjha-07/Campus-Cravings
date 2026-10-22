/**
 * Safe API Client for Campus Cravings
 * Handles environment-based API base URL, robust JSON parsing,
 * network failure detection, and prevents "Unexpected end of JSON input" errors.
 */

export function getApiBaseUrl() {
  const envUrl = import.meta.env?.VITE_API_BASE_URL;
  if (typeof envUrl === 'string' && envUrl.trim() !== '') {
    return envUrl.trim().replace(/\/+$/, '');
  }
  return '';
}

/**
 * Safely parse response text as JSON without throwing on empty or invalid text
 */
export async function safeParseResponse(response) {
  let text = '';
  try {
    text = await response.text();
  } catch (readErr) {
    return {
      ok: false,
      status: response.status || 0,
      data: null,
      error: `Failed to read server response: ${readErr.message}`
    };
  }

  const trimmed = text.trim();

  // Handle empty responses
  if (!trimmed) {
    if (!response.ok) {
      return {
        ok: false,
        status: response.status,
        data: null,
        error: `Server returned HTTP ${response.status} with an empty response.`
      };
    }
    return {
      ok: true,
      status: response.status,
      data: { success: true },
      error: null
    };
  }

  // Attempt JSON parsing
  try {
    const json = JSON.parse(trimmed);
    const isSuccess = response.ok && (json.success !== false);
    return {
      ok: isSuccess,
      status: response.status,
      data: json,
      error: isSuccess ? null : (json.error || `Request failed with HTTP ${response.status}`)
    };
  } catch {
    // Non-JSON response (e.g. HTML 502/503 error page from Render or Cloudflare)
    const isHtml = trimmed.toLowerCase().startsWith('<!doctype') || trimmed.toLowerCase().startsWith('<html');
    const errorMsg = isHtml 
      ? `Server is temporarily unavailable or misconfigured (HTTP ${response.status}).`
      : `Unexpected server response format (HTTP ${response.status}).`;

    return {
      ok: false,
      status: response.status,
      data: null,
      error: errorMsg,
      rawText: trimmed.slice(0, 300)
    };
  }
}

/**
 * Enhanced fetch wrapper with timeout, safe JSON parsing, and unified error handling
 */
export async function apiRequest(endpoint, { method = 'POST', body, headers = {}, timeoutMs = 15000 } = {}) {
  const baseUrl = getApiBaseUrl();
  const url = `${baseUrl}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  const requestHeaders = {
    'Accept': 'application/json',
    ...headers
  };

  if (body !== undefined && !(body instanceof FormData)) {
    requestHeaders['Content-Type'] = 'application/json';
  }

  try {
    const response = await fetch(url, {
      method,
      headers: requestHeaders,
      body: (body && typeof body === 'object' && !(body instanceof FormData)) ? JSON.stringify(body) : body,
      signal: controller.signal
    });

    clearTimeout(timeoutId);
    return await safeParseResponse(response);
  } catch (err) {
    clearTimeout(timeoutId);

    if (err.name === 'AbortError') {
      return {
        ok: false,
        status: 0,
        data: null,
        error: 'The request timed out. Please check your internet connection or server status.'
      };
    }

    return {
      ok: false,
      status: 0,
      data: null,
      error: `Network connection failed: ${err.message}. Please verify the server is running.`
    };
  }
}
