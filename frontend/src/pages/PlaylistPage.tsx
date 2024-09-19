import React, { useState } from "react";
import useGetUsersPlaylist from "../customHooks/useGetUsersPlaylist";
import { useAppSelector } from "../app/hooks";
import ChannelPlaylistCard from "../components/ChannelPlaylistCard";
import LoadingSpinner from "../components/LoadingSpinner";
import PlaylistPageHeader from "../components/PlaylistPageHeader";
import CreatePlaylistPopup from "../components/CreatePlaylistPopup";

const PlaylistPage: React.FC = () => {
  useGetUsersPlaylist();
  const [isOpenCreatePlaylistModel, setIsOpenCreatePlaylistModel] =
    useState<boolean>(false);

  const { loading, usersPlaylist } = useAppSelector((state) => state.playlist);

  function handleClosePlaylistPopup(): void {
    setIsOpenCreatePlaylistModel((prev) => !prev);
  }

  if (loading) {
    return (
      <div className=" w-full flex items-center justify-center min-h-full  sm:pl-[70px] lg:pl-[260px]">
        <LoadingSpinner width="8" height="8" />
      </div>
    );
  }

  return (
    <div className="bg-black text-white min-h-full w-full sm:pl-[70px] lg:pl-[260px] p-4 sm:pb-0 pb-[70px] pt-[85px]">
      <PlaylistPageHeader handleClosePopup={handleClosePlaylistPopup} />
      <div className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 md:gap-4 gap-7 mt-3">
        {usersPlaylist.map((playlist) => (
          <ChannelPlaylistCard playlist={playlist} key={playlist._id} />
        ))}
      </div>
      {isOpenCreatePlaylistModel && (
        <CreatePlaylistPopup handleClosePopup={handleClosePlaylistPopup} />
      )}
    </div>
  );
};

export default PlaylistPage;
