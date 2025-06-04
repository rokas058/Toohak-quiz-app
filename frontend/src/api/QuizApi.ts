import { NewQuizRequest } from "@models/Request/NewQuizRequest";
import { NewQuizCoverImageRequest } from "@models/Request/NewQuizCoverImageRequest";
import { NewQuestionImageRequest } from "@models/Request/NewQuestionImageRequest";
import { NewQuizCoverImageResponse } from "@models/Response/NewQuizCoverImageResponse";
import { api } from "@api/Api";
import { QuizResponse } from "@models/Response/quizResponse";
import { NewQuizResponse } from "@models/Response/NewQuizResponse";
import { AxiosError } from "axios";
import { NewQuestionImageResponse } from "@models/Response/NewQuestionImageResponse";

export const createNewQuiz = async (
  data: NewQuizRequest,
): Promise<NewQuizResponse> => {
  try {
    const response = await api.post("/quizzes", data);
    return { id: response.data.id };
  } catch (error) {
    const axiosError = error as AxiosError;
    const errorMessage = axiosError.message || "Could not create the quiz";
    throw new Error(errorMessage);
  }
};

export const fetchQuizById = async (id: string): Promise<QuizResponse> => {
  try {
    const { data } = await api.get(`/quizzes/${id}`);
    return data;
  } catch (error) {
    const axiosError = error as AxiosError;
    const errorMessage = axiosError.message || "Could not find the quiz";
    throw new Error(errorMessage);
  }
};

export const newCoverImage = async (
  data: NewQuizCoverImageRequest,
): Promise<NewQuizCoverImageResponse> => {
  try {
    const formData = new FormData();
    formData.append("file", data.image);

    const response = await api.post<NewQuizCoverImageResponse>(
      "/files/image",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    const errorMessage = axiosError.message || "Could not upload the image";
    throw new Error(errorMessage);
  }
};

export const deleteQuizById = async (id: string): Promise<void> => {
  try {
    await api.delete(`/quizzes/${id}`);
  } catch (error) {
    const axiosError = error as AxiosError;
    const errorMessage = axiosError.message || "Could not delete the quiz";
    throw new Error(errorMessage);
  }
};

export const fetchImageById = async (id: string): Promise<string> => {
  try {
    const response = await api.get(`/files/image/${id}`, {
      responseType: "blob",
    });
    return URL.createObjectURL(response.data);
  } catch (error) {
    const axiosError = error as AxiosError;
    const errorMessage = axiosError.message || "Could not find the image";
    throw new Error(errorMessage);
  }
};

export const updateQuiz = async ({
  id,
  data,
}: {
  id: string;
  data: NewQuizRequest;
}): Promise<QuizResponse> => {
  try {
    const response = await api.put(`/quizzes/${id}`, data);
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    const errorMessage = axiosError.message || "Failed to update quiz";
    throw new Error(errorMessage);
  }
};

export const deleteQuizImage = async (id: string): Promise<string> => {
  try {
    const response = await api.delete(`/quizzes/${id}/image`);
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    const errorMessage = axiosError.message || "Could not delete quiz image";
    throw new Error(errorMessage);
  }
};

export const newQuestionImage = async (
  data: NewQuestionImageRequest,
): Promise<NewQuestionImageResponse> => {
  try {
    const formData = new FormData();
    formData.append("file", data.image);

    const response = await api.post<NewQuestionImageResponse>(
      "/files/image",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    const errorMessage = axiosError.message || "Could not upload the image";
    throw new Error(errorMessage);
  }
};
