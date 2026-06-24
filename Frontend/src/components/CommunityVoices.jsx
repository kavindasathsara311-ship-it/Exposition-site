import React, { useState, useEffect, useRef } from "react";
import { voicesData } from "../data/interviewData";
import { useScrollAnimation } from "../hooks/useScrollAnimation";

export default function CommunityVoices() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [resetTimer, setResetTimer] = useState(0);
  const [imgSrcs, setImgSrcs] = useState({});

  const sectionRef = useRef(null);
  useScrollAnimation(sectionRef, "animate-in");

  // Autoplay timer
  useEffect(() => {
    if (voicesData.length === 0) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % voicesData.length);
    }, 3500);

    return () => clearInterval(interval);
  }, [resetTimer]);

  const handleFallbackAvatar = (name) => {
    const initials = name
      ? name
          .split(" ")
          .filter((n) => !n.includes("."))
          .map((n) => n[0])
          .join("")
          .substring(0, 2)
      : "UX";
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(
      initials
    )}&background=192230&color=eaa11b&bold=true`;
  };

  const getImgSrc = (item, key) => {
    return imgSrcs[key] !== undefined ? imgSrcs[key] : item.image;
  };

  const handleImgError = (item, key) => {
    setImgSrcs((prev) => ({
      ...prev,
      [key]: handleFallbackAvatar(item.name)
    }));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % voicesData.length);
    setResetTimer((prev) => prev + 1);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + voicesData.length) % voicesData.length);
    setResetTimer((prev) => prev + 1);
  };

  const handleDotClick = (index) => {
    setCurrentIndex(index);
    setResetTimer((prev) => prev + 1);
  };

  if (voicesData.length === 0) return null;

  const activeSpeaker = voicesData[currentIndex];

  return (
    <section ref={sectionRef} className="section-allKeynoteSpeaker community-voices animate-on-scroll fade-up">
      <div className="community-voices">
        <h1 className="community-voices-header">Community Voices</h1>
        <p className="section-subtitle">Our Success Stories</p>
        <div className="community-voices-container">
          
          <div className="testimonial-slider-container">
            <div id="featuredVoiceWrapper" className="testimonial-spotlight-wrapper">
              <div className="quote-icon-container">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
              </div>
              <p className="testimonial-statement">"{activeSpeaker.quote}"</p>
              <div className="testimonial-author-profile">
                <div className="author-avatar-frame">
                  <img
                    src={getImgSrc(activeSpeaker, `active-${currentIndex}`)}
                    alt=""
                    onError={() => handleImgError(activeSpeaker, `active-${currentIndex}`)}
                  />
                </div>
                <div className="author-details-meta">
                  <h3 className="author-name">{activeSpeaker.name}</h3>
                  <span className="author-role-primary">{activeSpeaker.tagline}</span>
                  <span className="author-role-secondary">{activeSpeaker.subtext}</span>
                </div>
              </div>
            </div>

            <div className="slider-controls-row">
              <button
                id="prevSlideBtn"
                className="control-arrow-btn"
                onClick={prevSlide}
                aria-label="Previous slide"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                  <polyline points="15 18 9 12 15 6"></polyline>
                </svg>
              </button>

              <div id="sliderDotsWrapper" className="slider-navigation-dots">
                {voicesData.map((_, idx) => (
                  <span
                    key={idx}
                    className={`navigation-dot ${idx === currentIndex ? "active-pill" : ""}`}
                    onClick={() => handleDotClick(idx)}
                  ></span>
                ))}
              </div>

              <button
                id="nextSlideBtn"
                className="control-arrow-btn"
                onClick={nextSlide}
                aria-label="Next slide"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </button>
            </div>
          </div>

          <div id="voicesGrid" className="voices-grid">
            {voicesData.map((item, index) => (
              <div key={index} className="voice-card">
                <div className="card-profile-header">
                  <div className="profile-avatar">
                    <img
                      src={getImgSrc(item, `grid-${index}`)}
                      alt=""
                      onError={() => handleImgError(item, `grid-${index}`)}
                    />
                  </div>
                  <div className="profile-meta">
                    <h4 className="profile-name">{item.name}</h4>
                    <span className="profile-tagline-gold" title={item.tagline}>
                      {item.tagline}
                    </span>
                    <span className="profile-subtext" title={item.subtext}>
                      {item.subtext}
                    </span>
                  </div>
                </div>
                <p className="card-quote-text">{item.quote.substring(0, 140)}...</p>
              </div>
            ))}
          </div>

          <div className="stats-counter-row">
            <div className="stat-item">
              <h2 className="stat-number">20+</h2>
              <p className="stat-label">Years</p>
            </div>
            <div className="stat-item">
              <h2 className="stat-number">5+</h2>
              <p className="stat-label">Segments</p>
            </div>
            <div className="stat-item">
              <h2 className="stat-number">100+</h2>
              <p className="stat-label">Partners</p>
            </div>
            <div className="stat-item">
              <h2 className="stat-number">20+</h2>
              <p className="stat-label">Issues</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
