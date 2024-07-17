import { useMutation } from "@tanstack/react-query";
import { Axios } from "../configs/serverConfig";
import API_PATHS from "../configs/API_PATHS";
import { AddTweetData } from "../configs/interfaces";

export const useAddTweet = () => {
  return useMutation({
    mutationKey: ["AddTweet"],
    mutationFn: async (body: AddTweetData) => {
      const jwtToken = localStorage.getItem("token");
      const response = await Axios.post(`/api/${API_PATHS.ADD_TWEET}/`, body, {
        headers: {
          jwt: jwtToken,
          "Content-Type": "application/json",
        },
      });
      return response;
    },
  });
};
