/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import routes from '../routes';
import { actions as channelActions } from './channels';

const addMessage = createAsyncThunk(
  'messages/addMessage',
  async ({ channelId, username, message }) => {
    const data = { attributes: { username, message } };
    const url = routes.channelMessagesPath(channelId);
    await axios.post(url, { data });
  },
);

const messageSlice = createSlice({
  name: 'messages',
  initialState: [],
  reducers: {
    addMessageSuccess(state, { payload }) {
      state.push(payload);
    },
  },
  extraReducers: {
    [addMessage.fulfilled]: () => {},
    [addMessage.rejected]: () => {
      throw new Error();
    },
    [channelActions.removeChannelSuccess]: (state, { payload: id }) => {
      state.filter((message) => message.id !== id);
    },
  },
});

const { actions } = messageSlice;
export { actions, addMessage };
export default messageSlice.reducer;
