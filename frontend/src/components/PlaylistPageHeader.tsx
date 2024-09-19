import React from "react";
import { useAppSelector } from "../app/hooks";

type HandleClose = () => void;

interface PlaylistPageHeaderProps {
  handleClosePopup: HandleClose;
}

const PlaylistPageHeader: React.FC<PlaylistPageHeaderProps> = ({
  handleClosePopup,
}) => {
  const { usersPlaylist } = useAppSelector((state) => state.playlist);
  return (
    <div className="w-full flex md:items-center sm:flex-row flex-col gap-4 justify-between p-5 border-b border-zinc-600">
      <div className="">
        <h1 className="text-xl sm:text-2xl font-bold">Your Playlists</h1>
        <p className="text-sm text-zinc-500">
          Total number of playlists:{" "}
          <span className="font-semibold">{usersPlaylist.length}</span>
        </p>
      </div>

      <button
        onClick={handleClosePopup}
        className="button-animation px-4 py-2 rounded-md text-center w-auto bg-red-700 hover:bg-red-600 transition duration-300"
      >
        Create Playlist
      </button>
    </div>
  );
};

export default PlaylistPageHeader;
