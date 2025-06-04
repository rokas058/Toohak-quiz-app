export interface QuizSessionProgress {
  sessionId: string;
  currentQuestionId: string;
  currentQuestionStartedAt: string;
  durationSeconds: number;
}
