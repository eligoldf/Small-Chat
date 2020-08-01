/* eslint-disable react/no-render-return-value */
import React from 'react';
import ReactDOM from 'react-dom';
import ChannelsList from './ChannelsList';

const root = document.getElementById('chat');

export default ({ channels }) => ReactDOM.render(
  <ChannelsList channels={channels} />,
  root,
);
