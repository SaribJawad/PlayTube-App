import { useMutation } from "@tanstack/react-query";
import { useAppDispatch } from "../app/hooks";
import {
  loginFailure,
  signupFailure,
  signupRequest,
  signupSuccess,
} from "../features/auth/authSlice";

interface Video {
  _id: string;
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

interface SignupResponse {
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

interface SignupData {
  email: string;
  fullname: string;
  username: string;
  avatar: FileList;
  password: string;
}

const useSignup = () => {
  const dispatch = useAppDispatch();

  return useMutation<SignupResponse, ErrorResponse, SignupData>({
    mutationFn: async ({
      email,
      fullname,
      username,
      avatar,
      password,
    }: SignupData) => {
      try {
        dispatch(signupRequest());

        const formData = new FormData();
        formData.append("email", email);
        formData.append("username", username);
        formData.append("password", password);
        formData.append("fullname", fullname);
        formData.append("avatar", avatar[0]);

        const response = await fetch("/api/v1/users/register", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          const error: ErrorResponse = await response.json();
          dispatch(signupFailure(error.message));
          throw new Error(error.message);
        }

        const data: SignupResponse = await response.json();
        dispatch(signupSuccess(data?.data?.user));
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

export default useSignup;
