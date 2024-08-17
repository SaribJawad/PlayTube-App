import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  isAuthenticated: JSON.parse(
    localStorage.getItem("isAuthenticated") || "false"
  ),
  user: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginRequest: (state) => {
      state.loading = true;
    },
    loginSuccess: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.loading = false;
      state.error = null;
      localStorage.setItem("isAuthenticated", "true");
    },
    loginFailure: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
    signupRequest: (state) => {
      state.loading = true;
    },
    signupSuccess: (state, action: PayloadAction<User>) => {
      state.isAuthenticated = true;
      state.loading = false;
      state.user = action.payload;
      state.error = null;

      localStorage.setItem("isAuthenticated", "true");
    },
    signupFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.loading = false;
      state.user = null;
      state.error = null;
      localStorage.removeItem("isAuthenticated");
    },
  },
});

export const {
  loginRequest,
  loginSuccess,
  loginFailure,
  signupFailure,
  signupRequest,
  signupSuccess,
  logout,
} = authSlice.actions;

export default authSlice.reducer;
