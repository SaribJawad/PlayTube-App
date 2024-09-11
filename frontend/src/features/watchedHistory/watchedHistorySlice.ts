import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface watchedHistory {
  _id: string;
  thumbnail: {
    url: string;
  };
  title: string;
  description: string;
  views: string[];
  duration: number;
  owner: {
    _id: string;
    username: string;
    avatar: {
      url: string;
    };
  };
}

interface ChannelState {
  loading: boolean;
  error: string | null;
  watchedHistory: watchedHistory[];
}

const initialState: ChannelState = {
  loading: false,
  watchedHistory: [],
  error: null,
};

const channelSlice = createSlice({
  name: "watchedHistory",
  initialState,
  reducers: {
    watchedHistoryRequest: (state) => {
      state.loading = true;
    },
    watchedHistorySuccess: (state, action: PayloadAction<watchedHistory[]>) => {
      state.loading = false;
      state.watchedHistory = action.payload;
      state.error = null;
    },

    watchedHistoryFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  watchedHistoryRequest,
  watchedHistoryFailure,
  watchedHistorySuccess,
} = channelSlice.actions;

export default channelSlice.reducer;
