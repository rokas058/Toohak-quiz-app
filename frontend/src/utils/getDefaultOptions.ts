import { QuestionOption } from "@models/Request/NewQuestionRequest";

export const getDefaultOptions = (): QuestionOption[] => {
  return Array.from({ length: 4 }, (_, index) => ({
    ordering: index + 1,
    title: "",
    isCorrect: index === 0,
  }));
};
