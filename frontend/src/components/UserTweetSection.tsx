import React, { useEffect, useState } from "react";
import data from "@emoji-mart/data/sets/14/apple.json";
import { MdOutlineEmojiEmotions } from "react-icons/md";

import Picker from "@emoji-mart/react";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../app/hooks";
import ChannelEmptyTweet from "./ChannelEmptyTweet";
import TweetCard from "./TweetCard";
import useGetUsersTweets from "../customHooks/useGetUsersTweets";
import { Flip, toast, ToastContainer } from "react-toastify";
import useCreateTweet from "../customHooks/useCreateTweet";
import LoadingSpinner from "./LoadingSpinner";
import useUpdateTweet from "../customHooks/useUpdateTweet";
import { useQueryClient } from "@tanstack/react-query";
import useDeleteTweet from "../customHooks/useDeleteTweet";

const UserTweetSection: React.FC = () => {
  useGetUsersTweets();
  const queryClient = useQueryClient();
  const { allTweets, loading } = useAppSelector((state) => state.tweet);
  const [tweet, setTweet] = useState<string>("");
  const [showPicker, setShowPicker] = useState<boolean>(false);
  const { userId } = useParams<{ userId: string }>();
  const loggedInUserId = useAppSelector((state) => state.auth.user?._id);
  const { mutateAsync: createTweet, error, isPending } = useCreateTweet();
  const { mutateAsync: updateTweet } = useUpdateTweet();
  const { mutateAsync: deleteTweet } = useDeleteTweet();

  function handleEmojiPicker(emoji: any) {
    setTweet((prevTweet) => prevTweet + emoji.native);
  }

  function handleShowPicker() {
    setShowPicker((prev) => !prev);
  }

  async function handleTweetUpload(tweet: string) {
    if (tweet.trim() === "") {
      return toast.error("Tweet content cannot be empty.");
    }
    await createTweet({ tweetContent: tweet });
    setTweet("");
  }

  async function handleUpdate(id: string, newContent: string) {
    if (newContent.trim() === "") {
      toast.error("Tweet content cannot be empty");
      return;
    }
    await updateTweet(
      { tweetContent: newContent, tweetId: id },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: ["tweets", loggedInUserId],
          });
          toast.success("Tweet updated successfully");
        },
      }
    );
  }

  async function handleDelete(tweetId: string) {
    await deleteTweet(tweetId, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["tweets", loggedInUserId] });
        toast.success("Tweet deleted successfully");
      },
    });
  }

  useEffect(() => {
    if (error) {
      toast.error(error.message, {
        closeButton: false,
      });
    }
  }, [error]);

  if (loading) {
    return (
      <div className=" w-full h-full flex items-center justify-center  ">
        <LoadingSpinner width="8" height="8" />
      </div>
    );
  }

  return (
    <div className="relative">
      <ToastContainer
        position="top-center"
        autoClose={3000}
        transition={Flip}
      />
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
            <button
              onClick={() => handleTweetUpload(tweet)}
              className="button-animation px-3 py-[5px] flex items-center gap-2    bg-red-800"
            >
              {isPending ? "Uploading..." : "Tweet"}
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
        {allTweets.length === 0 ? (
          <ChannelEmptyTweet />
        ) : (
          allTweets.map((tweet) => (
            <TweetCard
              key={tweet._id}
              tweet={tweet}
              handleDelete={handleDelete}
              handleUpdate={handleUpdate}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default UserTweetSection;
