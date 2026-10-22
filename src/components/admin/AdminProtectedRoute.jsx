import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAdmin } from '../../context/AdminContext';

export default function AdminProtectedRoute({ children }) {
  const { isAdminLoggedIn } = useAdmin();
  const location = useLocation();

  if (!isAdminLoggedIn) {
    return <Navigate to="/login" state={{ from: location, role: 'admin' }} replace />;
  }

  return children;
}
