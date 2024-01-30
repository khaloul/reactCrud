import React from 'react';
import './style.css'
const UserList = ({ users, viewUser, editUser, deleteUser }) => {
  return (
    <div>
      <h2 className='h2'>User List</h2>
      <ul className='ul'>
        {users.map((user) => (
          <li className='il'  key={user.id}>
            {user.name}
            <button className='ilbtn' onClick={() => viewUser(user)}>View</button>
            <button className='ilbtn' onClick={() => editUser(user)}>Edit</button>
            <button className='ilbtn' onClick={() => deleteUser(user.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;