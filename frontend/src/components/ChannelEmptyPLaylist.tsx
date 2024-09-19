import React from "react";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../app/hooks";
import { GoFileDirectory } from "react-icons/go";

const ChannelEmptyPLaylist: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const loggedInUserId = useAppSelector((state) => state.auth.user?._id);
  return (
    <div>
      <div className="flex justify-center flex-col items-center gap-4 pt-14 p-2">
        <span className="w-10 h-10 bg-red-700  flex items-center justify-center rounded-full ">
          <GoFileDirectory />
        </span>
        <h1 className="text-xl">No playlist created.</h1>

        <h3 className="text-sm text-zinc-600 text-center">
          {userId !== loggedInUserId
            ? "  This page has yet to create a  playlist."
            : "You haven't created any playlist yet."}
        </h3>
      </div>
    </div>
  );
};

export default ChannelEmptyPLaylist;
