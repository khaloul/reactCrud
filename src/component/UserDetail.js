import React from 'react';
import './style.css'
const UserDetail = ({ user }) => {
  return (
    <div>
      <h2 className='h2'>User Detail</h2>
      <p>Name: {user.name}</p>
      <p>username: {user.username}</p>
    </div>
  );
};

export default UserDetail;