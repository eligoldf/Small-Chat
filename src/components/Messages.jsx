import React from 'react';
import { useSelector } from 'react-redux';

export default () => {
  const currentChannelId = useSelector((state) => state.channels.currentChannelId);
  const messages = useSelector((state) => state.messages.filter(
    (message) => message.channelId === currentChannelId,
  ));
  console.log(messages);

  return (
    <div id="mesages-box" className="chat-messages overflow-auto mb-3">
      {messages.map(({ id, username, text }) => (
        <div key={id}>
          <b>{username}</b>
          :
          {text}
        </div>
      ))}
    </div>
  );
};
