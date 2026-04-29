import React, { useState, useEffect } from 'react';
import axios from 'axios';
import QuoteCard from '../components/QuoteCard';
import QuoteDetailPanel from '../components/QuoteDetailPanel';
import CoverSidebar from '../components/CoverSidebar';
import './ResultsPage.css';

const ADDONS = ['Legal assistance', 'Breakdown cover', 'Personal accident', 'Courtesy car', 'Windscreen cover'];

export default function ResultsPage() {
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedQuote, setSelectedQuote] = useState(null);
  const [coverType, setCoverType] = useState('Comprehensive');
  const [voluntaryExcess, setVoluntaryExcess] = useState('£100');
  const [protectNoClaims, setProtectNoClaims] = useState('No');
  const [payment, setPayment] = useState('Annually');
  const [coverStartDate, setCoverStartDate] = useState('1 May 2026');
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);
  const [addons, setAddons] = useState({
    'Legal assistance': false,
    'Breakdown cover': false,
    'Personal accident': false,
    'Courtesy car': false,
    'Windscreen cover': false,
  });
  const [addonsDialogAddon, setAddonsDialogAddon] = useState(null);

  useEffect(() => {
    axios.get('/api/quotes')
      .then(r => { setQuotes(r.data.quotes); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const toggleAddon = (name) => setAddons(prev => ({ ...prev, [name]: !prev[name] }));

  return (
    <div className="results-page">
      {/* ===== MOBILE SIDEBAR TOGGLE ===== */}
      <div className="mobile-topbar hide-desktop">
        <button className="mobile-edit-btn" onClick={() => setShowMobileSidebar(true)}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 20h9M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
          Edit quote
        </button>
        <button className="mobile-cover-btn">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/></svg>
          Cover options 0/5
        </button>
      </div>

      <div className="results-layout">
        {/* ===== LEFT SIDEBAR ===== */}
        <aside className={`sidebar hide-mobile ${showMobileSidebar ? 'sidebar-mobile-open' : ''}`}>
          {showMobileSidebar && (
            <button className="sidebar-close hide-desktop" onClick={() => setShowMobileSidebar(false)}>✕ Close</button>
          )}
          <CoverSidebar
            coverStartDate={coverStartDate}
            setCoverStartDate={setCoverStartDate}
            coverType={coverType}
            setCoverType={setCoverType}
            voluntaryExcess={voluntaryExcess}
            setVoluntaryExcess={setVoluntaryExcess}
            protectNoClaims={protectNoClaims}
            setProtectNoClaims={setProtectNoClaims}
            payment={payment}
            setPayment={setPayment}
            addons={addons}
            toggleAddon={toggleAddon}
            ADDONS={ADDONS}
          />
        </aside>

        {/* Mobile sidebar overlay */}
        {showMobileSidebar && (
          <div className="sidebar-overlay hide-desktop" onClick={() => setShowMobileSidebar(false)} />
        )}

        {/* ===== MAIN RESULTS ===== */}
        <main className="results-main">
          {/* Telematics banner */}
          <div className="telematics-banner">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/></svg>
            <span>Cheapest quote for policies that track your driving: <strong>Annual Price £1822.86</strong></span>
            <label className="toggle-label">
              <input type="checkbox" /> Include these policies
            </label>
          </div>

          <p className="results-count"><strong>30 quotes shown.</strong></p>

          {loading ? (
            <div className="loading-state">
              <div className="spinner" />
              <p>Finding the best quotes for you...</p>
            </div>
          ) : (
            quotes.map(quote => (
              <QuoteCard
                key={quote.id}
                quote={quote}
                onViewDetails={() => setSelectedQuote(quote)}
              />
            ))
          )}
        </main>
      </div>

      {/* ===== DETAIL PANEL ===== */}
      {selectedQuote && (
        <QuoteDetailPanel
          quote={selectedQuote}
          onClose={() => setSelectedQuote(null)}
        />
      )}

      {/* Mobile sidebar drawer */}
      {showMobileSidebar && (
        <div className="mobile-sidebar-drawer hide-desktop">
          <div className="mobile-sidebar-inner">
            <div className="mobile-sidebar-header">
              <h3>Edit quote</h3>
              <button onClick={() => setShowMobileSidebar(false)}>✕</button>
            </div>
            <CoverSidebar
              coverStartDate={coverStartDate}
              setCoverStartDate={setCoverStartDate}
              coverType={coverType}
              setCoverType={setCoverType}
              voluntaryExcess={voluntaryExcess}
              setVoluntaryExcess={setVoluntaryExcess}
              protectNoClaims={protectNoClaims}
              setProtectNoClaims={setProtectNoClaims}
              payment={payment}
              setPayment={setPayment}
              addons={addons}
              toggleAddon={toggleAddon}
              ADDONS={ADDONS}
              isMobile
              onClose={() => setShowMobileSidebar(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
}
