import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  getRegisteredUsers, 
  saveRegisteredUser, 
  updateRegisteredUser, 
  hashPassword, 
  STORAGE_KEYS, 
  SEED_STUDENTS,
  validateEmail,
  validatePhone,
  validateStudentId,
  validatePassword
} from '../utils/authUtils';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  // Current logged in user state
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.USER);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && typeof parsed.isLoggedIn === 'boolean') {
          return parsed;
        }
      }
      // Default to guest visitor so they experience the public landing page before login
      return {
        isLoggedIn: false,
        name: 'Guest Student',
        studentId: 'Guest',
        email: ''
      };
    } catch {
      return {
        isLoggedIn: false,
        name: 'Guest Student',
        studentId: 'Guest',
        email: ''
      };
    }
  });

  // Sync user state to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
    } catch (e) {
      console.error('Failed to persist user to localStorage', e);
    }
  }, [user]);

  // Login handler
  const login = async (identifier, password, rememberMe = false) => {
    if (!identifier || !identifier.trim()) {
      return { success: false, error: 'Please enter your CGC Student ID or College Email.' };
    }
    if (!password) {
      return { success: false, error: 'Please enter your password.' };
    }

    const cleanIdentifier = identifier.trim().toLowerCase();
    const registered = getRegisteredUsers();

    // Find student by ID or Email
    const matched = registered.find(u => 
      u.email.toLowerCase() === cleanIdentifier || 
      u.studentId.toLowerCase() === cleanIdentifier ||
      (u.rollNo && u.rollNo.toLowerCase() === cleanIdentifier)
    );

    if (!matched) {
      return { 
        success: false, 
        error: 'No student account found with this Student ID or Email. Please check spelling or create an account.' 
      };
    }

    // Verify hashed password
    const hashedAttempt = await hashPassword(password);
    if (matched.passwordHash !== hashedAttempt) {
      return { 
        success: false, 
        error: 'Incorrect password. Please try again.' 
      };
    }

    // Success: Set authenticated user state
    const authenticatedUser = {
      ...matched,
      isLoggedIn: true
    };

    setUser(authenticatedUser);

    if (rememberMe) {
      try {
        localStorage.setItem(STORAGE_KEYS.REMEMBER_ME, identifier.trim());
      } catch {
        // ignore
      }
    } else {
      try {
        localStorage.removeItem(STORAGE_KEYS.REMEMBER_ME);
      } catch {
        // ignore
      }
    }

    return { success: true, user: authenticatedUser };
  };

  // Registration handler
  const register = async (formData) => {
    const { name, email, studentId, phone, password, confirmPassword, termsAccepted, department, hostel } = formData;

    // Validation checks
    if (!name || name.trim().length < 2) {
      return { success: false, error: 'Please enter your full student name.' };
    }

    if (!validateEmail(email)) {
      return { success: false, error: 'Please enter a valid email address (e.g. name@cgc.edu.in).' };
    }

    if (!validateStudentId(studentId)) {
      return { success: false, error: 'Student ID / Roll No must be at least 4 characters (e.g. CGC2024CSE101).' };
    }

    if (!validatePhone(phone)) {
      return { success: false, error: 'Please enter a valid 10-digit mobile number.' };
    }

    if (!validatePassword(password)) {
      return { success: false, error: 'Password must be at least 6 characters long.' };
    }

    if (password !== confirmPassword) {
      return { success: false, error: 'Passwords do not match. Please re-enter identical passwords.' };
    }

    if (!termsAccepted) {
      return { success: false, error: 'Please accept the CGC University Food Ordering Terms & Conditions.' };
    }

    // Check duplicate student registration
    const registered = getRegisteredUsers();
    const cleanEmail = email.trim().toLowerCase();
    const cleanId = studentId.trim().toUpperCase();

    const isDuplicateEmail = registered.some(u => u.email.toLowerCase() === cleanEmail);
    if (isDuplicateEmail) {
      return { success: false, error: `The email ${email} is already registered. Please sign in instead.` };
    }

    const isDuplicateId = registered.some(u => u.studentId.toUpperCase() === cleanId);
    if (isDuplicateId) {
      return { success: false, error: `Student ID "${studentId}" is already registered. Please sign in instead.` };
    }

    // Hash password before saving to ensure security requirements
    const passwordHash = await hashPassword(password);

    const newUser = {
      id: `cgc_user_${Date.now()}`,
      name: name.trim(),
      studentId: cleanId,
      rollNo: cleanId,
      email: cleanEmail,
      phone: phone.trim(),
      department: department?.trim() || 'Computer Science & Engineering',
      hostel: hostel?.trim() || 'Campus Day Scholar',
      campus: 'CGC University, Mohali',
      passwordHash,
      createdAt: new Date().toISOString()
    };

    saveRegisteredUser(newUser);

    // Auto log in after registration
    const authenticatedUser = {
      ...newUser,
      isLoggedIn: true
    };
    setUser(authenticatedUser);

    return { success: true, user: authenticatedUser };
  };

  // Profile update handler
  const updateProfile = (updatedFields) => {
    if (!user || !user.isLoggedIn) return { success: false, error: 'No active session' };

    const cleanUpdates = {
      ...updatedFields,
      name: updatedFields.name?.trim() || user.name,
      phone: updatedFields.phone?.trim() || user.phone,
      department: updatedFields.department?.trim() || user.department,
      hostel: updatedFields.hostel?.trim() || user.hostel
    };

    const updatedUser = {
      ...user,
      ...cleanUpdates
    };

    setUser(updatedUser);
    updateRegisteredUser(user.studentId, cleanUpdates);

    return { success: true, user: updatedUser };
  };

  // Logout handler
  const logout = () => {
    const guestUser = {
      isLoggedIn: false,
      name: 'Guest Student',
      studentId: 'Guest',
      rollNo: 'Guest',
      email: '',
      phone: '',
      department: 'General',
      hostel: 'Day Scholar',
      campus: 'CGC University, Mohali'
    };
    setUser(guestUser);
  };

  // Demo Password Reset Request Simulator
  const requestPasswordReset = (identifier) => {
    if (!identifier || !identifier.trim()) {
      return { success: false, error: 'Please enter your registered Student ID or College Email.' };
    }
    const clean = identifier.trim().toLowerCase();
    const registered = getRegisteredUsers();
    const matched = registered.find(u => 
      u.email.toLowerCase() === clean || 
      u.studentId.toLowerCase() === clean
    );

    if (!matched) {
      return { 
        success: false, 
        error: 'No student account matches that ID or email. Please register or check your spelling.' 
      };
    }

    return {
      success: true,
      email: matched.email,
      message: `A password recovery notification was sent to ${matched.email}.`
    };
  };

  // Google SSO authentication handler (matches registered student by college email)
  const googleLogin = (email) => {
    if (!email || !email.trim()) {
      return { success: false, error: 'Please enter your registered college email.' };
    }
    const cleanEmail = email.trim().toLowerCase();
    const registered = getRegisteredUsers();
    const matched = registered.find(u => u.email.toLowerCase() === cleanEmail);
    if (!matched) {
      return { success: false, error: `No student account found for "${cleanEmail}". Please register first.` };
    }
    const authenticatedUser = {
      ...matched,
      isLoggedIn: true
    };
    setUser(authenticatedUser);
    return { success: true, user: authenticatedUser };
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: Boolean(user?.isLoggedIn),
        login,
        googleLogin,
        register,
        logout,
        updateProfile,
        requestPasswordReset
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
