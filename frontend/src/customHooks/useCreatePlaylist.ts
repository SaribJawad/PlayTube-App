import { useMutation } from "@tanstack/react-query";

interface ErrorResponse {
  message: string;
}

interface FormValues {
  name: string;
  description: string;
}

const useCreatePlaylist = () => {
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || "";

  return useMutation<void, ErrorResponse, FormValues>({
    mutationFn: async ({ name, description }) => {
      const response = await fetch(`${apiBaseUrl}/api/v1/playlist`, {
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
