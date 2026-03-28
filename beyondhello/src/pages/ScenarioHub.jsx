// src/pages/ScenarioHub.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { scenariosData } from '../data/scenarios';
import { storage } from '../utils/storage';
import './ScenarioHub.css';

const DISPLAY_LANGUAGE_OPTIONS = [
  { code: 'en', shortLabel: 'EN', supported: true },
  { code: 'ms', shortLabel: 'MY', supported: true },
  { code: 'zh-SG', shortLabel: 'CHN', supported: false },
  { code: 'ta-SG', shortLabel: 'TAM', supported: false }
];

const LEARNING_LANGUAGE = { code: 'zh-CN', shortLabel: 'CHN' };

const SCENARIO_HUB_COPY = {
  en: {
    navScenarios: 'Scenarios',
    navDashboard: 'Dashboard',
    navPlans: 'Plans',
    navSettings: 'Settings',
    navSupport: 'Support',
    navPractice: 'Phrase Warm-Up',
    learner: 'Learner',
    tokens: 'Tokens',
    lowTokens: 'Low tokens - top up in plans',
    title: 'Choose your scenario',
    subtitle: 'Select a mission to practice real-life language skills.',
    displayLanguage: 'Display',
    learningLanguage: 'Learning',
    languageSummary: (displayCode, learningCode) => `${displayCode} learning ${learningCode}`,
    languageAvailabilityLater: 'Available in later versions',
    notReadyYet: 'Not ready yet?',
    warmupSubtitle: 'Drill key phrases before jumping in.',
    startWarmup: 'Start Phrase Warm-Up →',
    missions: 'Missions',
    generateScenario: 'Generate Your Own Scenario',
    flexible: 'Flexible',
    variableXp: 'Variable XP',
    dailyQuest: 'Daily Quest — complete your first scenario today for',
    viewAllMissions: 'View All Missions',
    tokenLimitTitle: 'Token Limit Reached',
    tokenLimitText: (remaining, limit) => `You are at ${remaining}/${limit} tokens. Upgrade your plan to unlock more usage.`,
    later: 'Later',
    viewPlans: 'View Plans'
  },
  ms: {
    navScenarios: 'Senario',
    navDashboard: 'Papan Pemuka',
    navPlans: 'Pelan',
    navSettings: 'Tetapan',
    navSupport: 'Sokongan',
    navPractice: 'Pemanasan Frasa',
    learner: 'Pelajar',
    tokens: 'Token',
    lowTokens: 'Token rendah - tambah dalam pelan',
    title: 'Pilih senario anda',
    subtitle: 'Pilih misi untuk berlatih kemahiran bahasa dalam situasi sebenar.',
    displayLanguage: 'Paparan',
    learningLanguage: 'Belajar',
    languageSummary: (displayCode, learningCode) => `${displayCode} learning ${learningCode}`,
    languageAvailabilityLater: 'Tersedia dalam versi akan datang',
    notReadyYet: 'Belum bersedia?',
    warmupSubtitle: 'Latih frasa penting sebelum mula.',
    startWarmup: 'Mula Pemanasan Frasa →',
    missions: 'Misi',
    generateScenario: 'Jana Senario Anda Sendiri',
    flexible: 'Fleksibel',
    variableXp: 'XP Berubah',
    dailyQuest: 'Misi Harian — lengkapkan senario pertama anda hari ini untuk',
    viewAllMissions: 'Lihat Semua Misi',
    tokenLimitTitle: 'Had Token Dicapai',
    tokenLimitText: (remaining, limit) => `Anda berada pada ${remaining}/${limit} token. Naik taraf pelan anda untuk penggunaan tambahan.`,
    later: 'Nanti',
    viewPlans: 'Lihat Pelan'
  }
};

const SCENARIO_DISPLAY_TITLES = {
  ms: {
    networking: 'Acara Rangkaian Perniagaan',
    'restaurant-order': 'Memesan Makanan di Restoran',
    'ai-session-scenario': 'Perbualan Dalam Lif',
    generateCard: 'Jana Senario Anda Sendiri'
  }
};

function ScenarioHub() {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(null);
  const [user, setUser] = useState(null);
  const [temporaryScenario, setTemporaryScenario] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showTokenPopup, setShowTokenPopup] = useState(false);
  const [languageAvailabilityMessage, setLanguageAvailabilityMessage] = useState('');

  useEffect(() => {
    const currentProgress = storage.getProgress();
    const normalizedProgress = {
      ...currentProgress,
      lowTokenPopupShown: currentProgress.lowTokenPopupShown ?? false
    };
    setProgress(normalizedProgress);
    setUser(storage.getUser());
    setTemporaryScenario(storage.getTemporaryScenario());

    const limit = Math.max(normalizedProgress.tokenLimit ?? 20, 1);
    const remaining = Math.min(Math.max(normalizedProgress.tokensRemaining ?? limit, 0), limit);
    const shouldShowLowTokenPopup = remaining <= 10 && !normalizedProgress.lowTokenPopupShown;

    if (shouldShowLowTokenPopup) {
      setShowTokenPopup(true);
      const updatedProgress = {
        ...normalizedProgress,
        lowTokenPopupShown: true
      };
      storage.setProgress(updatedProgress);
      setProgress(updatedProgress);
    }
  }, []);

  const handleScenarioClick = (scenario) => {
    if (scenario.isTemporary) {
      navigate('/ai-gameplay', {
        state: {
          generatedScenario: scenario,
          scenarioTitle: scenario.title,
        }
      });
      return;
    }

    if (scenario.id === 'networking') {
      navigate(`/briefing/${scenario.id}`);
    } else {
      setShowPopup(true);
    }
  };

  const handleGenerateClick = () => navigate('/ai-mode');

  const allScenarios = temporaryScenario
    ? [temporaryScenario, ...scenariosData]
    : scenariosData;

  const scenariosPerPage = 3;
  const totalPages = Math.ceil(allScenarios.length / scenariosPerPage);

  const visibleScenarios = allScenarios.slice(
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
  const displayLanguage = user?.displayLanguage || 'en';
  const learningLanguage = user?.targetLanguage || LEARNING_LANGUAGE.code;
  const copy = SCENARIO_HUB_COPY[displayLanguage] || SCENARIO_HUB_COPY.en;
  const learningLanguageLabel = learningLanguage === LEARNING_LANGUAGE.code ? LEARNING_LANGUAGE.shortLabel : LEARNING_LANGUAGE.shortLabel;
  const tokenLimit = Math.max(progress?.tokenLimit ?? 20, 1);
  const tokensRemaining = Math.min(Math.max(progress?.tokensRemaining ?? 6, 0), tokenLimit);
  const tokenPercent = Math.round((tokensRemaining / tokenLimit) * 100);
  const isLowTokens = tokensRemaining <= 10;

  const handleDisplayLanguageChange = (nextLanguage) => {
    const selectedLanguage = DISPLAY_LANGUAGE_OPTIONS.find((option) => option.code === nextLanguage);

    if (!selectedLanguage?.supported) {
      setLanguageAvailabilityMessage(copy.languageAvailabilityLater);
      return;
    }

    const nextUser = {
      ...(user || storage.getUser()),
      displayLanguage: nextLanguage,
      targetLanguage: learningLanguage
    };

    storage.setUser(nextUser);
    setUser(nextUser);
    setLanguageAvailabilityMessage('');
  };

  const getScenarioDisplayTitle = (scenario) => {
    const localizedTitle = SCENARIO_DISPLAY_TITLES[displayLanguage]?.[scenario.id];
    return localizedTitle || scenario.title;
  };

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
            <span>{copy.navScenarios}</span>
          </div>

          <div className="nav-item" onClick={() => navigate('/dashboard')}>
            <svg className="nav-icon" viewBox="0 0 24 24" fill="currentColor">
              <path d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z"/>
            </svg>
            <span>{copy.navDashboard}</span>
          </div>

          <div className="nav-item" onClick={() => navigate('/plans')}>
            <svg className="nav-icon" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z"/>
            </svg>
            <span>{copy.navPlans}</span>
          </div>

          <div className="nav-divider" />

          <div className="nav-item" onClick={() => navigate('/settings')}>
            <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="3"/>
              <path d="M12 1v6m0 6v6M4.22 4.22l4.24 4.24m5.08 5.08l4.24 4.24M1 12h6m6 0h6M4.22 19.78l4.24-4.24m5.08-5.08l4.24-4.24"/>
            </svg>
            <span>{copy.navSettings}</span>
          </div>

          <div className="nav-item" onClick={() => navigate('/support')}>
            <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"/>
              <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3m.08 4h.01"/>
            </svg>
            <span>{copy.navSupport}</span>
          </div>

          <div className="nav-divider" />

          <div className="nav-item nav-item-green" onClick={() => navigate('/practice')}>
            <svg className="nav-icon" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 3a9 9 0 0 1 9 9c0 4.97-4.03 9-9 9S3 16.97 3 12a9 9 0 0 1 9-9zm0 16c3.86 0 7-3.14 7-7s-3.14-7-7-7-7 3.14-7 7 3.14 7 7 7zm1-11h-2v5h2V8zm0 6h-2v2h2v-2z"/>
            </svg>
            <span>{copy.navPractice}</span>
          </div>
        </nav>

        {/* User pill */}
        <div
          className={`sidebar-user-pill sidebar-user-pill-clickable ${isLowTokens ? 'sidebar-user-pill-urgent' : ''}`}
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
            <span className="user-pill-name">{user?.name || copy.learner}</span>
            <span className="user-pill-xp">{progress?.totalXP || 0} XP</span>
          </div>
        </div>

        <div className="sidebar-token-widget" aria-label="Token usage">
          <div className="token-top-row">
            <span className="token-label">{copy.tokens}</span>
            <span className="token-count">{tokensRemaining}/{tokenLimit}</span>
          </div>
          <div className="token-bar" role="progressbar" aria-valuemin={0} aria-valuemax={tokenLimit} aria-valuenow={tokensRemaining}>
            <div
              className={`token-bar-fill ${isLowTokens ? 'token-bar-fill-low' : ''}`}
              style={{ width: `${tokenPercent}%` }}
            />
          </div>
          {isLowTokens ? (
            <div className="token-warning" role="status" aria-live="polite">
              <svg className="token-warning-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M12 4L21 20H3L12 4Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
                <path d="M12 9V13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                <circle cx="12" cy="16.5" r="1" fill="currentColor" />
              </svg>
              <span>{copy.lowTokens}</span>
            </div>
          ) : null}
        </div>
      </aside>

      {/* ── Main content ──────────────────────────────────────────────────── */}
      <main className="hub-main">

        {/* Page header */}
        <div className="hub-page-header">
          <div className="hub-header-row">
            <div>
              <h1 className="hub-title">{copy.title}</h1>
              <p className="hub-subtitle">{copy.subtitle}</p>
            </div>

            <div className="hub-language-switcher-card">
              <div className="hub-language-switcher-copy">
                <span className="hub-language-pair-summary">
                  {copy.languageSummary((DISPLAY_LANGUAGE_OPTIONS.find((option) => option.code === displayLanguage) || DISPLAY_LANGUAGE_OPTIONS[0]).shortLabel, learningLanguageLabel)}
                </span>
              </div>

              <div className="hub-language-switcher-controls">
                <div className="hub-language-control-block">
                  <span className="hub-language-control-label">{copy.displayLanguage}</span>
                  <div className="hub-language-segmented-control" role="tablist" aria-label={copy.displayLanguage}>
                    {DISPLAY_LANGUAGE_OPTIONS.map((option) => (
                      <button
                        key={option.code}
                        type="button"
                        className={`hub-language-segment-button ${displayLanguage === option.code ? 'hub-language-segment-button-active' : ''} ${option.supported ? '' : 'hub-language-segment-button-coming-soon'}`}
                        onClick={() => handleDisplayLanguageChange(option.code)}
                      >
                        {option.shortLabel}
                      </button>
                    ))}
                  </div>
                  {languageAvailabilityMessage ? (
                    <span className="hub-language-help-text">{languageAvailabilityMessage}</span>
                  ) : null}
                </div>

                <div className="hub-language-control-block">
                  <span className="hub-language-control-label">{copy.learningLanguage}</span>
                  <button
                    type="button"
                    className="hub-language-static-pill hub-language-static-pill-button"
                    onClick={() => navigate('/settings')}
                  >
                    {learningLanguageLabel}
                  </button>
                </div>
              </div>
            </div>
          </div>
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
              <span className="strip-label-main">{copy.notReadyYet}</span>
              <span className="strip-label-sub">{copy.warmupSubtitle}</span>
            </div>
          </div>
          <Link to="/practice" className="strip-cta">
            {copy.startWarmup}
          </Link>
        </div>

        {/* Missions section */}
        <div className="missions-section">
          <p className="section-label">{copy.missions}</p>

          {/* Scenario cards grid */}
          <div className="scenarios-grid">
            {visibleScenarios.map((scenario, i) => (
              <div
                key={scenario.id}
                className="hub-scenario-card"
                style={{ animationDelay: `${i * 60}ms` }}
                onClick={() => handleScenarioClick(scenario)}
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
                  <h3 className="card-title">{getScenarioDisplayTitle(scenario)}</h3>
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
                <h3 className="card-title">{SCENARIO_DISPLAY_TITLES[displayLanguage]?.generateCard || copy.generateScenario}</h3>
                <div className="card-meta-row">
                  <div className="card-duration">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.5-13H11v6l5.2 3.2.8-1.3-4.5-2.7V7z"/>
                    </svg>
                    <span>{copy.flexible}</span>
                  </div>
                  <span className="card-xp-chip card-xp-variable">{copy.variableXp}</span>
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
            {copy.dailyQuest} <strong>+20 XP</strong>
          </span>
        </div>

        {/* View All */}
        <div className="view-all-section">
          <button className="view-all-btn" onClick={() => {}}>
            {copy.viewAllMissions}
          </button>
        </div>

      </main>

      {/* Coming Soon popup - removed, now navigates to AI Mode */}

      {showTokenPopup ? (
        <div className="token-alert-overlay" onClick={() => setShowTokenPopup(false)}>
          <div className="token-alert-modal" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true" aria-label="Low token warning">
            <div className="token-alert-title-row">
              <svg className="token-alert-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M12 4L21 20H3L12 4Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
                <path d="M12 9V13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                <circle cx="12" cy="16.5" r="1" fill="currentColor" />
              </svg>
              <h3 className="token-alert-title">{copy.tokenLimitTitle}</h3>
            </div>
            <p className="token-alert-text">
              {copy.tokenLimitText(tokensRemaining, tokenLimit)}
            </p>
            <div className="token-alert-actions">
              <button className="token-alert-btn token-alert-btn-secondary" onClick={() => setShowTokenPopup(false)}>
                {copy.later}
              </button>
              <button className="token-alert-btn token-alert-btn-primary" onClick={() => navigate('/plans')}>
                {copy.viewPlans}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default ScenarioHub;
