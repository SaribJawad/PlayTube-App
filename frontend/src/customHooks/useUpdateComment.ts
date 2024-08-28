import { useMutation } from "@tanstack/react-query";

interface UpdatedComment {
  _id: string;
  content: string;
  video: string;
  owner: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface UpdateCommentResponse {
  status: number;
  data: UpdatedComment;
  message: string;
  success: boolean;
}

interface ErrorResponse {
  message: string;
}

interface UpdateCommentArgs {
  content: string;
  commentId: string;
}

const useUpdateComment = () => {
  return useMutation<UpdateCommentResponse, ErrorResponse, UpdateCommentArgs>({
    mutationFn: async ({ content, commentId }) => {
      const response = await fetch(`/api/v1/comments/c/${commentId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content }),
      });

      if (!response.ok) {
        const error: ErrorResponse = await response.json();
        throw new Error(error.message);
      }
      return await response.json();
    },
  });
};

export default useUpdateComment;
