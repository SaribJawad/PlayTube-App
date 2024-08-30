import { useMutation } from "@tanstack/react-query";

interface DeleteCommentResponse {
  statusCode: number;
  data: string;
  message: string;
  success: boolean;
}

interface ErrorResponse {
  message: string;
}

const useDeleteComment = () => {
  return useMutation<DeleteCommentResponse, ErrorResponse, string>({
    mutationFn: async (commentId) => {
      const response = await fetch(`/api/v1/comments/c/${commentId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        const error: ErrorResponse = await response.json();
        throw new Error(error.message);
      }
      return await response.json();
    },
  });
};

export default useDeleteComment;
