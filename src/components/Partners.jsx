import React, { useRef, useState } from "react";
import { partnersData } from "../data/partnersData";
import { useScrollAnimation } from "../hooks/useScrollAnimation";

function PartnerCard({ partner }) {
  const [imgError, setImgError] = useState(false);

  const getTierIcon = (tier) => {
    switch (tier) {
      case "platinum":
        return "💎";
      case "gold":
        return "⭐";
      case "silver":
        return "🛡️";
      default:
        return "🥉";
    }
  };

  return (
    <div className="partner-card" data-tier={partner.tier}>
      <div className="partner-card-header">
        <span className="partner-tier-badge">{partner.tier} Partner</span>
        <span className="partner-tier-icon">{getTierIcon(partner.tier)}</span>
      </div>
      <div className="partner-logo-frame">
        {!imgError ? (
          <img
            className="partner-logo-img"
            src={partner.logo}
            alt={`${partner.name} Corporate Logo`}
            onError={() => setImgError(true)}
          />
        ) : (
          <span
            style={{
              fontSize: "1.5rem",
              fontWeight: "800",
              color: "rgba(255,255,255,0.15)"
            }}
          >
            {partner.name.substring(0, 3).toUpperCase()}
          </span>
        )}
      </div>
      <h5 className="partner-brand-name">{partner.name}</h5>
    </div>
  );
}

export default function Partners() {
  const sectionRef = useRef(null);
  useScrollAnimation(sectionRef, "animate-in");

  // Duplicate to ensure seamless CSS marquee scrolling
  const marqueeItems = [...partnersData, ...partnersData];

  return (
    <section>
      <h1 className="section-title partners-title">Official partners</h1>
      <section ref={sectionRef} className="partners-section animate-on-scroll fade-up">
        <div className="partners-section-header">
          <p className="partners-subtitle">
            Exposition Issue 21 is proudly supported by industry leaders committed to
            excellence and innovation.
          </p>
        </div>

        {/* Outer Viewport Masking Container */}
        <div className="partner-marquee-viewport">
          {/* Inner Track that moves left/right continuously */}
          <div id="partnerMarqueeTrack" className="partner-marquee-track">
            {marqueeItems.map((partner, idx) => (
              <PartnerCard key={idx} partner={partner} />
            ))}
          </div>
        </div>
      </section>
    </section>
  );
}
