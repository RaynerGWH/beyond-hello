import React from 'react';
import { useNavigate } from 'react-router-dom';
import './SubscriptionPlans.css';

const plans = [
  {
    id: 'free',
    name: 'Free',
    price: '$0',
    period: '/month',
    subtitle: 'Start speaking daily with zero commitment.',
    features: [
      '5 to 10 mins daily practice',
      'Core pre-built scenarios',
      '20 AI tokens each day',
      'Basic progress insights'
    ],
    cta: 'Start Free'
  },
  {
    id: 'pro',
    name: 'Pro',
    price: '$9.99',
    period: '/month',
    subtitle: 'Best value for consistent learners.',
    features: [
      'Unlimited pre-built scenarios',
      'Create basic custom AI scenarios',
      '500 tokens per month',
      'Fluency + basic pronunciation feedback',
      'Streaks, rewards, and smart tracking'
    ],
    cta: 'Go Pro',
    highlighted: true,
    badge: 'Most Popular'
  },
  {
    id: 'premium',
    name: 'Premium',
    price: '$19.99',
    period: '/month',
    subtitle: 'Full simulation mode for serious growth.',
    features: [
      'Unlimited pre-built scenarios',
      'Advanced AI simulations (interviews, meetings, real life)',
      '2000 tokens per month',
      'Detailed pronunciation + conversation coaching',
      'Adaptive learning with replayable sessions'
    ],
    cta: 'Unlock Premium'
  }
];

function SubscriptionPlans() {
  const navigate = useNavigate();

  return (
    <div className="plans-page">
      <header className="plans-header">
        <button className="plans-back-btn" onClick={() => navigate(-1)}>
          <svg className="plans-back-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M15 6L9 12L15 18" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span>Back</span>
        </button>
        <h1 className="plans-title">Pick your speaking plan</h1>
        <p className="plans-subtitle">
          Choose your pace. Upgrade anytime as your confidence grows.
        </p>
      </header>

      <section className="plans-grid" aria-label="Subscription tiers">
        {plans.map((plan) => (
          <article
            key={plan.id}
            className={`plan-card ${plan.highlighted ? 'plan-card-highlighted' : ''}`}
          >
            {plan.badge ? <span className="plan-badge">{plan.badge}</span> : null}
            <h2 className="plan-name">{plan.name}</h2>
            <p className="plan-subtitle">{plan.subtitle}</p>
            <div className="plan-price-row">
              <span className="plan-price">{plan.price}</span>
              <span className="plan-period">{plan.period}</span>
            </div>

            <ul className="plan-features">
              {plan.features.map((feature) => (
                <li key={feature} className="plan-feature-item">
                  {feature}
                </li>
              ))}
            </ul>

            <button className={`plan-cta ${plan.highlighted ? 'plan-cta-highlighted' : ''}`}>
              {plan.cta}
            </button>
          </article>
        ))}
      </section>
    </div>
  );
}

export default SubscriptionPlans;
