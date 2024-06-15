import React from "react";
import { useNavigate } from "react-router-dom";
import API_PATHS from "../configs/API_PATHS";

const ComingSoon: React.FC = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`${API_PATHS.HOME}`);
  };

  return (
    <div className=" h-screen bg-blue-950 flex flex-col items-center justify-center">
      <h1 className="custom-font text-5xl text-white font-bold mb-8 animate-pulse">
        Comming Soon{" "}
      </h1>
      <p className="custom-font text-white text-lg mb-8 ">
        درتلاشیم تا بهترین ها را به شما ارائه کنیم. منتظر باشید
      </p>
      <button
        type="button"
        className="custom-font flex justify-center py-2 px-12 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        onClick={handleClick}
      >
        خانه
      </button>
    </div>
  );
};

export default ComingSoon;
