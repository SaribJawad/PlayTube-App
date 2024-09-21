import { useMutation } from "@tanstack/react-query";

interface ErrorResponse {
  message: string;
}

const useUpdateCoverImage = () => {
  return useMutation<void, ErrorResponse, File>({
    mutationFn: async (coverImage) => {
      const formData = new FormData();
      if (coverImage) {
        formData.append("coverImage", coverImage);
      }

      const response = await fetch("/api/v1/users/cover-image", {
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

export default useUpdateCoverImage;
