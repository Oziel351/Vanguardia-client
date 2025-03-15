import { Navigate } from "react-router-dom";
import { LoginPage } from "../pages/Login";
import { useAuth } from "../context/AuthContext";

export const PublicRoutes = () => {
  const { isAuth } = useAuth();

  return isAuth ? <Navigate to="/dashboard" /> : <LoginPage />;
};
