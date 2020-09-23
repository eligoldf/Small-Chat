import { combineReducers } from 'redux';
import messageReducer, { actions as messageActions, addMessage } from './messages';
import channelReducers, {
  actions as channelActions, addChannel, renameChannel, removeChannel,
} from './channels';
import modalsReducer, { actions as modalActions } from './modals';

export const actions = {
  ...messageActions,
  ...channelActions,
  ...modalActions,
};

export const asyncActions = {
  addMessage,
  addChannel,
  renameChannel,
  removeChannel,
};

export default combineReducers({
  messages: messageReducer,
  channels: channelReducers,
  modals: modalsReducer,
});
