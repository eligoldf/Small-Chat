import React, { useState } from 'react';
import Rollbar from 'rollbar';
import Channels from './Channels';
import MessagesBox from './MessagesBox';
import MessageInput from './MessageInput';

const App = () => {
  useState({
    rollbarConfig: new Rollbar({
      accessToken: '20f3491c65a54154897a139de3c41ebd',
      captureUncaught: true,
      captureUnhandledRejections: true,
      payload: {
        environment: 'production',
      },
    }),
  });

  return (
    <div className="d-flex flex-column flex-md-row h-100">
      <Channels />
      <div className="d-flex flex-column flex-grow-1 w-100">
        <MessagesBox />
        <MessageInput />
      </div>
    </div>
  );
};

export default App;
