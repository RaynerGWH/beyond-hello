import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Feedback.css';

function Feedback() {
  const navigate = useNavigate();

  return (
    <div className="feedback-page">
      {/* Header */}
      <div className="feedback-header">
        <h1 className="feedback-title">Feedback</h1>
        <div className="feedback-subtitle">Business Networking Event</div>
        <div className="feedback-scene">Scene 1 of 1</div>
      </div>

      {/* Score Banner */}
      <div className="score-banner">
        <div className="score-number">85</div>
        <div className="score-label">/ 100</div>
      </div>

      {/* Content */}
      <div className="feedback-content">

        {/* Pronunciation Rating */}
        <div className="feedback-section">
          <h3 className="section-title">Pronunciation Rating</h3>
          <div className="rating-display">
            <div className="rating-dots">
              <span className="dot filled"></span>
              <span className="dot filled"></span>
              <span className="dot filled"></span>
              <span className="dot filled"></span>
              <span className="dot"></span>
              <span className="dot"></span>
            </div>
            <span className="rating-label">Good</span>
          </div>
        </div>

        {/* What You Said */}
        <div className="feedback-section">
          <h3 className="section-title">What You Said</h3>
          <div className="user-response">
            你好，我是Greg。很高兴认识你。我是一名AI工程师。
          </div>
        </div>

        {/* Pronunciation Tips */}
        <div className="feedback-section">
          <h3 className="section-title">🔹 Pronunciation Tips</h3>
          <ul className="tips-list">
            <li>
              Try to pronounce <strong>你 (nǐ)</strong> with a clear third tone 
              (fall–rise), not flat like <em>nee</em>.
            </li>
            <li>
              <strong>好 (hǎo)</strong> should also be third tone — don't say it 
              like <em>how</em> in English; keep the dipping tone.
            </li>
            <li>
              In <strong>我是 (wǒ shì)</strong>:
              <ul>
                <li><strong>我 (wǒ)</strong> is third tone (low and slightly rising)</li>
                <li><strong>是 (shì)</strong> is fourth tone (sharp falling)</li>
              </ul>
            </li>
            <li>
              <strong>认识 (rènshi)</strong>:
              <ul>
                <li>rèn — fourth tone (strong fall)</li>
                <li>shi — neutral tone (light and quick)</li>
              </ul>
            </li>
            <li>
              <strong>工程师 (gōngchéngshī)</strong>:
              <ul>
                <li>gōng — 1st tone (high and flat)</li>
                <li>chéng — 2nd tone (rising)</li>
                <li>shī — 1st tone (high and flat)</li>
              </ul>
            </li>
          </ul>
        </div>

        {/* Natural Phrasing */}
        <div className="feedback-section">
          <h3 className="section-title">💬 Natural Phrasing</h3>
          <p className="phrasing-note">
            Your sentence is correct and natural 👍 If you want to sound 
            more professional, try:
          </p>
          <div className="phrasing-example">
            <div className="phrasing-chinese">
              你好，我叫Greg。很高兴认识你。我是一名人工智能工程师。
            </div>
            <div className="phrasing-note-small">
              "人工智能工程师" sounds more formal than "AI工程师"
            </div>
          </div>
          <div className="phrasing-example">
            <div className="phrasing-chinese">
              你好，我叫Greg，是一名人工智能工程师。很高兴认识你。
            </div>
            <div className="phrasing-note-small">
              Smoother flow — introduce yourself before the pleasantry
            </div>
          </div>
        </div>

      </div>

      {/* Action Buttons */}
      <div className="feedback-actions">
        <button 
          className="retry-btn"
          onClick={() => navigate('/play/networking/1')}
        >
          ↺ Retry
        </button>
        <button 
          className="continue-btn"
          onClick={() => navigate('/outcome')}
        >
          Continue →
        </button>
      </div>

    </div>
  );
}

export default Feedback;