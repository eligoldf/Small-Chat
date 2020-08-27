import { combineReducers } from 'redux';
import messageReducer, { actions as messageActions, addMessage } from './messages';
import channelReducers, { actions as channelActions } from './channels';

export const actions = {
  ...messageActions,
  ...channelActions,
};

export const asyncActions = {
  addMessage,
};

export default combineReducers({
  messages: messageReducer,
  channels: channelReducers,
});
