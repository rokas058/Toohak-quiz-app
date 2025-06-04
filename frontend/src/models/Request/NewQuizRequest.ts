import { Question } from "./NewQuestionRequest";

export interface NewQuizRequest {
  title: string;
  description: string;
  imageId: string | undefined | null;
  questions: Question[];
}
