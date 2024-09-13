import { useMutation } from "@tanstack/react-query";

interface FormData {
  fullname: string;
  email: string;
}

interface ErrorResponse {
  message: string;
}

const useUpdatePersonalInformation = () => {
  return useMutation<void, ErrorResponse, FormData>({
    mutationFn: async ({ fullname, email }) => {
      const response = await fetch("/api/v1/users/update-account", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ fullname, email }),
      });
      if (!response.ok) {
        const error: ErrorResponse = await response.json();
        throw new Error(error.message);
      }
    },
  });
};

export default useUpdatePersonalInformation;
