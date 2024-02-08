import { createSlice } from '@reduxjs/toolkit';
import { actions as channelsActions } from './channelsSlice';

const initialState = {
  messages: [],
};

const messagesSlice = createSlice({
  name: 'messagesSlice',
  initialState,
  reducers: {
    addMessage(state, { payload }) {
      const { message } = payload;
      state.messages.push(message);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(channelsActions.setInitialState, (state, { payload }) => {
        const { messages } = payload;
        state.messages = messages;
      })
      .addCase(channelsActions.removeChannel, (state, { payload }) => {
        const { channelId } = payload;
        state.messages = state.messages.filter((message) => message.channelId === channelId);
      });
  },
});

export const { actions } = messagesSlice;
export default messagesSlice.reducer;
