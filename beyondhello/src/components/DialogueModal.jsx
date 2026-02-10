import React, { useState } from 'react';
import './DialogueModal.css';
import Button from './Button';

export default function DialogueModal({ 
  options, 
  onConfirm, 
  onClose 
}) {
  const [selectedOption, setSelectedOption] = useState(null);
  
  const handleConfirm = () => {
    if (selectedOption) {
      onConfirm(selectedOption);
    }
  };
  
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="dialogue-modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>
        
        <h3 className="modal-heading">Choose your response:</h3>
        
        <div className="options-list">
          {options.map((option) => (
            <div
              key={option.id}
              className={`dialogue-option ${selectedOption?.id === option.id ? 'selected' : ''}`}
              onClick={() => setSelectedOption(option)}
            >
              <input
                type="radio"
                name="dialogue-choice"
                checked={selectedOption?.id === option.id}
                onChange={() => {}}
              />
              <div className="option-content">
                <div className="option-text">{option.textInTargetLang}</div>
                <div className="option-translation">({option.textTranslation})</div>
              </div>
            </div>
          ))}
        </div>
        
        <Button
          variant="primary"
          onClick={handleConfirm}
          disabled={!selectedOption}
        >
          Confirm
        </Button>
      </div>
    </div>
  );
}