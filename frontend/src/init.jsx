import React from 'react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import i18next from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import { Provider as RollbarProvider } from '@rollbar/react';
import App from './components/App';
import resources from './locales/index.js';
import './assets/styles/index.css';
import reducer, { actions } from './slices/index.js';
import { ApiContext } from './contexts/index';

const init = async (socket) => {
  const isProduction = process.env.NODE_ENV === 'production';
  const i18n = i18next.createInstance();
  await i18n
    .use(initReactI18next)
    .init({
      resources,
      fallbackLng: 'ru',
    });

  const withAcknowledgement = (socketFunc) => (...args) => new Promise((resolve, reject) => {
    let state = 'pending'; // eslint-disable-line
    const timer = setTimeout(() => {
      state = 'rejected';
      reject();
    }, 3000);

    socketFunc(...args, (response) => {
      if (state !== 'pending') return;

      clearTimeout(timer);

      if (response.status === 'ok') {
        state = 'resolved';
        resolve(response.data);
      }

      reject();
    });
  });

  const api = {
    sendMessage: withAcknowledgement((...args) => socket.volatile.emit('newMessage', ...args)),
    createChannel: withAcknowledgement((...args) => socket.volatile.emit('newChannel', ...args)),
    renameChannel: withAcknowledgement((...args) => socket.volatile.emit('renameChannel', ...args)),
    removeChannel: withAcknowledgement((...args) => socket.volatile.emit('removeChannel', ...args)),
  };

  const store = configureStore({
    reducer,
  });

  socket.on('newMessage', (payload) => {
    store.dispatch(actions.addMessage({ message: payload }));
  });
  socket.on('newChannel', (payload) => {
    store.dispatch(actions.addChannel({ channel: payload }));
  });
  socket.on('renameChannel', (payload) => {
    store.dispatch(actions.renameChannel({ channelId: payload.id, channelName: payload.name }));
  });
  socket.on('removeChannel', (payload) => {
    store.dispatch(actions.removeChannel({ channelId: payload.id }));
  });

  const rollbarConfig = {
    enabled: isProduction,
    accessToken: process.env.ROLLBAR_TOKEN,
    captureUncaught: true,
    captureUnhandledRejections: true,
  };

  return (
    <RollbarProvider config={rollbarConfig}>
      <Provider store={store}>
        <I18nextProvider i18n={i18n}>
          <ApiContext.Provider value={api}>
            <App />
          </ApiContext.Provider>
        </I18nextProvider>
      </Provider>
    </RollbarProvider>
  );
};

export default init;
