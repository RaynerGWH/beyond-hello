// src/pages/Outcome.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import storage from '../utils/storage';
import './Outcome.css';

function Outcome() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [progress, setProgress] = useState(null);

  useEffect(() => {
    const userData = storage.getUser();
    const progressData = storage.getProgress();
    
    if (userData && progressData) {
      // Add XP from this session
      const scenarioXP = 50;
      const accuracyXP = 10;
      const dailyBonusXP = 20;
      const totalXP = scenarioXP + accuracyXP + dailyBonusXP;
      
      const updatedProgress = {
        ...progressData,
        totalXP: progressData.totalXP + totalXP,
        skills: {
          ...progressData.skills,
          pronunciation: (progressData.skills?.pronunciation || 0) + 2,
          fluency: (progressData.skills?.fluency || 0) + 1
        }
      };
      
      storage.setProgress(updatedProgress);
      setUser(userData);
      setProgress(updatedProgress);
    }
  }, []);

  if (!user || !progress) {
    return null;
  }

  return (
    <div className="outcome-page">
      {/* Black Header Bar */}
      <div className="outcome-header-bar"></div>

      <div className="outcome-container">
        {/* Return Button */}
        <button className="return-btn" onClick={() => navigate('/hub')}>
          Return to Missions
        </button>

        {/* Title Section */}
        <div className="outcome-title-section">
          <h1 className="outcome-title">Mission Complete</h1>
          <p className="outcome-subtitle">You successfully introduced yourself in Chinese! 🎉</p>
        </div>

        {/* Results Card */}
        <div className="results-card">
          <div className="character-section">
            <div className="character-image">
              <img src="/images/chinese-restaurant.jpg" alt="Restaurant" />
            </div>
            <div className="character-info">
              <div className="speech-bubble">
                很高兴认识你，Greg！我也对AI很感兴趣。
              </div>
              <div className="character-name">New Friend</div>
              <div className="character-traits">Friendly • Chinese</div>
            </div>
          </div>

          <div className="xp-section">
            <div className="xp-earned">
              <span className="xp-total">+80 XP Earned</span>
              <span className="xp-icon">🚀</span>
            </div>
            <div className="xp-breakdown">
              <div className="xp-item">
                <span className="xp-plus">+</span>
                <span className="xp-amount">50 XP</span>
                <span className="xp-label">Self-Introduction Mission</span>
              </div>
              <div className="xp-item">
                <span className="xp-plus">+</span>
                <span className="xp-amount">10 XP</span>
                <span className="xp-label">Pronunciation Accuracy</span>
              </div>
              <div className="xp-item">
                <span className="xp-plus">+</span>
                <span className="xp-amount">20 XP</span>
                <span className="xp-label">Daily Quest Bonus</span>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="xp-progress-section">
              <div className="progress-bar">
                <div 
                  className="progress-fill" 
                  style={{ width: `${(progress.totalXP % 100)}%` }}
                ></div>
              </div>
              <div className="xp-display">⚡ {progress.totalXP}</div>
            </div>

            {/* Skills Improved */}
            <div className="skills-section">
              <h3 className="skills-title">Skills Improved</h3>
              <div className="skills-list">
                <div className="skill-item">
                  <div className="skill-icon">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 14c1.66 0 2.99-1.34 2.99-3L15 5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm5.3-3c0 3-2.54 5.1-5.3 5.1S6.7 14 6.7 11H5c0 3.41 2.72 6.23 6 6.72V21h2v-3.28c3.28-.48 6-3.3 6-6.72h-1.7z"/>
                    </svg>
                  </div>
                  <span className="skill-label">Pronunciation</span>
                  <span className="skill-gain">+2</span>
                </div>
                <div className="skill-item">
                  <div className="skill-icon">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z"/>
                    </svg>
                  </div>
                  <span className="skill-label">Fluency</span>
                  <span className="skill-gain">+1</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Outcome;
