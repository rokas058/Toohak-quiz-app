import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteQuizImage } from "@api/QuizApi";
import { showToast } from "@components/common/ui/Toast";
import { useTranslation } from "react-i18next";

export const useDeleteQuizImage = (quizId: string) => {
  const queryClient = useQueryClient();
  const { showSuccess, showError } = showToast();
  const { t } = useTranslation();

  return useMutation({
    mutationFn: (quizId: string) => deleteQuizImage(quizId),
    onSuccess: (imageId) => {
      queryClient.invalidateQueries({ queryKey: ["quizList"] });
      queryClient.invalidateQueries({ queryKey: ["quiz", quizId] });
      queryClient.removeQueries({ queryKey: ["coverImage", imageId] });

      showSuccess(t("Success.Image.deleted"));
    },
    onError: (error: Error) => {
      console.error("Error deleteting image :", error.message);
      showError(t("Error.Image.couldNotDelete"));
    },
  });
};
