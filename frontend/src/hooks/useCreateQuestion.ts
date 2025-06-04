import { createQuestion } from "@api/questionApi";
import { showToast } from "@components/common/ui/Toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";

export const useCreateQuestion = () => {
  const queryClient = useQueryClient();
  const { showSuccess, showError } = showToast();
  const { t } = useTranslation();

  return useMutation({
    mutationFn: createQuestion,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["quiz", data.quizId] });
      showSuccess(t("Success.Question.created"));
    },
    onError: (error: Error) => {
      showError(t("Error.Question.couldNotCreate"));
      console.error("Error creating question:", error.message);
    },
  });
};
