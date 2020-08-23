import React from 'react';
import { useSelector } from 'react-redux';

export default () => {
  const messages = useSelector((state) => state.messages);
  console.log(messages);
  return (
    <div id="mesages-box" className="chat-messages overflow-auto mb-3">
      {messages.map((message) => (
        <div>
          <b>{message.username}</b>
          :
          {message.text}
        </div>
      ))}
    </div>
  );
};
