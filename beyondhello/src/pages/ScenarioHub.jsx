// src/pages/ScenarioHub.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { scenariosData } from '../data/scenarios';
import { storage } from '../utils/storage';
import ScenarioCard from '../components/ScenarioCard';
import './ScenarioHub.css';

function ScenarioHub() {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  
  useEffect(() => {
    const userProgress = storage.getProgress();
    setProgress(userProgress);
  }, []);
  
  const handleScenarioClick = (scenarioId) => {
    // Only allow networking scenario
    if (scenarioId === 'networking') {
      navigate(`/briefing/${scenarioId}`);
    } else {
      setShowPopup(true);
    }
  };
  
  const handleGenerateClick = () => {
    setShowPopup(true);
  };
  
  const scenariosPerPage = 3;
  const totalPages = Math.ceil(scenariosData.length / scenariosPerPage);
  
  const visibleScenarios = scenariosData.slice(
    currentSlide * scenariosPerPage,
    (currentSlide + 1) * scenariosPerPage
  );
  
  const isScenarioCompleted = (scenarioId) => {
    return progress?.completedScenarios?.includes(scenarioId);
  };
  
  const handlePrevSlide = () => {
    setCurrentSlide((prev) => Math.max(0, prev - 1));
  };
  
  const handleNextSlide = () => {
    setCurrentSlide((prev) => Math.min(totalPages - 1, prev + 1));
  };
  
  return (
    <div className="scenario-hub-page">
      {/* Black Header Bar */}
      <div className="hub-header-bar"></div>
      
      {/* Main Content */}
      <div className="hub-container">
        {/* Top Section with Title and XP */}
        <div className="hub-top-section">
          <div className="hub-title-area">
            <h1 className="hub-title">Choose Your Scenario</h1>
            <p className="hub-subtitle">Select a mission to practice real-life language skills.</p>
          </div>
          <div className="hub-xp-display">
            <button 
              className="dashboard-link-btn"
              onClick={() => navigate('/dashboard')}
            >
              View Progress Dashboard
            </button>
            <span className="xp-text">XP: {progress?.totalXP || 0}</span>
            <div className="user-avatar">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
              </svg>
            </div>
          </div>
        </div>
        
        <hr className="divider" />
        
        {/* Missions Section */}
        <div className="missions-section">
          <h2 className="section-heading">
            Missions Next <span className="arrow">→</span>
          </h2>
          
          {/* Scenario Cards Grid */}
          <div className="scenarios-grid">
            {visibleScenarios.map((scenario) => (
              <div key={scenario.id} className="scenario-card-wrapper">
                <div 
                  className="hub-scenario-card"
                  onClick={() => handleScenarioClick(scenario.id)}
                >
                  <div className="card-image-placeholder">
                    {scenario.thumbnail ? (
                      <img src={scenario.thumbnail} alt={scenario.title} />
                    ) : (
                      <div className="placeholder-illustration">
                        <svg viewBox="0 0 120 80" fill="none">
                          <rect width="120" height="80" fill="#F3F4F6"/>
                          <circle cx="40" cy="40" r="15" fill="#D1D5DB"/>
                          <circle cx="80" cy="40" r="15" fill="#D1D5DB"/>
                          <path d="M30 50 Q40 60 50 50" stroke="#D1D5DB" strokeWidth="2"/>
                        </svg>
                      </div>
                    )}
                    {isScenarioCompleted(scenario.id) && (
                      <div className="completed-checkmark">✓</div>
                    )}
                  </div>
                  
                  <div className="card-content">
                    <h3 className="card-title">{scenario.title}</h3>
                    
                    <div className="card-meta">
                      <span className={`difficulty-badge difficulty-${scenario.difficulty.toLowerCase()}`}>
                        {scenario.difficulty}
                      </span>
                    </div>
                    
                    <div className="card-info">
                      <div className="info-item">
                        <svg className="icon" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.5-13H11v6l5.2 3.2.8-1.3-4.5-2.7V7z"/>
                        </svg>
                        <span>{scenario.duration}</span>
                      </div>
                      
                      <div className="info-item xp-reward">
                        <svg className="icon" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/>
                        </svg>
                        <span>+{scenario.xpReward} XP</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            {/* Generate Custom Scenario Card */}
            <div className="scenario-card-wrapper">
              <div 
                className="hub-scenario-card generate-card"
                onClick={handleGenerateClick}
              >
                <div className="card-image-placeholder generate-placeholder">
                  <div className="generate-icon">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
                    </svg>
                  </div>
                </div>
                
                <div className="card-content">
                  <h3 className="card-title">Generate Your Own Scenario</h3>
                  
                  <div className="card-meta">
                    <span className="difficulty-badge difficulty-custom">
                      Custom
                    </span>
                  </div>
                  
                  <div className="card-info">
                    <div className="info-item">
                      <svg className="icon" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.5-13H11v6l5.2 3.2.8-1.3-4.5-2.7V7z"/>
                      </svg>
                      <span>Flexible</span>
                    </div>
                    
                    <div className="info-item xp-reward">
                      <svg className="icon" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/>
                      </svg>
                      <span>Variable XP</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Pagination Dots */}
          {totalPages > 1 && (
            <div className="pagination-controls">
              <button 
                className="nav-arrow"
                onClick={handlePrevSlide}
                disabled={currentSlide === 0}
              >
                ‹
              </button>
              <div className="pagination-dots">
                {[...Array(totalPages)].map((_, index) => (
                  <button
                    key={index}
                    className={`dot ${currentSlide === index ? 'active' : ''}`}
                    onClick={() => setCurrentSlide(index)}
                  />
                ))}
              </div>
              <button 
                className="nav-arrow"
                onClick={handleNextSlide}
                disabled={currentSlide === totalPages - 1}
              >
                ›
              </button>
            </div>
          )}
        </div>
        
        {/* Daily Quest Bonus */}
        <div className="daily-quest-banner">
          <svg className="banner-icon" viewBox="0 0 24 24" fill="currentColor">
            <path d="M9 11H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm2-7h-1V2h-2v2H8V2H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z"/>
          </svg>
          <span className="banner-text">
            Daily Quest Bonus: <strong>+20 XP</strong> for your first scenario completed!
          </span>
        </div>
        
        {/* View All Button */}
        <div className="view-all-section">
          <button className="view-all-btn" onClick={() => {/* Future: show all scenarios */}}>
            View All Missions
          </button>
        </div>
      </div>

      {/* Locked Feature Popup */}
      {showPopup && (
        <div className="popup-overlay" onClick={() => setShowPopup(false)}>
          <div className="popup-modal" onClick={(e) => e.stopPropagation()}>
            <h3 className="popup-title">Coming Soon</h3>
            <p className="popup-message">To be released after prototype</p>
            <button 
              className="popup-close-btn"
              onClick={() => setShowPopup(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ScenarioHub;
