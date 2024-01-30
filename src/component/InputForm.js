import React, { useState } from 'react';
import './style.css'
const InputForm = ({ addUser, updateUser, initialData }) => {
  const [formData, setFormData] = useState(initialData);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

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
      Nickname:
      </label>
      <input className='input' type="text" name="username" value={formData.username} onChange={handleInputChange} /></div>
      <button type="submit" className='btn'>Submit</button>
    </form>
  );
};

export default InputForm;