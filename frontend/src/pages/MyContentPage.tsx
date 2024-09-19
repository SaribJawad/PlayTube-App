import React, { useState } from "react";
import MyContentPageHeader from "../components/MyContentPageHeader";
import ChannelStats from "../components/ChannelStats";
import useGetMyContentChannelVideos from "../customHooks/useGetMyContentChannelVideos";
import { useAppSelector } from "../app/hooks";
import LoadingSpinner from "../components/LoadingSpinner";
import { Flip, ToastContainer } from "react-toastify";
import MyContentPageTable from "../components/MyContentPageTable";
import EditVideoPopup from "../components/EditVideoPopup";

interface ContentChannelVideo {
  _id: string;
  thumbnail: {
    url: string;
  };
  likes: number;
  title: string;
  isPublished: boolean;
  description: string;
  createdAt: string;
}

const MyContentPage: React.FC = () => {
  const [editingVideo, setEditingVideo] = useState<ContentChannelVideo | null>(
    null
  );
  useGetMyContentChannelVideos();
  const { myContentChannelVideos, loading } = useAppSelector(
    (state) => state.channels
  );

  function handleEdit(contentVideo: ContentChannelVideo): void {
    setEditingVideo(contentVideo);
  }

  if (loading) {
    return (
      <div className="w-full flex items-center justify-center min-h-full  sm:pl-[70px] lg:pl-[260px]">
        <LoadingSpinner width="8" height="8" />
      </div>
    );
  }

  return (
    <div className=" w-full text-white pt-20 bg-black   sm:pl-[70px] lg:pl-[260px] sm:pr-3 pb-20">
      <ToastContainer
        position="top-center"
        autoClose={3000}
        transition={Flip}
      />
      <MyContentPageHeader />
      <ChannelStats />
      <MyContentPageTable
        myContentChannelVideos={myContentChannelVideos}
        handleEdit={handleEdit}
      />
      {editingVideo && (
        <EditVideoPopup
          video={editingVideo}
          onClose={() => setEditingVideo(null)}
        />
      )}
    </div>
  );
};

export default MyContentPage;
