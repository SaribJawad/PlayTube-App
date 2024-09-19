import React from "react";
import ChannelEmptyPLaylist from "./ChannelEmptyPLaylist";
import ChannelPlaylistCard from "./ChannelPlaylistCard";
import useGetUsersPlaylist from "../customHooks/useGetUsersPlaylist";
import { useAppSelector } from "../app/hooks";
import LoadingSpinner from "./LoadingSpinner";

const UserPlaylistSection: React.FC = () => {
  useGetUsersPlaylist();
  const { usersPlaylist, loading } = useAppSelector((state) => state.playlist);

  if (loading) {
    return (
      <div className=" w-full h-full flex items-center justify-center  ">
        <LoadingSpinner width="8" height="8" />
      </div>
    );
  }

  if (usersPlaylist.length === 0) {
    return <ChannelEmptyPLaylist />;
  }

  if (usersPlaylist)
    return (
      <div className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 md:gap-4 gap-7">
        {usersPlaylist.map((playlist) => (
          <ChannelPlaylistCard key={playlist._id} playlist={playlist} />
        ))}
      </div>
    );
};

export default UserPlaylistSection;
