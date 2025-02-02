import { useMutation } from "@tanstack/react-query";

interface ErrorResponse {
  message: string;
}

interface RemoveVideoFromPlaylistArg {
  playlistId: string;
  videoId: string;
}

const useRemoveVideoFromPlaylist = () => {
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || "";
  return useMutation<void, ErrorResponse, RemoveVideoFromPlaylistArg>({
    mutationFn: async ({ playlistId, videoId }) => {
      const response = await fetch(
        `${apiBaseUrl}/api/v1/playlist/remove/${videoId}/${playlistId}`,
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
  });
};

export default useRemoveVideoFromPlaylist;
