import React, {
  useContext,
  useEffect,
  useState,
  useMemo,
} from "react";
import * as userService from "./../services/GitHubUserService";

const UserContext = React.createContext({});

function UserProvider({
  children,
}) {
  const [user, setUser] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    userService.fetchUser()
      .then((_user) => {
        setUser(_user)
        setError(null)
      })
      .catch((_error) => setError(_error))
      .finally(() => setLoading(false));
  }, []);
  const memoedValue = useMemo(
    () => ({
      user,
      loading,
      error,
    }),
    [user, loading, error]
  );

  return (
    <UserContext.Provider value={memoedValue}>
      {error && <span>Error: {error}</span>}
      {loading && <h1>Fetching...</h1>}
      {!loading && children}
    </UserContext.Provider>
  );
}

function useUser() {
  return useContext(UserContext);
}

export default {
  useUser,
  UserProvider,
  UserContext
};
