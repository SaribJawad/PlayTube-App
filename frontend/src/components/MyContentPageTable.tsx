import React from "react";
import { formatViews } from "../utils/formatViews";
import { formatedDate } from "../utils/formatedDate";
import { MdModeEditOutline, MdOutlineDeleteOutline } from "react-icons/md";
import ToggleButton from "./ToggleButton";
import useDeleteVideo from "../customHooks/useDeleteVideo";
import { toast } from "react-toastify";
import LoadingSpinner from "./LoadingSpinner";

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

interface MyContentPageTableProps {
  myContentChannelVideos: ContentChannelVideo[];
  handleEdit: (arg: ContentChannelVideo) => void;
}

const MyContentPageTable: React.FC<MyContentPageTableProps> = ({
  myContentChannelVideos,
  handleEdit,
}) => {
  const { mutateAsync: DeleteVideo, isPending } = useDeleteVideo();

  async function handleDelete(videoId: string) {
    await DeleteVideo(videoId, {
      onError: (error) => {
        toast.error("Failed to update video publish status.");
        console.error(error);
      },
    });
    setTimeout(() => {
      toast.success("Video deleted successfully");
    }, 500);
  }

  if (isPending) {
    return (
      <div className=" flex-col bg-black text-white flex justify-center items-center">
        <LoadingSpinner width="8" height="8" />
      </div>
    );
  }

  return (
    <div className="overflow-x-auto ">
      <table className="sm:min-w-full   table-auto text-left ">
        <thead>
          <tr className="border-b border-gray-600">
            <th className="p-4">Status</th>
            <th className="p-4 w-[60%] lg:w-[50%]">Uploaded</th>
            <th className="p-4">Likes</th>
            <th className="p-4">Date Uploaded</th>
            <th className="p-4"></th>
          </tr>
        </thead>
        <tbody>
          {myContentChannelVideos &&
            myContentChannelVideos.map((videoDetail) => (
              <tr className="border-b border-gray-700" key={videoDetail._id}>
                <td className="p-4">
                  <div className="flex  items-center gap-4">
                    <ToggleButton
                      isPublished={videoDetail.isPublished}
                      videoId={videoDetail._id}
                    />
                    <span
                      className={`${
                        videoDetail.isPublished
                          ? "text-green-500"
                          : "text-red-600"
                      } p-1 rounded-xl`}
                    >
                      {!videoDetail.isPublished ? "Unpublished" : "Published"}
                    </span>
                  </div>
                </td>

                <td className="p-4 sm:w-[100%] min-w-[300px] w-[400px] lg:w-[100%] whitespace-normal break-words flex sm:flex-row flex-col items-center gap-2 ">
                  {videoDetail.title}
                </td>

                <td className="p-4">{formatViews(videoDetail.likes)}</td>

                <td className="p-4 ">{formatedDate(videoDetail.createdAt)}</td>
                <td className="p-4 w-[100px]">
                  <div className="flex gap-2">
                    <button onClick={() => handleEdit(videoDetail)}>
                      <MdModeEditOutline size={20} />
                    </button>
                    <button onClick={() => handleDelete(videoDetail._id)}>
                      <MdOutlineDeleteOutline size={20} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyContentPageTable;
