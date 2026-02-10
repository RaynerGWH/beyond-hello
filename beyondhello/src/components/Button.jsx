import React from 'react';
import './Button.css';

export default function Button({ 
  children, 
  variant = 'primary', 
  onClick, 
  disabled = false,
  fullWidth = true,
  type = 'button'
}) {
  return (
    <button
      type={type}
      className={`btn btn-${variant} ${fullWidth ? 'btn-full' : ''}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}