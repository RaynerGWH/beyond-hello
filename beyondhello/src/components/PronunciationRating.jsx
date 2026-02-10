import React from 'react';
import './PronunciationRating.css';

export default function PronunciationRating({ score }) {
  const totalDots = 6;
  const filledDots = Math.ceil((score / 100) * totalDots);
  
  const getRatingLabel = (score) => {
    if (score >= 90) return 'Excellent';
    if (score >= 75) return 'Good';
    if (score >= 60) return 'Fair';
    return 'Needs Work';
  };
  
  return (
    <div className="rating-display">
      <div className="rating-dots">
        {[...Array(totalDots)].map((_, i) => (
          <span 
            key={i} 
            className={`dot ${i < filledDots ? 'filled' : 'empty'}`}
          />
        ))}
      </div>
      <span className="rating-label">{getRatingLabel(score)}</span>
    </div>
  );
}