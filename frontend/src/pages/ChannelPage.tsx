import React, { useEffect, useState } from "react";
import ChannelHeader from "../components/ChannelHeader";
import useGetAllVideos from "../customHooks/useGetAllVideos";
import { useParams } from "react-router-dom";
import UserVideoSection from "../components/UserVideoSection";
import useGetChannelDetails from "../customHooks/useGetChannelDetails";
import ChannelNavigation from "../components/ChannelNavigation";
import UserTweetSection from "../components/UserTweetSection";
import UserSubscribedChannelSection from "../components/UserSubscribedChannelSection";
import LoadingSpinner from "../components/LoadingSpinner";
import UserPersonalInformationSection from "../components/UserPersonalInformationSection";
import { Flip, ToastContainer } from "react-toastify";
import UserUpdatePasswordSection from "../components/UserUpdatePasswordSection";

const ChannelPage: React.FC = () => {
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const { userId, username } = useParams<{
    userId: string;
    username: string;
  }>();

  useGetAllVideos({
    page: 1,
    limit: 10,
    sortBy: "createdAt",
    sortType: "asc",
    userId,
  });

  const [activeTab, setActiveTab] = useState<
    | "videos"
    | "tweets"
    | "subscribed"
    | "playlists"
    | "personalInformation"
    | "changePassword"
  >("videos");

  const { data, isLoading, error } = useGetChannelDetails();

  const handleTabClick = (
    tab:
      | "videos"
      | "tweets"
      | "subscribed"
      | "playlists"
      | "personalInformation"
      | "changePassword"
  ) => {
    setActiveTab(tab);
  };

  const toggleEdit = () => {
    setIsEdit((prev) => !prev);
  };

  useEffect(() => {
    if (isEdit) {
      setActiveTab("personalInformation");
    } else {
      setActiveTab("videos");
    }
  }, [isEdit]);

  if (isLoading) {
    return (
      <div className=" w-full flex items-center justify-center min-h-full  sm:pl-[70px] lg:pl-[260px]">
        <LoadingSpinner width="8" height="8" />
      </div>
    );
  }

  return (
    <div className=" w-full text-white pt-20 bg-black   sm:pl-[70px] lg:pl-[260px] pr-3 pl-3">
      <ChannelHeader
        userDetails={data?.data}
        isEdit={isEdit}
        toggleEdit={toggleEdit}
      />
      <ChannelNavigation
        isEdit={isEdit}
        handleTabClick={handleTabClick}
        activeTab={activeTab}
      />
      {!isEdit ? (
        <div className=" pt-4 bg-black sm:pb-0 pb-[70px]">
          {activeTab === "videos" && <UserVideoSection />}
          {activeTab === "tweets" && <UserTweetSection />}
          {activeTab === "subscribed" && <UserSubscribedChannelSection />}
          {activeTab === "playlists" && "playlist"}
        </div>
      ) : (
        <div className=" pt-4 bg-black sm:pb-0 pb-[70px]">
          {activeTab === "personalInformation" && (
            <UserPersonalInformationSection />
          )}
          {activeTab === "changePassword" && <UserUpdatePasswordSection />}
        </div>
      )}
    </div>
  );
};

export default ChannelPage;
