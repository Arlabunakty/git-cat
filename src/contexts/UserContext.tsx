import React, {
  useContext,
  useEffect,
  useState,
  ReactNode,
  useMemo,
} from "react";
import { useLocation } from "react-router-dom";
import * as userService from "../services/GitHubUserService";

interface IUserContext {
  user?: any;
  loading: boolean;
  error?: any;
}

const UserContext = React.createContext<IUserContext>({} as IUserContext);

export function UserProvider({
  children,
}: {
  children: ReactNode;
}): JSX.Element {
  const [user, setUser] = useState<any>();
  const [error, setError] = useState<any>();
  const [loading, setLoading] = useState<boolean>(true);

  const location = useLocation();

  useEffect(() => {
    if (error) setError(null);
  }, [location.pathname]);

  useEffect(() => {
    userService
      .fetchUser()
      .then((_user) => setUser(_user))
      .catch((_error) => setError(_error))
      .finally(() => setLoading(false));
  }, []);
  const memoedValue = useMemo<IUserContext>(
    () => ({
      user,
      loading,
      error,
    }),
    [user, loading, error]
  );

  return (
    <UserContext.Provider value={memoedValue}>
      {!loading && children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}

export default useUser;
