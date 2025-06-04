import { updateQuestionById } from "@api/questionApi";
import { showToast } from "@components/common/ui/Toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";

export const useUpdateQuestion = () => {
  const queryClient = useQueryClient();
  const { showSuccess, showError } = showToast();
  const { t } = useTranslation();

  return useMutation({
    mutationFn: updateQuestionById,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["quiz", data.quizId] });
      showSuccess(t("Success.Question.updated"));
    },
    onError: (error: Error) => {
      console.error("Error editing question:", error.message);
      showError(t("Error.Question.couldNotUpdate"));
    },
  });
};
