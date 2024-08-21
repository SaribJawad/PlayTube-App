import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import VideoReducer from "../features/video/videoSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    video: VideoReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
