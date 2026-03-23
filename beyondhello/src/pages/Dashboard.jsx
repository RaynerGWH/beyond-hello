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

  useEffect(() => {
    seedDemoDataIfEmpty();
    setProgress(storage.getProgress());
    setUser(storage.getUser());
  }, []);

  if (!progress) return null;

  // ── Derived values ────────────────────────────────────────────────────────
  const userName = user?.name || '';
  const currentLevel = progress.currentLevel ?? 1;
  const currentXP = progress.totalXP ?? 0;
  const streak = progress.streak ?? 0;
  const xpForNextLevel = LEVEL_XP_CAPS[currentLevel - 1] ?? 1500;

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

          <div className="nav-divider" />

          <div className="nav-item nav-item-green" onClick={() => navigate('/practice')}>
            <svg className="nav-icon" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 3a9 9 0 0 1 9 9c0 4.97-4.03 9-9 9S3 16.97 3 12a9 9 0 0 1 9-9zm0 16c3.86 0 7-3.14 7-7s-3.14-7-7-7-7 3.14-7 7 3.14 7 7 7zm1-11h-2v5h2V8zm0 6h-2v2h2v-2z"/>
            </svg>
            <span>Phrase Warm-Up</span>
          </div>
        </nav>

        <div className="sidebar-user-pill">
          <div className="user-initials-circle">{initials}</div>
          <div className="user-pill-info">
            <span className="user-pill-name">{userName || 'Learner'}</span>
            <span className="user-pill-xp">{currentXP} XP</span>
          </div>
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
    </div>
  );
}

export default Dashboard;
