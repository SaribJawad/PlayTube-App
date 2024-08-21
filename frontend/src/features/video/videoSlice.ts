import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Video {
  _id: string;
  thumbnail: {
    url: string;
    public_id: string;
    _id: string;
  };
  title: string;
  duration: number;
  views: 1;
  owner: {
    _id: string;
    username: string;
    avatar: {
      url: string;
      public_id: string;
      _id: string;
    };
    subscribersCount: number;
  };
  createdAt: string;
}

interface VideoState {
  allVideos: Video[];
  searchResults: Video[];
  channelVideos: Video[];
  loading: boolean;
  error: string | null;
}

const initialState: VideoState = {
  allVideos: [],
  searchResults: [],
  channelVideos: [],
  loading: false,
  error: null,
};

const videoSlice = createSlice({
  name: "videos",
  initialState,
  reducers: {
    videoRequest: (state) => {
      state.loading = true;
    },
    allVideosSuccess: (state, action: PayloadAction<Video[]>) => {
      state.loading = false;
      state.allVideos = action.payload;
      state.error = null;
    },
    searchResultsSuccess: (state, action: PayloadAction<Video[]>) => {
      state.loading = false;
      state.allVideos = action.payload;
      state.error = null;
    },
    channelVideosSuccess: (state, action: PayloadAction<Video[]>) => {
      state.loading = false;
      state.allVideos = action.payload;
      state.error = null;
    },
    videoFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  videoRequest,
  allVideosSuccess,
  searchResultsSuccess,
  channelVideosSuccess,
  videoFailure,
} = videoSlice.actions;

export default videoSlice.reducer;
