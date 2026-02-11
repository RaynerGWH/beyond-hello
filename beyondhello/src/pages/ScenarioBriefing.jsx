// src/pages/ScenarioBriefing.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getScenarioById } from '../data/scenarios';
import './ScenarioBriefing.css';

function ScenarioBriefing() {
  const navigate = useNavigate();
  const { scenarioId } = useParams();
  const [scenario, setScenario] = useState(null);

  useEffect(() => {
    const scenarioData = getScenarioById(scenarioId);
    if (scenarioData) {
      setScenario(scenarioData);
    } else {
      // If scenario not found, redirect back to hub
      navigate('/hub');
    }
  }, [scenarioId, navigate]);

  const handleStartScenario = () => {
    navigate(`/play/${scenarioId}`);
  };

  const handleBack = () => {
    navigate('/hub');
  };

  if (!scenario) {
    return null;
  }

  return (
    <div className="scenario-briefing-page">
      {/* Black Header Bar */}
      <div className="briefing-header-bar"></div>

      {/* Main Content */}
      <div className="briefing-container">
        <h1 className="briefing-page-title">Mission Briefing</h1>

        <div className="briefing-card">
          <h2 className="scenario-title">{scenario.title}</h2>
          <p className="scenario-description">{scenario.description}</p>

          <div className="briefing-content">
            {/* Illustration Section */}
            <div className="illustration-section">
              <div className="illustration-box">
                <div className="illustration-image">
                  {scenario.thumbnail ? (
                    <img src={scenario.thumbnail} alt={scenario.title} />
                  ) : (
                    <svg viewBox="0 0 120 80" fill="none">
                      <rect width="120" height="80" fill="#F3F4F6"/>
                      <circle cx="40" cy="40" r="15" fill="#D1D5DB"/>
                      <circle cx="80" cy="40" r="15" fill="#D1D5DB"/>
                      <path d="M30 50 Q40 60 50 50" stroke="#D1D5DB" strokeWidth="2"/>
                    </svg>
                  )}
                </div>
              </div>
              
              <div className="illustration-text">
                <h3 className="illustration-heading">Illustration</h3>
                <p className="illustration-description">{scenario.description}</p>
              </div>
            </div>

            {/* Characters Section */}
            <div className="characters-section">
              <h3 className="section-title">Characters</h3>
              <div className="characters-list">
                {scenario.characters.map((character, index) => (
                  <div key={index} className="character-item">
                    <div className="character-avatar">
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                      </svg>
                    </div>
                    <div className="character-info">
                      <span className="character-name">{character.name}</span>
                      <span className="character-role"> - {character.personality}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="xp-unlock-badge">
                <svg className="lock-icon" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/>
                </svg>
                <span className="xp-text">Unlocks {scenario.xpReward} XP</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="briefing-actions">
            <button className="start-scenario-btn" onClick={handleStartScenario}>
              Start Scenario
            </button>
            <button className="back-btn" onClick={handleBack}>
              <span className="back-arrow">←</span> Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ScenarioBriefing;
