import React from "react";
import "./QuoteCard.css";

function Stars({ count, total = 5 }) {
  return (
    <div className="stars">
      {Array.from({ length: total }).map((_, i) => (
        <span key={i} className={`star ${i < count ? "filled" : ""}`}>
          ★
        </span>
      ))}
    </div>
  );
}

function FeatureIcon({ included, label }) {
  return (
    <div className={`feature-col ${included ? "included" : "addon"}`}>
      {included ? (
        <svg width="30" height="30" viewBox="0 0 24 24" fill="none" style={{ color: "#07291b" }}>
          <path
            d="M20 6L9 17l-5-5"
            stroke="currentColor"
            strokeWidth="5"
            // strokeLinecap="round"
            // strokeLinejoin="round"
          />
        </svg>
      ) : (
        <svg width="30" height="30" viewBox="0 0 24 24" fill="none" >
          <path
            d="M12 5v14M5 12h14"
            stroke="currentColor"
            strokeWidth="5"
            // strokeLinecap="round"
          />
        </svg>
      )}
      <span>{label}</span>
    </div>
  );
}

export default function QuoteCard({ quote, onViewDetails }) {
  const hasLegal =
    quote.covered.includes("Legal assistance") ||
    quote.addons.includes("Legal assistance");
  const legalIncluded = quote.covered.includes("Legal assistance");
  const breakdownIncluded = quote.covered.includes("Breakdown cover");
  const personalAccident = quote.covered.includes("Personal accident");
  const courtesyCar = quote.covered.includes("Courtesy car");
  const windscreen = quote.covered.includes("Windscreen cover");

  return (
    <div className="quote-card">
      <div className="quote-main">
        {/* Insurer info */}
        <div className="quote-top">
        <div className="quote-insurer">
          <div className="insurer-logo">
            <img
              src={quote.logo}
              alt={quote.insurer}
              onError={(e) => {
                e.target.style.display = "none";
                e.target.nextSibling.style.display = "flex";
              }}
            />
            <div className="logo-fallback" style={{ display: "none" }}>
              {quote.insurer}
            </div>
          </div>
          {/* <div className="insurer-tier">{quote.tier}</div> */}
          <Stars count={quote.rating} />
          <span className="defaqto">from defaqto</span>
        </div>

        

        {/* Price */}
        <div className="quote-price">
          <div className="price-label">Annual Price</div>
          <div className="price-amount">
            <span className="price-symbol">£</span>
            <span className="price-int">
              {Math.floor(quote.annualPrice)}
            </span>
            <span className="price-dec">
              .{(quote.annualPrice % 1).toFixed(2).slice(2)}
            </span>
          </div>
          <div className="price-excess">Total excess: £{quote.totalExcess}</div>
        </div>

        </div>

        {/* Features */}
        <div className="quote-features hide-mobile">
          <FeatureIcon included={legalIncluded} label="Legal assistance" />
          <FeatureIcon included={breakdownIncluded} label="Breakdown cover" />
          <FeatureIcon included={personalAccident} label="Personal accident" />
          <FeatureIcon included={courtesyCar} label="Courtesy car" />
          <FeatureIcon included={windscreen} label="Windscreen cover" />
        </div>

        {/* Mobile features summary */}
        <div className="quote-features-mobile hide-desktop">
          <div className="features-section">
            <div className="features-label">Covered</div>
            {quote.covered.slice(0, 3).map((f) => (
              <div key={f} className="feature-line included">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="4"
                  style={{ color: "#07291b" }}
                >
                  <path d="M20 6L9 17l-5-5" />
                </svg>
                {f}
              </div>
            ))}
          </div>
          {quote.addons.length > 0 && (
            <div className="features-section">
              <div className="features-label">Add-ons</div>
              {quote.addons.slice(0, 2).map((f) => (
                <div key={f} className="feature-line addon">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M12 5v14M5 12h14"
                      stroke="currentColor"
                      strokeWidth="3"
                      // strokeLinecap="round"
                    />
                  </svg>
                  {f}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* CTA */}
        <div className="quote-cta">
          <button className="view-details-btn" onClick={onViewDetails}>
            View Details
          </button>
        </div>
      </div>

      {/* Info bar */}
      {/* <div className="quote-info-bar">
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <circle cx="12" cy="12" r="10" />
          <path d="M12 16v-4M12 8h.01" />
        </svg>
        <strong>Info</strong>
        <span>{quote.info}</span>
      </div> */}
    </div>
  );
}
