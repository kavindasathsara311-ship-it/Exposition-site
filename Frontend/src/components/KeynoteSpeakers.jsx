import React, { useState, useEffect, useRef } from "react";
import { keynoteSpeakersData } from "../data/interviewData";
import { useScrollAnimation } from "../hooks/useScrollAnimation";

export default function KeynoteSpeakers() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [displayedIndex, setDisplayedIndex] = useState(0);
  const [isShifting, setIsShifting] = useState(false);
  const [noTransition, setNoTransition] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const sectionRef1 = useRef(null);
  const sectionRef2 = useRef(null);
  const gridContainerRef = useRef(null);

  useScrollAnimation(sectionRef1, "animate-in");
  useScrollAnimation(sectionRef2, "animate-in");

  // Autoplay loop
  useEffect(() => {
    const interval = setInterval(() => {
      const total = keynoteSpeakersData.length;
      if (total === 0) return;
      const nextIndex = (activeIndex + 1) % total;

      setActiveIndex(nextIndex);
      setIsShifting(true);

      const shiftTimeout = setTimeout(() => {
        setNoTransition(true);
        setDisplayedIndex(nextIndex);
        setIsShifting(false);

        const resetTransitionTimeout = setTimeout(() => {
          setNoTransition(false);
        }, 50);

        return () => clearTimeout(resetTransitionTimeout);
      }, 600);

      return () => clearTimeout(shiftTimeout);
    }, 3500);

    return () => clearInterval(interval);
  }, [activeIndex]);

  const rotateSpotlight = (direction) => {
    const total = keynoteSpeakersData.length;
    if (total === 0) return;
    const newIndex = (activeIndex + direction + total) % total;

    setActiveIndex(newIndex);
    setDisplayedIndex(newIndex);
    setIsShifting(false);
    setNoTransition(true);

    setTimeout(() => {
      setNoTransition(false);
    }, 50);
  };

  const handleViewAllToggle = () => {
    setIsExpanded((prev) => !prev);
    if (isExpanded && sectionRef2.current) {
      sectionRef2.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  if (keynoteSpeakersData.length === 0) return null;

  const spotlightLeader = keynoteSpeakersData[activeIndex];

  const totalItems = keynoteSpeakersData.length;
  const prevIdx = (displayedIndex - 1 + totalItems) % totalItems;
  const nextIdx = (displayedIndex + 1) % totalItems;

  const prevIssue = keynoteSpeakersData[prevIdx].issue;
  const currentIssue = keynoteSpeakersData[displayedIndex].issue;
  const nextIssue = keynoteSpeakersData[nextIdx].issue;

  return (
    <>
      <section ref={sectionRef1} className="section-allKeynoteSpeaker animate-on-scroll fade-up" id="cylinder">
        <h2 className="section-title community-voices-header">Keynote Speakers</h2>
        <p className="section-subtitle">Voices that fueled our vision</p>
        <div className="spotlight-container">
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
                <button className="spotlight-nav issue-previous-nav" onClick={() => rotateSpotlight(-1)} aria-label="Previous Spotlight">
                  <i className="fa-solid fa-chevron-up"></i>
                </button>
                <button className="spotlight-nav issue-next-nav" onClick={() => rotateSpotlight(1)} aria-label="Next Spotlight">
                  <i className="fa-solid fa-chevron-down"></i>
                </button>
              </div>
            </div>
          </div>

          {/* Using unique key ensures full animation resets smoothly on change */}
          <div className="spotlight-slider-split" key={activeIndex}>
            
            {/* CARD 1: Image Wrapper (Slides up in center, then slides LEFT) */}
            <div className="split-card-left-wrapper">
              <div className="speaker-image-card">
                <img src={spotlightLeader.image} alt={spotlightLeader.name} />
              </div>
            </div>
            
            {/* CARD 2: Content Wrapper (Hidden underneath image initially, then slides RIGHT) */}
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
        <div ref={gridContainerRef} className={`leaders-grid ${isExpanded ? "expanded" : ""}`} id="leadersGridContainer">
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