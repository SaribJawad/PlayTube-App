import React from "react";
import { MdPeopleAlt } from "react-icons/md";
import SubscriberChannelCard from "../components/SubscriberChannelCard";
import { useAppSelector } from "../app/hooks";
import useGetChannelSubscribers from "../customHooks/useGetChannelSubscribers";
import LoadingSpinner from "../components/LoadingSpinner";

const ChannelSubscribersPage: React.FC = () => {
  const { isLoading, error } = useGetChannelSubscribers();
  const subscribers = useAppSelector(
    (state) => state.channels.channelSubscribers
  );

  if (isLoading) {
    return (
      <div className="flex pt-28 justify-center sm:pl-[70px] lg:pl-[260px]">
        <LoadingSpinner width="8" height="8" />
      </div>
    );
  }

  return (
    <div className=" w-full text-white pt-20 bg-black   sm:pl-[70px] lg:pl-[260px] pr-3">
      <div className="py-8 px-4 bg-black text-center flex flex-col items-center">
        <MdPeopleAlt className=" text-4xl mb-2 " />
        <h1 className="text-3xl font-semibold text-white">
          Channel subscriber's
        </h1>
        <p className="text-zinc-500 mt-2">
          {subscribers.length === 0
            ? "You have no subscriber right now."
            : "Here are all the subscribers you have!"}
        </p>
      </div>
      {subscribers &&
        subscribers.map((channel) => (
          <SubscriberChannelCard
            key={channel._id}
            subscriber={channel.subscriber}
          />
        ))}
    </div>
  );
};

export default ChannelSubscribersPage;
