import { api } from "./Api";

export const registerUser = async (): Promise<number> => {
  const response = await api.post("/users/register");
  return response.status;
};
