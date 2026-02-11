// src/pages/Gameplay.jsx
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getScenarioById } from '../data/scenarios';
import VideoPlayer from '../components/VideoPlayer';
import './Gameplay.css';

function Gameplay() {
  const navigate = useNavigate();
  const { scenarioId } = useParams();
  const [scenario, setScenario] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [recordingAttempts, setRecordingAttempts] = useState(0);
  const audioRef = useRef(null);
  const videoRef = useRef(null);

  useEffect(() => {
    const scenarioData = getScenarioById(scenarioId);
    if (scenarioData) {
      setScenario(scenarioData);
    } else {
      navigate('/hub');
    }
  }, [scenarioId, navigate]);

  if (!scenario) {
    return null;
  }

  const currentScene = scenario.scenes[0]; // Always use first scene

  const handlePlay = () => {
    setHasStarted(true);
    
    // Play video
    if (videoRef.current) {
      videoRef.current.play().catch(err => console.log('Video play failed:', err));
    }
    
    // Play audio
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(err => console.log('Audio play failed:', err));
    }
  };

  const handleMicClick = () => {
    if (!isRecording) {
      // Start recording
      setIsRecording(true);
    } else {
      // Stop recording
      setIsRecording(false);
      
      // First attempt: show feedback
      // Second attempt: go to outcome
      if (recordingAttempts === 0) {
        setShowFeedback(true);
        setRecordingAttempts(1);
      } else {
        navigate('/outcome');
      }
    }
  };

  const handleNeedHelp = () => {
    // Future: Show dialogue options modal
    alert('Help: Choose from dialogue options (coming soon)');
  };

  const handleRetry = () => {
    // Hide feedback and replay
    setShowFeedback(false);
    setHasStarted(false);
    
    // Reset video and audio
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.pause();
    }
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.pause();
    }
  };

  return (
    <div className="gameplay-page">
      {/* Black Header Bar */}
      <div className="gameplay-header-bar"></div>

      {/* Main Content */}
      <div className="gameplay-container">
        {/* Title Section */}
        <div className="gameplay-title-section">
          <h1 className="gameplay-title">{scenario.title}</h1>
        </div>

        {/* Scene Visual */}
        <div className="scene-visual-container">
          <div className="scene-visual">
            {currentScene.videoUrl ? (
              <VideoPlayer 
                videoUrl={currentScene.videoUrl}
                autoPlay={true}
                showControls={false}
              />
            ) : (
              <div className="scene-illustration">
                <video 
                  ref={videoRef}
                  className="scene-video"
                  muted 
                  playsInline
                  onEnded={() => {
                    // Stop audio when video ends
                    if (audioRef.current) {
                      audioRef.current.pause();
                      audioRef.current.currentTime = 0;
                    }
                  }}
                >
                  <source src="/videos/chinese-man.mp4" type="video/mp4" />
                </video>
              </div>
            )}
          </div>
        </div>

        {/* Feedback Modal Overlay */}
        {showFeedback && (
          <div className="feedback-overlay">
            <div className="feedback-modal">
              <div className="feedback-header">
                <h2 className="feedback-title">Feedback</h2>
                <div className="feedback-subtitle">{scenario.title}</div>
                <div className="feedback-scene">Scene 1 of 1</div>
              </div>

              <div className="feedback-illustration">
                <div className="scene-illustration">
                  <video 
                    className="scene-video"
                    muted 
                    playsInline
                  >
                    <source src="/videos/chinese-man.mp4" type="video/mp4" />
                  </video>
                </div>
              </div>

              <div className="feedback-content">
                <div className="pronunciation-section">
                  <h3 className="section-title">Pronunciation Rating</h3>
                  <div className="rating-display">
                    <div className="rating-dots">
                      <span className="dot filled"></span>
                      <span className="dot filled"></span>
                      <span className="dot filled"></span>
                      <span className="dot"></span>
                      <span className="dot"></span>
                    </div>
                    <span className="rating-label">Fair</span>
                  </div>
                </div>

                <div className="answer-feedback-section">
                  <h3 className="section-title">Feedback on Your Answer</h3>
                  <div className="feedback-text">
                    <strong>你说：</strong><br />
                    你好，我是Greg。很高兴认识你。我是一名AI工程师。
                  </div>
                  <div className="tips-header">🔹 Pronunciation Tips:</div>
                  <ul className="feedback-tips">
                    <li>Try to pronounce <strong>"你 (nǐ)"</strong> with a clear third tone (fall–rise), not flat like <em>nee</em>.</li>
                    <li><strong>"好 (hǎo)"</strong> should also be third tone — don't say it like <em>how</em> in English; keep the dipping tone.</li>
                    <li>In <strong>"我是 (wǒ shì)"</strong>, make sure:
                      <ul>
                        <li><strong>"我 (wǒ)"</strong> is third tone (low and slightly rising).</li>
                        <li><strong>"是 (shì)"</strong> is fourth tone (sharp falling tone, like giving a firm answer).</li>
                      </ul>
                    </li>
                    <li><strong>"认识 (rènshi)"</strong>
                      <ul>
                        <li>"rèn" is fourth tone (strong fall).</li>
                        <li>"shi" is neutral tone (light and quick, not stressed).</li>
                      </ul>
                    </li>
                    <li><strong>"工程师 (gōngchéngshī)"</strong>
                      <ul>
                        <li>gōng (1st tone – high and flat)</li>
                        <li>chéng (2nd tone – rising)</li>
                        <li>shī (1st tone – high and flat)</li>
                      </ul>
                      Make sure the tones are clear and not all flat.
                    </li>
                  </ul>
                </div>

                <div className="natural-phrasing-section">
                  <h3 className="section-title">Natural phrasing:</h3>
                  <p className="phrasing-text">
                    Your sentence is correct and natural 👍
                  </p>
                  <p className="phrasing-text">
                    If you want to sound slightly more fluent or professional, you could say:
                  </p>
                  <p className="phrasing-example">
                    <strong>你好，我叫Greg。很高兴认识你。我是一名人工智能工程师。</strong><br />
                    <em>("人工智能工程师" sounds more formal than "AI工程师")</em>
                  </p>
                  <p className="phrasing-text">Or a smoother self-introduction:</p>
                  <p className="phrasing-example">
                    <strong>你好，我叫Greg，是一名人工智能工程师。很高兴认识你。</strong>
                  </p>
                </div>

                <button className="retry-btn" onClick={handleRetry}>
                  Retry
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Hidden Audio Element */}
        <audio 
          ref={audioRef} 
          preload="auto"
          onEnded={() => {
            // Stop video when audio ends
            if (videoRef.current) {
              videoRef.current.pause();
            }
          }}
        >
          <source src="/audios/chinese-man.wav" type="audio/wav" />
          <source src="/audios/chinese-man.mp3" type="audio/mpeg" />
        </audio>

        {/* Interaction Section */}
        <div className="interaction-section">
          <div className="interaction-prompt">
            Speak your answer in Chinese...
          </div>

          <div className="interaction-controls">
            <button className="help-btn" onClick={handleNeedHelp}>
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

            <button className="play-btn" onClick={handlePlay}>
              Play
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Gameplay;
