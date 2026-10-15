/**
 * Authentication Utilities & Demonstration Storage
 * CGC University, Mohali - Campus Cravings
 * 
 * SECURITY NOTICE:
 * This prototype uses client-side SHA-256 hashing to avoid storing plaintext
 * passwords in localStorage. This is an academic demonstration for UI/UX evaluation.
 * Production systems must authenticate via HTTPS to a secure backend using
 * salted bcrypt/Argon2 hashing, JWT/HttpOnly session cookies, and university SSO.
 */

// Simple asynchronous SHA-256 hash using Web Crypto API
export async function hashPassword(plainText) {
  if (!plainText) return '';
  try {
    const msgBuffer = new TextEncoder().encode(plainText);
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  } catch {
    // Fallback pseudo-hash for older environments
    let hash = 0;
    for (let i = 0; i < plainText.length; i++) {
      hash = (hash << 5) - hash + plainText.charCodeAt(i);
      hash |= 0;
    }
    return `cgc_hash_${Math.abs(hash)}`;
  }
}

// Pre-seeded demo student accounts (password for all is "password123")
// Precomputed SHA-256 hash for "password123":
// "ef92b778bafe771e89245b89ecbc08a44a4e166c06659911881f383d4473e94f"
export const DEMO_PASSWORD_HASH = 'ef92b778bafe771e89245b89ecbc08a44a4e166c06659911881f383d4473e94f';

export const SEED_STUDENTS = [
  {
    id: 'cgc_user_1',
    name: 'Aarav Sharma',
    studentId: 'CGC2023CSE042',
    rollNo: 'CGC2023CSE042',
    email: 'aarav.cgc@cgc.edu.in',
    phone: '9876543210',
    department: 'Computer Science & Engineering',
    hostel: 'Boys Hostel 3, Room 214',
    campus: 'CGC University, Mohali',
    passwordHash: DEMO_PASSWORD_HASH,
    createdAt: '2026-01-15T09:00:00Z'
  },
  {
    id: 'cgc_user_2',
    name: 'Simran Kaur',
    studentId: 'CGC2023ECE019',
    rollNo: 'CGC2023ECE019',
    email: 'simran.cgc@cgc.edu.in',
    phone: '9812345678',
    department: 'Electronics & Communication',
    hostel: 'Girls Hostel 1, Room 108',
    campus: 'CGC University, Mohali',
    passwordHash: DEMO_PASSWORD_HASH,
    createdAt: '2026-02-10T11:30:00Z'
  }
];

export const STORAGE_KEYS = {
  USER: 'campus_cravings_user',
  STORED_USERS: 'campus_cravings_registered_users',
  REMEMBER_ME: 'campus_cravings_remember_me'
};

// Retrieve registered users from localStorage or initialize with seed students
export function getRegisteredUsers() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.STORED_USERS);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (err) {
    console.warn('Failed to parse registered users, restoring defaults', err);
  }
  // Store seeds if not present
  try {
    localStorage.setItem(STORAGE_KEYS.STORED_USERS, JSON.stringify(SEED_STUDENTS));
  } catch {
    // ignore
  }
  return SEED_STUDENTS;
}

// Save a new user to registered users list
export function saveRegisteredUser(newUser) {
  try {
    const current = getRegisteredUsers();
    const updated = [newUser, ...current];
    localStorage.setItem(STORAGE_KEYS.STORED_USERS, JSON.stringify(updated));
    return updated;
  } catch (err) {
    console.error('Failed to save registered user', err);
    return [];
  }
}

// Update an existing user in the registered users list
export function updateRegisteredUser(studentId, updatedFields) {
  try {
    const current = getRegisteredUsers();
    const updated = current.map(u => 
      (u.studentId?.toUpperCase() === studentId?.toUpperCase() || u.id === studentId)
        ? { ...u, ...updatedFields }
        : u
    );
    localStorage.setItem(STORAGE_KEYS.STORED_USERS, JSON.stringify(updated));
    return updated;
  } catch (err) {
    console.error('Failed to update registered user', err);
    return [];
  }
}

// Form validation helpers
export function validateEmail(email) {
  if (!email || typeof email !== 'string') return false;
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email.trim());
}

export function validatePhone(phone) {
  if (!phone) return false;
  // Match 10 digits (optionally with +91 or leading 0)
  const cleaned = phone.replace(/\D/g, '');
  return cleaned.length === 10 || (cleaned.length === 12 && cleaned.startsWith('91'));
}

export function validateStudentId(id) {
  if (!id || typeof id !== 'string') return false;
  const trimmed = id.trim();
  return trimmed.length >= 4;
}

export function validatePassword(password) {
  if (!password || typeof password !== 'string') return false;
  return password.length >= 6;
}
