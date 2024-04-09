import CookieHandler, { TOKEN } from "@/helpers/cookie";
import LocalStorageHandler, { USER } from "@/helpers/localStorage";
import { useEffect, useState } from "react";

type UseAuthResponse = {
  isLoggedIn: boolean;
  user: User | null;
};

const useAuth = (): UseAuthResponse => {
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
      !!user && setUser(user as unknown as User);
    };

    getUserLocalStorage();
  }, []);

  return {
    isLoggedIn,
    user,
  };
};

export default useAuth;
