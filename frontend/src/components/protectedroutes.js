import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './context/authcontext';

const ProtectedRoute = () => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
