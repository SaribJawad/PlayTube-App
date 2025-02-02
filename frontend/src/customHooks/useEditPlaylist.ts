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
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || "";

  return useMutation<void, ErrorResponse, EditPlaylistArgs>({
    mutationFn: async ({ data, playlistId }) => {
      const response = await fetch(
        `${apiBaseUrl}/api/v1/playlist/${playlistId}`,
        {
          method: "PATCH",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        const error: ErrorResponse = await response.json();
        throw new Error(error.message);
      }
    },
  });
};

export default useEditPlaylist;
