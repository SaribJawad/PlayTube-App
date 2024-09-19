import React, { useState } from "react";
import { formatDate } from "../utils/getTimeAgo";
import { Link } from "react-router-dom";
import { useAppSelector } from "../app/hooks";
import useDeletePlaylist from "../customHooks/useDeletePlaylist";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import EditPlaylistPopup from "./EditPlaylistPopup";

interface video {
  _id: string;
  thumbnail: {
    url: string;
    public_id: string;
    _id: string;
  };
}

interface ChannelPlaylistCardProps {
  playlist: {
    _id: string;
    name: string;
    description: string;
    videos?: video[];
    videoCount: number;
    owner: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
  };
}

const ChannelPlaylistCard: React.FC<ChannelPlaylistCardProps> = ({
  playlist,
}) => {
  const queryClient = useQueryClient();
  const { mutateAsync: deletePlaylist } = useDeletePlaylist();
  const loggedInUserId = useAppSelector((state) => state.auth.user?._id);
  const [isOpenEditPlaylistModel, setIsOpenEditPlaylistModel] =
    useState<boolean>(false);

  const currentPlaylist = {
    name: playlist.name,
    description: playlist.description,
  };

  const handleDeletePlaylist = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    event.preventDefault();
    deletePlaylist(playlist._id, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["usersPlaylist"],
          exact: false,
        });
        setTimeout(() => {
          toast.success("Playlist deleted!");
        }, 500);
      },
    });
  };

  function handleCloseEditPlaylistPopup(
    event?: React.MouseEvent<HTMLButtonElement>
  ): void {
    event?.stopPropagation();
    event?.preventDefault();
    setIsOpenEditPlaylistModel((prev) => !prev);
  }

  const placeholderImageUrl =
    "https://t4.ftcdn.net/jpg/04/92/22/93/360_F_492229389_5ve1bCKgYrLRHpCj3o4FAzz60efaZgG0.jpg";

  return (
    <div>
      <Link to={`/playlistDetails/${playlist._id}`}>
        <div className="flex flex-col gap-2 border-b border-zinc-600">
          <div className="relative">
            <img
              className="w-full"
              src={
                playlist.videos && playlist?.videos[0]?.thumbnail.url
                  ? playlist?.videos[0]?.thumbnail.url
                  : placeholderImageUrl
              }
              alt="Playlist Thumbnail"
            />

            {!playlist.videoCount && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 text-white text-xl">
                <p>No Videos in this Playlist</p>
              </div>
            )}

            <div className="w-full border-t flex p-2 items-center justify-between absolute h-[40%] bottom-0 border-white backdrop-blur-sm bg-black/30">
              <div>
                <h1 className="text-md">Playlist</h1>
                <span className="text-xs">
                  {formatDate(playlist.createdAt)}
                </span>
              </div>
              <span className="text-sm">
                {playlist.videoCount
                  ? `${playlist.videoCount} videos`
                  : "No videos"}
              </span>
            </div>
          </div>
          <div className="flex items-end justify-between mb-2">
            <div className="flex flex-col gap-1">
              <h1 className="text-md">{playlist.name}</h1>
              <p className="text-sm text-zinc-500">{playlist.description}</p>
            </div>
            {loggedInUserId === playlist.owner && (
              <div className="flex items-center gap-2">
                <button
                  onClick={handleCloseEditPlaylistPopup}
                  className="button-animation border border-green-400 px-2 py-1 rounded-2xl m-0 sm:mt-3 text-green-700 bg-opacity-10 bg-green-400  sm:place-self-start place-self-center mb-3"
                >
                  Edit
                </button>
                <button
                  onClick={handleDeletePlaylist}
                  className="button-animation border border-red-400 px-2 py-1 rounded-2xl m-0 sm:mt-3 text-red-700 bg-opacity-10 bg-red-400  sm:place-self-start place-self-center mb-3"
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        </div>
      </Link>
      {isOpenEditPlaylistModel && (
        <EditPlaylistPopup
          handleClosePopup={handleCloseEditPlaylistPopup}
          currentPlaylist={currentPlaylist}
          playlistId={playlist._id}
        />
      )}
    </div>
  );
};

export default ChannelPlaylistCard;
