import React, { useEffect, useState } from 'react';
import './style.css'
import axios from 'axios';

const InputForm = ({ addUser, initialData,  edit }) => {
  const [formData, setFormData] = useState(initialData);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const updateUser = async (userData) => {
    try {
      const response = await axios.put(`http://127.0.0.1:8000/user/update/${userData.id}`, userData);
        
    } catch (error) {
      console.error('Error updating user:', error);
      edit()
    }
  };
  useEffect(()=>setFormData(initialData),[initialData])
  const handleSubmit = (event) => {
    event.preventDefault();
    if (formData.id) {
      updateUser(formData);
    } else {
      addUser(formData);
    }
    setFormData({ id: '', name: '',username: '' });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className='inputgr'>
      <label className='label'>
        Name:
      </label>
      <input className='input' type="text" name="name" value={formData.name} onChange={handleInputChange} /></div>
      <div className='inputgr'>
      <label className='label'>
      userName:
      </label>
      <input className='input' type="text" name="username" value={formData.username} onChange={handleInputChange} /></div>
      <button type="submit" className='btn'>Submit</button>
    </form>
  );
};

export default InputForm;