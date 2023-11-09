import React, { useEffect } from 'react';

const ChatPage = () => {
  const tmp = 'Hello in this chat';

  useEffect(() => {
    const { token } = window.localStorage.getItem('userId');
    console.log(token);
  }, []);

  return (
    <div>{tmp}</div>
  );
};

export default ChatPage;
