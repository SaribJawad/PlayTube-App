import React from "react";
import { GoFileDirectory, GoHome } from "react-icons/go";
import { MdHistoryToggleOff } from "react-icons/md";
import { RiUserFollowLine } from "react-icons/ri";
import FooterItem from "./FooterItem";

const Footer: React.FC = () => {
  return (
    <footer className="bottom-0 text-white fixed sm:hidden w-full bg-black border-t border-zinc-800 h-[70px]">
      <ul className="flex items-center justify-evenly">
        <FooterItem to="" label="Home" icon={<GoHome size={28} />} />
        <FooterItem
          to=""
          label="History"
          icon={<MdHistoryToggleOff size={28} />}
        />
        <FooterItem
          to=""
          label="Collection"
          icon={<GoFileDirectory size={28} />}
        />
        <FooterItem
          to=""
          label="Subscribers"
          icon={<RiUserFollowLine size={28} />}
        />
      </ul>
    </footer>
  );
};

export default Footer;
