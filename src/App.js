import React, { useState, useEffect } from 'react';
import axios from 'axios';
import InputForm from './component/InputForm';
import UserList from './component/UserList';
import UserDetail from './component/UserDetail';
import UserEdit from './component/UserEdit';
import './component/style.css';

function App() {
  const [users, setUsers] = useState([]);
  const [selectedViewUser, setSelectedViewUser] = useState(null);
  const [selectedEditUser, setSelectedEditUser] = useState(null);

  useEffect(() => {
    fetchUsers(); 
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/user/');
      setUsers(response.data.users);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };
  
  const addUser = async (userData) => {
    try {
      const response = await axios.post('http://127.0.0.1:8000/user/create/', userData);
      if (response.status === 201) {
        setUsers(prevUsers => [...prevUsers, response.data]);
      } else {
        console.error('Failed to add user');
      }
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  const updateUser = async (userData) => {
    try {
      const response = await axios.put(`http://127.0.0.1:8000/user/update/${userData.id}`, userData);
      if (response.status === 200) {
        const updatedUser = response.data;
        const updatedUsers = users.map((user) =>
          user.id === updatedUser.id ? updatedUser : user
        );
        setUsers(updatedUsers);
        setSelectedEditUser(null);
      } else {
        console.error('Failed to update user');
      }
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const deleteUser = async (userId) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/user/delete/${userId}`);
      const updatedUsers = users.filter((user) => user.id !== userId);
      setUsers(updatedUsers);
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <div>
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/water.css@2/out/light.css"></link>
      <h1 className='h1'>CRUD Application</h1>
      <InputForm addUser={addUser} updateUser={updateUser} initialData={{ id: '', name: '', username: '' }} />
      <UserList users={users} viewUser={setSelectedViewUser} editUser={setSelectedEditUser} deleteUser={deleteUser} />
      {selectedViewUser ? (
        <div>
          <UserDetail user={selectedViewUser} />
        </div>
      ) : null}
      {selectedEditUser ? (
        <div>
          <UserEdit user={selectedEditUser} updateUser={updateUser} />
        </div>
      ) : null}
    </div>
  );
}

export default App;
