import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
import useAuth from '../hooks/index.jsx';
import routes from '../routes/routes';

const ChatPage = () => {
  const tmp = 'Hello in this chat';
  const auth = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const headers = auth.getAuthHeader();
    if (!headers?.Authorization) {
      navigate(routes.loginPagePath());
    }
  }, [auth, navigate]);

  return (
    <div>{tmp}</div>
  );
};

export default ChatPage;
