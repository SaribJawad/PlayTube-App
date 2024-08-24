import React, { useState } from "react";
import { BiLike } from "react-icons/bi";
import { IoPersonAddOutline } from "react-icons/io5";
import { VscFileSymlinkDirectory } from "react-icons/vsc";

const VideoInfoPanel: React.FC = () => {
  const [isOpenDescription, setIsOpenDescription] = useState<boolean>(false);

  return (
    <div id="Video-details" className=" flex flex-col gap-3 p-2">
      <div id="Video-tile-views-uploadetime ">
        <h1 className="text-xl">Cool hacks to get asdasds</h1>
        <p className="text-sm text-zinc-600">25,2132 Views . 18 hours ago</p>
      </div>
      <div id="likes-subscribe" className="w-full flex justify-between">
        <button className="flex items-center gap-1">
          <BiLike size={25} /> <span className="text-sm">305</span>
        </button>
        <button className=" flex items-center gap-1">
          <VscFileSymlinkDirectory size={25} />
          <span className="text-sm">Save</span>
        </button>
      </div>
      <div id="profile-subscribebtn" className="flex justify-between">
        <div className="flex items-center gap-2">
          <img
            className="w-12 h-12 rounded-full"
            src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
            alt=""
          />
          <div>
            <h2 className="text-md">Chai aur code</h2>
            <p className="text-xs text-zinc-500">123k Subscribers</p>
          </div>
        </div>
        <button className="flex items-center gap-1">
          <IoPersonAddOutline size={25} />
          <span className="text-sm">Subscribe</span>
        </button>
      </div>
      <div
        id="description"
        className=" w-full p-2 h-auto bg-zinc-900 rounded-xl"
      >
        <p
          className={`${isOpenDescription ? "block" : "hidden"} pb-8 text-sm `}
        >
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolore dicta
          ab error omnis alias rerum vero voluptas, ad maiores? Ad a dolorem,
          dolor dicta tempore adipisci consequuntur nam quidem aliquam autem
          minima!
        </p>
        <button
          onClick={() => setIsOpenDescription((prev) => !prev)}
          className="flex mx-auto "
        >
          {isOpenDescription ? "Hide description" : "Show description"}
        </button>
      </div>
    </div>
  );
};

export default VideoInfoPanel;
