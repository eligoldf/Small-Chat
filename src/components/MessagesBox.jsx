import React, { useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';

const MessagesBox = () => {
  const currentChannelId = useSelector((state) => state.channels.currentChannelId);
  const messages = useSelector((state) => state.messages.filter(
    (message) => message.channelId === currentChannelId,
  ));

  const scrollToBottom = useRef();
  useEffect(() => scrollToBottom.current.scrollIntoView());

  return (
    <div id="mesages-box" className="chat-messages overflow-auto mb-3 ml-3">
      {messages.map(({ id, username, message }) => (
        <div key={id}>
          <span>
            <b>{username}</b>
            :
            {' '}
            {message}
          </span>
        </div>
      ))}
      <div ref={scrollToBottom} />
    </div>
  );
};

export default MessagesBox;
