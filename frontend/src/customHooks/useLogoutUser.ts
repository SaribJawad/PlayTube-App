import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAppDispatch } from "../app/hooks";
import {
  logoutFailure,
  logoutRequest,
  logoutSuccess,
} from "../features/auth/authSlice";
import { toast } from "react-toastify";

interface ErrorResponse {
  message: string;
}

interface LogoutUserResponse {
  statusCode: number;
  data: {};
  message: string;
  success: boolean;
}

const useLogoutUser = () => {
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();
  return useMutation<LogoutUserResponse, ErrorResponse>({
    mutationFn: async () => {
      dispatch(logoutRequest());

      const response = await fetch("/api/v1/users/logout", {
        method: "POST",
        credentials: "include",
      });
      if (!response.ok) {
        const error: ErrorResponse = await response.json();
        dispatch(logoutFailure(error.message));
        throw new Error(error.message);
      }
      const data: LogoutUserResponse = await response.json();
      dispatch(logoutSuccess());
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["authStatus"] });
      setTimeout(() => {
        toast.success("Logged out!");
      }, 500);
    },
  });
};

export default useLogoutUser;
