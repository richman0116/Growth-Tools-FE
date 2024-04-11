import CookieHandler, { TOKEN } from "@/helpers/cookie";
import LocalStorageHandler, { REFRESH_TOKEN } from "@/helpers/localStorage";
import axios, { AxiosInstance } from "axios";
import { refreshToken } from "./auth";

const baseURL = process.env.NEXT_PUBLIC_API_URL;

const axiosClient: AxiosInstance = axios.create({
  baseURL,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

axiosClient.interceptors.request.use((config) => {
  config.headers["Authorization"] = `Bearer ${CookieHandler.get(TOKEN)}`;
  return config;
});

axiosClient.interceptors.response.use(
  (response) => response?.data,
  (error) => {
    const refreshTokenStorage = LocalStorageHandler.get(REFRESH_TOKEN);
    const { response } = error;

    // Expired token
    if (response && response.status === 401) {
      if (refreshTokenStorage) {
        refreshToken(refreshTokenStorage)
          .then((data) => {
            CookieHandler.set(TOKEN, data?.refreshToken);
          })
          .catch(() => {
            console.error("Unauthenticated - 401 on client");
            CookieHandler.remove(TOKEN);
            window.location.reload();
          });
      } else {
        console.error("Unauthenticated - 401 on client");
        CookieHandler.remove(TOKEN);
        window.location.reload();
      }
    }

    throw error;
  }
);

export default axiosClient;
