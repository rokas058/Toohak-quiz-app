import { toast, ToastOptions } from "react-toastify";

export const showToast = () => {
  const defaultOptions: ToastOptions = {
    position: "bottom-left",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  };

  const customId = "custom-id-yes";

  const showError = (message: string, options?: ToastOptions) => {
    toast.error(message, {
      toastId: customId,
      ...defaultOptions,
      ...options,
    });
  };
  const showSuccess = (message: string, options?: ToastOptions) => {
    toast.success(message, {
      toastId: customId,
      ...defaultOptions,
      ...options,
    });
  };

  const handleError = (error: unknown, fallbackMessage?: string) => {
    if (error instanceof Error) {
      showError(error.message);
    } else if (typeof error === "string") {
      showError(error);
    } else {
      showError(fallbackMessage || "An unknown error occurred");
    }
  };

  return {
    showError,
    showSuccess,
    handleError,
  };
};
