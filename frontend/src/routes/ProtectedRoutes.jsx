import { Navigate } from "react-router-dom";
import { useUserStore } from "../store/useUserStore";

/* ============================
   LOGIN REQUIRED
============================ */
export const PrivateRoute = ({ children }) => {
  const token = useUserStore((state) => state.token);

  if (!token) {
    return <Navigate to="/auth" replace />;
  }

  return children;
};

/* ============================
   ADMIN ONLY
============================ */
export const AdminRoute = ({ children }) => {
  const { token, user } = useUserStore();

  if (!token) {
    return <Navigate to="/auth" replace />;
  }

  if (user?.role !== "ADMIN") {
    return <Navigate to="/" replace />;
  }

  return children;
};