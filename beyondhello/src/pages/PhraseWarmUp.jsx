import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { practiceTopics } from '../data/practiceTopics';
import './PhraseWarmUp.css';

function PhraseWarmUp() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // Initialise active topic from ?topic= param, fallback to first topic
  const initialTopicId = searchParams.get('topic') || practiceTopics[0].id;
  const validInitialTopic = practiceTopics.find(t => t.id === initialTopicId)
    ? initialTopicId
    : practiceTopics[0].id;

  const [activeTopicId, setActiveTopicId] = useState(validInitialTopic);
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [countdown, setCountdown] = useState(null); // 3, 2, 1, or "Speak!"

  const activeTopic = practiceTopics.find(t => t.id === activeTopicId);
  const currentPhrase = activeTopic.phrases[phraseIndex];
  const totalPhrases = activeTopic.phrases.length;

  // Reset phrase position and feedback when topic changes
  useEffect(() => {
    setPhraseIndex(0);
    setIsRecording(false);
    setShowFeedback(false);
    setCountdown(null);
  }, [activeTopicId]);

  // Countdown effect
  useEffect(() => {
    if (countdown === null) return;

    if (countdown === 0) {
      // Show "Speak!" briefly then start recording
      const timer = setTimeout(() => {
        setCountdown(null);
        setIsRecording(true);
      }, 600);
      return () => clearTimeout(timer);
    }

    if (countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const handleTopicSelect = (topicId) => {
    if (topicId === activeTopicId) return;
    setActiveTopicId(topicId);
  };

  const handlePrev = () => {
    if (phraseIndex === 0) return;
    setPhraseIndex(phraseIndex - 1);
    setIsRecording(false);
    setShowFeedback(false);
    setCountdown(null);
  };

  const handleNext = () => {
    if (phraseIndex >= totalPhrases - 1) return;
    setPhraseIndex(phraseIndex + 1);
    setIsRecording(false);
    setShowFeedback(false);
    setCountdown(null);
  };

  const handleMicClick = () => {
    if (!isRecording && countdown === null) {
      // Start countdown
      setCountdown(3);
      setShowFeedback(false);
    } else if (isRecording) {
      // Stop recording and show feedback
      setIsRecording(false);
      setShowFeedback(true);
    }
  };

  const handleTryAgain = () => {
    setShowFeedback(false);
    setIsRecording(false);
    setCountdown(null);
  };

  const handleNextPhrase = () => {
    if (phraseIndex < totalPhrases - 1) {
      setPhraseIndex(phraseIndex + 1);
    }
    setShowFeedback(false);
    setIsRecording(false);
    setCountdown(null);
  };

  return (
    <div className="warmup-page">
      {/* Header bar */}
      <div className="warmup-header-bar" />

      <div className="warmup-container">

        {/* Page header */}
        <div className="warmup-page-header">
          <button className="warmup-back-btn" onClick={() => navigate(-1)}>
            ← Back
          </button>
          <div className="warmup-title-block">
            <h1 className="warmup-title">Phrase Warm-Up</h1>
            <p className="warmup-subtitle">
              Get comfortable with key phrases before your next scenario.
            </p>
          </div>
        </div>

        {/* Topic selector — horizontal scrollable pill tabs */}
        <div className="topic-tabs-wrapper">
          <div className="topic-tabs">
            {practiceTopics.map((topic) => (
              <button
                key={topic.id}
                className={`topic-tab ${activeTopicId === topic.id ? 'active' : ''}`}
                onClick={() => handleTopicSelect(topic.id)}
              >
                {topic.label}
              </button>
            ))}
          </div>
        </div>

        {/* Phrase card */}
        <div className="phrase-card">
          <div className="phrase-target-lang">{currentPhrase.targetLang}</div>
          <div className="phrase-pinyin">{currentPhrase.pronunciationGuide}</div>
          <div className="phrase-translation">{currentPhrase.translation}</div>
          {currentPhrase.tip && (
            <div className="phrase-tip">
              <span className="tip-label">Tip</span>
              <span className="tip-text">{currentPhrase.tip}</span>
            </div>
          )}
        </div>

        {/* Navigation controls */}
        <div className="phrase-nav">
          <button
            className="phrase-nav-btn"
            onClick={handlePrev}
            disabled={phraseIndex === 0}
            aria-label="Previous phrase"
          >
            ←
          </button>
          <span className="phrase-progress">
            {phraseIndex + 1} / {totalPhrases}
          </span>
          <button
            className="phrase-nav-btn"
            onClick={handleNext}
            disabled={phraseIndex >= totalPhrases - 1}
            aria-label="Next phrase"
          >
            →
          </button>
        </div>

        {/* Mic section — hidden while feedback is showing */}
        {!showFeedback && (
          <div className="warmup-mic-section">
            {countdown !== null ? (
              <div className="countdown-display">
                <div className="countdown-number">
                  {countdown === 0 ? 'Speak!' : countdown}
                </div>
              </div>
            ) : (
              <>
                <p className="warmup-mic-prompt">
                  {isRecording ? '🔴 Recording…' : '🎤 Say it out loud'}
                </p>
                <button
                  className={`mic-button ${isRecording ? 'recording' : ''}`}
                  onClick={handleMicClick}
                  aria-label={isRecording ? 'Stop recording' : 'Start recording'}
                >
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z"/>
                    <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z"/>
                  </svg>
                </button>
              </>
            )}
          </div>
        )}

        {/* Feedback panel — appears after user stops recording */}
        {showFeedback && (
          <div className="warmup-feedback-panel">
            <div className="feedback-score-row">
              <span className="feedback-score-number">{currentPhrase.score}</span>
              <span className="feedback-score-denom">/100</span>
            </div>
            <div className="feedback-phrase-block">
              <div className="feedback-target-lang">{currentPhrase.targetLang}</div>
              <div className="feedback-pinyin">{currentPhrase.pronunciationGuide}</div>
            </div>
            {currentPhrase.feedback && (
              <p className="feedback-tip-text">{currentPhrase.feedback}</p>
            )}
            <div className="feedback-actions">
              <button className="try-again-btn" onClick={handleTryAgain}>
                ↺ Try Again
              </button>
              <button
                className="next-phrase-btn"
                onClick={handleNextPhrase}
                disabled={phraseIndex >= totalPhrases - 1}
              >
                Next Phrase →
              </button>
            </div>
          </div>
        )}

        {/* Footer CTA */}
        <div className="warmup-footer">
          <button
            className="warmup-hub-cta"
            onClick={() => navigate('/hub')}
          >
            Ready to try a full scenario? →
          </button>
        </div>

      </div>
    </div>
  );
}

export default PhraseWarmUp;
