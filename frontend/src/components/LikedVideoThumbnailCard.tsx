import React from "react";
import { Link } from "react-router-dom";
import { formatViews } from "../utils/formatViews";
import { formateDuration } from "../utils/formatDuration";

interface VideoDetails {
  _id: string;
  thumbnail: {
    url: string;
  };
  title: string;
  duration: number;
  views: string[];
  owner: {
    _id: string;
    username: string;
    fullname: string;
    avatar: {
      url: string;
    };
  };
}

interface LikedVideo {
  video: VideoDetails;
}

const LikedVideoThumbnailCard: React.FC<LikedVideo> = ({ video }) => {
  return (
    <div className="h-[270px] w-[100%] ">
      <div className="h-[72%] relative rounded-xl overflow-hidden hover:rounded-none transition-all duration-300 ease-in-out">
        <Link to={`/videoView/${video._id}`}>
          <img
            className=" object-cover w-full h-full"
            src={video.thumbnail.url}
            alt="liked-video-thumbnail"
          />
          <span className="absolute bottom-2 text-sm bg-black bg-opacity-45 px-[5px] rounded-md right-2 z-5 text-center">
            {formateDuration(video.duration)}
          </span>
        </Link>
      </div>
      <div className="h-[28%] flex items-center gap-2 p-2">
        <div className="w-[40px] h-[40px] rounded-full overflow-hidden">
          <Link
            to={`/profile/${video.owner._id}/${video.owner.username}`}
            className=""
          >
            <img
              className="h-full w-full  object-cover"
              src={video.owner.avatar.url}
              alt=""
            />
          </Link>
        </div>
        <div className="w-[81%] h-full">
          <Link to={`/videoView/${video._id}`}>
            <h1 className=" text-sm mid-w-full truncate">{video.title}</h1>
            <h2 className="inline-block text-[13px] text-zinc-500 hover:text-white">
              {video.owner.username}
            </h2>
            <h3 className="text-[12px] text-zinc-500 ">
              {formatViews(video.views.length)} views
            </h3>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LikedVideoThumbnailCard;
