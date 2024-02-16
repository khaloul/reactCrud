import React from 'react';
import InputForm from './InputForm';

const UserEdit = ({ user,updateUser }) => {

  return (
    <div>
      <h2 className='h2'>Edit User</h2>
      <InputForm initialData={user} edit={updateUser} />
    </div>
  );
};

export default UserEdit;