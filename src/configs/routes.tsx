// import React, { useEffect } from "react";
// import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";

import MainForm from "../views/MainForm";
import LoginForm from "../views/LoginForm";
import SignUpForm from "../views/SignUpForm";
import ProfileForm from "../views/ProfileForm";

import ComingSoon from "../views/CommingSoon";
// import Explore from "../views/Explore";
// import Notifications from "../views/Notifications";
// import Messages from "../views/Messages";
// import Bookmarks from "../views/Bookmarks";
// import Premium from "../views/Premium";
// import More from "../views/More";
// import Communities from "../views/Communities";

const AppRoutes: React.FC = () => {
  // const navigate = useNavigate();

  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   if (!token) {
  //     navigate("/login");
  //   }
  // }, [navigate]);

  return (
    <Routes>
      <Route path="/login" element={<LoginForm />} />
      <Route path="/" element={<MainForm />} />
      <Route path="/signup" element={<SignUpForm />} />
      <Route path="/profile" element={<ProfileForm />} />
      <Route path="/explore" element={<ComingSoon />} />
      <Route path="/notifications" element={<ComingSoon />} />
      <Route path="/messages" element={<ComingSoon />} />
      <Route path="/bookmarks" element={<ComingSoon />} />
      <Route path="/premium" element={<ComingSoon />} />
      <Route path="/more" element={<ComingSoon />} />
      <Route path="/communities" element={<ComingSoon />} />
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
};
export default AppRoutes;
