import React from "react";
import { GoPeople } from "react-icons/go";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../app/hooks";

const ChannelEmptyTweet: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const loggedInUserId = useAppSelector((state) => state.auth.user?._id);

  return (
    <div className="flex justify-center flex-col items-center gap-4 pt-5 p-2">
      <span className="w-10 h-10 bg-red-700  flex items-center justify-center rounded-full ">
        <GoPeople />
      </span>
      <h1 className="text-xl">No tweets posted.</h1>

      <h3 className="text-sm text-zinc-600 text-center">
        {userId !== loggedInUserId
          ? "  This page has yet to post a tweet."
          : "You haven't posted any tweets yet. Start uploading to see your tweets here."}
      </h3>
    </div>
  );
};

export default ChannelEmptyTweet;
