import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

interface Tweet {
  _id: string;
  content: string;
  owner: {
    username: string;
    fullname: string;
    avatar: string;
  };
}

interface CreateTweetResponse {
  statusCode: number;
  data: Tweet;
  message: string;
  success: boolean;
}

interface ErrorResponse {
  message: string;
}

interface Content {
  tweetContent: string;
}

const useCreateTweet = () => {
  const { userId } = useParams<{ userId: string }>();
  const queryClient = useQueryClient();

  return useMutation<CreateTweetResponse, ErrorResponse, Content>({
    mutationFn: async ({ tweetContent }) => {
      try {
        const response = await fetch("/api/v1/tweets", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ tweetContent }),
          credentials: "include",
        });

        if (!response.ok) {
          const error: ErrorResponse = await response.json();
          throw new Error(error.message);
        }

        const data: CreateTweetResponse = await response.json();
        return data;
      } catch (error) {
        if (error instanceof Error) {
          throw error.message;
        } else {
          throw "Error while creating tweet";
        }
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tweets", userId] });
      toast.success("Tweet created succesfully");
    },
  });
};

export default useCreateTweet;
