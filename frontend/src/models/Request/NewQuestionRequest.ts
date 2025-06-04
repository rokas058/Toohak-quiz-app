export interface QuestionOption {
  id?: string;
  title: string;
  isCorrect: boolean;
  ordering: number;
}

export interface Question {
  id?: string;
  quizId?: string;
  title: string;
  imageId: string | undefined | null;
  questionOptions: QuestionOption[];
}
