import React, { useEffect } from "react";
import VideoThumbnailCard from "./VideoThumbnailCard";
import useGetAllVideos from "../customHooks/useGetAllVideos";
import { useAppSelector } from "../app/hooks";

const Main: React.FC = () => {
  useGetAllVideos();
  const video = useAppSelector((state) => state.video);

  return (
    <div className="bg-black min-h-full w-full sm:pl-[70px] lg:pl-[260px] p-4 sm:pb-0 pb-[70px] ">
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        {video.allVideos.map((video) => (
          <VideoThumbnailCard video={video} key={video._id} />
        ))}
      </div>
    </div>
  );
};

export default Main;
