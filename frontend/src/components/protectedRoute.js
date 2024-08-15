import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "./authcontext";

const ProtectedRoute = ({ allowedRoles }) => {
  const { user, role } = useAuth();

  const isAuthenticated = !!user;

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (allowedRoles && !allowedRoles.includes(role)) {
    return <Navigate to="/" />;
  }

  return <Outlet />;

};

export default ProtectedRoute;
