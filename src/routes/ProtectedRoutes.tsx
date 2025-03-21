import { Navigate } from "react-router-dom";
import { useAuth } from "../state/context/AuthContext";
import React, { ReactNode } from "react";

interface ProtectedRoutesProps {
  children: ReactNode;
}

const ProtectedRoutes: React.FC<ProtectedRoutesProps> = ({ children }) => {
  const { state } = useAuth();

  if (!state.isAuthenticated) {
    return <Navigate to="/login" />;
  }
  return <>{children}</>;
};

export default ProtectedRoutes;
