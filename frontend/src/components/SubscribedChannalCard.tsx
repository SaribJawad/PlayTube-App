import React from "react";
import { formatViews } from "../utils/formatViews";
import { useAppSelector } from "../app/hooks";

interface SubscribedChannelCardProps {
  subscribedChannel: {
    _id: string;
    username: string;
    fullname: string;
    avatar: {
      url: string;
    };
    subscriberCount: string[];
  };
}

const SubscribedChannalCard: React.FC<SubscribedChannelCardProps> = ({
  subscribedChannel,
}) => {
  const loggedInUserId = useAppSelector((state) => state.auth.user?._id);

  console.log(loggedInUserId, subscribedChannel.subscriberCount);

  return (
    <div className="p-2 w-full h-[100px] border-b  border-zinc-800 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <img
          className="w-16 rounded-full"
          src={subscribedChannel?.avatar?.url}
          alt=""
        />
        <div className="flex flex-col">
          <h1 className="text-lg inline-block">
            {subscribedChannel?.fullname}
          </h1>
          <p className="text-xs text-zinc-500">
            @{subscribedChannel?.username}
          </p>
          <span className="text-xs text-zinc-500">
            {formatViews(subscribedChannel?.subscriberCount.length)} subscribers
          </span>
        </div>
      </div>
      {loggedInUserId &&
      subscribedChannel.subscriberCount.includes(loggedInUserId) ? (
        <button className="button-animation px-3 py-[10px] flex items-center gap-2    bg-red-800">
          Edit
        </button>
      ) : (
        <button className="button-animation px-3 py-[10px] flex items-center gap-2    bg-red-800">
          Subscribe
        </button>
      )}
    </div>
  );
};

export default SubscribedChannalCard;
