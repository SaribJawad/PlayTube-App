import React, { useEffect, useState } from "react";
import { BiLike, BiSolidLike } from "react-icons/bi";
import { formatDate } from "../utils/formateDate";
import { MdDelete, MdModeEditOutline } from "react-icons/md";

import { useAppSelector } from "../app/hooks";
import { FiSave } from "react-icons/fi";
import useLikeToggleTweet from "../customHooks/useLikeToggleTweet";
import { useQueryClient } from "@tanstack/react-query";

interface Tweet {
  content: string;
  createdAt: string;
  owner: {
    avatar: { url: string };
    fullname: string;
    username: string;
    _id: string;
  };
  _id: string;
  likes: string[];
}

interface TweetCardProps {
  tweet: Tweet;
  handleDelete: (tweetId: string) => void;
  handleUpdate: (id: string, newContent: string) => void;
}

const TweetCard: React.FC<TweetCardProps> = ({
  tweet,
  handleDelete,
  handleUpdate,
}) => {
  const { mutateAsync: likeToggleTweet } = useLikeToggleTweet();
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editContent, setEditContent] = useState<string>(tweet.content);
  const loggedInUserId = useAppSelector((state) => state.auth.user?._id);
  const queryClient = useQueryClient();
  const {
    _id,
    content,
    createdAt,
    owner: {
      avatar: { url: avatarUrl },
      fullname,
      username,
      _id: ownerId,
    },
    likes,
  } = tweet;

  function handleSaveClick() {
    handleUpdate(_id, editContent);
    setIsEditing(editContent.trim() === "" ? true : false);
  }

  function handleDeleteClick() {
    handleDelete(tweet._id);
  }

  function handleLike(tweetId: string) {
    likeToggleTweet(tweetId, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["tweets", loggedInUserId] });
      },
    });
  }

  useEffect(() => {
    if (loggedInUserId) {
      setIsLiked(likes.includes(loggedInUserId));
    }
  }, [likes]);

  return (
    <div className="border-b border-b-zinc-800 flex items-center gap-4 p-3">
      <img className="w-10 rounded-full" src={avatarUrl} alt="" />
      <div className="w-full flex items-start justify-between">
        <div className="flex flex-col gap-1 w-full">
          <h1 className="text-md">
            {fullname}{" "}
            <span className="text-xs text-zinc-500">
              {formatDate(createdAt)}
            </span>
          </h1>
          {isEditing ? (
            <div className="text-sm  w-full">
              <input
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
                type="text"
                placeholder="Update tweet"
                className="w-full my-2 p-2 border-none outline-none bg-zinc-900 rounded-lg"
              />
            </div>
          ) : (
            <p className="text-sm ">{content}</p>
          )}
          <button
            onClick={() => handleLike(_id)}
            className="flex items-center gap-2"
          >
            {isLiked ? <BiSolidLike size={20} /> : <BiLike size={20} />}
            <span className="text-xs">{likes.length}</span>
          </button>
        </div>
        {loggedInUserId === ownerId && (
          <div className="flex gap-2">
            {isEditing ? (
              <button onClick={handleSaveClick}>
                <FiSave size={20} />
              </button>
            ) : (
              <>
                <button onClick={() => setIsEditing((prev) => !prev)}>
                  <MdModeEditOutline size={20} />
                </button>
                <button onClick={handleDeleteClick}>
                  <MdDelete size={20} />
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default TweetCard;
