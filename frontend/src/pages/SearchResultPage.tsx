import React from "react";
import { useAppSelector } from "../app/hooks";
import NoResults from "../components/NoResult";
import LoadingSpinner from "../components/LoadingSpinner";
import HorizontalVideoCard from "../components/HorizontalVideoCard ";

const SearchResultPage: React.FC = () => {
  const queryResult = useAppSelector((state) => state.video);
  const queryVideo = queryResult.searchResults;

  return (
    <div className="pt-24 sm:pt-[90px] md:pt-20  lg:pt-24  bg-black text-white min-h-full w-full sm:pl-[70px] lg:pl-[260px]  sm:pb-0 pb-[70px]  flex flex-col p-3  lg:gap-3 ">
      {queryVideo.length === 0 && !queryResult.loading && <NoResults />}

      {queryResult.loading ? (
        <div className="fixed top-[50%] left-[50%]">
          <LoadingSpinner width="14" height="14" />
        </div>
      ) : (
        queryVideo.map((video) => (
          <HorizontalVideoCard video={video} key={video?._id} />
        ))
      )}
    </div>
  );
};

export default SearchResultPage;
