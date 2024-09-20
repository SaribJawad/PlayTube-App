import React from "react";
import useGetPlaylistDetail from "../customHooks/useGetPlaylistDetail";
import { useAppSelector } from "../app/hooks";
import { formatDate } from "../utils/getTimeAgo";
import LoadingSpinner from "../components/LoadingSpinner";
import { Link } from "react-router-dom";
import HorizontalVideoCard from "../components/HorizontalVideoCard ";
import EmptyPlaylistDetail from "../components/EmptyPlaylistDetail";

const PlaylistDetailsPage: React.FC = () => {
  useGetPlaylistDetail();
  const { playlistDetail, loading } = useAppSelector((state) => state.playlist);

  const {
    _id: playlistId = "",
    name = "Untitled Playlist",
    description = "No description available",
    videos = [],
    createdAt = "",
    videoCount = 0,
    owner = { avatar: { url: "" }, username: "", fullname: "", _id: "" },
  } = playlistDetail || {};

  if (loading) {
    return (
      <div className=" w-full flex items-center justify-center min-h-full  sm:pl-[70px] lg:pl-[260px]">
        <LoadingSpinner width="8" height="8" />
      </div>
    );
  }

  if (videos.length === 0) {
    return <EmptyPlaylistDetail />;
  }

  return (
    <div className="bg-black h-auto w-full text-white  sm:pl-[70px] lg:pl-[260px] p-4 sm:pb-0 pb-[70px] pt-[85px] grid 2xl:grid-cols-2 gap-4">
      <div className="border-red-400 w-full   sm:w-[400px] lg:w-[450px] 2xl:w-full  flex flex-col gap-5 ">
        <div className="relative">
          <img
            className="w-full "
            src={
              videos[0]?.thumbnail?.url
                ? videos[0]?.thumbnail?.url
                : "https://t4.ftcdn.net/jpg/04/92/22/93/360_F_492229389_5ve1bCKgYrLRHpCj3o4FAzz60efaZgG0.jpg"
            }
            alt=""
          />

          <div className="w-full border-t flex p-2 items-center justify-between absolute h-[40%] bottom-0 border-white backdrop-blur-sm bg-black/30">
            <div>
              <h1 className="text-md">Playlist</h1>
              <span className="text-xs">{formatDate(createdAt)}</span>
            </div>
            <span className="text-sm">
              {videoCount ? `${videoCount} videos` : "No videos"}
            </span>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <h1 className="text-md">{name}</h1>
          <p className="text-sm text-zinc-500">{description}</p>
        </div>
        <div className="w-fit ">
          <Link
            to={`/profile/${owner._id}/${owner.username}`}
            className="inline-flex  items-center gap-3"
          >
            <img className="w-14 rounded-full" src={owner.avatar.url} alt="" />
            <div className="flex flex-col">
              <h1 className="text-md ">{owner.fullname}</h1>
              <p className="text-sm  text-zinc-500">@{owner.username}</p>
            </div>
          </Link>
        </div>
      </div>

      <div className="w-full  ">
        {videos.map((video) => (
          <HorizontalVideoCard
            video={video}
            key={video._id}
            playlistId={playlistId}
            ownerId={owner._id}
          />
        ))}
      </div>
    </div>
  );
};

export default PlaylistDetailsPage;
