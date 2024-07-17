import React, { useState } from "react";
import {
  RiImageAddFill,
  RiFileGifLine,
  RiChatPollLine,
  RiEmotionHappyLine,
} from "react-icons/ri";
import { useAddTweet } from "../components/tweet";
import { toast } from "react-toastify";
import { AddTweetData } from "../configs/interfaces";

const TweetForm: React.FC = () => {
  const [tweet, setTweet] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const { mutate } = useAddTweet();

  const handleTweetChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTweet(event.target.value);
  };

  const handleTagsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const text = event.target.value;
    const formattedText = text.replace(/,\s+/g, ",").split(",");
    const formattedTags = formattedText.flatMap((tag) => tag.trim().split("،"));
    setTags(formattedTags);
  };

  const handleTweetSubmit: React.FormEventHandler<HTMLFormElement> = async (
    e
  ) => {
    e.preventDefault();
    const formData: AddTweetData = { body: tweet, tags: tags };
    try {
      await mutate(formData, {
        onSuccess: () => {
          toast.success("توئیت با موفقیت ارسال شد", {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        },
        onError: (error: any) => {
          toast.error(
            `خطا در ارسال توئیت: ${
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
      });
      setTweet("");
      setTags([]);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <form onSubmit={handleTweetSubmit}>
      <div className="p-4 border-b border-custom-blue">
        <textarea
          placeholder="... چه خبر؟"
          className="w-full resize-y p-4 focus:outline-none focus:border-blue-500 text-right bg-blue-950"
          value={tweet}
          onChange={handleTweetChange}
        ></textarea>
        <input
          type="text"
          placeholder="برچسب‌ها را وارد کنید (جدا شده با کاما)"
          className="w-full  mt-2 p-2 text-right text-sm bg-transparent caret-transparent	"
          value={tags.join(",")}
          onChange={handleTagsChange}
        />
        <div className="flex justify-between items-center mt-2">
          <div className="flex items-center ml-8">
            <RiImageAddFill
              className="text-blue-500 cursor-pointer mr-2"
              size={20}
            />
            <RiFileGifLine
              className="text-blue-500 cursor-pointer mr-2"
              size={20}
            />
            <RiChatPollLine
              className="text-blue-500 cursor-pointer mr-2"
              size={20}
            />
            <RiEmotionHappyLine
              className="text-blue-500 cursor-pointer mr-2"
              size={20}
            />
          </div>
          <button className="px-4 py-2 bg-blue-500 text-white rounded-3xl mr-8">
            ثبت
          </button>
        </div>
      </div>
    </form>
  );
};

export default TweetForm;
