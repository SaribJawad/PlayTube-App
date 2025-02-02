import { useAppDispatch } from "../app/hooks";
import { authStatusSuccess } from "../features/auth/authSlice";
import { useQuery } from "@tanstack/react-query";

interface checkAuthStatusResponse {
  statusCode: number;
  data: {
    isAuthenticated: boolean;
  };
  message: string;
  success: boolean;
}

const useCheckAuthStatus = () => {
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || "";
  const dispatch = useAppDispatch();

  return useQuery<checkAuthStatusResponse>({
    queryKey: ["authStatus"],
    queryFn: async () => {
      const response = await fetch(`${apiBaseUrl}/api/v1/users/check-auth`, {
        method: "GET",
        credentials: "include",
      });

      if (!response.ok) {
        dispatch(authStatusSuccess(false));
      }

      const data: checkAuthStatusResponse = await response.json();
      dispatch(authStatusSuccess(data.data.isAuthenticated));

      return data;
    },
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
};

export default useCheckAuthStatus;
