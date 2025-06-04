import { useMutation } from "@tanstack/react-query";
import { answerQuestionOption } from "@api/QuizSessionApi";
import { showToast } from "@components/common/ui/Toast";
import { useTranslation } from "react-i18next";

export const useAnswerQuestion = () => {
  const { t } = useTranslation();
  const { showSuccess, showError } = showToast();

  return useMutation({
    mutationFn: (id: string) => answerQuestionOption(id),
    onSuccess: () => {
      showSuccess(t("AnswerQuestion.answerSentSuccessfully"));
    },
    onError: (error: Error) => {
      showError(t("AnswerQuestion.errorSendingAnswer"));
      console.error("Error sending answer:", error.message);
    },
  });
};
