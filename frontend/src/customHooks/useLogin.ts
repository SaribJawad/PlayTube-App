import { useAppDispatch } from "../app/hooks";
import { useMutation } from "@tanstack/react-query";
import {
  loginFailure,
  loginRequest,
  loginSuccess,
} from "../features/auth/authSlice";

interface Video {
  _id: string;
}

interface LoginData {
  email: string;
  password: string;
}

interface User {
  _id: string;
  username: string;
  email: string;
  fullname: string;
  avatar: { url: string; public_id: string; _id: string };
  coverImage: { url: string; public_id: string; _id: string };
  watchedHistory: Video[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface LoginResponse {
  statusCode: number;
  data: {
    user: User;
  };
  message: string;
  success: boolean;
}

interface ErrorResponse {
  message: string;
}

const useLogin = () => {
  const dispatch = useAppDispatch();

  return useMutation<LoginResponse, ErrorResponse, LoginData>({
    mutationFn: async ({ email, password }: LoginData) => {
      try {
        dispatch(loginRequest());

        const response = await fetch("/api/v1/users/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
          const error: ErrorResponse = await response.json();
          dispatch(loginFailure(error.message));

          throw new Error(error.message);
        }

        const data: LoginResponse = await response.json();
        dispatch(loginSuccess(data?.data?.user));
        return data;
      } catch (error) {
        if (error instanceof Error) {
          dispatch(loginFailure(error.message));
          throw error;
        } else {
          dispatch(loginFailure("Error while logging in the user"));
          throw "Error while logging in the user";
        }
      }
    },
  });
};

export default useLogin;
