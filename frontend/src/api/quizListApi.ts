import { QuizCardResponse } from "@models/Response/quizCardResponse";
import { api } from "./Api";
import { AxiosError } from "axios";

export async function fetchQuizList(): Promise<QuizCardResponse[]> {
  try {
    const response = await api.get<QuizCardResponse[]>("/quizzes");
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    const errorMessage = axiosError.message || "Could find any quizzes";
    throw new Error(errorMessage);
  }
}
