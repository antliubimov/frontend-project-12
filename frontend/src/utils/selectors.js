export const getCurrentChannel = (state) => {
  const { channels, currentChannelId } = state.channelsSlice;
  return channels.find((channel) => channel.id === currentChannelId);
};

export const getMessagesForCurrentChannel = (state) => {
  const { currentChannelId } = state.channelsSlice;
  const { messages } = state.messagesSlice;
  return messages.filter((message) => message.channelId === currentChannelId);
};

export const getChannelsNames = (state) => {
  const { channels } = state.channelsSlice;
  return channels.map(({ name }) => name);
};

export const getChannelById = (channelId) => (state) => {
  const { channels } = state.channelsSlice;
  return channels.find(({ id }) => channelId === id);
};

export const channelsSlice = (state) => state.channelsSlice;
