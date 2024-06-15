import { useState, useEffect } from "react";
import { Axios } from "../configs/serverConfig";
import { useUser } from "../contexts/UserContext";
import API_PATHS from "../configs/API_PATHS";

const useProfileData = () => {
  const [userData, setUserData] = useState<any>(null);
  const { username } = useUser();

  useEffect(() => {
    if (username) {
      Axios.get(`/api/${API_PATHS.PROFILE}/${username}`)
        .then((response: { data: any }) => {
          setUserData(response.data);
        })
        .catch((error: any) => {
          console.error("Error fetching user data:", error);
        });
    }
  }, [username]);

  const safeUserData = userData ?? [];

  return { safeUserData };
};

export default useProfileData;
