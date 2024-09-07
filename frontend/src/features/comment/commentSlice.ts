import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Comments {
  _id: string;
  content: string;
  video: string;
  owner: {
    username: string;
    fullname: string;
    _id: string;
    avatar: {
      url: string;
    };
  };
  likes: string[];
  createdAt: string;
}

interface CommentState {
  loading: boolean;
  comments: Comments[];
  error: string | null;
}

const initialState: CommentState = {
  loading: false,
  comments: [],
  error: null,
};

const commentSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {
    commentRequest: (state) => {
      state.loading = true;
    },
    commentSuccess: (state, action: PayloadAction<Comments[]>) => {
      state.loading = false;
      state.error = null;
      state.comments = action.payload;
    },
    commentFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { commentRequest, commentFailure, commentSuccess } =
  commentSlice.actions;

export default commentSlice.reducer;
