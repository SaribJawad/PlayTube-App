import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { useAppDispatch } from "../app/hooks";
import {
  tweetFailure,
  tweetRequest,
  tweetSuccess,
} from "../features/Tweet/tweetSlice";
import { videoFailure } from "../features/video/videoSlice";

interface Tweet {
  _id: string;
  content: string;
  owner: {
    _id: string;
    username: string;
    fullname: string;
    avatar: {
      url: string;
    };
  };
  createdAt: string;
  likes: string[];
}

interface GetUserTweetsResponse {
  statusCode: number;
  data: Tweet[];
  message: string;
  success: boolean;
}

interface ErrorResponse {
  message: string;
}

const useGetUsersTweets = () => {
  const { userId } = useParams<{ userId: string }>();
  const dispatch = useAppDispatch();

  return useQuery<GetUserTweetsResponse, ErrorResponse>({
    queryKey: ["tweets", userId],
    queryFn: async () => {
      try {
        dispatch(tweetRequest());
        const response = await fetch(`/api/v1/tweets/user/${userId}`, {
          method: "GET",
          credentials: "include",
        });

        if (!response.ok) {
          const error: ErrorResponse = await response.json();
          dispatch(tweetFailure(error.message));
          throw new Error(error.message);
        }
        const data: GetUserTweetsResponse = await response.json();
        dispatch(tweetSuccess(data?.data));
        return data;
      } catch (error) {
        if (error instanceof Error) {
          dispatch(tweetFailure(error.message));
          throw error;
        } else {
          dispatch(videoFailure("Error while fetching user's tweets"));
          throw "Error while fetching user's tweets";
        }
      }
    },
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
};

export default useGetUsersTweets;
