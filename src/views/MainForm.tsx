import React, { useState } from "react";
import Layout from "../Layout";
import { RiUserLine, RiMessage3Line, RiHeartLine } from "react-icons/ri";
import TweerForm from "../views/TweetForm";
import useProfileData from "../components/profile";
// import { useFeedTweet } from "../components/tweetList";
// import formatDate from "../hooks/generateDate";

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

// type User = {
//   id: number;
//   username: string;
// };

const followingTweets = [
  { name: "آرزو4", tweet: "این یک توییت 4 است", tags: "4زندگی_زیباست" },
  { name: "آرزو5", tweet: "این یک توییت 5 است", tags: "5زندگی_زیباست" },
  { name: "آرزو6", tweet: "این یک توییت 6 است", tags: "6زندگی_زیباست" },
];

const MainForm: React.FC = () => {
  const [activeTab, setActiveTab] = useState("you");
  const { safeUserData } = useProfileData();
  const yourTweets: Tweet[] = safeUserData.tweets ?? [];
  // const { followingUserData } = useFeedTweet();
  // const followingTweets: Tweet[] = followingUserData.tweets ?? [];

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
              دنبال‌شونده
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
                      <p>{tweet.body}</p>
                      <p> {tweet.tags}#</p>
                      <div className="mb-4 ml-4">
                        <RiMessage3Line
                          className="text-blue-500 cursor-pointer float-left mr-4"
                          size={20}
                        />
                        <RiHeartLine
                          className="text-blue-500 cursor-pointer float-left mr-4"
                          size={20}
                        />
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
                      <h1 className="font-bold">{tweet.name}</h1>
                      <p>{tweet.tweet}</p>
                      <p> {tweet.tags}#</p>
                      <div className="mb-4 ml-4">
                        <RiMessage3Line
                          className="text-blue-500 cursor-pointer float-left mr-4"
                          size={20}
                        />
                        <RiHeartLine
                          className="text-blue-500 cursor-pointer float-left mr-4"
                          size={20}
                        />
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
