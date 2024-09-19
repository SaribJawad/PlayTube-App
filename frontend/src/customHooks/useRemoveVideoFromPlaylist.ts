import { useMutation } from "@tanstack/react-query";

interface ErrorResponse {
  message: string;
}

interface RemoveVideoFromPlaylistArg {
  playlistId: string;
  videoId: string;
}

const useRemoveVideoFromPlaylist = () => {
  return useMutation<void, ErrorResponse, RemoveVideoFromPlaylistArg>({
    mutationFn: async ({ playlistId, videoId }) => {
      const response = await fetch(
        `/api/v1/playlist/remove/${videoId}/${playlistId}`,
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
