import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

interface Data {
  _id: string;
  username: string;
  email: string;
  fullname: string;
  avatar: {
    url: string;
    public_id: string;
    _id: string;
  };
  coverImage: {
    url: string;
    public_id: string;
    _id: string;
  };
  subscribersCount: number;
  channelsSubscribedToCount: number;
  isSubscribed: boolean;
}

interface ChannelDetailsResponse {
  statusCode: number;
  data: Data;
  message: string;
  success: boolean;
}

interface ErrorResponse {
  message: string;
}

const useGetChannelDetails = () => {
  const { username } = useParams<{ username: string }>();

  return useQuery<ChannelDetailsResponse, ErrorResponse>({
    queryKey: ["channelDetails", username],
    queryFn: async () => {
      try {
        const response = await fetch(`/api/v1/users/c/${username}`);
        if (!response.ok) {
          const error: ErrorResponse = await response.json();
          throw new Error(error.message);
        }
        const data: ChannelDetailsResponse = await response.json();
        return data;
      } catch (error) {
        if (error instanceof Error) {
          throw error;
        } else {
          throw "Error while fetching channel details";
        }
      }
    },
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
};

export default useGetChannelDetails;
