/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import routes from '../routes';

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
    addMessageSuccess(state, action) {
      const { data: { attributes } } = action.payload;
      state.push(attributes);
    },
  },
  extraReducers: {
    [addMessage.fulfilled]: () => {},
    [addMessage.rejected]: () => {
      throw new Error();
    },
  },
});

const { actions } = messageSlice;
export { actions, addMessage };
export default messageSlice.reducer;
