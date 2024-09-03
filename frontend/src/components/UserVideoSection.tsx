import React, { useState } from "react";
import VideoThumbnailCard from "./VideoThumbnailCard";
import { useAppSelector } from "../app/hooks";
import LoadingSpinner from "./LoadingSpinner";
import ChannelEmptyVideo from "./ChannelEmptyVideo";
import UploadVideoPopup from "./UploadVideoPopup";

const UserVideoSection: React.FC = () => {
  const [isOpenVideoModel, setIsOpenModel] = useState<boolean>();
  const { channelVideos, loading } = useAppSelector((state) => state.video);

  function handleClosePopup(): void {
    setIsOpenModel((prev) => !prev);
  }

  if (loading) {
    return (
      <div className=" flex justify-center w-full h-full">
        <LoadingSpinner width="8" height="8" />
      </div>
    );
  }

  if (channelVideos.length === 0 && !loading) {
    return (
      <>
        <ChannelEmptyVideo />
      </>
    );
  }

  return (
    <>
      <div
        className="relative grid gap-4 grid-cols-1 sm:grid-cols-2 
      sm:pb-0 pb-[70px] bg-black
      md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4"
      >
        {channelVideos.map((video) => (
          <VideoThumbnailCard video={video} key={video?._id} />
        ))}
      </div>
      {isOpenVideoModel && (
        <UploadVideoPopup handleClosePopup={handleClosePopup} />
      )}
    </>
  );
};

export default UserVideoSection;
