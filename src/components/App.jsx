import React from 'react';
import Channels from './Channels';
import MessagesBox from './MessagesBox';
import MessageInput from './MessageInput';

const App = () => (
  <div className="d-flex flex-column flex-md-row h-100">
    <Channels />
    <div className="d-flex flex-column flex-grow-1 w-100">
      <MessagesBox />
      <MessageInput />
    </div>
  </div>
);

export default App;
