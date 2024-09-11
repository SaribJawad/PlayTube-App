import React from "react";
import { Link } from "react-router-dom";
import { formateDuration } from "../utils/formatDuration";
import { formatViews } from "../utils/formatViews";

interface WatchedHistoryVideoCardProps {
  video: {
    _id: string;
    thumbnail: {
      url: string;
    };
    title: string;
    description: string;
    duration: number;
    views: string[];
    owner: {
      _id: string;
      username: string;
      avatar: {
        url: string;
      };
    };
  };
}

const WatchedHistoryVideoCard: React.FC<WatchedHistoryVideoCardProps> = ({
  video,
}) => {
  return (
    <div className="lg:h-[220px] custom:h-[220px] overflow-hidden w-full  custom:gap-4 flex custom:flex-row flex-col gap-1 custom:pt-3 lg:p-0 p-3 ">
      <div className="relative  rounded-xl overflow-hidden hover:rounded-none transition-all duration-300 ease-in-out  lg:w-[380px] w-full custom:w-[350px]   h-full">
        <Link to={""}>
          <img
            className="w-full h-full object-cover"
            src={video.thumbnail.url}
            alt="video-thumbnail"
          />
          <span className="absolute bottom-2 text-sm bg-black bg-opacity-45 px-[5px] rounded-md right-2 z-5 text-center">
            {formateDuration(video.duration)}
          </span>
        </Link>
      </div>
      <div className="h-full custom:w-[calc(100%-400px)]  w-full flex flex-col gap-1 ">
        <h1 className="custom:text-lg text-md  ">{video.title}</h1>
        <span className="text-sm text-zinc-500">
          {video.views.length ? formatViews(video.views.length) : 0} Views
        </span>
        <div className="flex items-center gap-2 p-1">
          <img
            className="w-5 h-5 rounded-full"
            src={video.owner.avatar.url}
            alt=""
          />
          <span className="text-sm text-zinc-500">@{video.owner.username}</span>
        </div>
        <p className=" text-sm text-zinc-500 pt-5 hidden custom:line-clamp-3">
          {video.description}
        </p>
      </div>
    </div>
  );
};

export default WatchedHistoryVideoCard;
