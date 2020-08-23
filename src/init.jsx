import 'core-js/stable';
import 'regenerator-runtime/runtime';
import '../assets/application.scss';
import React from 'react';
import ReactDOM from 'react-dom';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import gon from 'gon';
import faker from 'faker';
import io from 'socket.io-client';
import cookies from 'js-cookie';
import App from './components/App';
import UserContext from './Context';
import rootReducer, { actions } from './slices/index';

export default () => {
  if (process.env.NODE_ENV !== 'production') {
    localStorage.debug = 'chat:*';
  }

  const { channels, messages, currentChannelId } = gon;

  const store = configureStore({
    reducer: rootReducer,
    preloadedState: {
      channels: {
        channels,
        currentChannelId,
      },
      messages,
    },
  });

  // store.dispatch(actions.setCurrentChannel(currentChannelId));
  // store.dispatch(actions.addMessageSuccess(messages));

  console.log(store.getState());
  const newUserName = faker.internet.userName();
  const userName = cookies.get('userName');
  if (!userName) {
    cookies.set('userName', newUserName);
  }
  const socket = io();

  socket.on('connect', () => console.log('conencted'));
  const root = document.getElementById('chat');

  ReactDOM.render(
    <Provider store={store}>
      <UserContext.Provider value={userName}>
        <App />
      </UserContext.Provider>
    </Provider>,
    root,
  );
};
