import { useMutation } from "@tanstack/react-query";

interface Data {
  _id: string;
  content: string;
  owner: string;
  createdAt: string;
  updateAt: string;
  __v: number;
}

interface DeleteTweetResponse {
  statusCode: number;
  data: Data;
  message: string;
  success: boolean;
}

interface ErrorResponse {
  message: string;
}

const useDeleteTweet = () => {
  return useMutation<DeleteTweetResponse, ErrorResponse, string>({
    mutationFn: async (tweetId) => {
      const response = await fetch(`/api/v1/tweets/${tweetId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      if (!response.ok) {
        const error: ErrorResponse = await response.json();
        throw new Error(error.message);
      }
      return await response.json();
    },
  });
};

export default useDeleteTweet;
