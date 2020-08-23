import React, { useContext } from 'react';
import { useSelector } from 'react-redux';
import { useFormik } from 'formik';
import _ from 'lodash';
import axios from 'axios';
import routes from '../routes';
import UserContext from '../Context';

export default () => {
  const id = useSelector((state) => state.channels.id);
  console.log(id);

  const username = useContext(UserContext);
  console.log(username);

  const { channelMessagesPath } = routes;
  const handleSubmit = (values) => {
    const data = {
      channelId: id,
      text: values.message,
      username,
    };
    console.log(data);
    return axios.post(channelMessagesPath(id), data);
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
