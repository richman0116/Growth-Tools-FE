export const REFRESH_TOKEN = "REFRESH_TOKEN";
export const USER = "USER";

interface LocalStorageHandler {
  get: (key: string) => string | null;
  set: (key: string, value: any) => void;
  remove: (key: string) => void;
  clear: () => void;
}

const LocalStorageHandler: LocalStorageHandler = {
  get: (key: string) => localStorage.getItem(key),
  set: (key: string, value: string) => localStorage.setItem(key, value),
  remove: (key: string) => localStorage.removeItem(key),
  clear: () => localStorage.clear(),
};

export default LocalStorageHandler;
