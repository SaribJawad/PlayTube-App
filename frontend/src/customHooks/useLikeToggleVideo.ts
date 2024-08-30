import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

interface Data {
  _id: string;
  video: string;
  likedBy: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface LikeToggleVideoResponse {
  statusCode: string;
  data: Data;
  message: string;
  success: boolean;
}

interface ErrorResponse {
  message: string;
}

const useLikeToggleVideo = () => {
  const { videoId } = useParams<{ videoId: string }>();
  const queryClient = useQueryClient();

  return useMutation<LikeToggleVideoResponse, ErrorResponse>({
    mutationFn: async () => {
      const response = await fetch(`/api/v1/likes/toggle/v/${videoId}`, {
        method: "POST",
        credentials: "include",
      });
      const contentType = response.headers.get("Content-Type");
      if (contentType && contentType.includes("application/json")) {
        const data: LikeToggleVideoResponse = await response.json();
        if (!response.ok) {
          throw new Error(data.message || "Error toggling like");
        }
        return data;
      } else {
        const text = await response.text(); // Read response as text
        throw new Error(`Unexpected response format: ${text}`);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["video", videoId] });
    },
    onError: (error) => {
      console.error("Error toggling like:", error.message);
    },
  });
};

export default useLikeToggleVideo;
