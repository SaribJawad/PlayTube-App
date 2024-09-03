import React from "react";

type TabName = "videos" | "tweets" | "subscribed" | "playlists";

interface ChannelNavigationProps {
  handleTabClick: (tab: TabName) => void;
  activeTab: TabName;
}

const ChannelNavigation: React.FC<ChannelNavigationProps> = ({
  handleTabClick,
  activeTab,
}) => {
  return (
    <div className="grid grid-cols-4 border-b-2 pb-2">
      <button
        onClick={() => handleTabClick("videos")}
        className={` text-center p-2 ${
          activeTab === "videos" &&
          "bg-white text-red-800 border-b-4 border-b-red-800"
        }`}
      >
        Videos
      </button>
      <button
        onClick={() => handleTabClick("playlists")}
        className={` text-center p-2 ${
          activeTab === "playlists" &&
          "bg-white text-red-800 border-b-4 border-b-red-800"
        } `}
      >
        Playlist
      </button>
      <button
        onClick={() => handleTabClick("tweets")}
        className={` text-center p-2 ${
          activeTab === "tweets" &&
          "bg-white text-red-800 border-b-4 border-b-red-800"
        }`}
      >
        Tweets
      </button>
      <button
        onClick={() => handleTabClick("subscribed")}
        className={` text-center p-2 ${
          activeTab === "subscribed" &&
          "bg-white text-red-800 border-b-4 border-b-red-800"
        }`}
      >
        Subscribed
      </button>
    </div>
  );
};

export default ChannelNavigation;
