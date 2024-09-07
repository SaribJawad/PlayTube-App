import React from "react";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../app/hooks";
import { FaPlay } from "react-icons/fa";
import { GoPlus } from "react-icons/go";

type HandleClose = () => void;

interface ChannelEmptyVideo {
  handleClosePopup: HandleClose;
}

const ChannelEmptyVideo: React.FC<ChannelEmptyVideo> = ({
  handleClosePopup,
}) => {
  const { userId } = useParams<{ userId: string }>();
  const loggedInUserId = useAppSelector((state) => state.auth.user?._id);

  return (
    <div className="flex justify-center flex-col items-center gap-4 pt-10 p-2">
      <span className="w-10 h-10 bg-red-700  flex items-center justify-center rounded-full ">
        <FaPlay />
      </span>
      <h1 className="text-xl">No videos uploaded.</h1>

      <h3 className="text-sm text-zinc-600 text-center">
        {userId !== loggedInUserId
          ? "  This page has yet to upload a video. Search another page in order to find more videos"
          : "You haven't posted any videos yet. Start uploading to see your videos here."}
      </h3>
      {userId === loggedInUserId && (
        <button
          className="button-animation px-3 mt-5 py-[10px] flex items-center gap-1    bg-red-800"
          onClick={handleClosePopup}
        >
          <span>
            <GoPlus />
          </span>
          New Video
        </button>
      )}
    </div>
  );
};

export default ChannelEmptyVideo;
