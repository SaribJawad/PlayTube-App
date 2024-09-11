import React from "react";
import SubscribedChannalCard from "./SubscribedChannalCard";
import useGetUserSubscribedChannel from "../customHooks/useGetUserSubscribedChannel";
import { useAppSelector } from "../app/hooks";
import EmptySubscribedSection from "./EmptySubscribedSection";
import LoadingSpinner from "./LoadingSpinner";

const UserSubscribedChannelSection: React.FC = () => {
  const { isLoading } = useGetUserSubscribedChannel();
  const subscribedChannels = useAppSelector(
    (state) => state.channels.subscribedChannel
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center pt-5">
        <LoadingSpinner width="8" height="8" />
      </div>
    );
  }

  return (
    <div>
      {subscribedChannels && subscribedChannels.length === 0 ? (
        <EmptySubscribedSection />
      ) : (
        subscribedChannels.map((channel) => (
          <SubscribedChannalCard
            key={channel._id}
            subscribedChannel={channel?.channel}
          />
        ))
      )}
    </div>
  );
};

export default UserSubscribedChannelSection;
