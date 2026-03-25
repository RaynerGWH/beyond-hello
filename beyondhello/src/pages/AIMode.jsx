// src/pages/AIMode.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { trackEvent } from '../utils/analytics';
import { storage } from '../utils/storage';
import './AIMode.css';

function AIMode() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [user, setUser] = useState(null);
  
  // Step 1: Scenario description
  const [scenarioInput, setScenarioInput] = useState('');
  const [selectedTopic, setSelectedTopic] = useState(null);
  
  // Step 2: AI Persona selection
  const [selectedPersona, setSelectedPersona] = useState(null);
  
  // Popular scenario topics
  const popularTopics = [
    'Tech Interview',
    'Sales Negotiation',
    'Client Meeting',
    'Support Escalation'
  ];
  
  // AI Personas
  const aiPersonas = [
    {
      id: 'professional',
      name: 'Professional',
      description: 'Formal, business-like tone',
      icon: '💼'
    },
    {
      id: 'casual',
      name: 'Casual',
      description: 'Friendly, conversational tone',
      icon: '😊'
    },
    {
      id: 'strict',
      name: 'Strict',
      description: 'Demanding, challenging tone',
      icon: '🎯'
    }
  ];

  useEffect(() => {
    setUser(storage.getUser());
  }, []);

  const handleScenarioInput = (value) => {
    if (value.length <= 500) {
      setScenarioInput(value);
    }
  };

  const handleTopicSelect = (topic) => {
    setScenarioInput(topic);
    setSelectedTopic(topic);
  };

  const handleContinueStep1 = () => {
    if (scenarioInput.trim()) {
      setStep(2);
    }
  };

  const handlePersonaSelect = (persona) => {
    setSelectedPersona(persona);
  };

  const handleContinueStep2 = () => {
    if (selectedPersona) {
      setStep(3);
    }
  };

  const handleStartPractice = () => {
    // Track event
    trackEvent('ai_scenario_started', {
      scenario: scenarioInput,
      persona: selectedPersona.name
    });
    
    // Navigate to gameplay with custom scenario data
    // For now, navigate to a placeholder
    navigate('/play/ai-custom', {
      state: {
        scenarioTitle: scenarioInput,
        selectedPersona: selectedPersona,
      }
    });
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    } else {
      navigate('/hub');
    }
  };

  // Derive sidebar initials from stored name
  const initials = user?.name
    ? user.name.split(' ').map((w) => w[0]).slice(0, 2).join('').toUpperCase()
    : 'BH';

  return (
    <div className="ai-mode-shell">
      {/* ── Sidebar ───────────────────────────────────────────────────────── */}
      <aside className="ai-sidebar">

        {/* Logo */}
        <div className="sidebar-logo">
          <span className="logo-beyond">Beyond</span>
          <span className="logo-hello">Hello</span>
        </div>

        {/* Nav */}
        <nav className="sidebar-nav">
          <div className="nav-item" onClick={() => navigate('/hub')}>
            <svg className="nav-icon" viewBox="0 0 24 24" fill="currentColor">
              <path d="M3 3h8v8H3zm10 0h8v8h-8zM3 13h8v8H3zm10 0h8v8h-8z"/>
            </svg>
            <span>Scenarios</span>
          </div>

          <div className="nav-item" onClick={() => navigate('/dashboard')}>
            <svg className="nav-icon" viewBox="0 0 24 24" fill="currentColor">
              <path d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z"/>
            </svg>
            <span>Dashboard</span>
          </div>

          <div className="nav-item" onClick={() => navigate('/plans')}>
            <svg className="nav-icon" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z"/>
            </svg>
            <span>Plans</span>
          </div>

          <div className="nav-divider" />

          <div className="nav-item nav-item-green" onClick={() => navigate('/practice')}>
            <svg className="nav-icon" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 3a9 9 0 0 1 9 9c0 4.97-4.03 9-9 9S3 16.97 3 12a9 9 0 0 1 9-9zm0 16c3.86 0 7-3.14 7-7s-3.14-7-7-7-7 3.14-7 7 3.14 7 7 7zm1-11h-2v5h2V8zm0 6h-2v2h2v-2z"/>
            </svg>
            <span>Phrase Warm-Up</span>
          </div>
        </nav>

        {/* User pill */}
        <div
          className="sidebar-user-pill sidebar-user-pill-clickable"
          onClick={() => navigate('/plans')}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              navigate('/plans');
            }
          }}
        >
          <div className="user-initials-circle">{initials}</div>
          <div className="user-pill-info">
            <span className="user-pill-name">{user?.name || 'Learner'}</span>
          </div>
        </div>
      </aside>

      {/* ── Main content ──────────────────────────────────────────────────── */}
      <main className="ai-main">
        {/* Page header */}
        <div className="ai-page-header">
          <button className="ai-back-btn" onClick={handleBack}>← Back</button>
          <h1 className="ai-title">Create your AI conversation simulation</h1>
          <p className="ai-subtitle">Enter your scenario and practice with realistic AI</p>
        </div>

        {/* Step indicator */}
        <div className="ai-step-indicator">
          <div className={`step-marker ${step >= 1 ? 'active' : ''}`}>
            <span className="step-number">1</span>
            <span className="step-label">Describe Scenario</span>
          </div>
          <div className={`step-line ${step > 1 ? 'active' : ''}`}></div>
          <div className={`step-marker ${step >= 2 ? 'active' : ''}`}>
            <span className="step-number">2</span>
            <span className="step-label">Choose AI Persona</span>
          </div>
          <div className={`step-line ${step > 2 ? 'active' : ''}`}></div>
          <div className={`step-marker ${step >= 3 ? 'active' : ''}`}>
            <span className="step-number">3</span>
            <span className="step-label">Start Practicing</span>
          </div>
        </div>

        {/* Step 1: Describe Scenario */}
        {step === 1 && (
          <div className="ai-step-content">
            <div className="step-form">
              <label className="form-label">What's your scenario?</label>
              <textarea
                className="form-textarea"
                placeholder="E.g. 'I need to prepare for a Senior Engineer interview at a tech company...'"
                value={scenarioInput}
                onChange={(e) => handleScenarioInput(e.target.value)}
                maxLength={500}
              />
              <div className="form-help-text">
                Be specific for better results
              </div>
              <div className="char-count">{scenarioInput.length}/500</div>

              <button
                className="form-button"
                onClick={handleContinueStep1}
                disabled={!scenarioInput.trim()}
              >
                Continue →
              </button>
            </div>

            {/* Popular topics */}
            <div className="popular-section">
              <p className="popular-label">Popular:</p>
              <div className="popular-tags">
                {popularTopics.map((topic) => (
                  <button
                    key={topic}
                    className={`popular-tag ${selectedTopic === topic ? 'active' : ''}`}
                    onClick={() => handleTopicSelect(topic)}
                  >
                    {topic}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Choose AI Persona */}
        {step === 2 && (
          <div className="ai-step-content">
            <div className="personas-grid">
              {aiPersonas.map((persona) => (
                <div
                  key={persona.id}
                  className={`persona-card ${selectedPersona?.id === persona.id ? 'selected' : ''}`}
                  onClick={() => handlePersonaSelect(persona)}
                >
                  <div className="persona-icon">{persona.icon}</div>
                  <h3 className="persona-name">{persona.name}</h3>
                  <p className="persona-description">{persona.description}</p>
                </div>
              ))}
            </div>

            <button
              className="form-button"
              onClick={handleContinueStep2}
              disabled={!selectedPersona}
            >
              Continue →
            </button>
          </div>
        )}

        {/* Step 3: Start Practicing */}
        {step === 3 && (
          <div className="ai-step-content ai-review">
            <div className="review-card">
              <h2>Ready to practice?</h2>
              <div className="review-details">
                <div className="review-item">
                  <span className="review-label">Your Scenario:</span>
                  <p className="review-value">{scenarioInput}</p>
                </div>
                <div className="review-item">
                  <span className="review-label">AI Persona:</span>
                  <p className="review-value">
                    <span className="persona-badge">{selectedPersona.icon} {selectedPersona.name}</span>
                  </p>
                </div>
              </div>
            </div>

            <button
              className="form-button form-button-primary"
              onClick={handleStartPractice}
            >
              Start Practicing →
            </button>
          </div>
        )}
      </main>
    </div>
  );
}

export default AIMode;
