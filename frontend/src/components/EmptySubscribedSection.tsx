import React from "react";
import { MdPeopleAlt } from "react-icons/md";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../app/hooks";

const EmptySubscribedSection: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const loggedInUserId = useAppSelector((state) => state.auth.user?._id);

  return (
    <div className="flex justify-center flex-col items-center gap-4 pt-14 p-2">
      <span className="w-10 h-10 bg-red-700  flex items-center justify-center rounded-full ">
        <MdPeopleAlt />
      </span>
      <h1 className="text-xl">No subscribed channels.</h1>

      <h3 className="text-sm text-zinc-600 text-center">
        {userId !== loggedInUserId
          ? "  This page has no subscribed channels."
          : "You haven't subscribed any channel yet, Subscribe to see channels here."}
      </h3>
    </div>
  );
};

export default EmptySubscribedSection;
