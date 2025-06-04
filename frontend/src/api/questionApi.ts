import { Question } from "@models/Request/NewQuestionRequest";
import { api } from "./Api";
import { QuestionResponse } from "@models/Response/questionResponse";

export const deleteQuestionById = async (
  quizId: string,
  id: string,
): Promise<void> => {
  await api.delete(`/quizzes/${quizId}/questions/${id}`);
};

export const createQuestion = async ({
  quizId,
  data,
}: {
  quizId: string;
  data: Question;
}): Promise<QuestionResponse> => {
  const response = await api.post(`/quizzes/${quizId}/questions`, data);
  return response.data;
};

export const updateQuestionById = async ({
  quizId,
  id,
  data,
}: {
  quizId: string;
  id: string;
  data: Question;
}): Promise<QuestionResponse> => {
  const response = await api.put(`/quizzes/${quizId}/questions/${id}`, data);
  return response.data;
};
