import { useMutation } from "@tanstack/react-query";

interface FormValues {
  oldPassword: string;
  newPassword: string;
}

interface ErrorResponse {
  message: string;
}

const useUpdatePassword = () => {
  return useMutation<void, ErrorResponse, FormValues>({
    mutationFn: async ({ oldPassword, newPassword }) => {
      const response = await fetch("/api/v1/users/change-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ oldPassword, newPassword }),
      });
      if (!response.ok) {
        const error: ErrorResponse = await response.json();
        throw new Error(error.message);
      }
    },
  });
};

export default useUpdatePassword;
