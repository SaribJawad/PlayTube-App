import React from "react";
import { formatViews } from "../utils/formatViews";
import { Link } from "react-router-dom";

interface SubscriberChannelCardProps {
  subscriber: {
    _id: string;
    username: string;
    subscriberCount: number;
    fullname: string;
    avatar: {
      url: string;
    };
  };
}

const SubscriberChannelCard: React.FC<SubscriberChannelCardProps> = ({
  subscriber,
}) => {
  return (
    <div className="p-2 w-full h-[100px] border-b  border-zinc-800 flex items-center justify-between ">
      <div className="flex items-center gap-3">
        <img
          className="w-16 rounded-full"
          src={subscriber.avatar.url}
          alt="avatar"
        />
        <div className="flex flex-col">
          <h1 className="text-lg inline-block">{subscriber.fullname}</h1>
          <p className="text-xs text-zinc-500">@{subscriber.username}</p>
          <span className="text-xs text-zinc-500">
            {formatViews(subscriber?.subscriberCount)} subscribers
          </span>
        </div>
      </div>
      <button className="button-animation px-3 py-[10px]     bg-red-800">
        <Link to={`/profile/${subscriber._id}/${subscriber.username}`}>
          View Channel
        </Link>
      </button>
    </div>
  );
};

export default SubscriberChannelCard;
