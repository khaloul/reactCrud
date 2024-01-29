import React, { useState, useEffect } from 'react';
import InputForm from './component/InputForm';
import UserList from './component/UserList';
import UserDetail from './component/UserDetail';
import UserEdit from './component/UserEdit';

function App() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  // Fetch users on component mount
  useEffect(() => {
    fetchUsers();
  }, []);

  // Fetch users from API
  const fetchUsers = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/user/');
      const data = await response.json();
      setUsers(data.users);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  // Create a new user
  const addUser = async (userData) => {
    try {
      const response = await fetch('http://127.0.0.1:8000/user/create/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
      const data = await response.json();
      setUsers([...users, data]);
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  // Update an existing user
  const updateUser = async (userData) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/user/update/${userData.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
      const updatedUser = await response.json();
      const updatedUsers = users.map((user) =>
        user.id === updatedUser.id ? updatedUser : user
      );
      setUsers(updatedUsers);
      setSelectedUser(null);
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  // Delete a user
  const deleteUser = async (userId) => {
    try {
      await fetch(`http://127.0.0.1:8000/user/delete/${userId}`, {
        method: 'DELETE',
      });
      const updatedUsers = users.filter((user) => user.id !== userId);
      setUsers(updatedUsers);
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <div>
      <h1>CRUD Application</h1>
      <InputForm addUser={addUser} updateUser={updateUser} initialData={{ id: '', name: '', username: '' }} />
      <UserList users={users} viewUser={setSelectedUser} editUser={setSelectedUser} deleteUser={deleteUser} />
      {selectedUser ? (
        <div>
          <UserDetail user={selectedUser} />
          <UserEdit user={selectedUser} updateUser={updateUser} />
        </div>
      ) : null}
    </div>
  );
}

export default App;