export const getCurrentChannel = (state) => {
  const { channels, currentChannelId } = state.channelsReducer;
  return channels.find((channel) => channel.id === currentChannelId);
};

export const getMessagesForCurrentChannel = (state) => {
  const { currentChannelId } = state.channelsReducer;
  const { messages } = state.messagesReducer;
  return messages.filter((message) => message.channelId === currentChannelId);
};
