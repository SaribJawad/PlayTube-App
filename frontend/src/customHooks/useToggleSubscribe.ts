import { useMutation } from "@tanstack/react-query";

interface ErrorResponse {
  message: string;
}

interface ToggleSubscribeArg {
  channelId: string;
}

const useToggleSubscribe = () => {
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || "";

  return useMutation<void, ErrorResponse, ToggleSubscribeArg>({
    mutationFn: async ({ channelId }) => {
      const response = await fetch(
        `${apiBaseUrl}/api/v1/subscription/c/${channelId}`,
        {
          method: "POST",
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

export default useToggleSubscribe;
