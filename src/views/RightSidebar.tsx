import React, { useState } from "react";
import { NavLink } from "react-router-dom";

type User = {
  id: number;
  username: string;
};

type Hashtag = {
  id: number;
  name: string;
};

const users: User[] = [
  { id: 1, username: "user1" },
  { id: 2, username: "user2" },
  { id: 3, username: "user3" },
  { id: 4, username: "user4" },
  { id: 5, username: "user5" },
];

const hashtags: Hashtag[] = [
  { id: 1, name: "هشتگ1" },
  { id: 2, name: "هشتگ2" },
  { id: 3, name: "هشتگ3" },
  // ادامه لیست هشتگ‌ها
];

const RightSidebar: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredUsers = users.filter((user) =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <aside className="w-1/4 p-4 border-custom-blue border-l">
      {/* Search Box */}
      <div className="mb-4 mr-20">
        <input
          type="text"
          placeholder="جستجو"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-3 rounded-full text-right bg-blue-900"
        />
      </div>

      {/* Follow Suggestions */}
      <div className="border-custom-blue border rounded-3xl p-4 mb-4 mr-20">
        <h3 className="mb-2 text-right pb-2">پیشنهاد‌ دنبال‌کننده</h3>
        {filteredUsers.slice(0, 3).map((user) => (
          <div key={user.id} className="flex items-center justify-between mb-2">
            <span>{user.username}</span>
            <button className="bg-blue-500 text-white px-2 py-1 rounded-3xl w-20">
              دنبال‌کردن
            </button>
          </div>
        ))}
        <NavLink to="/follow-suggestions" className="text-blue-500">
          نمایش بیشتر
        </NavLink>
      </div>

      {/* Trending Hashtags */}
      <div className="border-custom-blue border rounded-3xl p-4 mb-4 mr-20">
        <h3 className="mb-2 text-right pb-2">هشتگ‌ها</h3>
        <ul>
          {hashtags.map((hashtag) => (
            <li key={hashtag.id} className="mb-2">
              #{hashtag.name}
            </li>
          ))}
        </ul>
        <NavLink to="/trends" className="text-blue-500">
          نمایش بیشتر
        </NavLink>
      </div>
      {/* Footer Links */}
      <div className="text-xs text-center mr-20">
        <span className="p-1">شرایط استفاده از خدمات</span>{" "}
        <span className="p-1">دسترسی ها</span> <span className="p-1">کوکی</span>{" "}
        <span className="p-1">امنیت</span> <span className="p-1">تبلیغات</span>{" "}
        <span className="p-1">قوانین حق کپی رایت</span>{" "}
      </div>
    </aside>
  );
};

export default RightSidebar;
