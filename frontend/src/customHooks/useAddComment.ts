import { useMutation } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

interface Data {
  content: string;
  video: string;
  owner: string;
  _id: string;
  createdAt: string;
  updatedAt: string;
}

interface AddCommentResponse {
  statusCode: number;
  data: Data;
  message: string;
  success: boolean;
}

interface ErrorResponse {
  message: string;
}

const useAddComment = () => {
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || "";
  const { videoId } = useParams<{ videoId: string }>();

  return useMutation<AddCommentResponse, ErrorResponse, string>({
    mutationFn: async (content) => {
      const response = await fetch(`${apiBaseUrl}/api/v1/comments/${videoId}`, {
        method: "POST",
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

export default useAddComment;
