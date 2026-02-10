import React from 'react';
import './ScenarioCard.css';

export default function ScenarioCard({ 
  scenario, 
  onClick,
  completed = false
}) {
  const getDifficultyClass = (diff) => {
    switch(diff.toLowerCase()) {
      case 'easy': return 'difficulty-easy';
      case 'medium': return 'difficulty-medium';
      case 'hard': return 'difficulty-hard';
      default: return '';
    }
  };
  
  return (
    <div className="scenario-card" onClick={onClick}>
      <div className="scenario-thumbnail">
        {scenario.thumbnail ? (
          <img src={scenario.thumbnail} alt={scenario.title} />
        ) : (
          <div className="thumbnail-placeholder">
            [Image]
          </div>
        )}
        {completed && (
          <div className="completed-badge">✓</div>
        )}
      </div>
      <div className="scenario-info">
        <h3 className="scenario-title">{scenario.title}</h3>
        <div className="scenario-meta">
          <span className={`difficulty-badge ${getDifficultyClass(scenario.difficulty)}`}>
            {scenario.difficulty}
          </span>
          <span className="duration">⏱ {scenario.duration}</span>
        </div>
        <div className="xp-reward">
          <span>🏆 +{scenario.xpReward} XP</span>
        </div>
      </div>
    </div>
  );
}