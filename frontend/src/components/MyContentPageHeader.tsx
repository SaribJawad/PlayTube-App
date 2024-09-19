import React, { useState } from "react";
import { useAppSelector } from "../app/hooks";
import UploadVideoPopup from "./UploadVideoPopup";
import { GoPlus } from "react-icons/go";

const MyContentPageHeader: React.FC = () => {
  const [isOpenVideoModel, setIsOpenVideoModel] = useState<boolean>(false);
  const loggedInUser = useAppSelector((state) => state.auth.user);

  function handleClosePopup(): void {
    setIsOpenVideoModel((prev) => !prev);
  }

  return (
    <div className="w-full relative  flex md:items-center sm:flex-row flex-col gap-4 justify-between p-5">
      <div className="">
        <h1 className="text-md sm:text-2xl font-bold">
          Welcome Back, {loggedInUser?.fullname}
        </h1>
        <p className="text-sm text-zinc-500">
          Seamless Video Management, Elevated Results.
        </p>
      </div>
      <button
        onClick={handleClosePopup}
        className="button-animation px-3 py-[10px] flex items-center gap-2 text-center sm:w-auto w-full      bg-red-800"
      >
        <span>
          <GoPlus size={20} />
        </span>
        Upload video
      </button>

      {isOpenVideoModel && (
        <UploadVideoPopup handleClosePopup={handleClosePopup} />
      )}
    </div>
  );
};

export default MyContentPageHeader;
