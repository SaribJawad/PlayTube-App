import React from "react";
import { Link } from "react-router-dom";
import { formatViews } from "../utils/formatViews";
import { formateDuration } from "../utils/formatDuration";
import { formatDate } from "../utils/getTimeAgo";
import { useAppSelector } from "../app/hooks";
import useRemoveVideoFromPlaylist from "../customHooks/useRemoveVideoFromPlaylist";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";

interface Video {
  _id: string;
  createdAt: string;
  duration: number;
  description: string;
  owner: {
    _id: string;
    avatar: {
      _id?: string;
      public_id?: string;
      url: string;
    };
    subscribersCount?: number;
    username: string;
    fullname?: string;
  };
  thumbnail: {
    _id?: string;
    public_id?: string;
    url: string;
  };
  title: string;
  views: string[] | number;
}

interface VideoThumbnailCard {
  video: Video;
  playlistId?: string;
}

const HorizontalVideoCard: React.FC<VideoThumbnailCard> = ({
  video,
  playlistId,
}) => {
  const {
    _id: videoId,
    description,
    thumbnail: { url: thumbnailUrl },
    title,
    views,
    duration,
    createdAt,
    owner: {
      _id: ownerId,
      username,
      avatar: { url: avatarUrl },
    },
  } = video;

  const { mutateAsync: removePlaylist } = useRemoveVideoFromPlaylist();
  const loggedInUserId = useAppSelector((state) => state.auth.user?._id);
  const queryClient = useQueryClient();
  const viewCount = Array.isArray(views) ? views.length : views;

  const handleRemovePlaylist = () => {
    if (playlistId && videoId)
      removePlaylist(
        { playlistId: playlistId, videoId: videoId },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["playlistDetail"] });
            setTimeout(() => {
              toast.success("Video removed from playlist!");
            }, 500);
          },
        }
      );
  };

  return (
    <div className="lg:h-[220px] custom:h-[200px] overflow-hidden w-full  custom:gap-4 flex mb-4 custom:flex-row flex-col gap-1 custom:pt-3 lg:p-0 sm:border-none  border-b border-zinc-600  ">
      <div className="relative  rounded-xl overflow-hidden hover:rounded-none transition-all duration-300 ease-in-out  lg:w-[380px] w-full custom:w-[350px]   h-full ">
        <Link to={`/videoView/${videoId}`}>
          <img
            className="w-full h-full object-cover"
            src={thumbnailUrl}
            alt=""
          />
          <span className="absolute bottom-2 text-sm bg-black bg-opacity-45 px-[5px] rounded-md right-2 z-5 text-center">
            {formateDuration(duration)}
          </span>
        </Link>
      </div>
      <div className="h-full custom:w-[calc(100%-400px)]  w-full flex flex-col gap-1 ">
        <h1 className="custom:text-lg text-md truncate ">{title}</h1>

        <span className="text-sm text-zinc-500">
          {formatViews(viewCount)} Views · {formatDate(createdAt)}
        </span>
        <div className="flex items-center gap-2 p-1">
          <img className="w-8 h-8 rounded-full" src={avatarUrl} alt="" />
          <span className="text-sm text-zinc-500">{username}</span>
        </div>
        <p className=" text-sm text-zinc-500 pt-5 hidden custom:line-clamp-3">
          {description}
        </p>
        {playlistId && loggedInUserId === ownerId && (
          <button
            onClick={handleRemovePlaylist}
            className="button-animation border border-red-400 px-2 py-1 rounded-2xl m-0 sm:mt-3 text-red-700 bg-opacity-10 bg-red-400  sm:place-self-start place-self-center mb-3"
          >
            Remove
          </button>
        )}
      </div>
    </div>
  );
};

export default HorizontalVideoCard;
