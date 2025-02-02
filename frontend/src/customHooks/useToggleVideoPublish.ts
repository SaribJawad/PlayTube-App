import { useMutation, useQueryClient } from "@tanstack/react-query";

interface ErrorResponse {
  message: string;
}

const useToggleVideoPublish = () => {
  const queryClient = useQueryClient();
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || "";

  return useMutation<void, ErrorResponse, string>({
    mutationFn: async (videoId) => {
      const response = await fetch(
        `${apiBaseUrl}/api/v1/videos/toggle/publish/${videoId}`,
        {
          method: "PATCH",
          credentials: "include",
        }
      );
      if (!response.ok) {
        const error: ErrorResponse = await response.json();
        throw new Error(error.message);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ContentChannelVideos"] });
      queryClient.invalidateQueries({ queryKey: ["likedVideos"] });
    },
  });
};

export default useToggleVideoPublish;
