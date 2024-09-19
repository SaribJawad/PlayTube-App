import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UsersPlaylistVideo {
  _id: string;
  thumbnail: {
    url: string;
    public_id: string;
    _id: string;
  };
}

interface UsersPlaylist {
  _id: string;
  name: string;
  description: string;
  videos?: UsersPlaylistVideo[];
  videoCount: number;
  owner: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface Video {
  _id: string;
  thumbnail: {
    url: string;
  };
  title: string;
  description: string;
  duration: number;
  views: number;
  owner: {
    _id: string;
    username: string;
    fullname: string;
    avatar: {
      url: string;
    };
  };
  createdAt: string;
}

interface Playlist {
  _id: string;
  name: string;
  owner: {
    _id: string;
    username: string;
    fullname: string;
    avatar: {
      url: string;
    };
  };
  description: string;
  videos?: Video[];

  createdAt: string;
  videoCount: number;
}

interface InitialState {
  loading: boolean;
  usersPlaylist: UsersPlaylist[];
  playlistDetail: Playlist | null;
  error: string | null;
}

const initialState: InitialState = {
  loading: false,
  usersPlaylist: [],
  playlistDetail: null,
  error: null,
};

const playlistSlice = createSlice({
  name: "playlist",
  initialState,
  reducers: {
    playlistRequest: (state) => {
      state.loading = true;
    },
    usersPlaylistSuccess: (state, action: PayloadAction<UsersPlaylist[]>) => {
      state.loading = false;
      state.usersPlaylist = action.payload;
      state.error = null;
    },
    playlistDetailSuccess: (state, action: PayloadAction<Playlist>) => {
      state.loading = false;
      state.playlistDetail = action.payload;
      state.error = null;
    },
    playlistFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  playlistRequest,
  usersPlaylistSuccess,
  playlistFailure,
  playlistDetailSuccess,
} = playlistSlice.actions;

export default playlistSlice.reducer;
