import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

interface ErrorResponse {
  message: string;
}

const useDeleteVideo = () => {
  const queryClient = useQueryClient();
  return useMutation<void, ErrorResponse, string>({
    mutationFn: async (videoId) => {
      const response = await fetch(`/api/v1/videos/${videoId}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (!response.ok) {
        const error: ErrorResponse = await response.json();
        throw new Error(error.message);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["ContentChannelVideos"],
      });
      queryClient.invalidateQueries({ queryKey: ["channelStats"] });
    },
    onError: (error) => {
      toast.error("Failed to update video publish status.");
      console.error(error);
    },
  });
};

export default useDeleteVideo;
