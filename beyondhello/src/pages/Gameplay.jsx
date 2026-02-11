// src/pages/Gameplay.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getScenarioById } from '../data/scenarios';
import VideoPlayer from '../components/VideoPlayer';
import './Gameplay.css';

function Gameplay() {
  const navigate = useNavigate();
  const { scenarioId } = useParams();
  const [scenario, setScenario] = useState(null);
  const [currentSceneIndex, setCurrentSceneIndex] = useState(0);
  const [isRecording, setIsRecording] = useState(false);

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

  const currentScene = scenario.scenes[currentSceneIndex];
  const totalScenes = scenario.scenes.length;

  const handleMicClick = () => {
    setIsRecording(!isRecording);
    // Future: Implement speech recognition
  };

  const handleNeedHelp = () => {
    // Future: Show dialogue options modal
    alert('Help: Choose from dialogue options (coming soon)');
  };

  const handleSkip = () => {
    if (currentSceneIndex < totalScenes - 1) {
      setCurrentSceneIndex(currentSceneIndex + 1);
    } else {
      // Navigate to feedback page
      navigate('/feedback');
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
          <div className="scenario-progress">
            Scenario {currentSceneIndex + 1} of {totalScenes}
          </div>
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
                  className="scene-video"
                  autoPlay 
                  loop 
                  muted 
                  playsInline
                >
                  <source src="/videos/chinese-man.mp4" type="video/mp4" />
                </video>
              </div>
            )}
          </div>
        </div>

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

            <button className="skip-btn" onClick={handleSkip}>
              Skip
            </button>
          </div>

          {/* Scene Progress Dots */}
          <div className="scene-progress-section">
            <span className="scene-counter">Scene {currentSceneIndex + 1} of {totalScenes}</span>
            <div className="progress-dots">
              {[...Array(totalScenes)].map((_, index) => (
                <div
                  key={index}
                  className={`progress-dot ${index === currentSceneIndex ? 'active' : ''} ${index < currentSceneIndex ? 'completed' : ''}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Gameplay;
