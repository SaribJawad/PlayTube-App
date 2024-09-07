import { useMutation } from "@tanstack/react-query";

interface UpdatedTweet {
  _id: string;
  content: string;
  owner: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface UpdateTweetResponse {
  statusCode: number;
  data: UpdatedTweet;
  message: string;
  success: boolean;
}

interface ErrorResponse {
  message: string;
}

interface UpdateTweetArgs {
  tweetContent: string;
  tweetId: string;
}

function useUpdateTweet() {
  return useMutation<UpdateTweetResponse, ErrorResponse, UpdateTweetArgs>({
    mutationFn: async ({ tweetContent, tweetId }) => {
      const response = await fetch(`/api/v1/tweets/${tweetId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ tweetContent }),
      });

      if (!response.ok) {
        const error: ErrorResponse = await response.json();
        throw new Error(error.message);
      }
      return await response.json();
    },
  });
}

export default useUpdateTweet;
