import axios, { AxiosResponse } from "axios";
import { getAccessToken } from "./TokenHelper";

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000, // 10 seconds
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(async (config) => {
  const excludedPaths = ["/sessions/find", "/sessions/join", "/sessions/users"];
  const shouldExclude = excludedPaths.some((path) =>
    config.url?.startsWith(path),
  );
  if (!shouldExclude) {
    const token = await getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }

  return config;
});

api.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error) => {
    return Promise.reject(error);
  },
);
