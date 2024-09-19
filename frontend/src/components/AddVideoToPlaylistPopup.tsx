import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import { useAppSelector } from "../app/hooks";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import useGetUsersPlaylist from "../customHooks/useGetUsersPlaylist";

interface Playlist {
  _id: string;
  name: string;
}

interface AddVideoToPlaylistPopupProps {
  handleClosePopup: () => void;
  handleSave: (selectedPlaylist: string) => void;
}

const AddVideoToPlaylistPopup: React.FC<AddVideoToPlaylistPopupProps> = ({
  handleClosePopup,
  handleSave,
}) => {
  const loggedInUserId = useAppSelector((state) => state.auth.user?._id);

  const [selectedPlaylists, setSelectedPlaylists] = useState<string>();
  const { usersPlaylist } = useAppSelector((state) => state.playlist);

  const handleCheckboxChange = (playlistId: string) => {
    setSelectedPlaylists(playlistId);
  };

  const handleSaveClick = () => {
    if (selectedPlaylists === "") {
      toast.error("Please select at least one playlist.");
      return;
    }

    if (selectedPlaylists) handleSave(selectedPlaylists);
    handleClosePopup();
  };

  const handlePopupClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={handleClosePopup}
    >
      <div
        className="w-[80%] sm:w-[60%] lg:w-[40%] h-auto flex flex-col items-center bg-black border border-zinc-700 relative p-5 z-60"
        onClick={handlePopupClick}
      >
        <div className="flex pb-3 w-full justify-between border-b border-b-zinc-700">
          <h1 className="text-lg font-semibold">Choose playlist</h1>
          <button onClick={handleClosePopup}>
            <IoClose size={30} />
          </button>
        </div>

        <div className="w-full mt-4">
          {usersPlaylist.length > 0 ? (
            usersPlaylist.map((playlist: Playlist) => (
              <label
                key={playlist._id}
                className="flex items-center gap-2 mb-2 text-white"
              >
                <input
                  type="checkbox"
                  value={playlist._id}
                  onChange={() => handleCheckboxChange(playlist._id)}
                />
                <span className="capitalize">{playlist.name}</span>
              </label>
            ))
          ) : (
            <p className="text-gray-500">No playlists found.</p>
          )}
        </div>

        <div className="flex justify-end w-full mt-4">
          {usersPlaylist.length > 0 ? (
            <button
              onClick={handleSaveClick}
              className="button-animation px-3 py-[5px] text-center bg-red-800  mt-2"
            >
              Save
            </button>
          ) : (
            <Link to={`/playlist/${loggedInUserId}`}>
              <button className="button-animation px-3 py-[5px] text-center bg-red-800  mt-2">
                Create playlist
              </button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddVideoToPlaylistPopup;
