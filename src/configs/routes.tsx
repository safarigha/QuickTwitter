import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";

import MainForm from "../views/MainForm";
import LoginForm from "../views/LoginForm";
import SignUpForm from "../views/SignUpForm";
import ProfileForm from "../views/ProfileForm";

import ComingSoon from "../views/CommingSoon";

const AppRoutes: React.FC = () => {
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
