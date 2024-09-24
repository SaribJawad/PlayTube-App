import React from "react";
import { formatViews } from "../utils/formatViews";
import { useAppSelector } from "../app/hooks";
import useToggleSubscribe from "../customHooks/useToggleSubscribe";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";

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
  const queryClient = useQueryClient();
  const { mutateAsync: toggleSubscribe } = useToggleSubscribe();
  const { userId, username: channelUsername } = useParams<{
    userId: string;
    username: string;
  }>();
  const loggedInUserId = useAppSelector((state) => state.auth.user?._id);

  async function handleSubscribe() {
    await toggleSubscribe(
      { channelId: subscribedChannel?._id },
      {
        onSuccess: () => {
          toast.success(
            loggedInUserId &&
              subscribedChannel.subscriberCount.includes(loggedInUserId)
              ? "UnSubscribed!"
              : "Subscribed!"
          );
          queryClient.invalidateQueries({
            queryKey: ["channelDetails", channelUsername],
          });
          queryClient.invalidateQueries({
            queryKey: ["subscribedChannel", userId],
          });
        },
      }
    );
  }

  console.log(
    `/profile/${subscribedChannel?._id}/{${subscribedChannel?.username}`
  );

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

      {loggedInUserId && loggedInUserId === subscribedChannel._id ? (
        <Link
          to={`/profile/${subscribedChannel?._id}/${subscribedChannel?.username}`}
        >
          <button className=" flex items-center gap-2    button-animation px-3 py-2  rounded-md text-center  bg-red-700 hover:bg-red-600 transition duration-300">
            View Channel
          </button>
        </Link>
      ) : (
        <button
          onClick={handleSubscribe}
          className="flex items-center gap-2     button-animation px-3 py-2  rounded-md text-center  bg-red-700 hover:bg-red-600 transition duration-300"
        >
          {loggedInUserId &&
          subscribedChannel.subscriberCount.includes(loggedInUserId)
            ? "Subscribed"
            : "Subscribe"}
        </button>
      )}
    </div>
  );
};

export default SubscribedChannalCard;
