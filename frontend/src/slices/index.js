import { combineReducers } from '@reduxjs/toolkit';
import messagesReducer, { actions as messagesActions } from './messagesSlice';
import channelsReducer, { actions as channelsActions, defaultChannelId } from './channelsSlice';
import modalReducer, { actions as modalActions } from './modalSlice';

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
  messagesReducer,
  channelsReducer,
  modalReducer,
});
