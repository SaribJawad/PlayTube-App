import { GrHistory } from "react-icons/gr";
import React from "react";
import WatchedHistoryVideoCard from "../components/WatchedHistoryVideoCard";
import useGetWatchedHistory from "../customHooks/useGetWatchedHistory";
import { useAppSelector } from "../app/hooks";
import LoadingSpinner from "../components/LoadingSpinner";

const WatchedHistoryPage: React.FC = () => {
  useGetWatchedHistory();
  const { loading, watchedHistory } = useAppSelector(
    (state) => state.watchedHistory
  );

  if (loading) {
    return (
      <div className=" w-full flex items-center justify-center min-h-full  sm:pl-[70px] lg:pl-[260px]">
        <LoadingSpinner width="8" height="8" />
      </div>
    );
  }

  return (
    <div className="bg-black text-white min-h-full w-full sm:pl-[70px] lg:pl-[260px] p-4 sm:pb-0 pb-[70px] pt-[90px]">
      <div className="py-8 px-4 bg-black text-center flex flex-col items-center">
        <GrHistory className=" text-3xl mb-2 " />
        <h1 className="text-3xl font-semibold text-white">Watched history</h1>
        <p className="text-zinc-500 mt-2">
          {watchedHistory.length === 0
            ? "You haven't watched any videos yet!"
            : "Here's all the video's you have watched"}
        </p>
      </div>

      <div className="flex flex-col gap-5">
        {watchedHistory.map((video) => (
          <WatchedHistoryVideoCard key={video._id} video={video} />
        ))}
      </div>
    </div>
  );
};

export default WatchedHistoryPage;
