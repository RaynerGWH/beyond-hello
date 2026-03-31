import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { trackEvent } from '../utils/analytics';
import './SubscriptionPlans.css';

const PLANS = [
  {
    id: 'free',
    name: 'Free',
    userType: 'Free Users',
    monthly: { price: '$0', period: '/mo' },
    yearly:  { price: '$0', period: '/mo' },
    yearlyNote: null,
    features: [
      'Pre-generated scenarios (last patch)',
      '3 custom scenarios / month',
      '480p compressed video',
      'Pass/Fail pronunciation scoring',
    ],
    cta: 'Get Started',
  },
  {
    id: 'pro',
    name: 'Pro',
    userType: 'Core Users',
    monthly: { price: '$15', period: '/mo' },
    yearly:  { price: '$12', period: '/mo' },
    yearlyNote: 'Save $36 / yr',
    features: [
      'Latest pre-generated scenarios',
      '20 custom scenarios / month',
      '720p / 1080p video',
      'Scoring & feedback',
      'Credit top-ups enabled',
    ],
    cta: 'Get Pro',
    recommended: true,
  },
  {
    id: 'max',
    name: 'Max',
    userType: 'Power Users',
    monthly: { price: '$40', period: '/mo' },
    yearly:  { price: '$32', period: '/mo' },
    yearlyNote: 'Save $96 / yr',
    features: [
      'Latest pre-generated scenarios',
      '100 custom scenarios / month',
      '1080p priority rendering',
      'Scoring & feedback',
      'Credit top-ups enabled',
    ],
    cta: 'Get Max',
  },
  {
    id: 'credits',
    name: 'Credits',
    userType: 'Heavy Usage',
    monthly: { price: 'Usage', period: '' },
    yearly:  { price: 'Usage', period: '' },
    yearlyNote: null,
    features: [
      '1 credit = 1 scenario',
      'Includes video + STT + scoring',
      'Pay per usage',
      'No subscription required',
    ],
    cta: 'Buy Credits',
  },
];

function SubscriptionPlans() {
  const navigate = useNavigate();
  const [billing, setBilling] = useState('yearly');

  const handlePlanClick = (planId) => {
    trackEvent('plan_selected', { plan: planId, billing });
  };

  return (
    <div className="plans-page">
      <button className="plans-back-btn" onClick={() => navigate(-1)}>
        <svg className="plans-back-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M15 6L9 12L15 18" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <span>Back</span>
      </button>

      <h1 className="plans-title">Pricing</h1>

      <div className="plans-toggle" role="group" aria-label="Billing period">
        <button
          className={`plans-toggle-btn ${billing === 'monthly' ? 'plans-toggle-active' : ''}`}
          onClick={() => setBilling('monthly')}
        >
          Monthly
        </button>
        <button
          className={`plans-toggle-btn plans-toggle-btn-yearly ${billing === 'yearly' ? 'plans-toggle-active plans-toggle-active-yearly' : ''}`}
          onClick={() => setBilling('yearly')}
        >
          Yearly
          <span className="plans-toggle-save-chip">20% off</span>
        </button>
      </div>

      {billing === 'yearly' && (
        <p className="plans-yearly-banner">
          🎉 You're on annual billing — 2 months free vs monthly
        </p>
      )}

      <section className="plans-grid" aria-label="Subscription tiers">
        {PLANS.map((plan) => {
          const { price, period } = billing === 'yearly' ? plan.yearly : plan.monthly;
          const monthlyPrice = plan.monthly.price;
          const showStrike = billing === 'yearly' && plan.yearlyNote;
          return (
            <article
              key={plan.id}
              className={`plan-card ${plan.recommended ? 'plan-card-recommended' : ''}`}
            >
              <div className="plan-card-top">
                <div className="plan-name-row">
                  <span className="plan-name">{plan.name}</span>
                  {plan.recommended && (
                    <span className="plan-recommended-badge">Recommended</span>
                  )}
                </div>
                <div className="plan-price-row">
                  {showStrike && (
                    <span className="plan-price-strike">{monthlyPrice}</span>
                  )}
                  <span className="plan-price">{price}</span>
                  {period && <span className="plan-period">{period}</span>}
                </div>
                {showStrike && (
                  <span className="plan-savings-chip">{plan.yearlyNote}</span>
                )}
                <span className="plan-user-type">{plan.userType}</span>
              </div>

              <ul className="plan-features">
                {plan.features.map((feature) => (
                  <li key={feature} className="plan-feature-item">
                    <span className="plan-check" aria-hidden="true">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>

              <button
                className={`plan-cta ${plan.recommended ? 'plan-cta-recommended' : ''}`}
                onClick={() => handlePlanClick(plan.id)}
              >
                {plan.cta}
              </button>
            </article>
          );
        })}
      </section>
    </div>
  );
}

export default SubscriptionPlans;
