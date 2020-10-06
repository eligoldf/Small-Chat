import React, { useContext, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Form } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import UserContext from '../Context';
import { asyncActions } from '../slices';

const MessageInput = () => {
  const id = useSelector((state) => state.channels.currentChannelId);

  const username = useContext(UserContext);
  const dispatch = useDispatch();

  const { t } = useTranslation();

  const inputRef = useRef();
  useEffect(() => inputRef.current.focus());

  const validationSchema = Yup.object({
    message: Yup.string().min(1).required(t('errors.requiredMsg')),
  });

  const handleSubmit = async (values, { resetForm, setFieldError, setSubmitting }) => {
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
      setFieldError('network', t('errors.network'));
    }
  };

  const formik = useFormik({
    initialValues: {
      message: '',
    },
    validationSchema,
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
            isInvalid={!!formik.errors.message}
            ref={inputRef}
            disabled={formik.isSubmitting}
          />
          { formik.errors.message && <div className="invalid-feedback">{formik.errors.message}</div> }
          { formik.errors.network && <div className="invalid-feedback">{formik.errors.network}</div> }
        </Form.Group>
      </Form>
    </div>
  );
};

export default MessageInput;
