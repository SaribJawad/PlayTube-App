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
        className=" flex items-center gap-2  sm:w-auto w-full button-animation px-3 py-2  rounded-md text-center  bg-red-700 hover:bg-red-600 transition duration-300      "
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
