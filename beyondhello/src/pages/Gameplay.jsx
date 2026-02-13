import React, { useState, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getScenarioById } from '../data/scenarios';
import './Gameplay.css';

// Vocabulary cheat sheet data per scenario
const VOCAB = {
  networking: [
    { chinese: '你好', pinyin: 'nǐ hǎo', english: 'Hello' },
    { chinese: '我叫', pinyin: 'wǒ jiào', english: 'My name is' },
    { chinese: '很高兴认识你', pinyin: 'hěn gāoxìng rènshi nǐ', english: 'Nice to meet you' },
    { chinese: '我是工程师', pinyin: 'wǒ shì gōngchéngshī', english: 'I am an engineer' },
    { chinese: '人工智能', pinyin: 'rén gōng zhì néng', english: 'Artificial Intelligence' },
    { chinese: '很荣幸', pinyin: 'hěn róngxìng', english: 'It is an honour' },
  ]
};

function Gameplay() {
  const navigate = useNavigate();
  const { scenarioId } = useParams();

  // Flow states
  const [phase, setPhase] = useState('ready'); // ready → playing → speaking → done
  const [isRecording, setIsRecording] = useState(false);
  const [showHelp, setShowHelp] = useState(false);

  const videoRef = useRef(null);
  const audioRef = useRef(null);

  // Derive vocab key from scenarioId
  const vocabKey = scenarioId?.includes('networking') ? 'networking' : 'cafe';
  const vocab = VOCAB[vocabKey] || [];

  // --- Handlers ---

  const handlePlay = () => {
    setPhase('playing');
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {});
    }
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(() => {});
    }
  };

  const handleVideoEnded = () => {
    // Video done → mic appears
    setPhase('speaking');
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

  const handleMicClick = () => {
    if (!isRecording) {
      setIsRecording(true);
    } else {
      setIsRecording(false);
      setPhase('done');
      navigate('/feedback');
    }
  };

  const handleReplay = () => {
    setPhase('playing');
    setIsRecording(false);
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {});
    }
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(() => {});
    }
  };

  return (
    <div className="gameplay-page">
      {/* Header */}
      <div className="gameplay-header">
        <h1 className="gameplay-title">Business Networking Event</h1>
        <div className="scene-indicator">Scene 1 of 1</div>
      </div>

      {/* Video */}
      <div className="gameplay-video-container">
        <video
          ref={videoRef}
          className="gameplay-video"
          muted
          playsInline
          onEnded={handleVideoEnded}
        >
          <source src="/videos/chinese-man.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Hidden audio */}
      <audio ref={audioRef} preload="auto">
        <source src="/audios/chinese-man.wav" type="audio/wav" />
        <source src="/audios/chinese-man.mp3" type="audio/mpeg" />
      </audio>

      {/* Interaction Section */}
      <div className="interaction-section">

        {/* PHASE: ready - show Play button only */}
        {phase === 'ready' && (
          <div className="phase-ready">
            <p className="interaction-prompt">Press play to begin the scene</p>
            <button className="play-btn" onClick={handlePlay}>
              ▶ Play
            </button>
          </div>
        )}

        {/* PHASE: playing - video is running, show nothing/replay */}
        {phase === 'playing' && (
          <div className="phase-playing">
            <p className="interaction-prompt">Listen carefully...</p>
          </div>
        )}

        {/* PHASE: speaking - mic appears after video ends */}
        {phase === 'speaking' && (
          <div className="phase-speaking">
            <p className="interaction-prompt">
              {isRecording ? '🔴 Recording... Press mic to stop' : '🎤 Your turn — speak in Chinese'}
            </p>
            <div className="controls-row">
              <button className="help-btn" onClick={() => setShowHelp(true)}>
                Need Help?
              </button>

              <button
                className={`mic-button ${isRecording ? 'recording' : ''}`}
                onClick={handleMicClick}
              >
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z"/>
                  <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z"/>
                </svg>
              </button>

              <button className="replay-btn" onClick={handleReplay}>
                ↺ Replay
              </button>
            </div>
          </div>
        )}

      </div>

      {/* Need Help - Slide Up Panel */}
      {showHelp && (
        <div className="help-overlay" onClick={() => setShowHelp(false)}>
          <div className="help-panel" onClick={(e) => e.stopPropagation()}>
            <div className="help-header">
              <h3 className="help-title">Vocabulary Cheat Sheet</h3>
              <button className="help-close" onClick={() => setShowHelp(false)}>✕</button>
            </div>
            <div className="help-vocab-list">
              {vocab.map((item, index) => (
                <div key={index} className="vocab-row">
                  <span className="vocab-chinese">{item.chinese}</span>
                  <span className="vocab-pinyin">{item.pinyin}</span>
                  <span className="vocab-english">{item.english}</span>
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