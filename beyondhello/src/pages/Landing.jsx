import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Landing.css';

function Landing() {
  const navigate = useNavigate();

  return (
    <div className="landing-page">
      <div className="container">
        <div className="landing-content">
          {/* Logo/Wordmark */}
          <h1 className="logo">BeyondHello</h1>
          
          {/* Video Preview Placeholder */}
          <div className="video-preview">
            <div className="video-placeholder-box">
              <p>Scenario Preview</p>
              <p className="subtext">(AI-Generated Scene)</p>
            </div>
          </div>
          
          {/* Value Propositions */}
          <div className="value-props">
            <div className="value-prop">
              <span className="icon">🎤</span>
              <span className="text">Speak to AI characters</span>
            </div>
            <div className="value-prop">
              <span className="icon">🎯</span>
              <span className="text">Make decisions that affect outcomes</span>
            </div>
            <div className="value-prop">
              <span className="icon">🌍</span>
              <span className="text">Learn through real-life scenarios</span>
            </div>
          </div>
          
          {/* Primary CTA */}
          <button 
            className="btn btn-primary btn-full"
            onClick={() => navigate('/signup')}
          >
            Start Your First Quest
          </button>
        </div>
      </div>
    </div>
  );
}

export default Landing;