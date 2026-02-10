import React from 'react';
import './ProgressBar.css';
import { getUserLevel, getNextLevelLabel } from '../data/levelRanks';

export default function ProgressBar({ xp }) {
  const levelData = getUserLevel(xp);
  const nextLabel = getNextLevelLabel(levelData.level);
  
  return (
    <div className="progress-section">
      <div className="level-info">
        <span className="level-label">{levelData.label}</span>
        <span className="next-level">
          → {nextLabel} ({levelData.xpToNext} XP more)
        </span>
      </div>
      <div className="progress-bar">
        <div 
          className="progress-fill" 
          style={{width: `${levelData.progress}%`}}
        />
      </div>
    </div>
  );
}