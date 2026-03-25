import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import posthog from 'posthog-js'
import { Analytics } from '@vercel/analytics/react'

// Initialize PostHog
posthog.init('phc_IMk7yZhQBkNm8l0KJ7vEJoubC9Hec0v2COC6C6S3B35', {
  api_host: 'https://app.posthog.com',
  capture_pageview: true,
  capture_pageleave: true,
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
    <Analytics />
  </React.StrictMode>,
)