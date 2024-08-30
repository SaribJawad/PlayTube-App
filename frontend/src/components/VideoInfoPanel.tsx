import React, { useState } from "react";
import { BiLike, BiDislike } from "react-icons/bi";
import { IoPersonAddOutline } from "react-icons/io5";
import { VscFileSymlinkDirectory } from "react-icons/vsc";
import { useAppSelector } from "../app/hooks";
import { formatViews } from "../utils/formatViews";
import { formatDate } from "../utils/formateDate";
import useLikeToggleVideo from "../customHooks/useLikeToggleVideo";

const VideoInfoPanel: React.FC = () => {
  const [isOpenDescription, setIsOpenDescription] = useState<boolean>(false);
  const videoInfo = useAppSelector((state) => state.video.video);
  const loggedInUserId = useAppSelector((state) => state.auth.user?._id);
  const { mutate: likeToggleVideo } = useLikeToggleVideo();
  const [isLiked, setIsLiked] = useState<boolean>(false);

  const {
    title = "",
    createdAt = "",
    likes = [],
    description = "",
    owner = {
      username: "",
      avatar: { url: "" },
      subscribers: 0,
      isSubscribed: false,
    },
    views = 0,
  } = videoInfo || {};

  function handleLike() {
    likeToggleVideo();
    if (loggedInUserId) {
      setIsLiked(likes.includes(loggedInUserId) ? false : true);
    }
  }

  return (
    <div id="Video-details" className=" flex flex-col gap-3 p-2">
      <div id="Video-tile-views-uploadetime ">
        <h1 className="text-xl">{title}</h1>
        <p className="text-sm text-zinc-600">
          {formatViews(views)} Views . {formatDate(createdAt)}
        </p>
      </div>
      <div id="likes-subscribe" className="w-full flex justify-between">
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-1" onClick={handleLike}>
            <BiLike
              className="focus:scale-75   transition-transform"
              size={25}
            />{" "}
          </button>
          <span className="text-sm">{likes.length}</span>
          <button disabled={!isLiked} onClick={handleLike}>
            <BiDislike size={25} />{" "}
          </button>
        </div>
        <button className=" flex items-center gap-1">
          <VscFileSymlinkDirectory size={25} />
          <span className="text-sm">Save</span>
        </button>
      </div>
      <div id="profile-subscribebtn" className="flex justify-between">
        <div className="flex items-center gap-2">
          <img
            className="w-12 h-12 rounded-full"
            src={owner.avatar.url}
            alt=""
          />
          <div>
            <h2 className="text-md">{owner.username}</h2>
            <p className="text-xs text-zinc-500">
              {formatViews(owner.subscribers)} Subscribers
            </p>
          </div>
        </div>
        <button className="flex items-center gap-1">
          <IoPersonAddOutline size={25} />
          <span className="text-sm">Subscribe</span>
        </button>
      </div>
      <div
        id="description"
        className=" w-full p-2 h-auto bg-zinc-900 rounded-xl"
      >
        <p
          className={`${isOpenDescription ? "block" : "hidden"} pb-8 text-sm `}
        >
          {description}
        </p>
        <button
          onClick={() => setIsOpenDescription((prev) => !prev)}
          className="flex mx-auto "
        >
          {isOpenDescription ? "Hide description" : "Show description"}
        </button>
      </div>
    </div>
  );
};

export default VideoInfoPanel;
