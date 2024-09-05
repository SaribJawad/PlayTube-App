import React, { useState } from "react";
import data from "@emoji-mart/data/sets/14/apple.json";
import { MdOutlineEmojiEmotions } from "react-icons/md";

import Picker from "@emoji-mart/react";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../app/hooks";
import ChannelEmptyTweet from "./ChannelEmptyTweet";
import TweetCard from "./TweetCard";
import useGetUsersTweets from "../customHooks/useGetUsersTweets";

const UserTweetSection: React.FC = () => {
  useGetUsersTweets();
  const tweets = useAppSelector((state) => state.tweet.allTweets);
  const [tweet, setTweet] = useState<string>("");
  const [showPicker, setShowPicker] = useState<boolean>(false);
  const { userId } = useParams<{ userId: string }>();
  const loggedInUserId = useAppSelector((state) => state.auth.user?._id);

  const handleEmojiPicker = (emoji: any) => {
    setTweet((prevTweet) => prevTweet + emoji.native);
  };

  const handleShowPicker = () => {
    setShowPicker((prev) => !prev);
  };

  return (
    <div className="relative">
      {userId === loggedInUserId && (
        <div className="w-full border border-zinc-800 p-3 flex flex-col gap-3">
          <input
            type="text"
            name="tweetContent"
            className=" w-full p-2 outline-none border-none bg-zinc-800 "
            value={tweet}
            placeholder="Whats on your mind?"
            onChange={(e) => setTweet(e.target.value)}
          />
          <div className="flex items-center gap-3 w-full justify-end">
            <button onClick={handleShowPicker}>
              <MdOutlineEmojiEmotions size={25} />
            </button>
            <button className="button-animation px-3 py-[5px] flex items-center gap-2    bg-red-800">
              Tweet
            </button>
          </div>
        </div>
      )}
      {showPicker && (
        <div className="absolute top-[-380px] right-0">
          <Picker
            data={data}
            previewPosition="none"
            onEmojiSelect={(e: any) => handleEmojiPicker(e)}
            set="apple"
          />
        </div>
      )}
      <div className="">
        {tweets.length === 0 ? (
          <ChannelEmptyTweet />
        ) : (
          tweets.map((tweet) => <TweetCard key={tweet._id} tweet={tweet} />)
        )}
      </div>
    </div>
  );
};

export default UserTweetSection;
