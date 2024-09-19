import { useMutation } from "@tanstack/react-query";

interface ErrorResponse {
  message: string;
}

interface FormValues {
  name: string;
  description: string;
}

const useCreatePlaylist = () => {
  return useMutation<void, ErrorResponse, FormValues>({
    mutationFn: async ({ name, description }) => {
      const response = await fetch("/api/v1/playlist", {
        method: "POST",

        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, description }),
      });

      if (!response.ok) {
        const error: ErrorResponse = await response.json();
        throw new Error(error.message);
      }
    },
  });
};

export default useCreatePlaylist;
