import { combineReducers } from '@reduxjs/toolkit';
import messagesSlice, { actions as messagesActions } from './messagesSlice';
import channelsSlice, { actions as channelsActions, defaultChannelId } from './channelsSlice';
import modalSlice, { actions as modalActions } from './modalSlice';

const actions = {
  ...messagesActions,
  ...channelsActions,
  ...modalActions,
};

export {
  actions,
  defaultChannelId,
};

export default combineReducers({
  messagesSlice,
  channelsSlice,
  modalSlice,
});
