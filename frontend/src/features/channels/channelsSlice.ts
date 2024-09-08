import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Channel {
  _id: string;
  subscriber: string;
  channel: {
    _id: string;
    username: string;
    fullname: string;
    avatar: {
      url: string;
    };
    subscriberCount: string[];
  };
}

interface InitialState {
  loading: boolean;
  subscribedChannel: Channel[];
  error: string | null;
}

const initialState: InitialState = {
  loading: false,
  subscribedChannel: [],
  error: null,
};

const channelsSlice = createSlice({
  name: "channels",
  initialState,
  reducers: {
    channelRequest: (state) => {
      state.loading = true;
    },
    subscribedChannelSucess: (state, action: PayloadAction<Channel[]>) => {
      state.loading = false;
      state.subscribedChannel = action.payload;
      state.error = null;
    },
    channelFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { channelRequest, subscribedChannelSucess, channelFailure } =
  channelsSlice.actions;

export default channelsSlice.reducer;
