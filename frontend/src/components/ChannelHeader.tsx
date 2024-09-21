import React, { useState } from "react";
import { IoPersonAddOutline, IoPersonAddSharp } from "react-icons/io5";
import { MdOutlineEdit } from "react-icons/md";
import { formatViews as formatSubscribers } from "../utils/formatViews";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../app/hooks";
import useToggleSubscribe from "../customHooks/useToggleSubscribe";
import { Flip, toast, ToastContainer } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import useUpdateAvatar from "../customHooks/useUpdateAvatar";
import useUpdateCoverImage from "../customHooks/useUpdateCoverImage";
import { IoHourglassOutline } from "react-icons/io5";
import { FiUpload } from "react-icons/fi";

interface ChannelDetail {
  avatar: {
    url: string;
    public_id: string;
    _id: string;
  };
  coverImage: {
    url: string;
    public_id: string;
    _id: string;
  };
  fullname: string;
  channelsSubscribedToCount: number;
  email: string;
  isSubscribed: boolean;
  subscribersCount: number;
  username: string;
  _id: string;
}

interface UserDetails {
  userDetails: ChannelDetail | undefined;
  isEdit: boolean;
  toggleEdit: () => void;
}

const ChannelHeader: React.FC<UserDetails> = ({
  userDetails,
  isEdit,
  toggleEdit,
}) => {
  const queryClient = useQueryClient();
  const { mutateAsync: toggleSubscribe } = useToggleSubscribe();
  const { mutateAsync: updateAvatar, isPending: uploadingAvatar } =
    useUpdateAvatar();
  const { mutateAsync: updateCoverImage, isPending: uploadingCoverImage } =
    useUpdateCoverImage();
  const { userId, username: channelUsername } = useParams<{
    userId: string;
    username: string;
  }>();
  const loggedInUser = useAppSelector((state) => state.auth.user);
  const [coverImage, setCoverImage] = useState<File>();
  const [avatar, setAvatar] = useState<File>();

  async function handleSubscribe() {
    if (userId)
      await toggleSubscribe(
        { channelId: userId },
        {
          onSuccess: () => {
            toast.success(
              userDetails?.isSubscribed ? "UnSubscribed!" : "Subscribed!"
            );
            queryClient.invalidateQueries({
              queryKey: ["channelDetails", channelUsername],
            });
            queryClient.invalidateQueries({
              queryKey: ["subscribedChannel", userId],
            });
          },
        }
      );
  }

  function handleUpdateCoverImage(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];

    if (file) {
      const validateCoverImageTypes = ["image/jpeg", "image/png", "image/gif"];

      if (!validateCoverImageTypes.includes(file.type)) {
        toast.error(
          "Invalid file type! Please upload an image (jpg, png, gif)."
        );
        return;
      }

      setCoverImage(file);

      updateCoverImage(file, {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: ["channelDetails"],
            exact: false,
          });
          setTimeout(() => {
            toast.success("Updated cover image successfully!");
          }, 500);
        },
      });
    }
  }

  function handleUpdateAvatar(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];

    if (file) {
      const validateAvatarTypes = ["image/jpeg", "image/png", "image/gif"];

      if (!validateAvatarTypes.includes(file.type)) {
        toast.error(
          "Invalid file type! Please upload an image (jpg, png, gif)."
        );
        return;
      }

      setAvatar(file);

      updateAvatar(file, {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: ["channelDetails"],
            exact: false,
          });
          setTimeout(() => {
            toast.success("Updated avatar successfully!");
          }, 500);
        },
      });
    }
  }

  return (
    <div className="w-full h-auto  ">
      <ToastContainer
        position="top-center"
        autoClose={3000}
        transition={Flip}
      />
      <div className="relative w-auto h-auto">
        <img
          className="w-full h-[320px] object-cover"
          src={
            userDetails?.coverImage.url
              ? userDetails.coverImage.url
              : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5Z80XY5zpzhPnEr3vakhqA8VOiFodpUGhuw&s"
          }
          alt=""
        />
        <input
          type="file"
          id="thumbnailInput"
          className="hidden"
          onChange={handleUpdateCoverImage}
        />
        {isEdit && (
          <button
            className=" text-white bg-zinc-700 bg-opacity-65  p-5 rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            onClick={() => document.getElementById("thumbnailInput")?.click()}
          >
            {uploadingCoverImage ? (
              <IoHourglassOutline size={20} />
            ) : (
              <FiUpload size={20} />
            )}
          </button>
        )}
      </div>

      <div className="flex sm:items-center sm:gap-0  gap-5  items-start justify-between p-5 flex-row">
        <div className=" flex items-center flex-col sm:flex-row gap-5 ">
          <div className="w-auto h-auto relative">
            <img
              className="w-24  rounded-full border-2 object-contain "
              src={userDetails?.avatar.url}
              alt=""
            />
            <input
              type="file"
              id="avatarInput"
              className="hidden"
              onChange={handleUpdateAvatar}
            />
            {isEdit && (
              <button
                className=" text-white bg-zinc-700 bg-opacity-65  p-3 rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                onClick={() => document.getElementById("avatarInput")?.click()}
              >
                {uploadingAvatar ? <IoHourglassOutline /> : <FiUpload />}
              </button>
            )}
          </div>
          <div className="flex flex-col gap-1">
            <h1 className="text-xl">{userDetails?.fullname}</h1>
            <p className="text-xs text-zinc-400">@{userDetails?.username}</p>
            <p className="text-xs text-zinc-400">
              {userDetails && formatSubscribers(userDetails.subscribersCount)}{" "}
              subscribers •{" "}
              {userDetails &&
                formatSubscribers(userDetails.channelsSubscribedToCount)}{" "}
              subscribed
            </p>
          </div>
        </div>

        {userId === loggedInUser?._id ? (
          <button
            onClick={toggleEdit}
            className="button-animation px-3 py-2  rounded-md text-center  bg-red-700 hover:bg-red-600 transition duration-300 gap-2 self-end sm:self-auto  "
          >
            {isEdit ? (
              "View Channel"
            ) : (
              <span className="flex  items-center gap-2">
                <MdOutlineEdit size={20} />
                Edit
              </span>
            )}
          </button>
        ) : (
          <button
            onClick={handleSubscribe}
            className="button-animation px-3 py-2  rounded-md text-center  bg-red-700 hover:bg-red-600 transition duration-300  flex items-center gap-2 self-end sm:self-auto   "
          >
            <span>
              {userDetails?.isSubscribed ? (
                <IoPersonAddSharp size={20} />
              ) : (
                <IoPersonAddOutline size={20} />
              )}
            </span>
            {userDetails?.isSubscribed ? "Subscribed" : "Subscribe"}
          </button>
        )}
      </div>
    </div>
  );
};

export default ChannelHeader;
