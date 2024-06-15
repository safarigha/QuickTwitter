import { useMutation } from "@tanstack/react-query";
import { Axios } from "../configs/serverConfig";
import API_PATHS from "../configs/API_PATHS";

interface FeedTweetData {
  username: string;
}

interface FeedTweetData {
  body: string;
  tags: string[];
}

export const useFeedTweet = () => {
  return useMutation({
    mutationKey: ["FeedTweet"],
    mutationFn: async (body: FeedTweetData) => {
      const jwtToken = localStorage.getItem("token");
      const response = await Axios.post(`/api/${API_PATHS.FEED_TWEET}/`, body, {
        headers: {
          jwt: jwtToken,
          "Content-Type": "application/json",
        },
      });
      return response;
    },
  });
};
