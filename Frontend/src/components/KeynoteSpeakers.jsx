import React, { useState, useEffect, useRef } from "react";
import { keynoteSpeakersData } from "../data/interviewData";
import { useScrollAnimation } from "../hooks/useScrollAnimation";

export default function KeynoteSpeakers() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [displayedIndex, setDisplayedIndex] = useState(0);
  const [tickerState, setTickerState] = useState("idle"); // "idle" | "shifting" | "reset"
  const [isExpanded, setIsExpanded] = useState(false);

  const sectionRef1 = useRef(null);
  const sectionRef2 = useRef(null);
  const gridContainerRef = useRef(null);
  const isAnimatingRef = useRef(false);

  useScrollAnimation(sectionRef1, "animate-in");
  useScrollAnimation(sectionRef2, "animate-in");

  const goToIndex = (nextIndex) => {
    if (isAnimatingRef.current) return;
    if (nextIndex === activeIndex) return;
    isAnimatingRef.current = true;

    // 1. Pre-load next data into activeIndex so ticker shows correct next badge
    setActiveIndex(nextIndex);

    // Small delay so React renders the new badge-tag values BEFORE animation starts
    setTimeout(() => {
      // 2. Trigger shift animation — ticker slides up smoothly
      setTickerState("shifting");

      setTimeout(() => {
        // 3. Snap: disable transition, update displayedIndex to new speaker
        setTickerState("reset");
        setDisplayedIndex(nextIndex);

        // 4. Re-enable transition after DOM paints the reset position
        setTimeout(() => {
          setTickerState("idle");
          isAnimatingRef.current = false;
        }, 60);
      }, 600); // duration matches CSS transition
    }, 30);
  };

  // Autoplay
  useEffect(() => {
    const total = keynoteSpeakersData.length;
    if (total === 0) return;
    const interval = setInterval(() => {
      const next = (activeIndex + 1) % total;
      goToIndex(next);
    }, 6000);
    return () => clearInterval(interval);
  }, [activeIndex]);

  const rotateSpotlight = (direction) => {
    const total = keynoteSpeakersData.length;
    if (total === 0) return;
    const next = (activeIndex + direction + total) % total;
    goToIndex(next);
  };

  const handleViewAllToggle = () => {
    setIsExpanded((prev) => !prev);
    if (isExpanded && sectionRef2.current) {
      sectionRef2.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  if (keynoteSpeakersData.length === 0) return null;

  const total = keynoteSpeakersData.length;

  // Spotlight always shows activeIndex (updates immediately on change)
  const spotlightLeader = keynoteSpeakersData[activeIndex];

  // Ticker badges: based on displayedIndex so they only visually update AFTER snap
  const prevIdx      = (displayedIndex - 1 + total) % total;
  const nextIdx      = (displayedIndex + 1) % total;
  const prevIssue    = keynoteSpeakersData[prevIdx].issue;
  const currentIssue = keynoteSpeakersData[displayedIndex].issue;
  const nextIssue    = keynoteSpeakersData[nextIdx].issue;

  const isShifting    = tickerState === "shifting";
  const noTransition  = tickerState === "reset";

  return (
    <>
      <section ref={sectionRef1} className="section-allKeynoteSpeaker animate-on-scroll fade-up" id="cylinder">
        <h2 className="section-title community-voices-header">Keynote Speakers</h2>
        <p className="section-subtitle">Voices that fueled our vision</p>

        <div className="spotlight-container">

          {/* Issue ticker sidebar */}
          <div className="key-issuetime">
            <div className="issue-line"></div>
            <div className="spotlight-badge-container" id="issueBadgeContainer">

              <div className="icon-keybadge" id="issueBadge">
                <i className="fa-solid fa-microphone-lines"></i>
              </div>

              <div className="key-content" id="keyContent">
                <div className="ticker-wrapper stacked-list-layout">
                  <div className={`ticker-track ${isShifting ? "is-shifting" : ""} ${noTransition ? "no-transition" : ""}`}>
                    <span className="badge-tag issue-prev">{prevIssue}</span>
                    <span className="badge-tag issue-current">{currentIssue}</span>
                    <span className="badge-tag issue-next">{nextIssue}</span>
                  </div>
                </div>
              </div>

              <div className="spotlight-controls">
                <button
                  className="spotlight-nav issue-previous-nav"
                  onClick={() => rotateSpotlight(-1)}
                  aria-label="Previous Spotlight"
                >
                  <i className="fa-solid fa-chevron-up"></i>
                </button>
                <button
                  className="spotlight-nav issue-next-nav"
                  onClick={() => rotateSpotlight(1)}
                  aria-label="Next Spotlight"
                >
                  <i className="fa-solid fa-chevron-down"></i>
                </button>
              </div>

            </div>
          </div>

          {/* Spotlight slider */}
          <div className="spotlight-slider-split" key={activeIndex}>

            <div className="split-card-left-wrapper">
              <div className="speaker-image-card">
                <img src={spotlightLeader.image} alt={spotlightLeader.name} />
              </div>
            </div>

            <div className="split-card-right-wrapper">
              <div className="speaker-content-card">
                <h1 className="spotlight-name">{spotlightLeader.name}</h1>
                <h2 className="spotlight-title">{spotlightLeader.title}</h2>
                <h3 className="spotlight-company">{spotlightLeader.company}</h3>
                <div className="quote-box">
                  <p>{spotlightLeader.quote}</p>
                </div>
                <div className="tag-row">
                  {spotlightLeader.tags.map((tag, idx) => (
                    <span key={idx} className="pill-tag">{tag}</span>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      <section ref={sectionRef2} className="section-allKeynoteSpeaker animate-on-scroll fade-up">
        <p className="section-subtitle">Latest Keynote Speakers</p>
        <div
          ref={gridContainerRef}
          className={`leaders-grid ${isExpanded ? "expanded" : ""}`}
          id="leadersGridContainer"
        >
          {keynoteSpeakersData.map((person, idx) => (
            <div key={idx} className="grid-card">
              <div className="card-img-wrapper">
                <img src={person.image} alt={person.name} />
              </div>
              <div className="card-info">
                <h3>{person.name}</h3>
                <p className="speaker-title">{person.title}</p>
                <div className="card-badges">
                  <span className="card-badge">{person.issue}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="view-all-btn-container">
          <button className="view-all-btn" onClick={handleViewAllToggle}>
            {isExpanded ? "Show Less" : "View All Speakers"}
          </button>
        </div>
      </section>
    </>
  );
}
