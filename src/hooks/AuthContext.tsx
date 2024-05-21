import CookieHandler, { TOKEN } from "@/helpers/cookie";
import LocalStorageHandler, { USER } from "@/helpers/localStorage";
import { Dispatch, SetStateAction, useEffect, useState, createContext, useContext } from "react";

// Define User type based on your application's requirements

interface AuthContextType {
  isLoggedIn: boolean;
  user: User | null;
  setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
  setUser: Dispatch<SetStateAction<User | null>>;
}

const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  user: null,
  setIsLoggedIn: () => {},
  setUser: () => {},
});

export const useAuthContext = () => useContext(AuthContext);

interface AuthContextProviderInterface {
  children: React.ReactNode;
}

export const AuthContextProvider = ({ children }: AuthContextProviderInterface) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const checkLoginStatus = () => {
      const token = CookieHandler.get(TOKEN);
      setIsLoggedIn(!!token);
    };

    checkLoginStatus();

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
        setIsLoggedIn,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
