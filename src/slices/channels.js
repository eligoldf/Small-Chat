/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const channelSlice = createSlice({
  name: 'channels',
  initialState: {
    channelsList: [],
    currentChannelId: 1,
  },
});

export const { actions } = channelSlice;

export default channelSlice.reducer;
