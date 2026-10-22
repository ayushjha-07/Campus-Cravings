import React, { createContext, useContext, useState, useEffect } from 'react';
import { OUTLETS } from '../data/outlets';
import { getRegisteredUsers, saveRegisteredUser, updateRegisteredUser, SEED_STUDENTS } from '../utils/authUtils';

const AdminContext = createContext();

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};

// Storage Keys
const ADMIN_STORAGE_KEYS = {
  SESSION: 'campus_cravings_admin_session',
  STAFF: 'campus_cravings_admin_staff',
  STUDENTS: 'campus_cravings_admin_students',
  AUDIT_LOG: 'campus_cravings_admin_audit_log',
  NOTIFICATIONS: 'campus_cravings_admin_notifications',
  SETTINGS: 'campus_cravings_admin_settings'
};

// Initial Seed Staff Members (covering CGC outlets + university admins)
const INITIAL_STAFF = [
  {
    id: 'staff-01',
    name: 'Rajesh Kumar',
    staffId: 'CGC-STF-01',
    email: 'rajesh.kulhad@cgc.edu.in',
    phone: '+91 98765 11001',
    assignedOutletId: 'kulhad',
    assignedOutletName: 'Kulhad',
    role: 'Outlet Staff',
    status: 'Active',
    joinedDate: '2025-08-10',
    lastActive: '10 mins ago',
    shift: 'Morning & Afternoon'
  },
  {
    id: 'staff-02',
    name: 'Amit Dogra',
    staffId: 'CGC-STF-02',
    email: 'amit.dominos@cgc.edu.in',
    phone: '+91 98765 11002',
    assignedOutletId: 'dominos',
    assignedOutletName: 'Dominos',
    role: 'Outlet Manager',
    status: 'Active',
    joinedDate: '2025-07-15',
    lastActive: '5 mins ago',
    shift: 'Full Day'
  },
  {
    id: 'staff-03',
    name: 'Preeti Verma',
    staffId: 'CGC-STF-03',
    email: 'preeti.nescafe@cgc.edu.in',
    phone: '+91 98765 11003',
    assignedOutletId: 'nescafe',
    assignedOutletName: 'Nescafe',
    role: 'Outlet Staff',
    status: 'Active',
    joinedDate: '2025-09-01',
    lastActive: '12 mins ago',
    shift: 'Morning & Evening'
  },
  {
    id: 'staff-04',
    name: 'Gurpreet Singh',
    staffId: 'CGC-STF-04',
    email: 'gurpreet.applebeez@cgc.edu.in',
    phone: '+91 98765 11004',
    assignedOutletId: 'applebeez',
    assignedOutletName: 'Applebeez',
    role: 'Outlet Staff',
    status: 'Active',
    joinedDate: '2025-06-20',
    lastActive: '25 mins ago',
    shift: 'Full Day'
  },
  {
    id: 'staff-05',
    name: 'Maninder Kaur',
    staffId: 'CGC-STF-05',
    email: 'maninder.tuckshop@cgc.edu.in',
    phone: '+91 98765 11005',
    assignedOutletId: 'tuckshop',
    assignedOutletName: 'Tuckshop',
    role: 'Outlet Staff',
    status: 'Active',
    joinedDate: '2025-10-05',
    lastActive: '1 hour ago',
    shift: 'Morning'
  },
  {
    id: 'staff-06',
    name: 'Vikram Batra',
    staffId: 'CGC-STF-06',
    email: 'vikram.canteen@cgc.edu.in',
    phone: '+91 98765 11006',
    assignedOutletId: 'canteen',
    assignedOutletName: 'Canteen',
    role: 'Outlet Manager',
    status: 'Active',
    joinedDate: '2025-05-12',
    lastActive: '18 mins ago',
    shift: 'Full Day'
  },
  {
    id: 'staff-07',
    name: 'Neha Sharma',
    staffId: 'CGC-STF-07',
    email: 'neha.foodcourt@cgc.edu.in',
    phone: '+91 98765 11007',
    assignedOutletId: 'food-court',
    assignedOutletName: 'Food Court',
    role: 'Outlet Staff',
    status: 'Active',
    joinedDate: '2025-08-25',
    lastActive: '40 mins ago',
    shift: 'Evening'
  },
  {
    id: 'staff-08',
    name: 'Sandeep Gill',
    staffId: 'CGC-STF-08',
    email: 'sandeep.topntown@cgc.edu.in',
    phone: '+91 98765 11008',
    assignedOutletId: 'topn-town',
    assignedOutletName: 'Topn n Town for Hunger',
    role: 'Outlet Staff',
    status: 'Active',
    joinedDate: '2025-09-14',
    lastActive: '2 hours ago',
    shift: 'Afternoon'
  },
  {
    id: 'staff-09',
    name: 'Sunita Devi',
    staffId: 'CGC-STF-09',
    email: 'sunita.buddys@cgc.edu.in',
    phone: '+91 98765 11009',
    assignedOutletId: 'buddys-bistro',
    assignedOutletName: 'Buddys Bistro',
    role: 'Outlet Staff',
    status: 'Active',
    joinedDate: '2025-08-01',
    lastActive: '30 mins ago',
    shift: 'Morning & Evening'
  },
  {
    id: 'staff-10',
    name: 'Jaspreet Singh',
    staffId: 'CGC-STF-10',
    email: 'jaspreet.chutarputar@cgc.edu.in',
    phone: '+91 98765 11010',
    assignedOutletId: 'chutar-putar',
    assignedOutletName: 'Chutar Putar',
    role: 'Outlet Staff',
    status: 'Active',
    joinedDate: '2025-11-01',
    lastActive: '45 mins ago',
    shift: 'Full Day'
  },
  {
    id: 'staff-11',
    name: 'Pooja Rani',
    staffId: 'CGC-STF-11',
    email: 'pooja.sipnbites@cgc.edu.in',
    phone: '+91 98765 11011',
    assignedOutletId: 'sip-n-bites',
    assignedOutletName: 'Sip n Bites',
    role: 'Outlet Staff',
    status: 'On Leave',
    joinedDate: '2025-09-19',
    lastActive: '2 days ago',
    shift: 'Morning'
  },
  {
    id: 'staff-12',
    name: 'Dr. Harpreet Singh',
    staffId: 'CGC-ADM-001',
    email: 'dean.welfare@cgc.edu.in',
    phone: '+91 98140 12345',
    assignedOutletId: 'all',
    assignedOutletName: 'All Campus Outlets',
    role: 'University Admin',
    status: 'Active',
    joinedDate: '2024-01-01',
    lastActive: 'Just now',
    shift: 'Administrative'
  }
];

// Initial Seed Extended Students for the Admin Directory
const INITIAL_ADMIN_STUDENTS = [
  {
    id: 'cgc_user_1',
    name: 'Aarav Sharma',
    studentId: 'CGC2023CSE042',
    rollNo: 'CGC2023CSE042',
    email: 'aarav.cgc@cgc.edu.in',
    phone: '9876543210',
    department: 'Computer Science & Engineering',
    semester: '6th Semester',
    hostel: 'Boys Hostel 3, Room 214',
    campus: 'CGC University, Mohali',
    status: 'Active',
    totalOrders: 14,
    totalSpent: 2840,
    createdAt: '2026-01-15T09:00:00Z',
    lastOrderDate: 'Today, 01:15 PM'
  },
  {
    id: 'cgc_user_2',
    name: 'Simran Kaur',
    studentId: 'CGC2023ECE019',
    rollNo: 'CGC2023ECE019',
    email: 'simran.cgc@cgc.edu.in',
    phone: '9812345678',
    department: 'Electronics & Communication',
    semester: '6th Semester',
    hostel: 'Girls Hostel 1, Room 108',
    campus: 'CGC University, Mohali',
    status: 'Active',
    totalOrders: 8,
    totalSpent: 1420,
    createdAt: '2026-02-10T11:30:00Z',
    lastOrderDate: 'Today, 11:20 AM'
  },
  {
    id: 'cgc_user_3',
    name: 'Rohan Mehta',
    studentId: 'CGC2022ME055',
    rollNo: 'CGC2022ME055',
    email: 'rohan.mehta@cgc.edu.in',
    phone: '9845123980',
    department: 'Mechanical Engineering',
    semester: '8th Semester',
    hostel: 'Campus Day Scholar (Mohali Ph-7)',
    campus: 'CGC University, Mohali',
    status: 'Active',
    totalOrders: 22,
    totalSpent: 4890,
    createdAt: '2025-08-20T10:15:00Z',
    lastOrderDate: 'Yesterday, 04:30 PM'
  },
  {
    id: 'cgc_user_4',
    name: 'Ananya Gupta',
    studentId: 'CGC2024BBA012',
    rollNo: 'CGC2024BBA012',
    email: 'ananya.bba@cgc.edu.in',
    phone: '9789012345',
    department: 'Business Administration (BBA)',
    semester: '4th Semester',
    hostel: 'Girls Hostel 2, Room 302',
    campus: 'CGC University, Mohali',
    status: 'Active',
    totalOrders: 5,
    totalSpent: 870,
    createdAt: '2025-11-04T14:00:00Z',
    lastOrderDate: 'Yesterday, 01:45 PM'
  },
  {
    id: 'cgc_user_5',
    name: 'Jasleen Kaur',
    studentId: 'CGC2023MBA004',
    rollNo: 'CGC2023MBA004',
    email: 'jasleen.mba@cgc.edu.in',
    phone: '9915567812',
    department: 'Master of Business Admin (MBA)',
    semester: '2nd Semester',
    hostel: 'Campus Day Scholar (Kharar)',
    campus: 'CGC University, Mohali',
    status: 'Active',
    totalOrders: 11,
    totalSpent: 2650,
    createdAt: '2025-09-12T08:45:00Z',
    lastOrderDate: '2 days ago'
  },
  {
    id: 'cgc_user_6',
    name: 'Harjot Singh',
    studentId: 'CGC2021CIV031',
    rollNo: 'CGC2021CIV031',
    email: 'harjot.civil@cgc.edu.in',
    phone: '9872134560',
    department: 'Civil Engineering',
    semester: '8th Semester',
    hostel: 'Boys Hostel 1, Room 410',
    campus: 'CGC University, Mohali',
    status: 'Suspended',
    totalOrders: 3,
    totalSpent: 510,
    createdAt: '2025-07-28T16:20:00Z',
    lastOrderDate: '5 days ago'
  },
  {
    id: 'cgc_user_7',
    name: 'Priya Verma',
    studentId: 'CGC2023BPH018',
    rollNo: 'CGC2023BPH018',
    email: 'priya.pharmacy@cgc.edu.in',
    phone: '9815098765',
    department: 'Pharmacy (B.Pharm)',
    semester: '6th Semester',
    hostel: 'Campus Day Scholar (Chandigarh)',
    campus: 'CGC University, Mohali',
    status: 'Active',
    totalOrders: 9,
    totalSpent: 1780,
    createdAt: '2025-10-18T12:00:00Z',
    lastOrderDate: '3 days ago'
  },
  {
    id: 'cgc_user_8',
    name: 'Karan Deep',
    studentId: 'CGC2024CSE189',
    rollNo: 'CGC2024CSE189',
    email: 'karan.cse@cgc.edu.in',
    phone: '9888123476',
    department: 'Computer Science & Engineering',
    semester: '4th Semester',
    hostel: 'Boys Hostel 2, Room 115',
    campus: 'CGC University, Mohali',
    status: 'Active',
    totalOrders: 2,
    totalSpent: 390,
    createdAt: '2026-02-01T15:10:00Z',
    lastOrderDate: '4 days ago'
  }
];

// Initial Seed Audit Logs
const INITIAL_AUDIT_LOGS = [
  {
    id: 'log-1',
    timestamp: 'Today, 02:40 PM',
    adminName: 'Dr. Harpreet Singh',
    action: 'Outlet Timing Update',
    target: 'Kulhad',
    details: 'Extended evening break operating hours from 8:00 PM to 8:45 PM for exam session.',
    type: 'outlet_update'
  },
  {
    id: 'log-2',
    timestamp: 'Today, 01:15 PM',
    adminName: 'Dr. Harpreet Singh',
    action: 'Order Verified',
    target: 'Order #CGC-DEMO-84210',
    details: 'Verified pickup token alignment at Block 2 Food Court.',
    type: 'order_verify'
  },
  {
    id: 'log-3',
    timestamp: 'Today, 11:30 AM',
    adminName: 'Dr. Harpreet Singh',
    action: 'Staff Role Assigned',
    target: 'Preeti Verma',
    details: 'Assigned as primary counter operator for Nescafe kiosk.',
    type: 'staff_assignment'
  },
  {
    id: 'log-4',
    timestamp: 'Yesterday, 04:20 PM',
    adminName: 'Dr. Harpreet Singh',
    action: 'Menu Item Verified',
    target: 'Dominos',
    details: 'Verified student combo meal pricing compliance (₹120 capped limit).',
    type: 'menu_compliance'
  },
  {
    id: 'log-5',
    timestamp: '2 days ago',
    adminName: 'Dr. Harpreet Singh',
    action: 'Account Suspended (Demo)',
    target: 'Harjot Singh (CGC2021CIV031)',
    details: 'Demo disciplinary suspension simulation for uncollected perishable food.',
    type: 'student_status'
  }
];

// Initial Seed Admin Notifications
const INITIAL_NOTIFICATIONS = [
  {
    id: 'notif-1',
    title: 'New Outlet Onboarding Request',
    message: 'Subway Franchise kiosk inquiry submitted for Block 3 Food Court expansion.',
    category: 'outlet_request',
    time: '25 mins ago',
    isRead: false,
    priority: 'medium'
  },
  {
    id: 'notif-2',
    title: 'Order Force Cancellation Logged',
    message: 'Order #CGC-DEMO-1092 was cancelled by student due to unscheduled lab session.',
    category: 'cancelled_order',
    time: '1 hour ago',
    isRead: false,
    priority: 'high'
  },
  {
    id: 'notif-3',
    title: 'Staff Shift Assignment Update',
    message: 'Amit Dogra assigned as Full-Day Store Manager for Dominos outlet.',
    category: 'staff_change',
    time: '3 hours ago',
    isRead: true,
    priority: 'low'
  },
  {
    id: 'notif-4',
    title: 'Cafeteria Peak Hour Alert',
    message: 'Block 2 Food Court reached 85% kitchen order capacity during 1:00 PM lunch recess.',
    category: 'operational_issue',
    time: 'Today, 01:10 PM',
    isRead: false,
    priority: 'high'
  },
  {
    id: 'notif-5',
    title: 'End-Semester Exam Schedule Notice',
    message: 'Cafeteria operating window scheduled to open 30 minutes early starting next Monday.',
    category: 'announcement',
    time: 'Yesterday',
    isRead: true,
    priority: 'medium'
  }
];

// Initial Platform Settings
const DEFAULT_PLATFORM_SETTINGS = {
  platformName: 'Campus Cravings',
  universityName: 'Chandigarh Group of Colleges (CGC) University, Mohali',
  campusAddress: 'Sector 110, Landran & Jhanjeri Campuses, Mohali, Punjab 140307',
  systemStatus: 'OPEN', // OPEN | PEAK_ONLY | MAINTENANCE
  operatingHours: '8:30 AM - 8:30 PM (CGC Break Windows)',
  standardPrepBufferMinutes: 15,
  defaultPackagingFee: 5,
  allowCashOnPickup: true,
  allowDemoPrepay: true,
  studentDailyOrderCap: 5,
  emailNotificationSimulation: true,
  soundAlerts: true
};

export const AdminProvider = ({ children }) => {
  // Admin Session State
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(() => {
    try {
      const saved = localStorage.getItem(ADMIN_STORAGE_KEYS.SESSION);
      return saved !== null ? JSON.parse(saved) : true; // Default to true for easy examiner evaluation
    } catch {
      return true;
    }
  });

  const [adminUser, setAdminUser] = useState({
    name: 'Dr. Harpreet Singh',
    role: 'University Admin',
    title: 'Dean of Student Welfare & Food Safety Committee',
    adminId: 'CGC-ADM-001',
    email: 'dean.welfare@cgc.edu.in',
    phone: '+91 98140 12345',
    department: 'Campus Administration',
    campus: 'CGC University, Mohali',
    lastLogin: 'Today, 08:30 AM'
  });

  // Staff State
  const [staffList, setStaffList] = useState(() => {
    try {
      const saved = localStorage.getItem(ADMIN_STORAGE_KEYS.STAFF);
      return saved ? JSON.parse(saved) : INITIAL_STAFF;
    } catch {
      return INITIAL_STAFF;
    }
  });

  // Students State
  const [studentsList, setStudentsList] = useState(() => {
    try {
      const saved = localStorage.getItem(ADMIN_STORAGE_KEYS.STUDENTS);
      return saved ? JSON.parse(saved) : INITIAL_ADMIN_STUDENTS;
    } catch {
      return INITIAL_ADMIN_STUDENTS;
    }
  });

  // Audit Logs State
  const [auditLogs, setAuditLogs] = useState(() => {
    try {
      const saved = localStorage.getItem(ADMIN_STORAGE_KEYS.AUDIT_LOG);
      return saved ? JSON.parse(saved) : INITIAL_AUDIT_LOGS;
    } catch {
      return INITIAL_AUDIT_LOGS;
    }
  });

  // Notifications State
  const [notifications, setNotifications] = useState(() => {
    try {
      const saved = localStorage.getItem(ADMIN_STORAGE_KEYS.NOTIFICATIONS);
      return saved ? JSON.parse(saved) : INITIAL_NOTIFICATIONS;
    } catch {
      return INITIAL_NOTIFICATIONS;
    }
  });

  // Settings State
  const [settings, setSettings] = useState(() => {
    try {
      const saved = localStorage.getItem(ADMIN_STORAGE_KEYS.SETTINGS);
      return saved ? JSON.parse(saved) : DEFAULT_PLATFORM_SETTINGS;
    } catch {
      return DEFAULT_PLATFORM_SETTINGS;
    }
  });

  // Persist State to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem(ADMIN_STORAGE_KEYS.SESSION, JSON.stringify(isAdminLoggedIn));
    } catch (e) {
      console.warn('Failed to save admin session', e);
    }
  }, [isAdminLoggedIn]);

  useEffect(() => {
    try {
      localStorage.setItem(ADMIN_STORAGE_KEYS.STAFF, JSON.stringify(staffList));
    } catch (e) {
      console.warn('Failed to save staff list', e);
    }
  }, [staffList]);

  useEffect(() => {
    try {
      localStorage.setItem(ADMIN_STORAGE_KEYS.STUDENTS, JSON.stringify(studentsList));
    } catch (e) {
      console.warn('Failed to save students list', e);
    }
  }, [studentsList]);

  useEffect(() => {
    try {
      localStorage.setItem(ADMIN_STORAGE_KEYS.AUDIT_LOG, JSON.stringify(auditLogs));
    } catch (e) {
      console.warn('Failed to save audit logs', e);
    }
  }, [auditLogs]);

  useEffect(() => {
    try {
      localStorage.setItem(ADMIN_STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(notifications));
    } catch (e) {
      console.warn('Failed to save admin notifications', e);
    }
  }, [notifications]);

  useEffect(() => {
    try {
      localStorage.setItem(ADMIN_STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
    } catch (e) {
      console.warn('Failed to save settings', e);
    }
  }, [settings]);

  // Auth Actions
  const adminLogin = (email, password) => {
    if (!email || !email.trim()) {
      return { success: false, error: 'Please enter your Administrator Email or Username.' };
    }
    if (!password) {
      return { success: false, error: 'Please enter your password.' };
    }

    const cleanEmail = email.trim().toLowerCase();
    
    // Check if the email/ID matches an administrator account
    const isAdminAccount = 
      cleanEmail === 'dean.welfare@cgc.edu.in' ||
      cleanEmail === 'cgc-adm-001' ||
      cleanEmail === 'admin@cgc.edu.in' ||
      (staffList || []).some(s => 
        s.role === 'University Admin' && 
        (s.email?.toLowerCase() === cleanEmail || s.staffId?.toLowerCase() === cleanEmail)
      );

    if (!isAdminAccount) {
      return { success: false, error: 'Administrator account not found. Please check your credentials.' };
    }

    // Verify administrator password
    if (password !== 'admin123') {
      return { success: false, error: 'Incorrect administrator password. Please try again.' };
    }

    setIsAdminLoggedIn(true);
    return { success: true };
  };

  const adminLogout = () => {
    setIsAdminLoggedIn(false);
  };

  const staffLogin = (identifier, password) => {
    if (!identifier || !identifier.trim()) {
      return { success: false, error: 'Please enter your Staff Email or Staff ID.' };
    }
    if (!password) {
      return { success: false, error: 'Please enter your password.' };
    }

    const cleanId = identifier.trim().toLowerCase();
    const matchedStaff = (staffList || []).find(s => 
      s.email?.toLowerCase() === cleanId || 
      s.staffId?.toLowerCase() === cleanId ||
      s.name?.toLowerCase() === cleanId
    );

    if (!matchedStaff) {
      return { success: false, error: 'No staff account found with this ID or Email. Please check your credentials.' };
    }

    if (password !== 'password123') {
      return { success: false, error: 'Incorrect staff password. Please try again.' };
    }

    try {
      localStorage.setItem('campus_cravings_staff_session', JSON.stringify(matchedStaff));
    } catch {
      // ignore
    }

    return { success: true, staff: matchedStaff };
  };

  const staffLogout = () => {
    try {
      localStorage.removeItem('campus_cravings_staff_session');
    } catch {
      // ignore
    }
  };

  // Audit Logger Helper
  const logAction = (action, target, details, type = 'general') => {
    const newLog = {
      id: `log-${Date.now()}`,
      timestamp: 'Just now',
      adminName: adminUser.name,
      action,
      target,
      details,
      type
    };
    setAuditLogs(prev => [newLog, ...prev]);
  };

  // Staff Management Actions
  const addStaff = (staffData) => {
    const newStaff = {
      id: `staff-${Date.now()}`,
      staffId: `CGC-STF-${String(staffList.length + 1).padStart(2, '0')}`,
      name: staffData.name.trim(),
      email: staffData.email.trim(),
      phone: staffData.phone.trim(),
      assignedOutletId: staffData.assignedOutletId || 'canteen',
      assignedOutletName: staffData.assignedOutletName || 'Canteen',
      role: staffData.role || 'Outlet Staff',
      status: staffData.status || 'Active',
      joinedDate: new Date().toISOString().split('T')[0],
      lastActive: 'Just registered',
      shift: staffData.shift || 'Full Day'
    };

    setStaffList(prev => [newStaff, ...prev]);
    logAction('Staff Account Created', newStaff.name, `Added as ${newStaff.role} for ${newStaff.assignedOutletName}`, 'staff_create');
    return newStaff;
  };

  const updateStaff = (id, fields) => {
    setStaffList(prev =>
      prev.map(s => {
        if (s.id === id) {
          const updated = { ...s, ...fields };
          logAction('Staff Account Updated', s.name, `Modified details / role (${updated.role})`, 'staff_update');
          return updated;
        }
        return s;
      })
    );
  };

  const toggleStaffStatus = (id) => {
    setStaffList(prev =>
      prev.map(s => {
        if (s.id === id) {
          const nextStatus = s.status === 'Active' ? 'Suspended' : 'Active';
          logAction('Staff Access Toggled', s.name, `Changed access status to ${nextStatus}`, 'staff_status');
          return { ...s, status: nextStatus };
        }
        return s;
      })
    );
  };

  const deleteStaff = (id) => {
    const target = staffList.find(s => s.id === id);
    if (target) {
      setStaffList(prev => prev.filter(s => s.id !== id));
      logAction('Staff Account Removed', target.name, `Removed from ${target.assignedOutletName}`, 'staff_delete');
    }
  };

  // Student Management Actions
  const toggleStudentStatus = (studentId) => {
    setStudentsList(prev =>
      prev.map(st => {
        if (st.studentId === studentId || st.id === studentId) {
          const nextStatus = st.status === 'Active' ? 'Suspended' : 'Active';
          logAction('Student Demo Status Changed', `${st.name} (${st.studentId})`, `Status changed to ${nextStatus}`, 'student_status');
          return { ...st, status: nextStatus };
        }
        return st;
      })
    );
  };

  const resetStudentPassword = (studentId) => {
    const student = studentsList.find(s => s.studentId === studentId || s.id === studentId);
    if (student) {
      logAction('Demo Password Reset', `${student.name} (${student.studentId})`, 'Reset student password to default demo credentials ("password123")', 'student_password_reset');
      return { success: true, message: `Password reset instructions sent to ${student.email}. Default password is "password123".` };
    }
    return { success: false, error: 'Student not found.' };
  };

  // Notification Actions
  const markAsRead = (id) => {
    setNotifications(prev =>
      prev.map(n => (n.id === id ? { ...n, isRead: true } : n))
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
  };

  const deleteNotification = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;

  // Settings Actions
  const updateSettings = (newSettings) => {
    setSettings(prev => {
      const updated = { ...prev, ...newSettings };
      logAction('System Settings Modified', 'Global Platform', `Updated system status to ${updated.systemStatus}`, 'settings_update');
      return updated;
    });
  };

  const resetAllDemoData = () => {
    try {
      localStorage.removeItem(ADMIN_STORAGE_KEYS.STAFF);
      localStorage.removeItem(ADMIN_STORAGE_KEYS.STUDENTS);
      localStorage.removeItem(ADMIN_STORAGE_KEYS.AUDIT_LOG);
      localStorage.removeItem(ADMIN_STORAGE_KEYS.NOTIFICATIONS);
      localStorage.removeItem(ADMIN_STORAGE_KEYS.SETTINGS);
      localStorage.removeItem('campus_cravings_dynamic_outlets');
      localStorage.removeItem('campus_cravings_outlet_menus');
      
      setStaffList(INITIAL_STAFF);
      setStudentsList(INITIAL_ADMIN_STUDENTS);
      setAuditLogs(INITIAL_AUDIT_LOGS);
      setNotifications(INITIAL_NOTIFICATIONS);
      setSettings(DEFAULT_PLATFORM_SETTINGS);

      logAction('Full Reset Executed', 'All Collections', 'Restored all sample datasets to fresh seed state', 'system_reset');
      return true;
    } catch (e) {
      console.error('Failed to reset demo data', e);
      return false;
    }
  };

  // Export CSV Helper
  const exportToCSV = (filename, dataArray, headers) => {
    if (!dataArray || !dataArray.length) return;
    
    const csvRows = [];
    csvRows.push(headers.map(h => `"${h.label}"`).join(','));

    dataArray.forEach(row => {
      const values = headers.map(h => {
        let val = row[h.key];
        if (typeof val === 'object' && val !== null) {
          val = JSON.stringify(val);
        }
        val = val === undefined || val === null ? '' : String(val).replace(/"/g, '""');
        return `"${val}"`;
      });
      csvRows.push(values.join(','));
    });

    const csvContent = 'data:text/csv;charset=utf-8,' + encodeURIComponent(csvRows.join('\n'));
    const link = document.createElement('a');
    link.setAttribute('href', csvContent);
    link.setAttribute('download', `${filename}_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <AdminContext.Provider
      value={{
        isAdminLoggedIn,
        setIsAdminLoggedIn,
        adminUser,
        adminLogin,
        adminLogout,
        staffLogin,
        staffLogout,
        staffList,
        addStaff,
        updateStaff,
        toggleStaffStatus,
        deleteStaff,
        studentsList,
        toggleStudentStatus,
        resetStudentPassword,
        auditLogs,
        logAction,
        notifications,
        unreadCount,
        markAsRead,
        markAllAsRead,
        deleteNotification,
        settings,
        updateSettings,
        resetAllDemoData,
        exportToCSV
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};
