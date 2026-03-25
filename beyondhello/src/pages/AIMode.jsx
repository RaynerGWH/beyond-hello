// src/pages/AIMode.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { trackEvent } from '../utils/analytics';
import { storage } from '../utils/storage';
import './AIMode.css';

const elevatorScenarioTemplate = {
  id: 'ai-session-scenario',
  title: 'Elevator Conversation',
  difficulty: 'Custom',
  duration: '5-8 min',
  xpReward: 40,
  thumbnail: '/images/elevator-talk.jpg',
  description: 'You just stepped into an elevator and a friendly colleague starts a conversation. Practice casual Chinese small talk.',
  characters: [
    { name: 'Colleague', role: 'Elevator Colleague', personality: 'Friendly' }
  ],
  scenes: [
    {
      sceneId: 'ai-elev-scene-1',
      videoUrl: '/videos/networking/scene-1.mp4',
      characterName: 'Colleague',
      characterDialogue: '你好！我可以问一下你的名字吗？',
      dialogueTranslation: 'Hi! May I ask your name?',
      sceneContext: 'You just stepped into an elevator and a friendly colleague starts a conversation.',
      options: [
        {
          id: 'ai-elev-1-a',
          textInTargetLang: '你好，我叫[名字]。',
          textTranslation: "Hi, I'm [Name].",
          pronunciationGuide: 'Nǐ hǎo, wǒ jiào [míngzì].',
          sentiment: 'friendly',
          baseScore: 92,
          isOptimal: true,
        },
        {
          id: 'ai-elev-1-b',
          textInTargetLang: '我是[名字]，你呢？',
          textTranslation: "I'm [Name], you?",
          pronunciationGuide: 'Wǒ shì [Name], nǐ ne?',
          sentiment: 'engaging',
          baseScore: 88,
          isOptimal: true,
        },
        {
          id: 'ai-elev-1-c',
          textInTargetLang: '我叫[名字]。',
          textTranslation: 'My name is [Name].',
          pronunciationGuide: 'Wǒ jiào [míngzì].',
          sentiment: 'neutral',
          baseScore: 75,
          isOptimal: false,
        },
        {
          id: 'ai-elev-1-d',
          textInTargetLang: '我是[名字]，今天好热!',
          textTranslation: "I'm [Name], it's so hot today!",
          pronunciationGuide: 'Wǒ shì [míngzì], jīntiān hǎo rè!',
          sentiment: 'chatty',
          baseScore: 58,
          isOptimal: false,
        },
      ]
    },
    {
      sceneId: 'ai-elev-scene-2',
      videoUrl: '/videos/networking/scene-2.mp4',
      characterName: 'Colleague',
      characterDialogue: '你要去几楼？',
      dialogueTranslation: 'Which floor are you heading to?',
      sceneContext: 'The elevator starts moving, and the person continues the conversation.',
      options: [
        {
          id: 'ai-elev-2-a',
          textInTargetLang: '我去十楼，你呢？',
          textTranslation: '10th floor, you?',
          pronunciationGuide: 'Wǒ qù shí lóu, nǐ ne?',
          sentiment: 'engaging',
          baseScore: 90,
          isOptimal: true,
        },
        {
          id: 'ai-elev-2-b',
          textInTargetLang: '我去十楼，上班。',
          textTranslation: '10th floor, for work.',
          pronunciationGuide: 'Wǒ qù shí lóu, shàngbān.',
          sentiment: 'casual',
          baseScore: 87,
          isOptimal: true,
        },
        {
          id: 'ai-elev-2-c',
          textInTargetLang: '十楼。',
          textTranslation: '10th floor.',
          pronunciationGuide: 'Shí lóu.',
          sentiment: 'brief',
          baseScore: 72,
          isOptimal: false,
        },
        {
          id: 'ai-elev-2-d',
          textInTargetLang: '不知道。',
          textTranslation: "I don't know.",
          pronunciationGuide: 'Bù zhīdào.',
          sentiment: 'confused',
          baseScore: 55,
          isOptimal: false,
        },
      ]
    },
    {
      sceneId: 'ai-elev-scene-3',
      videoUrl: '/videos/networking/scene-3.mp4',
      characterName: 'Colleague',
      characterDialogue: '好啦，这是我的楼层，下次见！',
      dialogueTranslation: 'Alright, this is my stop. See you next time!',
      sceneContext: 'The elevator reaches their floor and they are about to leave.',
      options: [
        {
          id: 'ai-elev-3-a',
          textInTargetLang: '很高兴认识你，再见！',
          textTranslation: 'Nice meeting you, bye!',
          pronunciationGuide: 'Hěn gāoxìng rènshi nǐ, zàijiàn!',
          sentiment: 'warm',
          baseScore: 93,
          isOptimal: true,
        },
        {
          id: 'ai-elev-3-b',
          textInTargetLang: '再见，祝你愉快！',
          textTranslation: 'Bye, have a nice day!',
          pronunciationGuide: 'Zàijiàn, zhù nǐ yúkuài!',
          sentiment: 'positive',
          baseScore: 89,
          isOptimal: true,
        },
        {
          id: 'ai-elev-3-c',
          textInTargetLang: '好，再见。',
          textTranslation: 'Ok, bye.',
          pronunciationGuide: 'Hǎo, zàijiàn.',
          sentiment: 'neutral',
          baseScore: 74,
          isOptimal: false,
        },
        {
          id: 'ai-elev-3-d',
          textInTargetLang: '嗯。',
          textTranslation: 'Hmm.',
          pronunciationGuide: 'Ńg.',
          sentiment: 'indifferent',
          baseScore: 52,
          isOptimal: false,
        },
      ]
    },
  ],
  completion: {
    sceneId: 'ai-elev-complete',
    successMessage: 'You had a great elevator conversation!',
    characterQuote: '很高兴认识你！',
    characterQuoteTranslation: 'Great to meet you!',
    outcomeVariants: {
      excellent: 'You chatted naturally like a local!',
      good: 'You held a solid small-talk conversation!',
      fair: 'You got through the conversation — keep practicing!',
      struggled: 'You participated — small talk takes practice!'
    }
  }
};

function AIMode() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [user, setUser] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationProgress, setGenerationProgress] = useState(0);
  
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

  useEffect(() => {
    if (!isGenerating) {
      setGenerationProgress(0);
      return;
    }

    const durationMs = 23000;
    const startedAt = Date.now();

    const intervalId = window.setInterval(() => {
      const elapsed = Date.now() - startedAt;
      const nextProgress = Math.min((elapsed / durationMs) * 100, 100);
      setGenerationProgress(nextProgress);
    }, 100);

    const timeoutId = window.setTimeout(() => {
      const generatedScenario = {
        ...elevatorScenarioTemplate,
        isTemporary: true,
      };

      storage.setTemporaryScenario(generatedScenario);
      setGenerationProgress(100);
      navigate('/hub');
    }, durationMs);

    return () => {
      window.clearInterval(intervalId);
      window.clearTimeout(timeoutId);
    };
  }, [isGenerating, navigate]);

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

    setIsGenerating(true);
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
        {isGenerating ? (
          <div className="ai-generating-screen">
            <div className="ai-generating-card">
              <div className="ai-generating-pulse" aria-hidden="true" />
              <p className="ai-generating-eyebrow">AI scenario builder</p>
              <h1 className="ai-generating-title">Crafting your conversation simulation</h1>
              <p className="ai-generating-subtitle">
                Structuring scenes, tuning difficulty, and shaping responses for a more realistic practice run.
              </p>

              <div className="ai-generating-progress-wrap">
                <div className="ai-generating-progress-bar" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(generationProgress)}>
                  <div
                    className="ai-generating-progress-fill"
                    style={{ width: `${generationProgress}%` }}
                  />
                </div>
                <div className="ai-generating-progress-meta">
                  <span>Generating scenario...</span>
                  <span>{Math.round(generationProgress)}%</span>
                </div>
              </div>

              <div className="ai-generating-notes">
                <span>Scenario: {scenarioInput}</span>
                <span>Persona: {selectedPersona?.name}</span>
              </div>
            </div>
          </div>
        ) : (
          <>
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
            <span className="step-label">Generate Scenario</span>
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

        {/* Step 3: Generate Scenario */}
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
              Generate Scenario →
            </button>
          </div>
        )}
          </>
        )}
      </main>
    </div>
  );
}

export default AIMode;
