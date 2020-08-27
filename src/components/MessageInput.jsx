import React, { useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import UserContext from '../Context';
import { asyncActions } from '../slices';

export default () => {
  const id = useSelector((state) => state.channels.currentChannelId);

  const username = useContext(UserContext);
  const dispatch = useDispatch();

  const handleSubmit = async (values, { resetForm }) => {
    if (values.length === 0) return;

    const data = {
      channelId: id,
      text: values.message,
      username,
    };

    try {
      await dispatch(asyncActions.addMessage(data, id));
      resetForm();
    } catch (e) {
      console.log(e);
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
      <div className="form-group mx-sm-5">
        <form onSubmit={formik.handleSubmit} className="mr-4">
          <input type="text" className="form-control" id="message" value={formik.values.message} onChange={formik.handleChange} />
        </form>
      </div>
    </div>
  );
};
