// src/pages/Dashboard.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

function Dashboard() {
  const navigate = useNavigate();

  // Placeholder data
  const completedScenarios = [
    { id: 1, title: 'Ordering Food', xp: 30, image: '🍔' },
    { id: 2, title: 'Airport Check-in', xp: 50, image: '✈️' },
    { id: 3, title: 'Job Interview', xp: 75, image: '💼' }
  ];

  const accuracyData = [
    { day: 'M', value: 75 },
    { day: 'T', value: 78 },
    { day: 'W', value: 82 },
    { day: 'T', value: 88 },
    { day: 'F', value: 90 },
    { day: 'S', value: 95 }
  ];

  const streak = 4;
  const currentLevel = 3;
  const currentXP = 245;
  const xpForNextLevel = 400;
  const averageAccuracy = 85;

  return (
    <div className="dashboard-page">
      {/* Black Header Bar */}
      <div className="dashboard-header-bar"></div>

      <div className="dashboard-container">
        {/* Header Section */}
        <div className="dashboard-header-section">
          <h1 className="dashboard-title">Welcome back!</h1>
          <p className="dashboard-subtitle">Here's a summary of your language learning progress.</p>
        </div>

        {/* Top Row: Completed Scenarios and Speaking Accuracy */}
        <div className="dashboard-top-row">
          {/* Completed Scenarios */}
          <div className="dashboard-card scenarios-card">
            <h2 className="card-title">Completed Scenarios</h2>
            <div className="scenarios-list">
              {completedScenarios.map((scenario) => (
                <div key={scenario.id} className="completed-scenario-item">
                  <div className="scenario-icon">{scenario.image}</div>
                  <div className="scenario-info">
                    <div className="scenario-name">{scenario.title}</div>
                    <div className="scenario-xp">+ {scenario.xp} XP</div>
                  </div>
                  <div className="completion-badge">✓</div>
                </div>
              ))}
            </div>
            <button className="view-all-btn">View All</button>
          </div>

          {/* Speaking Accuracy */}
          <div className="dashboard-card accuracy-card">
            <h2 className="card-title">Speaking Accuracy</h2>
            <div className="accuracy-chart">
              <div className="chart-area">
                <svg viewBox="0 0 400 200" className="line-chart">
                  {/* Grid lines */}
                  <line x1="0" y1="50" x2="400" y2="50" stroke="#E5E7EB" strokeWidth="1" />
                  <line x1="0" y1="100" x2="400" y2="100" stroke="#E5E7EB" strokeWidth="1" />
                  <line x1="0" y1="150" x2="400" y2="150" stroke="#E5E7EB" strokeWidth="1" />
                  
                  {/* Line path */}
                  <polyline
                    fill="none"
                    stroke="#3B82F6"
                    strokeWidth="3"
                    points="50,100 110,92 170,72 230,48 290,40 350,20"
                  />
                  
                  {/* Data points */}
                  {accuracyData.map((point, index) => {
                    const x = 50 + index * 60;
                    const y = 200 - (point.value * 2);
                    return (
                      <circle
                        key={index}
                        cx={x}
                        cy={y}
                        r="5"
                        fill="#3B82F6"
                      />
                    );
                  })}
                </svg>
              </div>
              <div className="chart-labels">
                {accuracyData.map((point, index) => (
                  <span key={index} className="day-label">{point.day}</span>
                ))}
              </div>
            </div>
            <div className="average-accuracy">Average Accuracy: + {averageAccuracy}%</div>
          </div>
        </div>

        {/* Bottom Row: Streak and Level */}
        <div className="dashboard-bottom-row">
          {/* Streak Card */}
          <div className="dashboard-card streak-card">
            <div className="streak-icon">🔥</div>
            <div className="streak-info">
              <div className="streak-title">{streak}-Day Streak</div>
              <div className="streak-subtitle">Keep it up!</div>
            </div>
          </div>

          {/* Level Card */}
          <div className="dashboard-card level-card">
            <div className="level-icon">🔒</div>
            <div className="level-info">
              <div className="level-title">Level {currentLevel}</div>
              <div className="level-progress-bar">
                <div 
                  className="level-progress-fill"
                  style={{ width: `${(currentXP / xpForNextLevel) * 100}%` }}
                ></div>
              </div>
              <div className="level-xp">+ {currentXP} / {xpForNextLevel} XP</div>
            </div>
          </div>
        </div>

        {/* Continue Learning Button */}
        <div className="dashboard-actions">
          <button 
            className="continue-learning-btn"
            onClick={() => navigate('/hub')}
          >
            Continue Learning
          </button>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;