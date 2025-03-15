import { createContext, useContext, useState } from "react";

interface AuthContextType {
  isAuth: boolean;
  setAuthenticated: (isAuth: boolean) => void;
}

const initialState = {
  isAuth: false,
  setAuthenticated: () => {},
};

//The context have the types or by default is null because the user didn't trigger an action
const AuthContext = createContext<AuthContextType>(initialState);

//The context provider is a component that will wrap the entire application
const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuth, setAuthenticated] = useState(false);

  return (
    <AuthContext.Provider value={{ isAuth, setAuthenticated }}>
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
