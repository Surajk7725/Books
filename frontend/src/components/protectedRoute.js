import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "./authcontext";

const ProtectedRoute = ({ allowedRoles }) => {
  const { user, role, isFetched } = useAuth();

  // Only proceed once the user data has been fetched
  if (!isFetched) {
    return <div></div>; 
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (allowedRoles && !allowedRoles.includes(role)) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};

export default ProtectedRoute;

