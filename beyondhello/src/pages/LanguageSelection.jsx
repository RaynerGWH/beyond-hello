import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import { storage } from '../utils/storage';
import './LanguageSelection.css';

function LanguageSelection() {
  const navigate = useNavigate();
  const [selectedLanguage, setSelectedLanguage] = useState('');

  const languages = [
    { code: 'fr', name: 'French', flag: '🇫🇷' },
    { code: 'ja', name: 'Japanese', flag: '🇯🇵' },
    { code: 'ko', name: 'Korean', flag: '🇰🇷' }
  ];

  const handleContinue = () => {
    if (!selectedLanguage) return;
    
    // Update user data with selected language
    const user = storage.getUser();
    storage.setUser({
      ...user,
      targetLanguage: selectedLanguage
    });
    
    // Navigate to scenario hub
    navigate('/hub');
  };

  return (
    <div className="language-page">
      <div className="container">
        <div className="language-content">
          <h1 className="language-heading">Which language do you want to learn?</h1>
          
          <div className="language-cards">
            {languages.map((lang) => (
              <div
                key={lang.code}
                className={`language-card ${selectedLanguage === lang.code ? 'selected' : ''}`}
                onClick={() => setSelectedLanguage(lang.code)}
              >
                <span className="language-flag">{lang.flag}</span>
                <span className="language-name">{lang.name}</span>
              </div>
            ))}
          </div>
          
          <Button
            variant="primary"
            onClick={handleContinue}
            disabled={!selectedLanguage}
            fullWidth
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
}

export default LanguageSelection;