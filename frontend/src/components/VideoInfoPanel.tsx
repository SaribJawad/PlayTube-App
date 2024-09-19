import React, { useEffect, useState } from "react";
import { BiLike } from "react-icons/bi";
import { IoPersonAddOutline } from "react-icons/io5";
import { BiSolidLike } from "react-icons/bi";

import { VscFileSymlinkDirectory } from "react-icons/vsc";
import { useAppSelector } from "../app/hooks";
import { formatViews } from "../utils/formatViews";
import { formatDate } from "../utils/getTimeAgo";
import useLikeToggleVideo from "../customHooks/useLikeToggleVideo";
import { Link, useParams } from "react-router-dom";
import AddVideoToPlaylistPopup from "./AddVideoToPlaylistPopup";
import useAddVideoToPlaylist from "../customHooks/useAddVideoToPlaylist";
import { useQueryClient } from "@tanstack/react-query";
import { MdFileDownloadDone } from "react-icons/md";

import { toast } from "react-toastify";
import useGetUsersPlaylist from "../customHooks/useGetUsersPlaylist";

const VideoInfoPanel: React.FC = () => {
  const loggedInUserId = useAppSelector((state) => state.auth.user?._id);
  const { videoId } = useParams<{ videoId: string }>();
  useGetUsersPlaylist(loggedInUserId);
  const usersPlaylist = useAppSelector((state) => state.playlist.usersPlaylist);
  const queryClient = useQueryClient();
  const [isOpenDescription, setIsOpenDescription] = useState<boolean>(false);
  const { mutateAsync: addVideoToPlaylist } = useAddVideoToPlaylist();
  const videoInfo = useAppSelector((state) => state.video.video);
  const { mutate: likeToggleVideo } = useLikeToggleVideo();
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [isOpenSaveVideoToPlaylist, setIsOpenSaveVideoToPlaylist] =
    useState<boolean>(false);

  const isVideoSaved = usersPlaylist.some((playlist) =>
    playlist.videos?.some((video) => video._id === videoId)
  );
  const isOwner = usersPlaylist.some(
    (playlist) => playlist.owner === loggedInUserId
  );

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
      _id: "",
    },
    views = [],
  } = videoInfo || {};

  useEffect(() => {
    if (loggedInUserId) {
      setIsLiked(likes.includes(loggedInUserId));
    }
  }, [likes, loggedInUserId]);

  function handleLike() {
    likeToggleVideo();
    if (loggedInUserId) {
      setIsLiked(likes.includes(loggedInUserId) ? false : true);
    }
  }

  function handleCloseAddVideoPopup() {
    setIsOpenSaveVideoToPlaylist((prev) => !prev);
  }

  function handleSaveVideoToPlaylist(selectedPlaylist: string) {
    addVideoToPlaylist(selectedPlaylist, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["usersPlaylist"],
          exact: false,
        });
        setTimeout(() => {
          toast.success("Video added to playlist!");
        }, 500);
      },
    });
  }

  return (
    <div id="Video-details" className=" flex flex-col gap-3 p-2">
      <div id="Video-tile-views-uploadetime ">
        <h1 className="text-xl">{title}</h1>
        <p className="text-sm text-zinc-600">
          {views.length > 0 ? formatViews(views.length) : 0} Views .{" "}
          {formatDate(createdAt)}
        </p>
      </div>
      <div id="likes-subscribe" className="w-full flex justify-between">
        <button className="flex items-center gap-3" onClick={handleLike}>
          {isLiked ? <BiSolidLike size={25} /> : <BiLike size={25} />}
          <span className="text-sm">{likes.length}</span>
        </button>

        {isVideoSaved && isOwner ? (
          <button className=" flex items-center gap-1">
            <MdFileDownloadDone size={25} />
            <span className="text-sm">Saved</span>
          </button>
        ) : (
          <button
            onClick={handleCloseAddVideoPopup}
            className=" flex items-center gap-1"
          >
            <VscFileSymlinkDirectory size={25} />
            <span className="text-sm">Save</span>
          </button>
        )}
      </div>
      <div id="profile-subscribebtn" className="flex justify-between">
        <div className="flex items-center gap-2">
          <Link to={`/profile/${owner._id}/${owner.username}`}>
            <img
              className="w-12 h-12 rounded-full"
              src={owner.avatar.url}
              alt=""
            />
          </Link>
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
      {isOpenSaveVideoToPlaylist && (
        <AddVideoToPlaylistPopup
          handleClosePopup={handleCloseAddVideoPopup}
          handleSave={handleSaveVideoToPlaylist}
        />
      )}
    </div>
  );
};

export default VideoInfoPanel;
