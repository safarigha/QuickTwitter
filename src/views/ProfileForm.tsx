import React, { useState } from "react";
import Layout from "../Layout";
import { RiHeartLine, RiMessage3Line, RiUserLine } from "react-icons/ri";
import useProfileData from "../components/profile";
import formatDate from "../hooks/generateDate";

type User = {
  id: number;
  username: string;
};

type Tweet = {
  id: number;
  body: string;
  reply: [];
  comment: [];
  favorites: [];
  favcount: number;
  tags: [];
  createdAt: string;
  user: {
    username: string;
    id: number;
  };
};

const ProfileForm: React.FC = () => {
  const { safeUserData } = useProfileData();

  const youTweets: Tweet[] = safeUserData.tweets ?? [];
  const followers: User[] = safeUserData.followers ?? [];
  const followings: User[] = safeUserData.followings ?? [];

  // متغیری برای ذخیره فعال بودن تب‌ها
  const [activeTab, setActiveTab] = useState("post");

  // تابعی برای تغییر فعال بودن تب
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <Layout>
      <>
        <div className="relative w-full h-40 bg-blue-900">
          {/* header */}
          <div className="flex justify-end items-end w-full h-full">
            <RiUserLine
              className="translate-y-1/2 text-blue-200 w-32 h-32 bg-blue-900 border rounded-full border-custom-blue mr-20"
              size={80}
            />
          </div>
          {/* Disply user info */}
          <div className="mr-8 mt-20 text-right text-white">
            <h1 className="text-2xl	pb-2 pr-8 pt-2">{safeUserData.username}</h1>
            <p className="p-2">
              {safeUserData.biography
                ? safeUserData.biography
                : "بیوگرافی هنوز ثبت نکردی"}
            </p>
            <div className="p-2">
              <p className="inline">({followers.length}) فالوور</p>
              <p className="inline ml-4">فالووینگ ({followings.length})</p>
            </div>
          </div>
          {/* tab */}
          <div className="flex justify-center mt-6  border-b border-custom-blue">
            <button
              className={`w-full px-4 py-2 mx-2 border-b-4 border-transparent hover:bg-blue-900 focus:outline-none ${
                activeTab === "post"
                  ? " text-white border-blue-600"
                  : "text-gray-400"
              }`}
              onClick={() => handleTabChange("post")}
            >
              پست
            </button>
            <button
              className={`w-full px-4 py-2 mx-2 border-b-4 border-transparent hover:bg-blue-900 focus:outline-none ${
                activeTab === "following"
                  ? " text-white border-blue-600"
                  : "text-gray-400"
              }`}
              onClick={() => handleTabChange("following")}
            >
              فالووینگ‌ها
            </button>
            <button
              className={`w-full px-4 py-2 mx-2 border-b-4 border-transparent hover:bg-blue-900 focus:outline-none ${
                activeTab === "followers"
                  ? " text-white border-blue-600"
                  : "text-gray-400"
              }`}
              onClick={() => handleTabChange("followers")}
            >
              فالوورها
            </button>
          </div>
          {/* Post list */}
          <div>
            <ul className="text-right max-h-max	">
              {activeTab === "post" &&
                youTweets.map((tweet, index) => (
                  <li key={index} className=" border-b border-custom-blue p-4">
                    <RiUserLine
                      className="text-blue-500 cursor-pointer float-right mr-2 ml-2 border border-custom-blue rounded-full"
                      size={50}
                    />
                    <p className="m-4">{tweet.body}</p>
                    {tweet.tags.map((tag, index) => (
                      <p className="inline m-1 text-sm" key={index}>
                        {tag}#
                      </p>
                    ))}
                    <div className=" ml-4 flex items-center">
                      <RiMessage3Line
                        className="text-blue-500 cursor-pointer float-left mr-4"
                        size={20}
                      />
                      <RiHeartLine
                        className="text-blue-500 cursor-pointer float-left mr-4"
                        size={20}
                      />
                      <p className="text-left text-sm">
                        {formatDate(tweet.createdAt)}
                      </p>
                    </div>
                  </li>
                ))}
              {/*  followings list */}
              {activeTab === "following" &&
                followings.map((user, index) => (
                  <li key={index} className=" border-b border-custom-blue p-4">
                    <RiUserLine
                      className="text-blue-500 cursor-pointer float-right mr-2 ml-2 border border-custom-blue rounded-full"
                      size={20}
                    />
                    <h1>
                      {user.username}
                      <button className="float-left bg-blue-500 text-white px-2 py-1 rounded-3xl w-20 ">
                        حذف
                      </button>
                    </h1>
                  </li>
                ))}
              {/* followers list */}
              {activeTab === "followers" &&
                followers.map((user, index) => (
                  <li key={index} className=" border-b border-custom-blue p-4">
                    <RiUserLine
                      className="text-blue-500 cursor-pointer float-right mr-2 ml-2 border border-custom-blue rounded-full"
                      size={20}
                    />
                    <h1>
                      {user.username}
                      <button className="float-left bg-blue-500 text-white px-2 py-1 rounded-3xl w-20 ">
                        فالوو
                      </button>
                    </h1>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </>
    </Layout>
  );
};

export default ProfileForm;
