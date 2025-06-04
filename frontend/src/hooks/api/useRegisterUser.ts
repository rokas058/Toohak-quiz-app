import { useMutation } from "@tanstack/react-query";
import { registerUser } from "@api/userApi";
import { useTranslation } from "react-i18next";
import { showToast } from "@ui/Toast.tsx";

export const useRegisterUser = () => {
  // const queryClient = useQueryClient();
  const { handleError, showSuccess } = showToast();
  const { t } = useTranslation();

  return useMutation({
    mutationFn: registerUser,
    onSuccess: (status: number) => {
      if (status === 201) {
        showSuccess(t("Success.User.registered"));
      }
      if (status !== 201 && status !== 204) {
        throw new Error(`Unexpected status code: ${status}`);
      }
    },
    onError: (error: Error) => {
      console.error("Error registering user", error.message);
      handleError(error, t("Error.User.couldNotRegister"));
    },
  });
};
