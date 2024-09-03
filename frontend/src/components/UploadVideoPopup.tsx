import React from "react";
import { IoClose } from "react-icons/io5";
import VideoPublishForm from "./VideoPublishForm";

type HandleClose = () => void;

interface UploadVideoPopupProps {
  handleClosePopup: HandleClose;
}

const UploadVideoPopup: React.FC<UploadVideoPopupProps> = ({
  handleClosePopup,
}) => {
  return (
    <div className="w-[80%] h-auto flex flex-col items-center bg-black border border-zinc-700 absolute top-[9%] right-[10%] p-5">
      <div className="flex pb-3 w-full  justify-between border-b border-b-zinc-700 ">
        <h1 className="">Upload Videos</h1>
        <span className="cursor-pointer" onClick={handleClosePopup}>
          <IoClose size={30} />
        </span>
      </div>
      <div className="video-upload w-[90%]  m-5 ">
        <VideoPublishForm handleClosePopup={handleClosePopup} />
      </div>
    </div>
  );
};

export default UploadVideoPopup;
