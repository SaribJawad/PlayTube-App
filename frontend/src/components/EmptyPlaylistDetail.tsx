import React from "react";
import { Link } from "react-router-dom";

const EmptyPlaylistDetail: React.FC = () => {
  return (
    <div className="bg-black h-screen w-full text-white flex flex-col items-center justify-center sm:pl-[70px] lg:pl-[260px] p-4 sm:pb-0 pb-[70px] pt-[85px]">
      <div className="text-center">
        <h1 className="text-2xl sm:text-4xl font-semibold mb-4">
          Your Playlist is Empty
        </h1>
        <p className="text-gray-400 mb-6">
          You haven't added any videos to your playlist yet.
        </p>
        <Link to={"/"}>
          <button className="button-animation px-4 py-2 rounded-md text-center w-full sm:w-auto bg-red-700 hover:bg-red-600 transition duration-300">
            Explore Videos
          </button>
        </Link>
      </div>
    </div>
  );
};

export default EmptyPlaylistDetail;
