import { useQuery } from "@tanstack/react-query";
import { useAppDispatch } from "../app/hooks";
import {
  LikedVideoSuccess,
  videoFailure,
  videoRequest,
} from "../features/video/videoSlice";

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
        dispatch(videoRequest());
        const response = await fetch("/api/v1/likes/videos", {
          method: "GET",
          credentials: "include",
        });

        if (!response.ok) {
          const error: ErrorResponse = await response.json();
          dispatch(videoFailure(error.message));
          throw new Error(error.message);
        }
        const data: GetLikedVideosResponse = await response.json();
        dispatch(LikedVideoSuccess(data.data));

        return data;
      } catch (error) {
        if (error instanceof Error) {
          dispatch(videoFailure(error.message));
          throw error;
        } else {
          dispatch(videoFailure("Error while fetching liked videos"));
          throw "Error while fetching liked videos";
        }
      }
    },
    staleTime: 3600000,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
};
export default useGetLikedVideos;
