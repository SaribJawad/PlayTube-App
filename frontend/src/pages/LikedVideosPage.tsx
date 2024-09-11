import React from "react";
import LikedVideoThumbnailCard from "../components/LikedVideoThumbnailCard";
import { FaHeart } from "react-icons/fa";
import useGetLikedVideos from "../customHooks/useGetLikedVideos";
import { useAppSelector } from "../app/hooks";
import LoadingSpinner from "../components/LoadingSpinner";

const LikedVideosPage: React.FC = () => {
  useGetLikedVideos();
  const { likedVideos, loading } = useAppSelector((state) => state.video);

  if (loading) {
    return (
      <div className=" w-full flex items-center justify-center min-h-full  sm:pl-[70px] lg:pl-[260px]">
        <LoadingSpinner width="8" height="8" />
      </div>
    );
  }

  return (
    <div className="bg-black text-white min-h-full w-full sm:pl-[70px] lg:pl-[260px] p-4 sm:pb-0 pb-[70px] pt-[90px]">
      <div className="py-6 px-4 bg-black text-center flex flex-col items-center">
        <FaHeart className="text-[#B91C1C] text-4xl mb-2 " />
        <h1 className="text-3xl font-semibold text-white">Liked Videos</h1>
        <p className="text-zinc-500 mt-2">
          {likedVideos.length === 0
            ? "You haven't liked any videos yet!"
            : "Here are all the videos you liked!"}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 2xl:grid-cols-4 xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-2 mt-5">
        {likedVideos.map((likedVideo) => (
          <LikedVideoThumbnailCard
            key={likedVideo.video._id}
            video={likedVideo.video}
          />
        ))}
      </div>
    </div>
  );
};

export default LikedVideosPage;
