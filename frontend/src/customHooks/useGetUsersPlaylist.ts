import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { useAppDispatch } from "../app/hooks";
import {
  playlistFailure,
  playlistRequest,
  usersPlaylistSuccess,
} from "../features/playlist/playlistSlice";

interface UsersPlaylistVideo {
  _id: string;
  thumbnail: {
    url: string;
    public_id: string;
    _id: string;
  };
}

interface UsersPlaylist {
  _id: string;
  name: string;
  description: string;
  videos?: UsersPlaylistVideo[];
  videoCount: number;
  owner: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface GetUsersPlaylistResponse {
  statusCode: number;
  data: UsersPlaylist[];
  message: string;
  success: boolean;
}

interface ErrorResponse {
  message: string;
}

const useGetUsersPlaylist = (passedUserId?: string) => {
  const dispatch = useAppDispatch();
  const { userId: paramUserId } = useParams<{ userId: string }>();

  const userId = passedUserId || paramUserId;

  return useQuery<GetUsersPlaylistResponse, ErrorResponse>({
    queryKey: ["usersPlaylist", userId],
    queryFn: async () => {
      if (!userId) {
        throw new Error("User ID is required to fetch the playlist.");
      }

      dispatch(playlistRequest());

      const response = await fetch(`/api/v1/playlist/user/${userId}`, {
        method: "GET",
        credentials: "include",
      });
      if (!response.ok) {
        const error: ErrorResponse = await response.json();
        dispatch(playlistFailure(error.message));
        throw new Error(error.message);
      }
      const data: GetUsersPlaylistResponse = await response.json();
      dispatch(usersPlaylistSuccess(data.data));
      return data;
    },
    enabled: !!userId,
    refetchOnWindowFocus: false,
  });
};

export default useGetUsersPlaylist;
