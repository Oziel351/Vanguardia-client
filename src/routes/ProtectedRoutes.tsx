import { Navigate } from "react-router-dom";
import { LoginPage } from "../pages/Login";
import { useAuth } from "../state/context/AuthContext";

export const ProtectedRoutes = () => {
  const { state } = useAuth();

  return state.isAuthenticated ? <Navigate to="/dashboard" /> : <LoginPage />;
};
