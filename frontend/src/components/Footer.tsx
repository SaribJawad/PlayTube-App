import React from "react";
import { GoFileDirectory, GoHome } from "react-icons/go";
import { MdHistoryToggleOff } from "react-icons/md";
import { RiUserFollowLine } from "react-icons/ri";
import FooterItem from "./FooterItem";
import { useAppSelector } from "../app/hooks";

const Footer: React.FC = () => {
  const loggedInUserId = useAppSelector((state) => state.auth.user?._id);

  return (
    <footer className="bottom-0 text-white fixed sm:hidden w-full bg-black border-t border-zinc-800 h-[70px]">
      <ul className="flex items-center justify-evenly">
        <FooterItem to="" label="Home" icon={<GoHome size={28} />} />
        <FooterItem
          to="/watchedHistory"
          label="History"
          icon={<MdHistoryToggleOff size={28} />}
        />
        <FooterItem
          to={`/playlist/${loggedInUserId}`}
          label="playlist"
          icon={<GoFileDirectory size={28} />}
        />
        <FooterItem
          to={`/channelSubscribers/${loggedInUserId}`}
          label="Subscribers"
          icon={<RiUserFollowLine size={28} />}
        />
      </ul>
    </footer>
  );
};

export default Footer;
