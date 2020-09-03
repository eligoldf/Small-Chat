import React from 'react';
import { useSelector } from 'react-redux';
import cn from 'classnames';

const Channels = () => {
  const currentChannelId = useSelector((state) => state.channels.currentChannelId);
  const channels = useSelector((state) => state.channels.channelsList);

  return (
    <div className="col-3 border-right h-100">
      <div className="d-flex mb-2">
        <b>Channels</b>
        <button type="button" className="btn btn-link p-0 ml-auto"><b>+</b></button>
      </div>
      <ul className="nav flex-column">
        {channels.map(({ name, id }) => {
          const classes = cn({
            btn: true,
            'nav-link': true,
            'btn-block': true,
            active: id === currentChannelId,
          });
          return (
            <li key={id} className="nav-item nav-pills nav-fill">
              <button
                type="button"
                className={classes}
              >
                <b># </b>
                {name}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Channels;
