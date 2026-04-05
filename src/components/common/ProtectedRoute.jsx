import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

/**
 * Wraps a route so only authenticated users can access it.
 * Optionally pass `requiredRole` ('admin' | 'user') to restrict further.
 */
export default function ProtectedRoute({ children, requiredRole }) {
  const { currentUser } = useAuth();

  if (!currentUser) {
    return <Navigate to="/" replace />;
  }

  if (requiredRole && currentUser.role !== requiredRole) {
    // Redirect to the correct dashboard if wrong role
    return <Navigate to={currentUser.role === 'admin' ? '/admin-dashboard' : '/user-dashboard'} replace />;
  }

  return children;
}
