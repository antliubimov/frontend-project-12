import { createSlice } from '@reduxjs/toolkit';
import { actions as channelsActions } from './channelsSlice';

const initialState = {
  messages: [],
};

const messagesSlice = createSlice({
  name: 'messages',
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
      });
  },
});

export const { actions } = messagesSlice;
export default messagesSlice.reducer;
