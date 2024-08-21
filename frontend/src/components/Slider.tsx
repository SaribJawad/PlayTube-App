import React from "react";
import { IoCloseOutline, IoSettingsOutline } from "react-icons/io5";
import SliderItem from "./SliderItem";
import { BiLike } from "react-icons/bi";
import { BsCameraVideo } from "react-icons/bs";

interface SliderProps {
  isOpen: boolean;
  toggleMenu: () => void;
}

const Slider: React.FC<SliderProps> = ({ isOpen, toggleMenu }) => {
  return (
    <div
      className={`sm:hidden py-6 px-5  bg-black z-10 flex items-end justify-start gap-10 flex-col  fixed border-zinc-800 border-l  h-[100%] w-[300px] top-0 right-0 transition-transform ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }  `}
    >
      <span className=" ">
        <IoCloseOutline onClick={toggleMenu} fontFamily="thin" size={35} />
      </span>
      <ul className="w-full flex flex-col gap-4">
        <SliderItem to="" icon={<BiLike size={25} />} label="Liked Videos" />
        <SliderItem
          to=""
          icon={<BsCameraVideo size={25} />}
          label="My Content"
        />
        <SliderItem
          to=""
          icon={<IoSettingsOutline size={25} />}
          label="Settings"
        />
      </ul>
    </div>
  );
};

export default Slider;
