import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import API_PATHS from "../configs/API_PATHS";

const LogoutAccount: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate(`/${API_PATHS.LOGIN}`);
    toast.success("با موفقیت خارج شدید", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };

  return (
    <div className="flex items-center mt-3  ml-28">
      <button
        className="bg-blue-500 text-white px-2 py-1 rounded-3xl w-20"
        onClick={handleLogout}
      >
        خروج
      </button>
    </div>
  );
};

export default LogoutAccount;
