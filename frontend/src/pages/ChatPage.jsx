import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import useAuth from '../hooks/index.jsx';
import routes from '../routes/routes';
import { actions } from '../slices';
import ChatBox from '../components/ChatBox';

const ChatPage = () => {
  const auth = useAuth();
  const dispatch = useDispatch();

  useEffect(() => {
    /* eslint-disable */
    const fetchData = async () => {
      try {
        const response = await axios.get(routes.dataPath(), { headers: auth.getAuthHeader() });
        dispatch(actions.setInitialState(response.data));
      } catch (err) {
        throw err;
      }
    };
    fetchData();
  }, [auth]);

  return (
    <ChatBox />
  );
};

export default ChatPage;
