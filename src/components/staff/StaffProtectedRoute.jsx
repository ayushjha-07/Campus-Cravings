import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

export default function StaffProtectedRoute({ children }) {
  const isStaffLoggedIn = typeof window !== 'undefined' && Boolean(localStorage.getItem('campus_cravings_staff_session'));
  const location = useLocation();

  if (!isStaffLoggedIn) {
    return <Navigate to="/login" state={{ from: location, role: 'staff' }} replace />;
  }

  return children;
}
