import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import routes from '../routes';

const addMessage = createAsyncThunk(
  'messages/addMessage',
);

const messageSlice = createSlice({
  name: 'messages',
  initialState: [],
  reducers: {
    addMessageSuccess(state, action) {
      const { payload } = action;
      state.push(payload);
    },
  },
  extraReducers: {
    [addMessage.fulfilled]: () => {},
    [addMessage.rejected]: () => { throw new Error(); },
  },
});

export const { actions } = messageSlice;
export default messageSlice.reducer;
