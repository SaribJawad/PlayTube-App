import React from "react";
import { IoPersonAddOutline, IoPersonAddSharp } from "react-icons/io5";
import { MdOutlineEdit } from "react-icons/md";

import { formatViews as formatSubscribers } from "../utils/formatViews";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../app/hooks";

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
}

const ChannelHeader: React.FC<UserDetails> = ({ userDetails }) => {
  const { userId } = useParams<{ userId: string }>();
  const loggedInUser = useAppSelector((state) => state.auth.user);

  return (
    <div className="w-full h-auto  ">
      <img
        className="w-full h-[200px] object-cover"
        src={
          userDetails?.coverImage.url
            ? userDetails.coverImage.url
            : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5Z80XY5zpzhPnEr3vakhqA8VOiFodpUGhuw&s"
        }
        alt=""
      />
      <div className="flex sm:items-center sm:gap-0  gap-5  items-start justify-between p-5 flex-col sm:flex-row">
        <div className=" flex items-center gap-5 ">
          <img
            className="w-32 h-32 rounded-full border-2 object-contain "
            src={userDetails?.avatar.url}
            alt=""
          />
          <div>
            <h1 className="text-2xl">{userDetails?.fullname}</h1>
            <p className="text-sm text-zinc-400">@{userDetails?.username}</p>
            <p className="text-sm text-zinc-400">
              {userDetails && formatSubscribers(userDetails.subscribersCount)}{" "}
              subscribers .{" "}
              {userDetails &&
                formatSubscribers(userDetails.channelsSubscribedToCount)}{" "}
              subscribed
            </p>
          </div>
        </div>

        {userId === loggedInUser?._id ? (
          <button className="button-animation px-3 py-[10px] flex items-center gap-2    bg-red-800">
            <span>
              <MdOutlineEdit size={20} />
            </span>
            Edit
          </button>
        ) : (
          <button className="button-animation px-3 py-[10px] flex items-center gap-2    bg-red-800">
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
