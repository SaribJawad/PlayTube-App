import { useMutation } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

interface ErrorResponse {
  message: string;
}

const useAddVideoToPlaylist = () => {
  const { videoId } = useParams<{ videoId: string }>();

  return useMutation<void, ErrorResponse, string>({
    mutationFn: async (playlistId) => {
      const response = await fetch(
        `/api/v1/playlist/add/${videoId}/${playlistId}`,
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

export default useAddVideoToPlaylist;
