// src/pages/ScenarioHub.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { scenariosData } from '../data/scenarios';
import { storage } from '../utils/storage';
import './ScenarioHub.css';

function ScenarioHub() {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(null);
  const [user, setUser] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    setProgress(storage.getProgress());
    setUser(storage.getUser());
  }, []);

  const handleScenarioClick = (scenarioId) => {
    if (scenarioId === 'networking') {
      navigate(`/briefing/${scenarioId}`);
    } else {
      setShowPopup(true);
    }
  };

  const handleGenerateClick = () => setShowPopup(true);

  const scenariosPerPage = 3;
  const totalPages = Math.ceil(scenariosData.length / scenariosPerPage);

  const visibleScenarios = scenariosData.slice(
    currentSlide * scenariosPerPage,
    (currentSlide + 1) * scenariosPerPage
  );

  const isScenarioCompleted = (scenarioId) =>
    progress?.completedScenarios?.includes(scenarioId);

  const handlePrevSlide = () =>
    setCurrentSlide((prev) => Math.max(0, prev - 1));

  const handleNextSlide = () =>
    setCurrentSlide((prev) => Math.min(totalPages - 1, prev + 1));

  // Derive sidebar initials from stored name
  const initials = user?.name
    ? user.name.split(' ').map((w) => w[0]).slice(0, 2).join('').toUpperCase()
    : 'BH';

  return (
    <div className="hub-shell">

      {/* ── Sidebar ───────────────────────────────────────────────────────── */}
      <aside className="hub-sidebar">

        {/* Logo */}
        <div className="sidebar-logo">
          <span className="logo-beyond">Beyond</span>
          <span className="logo-hello">Hello</span>
        </div>

        {/* Nav */}
        <nav className="sidebar-nav">
          <div className="nav-item nav-item-active">
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

          <div className="nav-divider" />

          <div className="nav-item nav-item-green" onClick={() => navigate('/practice')}>
            <svg className="nav-icon" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 3a9 9 0 0 1 9 9c0 4.97-4.03 9-9 9S3 16.97 3 12a9 9 0 0 1 9-9zm0 16c3.86 0 7-3.14 7-7s-3.14-7-7-7-7 3.14-7 7 3.14 7 7 7zm1-11h-2v5h2V8zm0 6h-2v2h2v-2z"/>
            </svg>
            <span>Phrase Warm-Up</span>
          </div>
        </nav>

        {/* User pill */}
        <div className="sidebar-user-pill">
          <div className="user-initials-circle">{initials}</div>
          <div className="user-pill-info">
            <span className="user-pill-name">{user?.name || 'Learner'}</span>
            <span className="user-pill-xp">{progress?.totalXP || 0} XP</span>
          </div>
        </div>
      </aside>

      {/* ── Main content ──────────────────────────────────────────────────── */}
      <main className="hub-main">

        {/* Page header */}
        <div className="hub-page-header">
          <h1 className="hub-title">Choose your scenario</h1>
          <p className="hub-subtitle">Select a mission to practice real-life language skills.</p>
        </div>

        {/* Green warm-up strip */}
        <div className="warmup-strip">
          <div className="strip-left">
            <div className="strip-icon-box">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 3a9 9 0 0 1 9 9c0 4.97-4.03 9-9 9S3 16.97 3 12a9 9 0 0 1 9-9zm0 16c3.86 0 7-3.14 7-7s-3.14-7-7-7-7 3.14-7 7 3.14 7 7 7zm1-11h-2v5h2V8zm0 6h-2v2h2v-2z"/>
              </svg>
            </div>
            <div className="strip-labels">
              <span className="strip-label-main">Not ready yet?</span>
              <span className="strip-label-sub">Drill key phrases before jumping in.</span>
            </div>
          </div>
          <Link to="/practice" className="strip-cta">
            Start Phrase Warm-Up →
          </Link>
        </div>

        {/* Missions section */}
        <div className="missions-section">
          <p className="section-label">Missions</p>

          {/* Scenario cards grid */}
          <div className="scenarios-grid">
            {visibleScenarios.map((scenario, i) => (
              <div
                key={scenario.id}
                className="hub-scenario-card"
                style={{ animationDelay: `${i * 60}ms` }}
                onClick={() => handleScenarioClick(scenario.id)}
              >
                {/* Thumbnail */}
                <div className="card-thumb">
                  {scenario.thumbnail ? (
                    <img src={scenario.thumbnail} alt={scenario.title} />
                  ) : (
                    <div className="thumb-placeholder" />
                  )}
                  <span className={`card-diff-badge diff-${scenario.difficulty.toLowerCase()}`}>
                    {scenario.difficulty}
                  </span>
                  {isScenarioCompleted(scenario.id) && (
                    <div className="completed-checkmark">✓</div>
                  )}
                </div>

                {/* Card body */}
                <div className="card-body">
                  <h3 className="card-title">{scenario.title}</h3>
                  <div className="card-meta-row">
                    <div className="card-duration">
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.5-13H11v6l5.2 3.2.8-1.3-4.5-2.7V7z"/>
                      </svg>
                      <span>{scenario.duration}</span>
                    </div>
                    <span className="card-xp-chip">+{scenario.xpReward} XP</span>
                  </div>
                </div>
              </div>
            ))}

            {/* Generate custom scenario card */}
            <div
              className="hub-scenario-card generate-card"
              style={{ animationDelay: `${visibleScenarios.length * 60}ms` }}
              onClick={handleGenerateClick}
            >
              <div className="card-thumb generate-thumb">
                <div className="generate-plus">+</div>
                <span className="card-diff-badge diff-custom">Custom</span>
              </div>
              <div className="card-body">
                <h3 className="card-title">Generate Your Own Scenario</h3>
                <div className="card-meta-row">
                  <div className="card-duration">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.5-13H11v6l5.2 3.2.8-1.3-4.5-2.7V7z"/>
                    </svg>
                    <span>Flexible</span>
                  </div>
                  <span className="card-xp-chip card-xp-variable">Variable XP</span>
                </div>
              </div>
            </div>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="pagination-controls">
              <button
                className="nav-arrow"
                onClick={handlePrevSlide}
                disabled={currentSlide === 0}
              >
                ‹
              </button>
              <div className="pagination-dots">
                {[...Array(totalPages)].map((_, index) => (
                  <button
                    key={index}
                    className={`dot ${currentSlide === index ? 'active' : ''}`}
                    onClick={() => setCurrentSlide(index)}
                  />
                ))}
              </div>
              <button
                className="nav-arrow"
                onClick={handleNextSlide}
                disabled={currentSlide === totalPages - 1}
              >
                ›
              </button>
            </div>
          )}
        </div>

        {/* Daily quest banner */}
        <div className="daily-quest-banner">
          <svg className="quest-icon" viewBox="0 0 24 24" fill="currentColor">
            <path d="M9 11H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm2-7h-1V2h-2v2H8V2H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z"/>
          </svg>
          <span className="quest-text">
            Daily Quest — complete your first scenario today for <strong>+20 XP</strong>
          </span>
        </div>

        {/* View All */}
        <div className="view-all-section">
          <button className="view-all-btn" onClick={() => {}}>
            View All Missions
          </button>
        </div>

      </main>

      {/* Coming Soon popup */}
      {showPopup && (
        <div className="popup-overlay" onClick={() => setShowPopup(false)}>
          <div className="popup-modal" onClick={(e) => e.stopPropagation()}>
            <h3 className="popup-title">Coming Soon</h3>
            <p className="popup-message">To be released after prototype</p>
            <button className="popup-close-btn" onClick={() => setShowPopup(false)}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ScenarioHub;
