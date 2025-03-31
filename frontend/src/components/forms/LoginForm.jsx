// src/components/forms/LoginForm.jsx
import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import Button from '../common/Button';
import '../../assets/styles/colors.css';


const LoginForm = () => {
  const { login } = useAuth();
  const [credentials, setCredentials] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(credentials);
  };

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <h2>Login</h2>
      <label>Email</label>
      <input type="email" name="email" value={credentials.email} onChange={handleChange} required />
      
      <label>Password</label>
      <input type="password" name="password" value={credentials.password} onChange={handleChange} required />
      
      <Button type="submit">Login</Button>
    </form>
  );
};

export default LoginForm;
