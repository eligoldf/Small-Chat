import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import cn from 'classnames';
import { PlusCircleIcon, TrashcanIcon, PencilIcon } from '@primer/octicons-react';
import { actions } from '../slices';
import getModal from './modals';

const Channels = () => {
  const currentChannelId = useSelector((state) => state.channels.currentChannelId);
  const { modalName, status } = useSelector((state) => state.modals);
  const channels = useSelector((state) => state.channels.channelsList);
  const dispatch = useDispatch();

  const handleSetChannel = (id) => (e) => {
    e.preventDefault();
    dispatch(actions.setCurrentChannel(id));
  };

  const renderModal = (name) => {
    if (!name) return null;

    const Modal = getModal(name);
    return <Modal />;
  };

  const handleAdd = () => {
    dispatch(actions.showModal('adding'));
  };

  const handleRemove = () => {
    dispatch(actions.showModal('removing'));
  };

  const handleRename = () => {
    dispatch(actions.showModal('renaming'));
  };

  return (
    <div className="col-3 border-right h-100">
      <div className="d-flex mb-2">
        <b>Channels</b>
        <button type="button" className="btn p-0 ml-auto" onClick={handleAdd}>
          <PlusCircleIcon size={16} />
        </button>
        <button type="button" className="btn p-0 ml-2" onClick={handleRemove}>
          <TrashcanIcon size={16} />
        </button>
        <button type="button" className="btn p-0 ml-2" onClick={handleRename}>
          <PencilIcon size={16} />
        </button>
      </div>
      { status === 'show' && renderModal(modalName) }
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
                onClick={handleSetChannel(id)}
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
