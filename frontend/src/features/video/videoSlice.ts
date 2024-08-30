import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface VideoFile {
  _id: string;
  videoFile: {
    url: string;
    public_id: string;
    _id: string;
  };
  description: string;
  thumbnail: {
    url: string;
    public_id: string;
    _id: string;
  };
  title: string;
  duration: number;
  views: 1;
  isPublished: boolean;
  owner: {
    _id: string;
    username: string;
    fullname: string;
    avatar: {
      url: string;
      public_id: string;
      _id: string;
    };
    subscribers: number;
    isSubscribed: boolean;
  };
  likes: string[];
  createdAt: string;
}

interface Video {
  _id: string;
  description: string;
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
  video: VideoFile | null;
  allVideos: Video[];
  searchResults: Video[];
  channelVideos: Video[];
  loading: boolean;
  error: string | null;
}

const initialState: VideoState = {
  video: null,
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
    getVideoSuccess: (state, action: PayloadAction<VideoFile>) => {
      state.loading = false;
      state.video = action.payload;
      state.error = null;
    },
    allVideosSuccess: (state, action: PayloadAction<Video[]>) => {
      state.loading = false;
      state.allVideos = action.payload;
      state.error = null;
    },
    searchResultsSuccess: (state, action: PayloadAction<Video[]>) => {
      state.loading = false;
      state.searchResults = action.payload;
      state.error = null;
    },
    channelVideosSuccess: (state, action: PayloadAction<Video[]>) => {
      state.loading = false;
      state.channelVideos = action.payload;
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
  getVideoSuccess,
} = videoSlice.actions;

export default videoSlice.reducer;
