import { useMutation } from "@tanstack/react-query";
import { createNewQuiz } from "@api/QuizApi";
import { NewQuizResponse } from "@models/Response/NewQuizResponse";
import { useNavigate } from "react-router-dom";
import { PrivateAppRoutes } from "@models/PrivateRoutes";
import { showToast } from "@ui/Toast.tsx";
import { useTranslation } from "react-i18next";

export const useCreateQuiz = () => {
  const navigate = useNavigate();
  const { handleError, showSuccess } = showToast();
  const { t } = useTranslation();

  return useMutation({
    mutationFn: createNewQuiz,
    onSuccess: (response: NewQuizResponse) => {
      showSuccess(t("Success.Quiz.created"));
      navigate(PrivateAppRoutes.QUIZ_PAGE.replace(":id", response.id));
    },
    onError: (error: Error) => {
      console.error("Error creating quiz:", error.message);
      handleError(error, t("Error.Quiz.couldNotCreate"));
    },
  });
};
