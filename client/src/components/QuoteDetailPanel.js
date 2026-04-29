import React, { useEffect } from 'react';
import './QuoteDetailPanel.css';

function Stars({ count, total = 5 }) {
  return (
    <div className="stars">
      {Array.from({ length: total }).map((_, i) => (
        <span key={i} className={`star ${i < count ? 'filled' : ''}`}>★</span>
      ))}
    </div>
  );
}

function CoverItem({ label, included }) {
  return (
    <div className={`cover-item ${included ? 'cover-yes' : 'cover-no'}`}>
      {included ? (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M20 6L9 17l-5-5"/></svg>
      ) : (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
      )}
      <span>{label}</span>
      <svg className="expand-arrow" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6"/></svg>
    </div>
  );
}

function AddonItem({ label }) {
  return (
    <div className="cover-item cover-addon">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
      <span>{label}</span>
      <svg className="expand-arrow" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6"/></svg>
    </div>
  );
}

export default function QuoteDetailPanel({ quote, onClose }) {
  // Close on Escape
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [onClose]);

  // Prevent body scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  return (
    <>
      <div className="panel-backdrop" onClick={onClose} />
      <aside className="detail-panel">
        {/* Header */}
        <div className="panel-header">
          <div className="panel-header-insurer">
            <img src={quote.logo} alt={quote.insurer} onError={e => { e.target.style.display='none'; e.target.nextSibling.style.display='flex'; }} />
            <div className="logo-fallback-sm" style={{display:'none'}}>{quote.insurer}</div>
            <div className="tier-badge">{quote.tier}</div>
          </div>
          <button className="panel-close" onClick={onClose}>✕</button>
        </div>

        <div className="panel-body">
          {/* Total price */}
          <div className="panel-price-section">
            <Stars count={quote.rating} />
            <div className="panel-defaqto">from defaqto</div>

            <h2 className="panel-price-title">Total annual price</h2>
            <div className="panel-price">
              <span className="panel-price-sym">£</span>
              <span className="panel-price-int">{Math.floor(quote.annualPrice).toLocaleString()}</span>
              <span className="panel-price-dec">.{(quote.annualPrice % 1).toFixed(2).slice(2)}</span>
            </div>
            <p className="panel-price-note">Insurance quotes are priced in real time, tomorrow's prices might look different</p>
          </div>

          {/* Excess breakdown */}
          <div className="panel-section panel-excess">
            <div className="excess-row">
              <span>Total excess on this policy</span>
              <strong>£{quote.totalExcess}</strong>
            </div>
            <div className="excess-row sub">
              <span>Voluntary</span>
              <span>£{quote.voluntaryExcess}</span>
            </div>
            <div className="excess-row sub">
              <span>Compulsory</span>
              <span>£{quote.compulsoryExcess}</span>
            </div>
            <div className="excess-note">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg>
              Insurers may add an additional excess for young or inexperienced drivers.
            </div>
          </div>

          {/* Reward banner */}
          <div className="panel-reward">
            <div className="reward-mascot-sm">
              <img src="/images/mascot.png" alt="" onError={e => e.target.style.display='none'} />
            </div>
            <div className="reward-content">
              <h4>Free £250 excess refund reward</h4>
              <p>Look out for an email from us letting you know how to claim your cover.</p>
            </div>
          </div>
          <div className="panel-docs">
            <a href="#!">Insurance information document</a>
            <a href="#!">Demands &amp; needs</a>
          </div>

          {/* Overview */}
          <div className="panel-section">
            <h3 className="panel-section-title">Overview</h3>
            <div className="overview-grid">
              <div className="overview-row"><span>Proposer name</span><strong>Steven Michael Taylor</strong></div>
              <div className="overview-row"><span>Additional driver(s)</span><strong>None</strong></div>
              <div className="overview-row"><span>Start date</span><strong>1st May 2026</strong></div>
              <div className="overview-row"><span>Cover type</span><strong>Comprehensive</strong></div>
              <div className="overview-row"><span>No claims bonus protected</span><strong>No</strong></div>
            </div>
          </div>

          {/* Cover with this policy */}
          <div className="panel-section">
            <h3 className="panel-section-title">Cover with this policy</h3>

            <div className="cover-group-label">Covered</div>
            {quote.covered.map(item => (
              <CoverItem key={item} label={item} included={true} />
            ))}

            {quote.addons.length > 0 && (
              <>
                <div className="cover-group-label" style={{marginTop:12}}>Add-ons</div>
                {quote.addons.map(item => (
                  <AddonItem key={item} label={item} />
                ))}
              </>
            )}

            {quote.notCovered.length > 0 && (
              <>
                <div className="cover-group-label not-covered" style={{marginTop:12}}>Not covered</div>
                {quote.notCovered.map(item => (
                  <CoverItem key={item} label={item} included={false} />
                ))}
              </>
            )}
          </div>

          {/* Fees section placeholder */}
          <div className="panel-section">
            <h3 className="panel-section-title">Fees, excesses and your info</h3>
            <div className="fees-grid">
              {['Fees', 'Claims', 'Excesses', 'Demands & needs'].map(item => (
                <div key={item} className="fees-item">{item}</div>
              ))}
            </div>
          </div>
        </div>

        {/* Go to insurer CTA */}
        <div className="panel-footer">
          <a href="#!" className="go-to-insurer-btn" onClick={e => e.preventDefault()}>
            Go to insurer's site
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </a>
        </div>
      </aside>
    </>
  );
}
