/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import routes from '../routes';

const addMessage = createAsyncThunk(
  'messages/addMessage',
  async ({ channelId, username, text }) => {
    const data = { attributes: { username, text } };
    const url = routes.channelMessagesPath(channelId);
    await axios.post(url, { data });
  },
);

const messageSlice = createSlice({
  name: 'messages',
  initialState: [],
  reducers: {
    initMessages(state, action) {
      const { payload } = action;
      state = payload;
    },
    addMessageSuccess(state, action) {
      const { data: { attributes } } = action.payload;
      console.log(attributes);
      state.push(attributes);
    },
  },
  extraReducers: {
    [addMessage.fulfilled]: () => {},
    [addMessage.rejected]: () => { throw new Error(); },
  },
});

const { actions } = messageSlice;
export { actions, addMessage };
export default messageSlice.reducer;
