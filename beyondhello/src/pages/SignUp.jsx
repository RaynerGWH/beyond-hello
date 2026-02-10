import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../components/Input';
import Button from '../components/Button';
import { storage } from '../utils/storage';
import './SignUp.css';

function SignUp() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Save user data
    storage.setUser({
      name: formData.name,
      email: formData.email,
      createdAt: new Date().toISOString()
    });
    
    // Initialize progress
    storage.initializeProgress();
    
    // Navigate to language selection
    navigate('/language');
  };

  return (
    <div className="signup-page">
      <div className="container">
        <div className="signup-content">
          <h1 className="signup-heading">Create New Account</h1>
          <p className="signup-link">
            Already Registered? <a href="/login">Login</a>
          </p>
          
          <form onSubmit={handleSubmit} className="signup-form">
            <Input
              label="Name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Lynn Tan"
              required
            />
            
            <Input
              label="Email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="hello@lynntan.com"
              required
            />
            
            <Input
              label="Password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••"
              required
            />
            
            <Button type="submit" variant="primary" fullWidth>
              SIGN UP
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignUp;