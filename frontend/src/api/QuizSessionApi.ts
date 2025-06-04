import { NewQuizSessionRequest } from "@models/Request/NewQuizSessionRequest";
import { api } from "./Api";
import { NewQuizSessionResponse } from "@models/Response/NewQuizSessionResponse";
import { QuizSessionResponse } from "@models/Response/QuizSessionResponse";
import { JoinQuizSessionRequest } from "@models/Request/JoinQuizSessionRequest";
import { JoinQuizSessionResponse } from "@models/Response/JoinQuizSessionResponse";
import { StartQuizSessionRequest } from "@models/Request/StartQuizSessionRequest";
import { Cookies } from "react-cookie";
import { apiPlayer } from "./ApiPlayer";
import { QuizSessionProgress } from "@models/Response/QuizSessionProgress";

export async function createQuizSession(
  request: NewQuizSessionRequest,
): Promise<NewQuizSessionResponse> {
  const response = await api.post<NewQuizSessionResponse>(
    "/sessions/create",
    request,
  );
  return response.data;
}

export async function findQuizSession(
  joinId: string,
): Promise<QuizSessionResponse> {
  const response = await api.get<QuizSessionResponse>(
    "/sessions/find/" + joinId,
  );

  return response.data;
}

export async function joinQuizSession(
  request: JoinQuizSessionRequest,
): Promise<JoinQuizSessionResponse> {
  const response = await api.post<JoinQuizSessionResponse>(
    "/sessions/join",
    request,
  );
  return response.data;
}

export async function startQuizSession(
  sessionId: string,
  data: StartQuizSessionRequest,
): Promise<number> {
  const response = await api.post(`/sessions/${sessionId}/start`, data);
  return response.status;
}

export async function fetchConnectedUsers(): Promise<string[]> {
  const cookies = new Cookies();
  const token = cookies.get("QuizSessionJwt");
  const response = await api.get<string[]>("/sessions/users", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}

export async function answerQuestionOption(
  questionOptionId: string,
): Promise<void> {
  const response = await apiPlayer.post(`/sessions/answer/${questionOptionId}`);
  return response.data;
}

export async function nextQuestion(
  sessionId: string,
): Promise<{ data: QuizSessionProgress; status: number }> {
  const response = await api.post(`/sessions/${sessionId}/nextQuestion`);
  return {
    data: response.data,
    status: response.status,
  };
}

export async function getSessionCode(): Promise<string> {
  const response = await apiPlayer.get(`/sessions/code`);
  return response.data;
}
