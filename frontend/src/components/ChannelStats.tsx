import React from "react";
import { BiLike } from "react-icons/bi";
import { FiEye } from "react-icons/fi";
import { GoPerson } from "react-icons/go";
import useGetChannelStats from "../customHooks/useGetChannelStats";
import { useAppSelector } from "../app/hooks";
import { formatViews } from "../utils/formatViews";
import LoadingSpinner from "./LoadingSpinner";

const ChannelStats: React.FC = () => {
  useGetChannelStats();
  const { channelStats, loading } = useAppSelector((state) => state.channels);

  if (loading) {
    return (
      <div className="w-full flex items-center justify-center min-h-[180px]  ">
        <LoadingSpinner width="8" height="8" />
      </div>
    );
  }

  if (channelStats)
    return (
      <div className="w-full  h-auto grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 p-2 gap-4">
        {/* details box */}
        <div className="h-auto md:h-[180px] border border-zinc-700 p-5 flex flex-row md:flex-col md:items-start items-center justify-between">
          <div className="bg-red-700 w-10 h-10  flex items-center justify-center rounded-full">
            <FiEye size={25} />
          </div>
          <div className="flex flex-col items-end md:items-start">
            <h3 className="text-md font-light">Total views</h3>
            <span className="text-4xl font-bold">
              {formatViews(channelStats?.totalViews)}
            </span>
          </div>
        </div>
        <div className="h-auto md:h-[180px] border border-zinc-700 p-5 flex flex-row md:flex-col md:items-start items-center justify-between">
          <div className="bg-red-700 w-10 h-10  flex items-center justify-center rounded-full">
            <GoPerson size={25} />
          </div>
          <div className="flex flex-col items-end md:items-start">
            <h3 className="text-md font-light">Total subscribers</h3>
            <span className="text-4xl font-bold">
              {formatViews(channelStats.totalSubscribers)}
            </span>
          </div>
        </div>
        <div className="h-auto md:h-[180px] border border-zinc-700 p-5 flex flex-row md:flex-col md:items-start items-center justify-between">
          <div className="bg-red-700 w-10 h-10  flex items-center justify-center rounded-full">
            <BiLike size={25} />
          </div>
          <div className="flex flex-col items-end md:items-start">
            <h3 className="text-md font-light">Total likes</h3>
            <span className="text-4xl font-bold">
              {formatViews(channelStats.totalLikes)}
            </span>
          </div>
        </div>
      </div>
    );
};

export default ChannelStats;
