/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import routes from '../routes';

const addChannel = createAsyncThunk(
  'channels/addChannel',
  async (name) => {
    const data = { attributes: { name } };
    const url = routes.channelsPath();
    await axios.post(url, { data });
  },
);

const renameChannel = createAsyncThunk(
  'channels/renameChannel',
  async ({ name, id }) => {
    const data = { attributes: { name } };
    console.log(data);
    const url = routes.channelPath(id);
    await axios.patch(url, { data });
  },
);

const removeChannel = createAsyncThunk(
  'channels/removeChannel',
  async (id) => {
    const url = routes.channelPath(id);
    await axios.delete(url);
  },
);

const channelSlice = createSlice({
  name: 'channels',
  initialState: {
    channelsList: [],
    currentChannelId: 1,
  },
  reducers: {
    setCurrentChannel(state, { payload }) {
      state.currentChannelId = payload;
    },
    addChannelSuccess(state, { payload }) {
      const { id } = payload;
      state.channelsList.push(payload);
      state.currentChannelId = id;
    },
    removeChannelSuccess(state, { payload: id }) {
      state.channelsList = state.channelsList.filter((channel) => channel.id !== id);
      state.currentChannelId = 1;
    },
    renameChannelSuccess(state, { payload: { id, attributes } }) {
      const renamedChannel = state.channelsList.find((channel) => channel.id === id);
      console.log(renamedChannel);
      renamedChannel.name = attributes.name;
    },
  },
  extraReducers: {
    [addChannel.fulfilled]: () => {},
    [addChannel.rejected]: () => {
      throw new Error();
    },
    [renameChannel.fulfilled]: () => {},
    [renameChannel.rejected]: () => {
      throw new Error();
    },
    [removeChannel.fulfilled]: () => {},
    [removeChannel.rejected]: () => {
      throw new Error();
    },
  },
});

const { actions } = channelSlice;
export {
  actions, addChannel, renameChannel, removeChannel,
};
export default channelSlice.reducer;
