import React from 'react';

export default ({ channels }) => (
  <ul>
    {channels.map(({ name, id }) => <li key={id}>{name}</li>)}
  </ul>
);
