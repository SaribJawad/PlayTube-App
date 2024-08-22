import React from "react";
import MenuItem from "./MenuItem";
import { GoHome } from "react-icons/go";
import { BiLike } from "react-icons/bi";
import { MdHistoryToggleOff } from "react-icons/md";
import { BsCameraVideo } from "react-icons/bs";
import { GoFileDirectory } from "react-icons/go";
import { RiUserFollowLine } from "react-icons/ri";
import { IoSettingsOutline } from "react-icons/io5";

const SideMenu: React.FC = () => {
  return (
    <div className="w-[60px] hidden text-white lg:w-[250px] h-full bg-[#000000] border-r border-zinc-800 sm:flex flex-col justify-between fixed pt-20">
      <ul className="px-2 py-5 flex flex-col gap-3">
        <MenuItem to="" icon={<GoHome size={25} />} label="Home" />
        <MenuItem to="" icon={<BiLike size={25} />} label="Liked Videos" />
        <MenuItem
          to=""
          icon={<MdHistoryToggleOff size={25} />}
          label="History"
        />
        <MenuItem to="" icon={<BsCameraVideo size={25} />} label="My Content" />
        <MenuItem
          to=""
          icon={<GoFileDirectory size={25} />}
          label="Collection"
        />
        <MenuItem
          to=""
          icon={<RiUserFollowLine size={25} />}
          label="Subscribers"
        />
      </ul>
      <ul className="px-2 py-5 ">
        <MenuItem
          to=""
          icon={<IoSettingsOutline size={25} />}
          label="Settings"
        />
      </ul>
    </div>
  );
};

export default SideMenu;
