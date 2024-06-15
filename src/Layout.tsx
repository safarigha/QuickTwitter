import React from "react";
import LeftSidebar from "../src/views/LeftSidebar";
import RightSidebar from "../src/views/RightSidebar";

type LayoutProps = {
  children: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => (
  <div className=" min-h-screen	 flex bg-blue-950 text-white custom-font">
    <LeftSidebar />
    <main className="flex-1">{children}</main>
    <RightSidebar />
  </div>
);

export default Layout;
