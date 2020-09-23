import React, { useRef, useEffect } from 'react';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Modal, Button, Form } from 'react-bootstrap';
import { actions, asyncActions } from '../../slices';

const AddChannel = () => {
  const { t } = useTranslation();
  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.focus();
  });

  const dispatch = useDispatch();

  const addChannel = async (values, { setSubmitting, setStatus, resetForm }) => {
    try {
      await dispatch(asyncActions.addChannel(values.channelName));
      setSubmitting(false);
      resetForm();
      dispatch(actions.hideModal('adding'));
    } catch (e) {
      setSubmitting(false);
      resetForm();
      setStatus(t('errors.network'));
    }
  };

  const formik = useFormik({
    initialValues: {
      channelName: '',
    },
    onSubmit: addChannel,
  });

  const handleHide = () => {
    if (formik.isSubmitting) {
      return;
    }
    dispatch(actions.hideModal('adding'));
  };

  return (
    <Modal show onHide={handleHide}>
      <Modal.Header>
        <Modal.Title>Add New Channel</Modal.Title>
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
              Add Channel
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

export default AddChannel;
