import { useEffect } from "react";
import { useApiRequest } from "../../hooks/useApiRequest";
import { useAuth, User } from "../context/AuthContext";
import { AuthActions } from "../reducers/auth.reducer";

interface IAuthCredentials {
  email: string;
  password: string;
}

const useAuthActions = () => {
  const { data, isLoading, error, fetchData } = useApiRequest<User>();

  const { dispatch } = useAuth();
  useEffect(() => {
    if (data) {
      dispatch({ type: AuthActions.LOGIN, payload: data });
    }
  }, [data]);

  const login = async (credentials: IAuthCredentials) => {
    await fetchData("/auth/login", "POST", credentials);
  };

  const logout = () => {
    dispatch({ type: AuthActions.LOGOUT });
  };
  return { login, logout, isLoading, error };
};

export { useAuthActions };
