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

interface ChannelSubscribers {
  _id: string;
  subscriber: {
    _id: string;
    username: string;
    fullname: string;
    avatar: {
      url: string;
    };
    subscriberCount: number;
  };
  channel: string;
}

interface InitialState {
  loading: boolean;
  subscribedChannel: Channel[];
  channelSubscribers: ChannelSubscribers[];
  error: string | null;
}

const initialState: InitialState = {
  loading: false,
  subscribedChannel: [],
  channelSubscribers: [],
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
    channelSubscribersSuccess: (
      state,
      action: PayloadAction<ChannelSubscribers[]>
    ) => {
      state.loading = false;
      state.channelSubscribers = action.payload;
      state.error = null;
    },
    channelFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  channelRequest,
  subscribedChannelSucess,
  channelFailure,
  channelSubscribersSuccess,
} = channelsSlice.actions;

export default channelsSlice.reducer;
