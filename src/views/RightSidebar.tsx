import React, { useState } from "react";
import { useFollowUser } from "../components/followUser";
import { toast } from "react-toastify";
import { RiUserLine } from "react-icons/ri";
import formatDate from "../hooks/generateDate";
import useSearch from "../components/search";

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

const RightSidebar: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [followUser, setFollowUser] = useState<string>("");
  const followUserMutation = useFollowUser();
  const { safeUserData } = useSearch(searchTerm);

  const searchData: Tweet[] = safeUserData.tweets ?? [];

  const handleKeyDownSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (searchTerm.trim() !== "") {
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
            className="w-full rounded-full text-center text-xm bg-blue-900 h-[35px]"
          />
          <p className="text-sm text-center text-gray-400">
            پس از وارد کردن نام کاربری اینتر بزنید
          </p>
        </div>
      </div>

      {/* Search Box */}
      <div className="border-custom-blue border rounded-3xl p-4 mb-4 mr-20">
        <div>
          <input
            type="text"
            placeholder="جستجو"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleKeyDownSearch}
            className="w-full h-[35px] p-3 rounded-full text-right bg-blue-900"
          />
        </div>

        {/* Search list */}
        <ul className="w-[250px] ">
          {searchData &&
            searchData.map((tweet, index) => (
              <li key={index} className="p-2 text-right">
                <RiUserLine
                  className="text-blue-500 cursor-pointer float-right  ml-2 border border-custom-blue rounded-full"
                  size={25}
                />
                <p>{tweet.body}</p>
                {tweet.tags.map((tag, index) => (
                  <p className="inline text-xs" key={index}>
                    {tag}#
                  </p>
                ))}
                <div className="flex items-center">
                  <p className="text-left text-xs">
                    {formatDate(tweet.createdAt)}
                  </p>
                </div>
              </li>
            ))}
        </ul>
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
