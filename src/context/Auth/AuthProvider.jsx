import { useCallback, useState } from "react";

import secureLocalStorage from "react-secure-storage";

import { useIdleLogout } from "../../hooks/useIdleLogout";
import AuthContext from "./context";

export const AUTH_LOCAL_STORAGE_KEY = "auth";

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(
    () => secureLocalStorage.getItem(AUTH_LOCAL_STORAGE_KEY) || null,
  );

  useIdleLogout(!!user, signOut);

  function signOut() {
    setUser(null);
    secureLocalStorage.removeItem(AUTH_LOCAL_STORAGE_KEY);
  }

  const signIn = useCallback((data) => {
    const userData = {
      ...data,
      image: `https://eu.ui-avatars.com/api/?name=${data.id}&size=250`,
    };
    setUser(userData);
    secureLocalStorage.setItem(AUTH_LOCAL_STORAGE_KEY, userData);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        signOut,
        user,
        signIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
