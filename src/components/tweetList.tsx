import { Axios } from "../configs/serverConfig";
import API_PATHS from "../configs/API_PATHS";
import { useEffect, useState } from "react";
import { useUser } from "../contexts/UserContext";

export const useFollowingTweets = () => {
  const [userData, setUserData] = useState<any>(null);
  const { username } = useUser();

  useEffect(() => {
    if (username) {
      const jwtToken = localStorage.getItem("token");

      const requestData = {
        username: username,
      };

      Axios.post(`/api/${API_PATHS.FEED_TWEET}/`, requestData, {
        headers: {
          jwt: jwtToken,
          "Content-Type": "application/json",
        },
      })
        .then((response: { data: any }) => {
          const filteredTweets = response.data.tweets.filter(
            (tweet: any) => tweet.user.username !== username
          );
          setUserData({ ...response.data, tweets: filteredTweets });
        })

        .catch((error: any) => {
          console.error("Error fetching user data:", error);
        });
    }
  }, [username]);

  const followingUserData = userData ?? [];

  return { followingUserData };
};
