// src/components/forms/SignupForm.jsx
import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import Button from '../common/Button';
import '../../assets/styles/colors.css';


const SignupForm = () => {
  const { signup } = useAuth();
  const [userData, setUserData] = useState({ name: '', email: '', password: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(userData);
  };

  return (
    <form className="signup-form" onSubmit={handleSubmit}>
      <h2>Sign Up</h2>
      <label>Name</label>
      <input type="text" name="name" value={userData.name} onChange={handleChange} required />
      
      <label>Email</label>
      <input type="email" name="email" value={userData.email} onChange={handleChange} required />
      
      <label>Password</label>
      <input type="password" name="password" value={userData.password} onChange={handleChange} required />
      
      <Button type="submit">Sign Up</Button>
    </form>
  );
};

export default SignupForm;
