/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const modalsSlice = createSlice({
  name: 'modal',
  initialState: {
    modalName: null,
    status: 'hide',
  },
  reducers: {
    showModal(state, { payload }) {
      state.modalName = payload;
      state.status = 'show';
    },
    hideModal(state, { payload }) {
      state.modalName = payload;
      state.status = 'hide';
    },
  },
});

const { actions } = modalsSlice;
export { actions };
export default modalsSlice.reducer;
