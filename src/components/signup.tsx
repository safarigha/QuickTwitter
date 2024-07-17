import { useMutation } from "@tanstack/react-query";
import { Axios } from "../configs/serverConfig";
import API_PATHS from "../configs/API_PATHS";

type FormData = {
  email: string;
  password: string;
  confirmPassword: string;
  username: string;
  bio: string;
};

export const useSignUp = () => {
  return useMutation({
    mutationKey: ["Signup"],
    mutationFn: async (body: FormData) => {
      const response = await Axios.post(`/api/${API_PATHS.SIGNUP}/`, body);
      return response;
    },
  });
};
