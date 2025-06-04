export interface QuizCardResponse {
  id: string;
  title: string;
  description: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  coverImageId?: string;
  questionAmount: number;
}
