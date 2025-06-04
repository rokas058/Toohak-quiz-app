import { QuestionResponse } from "./questionResponse";

export interface QuizResponse {
  id: string;
  title: string;
  description: string;
  imageId: string;
  createdBy: string;
  questions: QuestionResponse[];
}
