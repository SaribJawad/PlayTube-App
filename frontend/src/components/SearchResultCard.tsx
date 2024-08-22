import React from "react";
import { Link } from "react-router-dom";
import { formatViews } from "../utils/formatViews";
import { formateDuration } from "../utils/formatDuration";
import { formatDate } from "../utils/formateDate";

interface Video {
  _id: string;
  createdAt: string;
  duration: number;
  description: string;
  owner: {
    _id: string;
    avatar: {
      _id: string;
      public_id: string;
      url: string;
    };
    subscribersCount: number;
    username: string;
  };
  thumbnail: {
    _id: string;
    public_id: string;
    url: string;
  };
  title: string;
  views: number;
}

interface VideoThumbnailCard {
  video: Video;
}

const SearchResultCard: React.FC<VideoThumbnailCard> = ({ video }) => {
  const {
    description,
    thumbnail: { url: thumbnailUrl },
    title,
    views,
    duration,
    createdAt,
    owner: {
      username,
      avatar: { url: avatarUrl },
    },
  } = video;

  return (
    <div className="lg:h-[250px] custom:h-[220px] overflow-hidden w-full  custom:gap-4 flex custom:flex-row flex-col gap-1 custom:pt-3 lg:p-0 p-3">
      <div className="relative  rounded-xl overflow-hidden hover:rounded-none transition-all duration-300 ease-in-out  lg:w-[380px] w-full custom:w-[350px]   h-full ">
        <Link to={""}>
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
        <h1 className="custom:text-lg text-md  ">{title} </h1>
        <span className="text-sm text-zinc-500">
          {formatViews(views)} Views · {formatDate(createdAt)}
        </span>
        <div className="flex items-center gap-2 p-1">
          <img className="w-5 h-5 rounded-full" src={avatarUrl} alt="" />
          <span className="text-sm text-zinc-500">{username}</span>
        </div>
        <p className=" text-sm text-zinc-500 pt-5 hidden custom:line-clamp-3">
          {description}
        </p>
      </div>
    </div>
  );
};

export default SearchResultCard;
