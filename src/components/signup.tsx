import { useMutation } from "@tanstack/react-query";
import { Axios } from "../configs/serverConfig";
import API_PATHS from "../configs/API_PATHS";
import { FormDataSignup } from "../configs/interfaces";

export const useSignUp = () => {
  return useMutation({
    mutationKey: ["Signup"],
    mutationFn: async (body: FormDataSignup) => {
      const response = await Axios.post(`/api/${API_PATHS.SIGNUP}/`, body);
      return response;
    },
  });
};
