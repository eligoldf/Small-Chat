import React from 'react';
import { useSelector } from 'react-redux';
import cn from 'classnames';
import _ from 'lodash';

export default () => {
  const currentChannelId = useSelector((state) => state.channels.currentChannelId);
  const channels = useSelector((state) => state.channels.channels);
  console.log(channels);
  console.log(currentChannelId);
  return (
    <div className="col-3 border-right overflow-auto px-0 h-100">
      <ul className="nav flex-column nav-pills nav-fill">
        {channels.map(({ name, id }) => {
          const classes = cn({
            btn: true,
            'nav-link': true,
            'btn-block': true,
            active: id === currentChannelId,
          });
          return (
            <li key={id} className="nav-item">
              <button
                type="button"
                className={classes}
              >
                {name}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
