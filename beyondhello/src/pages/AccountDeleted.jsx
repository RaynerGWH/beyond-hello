// src/pages/AccountDeleted.jsx
import { useNavigate } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import './AccountDeleted.css';

function AccountDeleted() {
  const navigate = useNavigate();

  return (
    <div className="account-deleted-container">
      <div className="account-deleted-content">
        <CheckCircle className="deleted-icon" />
        <h1 className="deleted-title">Account Deleted</h1>
        <p className="deleted-text">
          Your account and all associated data have been permanently removed.
        </p>
        <button
          className="return-home-button"
          onClick={() => navigate('/')}
        >
          Return to Home
        </button>
      </div>
    </div>
  );
}

export default AccountDeleted;
