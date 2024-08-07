import { useMutation } from "@tanstack/react-query";
import { Axios } from "../configs/serverConfig";
import API_PATHS from "../configs/API_PATHS";
import { FormDataLogin } from "../configs/interfaces";

export const useLogin = () => {
  return useMutation({
    mutationKey: ["login"],
    mutationFn: async (body: FormDataLogin) => {
      return Axios.post(`/api/${API_PATHS.LOGIN}/`, body)
        .then((response) => response.data)
        .catch((error) => {
          console.log(error.response?.data?.message || "Login failed");
        });
    },
  });
};
