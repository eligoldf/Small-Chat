import React, { useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import { Form } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import UserContext from '../Context';
import { asyncActions } from '../slices';

const MessageInput = () => {
  const id = useSelector((state) => state.channels.currentChannelId);

  const username = useContext(UserContext);
  const dispatch = useDispatch();

  const { t } = useTranslation();

  const handleSubmit = async (values, { resetForm, setStatus, setSubmitting }) => {
    if (values.message.length === 0) {
      setStatus(t('errors.requiredMsg'));
      return;
    }

    const data = {
      channelId: id,
      message: values.message,
      username,
    };

    try {
      await dispatch(asyncActions.addMessage(data, id));
      setSubmitting(false);
      resetForm();
    } catch (error) {
      setSubmitting(false);
      resetForm();
      setStatus(t('errors.network'));
    }
  };

  const formik = useFormik({
    initialValues: {
      message: '',
    },
    onSubmit: handleSubmit,
  });

  return (
    <div className="mt-auto">
      <Form onSubmit={formik.handleSubmit} className="ml-4">
        <Form.Group>
          <Form.Control
            name="message"
            type="text"
            value={formik.values.message}
            onChange={formik.handleChange}
            isInvalid={!!formik.status}
          />
          <Form.Control.Feedback type="invalid">
            {formik.status}
          </Form.Control.Feedback>
        </Form.Group>
      </Form>
    </div>
  );
};

export default MessageInput;
