import { useMutation } from "@tanstack/react-query";

interface ErrorResponse {
  message: string;
}

interface ToggleSubscribeArg {
  channelId: string;
}

const useToggleSubscribe = () => {
  return useMutation<void, ErrorResponse, ToggleSubscribeArg>({
    mutationFn: async ({ channelId }) => {
      const response = await fetch(`/api/v1/subscription/c/${channelId}`, {
        method: "POST",
        credentials: "include",
      });
      if (!response.ok) {
        const error: ErrorResponse = await response.json();
        throw new Error(error.message);
      }
    },
  });
};

export default useToggleSubscribe;
