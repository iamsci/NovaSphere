import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import useAuth from '@/hooks/useAuth';

/**
 * Guards child routes or a single element behind an authentication check.
 *
 * Usage with nested routes:
 * <Route element={<PrivateRoute />}>
 *   <Route path="dashboard" element={<Dashboard />} />
 * </Route>
 *
 * Usage wrapping a component:
 * <PrivateRoute>
 *   <Dashboard />
 * </PrivateRoute>
 */
export default function PrivateRoute({ redirectTo = '/login', children }) {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to={redirectTo} replace />;
  }

  // Render either the single child or the nested <Outlet>
  return children ?? <Outlet />;
}
