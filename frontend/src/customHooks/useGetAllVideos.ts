import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useAppDispatch } from "../app/hooks";
import {
  allVideosSuccess,
  channelVideosSuccess,
  videoFailure,
  videoRequest,
} from "../features/video/videoSlice";

interface Video {
  _id: string;
  description: string;
  thumbnail: {
    url: string;
    public_id: string;
    _id: string;
  };
  title: string;
  duration: number;
  views: string[];
  owner: {
    _id: string;
    username: string;
    avatar: {
      url: string;
      public_id: string;
      _id: string;
    };
    subscribersCount: number;
  };
  createdAt: string;
}

interface VideoResponse {
  statusCode: number;
  data: Video[];
  message: string;
  success: boolean;
}

interface ErrorResponse {
  message: string;
}

interface FetchVideosParams {
  page: number;
  limit: number;
  sortBy: string;
  sortType: "asc" | "desc";
  userId?: string;
}

const useGetAllVideos = (
  params: FetchVideosParams
): { invalidateVideos: () => void } => {
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();
  const queryResult = useQuery<VideoResponse, ErrorResponse>({
    queryKey: ["videos", params],
    queryFn: async () => {
      try {
        dispatch(videoRequest());
        const urlParams = new URLSearchParams(params as any);
        const response = await fetch(`/api/v1/videos?${urlParams.toString()}`, {
          method: "GET",
          credentials: "include",
        });
        if (!response.ok) {
          const error: ErrorResponse = await response.json();
          dispatch(videoFailure(error.message));
          throw new Error(error.message);
        }
        const data: VideoResponse = await response.json();
        if (params?.userId) {
          dispatch(channelVideosSuccess(data?.data));
        } else dispatch(allVideosSuccess(data?.data));

        return data;
      } catch (error) {
        if (error instanceof Error) {
          dispatch(videoFailure(error.message));
          throw error;
        } else {
          dispatch(videoFailure("Error while fetching all videos"));
          throw "Error while fetching all videos";
        }
      }
    },
    // staleTime: 1000 * 60 * 60,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  const invalidateVideos = () => {
    queryClient.invalidateQueries({ queryKey: ["videos"] });
  };

  return {
    ...queryResult,
    invalidateVideos,
  };
};

export default useGetAllVideos;
