import { useMutation } from "@tanstack/react-query";

interface ErrorResponse {
  message: string;
}

interface FormValues {
  name: string;
  description: string;
}

interface EditPlaylistArgs {
  data: FormValues;
  playlistId: string;
}

const useEditPlaylist = () => {
  return useMutation<void, ErrorResponse, EditPlaylistArgs>({
    mutationFn: async ({ data, playlistId }) => {
      const response = await fetch(`/api/v1/playlist/${playlistId}`, {
        method: "PATCH",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error: ErrorResponse = await response.json();
        throw new Error(error.message);
      }
    },
  });
};

export default useEditPlaylist;
