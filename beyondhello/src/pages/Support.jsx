// src/pages/Support.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { HelpCircle, MessageSquare, Mail, Send } from 'lucide-react';
import { storage } from '../utils/storage';
import './Support.css';

function Support() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [progress, setProgress] = useState(null);
  const [bugCategory, setBugCategory] = useState('ui-bug');
  const [bugDescription, setBugDescription] = useState('');
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  useEffect(() => {
    setUser(storage.getUser());
    setProgress(storage.getProgress());
  }, []);

  const handleSubmitBug = (e) => {
    e.preventDefault();

    // Show success toast
    setShowSuccessToast(true);

    // Clear form
    setBugCategory('ui-bug');
    setBugDescription('');

    // Hide toast after 3 seconds
    setTimeout(() => {
      setShowSuccessToast(false);
    }, 3000);
  };

  // FAQ data
  const faqs = [
    {
      question: 'How does the pronunciation scoring work?',
      answer: 'Our AI-powered system analyzes your pronunciation, tone, and fluency to provide accurate feedback. The score is based on how closely your speech matches native speaker patterns. Higher scores indicate better pronunciation accuracy.'
    },
    {
      question: 'What do the difficulty levels mean?',
      answer: 'Easy scenarios are perfect for beginners with simple vocabulary and common phrases. Medium scenarios introduce more complex situations and intermediate grammar. Hard scenarios simulate professional contexts with advanced vocabulary and cultural nuances.'
    },
    {
      question: 'Which languages are currently supported?',
      answer: 'BeyondHello currently supports Chinese (Mandarin), Japanese, and Korean. We\'re actively working on adding more languages including Spanish, French, and German in future updates.'
    },
    {
      question: 'I\'m having trouble with my account. What should I do?',
      answer: 'If you\'re experiencing account issues, try clearing your browser cache first. If the problem persists, use the "Report a Bug" form below or contact us directly at support@beyondhello.app with details about the issue.'
    },
    {
      question: 'What does XP do and how do I level up?',
      answer: 'XP (Experience Points) track your learning progress. You earn XP by completing scenarios, with bonus points for high accuracy and daily streaks. As you accumulate XP, you level up, unlocking new content and achievements. Higher levels demonstrate your dedication and skill improvement.'
    }
  ];

  // Derive sidebar initials from name
  const initials = user?.name
    ? user.name.split(' ').map((w) => w[0]).slice(0, 2).join('').toUpperCase()
    : 'BH';

  const tokenLimit = Math.max(progress?.tokenLimit ?? 20, 1);
  const tokensRemaining = Math.min(Math.max(progress?.tokensRemaining ?? 6, 0), tokenLimit);
  const tokenPercent = Math.round((tokensRemaining / tokenLimit) * 100);
  const isLowTokens = tokensRemaining <= 10;

  return (
    <div className="support-shell">

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

          <div className="nav-item" onClick={() => navigate('/settings')}>
            <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="3"/>
              <path d="M12 1v6m0 6v6M4.22 4.22l4.24 4.24m5.08 5.08l4.24 4.24M1 12h6m6 0h6M4.22 19.78l4.24-4.24m5.08-5.08l4.24-4.24"/>
            </svg>
            <span>Settings</span>
          </div>

          <div className="nav-item nav-item-active">
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
      <main className="support-main">
        <div className="support-header">
          <HelpCircle className="support-header-icon" />
          <div>
            <h1 className="support-title">Support</h1>
            <p className="support-subtitle">Get help and report issues.</p>
          </div>
        </div>

        {/* FAQ Section */}
        <section className="support-section">
          <div className="section-header">
            <HelpCircle className="section-icon" />
            <h2 className="section-title">Frequently Asked Questions</h2>
          </div>
          <div className="faq-list">
            {faqs.map((faq, index) => (
              <div key={index} className="faq-item">
                <h3 className="faq-question">{faq.question}</h3>
                <p className="faq-answer">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Report a Bug Section */}
        <section className="support-section">
          <div className="section-header">
            <MessageSquare className="section-icon" />
            <h2 className="section-title">Report a Bug</h2>
          </div>
          <div className="support-card">
            <form onSubmit={handleSubmitBug}>
              <div className="form-group">
                <label className="form-label">Category</label>
                <select
                  className="form-select"
                  value={bugCategory}
                  onChange={(e) => setBugCategory(e.target.value)}
                  required
                >
                  <option value="ui-bug">UI Bug</option>
                  <option value="audio-issue">Audio Issue</option>
                  <option value="scenario-error">Scenario Error</option>
                  <option value="pronunciation-feedback">Pronunciation Feedback</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Description</label>
                <textarea
                  className="form-textarea"
                  rows="5"
                  placeholder="Describe the issue you're experiencing..."
                  value={bugDescription}
                  onChange={(e) => setBugDescription(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="submit-button">
                <Send className="button-icon" />
                Submit
              </button>
            </form>
          </div>
        </section>

        {/* Contact Us Section */}
        <section className="support-section">
          <div className="section-header">
            <Mail className="section-icon" />
            <h2 className="section-title">Contact Us</h2>
          </div>
          <div className="support-card contact-card">
            <p className="contact-text">
              For urgent matters or detailed inquiries, reach out to our support team:
            </p>
            <a href="mailto:support@beyondhello.app" className="contact-email">
              support@beyondhello.app
            </a>
            <p className="contact-note">
              We typically respond within 2 business days.
            </p>
          </div>
        </section>
      </main>

      {/* Success Toast */}
      {showSuccessToast && (
        <div className="success-toast">
          <div className="toast-content">
            <svg className="toast-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
              <polyline points="22 4 12 14.01 9 11.01"/>
            </svg>
            <span>Thanks! We'll look into it shortly.</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default Support;
