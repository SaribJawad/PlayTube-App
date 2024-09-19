import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

interface ErrorResponse {
  message: string;
}

interface UpdateVideoArg {
  updatedData: {
    title?: string;
    description?: string;
    thumbnail?: File;
  };
  videoId?: string;
}

const useUpdateVideo = () => {
  const queryClient = useQueryClient();
  return useMutation<void, ErrorResponse, UpdateVideoArg>({
    mutationFn: async ({ updatedData, videoId }) => {
      const formData = new FormData();
      if (updatedData.title) formData.append("title", updatedData.title);
      if (updatedData.description)
        formData.append("description", updatedData.description);
      if (updatedData.thumbnail)
        formData.append("thumbnail", updatedData.thumbnail);

      const response = await fetch(`/api/v1/videos/${videoId}`, {
        method: "PATCH",
        body: formData,
        credentials: "include",
      });
      if (!response.ok) {
        const error: ErrorResponse = await response.json();
        throw new Error(error.message);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ContentChannelVideos"] });
      queryClient.invalidateQueries({ queryKey: ["videos"], exact: false });
      queryClient.invalidateQueries({
        queryKey: ["channelDetails"],
        exact: false,
      });
      setTimeout(() => {
        toast.success("Video updated successfully");
      }, 500);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export default useUpdateVideo;
