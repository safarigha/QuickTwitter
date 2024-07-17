import React, { useState } from "react";
import Layout from "../Layout";
import { RiUserLine, RiMessage3Line, RiHeartLine } from "react-icons/ri";
import TweerForm from "../views/TweetForm";
import useProfileData from "../components/profile";
import formatDate from "../hooks/generateDate";
import { useFollowingTweets } from "../components/tweetList";
import { TweetMainForm } from "../configs/interfaces";

const MainForm: React.FC = () => {
  const [activeTab, setActiveTab] = useState("you");
  const { safeUserData } = useProfileData();
  const yourTweets: TweetMainForm[] = safeUserData.tweets ?? [];
  const { followingUserData } = useFollowingTweets();
  const followingTweets: TweetMainForm[] = followingUserData.tweets ?? [];

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <Layout>
      <>
        <div>
          {/* Tab */}
          <div className="flex justify-center mt-6  border-b border-custom-blue">
            <button
              className={`w-full px-4 py-2 mx-2 border-b-4 border-transparent hover:bg-blue-900 focus:outline-none ${
                activeTab === "you"
                  ? " text-white border-blue-500"
                  : "text-gray-400"
              }`}
              onClick={() => handleTabChange("you")}
            >
              شما
            </button>
            <button
              className={`w-full px-4 py-2 mx-2 border-b-4 border-transparent hover:bg-blue-900 focus:outline-none ${
                activeTab === "following"
                  ? " text-white border-white"
                  : "text-gray-400"
              }`}
              onClick={() => handleTabChange("following")}
            >
              فالووینگ
            </button>
          </div>
          {/* Tweet posted */}
          <TweerForm />
          {/* Tweet list */}
          <div>
            <ul className="text-right ">
              {activeTab === "you"
                ? yourTweets.map((tweet, index) => (
                    <li
                      key={index}
                      className=" border-b border-custom-blue p-4"
                    >
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
                  ))
                : followingTweets.map((tweet, index) => (
                    <li
                      key={index}
                      className=" border-b border-custom-blue p-4"
                    >
                      <RiUserLine
                        className="text-blue-500 cursor-pointer float-right mr-2 ml-2 border border-custom-blue rounded-full"
                        size={50}
                      />
                      <h1 className="font-bold">{tweet.user.username}</h1>
                      <p>{tweet.body}</p>
                      <p> {tweet.tags}#</p>
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
            </ul>
          </div>
        </div>
      </>
    </Layout>
  );
};

export default MainForm;
