import React from "react";

const NoResults: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-full p-4">
      <div className="text-center">
        <h2 className="text-xl font-bold text-zinc-700 mb-2">
          No videos match your search.
        </h2>
      </div>
    </div>
  );
};

export default NoResults;
