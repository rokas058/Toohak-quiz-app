import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteQuizById } from "@api/QuizApi";
import { useNavigate } from "react-router-dom";
import { PrivateAppRoutes } from "@models/PrivateRoutes";
import { showToast } from "@components/common/ui/Toast";
import { useTranslation } from "react-i18next";

export const useDeleteQuiz = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { showSuccess, showError } = showToast();
  const { t } = useTranslation();

  return useMutation({
    mutationFn: (id: string) => deleteQuizById(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["quizList"] });
      showSuccess(t("Success.Quiz.deleted"));
      navigate(PrivateAppRoutes.USER_QUIZZES);
    },
    onError: (error: Error) => {
      console.error("Error deleteting quiz:", error.message);
      showError(t("Error.Quiz.couldNotDelete"));
    },
  });
};
