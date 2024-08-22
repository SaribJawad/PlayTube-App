import React from "react";
import SearchResultCard from "../components/SearchResultCard";

const SearchResultPage: React.FC = () => {
  return (
    <div className="pt-20 bg-black text-white min-h-full w-full sm:pl-[60px] lg:pl-[260px]  sm:pb-0 pb-[70px]  flex flex-col gap-1">
      <SearchResultCard />
      <SearchResultCard />
      <SearchResultCard />
      <SearchResultCard />
    </div>
  );
};

export default SearchResultPage;
