import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  channels: [],
  currentChannelId: null,
};

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    setInitialState(state, { payload }) {
      const { channels, currentChannelsId } = payload;
      state.channels = channels;
      state.currentChannelsId = currentChannelsId;
    },
  },
});

export const defaultChannelId = 1;
export const { actions } = channelsSlice;
export default channelsSlice.reducer;
