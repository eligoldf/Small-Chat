/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const channelSlice = createSlice({
  name: 'channels',
  initialState: {
    channels: [],
    currentChannelId: 1,
  },
  reducers: {
    setCurrentChannel(state, { payload }) {
      state.currentChannelId = payload;
    },
  },
});

export const { actions } = channelSlice;

export default channelSlice.reducer;
