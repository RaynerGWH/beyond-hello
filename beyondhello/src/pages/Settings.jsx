// src/pages/Settings.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Settings as SettingsIcon, User, Globe, Trash2 } from 'lucide-react';
import { storage } from '../utils/storage';
import './Settings.css';

function Settings() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [progress, setProgress] = useState(null);
  const [targetLanguage, setTargetLanguage] = useState('chinese');
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    const currentUser = storage.getUser();
    const currentProgress = storage.getProgress();
    setUser(currentUser);
    setProgress(currentProgress);
    setTargetLanguage(currentUser?.targetLanguage || 'chinese');
  }, []);

  const handleLanguageChange = (e) => {
    const newLanguage = e.target.value;
    setTargetLanguage(newLanguage);

    // Update user in localStorage
    const updatedUser = { ...user, targetLanguage: newLanguage };
    storage.setUser(updatedUser);
    setUser(updatedUser);
  };

  const handleDeleteAccount = () => {
    // Clear all localStorage data
    localStorage.clear();

    // Navigate to account deleted page
    navigate('/account-deleted');
  };

  // Derive sidebar initials from name
  const initials = user?.name
    ? user.name.split(' ').map((w) => w[0]).slice(0, 2).join('').toUpperCase()
    : 'BH';

  const tokenLimit = Math.max(progress?.tokenLimit ?? 20, 1);
  const tokensRemaining = Math.min(Math.max(progress?.tokensRemaining ?? 6, 0), tokenLimit);
  const tokenPercent = Math.round((tokensRemaining / tokenLimit) * 100);
  const isLowTokens = tokensRemaining <= 10;

  return (
    <div className="settings-shell">

      {/* ── Sidebar ───────────────────────────────────────────────────────── */}
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

          <div className="nav-item" onClick={() => navigate('/dashboard')}>
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

          <div className="nav-item nav-item-active">
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
        >
          <div className="user-initials-circle">{initials}</div>
          <div className="user-pill-info">
            <span className="user-pill-name">{user?.name || 'Learner'}</span>
            <span className="user-pill-xp">{progress?.totalXP || 0} XP</span>
          </div>
        </div>

        <div className="sidebar-token-widget">
          <div className="token-top-row">
            <span className="token-label">Tokens</span>
            <span className="token-count">{tokensRemaining}/{tokenLimit}</span>
          </div>
          <div className="token-bar">
            <div
              className={`token-bar-fill ${isLowTokens ? 'token-bar-fill-low' : ''}`}
              style={{ width: `${tokenPercent}%` }}
            />
          </div>
          {isLowTokens && (
            <div className="token-warning">
              <svg className="token-warning-icon" viewBox="0 0 24 24" fill="none">
                <path d="M12 4L21 20H3L12 4Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
                <path d="M12 9V13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                <circle cx="12" cy="16.5" r="1" fill="currentColor" />
              </svg>
              <span>Low tokens - top up in plans</span>
            </div>
          )}
        </div>
      </aside>

      {/* ── Main content ──────────────────────────────────────────────────── */}
      <main className="settings-main">
        <div className="settings-header">
          <SettingsIcon className="settings-header-icon" />
          <div>
            <h1 className="settings-title">Settings</h1>
            <p className="settings-subtitle">Manage your account and preferences.</p>
          </div>
        </div>

        {/* Account Section */}
        <section className="settings-section">
          <div className="section-header">
            <User className="section-icon" />
            <h2 className="section-title">Account</h2>
          </div>
          <div className="settings-card">
            <div className="form-group">
              <label className="form-label">Display Name</label>
              <input
                type="text"
                className="form-input"
                value={user?.name || ''}
                readOnly
              />
              <p className="form-hint">Read-only</p>
            </div>
            <div className="form-group">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-input"
                value={user?.email || ''}
                readOnly
              />
              <p className="form-hint">Read-only</p>
            </div>
          </div>
        </section>

        {/* Preferences Section */}
        <section className="settings-section">
          <div className="section-header">
            <Globe className="section-icon" />
            <h2 className="section-title">Preferences</h2>
          </div>
          <div className="settings-card">
            <div className="form-group">
              <label className="form-label">Target Language</label>
              <select
                className="form-select"
                value={targetLanguage}
                onChange={handleLanguageChange}
              >
                <option value="chinese">Chinese (Mandarin)</option>
                <option value="japanese">Japanese</option>
                <option value="korean">Korean</option>
              </select>
              <p className="form-hint">Choose the language you want to learn</p>
            </div>
          </div>
        </section>

        {/* Danger Zone Section */}
        <section className="settings-section">
          <div className="section-header">
            <Trash2 className="section-icon section-icon-danger" />
            <h2 className="section-title section-title-danger">Danger Zone</h2>
          </div>
          <div className="settings-card danger-card">
            <div className="danger-content">
              <div>
                <h3 className="danger-card-title">Delete Account</h3>
                <p className="danger-card-text">
                  Permanently remove your account and all associated data. This action cannot be undone.
                </p>
              </div>
              <button
                className="danger-button"
                onClick={() => setShowDeleteModal(true)}
              >
                Delete Account
              </button>
            </div>
          </div>
        </section>

        {/* Privacy Footnote */}
        <div className="settings-footnote">
          BeyondHello respects your data privacy. You can delete your account and all associated data at any time.
        </div>
      </main>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="modal-overlay" onClick={() => setShowDeleteModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <Trash2 className="modal-icon-danger" />
              <h3 className="modal-title">Are you sure?</h3>
            </div>
            <p className="modal-text">
              This will permanently delete your account and all your progress. This cannot be undone.
            </p>
            <div className="modal-actions">
              <button
                className="modal-button modal-button-secondary"
                onClick={() => setShowDeleteModal(false)}
              >
                Cancel
              </button>
              <button
                className="modal-button modal-button-danger"
                onClick={handleDeleteAccount}
              >
                Delete Account
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Settings;
