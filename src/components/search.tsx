import { useState, useEffect } from "react";
import { Axios } from "../configs/serverConfig";
import API_PATHS from "../configs/API_PATHS";

const useSearch = (username: string) => {
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (username) {
          const response = await Axios.get(
            `/api/${API_PATHS.PROFILE}/${username}`
          );
          setUserData(response.data);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, [username]);

  const safeUserData = userData ?? [];

  return { safeUserData };
};

export default useSearch;
