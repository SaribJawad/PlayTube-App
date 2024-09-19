import { useMutation } from "@tanstack/react-query";

interface ErrorResponse {
  message: string;
}

const useDeletePlaylist = () => {
  return useMutation<void, ErrorResponse, string>({
    mutationFn: async (playlistId) => {
      const response = await fetch(`/api/v1/playlist/${playlistId}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (!response.ok) {
        const error: ErrorResponse = await response.json();
        throw new Error(error.message);
      }
    },
  });
};

export default useDeletePlaylist;
