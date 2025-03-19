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

const initialAuthState: AuthState = {
  isAuthenticated: false,
  user: null,
};

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
      };
    case "LOGOUT":
      return { ...state, isAuthenticated: false, user: null };

    default:
      return state;
  }
};

export { authReducer, initialAuthState, AuthActions };
