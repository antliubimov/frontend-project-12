import { createSlice } from '@reduxjs/toolkit';

const modalSlice = createSlice({
  name: 'modalSlice',
  initialState: {
    isOpened: false,
    type: null,
    extra: null,
  },
  reducers: {
    openModal: (state, { payload }) => {
      const { type, extra } = payload;
      state.isOpened = true;
      state.type = type;
      state.extra = extra ?? null;
    },
    closeModal: (state) => {
      state.isOpened = false;
      state.type = null;
      state.extra = null;
    },
  },
});

export const { actions } = modalSlice;
export default modalSlice.reducer;
