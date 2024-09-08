import React from "react";
import SubscribedChannalCard from "./SubscribedChannalCard";
import useGetUserSubscribedChannel from "../customHooks/useGetUserSubscribedChannel";
import { useAppSelector } from "../app/hooks";

const UserSubscribedChannelSection: React.FC = () => {
  useGetUserSubscribedChannel();
  const subscribedChannels = useAppSelector(
    (state) => state.channels.subscribedChannel
  );

  console.log(subscribedChannels);

  return (
    <div>
      {subscribedChannels &&
        subscribedChannels.map((channel) => (
          <SubscribedChannalCard
            key={channel._id}
            subscribedChannel={channel?.channel}
          />
        ))}
    </div>
  );
};

export default UserSubscribedChannelSection;
