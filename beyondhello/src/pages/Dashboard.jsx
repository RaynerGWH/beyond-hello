// src/pages/Dashboard.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { storage, seedDemoDataIfEmpty } from '../utils/storage';
import { scenariosData } from '../data/scenarios';
import './Dashboard.css';

// XP cap to reach the NEXT level (indexed by currentLevel - 1)
const LEVEL_XP_CAPS = [100, 200, 400, 700, 1000, 1500];

function Dashboard() {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(null);
  const [user, setUser] = useState(null);
  const [showTokenPopup, setShowTokenPopup] = useState(false);

  useEffect(() => {
    seedDemoDataIfEmpty();
    const currentProgress = storage.getProgress();
    const normalizedProgress = {
      ...currentProgress,
      lowTokenPopupShown: currentProgress.lowTokenPopupShown ?? false
    };
    setProgress(normalizedProgress);
    setUser(storage.getUser());

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

  if (!progress) return null;

  // ── Derived values ────────────────────────────────────────────────────────
  const userName = user?.name || '';
  const currentLevel = progress.currentLevel ?? 1;
  const currentXP = progress.totalXP ?? 0;
  const streak = progress.streak ?? 0;
  const xpForNextLevel = LEVEL_XP_CAPS[currentLevel - 1] ?? 1500;
  const tokenLimit = Math.max(progress.tokenLimit ?? 20, 1);
  const tokensRemaining = Math.min(Math.max(progress.tokensRemaining ?? 6, 0), tokenLimit);
  const tokenPercent = Math.round((tokensRemaining / tokenLimit) * 100);
  const isLowTokens = tokensRemaining <= 10;

  // Cross-reference completed scenario IDs with static scenario data
  const completedScenarios = (progress.completedScenarios ?? [])
    .map(id => scenariosData.find(s => s.id === id))
    .filter(Boolean);

  // Accuracy history: { date, score } → { day label, value }
  const accuracyData = (progress.accuracyHistory ?? []).map(h => ({
    day: new Date(h.date).toLocaleDateString('en-US', { weekday: 'narrow' }),
    value: h.score
  }));

  const averageAccuracy = accuracyData.length > 0
    ? Math.round(accuracyData.reduce((sum, p) => sum + p.value, 0) / accuracyData.length)
    : 0;

  // Data-driven polyline points
  const chartPoints = accuracyData.map((point, index) => {
    const x = 50 + index * 60;
    const y = 200 - (point.value * 2);
    return `${x},${y}`;
  }).join(' ');

  // Sidebar initials from name
  const initials = userName
    ? userName.split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase()
    : 'BH';

  return (
    <div className="dashboard-shell">

      {/* ── Sidebar ─────────────────────────────────────────────────────── */}
      <aside className="hub-sidebar">
        <div className="sidebar-logo">
          <span className="logo-beyond">Beyond</span>
          <span className="logo-hello">Hello</span>
        </div>

        <nav className="sidebar-nav">
          <div className="nav-item" onClick={() => navigate('/hub')}>
            <svg className="nav-icon" viewBox="0 0 24 24" fill="currentColor">
              <path d="M3 3h8v8H3zm10 0h8v8h-8zM3 13h8v8H3zm10 0h8v8h-8z"/>
            </svg>
            <span>Scenarios</span>
          </div>

          <div className="nav-item nav-item-active">
            <svg className="nav-icon" viewBox="0 0 24 24" fill="currentColor">
              <path d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z"/>
            </svg>
            <span>Dashboard</span>
          </div>

          <div className="nav-item" onClick={() => navigate('/plans')}>
            <svg className="nav-icon" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z"/>
            </svg>
            <span>Plans</span>
          </div>

          <div className="nav-divider" />

          <div className="nav-item" onClick={() => navigate('/settings')}>
            <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="3"/>
              <path d="M12 1v6m0 6v6M4.22 4.22l4.24 4.24m5.08 5.08l4.24 4.24M1 12h6m6 0h6M4.22 19.78l4.24-4.24m5.08-5.08l4.24-4.24"/>
            </svg>
            <span>Settings</span>
          </div>

          <div className="nav-item" onClick={() => navigate('/support')}>
            <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"/>
              <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3m.08 4h.01"/>
            </svg>
            <span>Support</span>
          </div>

          <div className="nav-divider" />

          <div className="nav-item nav-item-green" onClick={() => navigate('/practice')}>
            <svg className="nav-icon" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 3a9 9 0 0 1 9 9c0 4.97-4.03 9-9 9S3 16.97 3 12a9 9 0 0 1 9-9zm0 16c3.86 0 7-3.14 7-7s-3.14-7-7-7-7 3.14-7 7 3.14 7 7 7zm1-11h-2v5h2V8zm0 6h-2v2h2v-2z"/>
            </svg>
            <span>Phrase Warm-Up</span>
          </div>
        </nav>

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
            <span className="user-pill-name">{userName || 'Learner'}</span>
            <span className="user-pill-xp">{currentXP} XP</span>
          </div>
        </div>

        <div className="sidebar-token-widget" aria-label="Token usage">
          <div className="token-top-row">
            <span className="token-label">Tokens</span>
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
              <span>Low tokens - top up in plans</span>
            </div>
          ) : null}
        </div>
      </aside>

      {/* ── Main content ─────────────────────────────────────────────────── */}
      <main className="dashboard-main">

        <div className="dashboard-header-section">
          <h1 className="dashboard-title">
            {userName ? `Welcome back, ${userName}!` : 'Welcome back!'}
          </h1>
          <p className="dashboard-subtitle">Here's a summary of your language learning progress.</p>
        </div>

        {/* Top row */}
        <div className="dashboard-top-row">

          {/* Completed Scenarios */}
          <div className="dashboard-card scenarios-card">
            <h2 className="card-title">Completed Scenarios</h2>
            {completedScenarios.length > 0 ? (
              <>
                <div className="scenarios-list">
                  {completedScenarios.map((scenario) => (
                    <div key={scenario.id} className="completed-scenario-item">
                      <div className="scenario-icon">
                        {scenario.thumbnail
                          ? <img src={scenario.thumbnail} alt={scenario.title} className="scenario-thumb-img" />
                          : '📋'
                        }
                      </div>
                      <div className="scenario-info">
                        <div className="scenario-name">{scenario.title}</div>
                        <div className="scenario-xp">+{scenario.xpReward} XP</div>
                      </div>
                      <div className="completion-badge">✓</div>
                    </div>
                  ))}
                </div>
                <button className="view-all-btn" onClick={() => navigate('/hub')}>View All</button>
              </>
            ) : (
              <div className="empty-state">
                <p className="empty-state-text">No scenarios completed yet.</p>
                <button className="empty-state-cta" onClick={() => navigate('/hub')}>
                  Start your first scenario →
                </button>
              </div>
            )}
          </div>

          {/* Speaking Accuracy */}
          <div className="dashboard-card accuracy-card">
            <h2 className="card-title">Speaking Accuracy</h2>
            {accuracyData.length > 0 ? (
              <div className="accuracy-chart">
                <div className="chart-area">
                  <svg viewBox="0 0 400 200" className="line-chart">
                    <line x1="0" y1="50" x2="400" y2="50" stroke="#E5E7EB" strokeWidth="1" />
                    <line x1="0" y1="100" x2="400" y2="100" stroke="#E5E7EB" strokeWidth="1" />
                    <line x1="0" y1="150" x2="400" y2="150" stroke="#E5E7EB" strokeWidth="1" />
                    <polyline
                      fill="none"
                      stroke="#3B82F6"
                      strokeWidth="3"
                      points={chartPoints}
                    />
                    {accuracyData.map((point, index) => {
                      const x = 50 + index * 60;
                      const y = 200 - (point.value * 2);
                      return <circle key={index} cx={x} cy={y} r="5" fill="#3B82F6" />;
                    })}
                  </svg>
                </div>
                <div className="chart-labels">
                  {accuracyData.map((point, index) => (
                    <span key={index} className="day-label">{point.day}</span>
                  ))}
                </div>
                <div className="average-accuracy">Average Accuracy: {averageAccuracy}%</div>
              </div>
            ) : (
              <div className="empty-state">
                <p className="empty-state-text">Complete a scenario to start tracking your accuracy.</p>
              </div>
            )}
          </div>
        </div>

        {/* Bottom row */}
        <div className="dashboard-bottom-row">

          {/* Streak */}
          <div className="dashboard-card streak-card">
            <div className="streak-icon">🔥</div>
            <div className="streak-info">
              {streak > 0 ? (
                <>
                  <div className="streak-title">{streak}-Day Streak</div>
                  <div className="streak-subtitle">Keep it up!</div>
                </>
              ) : (
                <>
                  <div className="streak-title">No streak yet</div>
                  <div className="streak-subtitle">Complete a scenario today to start!</div>
                </>
              )}
            </div>
          </div>

          {/* Level */}
          <div className="dashboard-card level-card">
            <div className="level-icon">⭐</div>
            <div className="level-info">
              <div className="level-title">Level {currentLevel}</div>
              <div className="level-progress-bar">
                <div
                  className="level-progress-fill"
                  style={{ width: `${Math.min((currentXP / xpForNextLevel) * 100, 100)}%` }}
                />
              </div>
              <div className="level-xp">{currentXP} / {xpForNextLevel} XP</div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="dashboard-actions">
          <button className="continue-learning-btn" onClick={() => navigate('/hub')}>
            Continue Learning
          </button>
        </div>

      </main>

      {showTokenPopup ? (
        <div className="token-alert-overlay" onClick={() => setShowTokenPopup(false)}>
          <div className="token-alert-modal" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true" aria-label="Low token warning">
            <div className="token-alert-title-row">
              <svg className="token-alert-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M12 4L21 20H3L12 4Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
                <path d="M12 9V13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                <circle cx="12" cy="16.5" r="1" fill="currentColor" />
              </svg>
              <h3 className="token-alert-title">Token Limit Reached</h3>
            </div>
            <p className="token-alert-text">
              You are at {tokensRemaining}/{tokenLimit} tokens. Upgrade your plan to unlock more usage.
            </p>
            <div className="token-alert-actions">
              <button className="token-alert-btn token-alert-btn-secondary" onClick={() => setShowTokenPopup(false)}>
                Later
              </button>
              <button className="token-alert-btn token-alert-btn-primary" onClick={() => navigate('/plans')}>
                View Plans
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default Dashboard;
