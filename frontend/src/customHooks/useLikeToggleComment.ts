import { useMutation } from "@tanstack/react-query";

interface Data {
  comment: string;
  likedBy: string;
  _id: string;
  updatedAt: string;
  createdAt: string;
  __v: number;
}

interface LikeToggelCommentResponse {
  statusCode: number;
  data: Data;
  message: string;
  success: boolean;
}

interface ErrorResponse {
  message: string;
}

function useLikeToggleComment() {
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || "";

  return useMutation<LikeToggelCommentResponse, ErrorResponse, string>({
    mutationFn: async (commentId) => {
      const response = await fetch(
        `${apiBaseUrl}/api/v1/likes/toggle/c/${commentId}`,
        {
          method: "POST",
          credentials: "include",
        }
      );
      if (!response.ok) {
        const error: ErrorResponse = await response.json();
        throw new Error(error.message);
      }
      const data: LikeToggelCommentResponse = await response.json();
      return data;
    },
  });
}

export default useLikeToggleComment;
