import { Navigate } from "react-router-dom";
import { useAuth } from "../state/context/AuthContext";
import React, { ReactNode } from "react";

interface ProtectedRoutesProps {
  children: ReactNode;
}

export const ProtectedRoutes: React.FC<ProtectedRoutesProps> = ({
  children,
}) => {
  const { state } = useAuth();
  console.log("state", state);

  if (!state.isAuthenticated) return <Navigate to="/login" />;
  return <>{children}</>;
};
