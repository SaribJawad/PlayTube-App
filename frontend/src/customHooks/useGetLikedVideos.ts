import { useQuery } from "@tanstack/react-query";
import { useAppDispatch } from "../app/hooks";
import { LikedVideoSuccess } from "../features/video/videoSlice";

interface Video {
  _id: string;
  thumbnail: {
    url: string;
  };
  title: string;
  duration: number;
  views: string[];
  owner: {
    _id: string;
    username: string;
    fullname: string;
    avatar: {
      url: string;
    };
  };
}

interface LikedVideo {
  _id: string;
  video: Video;
  likedBy: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface GetLikedVideosResponse {
  statusCode: number;
  data: LikedVideo[];
  message: string;
  success: boolean;
}

interface ErrorResponse {
  message: string;
}

const useGetLikedVideos = () => {
  const dispatch = useAppDispatch();
  return useQuery<GetLikedVideosResponse, ErrorResponse>({
    queryKey: ["likedVideos"],
    queryFn: async () => {
      try {
        const response = await fetch("/api/v1/likes/videos", {
          method: "GET",
          credentials: "include",
        });

        if (!response.ok) {
          const error: ErrorResponse = await response.json();

          throw new Error(error.message);
        }
        const data: GetLikedVideosResponse = await response.json();
        dispatch(LikedVideoSuccess(data.data));

        return data;
      } catch (error) {
        if (error instanceof Error) {
          throw error;
        } else {
          throw "Error while fetching liked videos";
        }
      }
    },
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
};
export default useGetLikedVideos;
