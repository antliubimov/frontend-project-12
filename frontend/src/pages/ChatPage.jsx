import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { useAuth } from '../hooks';
import routes from '../routes/routes';
import { actions } from '../slices';
import ChannelsBox from '../components/ChannelsBox';
import ChatBox from '../components/ChatBox';
import Modal from '../components/Modal';

const ChatPage = () => {
  const auth = useAuth();
  const dispatch = useDispatch();
  const [isFetching, setIsFetching] = useState(true);

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
    setIsFetching(false);
  }, [auth, dispatch]);

  return isFetching
      ? (
        <>
          'loading'
        </>
      ) : (
        <>
          <div className="container h-100 my-4 overflow-hidden rounded shadow">
            <div className="row h-100 bg-white flex-md-row">
              <div className="col-4 col-md-2 border-end px-0 flex-column h-100 d-flex bg-channelbox">
                <ChannelsBox />
              </div>
              <div className="col p-0 h-100">
                <Modal />
                <ChatBox />
              </div>
            </div>
          </div>
        </>
      );
};

export default ChatPage;
