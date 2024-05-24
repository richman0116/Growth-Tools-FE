'use client'

import CookieHandler, { TOKEN } from "@/helpers/cookie";
import LocalStorageHandler, { ADMIN, USER } from "@/helpers/localStorage";
import { Dispatch, SetStateAction, useEffect, useState, createContext, useContext } from "react";

// Define User type based on your application's requirements

interface AuthContextType {
  isLoggedIn: boolean;
  user: User | null;
  isAdmin: boolean;
  setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
  setUser: Dispatch<SetStateAction<User | null>>;
  setIsAdmin: Dispatch<SetStateAction<boolean>>;
}

const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  user: null,
  isAdmin: false,
  setIsLoggedIn: () => { },
  setUser: () => { },
  setIsAdmin: () => { },
});

export const useAuthContext = () => useContext(AuthContext);

interface AuthContextProviderInterface {
  children: React.ReactNode;
}

export const AuthContextProvider = ({ children }: AuthContextProviderInterface) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  useEffect(() => {
    const checkLoginStatus = () => {
      const token = CookieHandler.get(TOKEN);
      setIsLoggedIn(!!token);
    };

    const checkAdminStatus = () => {
      const adminStatus = LocalStorageHandler.get(ADMIN);
        setIsAdmin(!!adminStatus)
    }

    checkLoginStatus();
    checkAdminStatus();

    const getUserLocalStorage = () => {
      const user = LocalStorageHandler.get(USER);
      if (user) {
        setUser(user as unknown as User);
      }
    };

    getUserLocalStorage();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        user,
        isAdmin,
        setIsLoggedIn,
        setUser,
        setIsAdmin
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
