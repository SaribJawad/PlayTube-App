import { useQuery } from "@tanstack/react-query";
import { useAppDispatch } from "../app/hooks";
import {
  channelFailure,
  channelRequest,
  channelStatsSuccess,
} from "../features/channels/channelsSlice";

interface ChannelStats {
  _id: string;
  totalViews: number;
  totalVideos: number;
  totalSubscribers: number;
  totalLikes: number;
}

interface GetChannelStatsResponse {
  statusCode: number;
  data: ChannelStats;
  message: string;
  success: boolean;
}

interface ErrorResposnse {
  message: string;
}

const useGetChannelStats = () => {
  const dispatch = useAppDispatch();

  return useQuery<GetChannelStatsResponse, ErrorResposnse>({
    queryKey: ["channelStats"],
    queryFn: async () => {
      dispatch(channelRequest());
      const response = await fetch("/api/v1/dashboard/stats", {
        method: "GET",
        credentials: "include",
      });
      if (!response.ok) {
        const error: ErrorResposnse = await response.json();
        dispatch(channelFailure(error.message));
        console.log(error);

        throw new Error(error.message);
      }
      const data = await response.json();
      dispatch(channelStatsSuccess(data.data));
      return data;
    },
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  });
};

export default useGetChannelStats;
