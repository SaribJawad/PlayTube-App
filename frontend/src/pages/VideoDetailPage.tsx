import React from "react";
import VideoThumbnailCard from "../components/VideoThumbnailCard";
import { useAppSelector } from "../app/hooks";
import useGetAllVideos from "../customHooks/useGetAllVideos";
import VideoDisplay from "../components/VideoDisplay";
import VideoInfoPanel from "../components/VideoInfoPanel";
import CommentPanel from "../components/CommentPanel";
import useGetVideo from "../customHooks/useGetVideo";
import LoadingSpinner from "../components/LoadingSpinner";

const VideoDetailPage: React.FC = () => {
  useGetAllVideos({ page: 1, limit: 10, sortBy: "createdAt", sortType: "asc" });
  const { isLoading } = useGetVideo();

  const recommendedVideo = useAppSelector((state) => state.video.allVideos);

  if (isLoading) {
    return (
      <div className=" w-full flex items-center justify-center min-h-full  sm:pl-[70px] lg:pl-[260px]">
        <LoadingSpinner width="8" height="8" />
      </div>
    );
  }

  return (
    <div className="pt-20 p-2 bg-black text-white min-h-full w-full sm:pl-[60px] lg:pl-[255px]  sm:pb-0 pb-[70px]  flex customVideoView:flex-row flex-col lg:gap-3 ">
      <div className="customVideoView:w-[75%] w-full h-full flex flex-col gap-3  border-red-500">
        <VideoDisplay />
        <VideoInfoPanel />
        <CommentPanel />
      </div>
      <div className="customVideoView:w-[25%] customVideoView:flex flex-col grid md:grid-cols-2 xl:grid-cols-3 grid-cols-1 gap-5 w-full p-2 h-full  border-yellow-50">
        {recommendedVideo.map((video) => (
          <VideoThumbnailCard key={video._id} video={video} />
        ))}
      </div>
    </div>
  );
};

export default VideoDetailPage;
