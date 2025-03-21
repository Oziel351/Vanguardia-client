import React, { createContext, ReactNode, useContext, useReducer } from "react";
import { Roles } from "../../utils/common.types";
import {
  AuthAction,
  authReducer,
  initialAuthState,
} from "../reducers/auth.reducer";

export interface User {
  email: string;
  password: string;
  role: Roles;
}

interface IAuthContext {
  isAuthenticated: boolean;
  user: Omit<User, "password"> | null;
}

//The context have the types or by default is null because the user didn't trigger an action
const AuthContext = createContext<
  { state: IAuthContext; dispatch: React.Dispatch<AuthAction> } | undefined
>(undefined);

//The context provider is a component that will wrap the entire application
const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialAuthState());
  console.log("state", state);
  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

//This will bounce an error if the user want to access by route without being authenticated
const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export { AuthContext, AuthProvider, useAuth };
