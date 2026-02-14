import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { getScenarioById } from '../data/scenarios';
import './Feedback.css';

// Derive rating label + dot count from score
function getRating(score) {
  if (score >= 90) return { label: 'Excellent', filled: 6, color: '#22C55E' };
  if (score >= 75) return { label: 'Good', filled: 4, color: '#3B82F6' };
  if (score >= 60) return { label: 'Fair', filled: 3, color: '#FCD34D' };
  return { label: 'Keep Practising', filled: 1, color: '#EF4444' };
}

// Derive outcome variant label from average score
function getOutcomeVariant(avg) {
  if (avg >= 90) return 'excellent';
  if (avg >= 75) return 'good';
  if (avg >= 60) return 'fair';
  return 'struggled';
}

function Feedback() {
  const navigate = useNavigate();
  const { state } = useLocation();

  const scenarioId = state?.scenarioId || 'networking';
  const sceneResults = state?.sceneResults || [];
  const scenario = getScenarioById(scenarioId);

  // Calculate overall score
  const avgScore = sceneResults.length
    ? Math.round(sceneResults.reduce((sum, r) => sum + r.score, 0) / sceneResults.length)
    : 85;

  const xpEarned = scenario ? Math.round((avgScore / 100) * scenario.xpReward) : 40;
  const rating = getRating(avgScore);
  const outcomeVariant = getOutcomeVariant(avgScore);
  const outcomeMessage = scenario?.completion?.outcomeVariants?.[outcomeVariant] || 'Great effort!';
  const characterQuote = scenario?.completion?.characterQuote || '';
  const characterQuoteTranslation = scenario?.completion?.characterQuoteTranslation || '';

  return (
    <div className="feedback-page">

      {/* Header */}
      <div className="feedback-header">
        <h1 className="feedback-title">Scenario Complete!</h1>
        <div className="feedback-subtitle">{scenario?.title || 'Business Networking Event'}</div>
      </div>

      {/* Overall Score Banner */}
      <div className="score-banner">
        <div className="score-number" style={{ color: rating.color }}>{avgScore}</div>
        <div className="score-label">/ 100</div>
      </div>

      {/* XP + Outcome */}
      <div className="outcome-summary">
        <div className="xp-badge">+{xpEarned} XP</div>
        <p className="outcome-message">{outcomeMessage}</p>
        {characterQuote && (
          <div className="character-quote">
            <span className="quote-text">"{characterQuote}"</span>
            <span className="quote-translation">{characterQuoteTranslation}</span>
          </div>
        )}
      </div>

      <div className="feedback-content">

        {/* Per-Scene Breakdown */}
        <div className="feedback-section">
          <h3 className="section-title">Scene Breakdown</h3>
          <div className="scene-breakdown">
            {sceneResults.length > 0 ? sceneResults.map((result, index) => {
              const r = getRating(result.score);
              return (
                <div key={index} className="scene-row">
                  <div className="scene-row-header">
                    <span className="scene-row-label">Scene {index + 1}</span>
                    <span className="scene-row-score" style={{ color: r.color }}>
                      {result.score}/100
                    </span>
                  </div>
                  <div className="scene-row-dialogue">
                    {result.characterDialogue}
                    <span className="scene-row-translation"> — {result.dialogueTranslation}</span>
                  </div>
                  {result.selectedOption && (
                    <div className="scene-row-response">
                      <span className="response-label">You said: </span>
                      <span className="response-text">{result.selectedOption.textInTargetLang}</span>
                    </div>
                  )}
                  <div className="rating-display">
                    <div className="rating-dots">
                      {Array.from({ length: 6 }).map((_, i) => (
                        <span
                          key={i}
                          className="dot"
                          style={{ background: i < r.filled ? r.color : '#E5E7EB' }}
                        />
                      ))}
                    </div>
                    <span className="rating-label">{r.label}</span>
                  </div>
                </div>
              );
            }) : (
              // Fallback mock if no results passed (e.g. navigated directly)
              [85, 90, 78].map((score, index) => {
                const r = getRating(score);
                return (
                  <div key={index} className="scene-row">
                    <div className="scene-row-header">
                      <span className="scene-row-label">Scene {index + 1}</span>
                      <span className="scene-row-score" style={{ color: r.color }}>{score}/100</span>
                    </div>
                    <div className="rating-display">
                      <div className="rating-dots">
                        {Array.from({ length: 6 }).map((_, i) => (
                          <span key={i} className="dot"
                            style={{ background: i < r.filled ? r.color : '#E5E7EB' }} />
                        ))}
                      </div>
                      <span className="rating-label">{r.label}</span>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Pronunciation Tips */}
        <div className="feedback-section">
          <h3 className="section-title">🔹 Pronunciation Tips</h3>
          <ul className="tips-list">
            <li>
              <strong>您好 (nín hǎo)</strong> — use 您 instead of 你 with seniors.
              nín is second tone (rising), hǎo is third tone (fall–rise).
            </li>
            <li>
              <strong>人工智能 (rén gōng zhì néng)</strong>:
              <ul>
                <li>rén — 2nd tone (rising)</li>
                <li>gōng — 1st tone (flat high)</li>
                <li>zhì — 4th tone (sharp fall)</li>
                <li>néng — 2nd tone (rising)</li>
              </ul>
            </li>
            <li>
              <strong>合作 (hézuò)</strong> — hé is 2nd tone, zuò is 4th tone.
              Don't flatten either syllable.
            </li>
            <li>
              <strong>期待 (qīdài)</strong> — qī is 1st tone (flat), dài is 4th tone (falling).
              A natural, professional closing phrase.
            </li>
          </ul>
        </div>

        {/* Natural Phrasing */}
        {sceneResults[0]?.selectedOption?.feedback?.naturalPhrasing && (
          <div className="feedback-section">
            <h3 className="section-title">💬 Natural Phrasing</h3>
            <p className="phrasing-note">
              Here's how a native speaker might phrase your opening:
            </p>
            <div className="phrasing-example">
              <div className="phrasing-chinese">
                {sceneResults[0].selectedOption.feedback.naturalPhrasing}
              </div>
              <div className="phrasing-note-small">
                From Scene 1 — your introduction
              </div>
            </div>
          </div>
        )}

      </div>

      {/* Action Buttons */}
      <div className="feedback-actions">
        <button
          className="retry-btn"
          onClick={() => navigate(`/play/${scenarioId}`)}
        >
          ↺ Play Again
        </button>
        <button
          className="continue-btn"
          onClick={() => navigate('/hub')}
        >
          Back to Scenarios
        </button>
      </div>

    </div>
  );
}

export default Feedback;