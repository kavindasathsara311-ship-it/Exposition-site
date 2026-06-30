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
    <div className="partner-card" data-tier={partner.tier} id="partner-card">
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

  // Both rows hold every partner. Each row is duplicated once so the CSS
  // marquee can loop seamlessly (translateX 0 -> -50%).
  const upperItems = [...partnersData, ...partnersData];

  // Rotate the lower row by half the list so a given partner is never centred
  // in both rows at the same moment — paired with the opposite scroll
  // direction, each partner is only visible in one row at a time.
  const half = Math.floor(partnersData.length / 2);
  const lowerData = [...partnersData.slice(half), ...partnersData.slice(0, half)];
  const lowerItems = [...lowerData, ...lowerData];

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

        {/* Upper row — scrolls to the right */}
        <div className="partner-marquee-viewport">
          <div id="partnerMarqueeTrack" className="partner-marquee-track row-right">
            {upperItems.map((partner, idx) => (
              <PartnerCard key={`u-${idx}`} partner={partner} />
            ))}
          </div>
        </div>

        {/* Lower row — scrolls to the left */}
        <div className="partner-marquee-viewport partner-marquee-viewport--lower">
          <div className="partner-marquee-track row-left">
            {lowerItems.map((partner, idx) => (
              <PartnerCard key={`l-${idx}`} partner={partner} />
            ))}
          </div>
        </div>
      </section>
    </section>
  );
}
