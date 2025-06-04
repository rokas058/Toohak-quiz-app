import { deleteQuestionById } from "@api/questionApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { showToast } from "@ui/Toast.tsx";
import { useTranslation } from "react-i18next";

export const useDeleteQuestion = (quizId: string) => {
  const queryClient = useQueryClient();
  const { showError, showSuccess } = showToast();
  const { t } = useTranslation();

  return useMutation({
    mutationFn: (questionId: string) => deleteQuestionById(quizId, questionId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["quiz", quizId] });
      showSuccess(t("Success.Question.deleted"));
    },
    onError: (error: Error, questionId) => {
      console.error(`Failed to delete question with ID ${questionId}:`, error);
      showError(t("Error.Question.couldNotDelete"));
    },
  });
};
