// followUser.tsx
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

interface FollowUserData {
  username: string;
}

export const useFollowUser = () => {
  return useMutation({
    mutationKey: ["followUser"],
    mutationFn: async (data: FollowUserData) => {
      const jwtToken = localStorage.getItem("token");
      const response = await axios.put(
        "http://185.8.174.74:8080/api/follow",
        data,
        {
          headers: {
            jwt: jwtToken,
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    },
  });
};
