import Cookies from "universal-cookie";

export const TOKEN = "TOKEN";

const cookies = new Cookies();

const cookieOptions = { path: "/" };

interface CookieHandler {
  get: (key: string) => string | undefined;
  set: (key: string, value: string) => void;
  remove: (key: string) => void;
}

const CookieHandler: CookieHandler = {
  get: (key: string) => cookies.get(key),
  set: (key: string, value: string) => cookies.set(key, value, cookieOptions),
  remove: (key: string) => cookies.remove(key, cookieOptions),
};

export default CookieHandler;
