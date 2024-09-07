import { useMutation } from "@tanstack/react-query";

interface Data {
  tweet: string;
  likedBy: string;
  _id: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface LikeToggleTweetResponse {
  statusCode: number;
  data: Data;
  message: string;
  success: boolean;
}

interface ErrorResponse {
  message: string;
}

function useLikeToggleTweet() {
  return useMutation<LikeToggleTweetResponse, ErrorResponse, string>({
    mutationFn: async (tweetId) => {
      const response = await fetch(`/api/v1/likes/toggle/t/${tweetId}`, {
        method: "POST",
        credentials: "include",
      });
      const contentType = response.headers.get("Content-Type");
      if (contentType && contentType.includes("application/json")) {
        const data: LikeToggleTweetResponse = await response.json();
        if (!response.ok) {
          throw new Error(data.message || "Error toggling like");
        }
        return data;
      } else {
        const text = await response.text();
        throw new Error(`Unexpected response format: ${text}`);
      }
    },
  });
}

export default useLikeToggleTweet;
