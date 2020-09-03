import React, { useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';

const MessagesBox = () => {
  const currentChannelId = useSelector((state) => state.channels.currentChannelId);
  const messages = useSelector((state) => state.messages.filter(
    (message) => message.channelId === currentChannelId,
  ));
  // console.log(messages);

  const scrollDown = useRef();
  useEffect(() => scrollDown.current.scrollIntoView());

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
          <div ref={scrollDown} />
        </div>
      ))}
    </div>
  );
};

export default MessagesBox;
