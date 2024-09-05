import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Tweet {
  _id: string;
  content: string;
  owner: {
    _id: string;
    username: string;
    fullname: string;
    avatar: {
      url: string;
    };
  };
  createdAt: string;
  likes: string[];
}

interface TweetState {
  allTweets: Tweet[];
  loading: boolean;
  error: string | null;
}

const initialState: TweetState = {
  allTweets: [],
  loading: false,
  error: null,
};

const tweetSlice = createSlice({
  name: "tweets",
  initialState,
  reducers: {
    tweetRequest: (state) => {
      state.loading = true;
    },
    tweetSuccess: (state, action: PayloadAction<Tweet[]>) => {
      state.loading = false;
      state.error = null;
      state.allTweets = action.payload;
    },
    tweetFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { tweetRequest, tweetSuccess, tweetFailure } = tweetSlice.actions;

export default tweetSlice.reducer;
