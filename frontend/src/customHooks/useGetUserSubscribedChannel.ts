import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { useAppDispatch } from "../app/hooks";
import {
  channelFailure,
  channelRequest,
  subscribedChannelSucess,
} from "../features/channels/channelsSlice";

interface Channel {
  _id: string;
  subscriber: string;
  channel: {
    _id: string;
    username: string;
    fullname: string;
    avatar: {
      url: string;
    };
    subscriberCount: string[];
  };
}

interface GetUserSubscribedChannelResponse {
  statusCode: number;
  data: Channel[];
  message: string;
  success: string;
}

interface ErrorResponse {
  message: string;
}

function useGetUserSubscribedChannel() {
  const { userId } = useParams<{ userId: string }>();
  const dispatch = useAppDispatch();

  return useQuery<GetUserSubscribedChannelResponse, ErrorResponse>({
    queryKey: ["subscribedChannel", userId],
    queryFn: async () => {
      dispatch(channelRequest());
      const response = await fetch(`/api/v1/subscription/u/${userId}`);
      if (!response.ok) {
        const error: ErrorResponse = await response.json();
        dispatch(channelFailure(error.message));
        throw new Error(error.message);
      }
      const data: GetUserSubscribedChannelResponse = await response.json();
      dispatch(subscribedChannelSucess(data.data));
      return data;
    },
    // staleTime: 1000 * 60 * 60,
    enabled: !!userId,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
}

export default useGetUserSubscribedChannel;
