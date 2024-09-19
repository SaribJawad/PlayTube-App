import { useQuery } from "@tanstack/react-query";
import { useAppDispatch } from "../app/hooks";
import {
  channelFailure,
  channelRequest,
  myContentChannelVideo,
} from "../features/channels/channelsSlice";

interface ContentChannelVideo {
  _id: string;
  thumbnail: {
    url: string;
  };
  title: string;
  description: string;
  isPublished: boolean;
  createdAt: string;
  likes: number;
}

interface GetMyContentChannelVideosResponse {
  statusCode: number;
  data: ContentChannelVideo[];
  message: string;
  success: boolean;
}

interface ErrorResponse {
  message: string;
}

function useGetMyContentChannelVideos() {
  const dispatch = useAppDispatch();

  return useQuery<GetMyContentChannelVideosResponse, ErrorResponse>({
    queryKey: ["ContentChannelVideos"],
    queryFn: async () => {
      dispatch(channelRequest());
      const response = await fetch("/api/v1/dashboard/videos", {
        method: "GET",
        credentials: "include",
      });
      if (!response.ok) {
        const error: ErrorResponse = await response.json();
        dispatch(channelFailure(error.message));
      }
      const data: GetMyContentChannelVideosResponse = await response.json();
      dispatch(myContentChannelVideo(data.data));
      return data;
    },
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  });
}

export default useGetMyContentChannelVideos;
