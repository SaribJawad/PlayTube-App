import { useQuery } from "@tanstack/react-query";
import { useAppDispatch } from "../app/hooks";
import {
  watchedHistoryFailure,
  watchedHistoryRequest,
  watchedHistorySuccess,
} from "../features/watchedHistory/watchedHistorySlice";

interface WatchedHistory {
  _id: string;
  thumbnail: {
    url: string;
  };
  title: string;
  description: string;
  duration: number;
  views: string[];
  owner: {
    _id: string;
    username: string;
    avatar: {
      url: string;
    };
  };
}

interface GetWatchedHistoryResponse {
  statusCode: number;
  data: WatchedHistory[];
  message: string;
  success: boolean;
}

interface ErrorResponse {
  message: string;
}

const useGetWatchedHistory = () => {
  const dispatch = useAppDispatch();

  return useQuery<GetWatchedHistoryResponse, ErrorResponse>({
    queryKey: ["watchedHistory"],
    queryFn: async () => {
      dispatch(watchedHistoryRequest());
      const response = await fetch("/api/v1/users/watch-history");
      if (!response.ok) {
        const error: ErrorResponse = await response.json();
        dispatch(watchedHistoryFailure(error.message));
        throw new Error(error.message);
      }

      const data: GetWatchedHistoryResponse = await response.json();
      dispatch(watchedHistorySuccess(data.data));
      return data;
    },
    // staleTime: 3600000,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
};

export default useGetWatchedHistory;
