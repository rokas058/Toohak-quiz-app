import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateQuiz } from "@api/QuizApi";
import { useNavigate } from "react-router-dom";
import { PrivateAppRoutes } from "@models/PrivateRoutes";
import { showToast } from "@components/common/ui/Toast";
import { useTranslation } from "react-i18next";

export const useUpdateQuiz = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { showSuccess, showError } = showToast();
  const { t } = useTranslation();

  return useMutation({
    mutationFn: updateQuiz,
    onSuccess: (data) => {
      showSuccess(t("Success.Quiz.updated"));
      queryClient.invalidateQueries({ queryKey: ["quiz", data.id] });
      navigate(PrivateAppRoutes.QUIZ_PAGE.replace(":id", data.id));
    },
    onError: (error: Error) => {
      console.error("Error editing quiz:", error.message);
      showError(t("Error.Quiz.couldNotUpdate"));
    },
  });
};
