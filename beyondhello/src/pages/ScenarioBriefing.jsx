// src/pages/ScenarioBriefing.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { getScenarioById } from '../data/scenarios';
import { trackEvent } from '../utils/analytics';
import './ScenarioBriefing.css';

function ScenarioBriefing() {
  const navigate = useNavigate();
  const { scenarioId } = useParams();
  const [scenario, setScenario] = useState(null);
  const [isCheatSheetOpen, setIsCheatSheetOpen] = useState(false);

  useEffect(() => {
    const scenarioData = getScenarioById(scenarioId);
    if (scenarioData) {
      setScenario(scenarioData);
    } else {
      navigate('/hub');
    }
  }, [scenarioId, navigate]);

  // Map scenario to a relevant warm-up topic
  const warmupTopicMap = {
    'networking': 'introductions',
    'restaurant-order': 'ordering'
  };
  const warmupTopic = warmupTopicMap[scenarioId] || 'greetings';

  const handleStartScenario = () => {
    trackEvent('scenario_started', { scenario: scenario?.title || scenarioId });
    navigate(`/play/${scenarioId}`);
  };
  const handleBack = () => navigate('/hub');

  if (!scenario) return null;

  // Pull phrases from first scene options for the cheat sheet
  const firstSceneOptions = scenario.scenes?.[0]?.options ?? [];

  return (
    <div className="scenario-briefing-page">
      <div className="briefing-container">

        {/* Back button — top-left */}
        <button className="briefing-back-btn" onClick={handleBack}>← Back</button>

        <h1 className="briefing-page-title">Mission Briefing</h1>

        <div className="briefing-card">
          <h2 className="scenario-title">{scenario.title}</h2>
          <p className="scenario-description">{scenario.description}</p>

          {/* ── Cheat Sheet panel ──────────────────────────────────── */}
          <div className="cheatsheet-block">

            {/* Toggle row */}
            <div
              className="cheatsheet-header"
              onClick={() => setIsCheatSheetOpen(!isCheatSheetOpen)}
            >
              <div className="cheatsheet-header-left">
                <svg className="cheatsheet-icon" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17 3H7c-1.1 0-2 .9-2 2v16l7-3 7 3V5c0-1.1-.9-2-2-2z"/>
                </svg>
                <span className="cheatsheet-label">Key Phrases</span>
              </div>
              <svg
                className={`cheatsheet-chevron ${isCheatSheetOpen ? 'open' : ''}`}
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M7 10l5 5 5-5z"/>
              </svg>
            </div>

            {/* Warm-up nudge — always visible, grouped with cheat sheet */}
            <p className="cheatsheet-warmup-nudge">
              Need more practice first?{' '}
              <Link to={`/practice?topic=${warmupTopic}`} className="cheatsheet-warmup-link">
                Try Phrase Warm-Up →
              </Link>
            </p>

            {/* Expanded content */}
            {isCheatSheetOpen && (
              <div className="cheatsheet-content">
                <div className="cheatsheet-grid">
                  {firstSceneOptions.map((option) => (
                    <div key={option.id} className="cheatsheet-phrase-card">
                      <span className="csp-chinese">
                        {option.cheatSheet?.phrase ?? option.textInTargetLang}
                      </span>
                      {(option.cheatSheet?.pinyin ?? option.pronunciationGuide) && (
                        <span className="csp-pinyin">
                          {option.cheatSheet?.pinyin ?? option.pronunciationGuide}
                        </span>
                      )}
                      <span className="csp-english">
                        {option.cheatSheet?.translation ?? option.textTranslation}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="cheatsheet-footer">
                  <button
                    className="got-it-btn"
                    onClick={() => setIsCheatSheetOpen(false)}
                  >
                    ✓ Got it
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* ── Briefing content ───────────────────────────────────── */}
          <div className="briefing-content">

            {/* Context */}
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
                <h3 className="illustration-heading">Context</h3>
                <p className="illustration-description">
                  You're at the Shanghai Tech Innovation Summit networking reception.
                  You've been introduced to a senior AI venture capitalist who invests
                  in early-stage tech startups.
                </p>
              </div>
            </div>

            {/* Objective */}
            <div className="objective-section">
              <h3 className="section-title">Your Objective</h3>
              <ul className="objective-list">
                <li>State your full name (中文 or English)</li>
                <li>Identify your role and company/organization</li>
                <li>Mention your field of work (AI/tech/industry)</li>
                <li>Explain why you're attending this summit</li>
                <li>Express interest in connecting further</li>
              </ul>
            </div>

            {/* Tone */}
            <div className="tone-section">
              <h3 className="section-title">Tone</h3>
              <p className="tone-description">
                Semi-formal, confident, and concise. Use professional vocabulary
                where appropriate (工程师, 人工智能, 创业).
              </p>
            </div>

            {/* Success Criteria */}
            <div className="success-section">
              <h3 className="section-title">Success Criteria</h3>
              <ul className="success-list">
                <li>Complete introduction in 3–5 sentences</li>
                <li>Deliver under 30 seconds</li>
                <li>Use at least one professional Chinese term</li>
                <li>Maintain clear pronunciation and proper tone</li>
              </ul>
            </div>

            {/* Characters */}
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
                      <span className="character-role"> — {character.personality}</span>
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

          {/* ── Action Buttons ─────────────────────────────────────── */}
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
