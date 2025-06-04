import { newQuestionImage } from "@api/QuizApi";
import { NewQuestionImageResponse } from "@models/Response/NewQuestionImageResponse";
import { useMutation } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { showToast } from "@ui/Toast.tsx";

export const useUploadQuestionImage = () => {
  const { t } = useTranslation();
  const { handleError, showSuccess } = showToast();
  return useMutation({
    mutationFn: newQuestionImage,
    onSuccess: (data: NewQuestionImageResponse) => {
      showSuccess(t("Success.Image.uploaded"));
      return data;
    },
    onError: (error: Error) => {
      console.error("Error uploading image:", error);
      alert(t("quiz_form_image_error"));
      handleError(error, t("Error.Image.couldNotUpload"));
    },
  });
};
