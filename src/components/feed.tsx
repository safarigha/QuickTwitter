import React from "react";
import axios from "axios";
import { useQuery } from "react-query";

type Tweet = {
  body: string;
  user: {
    username: string;
    name: string;
    biography: string;
    id: string;
  };
  reply: string | null;
  comments: any[];
  favorites: any[];
  favcount: number;
  tags: string[];
  createdAt: string;
  id: string;
};

type FeedData = {
  tweets: Tweet[];
  username: string;
};

const useFeed = (onDataLoaded: (data: FeedData) => void) => {
  const { data } = useQuery("feedData", async () => {
    const jwtToken = localStorage.getItem("token");
    const response = await axios.post(
      "http://185.8.174.74:8080/api/feed",
      {},
      {
        headers: {
          jwt: jwtToken,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  });

  React.useEffect(() => {
    if (data) {
      onDataLoaded(data);
    }
  }, [data, onDataLoaded]);
};

export default useFeed;
