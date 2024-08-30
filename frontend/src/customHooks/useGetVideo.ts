import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { useAppDispatch } from "../app/hooks";
import {
  getVideoSuccess,
  videoFailure,
  videoRequest,
} from "../features/video/videoSlice";

interface VideoFile {
  _id: string;
  videoFile: {
    url: string;
    public_id: string;
    _id: string;
  };
  description: string;
  thumbnail: {
    url: string;
    public_id: string;
    _id: string;
  };
  title: string;
  duration: number;
  views: 1;
  isPublished: boolean;
  owner: {
    _id: string;
    username: string;
    fullname: string;
    avatar: {
      url: string;
      public_id: string;
      _id: string;
    };
    subscribers: number;
    isSubscribed: boolean;
  };
  likes: string[];
  createdAt: string;
}

interface VideoResponse {
  statusCode: number;
  data: VideoFile;
  message: string;
  success: boolean;
}

interface ErrorResponse {
  message: string;
}

const useGetVideo = () => {
  const dispatch = useAppDispatch();
  const { videoId } = useParams<{ videoId: string }>();
  const queryClient = useQueryClient();

  const queryResult = useQuery<VideoResponse, ErrorResponse>({
    queryKey: ["video", videoId],
    queryFn: async () => {
      try {
        dispatch(videoRequest());
        const response = await fetch(`/api/v1/videos/${videoId}`, {
          method: "GET",
          credentials: "include",
        });
        if (!response.ok) {
          const error: ErrorResponse = await response.json();
          dispatch(videoFailure(error.message));
          throw new Error(error.message);
        }
        const data: VideoResponse = await response.json();
        dispatch(getVideoSuccess(data?.data));
        console.log(data);

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

    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    enabled: Boolean(videoId),
  });

  const invalidateVideo = (): void => {
    queryClient.invalidateQueries({ queryKey: ["video", videoId] });
  };

  return {
    ...queryResult,
    invalidateVideo,
  };
};

export default useGetVideo;
