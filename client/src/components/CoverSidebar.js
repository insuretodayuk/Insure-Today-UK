import React, { useState } from 'react';
import './CoverSidebar.css';

export default function CoverSidebar({
  coverStartDate, setCoverStartDate,
  coverType, setCoverType,
  voluntaryExcess, setVoluntaryExcess,
  protectNoClaims, setProtectNoClaims,
  payment, setPayment,
  addons, toggleAddon, ADDONS,
  onUpdate,
  isMobile, onClose
}) {
  const [excessOpen, setExcessOpen] = useState(false);
  const excessOptions = ['None', '£100', '£250', '£500'];

  // Track if filters have changed since last update
  const [dirty, setDirty] = useState(false);

  const markDirty = (fn) => (...args) => {
    fn(...args);
    setDirty(true);
  };

  const handleUpdate = () => {
    setDirty(false);
    if (onUpdate) onUpdate();
    if (isMobile && onClose) onClose();
  };

  return (
    <div className="sidebar-wrap">
      {/* ===== COVER SUMMARY ===== */}
      <div className="sidebar-card">
        <div className="sidebar-card-header">
          <h3>Cover summary</h3>
          <button className="info-btn" title="Information">ⓘ</button>
        </div>

        <div className="sidebar-field">
          <label>Cover start date</label>
          <div className="select-box">
            <span>{coverStartDate}</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6"/></svg>
          </div>
        </div>

        <div className="sidebar-field">
          <label>Cover type</label>
          <div className="select-box select-active">
            <select
              value={coverType}
              onChange={e => { setCoverType(e.target.value); setDirty(true); }}
            >
              <option>Comprehensive</option>
              <option>Third party fire &amp; theft</option>
              <option>Third party only</option>
            </select>
          </div>
        </div>

        <div className="sidebar-field">
          <label>Voluntary excess</label>
          <div className="select-box select-active" style={{ position: 'relative' }}>
            <div className="custom-select" onClick={() => setExcessOpen(!excessOpen)}>
              <span>{voluntaryExcess}</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6"/></svg>
            </div>
            {excessOpen && (
              <div className="custom-dropdown">
                {excessOptions.map(opt => (
                  <div
                    key={opt}
                    className={`custom-option ${opt === voluntaryExcess ? 'selected' : ''}`}
                    onClick={() => {
                      setVoluntaryExcess(opt);
                      setExcessOpen(false);
                      setDirty(true);
                    }}
                  >{opt}</div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="sidebar-field">
          <label>Protect no claims?</label>
          <div className="toggle-group">
            <button
              className={`toggle-btn ${protectNoClaims === 'Yes' ? 'active' : ''}`}
              onClick={() => { setProtectNoClaims('Yes'); setDirty(true); }}
            >Yes</button>
            <button
              className={`toggle-btn ${protectNoClaims === 'No' ? 'active' : ''}`}
              onClick={() => { setProtectNoClaims('No'); setDirty(true); }}
            >No</button>
          </div>
        </div>

        <div className="sidebar-field">
          <label>Payment</label>
          <div className="toggle-group">
            <button
              className={`toggle-btn ${payment === 'Annually' ? 'active-green' : ''}`}
              onClick={() => { setPayment('Annually'); setDirty(true); }}
            >Annually</button>
            <button
              className={`toggle-btn ${payment === 'Monthly' ? 'active-green' : ''}`}
              onClick={() => { setPayment('Monthly'); setDirty(true); }}
            >Monthly</button>
          </div>
          {payment === 'Monthly' && (
            <p className="field-hint">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg>
              Paying monthly could be more expensive as an interest charge may be included.
            </p>
          )}
        </div>

        <button
          className={`update-btn ${dirty ? 'update-btn-active' : ''}`}
          onClick={handleUpdate}
          disabled={!dirty}
          title={dirty ? 'Click to apply your changes' : 'Change a filter above first'}
        >
          {dirty ? '✓ Update quotes' : 'Update quotes'}
        </button>
        <button className="edit-all-btn">Edit all quote details</button>
      </div>

      {/* ===== ADD-ONS ===== */}
      <div className="sidebar-card">
        <div className="sidebar-card-header">
          <h3>Add-ons</h3>
          <button className="info-btn">ⓘ</button>
        </div>
        <p className="addons-sub">Add or remove add-ons from quotes</p>
        {ADDONS.map(name => (
          <button
            key={name}
            className={`addon-btn ${addons[name] ? 'addon-active' : ''}`}
            onClick={() => { toggleAddon(name); setDirty(true); }}
          >
            <span className="addon-icon">{addons[name] ? '✓' : '+'}</span>
            {name}
          </button>
        ))}
        {/* Inline update shortcut when addons change */}
        {dirty && (
          <button className="update-btn update-btn-active addon-update-btn" onClick={handleUpdate}>
            ✓ Update quotes
          </button>
        )}
      </div>

      {/* ===== REFINE RESULTS ===== */}
      <div className="sidebar-card">
        <h3>Refine results</h3>
        <div className="refine-section">
          <div className="refine-header">
            Show or hide Telematics policies
            <button className="info-btn">ⓘ</button>
          </div>
          {['Plug and drive', 'Black box based', 'App based', 'Other'].map(opt => (
            <label key={opt} className="checkbox-label">
              <input type="checkbox" /> {opt}
            </label>
          ))}
        </div>
        <div className="refine-section">
          <div className="refine-header">
            Show or hide Pay-per-mile policies
            <button className="info-btn">ⓘ</button>
          </div>
          <label className="checkbox-label">
            <input type="checkbox" /> Pay per mile
          </label>
        </div>

        {isMobile && (
          <button className="btn-primary continue-btn" onClick={handleUpdate}>
            {dirty ? 'Apply & see results' : 'Continue to results'}
          </button>
        )}
      </div>
    </div>
  );
}
