import React from 'react';
import { useFormik } from 'formik';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Modal, Button, Form } from 'react-bootstrap';
import { actions, asyncActions } from '../../slices';

const RemoveChannel = () => {
  const channels = useSelector((state) => state.channels.channelsList);
  const currentChannelId = useSelector((state) => state.channels.currentChannelId);
  const currentChannel = channels.find((channel) => channel.id === currentChannelId);
  const { id, name, removable } = currentChannel;
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const handleRemoveChannel = async (values, { setSubmitting, setStatus }) => {
    if (!removable) {
      setStatus(t('errors.unremovable'));
      return;
    }

    try {
      await dispatch(asyncActions.removeChannel(id));
      setSubmitting(false);
      dispatch(actions.hideModal('removing'));
    } catch (e) {
      setStatus(t('errors.network'));
    }
  };

  const formik = useFormik({
    initialValues: {},
    onSubmit: handleRemoveChannel,
  });

  const handleHide = () => {
    if (formik.isSubmitting) {
      return;
    }
    dispatch(actions.hideModal('removing'));
  };

  return (
    <Modal show onHide={handleHide}>
      <Modal.Header>
        <Modal.Title>Remove Channel</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          Do you really want to delete
          {' '}
          {name}
          {' '}
          channel?
        </p>
        <p className="text-danger">{formik.status}</p>
      </Modal.Body>
      <Form onSubmit={formik.handleSubmit}>
        <Modal.Footer>
          <Button variant="primary" onClick={formik.handleSubmit}>Remove</Button>
          {' '}
          <Button variant="primary" onClick={handleHide}>Cancel</Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default RemoveChannel;
