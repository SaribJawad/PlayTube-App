import VideoThumbnailCard from "./VideoThumbnailCard";
import useGetAllVideos from "../customHooks/useGetAllVideos";
import { useAppSelector } from "../app/hooks";
import LoadingSpinner from "./LoadingSpinner";

const Main: React.FC = () => {
  useGetAllVideos({
    page: 1,
    limit: 10,
    sortBy: "createdAt",
    sortType: "asc",
  });
  const video = useAppSelector((state) => state.video);

  if (video.loading) {
    return (
      <div className=" w-full flex items-center justify-center min-h-full  sm:pl-[70px] lg:pl-[260px]">
        <LoadingSpinner width="8" height="8" />
      </div>
    );
  }

  return (
    <div className="bg-black min-h-full w-full sm:pl-[70px] lg:pl-[260px] p-4 sm:pb-0 pb-[70px] ">
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        {video.allVideos.map((video) => (
          <VideoThumbnailCard video={video} key={video._id} />
        ))}
      </div>
    </div>
  );
};

export default Main;
