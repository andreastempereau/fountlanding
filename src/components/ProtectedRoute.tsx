import React from 'react';
import { Navigate } from 'react-router-dom';
import { isAuthenticated } from '../utils/tokenStorage';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

/**
 * ProtectedRoute Component
 * Redirects to auth page if user is not authenticated
 */
export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  if (!isAuthenticated()) {
    // Redirect to auth page if not authenticated
    return <Navigate to="/auth" replace />;
  }

  return <>{children}</>;
}


