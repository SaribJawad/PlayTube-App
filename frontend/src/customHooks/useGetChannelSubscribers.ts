import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { useAppDispatch } from "../app/hooks";
import {
  channelFailure,
  channelRequest,
  channelSubscribersSuccess,
} from "../features/channels/channelsSlice";

interface Data {
  _id: string;
  subscriber: {
    _id: string;
    username: string;
    fullname: string;
    avatar: {
      url: string;
    };
    subscriberCount: number;
  };
}

interface GetChannelSubscribersResponse {
  statusCode: number;
  data: Data[];
  message: string;
  success: boolean;
}

interface ErrorResponse {
  message: string;
}

function useGetChannelSubscribers() {
  const { channelId } = useParams<{ channelId: string }>();
  const dispatch = useAppDispatch();

  return useQuery<GetChannelSubscribersResponse, ErrorResponse>({
    queryKey: ["channelSubscribers", channelId],
    queryFn: async () => {
      dispatch(channelRequest());
      const response = await fetch(`/api/v1/subscription/c/${channelId}`, {
        method: "GET",
        credentials: "include",
      });

      if (!response.ok) {
        const error: ErrorResponse = await response.json();
        dispatch(channelFailure(error.message));
        throw new Error(error.message);
      }
      const data = await response.json();
      dispatch(channelSubscribersSuccess(data.data));
      return data;
    },
    enabled: !!channelId,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
}

export default useGetChannelSubscribers;
