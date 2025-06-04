import axios from "axios";
import { Cookies } from "react-cookie";

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const apiPlayer = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

apiPlayer.interceptors.request.use((config) => {
  const cookies = new Cookies();
  const quizSessionJwt = cookies.get("QuizSessionJwt");
  if (quizSessionJwt) {
    config.headers.Authorization = `Bearer ${quizSessionJwt}`;
  }
  return config;
});
