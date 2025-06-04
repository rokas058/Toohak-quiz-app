export interface QuestionResponse {
  id: string;
  quizId: string;
  imageId: string;
  title: string;
  questionOptions: QuestionOptionResponse[];
}

export interface QuestionOptionResponse {
  id: string;
  questionId: string;
  title: string;
  ordering: number;
  isCorrect: boolean;
}
