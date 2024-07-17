// import React, { createContext, useContext } from "react";
import { NavLink } from "react-router-dom";
import { API_PATHS } from "../configs/API_PATHS";
import { useUser } from "../contexts/UserContext";
import LogoutAccount from "../hooks/LogoutAccount";
import { NavItemLeftSidebar } from "../configs/interfaces";

const navItems: NavItemLeftSidebar[] = [
  {
    to: API_PATHS.HOME,
    src: `/icons/home.png`,
    alt: "Home",
    text: "خانه",
  },
  {
    to: `/${API_PATHS.EXPLORE}`,
    src: `/icons/explore.png`,
    alt: "Explore",
    text: "اکسپلور",
  },
  {
    to: `/${API_PATHS.NOTIFICATION}`,
    src: `/icons/notifications.png`,
    alt: "Notifications",
    text: "اعلان‌ها",
  },
  {
    to: `/${API_PATHS.MESSAGES}`,
    src: `/icons/message.png`,
    alt: "Messages",
    text: "پیام‌ها",
  },
  {
    to: `/${API_PATHS.BOOKMARKS}`,
    src: `/icons/bookmark.png`,
    alt: "Bookmarks",
    text: "نشان شده‌ها",
  },
  {
    to: `/${API_PATHS.PREMIUM}`,
    src: `/icons/premium.png`,
    alt: "Premium",
    text: "اشتراک ویژه",
  },
  {
    to: `/${API_PATHS.COMMUNITIES}`,
    src: `/icons/communities.png`,
    alt: "Communities",
    text: "انجمن",
  },
  {
    to: `/${API_PATHS.MORE}`,
    src: `/icons/more.png`,
    alt: "More",
    text: "بیشتر",
  },
];

const LeftSidebar: React.FC = () => {
  const { username } = useUser();
  return (
    <aside className="w-1/5 p-4 border-custom-blue border-r">
      <div className="text-center mt-2 ">
        <img
          src={`/Logo_of_Twitter.png`}
          alt="Logo"
          className="h-10 w-10 mx-auto mb-4"
        />
      </div>
      <nav className="space-y-1  ml-20">
        {navItems.map((item, index) => (
          <NavLink to={item.to} key={index} className="flex items-center p-4 ">
            <img src={item.src} alt={item.alt} className="h-6 w-6 mr-2" />
            {item.text}
          </NavLink>
        ))}
      </nav>
      <div className="flex items-center mt-6  ml-20">
        <img
          src={`/icons/profile.png`}
          alt="User Logo"
          className="h-10 w-10 mr-2"
        />
        <div>
          <p>@{username}</p>
          <NavLink to="/profile" className="text-blue-500">
            مشاهده پروفایل
          </NavLink>
        </div>
      </div>
      <LogoutAccount />
    </aside>
  );
};

export default LeftSidebar;
