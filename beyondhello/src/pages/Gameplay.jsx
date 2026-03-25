import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getScenarioById } from '../data/scenarios';
import { trackEvent } from '../utils/analytics';
import './Gameplay.css';

function Gameplay() {
  const navigate = useNavigate();
  const { scenarioId } = useParams();

  const scenario = getScenarioById(scenarioId);
  const firstScene = scenario?.scenes[0];

  // ── State ──────────────────────────────────────────────────────────────────
  const [currentScene, setCurrentScene] = useState(firstScene || null);
  const [sceneIndex, setSceneIndex] = useState(0);
  const totalScenes = scenario?.scenes?.length || 1;

  // phase: ready → playing → options → speaking → result → (next or outcome)
  const [phase, setPhase] = useState('ready');
  const [selectedOption, setSelectedOption] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [showHelp, setShowHelp] = useState(false);

  // Accumulate results across scenes: [{ scene, option, score }]
  const [sceneResults, setSceneResults] = useState([]);

  const videoRef = useRef(null);

  // ── Reset when scene changes ───────────────────────────────────────────────
  useEffect(() => {
    if (videoRef.current) videoRef.current.load();
    setPhase('ready');
    setSelectedOption(null);
    setIsRecording(false);
  }, [currentScene]);

  // ── Handlers ──────────────────────────────────────────────────────────────

  const handlePlay = () => {
    setPhase('playing');
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {});
    }
  };

  const handleVideoEnded = () => {
    trackEvent('scene_video_watched', { scene: sceneIndex });
    setPhase('options');
    setSelectedOption(null);
  };

  const handleSelectOption = (option) => {
    const optionIndex = currentScene.options.findIndex(opt => opt.id === option.id);
    trackEvent('dialogue_option_selected', { scene: sceneIndex, option: optionIndex });
    setSelectedOption(option);
  };

  const handleSpeakNow = () => {
    trackEvent('pronunciation_attempted', { scene: sceneIndex });
    setPhase('speaking');
  };

  const handleMicClick = () => {
    if (!isRecording) {
      setIsRecording(true);
    } else {
      setIsRecording(false);

      // Save this scene's result
      const result = {
        sceneIndex,
        sceneId: currentScene.sceneId,
        characterDialogue: currentScene.characterDialogue,
        dialogueTranslation: currentScene.dialogueTranslation,
        selectedOption,
        score: selectedOption?.baseScore ?? 80,
      };
      const updatedResults = [...sceneResults, result];
      setSceneResults(updatedResults);

      setPhase('result');
      setTimeout(() => advanceScene(updatedResults), 1500);
    }
  };

  const advanceScene = (results) => {
    const nextIndex = sceneIndex + 1;
    if (nextIndex >= totalScenes) {
      // All done — pass results to Feedback/Outcome page
      navigate('/feedback', {
        state: { scenarioId, sceneResults: results }
      });
    } else {
      setSceneIndex(nextIndex);
      setCurrentScene(scenario.scenes[nextIndex]);
    }
  };

  const handleReplay = () => {
    setPhase('playing');
    setIsRecording(false);
    setSelectedOption(null);
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {});
    }
  };

  // ── Guard ─────────────────────────────────────────────────────────────────
  if (!scenario || !currentScene) {
    return (
      <div className="gameplay-page">
        <p style={{ padding: 32, color: '#6B7280' }}>Scenario not found.</p>
      </div>
    );
  }

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <div className="gameplay-page">

      {/* Header */}
      <div className="gameplay-header">
        <h1 className="gameplay-title">{scenario.title}</h1>
        <div className="scene-indicator">Scene {sceneIndex + 1} of {totalScenes}</div>
      </div>

      {/* Scene progress bar */}
      <div className="scene-progress-bar">
        <div
          className="scene-progress-fill"
          style={{ width: `${((sceneIndex + 1) / totalScenes) * 100}%` }}
        />
      </div>

      {/* Video */}
      <div className="gameplay-video-container">
        <video
          ref={videoRef}
          className="gameplay-video"
          playsInline
          onEnded={handleVideoEnded}
        >
          <source src={currentScene.videoUrl} type="video/mp4" />
        </video>
      </div>

      {/* Interaction Section */}
      <div className="interaction-section">

        {phase === 'ready' && (
          <div className="phase-ready">
            <p className="scene-context">{currentScene.sceneContext}</p>
            <button className="play-btn" onClick={handlePlay}>▶ Play</button>
          </div>
        )}

        {phase === 'playing' && (
          <div className="phase-playing">
            <p className="interaction-prompt">Listen carefully...</p>
          </div>
        )}

        {phase === 'options' && (
          <div className="phase-options">
            <p className="interaction-prompt">Choose your response</p>
            <div className="options-grid">
              {currentScene.options.map((option) => (
                <button
                  key={option.id}
                  className={`option-card ${selectedOption?.id === option.id ? 'selected' : ''}`}
                  onClick={() => handleSelectOption(option)}
                >
                  <span className="option-chinese">{option.textInTargetLang}</span>
                  <span className="option-pinyin">{option.pronunciationGuide}</span>
                  <span className="option-english">{option.textTranslation}</span>
                </button>
              ))}
            </div>
            {selectedOption && (
              <button className="speak-now-btn" onClick={handleSpeakNow}>
                🎤 Speak Now
              </button>
            )}
          </div>
        )}

        {phase === 'speaking' && (
          <div className="phase-speaking">
            {selectedOption && (
              <div className="speaking-prompt-card">
                <span className="speaking-prompt-chinese">{selectedOption.textInTargetLang}</span>
                <span className="speaking-prompt-pinyin">{selectedOption.pronunciationGuide}</span>
              </div>
            )}
            <p className="interaction-prompt">
              {isRecording ? '🔴 Recording... Press mic to stop' : '🎤 Say it out loud'}
            </p>
            <div className="controls-row">
              <button className="help-btn" onClick={() => setShowHelp(true)}>Need Help?</button>
              <button
                className={`mic-button ${isRecording ? 'recording' : ''}`}
                onClick={handleMicClick}
              >
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z"/>
                  <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z"/>
                </svg>
              </button>
              <button className="replay-btn" onClick={handleReplay}>↺ Replay</button>
            </div>
          </div>
        )}

        {phase === 'result' && (
          <div className="phase-result">
            <div className="result-flash">
              <span className="result-icon">✓</span>
              <span className="result-label">
                {sceneIndex + 1 < totalScenes ? 'Nice! Next scene...' : 'Scene complete!'}
              </span>
            </div>
          </div>
        )}

      </div>

      {/* Vocabulary Help Panel */}
      {showHelp && (
        <div className="help-overlay" onClick={() => setShowHelp(false)}>
          <div className="help-panel" onClick={(e) => e.stopPropagation()}>
            <div className="help-header">
              <h3 className="help-title">Vocabulary Cheat Sheet</h3>
              <button className="help-close" onClick={() => setShowHelp(false)}>✕</button>
            </div>
            <div className="help-vocab-list">
              {currentScene.options.map((option, index) => (
                <div key={index} className="vocab-row">
                  <span className="vocab-chinese">{option.textInTargetLang}</span>
                  <span className="vocab-pinyin">{option.pronunciationGuide}</span>
                  <span className="vocab-english">{option.textTranslation}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default Gameplay;