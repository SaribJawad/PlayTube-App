import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { useAppDispatch } from "../app/hooks";
import {
  playlistDetailSuccess,
  playlistFailure,
  playlistRequest,
} from "../features/playlist/playlistSlice";

interface Video {
  _id: string;
  thumbnail: {
    url: string;
  };
  title: string;
  description: string;
  duration: number;
  views: number;
  owner: {
    _id: string;
    username: string;
    fullname: string;
    avatar: {
      url: string;
    };
  };
  createdAt: string;
}

interface PlaylistDetail {
  _id: string;
  name: string;
  description: string;
  videos?: Video[];
  createdAt: string;
  videoCount: number;
  owner: {
    _id: string;
    username: string;
    fullname: string;
    avatar: {
      url: string;
    };
  };
}

interface GetPlaylistDetailResponse {
  statusCode: number;
  data: PlaylistDetail;
  message: string;
  success: boolean;
}

interface ErrorResponse {
  message: string;
}

const useGetPlaylistDetail = () => {
  const { playlistId } = useParams<{ playlistId: string }>();
  const dispatch = useAppDispatch();

  return useQuery<GetPlaylistDetailResponse, ErrorResponse>({
    queryKey: ["playlistDetail"],
    queryFn: async () => {
      dispatch(playlistRequest());
      const response = await fetch(`/api/v1/playlist/${playlistId}`, {
        method: "GET",
        credentials: "include",
      });
      if (!response.ok) {
        const error: ErrorResponse = await response.json();
        dispatch(playlistFailure(error.message));
        throw new Error(error.message);
      }
      const data: GetPlaylistDetailResponse = await response.json();
      dispatch(playlistDetailSuccess(data.data));
      return data;
    },
    enabled: !!playlistId,
  });
};

export default useGetPlaylistDetail;
