import { useAppDispatch } from "../app/hooks";
import { useParams } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  commentFailure,
  commentRequest,
  commentSuccess,
} from "../features/comment/commentSlice";

interface Comment {
  _id: string;
  content: string;
  video: string;
  owner: {
    username: string;
    fullname: string;
    _id: string;
    avatar: {
      url: string;
    };
  };
  createdAt: string;
}

interface CommentResponse {
  statusCode: number;
  data: Comment[];
  message: string;
  success: boolean;
}

interface ErrorResponse {
  message: string;
}

const useGetVideoComments = () => {
  const dispatch = useAppDispatch();
  const { videoId } = useParams<{ videoId: string }>();
  const queryClient = useQueryClient();

  const queryResult = useQuery<CommentResponse, ErrorResponse>({
    queryKey: ["comment", videoId],
    queryFn: async () => {
      try {
        dispatch(commentRequest());
        const response = await fetch(`/api/v1/comments/${videoId}`, {
          method: "GET",
          credentials: "include",
        });

        if (!response.ok) {
          const error: ErrorResponse = await response.json();
          dispatch(commentFailure(error.message));
          throw new Error(error.message);
        }
        const data: CommentResponse = await response.json();

        dispatch(commentSuccess(data?.data));

        return data;
      } catch (error) {
        if (error instanceof Error) {
          dispatch(commentFailure(error.message));
          throw error;
        } else {
          dispatch(commentFailure("Error while fetching the comment"));
          throw "Error while fetching the comment";
        }
      }
    },

    staleTime: 0,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    enabled: Boolean(videoId),
  });

  const invalidateComment = (): void => {
    queryClient.invalidateQueries({ queryKey: ["comment", videoId] });
  };

  return {
    ...queryResult,
    invalidateComment,
  };
};

export default useGetVideoComments;
