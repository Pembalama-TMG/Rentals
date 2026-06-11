import React from 'react';
import { Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth.js';

export default function ProtectedRoute({ children, requiredRole = null }) {
  const { isAuthenticated, isAdmin } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (requiredRole === 'admin' && !isAdmin) {
    return <Navigate to="/" />;
  }

  if (requiredRole === 'customer' && isAdmin) {
    return <Navigate to="/admin/dashboard" />;
  }

  return children;
}
