import React from "react";
import VideoThumbnailCard from "./VideoThumbnailCard";

const Main: React.FC = () => {
  return (
    <div className="bg-black min-h-full w-full sm:pl-[70px] lg:pl-[260px] p-4 sm:pb-0 pb-[70px] ">
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        <VideoThumbnailCard />
        <VideoThumbnailCard />
        <VideoThumbnailCard />
        <VideoThumbnailCard />
        <VideoThumbnailCard />
        <VideoThumbnailCard />
        <VideoThumbnailCard />
        <VideoThumbnailCard />
      </div>
    </div>
  );
};

export default Main;
