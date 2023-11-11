import { combineReducers } from '@reduxjs/toolkit';
import messagesReducer, { actions as messagesActions } from './messagesSlice';
import channelsReducer, { actions as channelsActions, defaultChannelId } from './channelsSlice';

const actions = {
  ...messagesActions,
  ...channelsActions,
};

export {
  actions,
  defaultChannelId,
};

export default combineReducers({
  messagesReducer,
  channelsReducer,
});
