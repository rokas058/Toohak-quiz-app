import { QuizSessionStatus } from "@models/QuizSessionState";

export interface QuizSessionResponse {
  joinId: string;
  status: QuizSessionStatus;
  createdAt: Date;
  quizSessionId: string;
  createdBy: string;
  quizId: string;
}
