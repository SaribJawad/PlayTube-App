import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import VideoReducer from "../features/video/videoSlice";
import TweetReducer from "../features/Tweet/tweetSlice";
import CommentReducer from "../features/comment/commentSlice";
import ChannelsReducer from "../features/channels/channelsSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    video: VideoReducer,
    comment: CommentReducer,
    tweet: TweetReducer,
    channels: ChannelsReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
