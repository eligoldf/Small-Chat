import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import cn from 'classnames';
import { actions } from '../slices/index';

const Channels = () => {
  const currentChannelId = useSelector((state) => state.channels.currentChannelId);
  const channels = useSelector((state) => state.channels.channelsList);
  const dispatch = useDispatch();

  const setActiveChannel = (id) => (e) => {
    e.preventDefault();
    dispatch(actions.setCurrentChannel({ id }));
  };

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
                onClick={setActiveChannel(id)}
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
