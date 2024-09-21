import { useMutation } from "@tanstack/react-query";

interface ErrorResponse {
  message: string;
}

const useUpdateAvatar = () => {
  return useMutation<void, ErrorResponse, File>({
    mutationFn: async (avatar) => {
      const formData = new FormData();
      if (avatar) {
        formData.append("avatar", avatar);
      }

      const response = await fetch("/api/v1/users/avatar", {
        method: "PATCH",
        body: formData,
        credentials: "include",
      });
      if (!response.ok) {
        const error: ErrorResponse = await response.json();
        throw new Error(error.message);
      }
    },
  });
};

export default useUpdateAvatar;
