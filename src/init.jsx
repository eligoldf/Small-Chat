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
import rootReducer, { actions } from './slices';

export default () => {
  const { channels: channelsList, messages, currentChannelId } = gon;

  const preloadedState = {
    messages,
    channels: {
      channelsList,
      currentChannelId,
    },
  };

  const store = configureStore({
    reducer: rootReducer,
    preloadedState,
  });

  const newUserName = faker.internet.userName();
  const userName = cookies.get('userName');
  if (!userName) {
    cookies.set('userName', newUserName);
  }

  const socket = io();
  socket.on('newMessage', ({ data }) => store.dispatch(actions.addMessageSuccess(data.attributes)));
  socket.on('newChannel', ({ data }) => store.dispatch(actions.addChannelSuccess(data.attributes)));
  socket.on('removeChannel', ({ data: { id } }) => store.dispatch(actions.removeChannelSuccess(id)));
  socket.on('renameChannel', ({ data }) => store.dispatch(actions.renameChannelSuccess(data)));

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
