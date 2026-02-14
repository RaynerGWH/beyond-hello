import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Landing.css';

function Landing() {
  const navigate = useNavigate();

  return (
    <div className="landing-page">
      {/* Top Nav Bar */}
      <nav className="top-nav">
        <div className="nav-logo">BEYONDHELLO</div>
        <div className="nav-links">
          <a href="#about">ABOUT</a>
          <a href="#features">FEATURES</a>
          {/* <a href="/signup" className="nav-login">LOGIN</a> */}
          <a href="#login">LOGIN</a>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            BEYOND<br />
            <span className="blue-text">HELLO</span>
          </h1>
          
          <p className="hero-description">
            BEYONDHELLO IS A <span className="blue-text">GENERATIVE</span><br />
            LANGUAGE LEARNING PLATFORM<br />
            PRODUCING <span className="blue-text">AI-POWERED</span><br />
            UNIQUE SCENARIOS PER<br />
            MINUTE. ONE SCROLL.<br />
            <span className="blue-text">UNLIMITED OUTPUT.</span>
          </p>
        </div>

        {/* Video/Animation */}
        <div className="hero-visual">
          <video 
            className="hero-video"
            autoPlay 
            loop 
            muted 
            playsInline
          >
            <source src="/videos/chinese-man.mp4" type="video/mp4" />
            <div className="visual-placeholder">
              [VIDEO NOT AVAILABLE]
            </div>
          </video>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bottom-bar">
        <div className="stat-box">
          <div className="stat-label">LANGUAGES</div>
          <div className="stat-value">3</div>
        </div>
        <div className="stat-box">
          <div className="stat-label">SCENARIOS</div>
          <div className="stat-value">∞</div>
        </div>
        <div className="stat-box">
          <div className="stat-label">FLUENCY</div>
          <div className="stat-value">100%</div>
        </div>
        <div className="cta-box" onClick={() => navigate('/signup')}>
          <div className="cta-text">START</div>
          <div className="cta-label">ONBOARDING</div>
        </div>
      </div>
    </div>
  );
}

export default Landing;