import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useFollowUser } from "../components/followUser";
import { toast } from "react-toastify";
import Modal from "react-modal";
import { RiHeartLine, RiMessage3Line, RiUserLine } from "react-icons/ri";
import formatDate from "../hooks/generateDate";
import useSearch from "../components/search";

// type User = {
//   id: number;
//   username: string;
// };

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

type Hashtag = {
  id: number;
  name: string;
};

// const users: User[] = [
//   { id: 1, username: "user1" },
//   { id: 2, username: "user2" },
//   { id: 3, username: "user3" },
//   { id: 4, username: "user4" },
//   { id: 5, username: "user5" },
// ];

const hashtags: Hashtag[] = [
  { id: 1, name: "هشتگ1" },
  { id: 2, name: "هشتگ2" },
  { id: 3, name: "هشتگ3" },
  // ادامه لیست هشتگ‌ها
];

const RightSidebar: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [followUser, setFollowUser] = useState<string>("");
  const followUserMutation = useFollowUser();
  const { safeUserData } = useSearch(searchTerm);

  const searchData: Tweet[] = safeUserData.tweets ?? [];
  // const filteredUsers = users.filter((user) =>
  //   user.username.toLowerCase().includes(searchTerm.toLowerCase())
  // );

  const handleKeyDownSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (searchTerm.trim() !== "") {
        setModalIsOpen(true);
      }
    }
  };

  const handleKeyDownfollowUser = async (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Enter" && followUser.trim() !== "") {
      event.preventDefault();
      try {
        await followUserMutation.mutate(
          { username: followUser },
          {
            onSuccess: () => {
              toast.success("کاربر با موفقیت فالوو شد", {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
              });
              setFollowUser("");
            },
            onError: (error: any) => {
              toast.error(
                `خطا در فالوو کردن کاربر: ${
                  error.response?.data?.message || error.message
                }`,
                {
                  position: "top-center",
                  autoClose: 3000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "colored",
                }
              );
            },
          }
        );
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  return (
    <aside className="w-1/4 p-4 border-custom-blue border-l">
      {/* Search Box */}
      <div className="mb-4 mr-20">
        <input
          type="text"
          placeholder="جستجو"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleKeyDownSearch}
          className="w-full p-3 rounded-full text-right bg-blue-900"
        />
      </div>
      {/* Modal */}
      <div className="flex justify-center items-center">
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={() => setModalIsOpen(false)}
          contentLabel="Search Twitte Users"
          className=" w-[500px] scroll-auto	 h-auto m-auto bg-indigo-900 rounded-[12px] text-white text-right"
        >
          <h2 className="text-center pt-4">نتیجه جستجو</h2>
          <ul>
            {searchData &&
              searchData.map((tweet, index) => (
                <li key={index} className=" border-b border-custom-blue p-2">
                  <RiUserLine
                    className="text-blue-500 cursor-pointer float-right mr-2 ml-2 border border-custom-blue rounded-full"
                    size={25}
                  />
                  <p>{tweet.user.username}</p>

                  <p className="m-1">
                    {tweet.tags.map((tag, index) => (
                      <p className="inline text-left text-sm" key={index}>
                        {tag}#
                      </p>
                    ))}
                    {tweet.body}
                  </p>
                  <div className=" ml-2 flex items-center">
                    <RiMessage3Line
                      className="text-blue-500 cursor-pointer float-left mr-2"
                      size={15}
                    />
                    <RiHeartLine
                      className="text-blue-500 cursor-pointer float-left mr-2"
                      size={15}
                    />
                    <p className="text-left text-sm">
                      {formatDate(tweet.createdAt)}
                    </p>
                  </div>
                </li>
              ))}
          </ul>
          <button
            className="custom-font mt-4 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            onClick={() => setModalIsOpen(false)}
          >
            بستن
          </button>
        </Modal>
      </div>
      {/* Follow Suggestions */}
      <div className="border-custom-blue border rounded-3xl p-4 mb-4 mr-20">
        <h3 className="mb-2 text-right pb-2">انتخاب فالووینگ‌ها</h3>
        <div className="mb-4">
          <input
            type="text"
            placeholder="نام کاربری را وارد کنید"
            value={followUser}
            onChange={(e) => setFollowUser(e.target.value)}
            onKeyDown={handleKeyDownfollowUser}
            className="w-full rounded-full text-center text-xm bg-blue-900"
          />
          <p className="text-sm text-center">
            پس از وارد کردن نام کاربری اینتر بزنید
          </p>
        </div>
        {/* {filteredUsers.slice(0, 3).map((user) => (
          <div key={user.id} className="flex items-center justify-between mb-2">
            <span>{user.username}</span>
            <button className="bg-blue-500 text-white px-2 py-1 rounded-3xl w-20">
فالووکردن            </button>
          </div>
        ))} */}

        {/* <NavLink to="/follow-suggestions" className="text-blue-500">
          نمایش بیشتر
        </NavLink> */}
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
