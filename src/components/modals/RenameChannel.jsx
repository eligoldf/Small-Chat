import React, { useRef, useEffect } from 'react';
import { useFormik } from 'formik';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Modal, Button, Form } from 'react-bootstrap';
import { actions, asyncActions } from '../../slices';

const RenameChannel = () => {
  const channels = useSelector((state) => state.channels.channelsList);
  const currentChannelId = useSelector((state) => state.channels.currentChannelId);
  const currentChannel = channels.find((channel) => channel.id === currentChannelId);
  const { id, name, removable } = currentChannel;

  const { t } = useTranslation();
  const dispatch = useDispatch();

  const inputRef = useRef();
  useEffect(() => inputRef.current.focus());

  const handleRename = async (values, { setStatus, setSubmitting }) => {
    if (!removable) {
      setStatus(t('errors.unrenamable'));
      return;
    }
    const data = { id, name: values.channelName };

    try {
      await dispatch(asyncActions.renameChannel(data));
      setSubmitting(false);
      dispatch(actions.hideModal('renaming'));
    } catch (e) {
      setSubmitting(false);
      setStatus(t('errors.network'));
    }
  };

  const formik = useFormik({
    initialValues: {
      channelName: name,
    },
    onSubmit: handleRename,
  });

  const handleHide = () => {
    if (formik.isSubmitting) {
      return;
    }
    dispatch(actions.hideModal('renaming'));
  };

  return (
    <Modal show onHide={handleHide}>
      <Modal.Header>
        <Modal.Title>RenameChannel</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group>
            <Form.Control
              name="channelName"
              type="text"
              value={formik.values.channelName}
              isInvalid={!!formik.status}
              onChange={formik.handleChange}
              ref={inputRef}
            />
            <Form.Control.Feedback type="invalid">
              {formik.status}
            </Form.Control.Feedback>
          </Form.Group>
          <Modal.Footer>
            <Button variant="primary" onClick={formik.handleSubmit}>
              Rename Channel
            </Button>
            {' '}
            <Button variant="primary" onClick={handleHide}>
              Cancel
            </Button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
  );
};
export default RenameChannel;
