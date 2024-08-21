import React from "react";
import { Link } from "react-router-dom";

const VideoThumbnailCard: React.FC = () => {
  return (
    <div className=" h-[270px] w-[100%]">
      <div className=" h-[72%] relative rounded-xl overflow-hidden hover:rounded-none transition-all duration-300 ease-in-out ">
        <Link to={""}>
          <img
            className=" object-cover w-full h-full"
            src="https://images.unsplash.com/photo-1691937784280-9ca418acfef9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Y292ZXIlMjBpbWFnZXxlbnwwfHwwfHx8MA%3D%3D"
            alt=""
          />
          <span className="absolute bottom-2 text-sm bg-black bg-opacity-45 px-[5px] rounded-md right-2 z-5 text-center">
            23:49
          </span>
        </Link>
      </div>
      <div className="h-[28%]  flex items-center gap-2 p-2">
        <div className="w-[50px] h-[50px]   rounded-full overflow-hidden">
          <Link to={""} className="">
            <img
              className="h-full w-full  object-cover"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcyI9Cvp53aaP9XeRn-ZKbJDH2QaWC72O26A&s"
              alt=""
            />
          </Link>
        </div>
        <div className="w-[83%] h-full  ">
          <Link to={""}>
            <h1 className=" text-sm mid-w-full truncate">
              Beatifull video Beatifull video Beatifull video Beatifull video
            </h1>
            <h2 className="inline-block text-[13px] text-zinc-500 hover:text-white">
              Chai aur code
            </h2>
            <h3 className="text-[12px] text-zinc-500 ">
              40k views • 6 months ago
            </h3>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default VideoThumbnailCard;
