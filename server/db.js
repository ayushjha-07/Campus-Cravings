import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_DIR = path.resolve(__dirname, 'data');
const USERS_FILE = path.join(DATA_DIR, 'users.json');

// Pre-seeded students (Aarav Sharma and Simran Kaur) matching authUtils.js
const SEED_USERS = [
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
    passwordHash: 'ef92b778bafe771e89245b89ecbc08a44a4e166c06659911881f383d4473e94f',
    emailVerified: true,
    phoneVerified: true,
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
    passwordHash: 'ef92b778bafe771e89245b89ecbc08a44a4e166c06659911881f383d4473e94f',
    emailVerified: true,
    phoneVerified: true,
    createdAt: '2026-02-10T11:30:00Z'
  }
];

function ensureStorage() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  if (!fs.existsSync(USERS_FILE)) {
    fs.writeFileSync(USERS_FILE, JSON.stringify(SEED_USERS, null, 2), 'utf8');
  }
}

export function getAllUsers() {
  ensureStorage();
  try {
    const raw = fs.readFileSync(USERS_FILE, 'utf8');
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : SEED_USERS;
  } catch (e) {
    console.error('Error reading users from storage:', e);
    return SEED_USERS;
  }
}

export function saveAllUsers(users) {
  ensureStorage();
  try {
    fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2), 'utf8');
    return true;
  } catch (e) {
    console.error('Error writing users to storage:', e);
    return false;
  }
}

export function findUserByEmail(email) {
  if (!email) return null;
  const clean = email.trim().toLowerCase();
  const users = getAllUsers();
  return users.find(u => u.email && u.email.toLowerCase() === clean) || null;
}

export function findUserByPhone(phone) {
  if (!phone) return null;
  const clean = phone.replace(/\D/g, '');
  const users = getAllUsers();
  return users.find(u => {
    const uPhone = (u.phone || '').replace(/\D/g, '');
    return uPhone.endsWith(clean.slice(-10)) || clean.endsWith(uPhone.slice(-10));
  }) || null;
}

export function findUserByStudentId(studentId) {
  if (!studentId) return null;
  const clean = studentId.trim().toUpperCase();
  const users = getAllUsers();
  return users.find(u => (u.studentId && u.studentId.toUpperCase() === clean) || (u.rollNo && u.rollNo.toUpperCase() === clean)) || null;
}

export function createUser(userData) {
  const users = getAllUsers();
  const newUser = {
    ...userData,
    id: userData.id || `cgc_user_${Date.now()}`,
    createdAt: userData.createdAt || new Date().toISOString()
  };
  users.unshift(newUser);
  saveAllUsers(users);
  return newUser;
}

export function updateUserPassword(emailOrId, newPasswordHash) {
  const users = getAllUsers();
  const clean = emailOrId.trim().toLowerCase();
  let updated = false;

  const newUsers = users.map(u => {
    if (u.email?.toLowerCase() === clean || u.studentId?.toLowerCase() === clean || u.id === emailOrId) {
      updated = true;
      return { ...u, passwordHash: newPasswordHash, updatedAt: new Date().toISOString() };
    }
    return u;
  });

  if (updated) {
    saveAllUsers(newUsers);
  }
  return updated;
}
