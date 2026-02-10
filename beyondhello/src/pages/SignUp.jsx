import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
      {/* Top Nav Bar */}
      <nav className="top-nav">
        <div className="nav-logo" onClick={() => navigate('/')}>BEYONDHELLO</div>
        <div className="nav-links">
          <a href="/">BACK</a>
        </div>
      </nav>

      {/* Main Content */}
      <div className="signup-container">
        <div className="signup-content">
          {/* Left Side - Title */}
          <div className="signup-header">
            <h1 className="signup-title">
              CREATE<br />
              ACCOUNT
            </h1>
            <p className="signup-subtitle">
              ALREADY REGISTERED?<br />
              <span className="link-text" onClick={() => navigate('/login')}>LOGIN HERE</span>
            </p>
          </div>

          {/* Right Side - Form */}
          <div className="signup-form-wrapper">
            <form onSubmit={handleSubmit} className="signup-form">
              <div className="form-group">
                <label className="form-label">NAME</label>
                <input
                  type="text"
                  name="name"
                  className="form-input"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="LYNN TAN"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">EMAIL</label>
                <input
                  type="email"
                  name="email"
                  className="form-input"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="HELLO@LYNNTAN.COM"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">PASSWORD</label>
                <input
                  type="password"
                  name="password"
                  className="form-input"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  required
                />
              </div>

              <button type="submit" className="submit-btn">
                <span className="submit-text">SIGN UP</span>
                <span className="submit-arrow">→</span>
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom Info Bar */}
      <div className="bottom-info">
        <div className="info-item">
          <div className="info-label">STEP</div>
          <div className="info-value">01 / 02</div>
        </div>
        <div className="info-item">
          <div className="info-label">PROGRESS</div>
          <div className="info-value">REGISTRATION</div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;