import { combineReducers } from 'redux';
import messageReducer, { actions as messageActions } from './messages';
import channelReducers, { actions as channelActions } from './channels';

export const actions = {
  messageActions,
  channelActions,
};

export default combineReducers({
  messages: messageReducer,
  channels: channelReducers,
});
