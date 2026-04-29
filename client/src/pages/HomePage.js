import React from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="home">
      <section className="hero">
        <div className="hero-inner">
          <div className="hero-text">
            <h1>Compare Car Insurance Quotes</h1>
            <p>Find the best deal from 30+ UK insurers in minutes. Save money on your car insurance today.</p>
            <button className="btn-primary hero-btn" onClick={() => navigate('/results')}>
              Get Your Free Quotes
            </button>
          </div>
          <div className="hero-img">
            <img src="/images/hero-car.png" alt="Car insurance" onError={e => { e.target.style.display='none'; }} />
          </div>
        </div>
      </section>

      <section className="features">
        <div className="features-inner">
          <div className="feature-card">
            <div className="feature-icon">🛡️</div>
            <h3>Comprehensive Cover</h3>
            <p>Compare fully comprehensive, third party fire &amp; theft, and third party only policies.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">💰</div>
            <h3>Save Money</h3>
            <p>Our customers save an average of £200 when switching car insurance with us.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">⚡</div>
            <h3>Instant Results</h3>
            <p>Get 30+ quotes in under 5 minutes. No phone calls needed.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🎁</div>
            <h3>Free £250 Excess Reward</h3>
            <p>Buy through us and we'll refund up to £250 of your excess once your claim is settled.</p>
          </div>
        </div>
      </section>

      <section className="reward-banner">
        <div className="reward-inner">
          <div className="reward-mascot">
            <img src="/images/mascot.png" alt="" onError={e => e.target.style.display='none'} />
          </div>
          <div className="reward-text">
            <h2>Free £250 excess refund reward</h2>
            <p>Buy your car insurance with us and we'll refund* up to £250 of your excess once your claim is settled. *Excludes breakdown and glass repair or replacement.</p>
          </div>
          <button className="btn-primary" onClick={() => navigate('/results')}>Compare Now</button>
        </div>
      </section>
    </div>
  );
}
