import React, { useEffect, useState } from "react";
import { BiLike, BiSolidLike } from "react-icons/bi";
import { formatDate } from "../utils/formateDate";
import { useAppSelector } from "../app/hooks";

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
}

const TweetCard: React.FC<TweetCardProps> = ({ tweet }) => {
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const loggedInUserId = useAppSelector((state) => state.auth.user?._id);
  const {
    _id,
    content,
    createdAt,
    owner: {
      avatar: { url: avatarUrl },
      fullname,
      username,
    },
    likes,
  } = tweet;

  useEffect(() => {
    if (loggedInUserId) {
      setIsLiked(likes.includes(loggedInUserId));
    }
  }, [likes, loggedInUserId]);

  return (
    <div className="border-b border-b-zinc-800 flex items-center gap-4 p-3">
      <img className="w-10 rounded-full" src={avatarUrl} alt="" />
      <div className="flex flex-col gap-1 ">
        <h1 className="text-md">
          {fullname}{" "}
          <span className="text-xs text-zinc-500">{formatDate(createdAt)}</span>
        </h1>
        <p className="text-sm">{content}</p>
        <button className="flex items-center gap-2">
          {isLiked === true ? <BiSolidLike size={20} /> : <BiLike size={20} />}
          <span className="text-xs">{likes.length}</span>
        </button>
      </div>
    </div>
  );
};

export default TweetCard;
