import { User } from "../context/AuthContext";

type AuthState = {
  isAuthenticated: boolean;
  user: null | Omit<User, "password">;
};

enum AuthActions {
  LOGIN = "LOGIN",
  LOGOUT = "LOGOUT",
}

export type AuthAction =
  | { type: AuthActions.LOGIN; payload: Omit<User, "password"> }
  | { type: AuthActions.LOGOUT };

const initialAuthState = (): AuthState => {
  const user = sessionStorage.getItem("user");
  return user
    ? { isAuthenticated: true, user: JSON.parse(user) }
    : { isAuthenticated: false, user: null };
};

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case AuthActions.LOGIN:
      sessionStorage.setItem("user", JSON.stringify(action.payload));
      return { ...state, isAuthenticated: true, user: action.payload };

    case AuthActions.LOGOUT:
      sessionStorage.removeItem("user");
      return { isAuthenticated: false, user: null };

    default:
      return state;
  }
};

export { authReducer, initialAuthState, AuthActions };
