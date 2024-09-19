import React from "react";
import { IoClose } from "react-icons/io5";
import VideoPublishForm from "./VideoPublishForm";
import { Flip, ToastContainer } from "react-toastify";

type HandleClose = () => void;

interface UploadVideoPopupProps {
  handleClosePopup: HandleClose;
}

const UploadVideoPopup: React.FC<UploadVideoPopupProps> = ({
  handleClosePopup,
}) => {
  const handlePopupClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={handleClosePopup}
    >
      <div
        className="w-[80%] h-auto flex flex-col items-center bg-black border border-zinc-700 relative p-5"
        onClick={handlePopupClick}
      >
        <ToastContainer
          position="top-center"
          autoClose={3000}
          transition={Flip}
        />
        <div className="flex pb-3 w-full justify-between border-b border-b-zinc-700">
          <h1 className="">Upload Videos</h1>
          <span className="cursor-pointer" onClick={handleClosePopup}>
            <IoClose size={30} />
          </span>
        </div>
        <div className="video-upload w-[90%] m-5">
          <VideoPublishForm handleClosePopup={handleClosePopup} />
        </div>
      </div>
    </div>
  );
};

export default UploadVideoPopup;
