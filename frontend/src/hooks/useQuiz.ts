import { fetchQuizById } from "@api/QuizApi";
import { QuizResponse } from "@models/Response/quizResponse";
import { useQuery } from "@tanstack/react-query";

export const useQuiz = (id: string | undefined) => {
  return useQuery<QuizResponse>({
    queryKey: ["quiz", id],
    queryFn: () => fetchQuizById(id!),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
};
