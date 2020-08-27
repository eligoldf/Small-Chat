/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const channelSlice = createSlice({
  name: 'channels',
  initialState: {
    channelsList: [],
    currentChannelId: 1,
  },
  reducers: {
    initCurrentChannel(state, { payload }) {
      state.currentChannelId = payload;
    },
    initChannels(state, { payload }) {
      state.channelsList = payload;
    },
  },
});

export const { actions } = channelSlice;

export default channelSlice.reducer;
