import React, { useState } from "react";
import ChannelHeader from "../components/ChannelHeader";
import useGetAllVideos from "../customHooks/useGetAllVideos";
import { useParams } from "react-router-dom";
import UserVideoSection from "../components/UserVideoSection";
import useGetChannelDetails from "../customHooks/useGetChannelDetails";
import ChannelNavigation from "../components/ChannelNavigation";
import UserTweetSection from "../components/UserTweetSection";
import UserSubscribedChannelSection from "../components/UserSubscribedChannelSection";

const ChannelPage: React.FC = () => {
  const { userId, username } = useParams<{
    userId: string;
    username: string;
  }>();
  const [activeTab, setActiveTab] = useState<
    "videos" | "tweets" | "subscribed" | "playlists"
  >("videos");
  const {} = useGetAllVideos({
    page: 1,
    limit: 10,
    sortBy: "createdAt",
    sortType: "asc",
    userId,
  });
  const { data, isLoading, error } = useGetChannelDetails();

  const handleTabClick = (
    tab: "videos" | "tweets" | "subscribed" | "playlists"
  ) => {
    setActiveTab(tab);
  };

  return (
    <div className=" w-full text-white pt-20 bg-black   sm:pl-[70px] lg:pl-[260px] pr-3">
      <ChannelHeader userDetails={data?.data} />
      <ChannelNavigation
        handleTabClick={handleTabClick}
        activeTab={activeTab}
      />
      <div className=" pt-4 bg-black sm:pb-0 pb-[70px]">
        {activeTab === "videos" && <UserVideoSection />}
        {activeTab === "tweets" && <UserTweetSection />}
        {activeTab === "subscribed" && <UserSubscribedChannelSection />}
        {activeTab === "playlists" && "playlist"}
      </div>
    </div>
  );
};

export default ChannelPage;
