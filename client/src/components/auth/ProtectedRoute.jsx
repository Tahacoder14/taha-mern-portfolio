// client/src/components/auth/ProtectedRoute.jsx

import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const ProtectedRoute = () => {
  const { userInfo } = useAuth();

  // Check if the user is logged in AND is an admin (role: 0)
  if (userInfo && userInfo.role === 0) {
    // If they are an admin, render the child routes (e.g., the admin pages)
    return <Outlet />;
  } else {
    // If not an admin, redirect them to the login page
    return <Navigate to="/login" replace />;
  }
};

export default ProtectedRoute;